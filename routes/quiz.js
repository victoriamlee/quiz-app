/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

require('dotenv').config();
// Web server config
const PORT = process.env.PORT || 8080;

const express = require('express');
const router  = express.Router();

module.exports = (db) => {


// Route to display summary of all quiz attempts by a user. Requires user login.

router.get("/results", (req, res) => {
  return db.query(`
    SELECT quiz_attempts.*, quizzes.name
    FROM quiz_attempts
    JOIN quizzes ON quiz_id = quizzes.id
    WHERE quiz_attempts.user_id = $1
    ORDER BY quiz_attempts.end_time DESC;
  `, [req.session.user_id])
  .then(data => {
    const queryData = data.rows;
    let quizObj = {};
      for (let i = 0; i < queryData.length; i++) {
        quizObj[i] = {name: queryData[i].name, endTime: queryData[i].end_time,
          attemptId: queryData[i].id, score: queryData[i].results};
      }
    let templateVars = {quizObj};

    if (req.session.user_id) {
      templateVars.user = req.session.user_id;
    } else {
      templateVars.user = "";
    }

    res.render("results", templateVars);
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});



// Route to share links on social network. Requires user login.

router.get("/share", (req, res) => {
   let templateVars = {};

    if (req.session.user_id) {
      templateVars.user = req.session.user_id;
    } else {
      templateVars.user = "";
    }
    res.render("share", templateVars);
});


// Route to display private quiz list for a user. Requires user login.

router.get("/myList", (req, res) => {
  return db.query(`
    SELECT id, name, description, genre, active, TO_CHAR(date, 'YYYY-MM-DD') as quiz_date FROM quizzes
    WHERE owner_id = $1
    ORDER BY date DESC, id DESC;`
  , [req.session.user_id])
  .then(data => {
    const queryData = data.rows;
    let quizObj = {};
    const str1 = `${PORT}`;

    for (let i = 0; i < queryData.length; i++) {
      const str2 = queryData[i].id;
      const str3 = "http://localhost:" + str1 + "/quizzes/" + str2;

      quizObj[i] = {quizId: queryData[i].id, name: queryData[i].name, description: queryData[i].description,
          category: queryData[i].genre, active: queryData[i].active, date: queryData[i].quiz_date,
          link: str3};
     }
    let templateVars = {quizObj};

    if (req.session.user_id) {
      templateVars.user = req.session.user_id;
    } else {
      templateVars.user = "";
    }

    res.render("user_quiz_list", templateVars);
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});


// Route to view_score for a particular quiz attempt. Does not require user login.

router.get("/:id/results", (req, res) => {
  return db.query(`
    SELECT quizzes.name, quiz_attempts.results, TO_CHAR(quiz_attempts.end_time, 'YYYY-MM-DD') as quiz_date,
    quiz_attempts.id, users.name as username
    FROM quiz_attempts
    JOIN quizzes ON quiz_id = quizzes.id
    JOIN users ON users.id = quiz_attempts.user_id
    WHERE quiz_attempts.id = $1;
  `, [req.params.id])
  .then(data => {
    const queryData = data.rows[0];
    let resultObj = {quizName: queryData.name, score: queryData.results, attemptDate: queryData.quiz_date,
          attemptId: queryData.id, userName: queryData.username};

    if (req.session.user_id) {
      resultObj.user = req.session.user_id;
    } else {
      resultObj.user = "";
    }

    const str1 = `${PORT}`;
    const str2 = `${req.params.id}`;
    const str3 = "http://localhost:" + str1 + "/quizzes/" + str2 + "/results";
    resultObj.link = str3;

    res.render("view_score", resultObj);
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});


// Route to display all questions for a particular quiz.

router.get("/:id", (req, res) => {
  return db.query(`
    SELECT questions.question, questions.id
    FROM questions
    JOIN quizzes ON quizzes.id = quiz_id
    WHERE quiz_id = $1;
 `, [req.params.id])
  .then(result => {
    let quiz = result.rows;
    return db.query(`
      SELECT answers.answer, answers.correct, question_id
      FROM questions
      JOIN quizzes ON quizzes.id = quiz_id
      JOIN answers ON questions.id = question_id
      WHERE quiz_id = $1;
    `, [req.params.id])
    .then (answers => {
      let answer = answers.rows;
      let questionsObj = {};
      let right = [];
      let param_id = req.params.id
      for (let i = 0; i < quiz.length; i++) {
        questionsObj[i] = { quiz_id: param_id, question: quiz[i].question }
        for (let j = 0; j < answer.length; j++) {
          if (quiz[i].id === answer[j].question_id) {
            right.push(answer[j].answer)
            questionsObj[i].answer = right;
          }
        } right = [];
      }

      let templateVars = { questionsObj };
      if (req.session.user_id) {
          templateVars.user = req.session.user_id;
      } else {
          templateVars.user = "";
      }

      res.render("quiz_page", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    });
  });


// Route to save results on quiz submission.

router.post("/:id/results", (req, res) => {
  return db.query(`
    SELECT answers.answer, answers.correct, question_id
    FROM questions
    JOIN quizzes ON quizzes.id = quiz_id
    JOIN answers ON questions.id = question_id
    WHERE quiz_id = $1
    ORDER BY question_id;
  `, [req.params.id])
  .then(data => {
    // if user is logged in or not
    if (!req.session.user_id) {
      let templateVars = { user: req.session.user_id, message: "Error: You need to login to submit the quiz" };
      res.render("error", templateVars);
    } else {
    const queryData = data.rows;
    let param_id = req.params.id;
    let input = [];
    let questionIndex = 0;
    for (let questionName in req.body) {
      let answerIndex = req.body[questionName] - 1;
      let stride = 4;  // we always have 4 answers per question
      let combinedIndex = questionIndex * stride + answerIndex;
      console.log("q:", questionIndex, "a:", answerIndex, "combinedIndex :", combinedIndex );
      input.push(queryData[combinedIndex ].correct);
      questionIndex++;
    }

    // if user didn't answer all the questions
    if (input.length !== queryData.length / 4) {
      let templateVars = { user: req.session.user_id, message: "Error: You need to answer all the questions" };
      res.render("error", templateVars);
    } else {

    // gets the user's score
    let score = "";
    let count = 0;
    for (let num of input) {
      if (num === true) {
        count += 1;
      }
    }
    score = Math.round(count / input.length * 100);

    // gets current date
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    // gets current time
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+'T'+time+'.000Z';

    return db.query(`
      INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time)
      VALUES ($1,$2,$3,$4, '2020-08-24T08:05:00.000Z', $5);
    `, [req.session.user_id, param_id, score, date, dateTime])
    .then(user => {
      res.redirect(`/quizzes/results`)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  }
  }
  })
  .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
  });
})


  return router;
};
