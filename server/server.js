require("dotenv").config();

const cors = require("cors");
const database = require("./database");
const express = require("express");
const authenticateToken = require("./middleware/authenticateToken");

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

const signupRoute = require("./routes/user/signupRoute");
const loginRoute = require("./routes/user/loginRoute");
const deleteUserRoute = require("./routes/user/deleteUserRoute");
const forumPostsRoute = require("./routes/post/forumPostsRoute");
const createPostRoute = require("./routes/post/createPostRoute");
const deletePostRoute = require("./routes/post/deletePostRoute");
const getPostRoute = require("./routes/post/getPostRoute");
const createCommentRoute = require("./routes/comment/createCommentRoute");
const getCommentRoute = require("./routes/comment/getCommentRoute");

app.use(signupRoute);
app.use(loginRoute);
app.use(deleteUserRoute);
app.use(forumPostsRoute);
app.use(createPostRoute);
app.use(deletePostRoute);
app.use(getPostRoute);
app.use(createCommentRoute);
app.use(getCommentRoute);

app.get("/auth", authenticateToken, (req, res) => {
    res.status(200).send("you have access to the protected route");
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
