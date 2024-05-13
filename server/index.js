//import express from "express";
const express = require("express");
//import cors from "cors";
const cors = require("cors");
//import mysql from "mysql";
const mysql = require("mysql");

const app = express();  // create express app
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootPass@14",
    port: 3306,
    database: "task"
}); 

// Get all tasks
app.get("/tasks", (req, res) => {
    const sql = "SELECT * FROM task";
    db.query(sql, (err, data) => {
        if(err)
            return res.json(err);
        return res.json(data);
    })
});

// Insert a new task
app.post("/create", (req, res) => {
    const sql = "insert into task (name, desc, dueDate, userId) values (?)";
    const values = [
        req.body.title,
        req.body.description,
        req.body.dueDate,
        req.body.userId
    ]
    db.query(sql,[values], (err, data) => {
        if(err)
            return res.json(err);
        return res.json(data);
    })
});

// Update a record
app.put("/update/:id", (req, res) => {
    const sql = "update task set name = ?, desc = ?, dueDate = ?, userId = ? where id = ?";

    const values = [
        req.body.title,
        req.body.description,
        req.body.dueDate,
        req.body.userId
    ]
    // get the id from update/:id
    const id = req.params.id;
    db.query(sql,[...values, id], (err, data) => {
        if(err)
            return res.json(err);
        return res.json(data);
    })
});

// delete a record
app.delete("/delete/:id", (req, res) => {
    const sql = "delete from task where id = ?";

    // get the id from update/:id
    const id = req.params.id;
    db.query(sql,[id], (err, data) => {
        if(err)
            return res.json(err);
        return res.json(data);
    })
});

app.listen(3001, () => {
    console.log("running");
});

