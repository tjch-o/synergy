require("dotenv").config({ path: "../.env" });

const mongoose = require("mongoose");

const url = process.env.MONGO_URL;

mongoose
    .connect(url)
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.log("Could not connect to database", err);
    });
