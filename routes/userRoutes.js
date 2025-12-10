import express from "express";
import db from "../db.js";

const router = express.Router();

// CREATE user (POST)
router.post("/users", (req, res) => {
  const { name, email, age } = req.body;
  const sql = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";

  db.query(sql, [name, email, age], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "User created", id: result.insertId });
  });
});

// GET all users (GET)
router.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows);
  });
});

// GET single user by ID (GET)
router.get("/users/:id", (req, res) => {
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    res.json(rows[0]);
  });
});

export default router;

// UPDATE user by ID
router.put("/users/:id", (req, res) => {
  const { name, email, age } = req.body;
  const sql = "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?";

  db.query(sql, [name, email, age, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated successfully" });
  });
});

// DELETE user by ID
router.delete("/users/:id", (req, res) => {
  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  });
});
