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
    let query = `SELECT * FROM widgets`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
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
    res.render("create_quiz");
  });

  //POST --- CREATE QUIZ
  // function generateRandomString() {
  //   return Math.random().toString(36).substring(2,8);
  // }

  router.post("/quizzes/new", (req, res) => {
    console.log(req.body);
    const name = req.body.name;
    const description = req.body.description;
    const question = req.body.question;
    const correct = req.body.correct;
    console.log(name, description, question, correct);

    //Insert form elements into quiz table
    db.query(`
    INSERT INTO quizzes (owner_id, name, description, photo_url, active, date)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id;
    `, [1, name, description,'somePhotoURL', true, '2020-01-11'])
    .then(res => {
      console.log('THEN -->', res.rows[0])
      //Insert form elements and returned quizID into questions table
      const quizID = res.rows[0];
      db.query(`
      INSERT INTO questions (quiz_id, question)
      VALUES ($1, $2)
      RETURNING id;
      `, [quizID.id, question])
      .then(res => {
        console.log('THEN -->', res.rows[0])
        const questionID = res.rows[0];
        //Iterate through answer array to create insert query
        //Pass true if radio button value (correct) equals index of answer in array
        let i = 1;
        for(let answer of req.body.answer) {
          let flag = false;
          if (i === parseInt(correct)) {
            flag = true;
            console.log('FLAGGED ','i --->', i, 'correct --->', correct)
          }

          db.query(`
          INSERT INTO answers (question_id, answer, correct)
          VALUES ($1, $2, $3);
          `, [questionID.id, answer, flag])
          .then(res => console.log('THEN -->', res.rows[0]))
          .catch(e => console.error(e.stack))
          console.log('i --->', i, 'correct --->', correct)
          i++;
        }

      })
      .catch(e => console.error(e.stack))
    })
    .catch(e => console.error(e.stack))

    //res.redirect(`/quizzes/${quizzes.id}`);
    res.render("create_quiz");
  })


  return router;
};


