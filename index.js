const express = require("express");
const mysql = require("mysql");

// create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

// connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected");
});

const app = express();

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Database Created");
  });
});

//create table
app.get("/createemployee", (req, res) => {
  let sql =
    "CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255),designation VARCHAR(255),PRIMARY KEY(id))";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Employee table created...");
  });
});

//create table
app.get("/setemployee", (req, res) => {
  let post = { name: "John Dombull", designation: "Chief Executive Officer" };

  let sql = "INSERT INTO employee SET ?";
  db.query(sql, post, (err) => {
    if (err) {
      throw err;
    }
    res.send("Employee added...");
  });
});

//select all employee
app.get("/getemployee", (req, res) => {
  let sql = "SELECT * FROM employee";
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send("Employee details fetched...");
  });
});

//select employee
app.get("/getemployee/:id", (req, res) => {
  let id = req.params.id;
  let sql = "SELECT * FROM employee WHERE id=?";
  db.query(sql, id, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send("Employee details fetched...");
  });
});

//update employee
app.get("/updateemployee/:id", (req, res) => {
  let id = req.params.id,
    newname = "New Name";
  let sql = `UPDATE employee SET name="${newname}" WHERE id=${id}`,
    query = db.query(sql, (err) => {
      if (err) {
        throw err;
      }
      res.send("Employee Updated...");
    });
});

//delete employee
app.get("/deleteemployee/:id", (req, res) => {
  let id = req.params.id;
  let sql = "DELETE FROM employee WHERE id=?";
  db.query(sql, id, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send("Employee deleted...");
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
