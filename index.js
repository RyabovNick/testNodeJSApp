require("dotenv").config();
const express = require("express");
const app = express();
const pool = require("./config/config");
const bodyParser = require("body-parser");
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.route("/api/students").post((request, response) => {
  let { name, surname } = request.body;

  pool.query(
    "Insert into `students` (name, surname) Values (?,?)",
    [name, surname],
    (err, result) => {
      console.log(err);
      response.send(result);
    }
  );
});

app.route("/api/students/:n_z").delete((request, response) => {
  pool.query(
    "Delete from students where n_z = ?",
    [request.params.n_z],
    (err, result) => {
      console.log(err);
      response.send(result);
    }
  );
});

app.route("/api/students/:n_z").put((request, response) => {
  let { surname } = request.body;

  pool.query(
    "Update students SET surname = ? where n_z = ?",
    [surname, request.params.n_z],
    (err, result) => {
      console.log(err);
      response.send(result);
    }
  );
});

app.route("/").get((request, response) => {
  response.send("Hello world!");
});

app.route("/api/t/:group").get((request, response) => {
  let group = request.params["group"];
  response.send(`Hello ${group}`);
});

app.route("/api/students").get((req, res) => {
  pool.query("Select * from students", (err, result, fields) => {
    if (err) throw err;
    res.send(result);
  });
});

app.route("/api/students/:n_z").get((req, res) => {
  let n_z = req.params.n_z;
  pool.query(
    "Select * from students where n_z = ?",
    [n_z],
    (err, result, fields) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.listen(8081, () => {
  console.log("Server started");
});
