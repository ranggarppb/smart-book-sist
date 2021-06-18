const routers = require("express").Router();
const bookRouter = require("./bookRouter");
const login = require("./login");
const register = require("./register");

routers.get("/", (req, res) => {
  if (
    req.session.userId &&
    (req.session.role === "superadmin" || req.session.role === "admin")
  ) {
    res.render("home", { role: "admin" });
  } else if (req.session.userId && req.session.role === "public") {
    res.render("home", { role: "public" });
  } else {
    res.redirect("/login?notif=Mohon untuk login terlebih dahulu");
  }
});
routers.use("/book", bookRouter);
routers.use("/login", login);
routers.use("/register", register);
routers.use("/logout", (req,res)=> {
    req.session.destroy()
    res.redirect(`/login?notif=Berhasi logout`)
})

module.exports = routers;
