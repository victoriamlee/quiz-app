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
    //const quizId = req.body.quiz_id;
    let templateVars = {};

    if (req.session.user_id) {
      templateVars.user = req.session.user_id;
    } else {
      templateVars.user = "";
    }

    // return db.query(`
    //   SELECT *
    //   FROM quiz_attempts
    //   WHERE user_id = $1 and quiz_id = $2;
    // `, [req.session.user_id, quizzes.id])
    db.query(`
      SELECT *
      FROM quiz_attempts
      WHERE quiz_id = 1;
    `)
    .then(data => {
      const queryData = data.rows[0];
      templateVars.data = {quizId: queryData.quiz_id, endTime: queryData.end_time, score: queryData.results};
      console.log("$$$$$$$$4", templateVars);
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
