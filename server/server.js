require("dotenv").config();

const cors = require("cors");
const database = require("./database");
const express = require("express");

const loginRoute = require("./routes/loginRoute");
const signupRoute = require("./routes/signupRoute");
const accessForumRoute = require("./routes/accessForumRoute");
const accessCreatePostRoute = require("./routes/accessCreatePostRoute");
const createPostRoute = require("./routes/createPostRoute");
const getPostRoute = require("./routes/getPostRoute");
const fetchPostsRoute = require("./routes/fetchPostsRoute");
const createCommentRoute = require("./routes/createCommentRoute");

const app = express();
app.use(cors());
app.use(express.json());

app.use(loginRoute);
app.use(signupRoute);
app.use(accessForumRoute);
app.use(accessCreatePostRoute);
app.use(createPostRoute);
app.use(getPostRoute);
app.use(fetchPostsRoute);
app.use(createCommentRoute);

const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
