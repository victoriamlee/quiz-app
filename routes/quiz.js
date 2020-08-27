/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  router.get("/:id", (req, res) => {
    console.log(req.params.id)
    return db.query(`
    SELECT questions.question, questions.id
    FROM questions
    JOIN quizzes ON quizzes.id = quiz_id
    WHERE quiz_id = $1;
    `, [req.params.id])
    .then(result => {
      let quiz = result.rows;
      console.log("QUIZ[0]", quiz[0].id)
      return db.query(`
        SELECT answers.answer, answers.correct, question_id
        FROM questions
        JOIN quizzes ON quizzes.id = quiz_id
        JOIN answers ON questions.id = question_id
        WHERE quiz_id = $1;
      `, [req.params.id])
     .then (answers => {
        let answer = answers.rows;
        console.log("answers",answer);
        console.log("QUIZ", quiz);
        let questionsObj = {};
        let right = [];
        let param_id = req.params.id
        console.log("ADDED ID", questionsObj)
        for (let i = 0; i < quiz.length; i++) {
          questionsObj[i] = { quiz_id: param_id, question: quiz[i].question }
          for (let j = 0; j < answer.length; j++) {
            if (quiz[i].id === answer[j].question_id) {
              right.push(answer[j].answer)
              // right[j] = answer[j].answer
              questionsObj[i].answer = right;
              // console.log("OBJECT", questionsObj)
            }
          } right = [];
        }
       console.log("OBJ", questionsObj)

        let templateVars = { questionsObj };
        console.log("TEMPLATE", templateVars);

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



  router.post("/results", (req, res) => {
    console.log(req.params.id)
    return db.query(`
        SELECT answers.answer, answers.correct, question_id
        FROM questions
        JOIN quizzes ON quizzes.id = quiz_id
        JOIN answers ON questions.id = question_id
        WHERE quiz_id = $1
        ORDER BY question_id;
      `, [req.params.id])
      .then((results) => {
        const working = results.rows;
        let param_id = req.params.id
        console.log("WORKING:", working)
        // let i = 0;
        console.log("REQ.BODY", req.body)
        let arr = [];
        let input = [];
        for (let i = 0; i < working.length; i++) {
          // console.log("IDK", working[i].question_id)
          // console.log("ARRAY", arr)
          for (let j = 0; j < working.length; j++) {
            if (working[i].question_id === working[j].question_id) {
              arr.push(working[j].correct)
            }

          }
        }
        for (let loop in req.body) {
          // console.log(arr[req.body[loop]])
          if (arr[req.body[loop]] === true) {
            input.push(true);
          } else {
            input.push(false);
          }
          // console.log("INPUT INSIDE", input)
        //   console.log("ARRAY", arr)
        // arr = [];
        }

        console.log("INPUT", input)

        let score = "";
        let count = 0;
        for (let num of input) {
          if (num === true) {
            count += 1;
          }
        }
        // score = `${count}/${input.length}`
        score = Math.round(count / input.length * 100);
        console.log("SCORE:", score);

        // gets current date
        let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        console.log("DATE", date);

        // gets current time
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+'T'+time+'.000Z';
        console.log("CURRENT TIME", dateTime);



        return db.query(`
        INSERT INTO quiz_attempts (user_id, quiz_id, results, date, start_time, end_time)
        VALUES ($1,$2,$3,$4, '2020-08-24T08:05:00.000Z', $5);
        `, [req.session.user_id, param_id, score, date, dateTime])
         // should test for when user is logged out
        .then(user => {
          res.redirect(`/quizzes/results`)
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  })



  router.get("/results", (req, res) => {
    return db.query(`
      SELECT quiz_attempts.*, quizzes.*
      FROM quiz_attempts
      JOIN quizzes ON quiz_id = quizzes.id
      WHERE quiz_attempts.user_id = $1 AND quiz_id = $2
      ORDER BY quiz_attempts.end_time DESC;
    `, [req.session.user_id, req.params.id])
    .then(data => {
      const queryData = data.rows;
      let quizObj = {};
        for (let i = 0; i < queryData.length; i++) {
          quizObj[i] = {name: queryData[i].name, endTime: queryData[i].end_time, score: queryData[i].results};
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





  return router;
};
