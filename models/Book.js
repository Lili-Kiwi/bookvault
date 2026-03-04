const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide book title"],
        maxlength: 200,
    },
    author: {
        type: String,
        required: [true, "Please provide author"],
        maxlength: 100,
    },
    genre: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ["wishlist", "reading", "completed"],
        default: "wishlist",
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    pages: {
        type: Number,
        min: 1,
    },
    dateStarted: {
        type: Date,
    },
    dateCompleted: {
        type: Date,
    },
    isFavorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide user"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Book", BookSchema);
