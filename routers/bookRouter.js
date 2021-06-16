const routers = require("express").Router();
const bookController = require("../controllers/bookController");

routers.get("/add", bookController.getAddBookForm);
routers.post("/add", bookController.addBook);
routers.get("/edit/:id", bookController.getEditBookForm);
routers.post("/edit/:id", bookController.editBook);
routers.get("/delete/:id", bookController.deleteBook);
routers.get("/", bookController.getBooks);

module.exports = routers;
