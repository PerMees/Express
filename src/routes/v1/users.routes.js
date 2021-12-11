const express = require("express");
const userControllers = require("../../controllers/users.controllers");

// url: api/v1/users
const userRouter = express.Router();

/**
 * API get users
 * method: GET
 * url: http://localhost:8080/api/v1/users
 */
userRouter.get("/", userControllers.getUsers);

/**
 * API get user by id
 * method: GET
 * url: http://localhost:8080/api/users/1
 */
userRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * from users WHERE id = ?`;

  try {
    const [result] = await conn.query(sql, [id]);
    const user = result?.[0];

    if (!user) {
      res.status(400).send("user not found");
    }

    res.status(200).send({ data: user });
  } catch (error) {
    throw error;
  }
});

/**
 * API create user
 * method: POST
 * url: http://localhost:8080/api/users
 */
userRouter.post("/", userControllers.createUser);

/**
 * API update user
 * method: PUT
 * url: http://localhost:8080/api/users/1
 */
userRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  try {
    const sql1 = `UPDATE users SET ? WHERE id = ${id}`;

    const [result1] = await conn.query(sql1, { name, email });
    if (!result1.affectedRows) {
      res.status(400).send("user not found");
    }

    const sql2 = `SELECT * from users WHERE id = ${id}`;
    const [result2] = await conn.query(sql2);

    const user = result2?.[0];

    res.status(200).send(user);
  } catch (error) {
    throw error;
  }
});

/**
 * API delete user
 * method: DELETE
 * url: http://localhost:8080/api/users/1
 */
userRouter.delete(":id", async (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM users WHERE id = ?`;
  try {
    const [result] = await conn.query(sql, [id]);

    if (!result.affectedRows) {
      res.status(400).send("user not found");
    }

    res.status(200).send({ data: "success" });
  } catch (error) {
    throw error;
  }
});

module.exports = userRouter;
