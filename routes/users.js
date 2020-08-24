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


  router.get("/login", (req, res) => {
    res.render("user_login");
  });

  const emailExist = function(email) {
    return db.query(`
    SELECT *
    FROM users
    WHERE email = $1;
    `, [email])
    .then(res => res.rows[0])
  }

  router.post("/login", (req, res) => {
    const user = req.body
    const email = user.email;
    const password = user.password;
    if (email && password) {
      return db.query(`
      SELECT *
      FROM users
      WHERE email = $1 AND password = $2;
      `, [email,password])
      .then(() => {
        req.session.userId = user.id;
        res.send({user: {name: user.name, email: user.email, id: user.id}});
        response.redirect('/');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    }
  })

  router.get("/register", (req, res) => {
    res.render("user_register");
  });

  router.post("/register", (req, res) => {
    const user = req.body
    const name = user.name;
    const email = user.email;
    const password = user.password;
    if (!emailExist) {
      return db.query(`
      INSERT INTO users (name, email, password)
      VALUES ($1,$2,$3);
      `, [name,email,password])
      .then(() => {
        res.redirect('/api/widgets/quizzes');
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    } else {
      res.send({error: "email already exists"});
      return;
    }
  })


  return router;
};
