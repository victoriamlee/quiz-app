const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

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
        if (user) {
          console.log(req.body.password, user.password)
          if (!bcrypt.compareSync(req.body.password, user.password)) {
          res.send({error: "incorrect password"})
        } else {
          req.session.user_id = user.id;
          res.redirect('/api/widgets/quizzes');
        }
      } else {
        res.send({error: "email does not exist"});
      }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });
  })


  return router;
};
