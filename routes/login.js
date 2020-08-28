const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  router.get("/", (req, res) => {
    let templateVars = {};
    if (req.session.user_id) {
      templateVars.user = req.session.user_id;
    } else {
      templateVars.user = "";
    }
    res.render("user_login", templateVars);
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
            let templateVars = { user: req.session.user_id, message: "Error: Email or password is incorrect" };
            res.render("error", templateVars);
        } else {
          req.session.user_id = user.id;
          res.redirect('/');
        }
      } else {
        let templateVars = { user: req.session.user_id, message: "Error: Email or password is incorrect" };
        res.render("error", templateVars);
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
