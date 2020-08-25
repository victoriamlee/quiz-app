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
    let query = `SELECT name, description, url FROM quizzes;`;
    console.log(query);
    db.query(query)
      .then(data => {
        const widgets = data.rows;
        console.log(widgets);
        //res.json({ widgets });
        const templateVars = {name : widgets[3].name, description: widgets[3].description, url: widgets[3].photo_url};
        res.render("index copy", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

  });
  return router;
};
