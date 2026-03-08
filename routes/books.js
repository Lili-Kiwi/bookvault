const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
    getAllBooks,
    getNewBook,
    createBook,
    getBook,
    getEditBook,
    updateBook,
    deleteBook,
} = require("../controllers/books");

router.use(auth);

router.get("/", getAllBooks);
router.get("/new", getNewBook);
router.post("/", createBook);
router.get("/:id", getBook);
router.get("/:id/edit", getEditBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
