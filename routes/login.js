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
    res.render("user_login");
  });

  const emailExist = function(email) {
    return db.query(`
    SELECT *
    FROM users
    WHERE email = $1;
    `, [email])
    .then(res => res.rows[0])
  };

  router.post("/", (req, res) => {
    const email = req.body.email;
    return emailExist(email)
      .then(user => {
          if (req.body.password !== user.password) {
          res.send({error: "incorrect password"})
        } else {
          req.session.user_id = user.id;
          res.redirect('/api/widgets/quizzes');
        }
        })
        .catch(err => {
          res.send({error: "email does not exist"});
        });
  })


  return router;
};
