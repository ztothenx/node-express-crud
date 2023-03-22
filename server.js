var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');
require('dotenv').config()

const connection = mysql.createConnection(process.env.DATABASE_URL)
console.log('Connected to PlanetScale!')


var app = express()
app.use(cors())
app.use(express.json())

app.get('/users', function (req, res, next) {
    connection.query(
        'SELECT * FROM `users`',
        function (err, results, fields) {
            res.json(results);
        }
    );
})

app.get('/users/:id', function (req, res, next) {
    const id = req.params.id;
    connection.query(
        'SELECT * FROM users WHERE id = ?',
        [id],
        function (err, results) {
            res.json(results);
        }
    );
})

app.post('/users', function (req, res, next) {
    connection.query(
        'INSERT INTO `users`(`fname`, `lname`, `username`, `password`, `avatar`) VALUES (?, ?, ?, ?, ?)',
        [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar],
        function (err, results) {
            res.json(results);
            console.log(err)
            console.log(results)
        }
    );
})

app.put('/users', function (req, res, next) {
    connection.query(
        'UPDATE users SET `fname`= ?, `lname`= ?, `username`= ?, `password`= ?, `avatar`= ? WHERE id = ?',
        [req.body.fname, req.body.lname, req.body.username, req.body.password, req.body.avatar, req.body.id],
        function (err, results) {
            res.json(results);
        }
    );
})

app.delete('/users', function (req, res, next) {
    connection.query(
        'DELETE FROM users WHERE id = ?',
        [req.body.id],
        function (err, results) {
            res.json(results);
        }
    );
})

app.listen(5000, function () {
    console.log('CORS-enabled web server listening on port 5000')
})