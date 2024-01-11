require("dotenv").config();

const cors = require("cors");
const database = require("./database");
const express = require("express");

const loginRoute = require("./routes/loginRoute");
const signupRoute = require("./routes/signupRoute");
const createPostRoute = require("./routes/createPostRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use(loginRoute);
app.use(signupRoute);
app.use(createPostRoute);

const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
