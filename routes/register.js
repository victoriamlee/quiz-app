const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("user_register")
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
    const user = req.body
    const name = user.name;
    const email = user.email;
    const password = user.password;

    // console.log(emailExist(email))
    return emailExist(email)
    .then(user => {
      if (user) {
        res.send({error: "email already exists"});
      } else {
        return db.query(`
        INSERT INTO users (name, email, password)
        VALUES ($1,$2,$3)
        RETURNING *;
        `, [name,email,password])
        .then((result) => {
          req.session.user_id = result.rows[0].id;
          res.redirect('/api/widgets/quizzes')
        });
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  })




          // console.log(emailExist(email))
          // if (emailExist(email) === null) {
          //     // DOESN'T WORK
          //     return db.query(`
          //     INSERT INTO users (name, email, password)
          //     VALUES ($1,$2,$3);
          //     `, [name,email,password])
          //     .then(() => {
          //         //DOESN'T WORK
          //         res.redirect('/api/widgets/quizzes');
          //       })
          //       .catch(err => {
          //           res
          //             .status(500)
          //             .json({ error: err.message });
          //         });
          //       } else {
          //           //WORKS
          //           res.send({error: "email already exists"});
          //           return;
          //         }
          //       })



  return router;
};
