const express = require("express");
const mysql = require("mysql2");
const app = express();
app.use(express.json());
//? Tạo route
app.get("/ping", (req, res) => {
  res.send("Express is running");
});

// Setup MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "express",
  port: 3307,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database connected!");
});

app.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM users";
  connection.query(sql, function (err, result) {
    if (err) {
      throw err;
    }
    res.status(200).send(result);
  });
});

app.get("/api/user/:id", (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM users WHERE id = ${id}`;
  connection.query(sql, function (err, result) {
    if (err) throw err;
    if (result.length === 0) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(result);
    }
  });
});

app.post("/api/user", (req, res) => {
  //   const { name, email } = req.body;
  //   const sql = `INSERT INTO users(name,email) VALUES ('${name}', '${email}');`;
  //   connection.query(sql, function (err, result) {
  //     if (err) throw err;
  //     const subQuery = `SELECT * FROM users WHERE id = ${result.insertId}`;
  //     connection.query(subQuery, function (err, result) {
  //       if (err) throw err;
  //       res.status(201).send({ data: result });
  //     });
  //   });
  const sql = "INSERT INTO users SET ?";
  connection.query(sql, req.body, function (err, result) {
    if (err) throw err;
    res.status(201).send({ data: result.insertId });
  });
});

app.put("/api/user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const sql = `UPDATE users SET ? WHERE id = ${id}`;
  try {
    const [result] = await connection.promise().query(sql, { name, email });
    if (result.affectedRows === 0) {
      res.status(404).send("User not found");
    }
    const subQuery = `SELECT * FROM users WHERE id = ${id}`;
    const [result2] = await connection.promise().query(subQuery);
    res.status(200).send(resut2[0]);
  } catch (err) {
    throw err;
  }
});

app.patch("/api/user/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const index = users.findIndex((user) => user.id === parseInt(id));
  if (index !== -1) {
    if (name) {
      users[index].name = name;
    }
    if (email) {
      users[index].email = email;
    }
    res.status(200).send(users[index]);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

app.delete("/api/user/:id", async (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM users WHERE id = ${id}`;
  //   connection.query(sql, function (err, result) {
  //     if (err) throw err;
  //     if (result.affectedRows === 0) {
  //       res.status(404).send("User not found");
  //     } else {
  //       res.status(200).send({ message: "User deleted" });
  //     }
  //   });
  const [result] = await connection.promise().query(sql);
  console.log(result);
  if (result.affectedRows === 0) {
    res.status(404).send("User not found");
  } else {
    res.status(200).send({ message: "User deleted" });
  }
});

app.listen(8080, () => {
  console.log("This app is listening on port 8080!");
});
