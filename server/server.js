require("dotenv").config();

const cors = require("cors");
const database = require("./database");
const express = require("express");
const authenticateToken = require("./middleware/authenticateToken");

const app = express();
app.use(cors());
app.use(express.json());

const port = 5000;

const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const deleteUserRoute = require("./routes/deleteUserRoute");

app.use(signupRoute);
app.use(loginRoute);
app.use(deleteUserRoute);

app.get("/auth", authenticateToken, (req, res) => {
  res.status(200).send("you have access to the protected route");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});