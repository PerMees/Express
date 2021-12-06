const express = require("express");
const app = express();
app.use(express.json());
//? Tạo route
app.get("/ping", (req, res) => {
  res.send("Express is running");
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Database connected!");
});

const users = [
  { id: 1, name: "Nguyen Van A", email: "nva@gmail.com" },
  { id: 2, name: "Le Van B", email: "lvb@gmail.com" },
  { id: 3, name: "Nguyen Van C", email: "nvc@gmail.com" },
  { id: 4, name: "Le Van D", email: "lvd@gmail.com" },
];

/** //? Restful API:
 ** API get all user
 ** method: GET
 ** route: /api/v1/users
 **
 ** API get user by id
 ** method: GET
 ** route: /api/v1/user/:id
 *
 ** API create new user
 ** method: POST
 ** route: /api/v1/user
 **
 ** API update user
 ** method: PUT
 ** route: /api/v1/user/:id
 **
 ** API delete user
 ** method: DELETE
 ** route: /api/v1/user/:id
 */
app.get("/api/users", (req, res) => {
  res.status(200).send(users);
});

app.get("/api/user/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((user) => user.id === parseInt(id));
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

app.post("/api/user", (req, res) => {
  const { name, email } = req.body;
  const user = { id: users.length + 1, name, email };
  users.push(user);
  res.status(201).send(user);
});

app.put("/api/user/:id", (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const index = users.findIndex((user) => user.id === parseInt(id));
  if (index !== -1) {
    users[index].name = name;
    users[index].email = email;
    res.status(200).send(users[index]);
  } else {
    res.status(404).send({ message: "User not found" });
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

app.delete("/api/user/:id", (req, res) => {
  const { id } = req.params;
  const index = users.findIndex((user) => user.id === parseInt(id));
  if (index !== -1) {
    users.splice(index, 1);
    res.status(200).send({ message: "User deleted!" });
  } else {
    res.status(404).send({ message: "User not found!" });
  }
});

app.listen(8080, () => {
  console.log("This app is listening on port 8080!");
});
