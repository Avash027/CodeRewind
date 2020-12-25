const cfapi = require("./utils/cfapi");

const express = require("express");
const hbs = require("hbs");
const path = require("path");

const indexpath = path.join(__dirname, "../public"); //Path of static files
const viewsPath = path.join(__dirname, "../templates/views"); //Path of hbs views

const app = express(); //starting server

const port = process.env.PORT || 3000; //seting up port

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(express.static(indexpath));

app.get("", (req, res) => {
  res.render("index");
});

app.get("/query", (req, res) => {
  const userName = req.query.name;
  cfapi(userName, ({ type, cnt, lang, error }) => {
    if (error) res.send({ error });
    else res.status(200).send({ type, cnt, lang });
  });
});

app.listen(port, () => {
  console.log("Server is running on port : " + port);
});
