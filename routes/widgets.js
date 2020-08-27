/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

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
    // if (!req.body.name | !req.body.description ) {
    //   res.status(400);
    //   res.redirect(`/api/widgets/quizzes/new`);
    // }
    console.log(req.body);
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

    //Insert form elements into quiz table and return quizID
    db.query(`
    INSERT INTO quizzes (owner_id, name, description, photo_url, active, date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id;
    `, [req.session.user_id, name, description,'somePhotoURL', false, '2020-01-11'])
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

    //Redirect to user's quiz list
    // res.redirect(`/quizzes/${quizzes.id}`);
    res.redirect(`/api/widgets/quizzes/new`);
  })

  return router;
};
