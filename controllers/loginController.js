const { User, Role } = require("../models");
const bcrypt = require("bcrypt");

class loginController {
  static showLoginForm(req, res) {
    let { notif } = req.query;
    res.render("login", { notif });
  }
  static login(req, res) {
    const { email, password } = req.body;
    User.findOne({
      include: [
        {
          model: Role,
        },
      ],
      where: { email },
    }).then((result) => {
      if (result) {
        let compare = bcrypt.compareSync(password, result.password);
        if (compare) {
          console.log(result);
          req.session.userId = result.id;
          req.session.role = result.Role.dataValues.role;
          res.redirect("/");
        } else {
          let err = new Error("Email atau password tidak ditemukan");
          err.name = "invalidEmailPassword";
          res.redirect("/login?notif=Email atau password tidak ditemukan")
          throw err;
        }
      } else {
        let err = new Error("Email atau password tidak ditemukan");
        err.name = "invalidEmailPassword";
        res.redirect("/login?notif=Email atau password tidak ditemukan")
        throw err;
      }
    });
  }
}

module.exports = loginController;
