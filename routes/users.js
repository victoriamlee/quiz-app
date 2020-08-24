/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });


<<<<<<< HEAD
=======
// Display the login form if not logged in else redirect to '/urls' if logged in
  router.get("/login", (req,res) => {
    // const currentUser = req.session.user_id;
    // if (!users[currentUser]) {
    //   const templateVars = {user: users[currentUser]};
    //   res.render("user_login", templateVars);
    // } else {
    //   res.redirect('/urls');
    // }

    //res.send("user_login");
    res.redirect('/');

  });



>>>>>>> feature/home-page
  return router;
};
