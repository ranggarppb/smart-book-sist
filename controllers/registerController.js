const { User, Role } = require("../models");

class registerController {
  static getRegisterForm(req, res) {
    const { notif } = req.query;
    Role.findAll()
      .then((results) => {
        results = results.map((result) => result.dataValues);
        res.render("register", { notif: notif, roles: results });
      })
      .catch();
  }
  static register(req, res) {
    const { email, password, role_id } = req.body;
    console.log(req.body)
    User.create({ email: email, password: password, role_id: +role_id })
      .then((result) => {
        let notif = `berhasil register user ${result.email}`;
        res.redirect(`/login?notif=${notif}`);
      })
      .catch((err) => {
        res.send(err);
      });
  }
}

module.exports = registerController;
