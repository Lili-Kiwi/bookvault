require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const passport = require("passport");
require("./config/passport");

const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const booksRouter = require("./routes/books");

app.set("view engine", "ejs");

app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(mongoSanitize());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
        cookie: { secure: false },
    })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(methodOverride("_method"));

app.use((req, res, next) => {
    res.locals.currentUser = req.user || null;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// routes
app.use(authRouter);
app.use("/books", booksRouter);

app.use((req, res) => {
    res.status(404).render("404", { url: req.url });
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.statusCode || 500).render("error", { error: err });
});

const port = process.env.PORT || 3000;

const start = () => {
    connectDB(process.env.MONGO_URI).then(() => {
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    }).catch((err) => {
        console.log(err);
    });
};

start();
