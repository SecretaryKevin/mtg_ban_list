const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const mysql = require('mysql');
dotenv.config();

let connection = mysql.createConnection({
    host: process.env.DATABASE_HOSTNAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT
});

connection.connect((err) => {
    if (err) {
        console.log("Error connecting to database: " + err);
    } else {
        console.log("Connected to database");
    }
});


router.get('/GetUsers', (req, res) => {
    // get all users from the database
    connection.query('SELECT * FROM Users', (err, rows) => {
        if (err) {
            console.log("Error: " + err)
        }
        res.send(rows);
    })
})


router.post('/AddUser', (req, res) => {
    // adds a user to the database
    //get user_uuid and user_name from request
    let user_uuid = req.body.user_uuid;
    let user_name = req.body.user_name;
    //check if user_uuid is already in the database
    connection.query('SELECT * FROM Users WHERE user_uuid = ?', [user_uuid], (err, rows) => {
        if (err) {
            console.log("Error: " + err)
        }
        if (rows.length > 0) {
            res.send("User already exists");
        } else {
            connection.query('INSERT INTO Users (user_uuid, user_name) VALUES (?, ?)', [user_uuid, user_name], (err, rows) => {
                if (err) {
                    console.log("Error: " + err)
                }
                res.send("User added");
            })
        }
    })
})

router.get('/getCards', (req, res) => {
    //get all cards from the database
    connection.query('SELECT * FROM Cards', (err, rows) => {
        if (err) {
            console.log("Error: " + err)
        }
        res.send(rows);
    })
})

router.post('/addCard', (req, res) => {
    // adds a card to the database
    // get card_name, reason_for_ban recommended by (user id) status from request
    let card_name = req.body.card_name;
    let reason_for_ban = req.body.reason_for_ban;
    let recommended_by = req.body.recommended_by;
    let status = req.body.status;
    // check if card_name is already in the database
    connection.query('SELECT * FROM Cards WHERE card_name = ?', [card_name], (err, rows) => {
        if (err) {
            console.log("Error: " + err)
        }
        if (rows.length > 0) {
            res.send("Card already exists");
        } else {
            connection.query('INSERT INTO Cards (card_name, reason_for_ban, recommended_by, status) VALUES (?, ?, ?, ?)', [card_name, reason_for_ban, recommended_by, status], (err, rows) => {
                if (err) {
                    console.log("Error: " + err)
                }
                res.send("Card added");
            })
        }
    })
})

router.get('/getCardVotes', (req, res) => {

})

router.post('/updateVote', (req, res) => {

})


module.exports = router;
