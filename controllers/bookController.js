const { Book, Rack } = require("../models");

class bookController {
  static getBooks(req, res) {
    let { notif } = req.query;
    console.log(req.params);
    Book.findAll()
      .then((results) => {
        results = results.map((result) => result.dataValues);
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
      .then(res.redirect("/book?notif=Berhasil menambahkan data buku"))
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
      .then(() => res.redirect(`/book?notif=Berhasil mengubah data buku ${id}`))
      .catch((err) => res.render(err));
  }
  static deleteBook(req, res) {
    let { id } = req.params;
    Book.destroy({
      where: {
        id: +id,
      },
    })
      .then(() => res.redirect(`/book?notif=Berhasil mengubah data buku ${id}`))
      .catch((err) => res.render(err));
  }
}

module.exports = bookController;
