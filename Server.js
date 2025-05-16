
const express = require("express");
const mysql = require("mysql2"); 
const cors = require("cors");

const app = express(); 
app.use(cors()); 
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "S@wmiya@123", 
    database: "to_dos"
 });

app.get("/tasks", (req, res) => {
     db.query("SELECT * FROM tasks", (err, result) => { 
        if (err) return res.send(err); res.send(result);
    });
});

app.post("/add", (req, res) => {
    const { text } = req.body;
    db.query("INSERT INTO tasks (text) VALUES (?)", [text], (err, result) => {
        if (err) return res.send(err); res.send(result);
    });
});

app.put("/edit/:id", (req, res) => { 
    const { text } = req.body; 
    const { id } = req.params; 
    db.query("UPDATE tasks SET text = ? WHERE id = ?", [text, id], (err, result) => { 
        if (err) return res.send(err); 
        res.send(result); 
    });
});

app.delete("/delete/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM tasks WHERE id = ?", [id], (err, result) => {
        if (err) return res.send(err); res.send(result);
    });
});

app.listen(5000, () => {
    console.log("Server running on port 5000"); 
});