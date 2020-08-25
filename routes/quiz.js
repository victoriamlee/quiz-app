/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // const getQuizById = function(quiz_id) {
  //   return db.query(`
  //   SELECT *
  //   FROM questions
  //   WHERE quiz_id = $1;
  //   `, [quiz_id])
  //   .then(res => res.rows[0])
  // };

  // router.get("/quizzes/:id", (req, res) => {
  //   const quiz = getQuizById(quiz_id)
  //   console.log(quiz);
  //   .then(res => {
  //     res.send(res)
  //     res.render("quiz_page, quiz");
  //   })
  // })

  router.get("/:id", (req, res) => {
    console.log(req.params.id)
    return db.query(`
    SELECT questions.*, quizzes.name
    FROM questions
    JOIN quizzes ON quizzes.id = quiz_id
    WHERE quiz_id = $1;
    `, [req.params.id])
    .then(result => {
      let quiz = result.rows;
      let questionsObj = {};
      for (let i = 0; i < quiz.length; i++) {
        questionsObj[i] = { name: quiz[i].name, question: quiz[i].question, answer: quiz[i].answer };
      }
      // console.log("QUIZ: ", quiz)
      let templateVars = { questionsObj };
      // console.log("TEMPLATE: ", templateVars)

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


  return router;
};
