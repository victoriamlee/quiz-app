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

  router.get("/:id/results", (req, res) => {
    return db.query(`
      SELECT quizzes.name, quiz_attempts.results, TO_CHAR(quiz_attempts.end_time, 'Month DD YYYY') as quiz_date,
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

  return router;
};
