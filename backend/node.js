const mysql = require("mysql");
const express = require("express");
var cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "berlin12",
  database: "lists",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get("/getall", (req, res) => {
  const sql = "SELECT * FROM t_users";
  con.query(sql, (err, results) => {
    if (err) res.status(404);
    res.send(results);
  });
});

app.get("/login", (req, res) => {
  const sql = `SELECT email,password,username FROM t_users WHERE email LIKE ? AND password LIKE ?`;
  con.query(sql, [req.query.email, req.query.password], (err, results) => {
    res.send(results);
  });
});

app.post("/register", (req, res) => {
  const sql = `insert into t_users values(?,?,?)`;
  con.query(
    sql,
    [req.body.user.email, req.body.user.password, req.body.user.username],
    (err, results) => {
      res.send(results);
    }
  );
});

app.get("/lists/:email", (req, res) => {
  const sql = `SELECT list_id, content,done FROM t_lists WHERE user_email LIKE ?`;
  con.query(sql, [req.params.email], (err, results) => {
    res.send(results);
  });
});

app.post("/lists", (req, res) => {
  const sql = `INSERT INTO t_lists(content, done, user_email) VALUES(?,default,?)`;
  con.query(
    sql,
    [req.body.list.content, req.body.list.email],
    (err, results) => {
      res.send(results);
    }
  );
});

app.patch("/done/:id", (req, res) => {
  const sql = `UPDATE t_lists set done=true WHERE list_id=?`;
  con.query(sql, [req.params.id], (err, results) => {
    res.send(results);
  });
});

app.patch("/undone/:id", (req, res) => {
  const sql = `UPDATE t_lists set done=false WHERE list_id=?`;
  con.query(sql, [req.params.id], (err, results) => {
    res.send(results);
  });
});

app.delete("/lists/:id", (req, res) => {
  const sql = `DELETE FROM t_lists WHERE list_id=?`;
  con.query(sql, [req.params.id], (err, results) => {
    res.send(results);
  });
});

app.listen("3000", () => {
  console.log("connect on port 3000");
});
