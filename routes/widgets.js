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
<<<<<<< HEAD
    let query = `SELECT name, description, url FROM quizzes;`;
=======
    let query = `SELECT * FROM quizzes`;
>>>>>>> eb577dd01c74b87229647dafd9315a2c6f0ed6a2
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

  return router;
};
