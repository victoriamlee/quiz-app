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
  };



  router.post("/login", (req, res) => {
    const email = req.body.email;
    return emailExist(email)
      .then(user => {
          if (req.body.password !== user.password) {
          res.send({error: "incorrect password"})
        } else {
          res.redirect('/api/widgets/quizzes')
        }
        })
        .catch(err => {
          res.send({error: "email does not exist"});
        });

  })

  router.get("/register", (req, res) => {
    res.render("user_register");
  });

  router.post("/register", (req, res) => {
    const user = req.body
    const name = user.name;
    const email = user.email;
    const password = user.password;

    console.log(emailExist(email))
    if (emailExist(email) === null) {
        // DOESN'T WORK
        return db.query(`
        INSERT INTO users (name, email, password)
        VALUES ($1,$2,$3);
        `, [name,email,password])
        .then(() => {
            //DOESN'T WORK
            res.redirect('/api/widgets/quizzes');
          })
          .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });
          } else {
              //WORKS
              res.send({error: "email already exists"});
              return;
            }
          })






          //   console.log(emailExist(email))
          //   return emailExist(email)

          //   .then(() => {
          //     res.send({error: "email already exists"});
          //     return;
          //   })
          //   .catch(() => {
          //     db.query(`
          //     INSERT INTO users (name, email, password)
          //     VALUES ($1,$2,$3);
          //     `, [name,email,password])
          //     res.redirect('/api/widgets/quizzes');
          //   })
          // })

  return router;
};
