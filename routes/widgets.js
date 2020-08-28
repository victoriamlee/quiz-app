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
  router.get("/", (req, res) => {
    let query = `SELECT * FROM quizzes`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        console.log(widgets);
        res.json({ widgets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  //GET --- CREATE QUIZ
  router.get("/quizzes/new", (req, res) => {
    let templateVars = {};
    if (req.session.user_id) {
      templateVars.user = req.session.user_id;
    } else {
      templateVars.user = "";
    }
    res.render("create_quiz", templateVars);
  });

  //POST --- CREATE QUIZ
  router.post("/quizzes/new", (req, res) => {
    //check whether to quiz is public or private
    let active = false;
    if (req.body.active){
      active = true;
    }

    const genre = req.body.genre;
    const name = req.body.name;
    const description = req.body.description;
    const q1 = {
      question: req.body.question1,
      correct: req.body.correct1,
      answer: req.body.answer1
    }
    const q2 = {
      question: req.body.question2,
      correct: req.body.correct2,
      answer: req.body.answer2
    }
    const q3 = {
      question: req.body.question3,
      correct: req.body.correct3,
      answer: req.body.answer3
    }
    //Inserted req.body values into quizObj to allow for iteration
    const quizObj = {
      q1,
      q2,
      q3
    }

    //Generate current date
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

    //if fields are incomplete
    if (!name | !description | !req.body.question1 | !req.body.question2 | !req.body.question3) {
      console.log('WOOOPS quiz incomplete');
      res.send({error: `quiz [ ${name} ] incomplete`});
      res.redirect(`/api/widgets/quizzes/new`);
    }

    //Insert form elements into quiz table and return quizID
    db.query(`
    INSERT INTO quizzes (owner_id, name, description, photo_url, active, date, genre)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id;
    `, [req.session.user_id, name, description,'somePhotoURL', active, date, genre])
    .then(res => {
      const quizID = res.rows[0];
      //Iterate through quizObj to insert question with respective answers into their corresponding tables
      for (let q in quizObj){
        db.query(`
        INSERT INTO questions (quiz_id, question)
        VALUES ($1, $2)
        RETURNING id;
        `, [quizID.id, quizObj[q].question])
        .then(res => {
          const questionID = res.rows[0];
          //Iterate through answer array to create insert query
          //Pass true if radio button value (correct) equals index of answer in array
          let count = 1;
          for(let answer of quizObj[q].answer) {
            let flag = false;
            if (count === parseInt(quizObj[q].correct)) {
              flag = true;
            }
            db.query(`
            INSERT INTO answers (question_id, answer, correct)
            VALUES ($1, $2, $3);
            `, [questionID.id, answer, flag])
            .then()
            .catch(e => console.error(e.stack))
            count++;
          }
        })
        .catch(e => console.error(e.stack))
      }
      console.log(`Quiz [ ${name} ] added to [ midterm ] database`)
    })
    .catch(e => console.error(e.stack))


    res.redirect(`/quizzes/myList`)
  })


  //GET --- EDIT QUIZ
  router.get("/quizzes/:id/edit", (req, res) => {
    //add user to template vars if exists
    let templateVars = {};
    if (req.session.user_id) {
      templateVars.user = req.session.user_id;
    } else {
      templateVars.user = "";
    }
    templateVars.quiz = req.params.id;
    //return quiz info using quizID in url
    return db.query(`
    SELECT quizzes.name, quizzes.description, quizzes.active, quizzes.genre
    FROM quizzes
    WHERE quizzes.id = $1 AND owner_id = $2
    `, [req.params.id, req.session.user_id])
    .then((result) => {
      const tempObj = result.rows[0]
      const quizInfoObj = removeAnonymous(tempObj);

      templateVars.name = quizInfoObj.name;
      templateVars.description = quizInfoObj.description;
      templateVars.active = quizInfoObj.active;
      templateVars.genre = quizInfoObj.genre;

      //return list of questions from quizID and add to template vars
      return db.query(`
      SELECT questions.question, questions.id
      FROM questions
      JOIN quizzes ON quizzes.id = quiz_id
      WHERE quiz_id = $1;
     `, [req.params.id])
     .then((result) => {
       const tempObj = result.rows;

       for (let i in tempObj) {
         templateVars[`question${parseInt(i)+1}`] = { question: tempObj[i].question }
       }
        //return list of answers from quizID and add to template vars
        //in order and with key names according to edit_quiz template
        return db.query(`
        SELECT answers.answer, answers.correct, question_id
        FROM questions
        JOIN quizzes ON quizzes.id = quiz_id
        JOIN answers ON questions.id = question_id
        WHERE quiz_id = $1;
      `, [req.params.id])
      .then((result) => {
        const tempObj = result.rows;
        let j = 1;
        let k = 1;
        for (let i in tempObj) {
          templateVars[`answer${j}_q${k}`] = { answer: tempObj[i].answer, correct: tempObj[i].correct}
          j++;
          if (j === 5) {
            j = 1;
            k++;
          }
        }
        console.log(templateVars)
        res.render("edit_quiz", templateVars);
      })
     })
    })

  });

  //Helper Functions
  //Removes anonymous from object and returns new object
  const removeAnonymous = function(tempObj) {
    let newObj = {};
    for (let i in tempObj) {
      newObj[i] = tempObj[i];
    }
    return newObj;
  }

  //POST --- EDIT QUIZ
  router.post("/quizzes/:id/edit", (req, res) => {
    //check whether to quiz is public or private
    let active = false;
    if (req.body.active){
      active = true;
    }
    console.log('REQ -->',req.body)
    const quizUniqueID = req.body.quiz;
    const name = req.body.name;
    const description = req.body.description;
    const q1 = {
      question: req.body.question1,
      correct: req.body.correct1,
      answer: req.body.answer1
    }
    const q2 = {
      question: req.body.question2,
      correct: req.body.correct2,
      answer: req.body.answer2
    }
    const q3 = {
      question: req.body.question3,
      correct: req.body.correct3,
      answer: req.body.answer3
    }
    //Inserted req.body values into quizObj to allow for iteration
    const quizObj = {
      q1,
      q2,
      q3
    }
    console.log(quizUniqueID, name, description)
    console.log(quizObj)
    //if fields are incomplete
    if (!name | !description | !req.body.question1 | !req.body.question2 | !req.body.question3) {
      console.log('WOOOPS quiz incomplete');
      res.send({error: `quiz [ ${name} ] incomplete`});
      res.redirect(`/api/widgets/quizzes/:id/edit`);
    }

    //Insert form elements into quiz table and return quizID
    db.query(`
    UPDATE quizzes
    SET name = $1, description = $2, active = $3
    WHERE quizzes.id = $4;
    `, [name, description, active, quizUniqueID])
    .then(res => {
      const quizID = res.rows[0];
      //Iterate through quizObj to insert question with respective answers into their corresponding tables
      for (let q in quizObj){
        db.query(`
        UPDATE questions
        SET question = $1
        WHERE quiz_id = $2;
        `, [quizObj[q].question, quizUniqueID])
        .then(res => {
          console.log(res.rows)
          const questionID = res.rows[0];
          //Iterate through answer array to create insert query
          //Pass true if radio button value (correct) equals index of answer in array
          let count = 1;
          for(let answer of quizObj[q].answer) {
            let flag = false;
            if (count === parseInt(quizObj[q].correct)) {
              flag = true;
            }
            db.query(`
            INSERT INTO answers (question_id, answer, correct)
            VALUES ($1, $2, $3);
            `, [questionID.id, answer, flag])
            .then()
            .catch(e => console.error(e.stack))
            count++;
          }
        })
        .catch(e => console.error(e.stack))
      }
      console.log(`Quiz [ ${name} ] added to [ midterm ] database`)
    })
    .catch(e => console.error(e.stack))


    res.redirect(`/quizzes/myList`)
  })



// Route to delete a quiz from private quiz list. Requires user login.

router.post("/quizzes/:id/delete", (req, res) => {
  return db.query(`
    DELETE
    FROM quizzes
    WHERE id = $1 and owner_id = $2
    RETURNING *;`
  , [req.params.id, req.session.user_id])
  .then(data => {
    return db.query(`
    SELECT id, name, description, genre, active, TO_CHAR(date, 'YYYY-MM-DD') as quiz_date FROM quizzes
    WHERE owner_id = $1
    ORDER BY date DESC;`
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
});



// Route to get a delete path from private quiz list. Requires user login.

router.get("/quizzes/:id/delete", (req, res) => {

  return db.query(`
    SELECT name, genre, description
    FROM quizzes
    WHERE id = $1 and owner_id = $2;`
  , [req.params.id, req.session.user_id])
  .then(data => {
    const queryData = data.rows[0];

    let quizObj = {quizId: req.params.id, name: queryData.name, description: queryData.description,
          category: queryData.genre};

    let templateVars = {quizObj};

    if (req.session.user_id) {
      templateVars.user = req.session.user_id;
    } else {
      templateVars.user = "";
    }

    res.render("delete_quiz", templateVars);
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

  return router;
};


