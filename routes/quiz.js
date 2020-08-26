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
        for (let i = 0; i < quiz.length; i++) {
          questionsObj[i] = { question: quiz[i].question }
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
  return router;
};
