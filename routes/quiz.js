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

  router.get("/", (req, res) => {
    // console.log(req)
    return db.query(`
    SELECT *
    FROM questions
    WHERE quiz_id = $1;
    `, [quizzes.id])
    .then(res => {
      const quiz = res.rows[0];
      const templateVars = {};
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
