const routers = require("express").Router();
const bookController = require("../controllers/bookController");

routers.get("/list/add", bookController.getAddBookForm);
routers.post("/list/add", bookController.addBook);
routers.get("/list/edit/:id", bookController.getEditBookForm);
routers.post("/list/edit/:id", bookController.editBook);
routers.get("/list/delete/:id", bookController.deleteBook);
routers.get("/list", bookController.getBooks);

routers.get("/info/:id", bookController.getBookInfo);
routers.get("/info/create-review/:id", bookController.getAddReviewForm)
routers.post("/info/create-review/:id", bookController.addReview)
routers.get("/info", bookController.getBookScanner);

module.exports = routers;
