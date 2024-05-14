//express is the language of node.js
const express = require("express");
const session = require("express-session");
//import express from "express";
const mysql = require("mysql");
//import mysql from "mysql";
const cors = require("cors");
//import cors from "cors";
const bodyParser = require("body-parser");
//import { AuthContext } from "/taskit/src/AuthContext.jsx";

const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "Mytasks",
  password: "Postpass@14",
  port: 5432,
});

client.connect();
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(session({
  secret: '123456789', // Replace with a secure secret key
  resave: false,
  saveUninitialized: true,
}));

app.get("/getTask/:id", (req, res) => {
  const id = req.params.id;
  const sql =
    "select title, description, to_char(duedate, 'YYYY-MM-DD') as duedate, userid from tasks where id = " +
    id;
  client.query(sql, (err, data) => {
    if (err) {
      return console.log(err);
    }
    console.log("Query results:", data.rows);
    return res.json(data.rows);
  });
});

app.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    // Define the SQL query to retrieve the user id based on username and password
    const sql = `
      SELECT id FROM users
      WHERE username = $1 AND password = $2
    `;
    const values = [username, password];
  
    // Execute the SQL query
    client.query(sql, values, (err, data) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "An error occurred while querying the database" });
      }
      
      if (data.rows.length > 0) {
        const userId = data.rows[0].id;
                
        return res.json({ userId });
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    });
  });

app.get("/tasks/:id", (req, res) => {
  const id = req.params.id;
  const sql = "select * from tasks where userid = " + id;
  client.query(sql, (err, data) => {
    if (err) {
      return console.log(err);
    }
    return res.json(data.rows); //console.log('Query results:', results);
  });
  //return res.json("From backend");
});

app.post("/create", (req, res) => {
  const { title, description, duedate, userid } = req.body;
  
  // Define the SQL query to insert data into the database
  const sql =
    "INSERT INTO tasks (title, description, duedate, userid) VALUES ($1, $2, $3, $4)";
  const values = [title, description, duedate, userid];
  
  // Execute the SQL query
  client
    .query(sql, values)
    .then((result) => {
      console.log("Data inserted successfully:", result.rows);
      res.status(200).json({ message: "Data inserted successfully" });
      //document.getElementById("response").innerText = JSON.stringify(res.data);
    })
    .catch((error) => {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "Failed to insert data" });
    });
});

// Update a record
app.put("/update/:id", (req, res) => {
  const { title, description, duedate, userid } = req.body;
  const id = req.params.id;
  // Define the SQL query to insert data into the database

  const sql =
    `
    UPDATE tasks
    SET title = $1, description = $2, duedate = $3, userid = $4
    WHERE id = ` + id;

  const values = [title, description, duedate, userid];

  // Execute the SQL query
  client
    .query(sql, values)
    .then((result) => {
      console.log("Data inserted successfully:", result.rows);
      res.status(200).json({ message: "Data inserted successfully" });
      //document.getElementById("response").innerText = JSON.stringify(res.data);
    })
    .catch((error) => {
      console.error("Error inserting data:", error);
      res.status(500).json({ error: "Failed to insert data" });
    });
});

app.delete("/delete/:id", (req, res) => {
  const taskId = req.params.id;
  const sql = "DELETE FROM tasks WHERE id = " + taskId;
  //console.log(sql);
  client.query(sql, (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
