require('dotenv').config();
const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require('./routes/index');
const bodyParser = require('body-parser');

const PORT = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/', indexRouter);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}!`);
});
