// /*
//  * All routes for Widgets are defined here
//  * Since this file is loaded in server.js into api/widgets,
//  *   these routes are mounted onto /widgets
//  * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
//  */

// const express = require('express');
// const router  = express.Router();

// module.exports = (db) => {

//   router.get("/", (req, res) => {
//     return db.query(`
//       SELECT quiz_attempts.*, quizzes.*
//       FROM quiz_attempts
//       JOIN quizzes ON quiz_id = quizzes.id
//       WHERE quiz_attempts.user_id = $1
//       ORDER BY quiz_attempts.end_time DESC;
//     `, [req.session.user_id])
//     .then(data => {
//       const queryData = data.rows;
//       let quizObj = {};
//         for (let i = 0; i < queryData.length; i++) {
//           quizObj[i] = {name: queryData[i].name, endTime: queryData[i].end_time, score: queryData[i].results};
//         }
//       let templateVars = {quizObj};

//       if (req.session.user_id) {
//         templateVars.user = req.session.user_id;
//       } else {
//         templateVars.user = "";
//       }

//       res.render("results", templateVars);
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
//   });

//   return router;
// };
