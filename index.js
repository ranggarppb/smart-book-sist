const express = require("express");
const PORT = 3000;
const routers = require("./routers");
const session = require("express-session");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 5000 },
  })
);
app.use(routers);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
