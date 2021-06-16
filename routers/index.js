const routers = require("express").Router();
const bookRouter = require("./bookRouter");

routers.get("/", (_, res) => res.render("home"));
routers.use("/book", bookRouter);

module.exports = routers;
