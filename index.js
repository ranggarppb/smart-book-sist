const express = require("express");
const PORT = 3000;
const routers = require("./routers");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(routers);

app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});
