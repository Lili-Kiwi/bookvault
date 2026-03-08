const Book = require("../models/Book");
const { NotFoundError } = require("../errors");

const getAllBooks = async (req, res) => {
    const books = await Book.find({ owner: req.user._id });
    res.render("books/index", { books });
};

const getNewBook = (req, res) => {
    res.render("books/new");
};

const createBook = async (req, res) => {
    req.body.owner = req.user._id;
    console.log("creating book", req.body);
    await Book.create(req.body);
    req.flash("success", "Book added!");
    res.redirect("/books");
};

const getBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        throw new NotFoundError("Book not found");
    }
    if (book.owner.toString() !== req.user._id.toString()) {
        req.flash("error", "You don't have permission to view that book.");
        return res.redirect("/books");
    }
    res.render("books/show", { book });
};

const getEditBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        throw new NotFoundError("Book not found");
    }
    if (book.owner.toString() !== req.user._id.toString()) {
        req.flash("error", "You don't have permission to edit that book.");
        return res.redirect("/books");
    }
    res.render("books/edit", { book });
};

const updateBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        throw new NotFoundError("Book not found");
    }
    if (book.owner.toString() !== req.user._id.toString()) {
        req.flash("error", "You don't have permission to edit that book.");
        return res.redirect("/books");
    }
    await Book.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    req.flash("success", "Book updated!");
    res.redirect(`/books/${req.params.id}`);
};

const deleteBook = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) {
        throw new NotFoundError("Book not found");
    }
    if (book.owner.toString() !== req.user._id.toString()) {
        req.flash("error", "You don't have permission to delete that book.");
        return res.redirect("/books");
    }
    await Book.findByIdAndDelete(req.params.id);
    req.flash("success", "Book deleted.");
    res.redirect("/books");
};

module.exports = { getAllBooks, getNewBook, createBook, getBook, getEditBook, updateBook, deleteBook };
