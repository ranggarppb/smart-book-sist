const { Book, Rack, Review, sequelize } = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const toRupiah = require("../helpers/toRupiah");

class bookController {
  static getBooks(req, res) {
    let { notif } = req.query;
    Book.findAll()
      .then((results) => {
        results = results.map((result) => result.dataValues);
        results = results.map((result) => {
          result.price = toRupiah(String(result.price), ".");
          return result;
        });
        res.render("books", { notif: notif, books: results });
      })
      .catch((err) => res.send(err));
  }
  static getAddBookForm(req, res) {
    Rack.findAll()
      .then((result) => res.render("add-book-form", { racks: result }))
      .catch((err) => res.send(err));
  }
  static addBook(req, res) {
    let { name, price, stock, category, rack_id } = req.body;
    Book.create({
      name: name,
      price: +price,
      stock: +stock,
      category: category,
      rack_id: +rack_id,
    })
      .then(res.redirect("/book/list?notif=Berhasil menambahkan data buku"))
      .catch((err) => res.send(err));
  }
  static getEditBookForm(req, res) {
    let { id } = req.params;
    let rackOptions = [];
    Rack.findAll()
      .then((results) => {
        results.forEach((result) => rackOptions.push(result.dataValues.id));
        return Book.findOne({
          where: {
            id: +id,
          },
        });
      })
      .then((result) => {
        res.render("edit-book-form", {
          book: result,
          rackOptions: rackOptions,
        });
      })
      .catch((err) => res.send(err));
  }
  static editBook(req, res) {
    let { id } = req.params;
    let { name, price, stock, category, rack_id } = req.body;
    console.log(name, price, stock, category, rack_id);
    Book.update(
      {
        name: name,
        price: price,
        stock: stock,
        category: category,
        rack_id: rack_id,
      },
      { where: { id: +id } }
    )
      .then(() =>
        res.redirect(`/book/list?notif=Berhasil mengubah data buku ${id}`)
      )
      .catch((err) => res.render(err));
  }
  static deleteBook(req, res) {
    let { id } = req.params;
    if (req.session.role === "superadmin") {
      Book.destroy({
        where: {
          id: +id,
        },
      })
        .then(() =>
          res.redirect(`/book/list?notif=Berhasil mengubah data buku ${id}`)
        )
        .catch((err) => res.render(err));
    } else {
      res.redirect(`/book/list?notif=Tidak terautentikasi mendelete buku`);
    }
  }

  static getBookScanner(req, res) {
    res.render("book-scanner");
  }
  static getBookInfo(req, res) {
    let { id } = req.params;
    let reviews, ratings, averageRating, category;
    Book.findOne({
      include: [
        {
          model: Rack,
        },
        {
          model: Review,
        },
      ],
      where: {
        id: +id,
      },
    }).then((result) => {
      if (!result) res.render("error-page", { notif: "Buku tidak ditemukan" });
      if (result.dataValues.Reviews.length > 0) {
        reviews = result.dataValues.Reviews.map(
          (review) => review.dataValues.review
        );
        ratings = result.dataValues.Reviews.map((review) => {
          return review.dataValues.rating;
        });
        averageRating = ratings.reduce((a, b) => a + b) / ratings.length;
        category = result.dataValues.category;
        result.dataValues.price = toRupiah(
          String(result.dataValues.price),
          "."
        );
      }
      return Book.findAll({
        include: [
          {
            model: Review,
          },
        ],
        where: {
          name: {
            [Op.not]: result.dataValues.name,
          },
        },
      }).then((allBooks) => {
        allBooks = allBooks.map((book) => {
          if (book.dataValues.Reviews.length > 0) {
            book.dataValues.ratings = book.dataValues.Reviews.map(
              (review) => review.dataValues.rating
            );
            book.dataValues.averageRating =
              book.dataValues.ratings.reduce((a, b) => a + b) /
              book.dataValues.ratings.length;
            return book;
          } else {
            (book.dataValues.ratings = null),
              (book.dataValues.averageRating = null);
            return book;
          }
        });
        let likedBooks = allBooks.filter(
          (book) =>
            book.dataValues.averageRating >= averageRating &&
            book.dataValues.category === category
        );
        res.render("book-info", {
          book: result,
          reviews: reviews,
          averageRating: averageRating ? averageRating.toFixed(2) : null,
          likedBooks: likedBooks,
        });
      });
    });
  }
  static getAddReviewForm(req, res) {
    let { id } = req.params;
    res.render("add-book-review-form", { id: +id });
  }
  static addReview(req, res) {
    let { review, rating } = req.body;
    let { id } = req.params;
    Review.create({
      user_id: null,
      book_id: +id,
      review: review,
      rating: rating,
    })
      .then(() =>
        res.redirect(`/book/info/${id}?notif=Berhasil menambahkan review`)
      )
      .catch((err) => res.send(err));
  }
}

module.exports = bookController;
