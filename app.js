require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>BookVault API</h1>");
});

app.use((req, res) => {
    res.status(404).send(`That page (${req.url}) was not found.`);
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send(err.message);
});

const port = process.env.PORT || 3000;

const start = async () => {
    try {
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();
