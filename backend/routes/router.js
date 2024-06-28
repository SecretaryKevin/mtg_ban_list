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
    console.log('Getting users' )
    connection.query('SELECT * FROM Users', (err, rows) => {
        if (err) {
            console.log("Error: " + err)
        }
        res.send(rows);
    })
})

router.get('/getCards', (req, res) => {
    //get all cards from the database
    console.log('Getting cards')
    connection.query('SELECT * FROM Cards', (err, rows) => {
        if (err) {
            console.log("Error: " + err)
        }
        res.send(rows);
    })
})

router.get('/getVotes', (req, res) => {
    //get all votes from the database
    console.log('Getting votes')
    connection.query('SELECT * FROM Votes', (err, rows) => {
        if (err) {
            console.log("Error: " + err)
        }
        res.send(rows);
    })
})

router.post('/addUser', (req, res) => {
    console.log("Adding User uuid: " + req.body.uuid + " and username: " + req.body.name)
    let uuid = req.body.uuid;
    let username = req.body.name;
    connection.query(`INSERT INTO Users (user_uuid, user_name) VALUES ('${uuid}', '${username}')`, (err) => {
        if (err) {
            console.log("Error: " + err)
        }
    })
})

router.post('/addCard', (req, res) => {
    let card_name = req.body.card_name;
    let card_image_url = req.body.card_image_url;
    let reason_for_ban = req.body.reason_for_ban;
    let recommended_by = req.body.recommended_by;
    let status = req.body.status;
    console.log("Adding Card: " + card_name + " with reason: " + reason_for_ban + " recommended by: " + recommended_by + " status: " + status)
    let sql = `INSERT INTO Cards (card_name, reason_for_ban, recommended_by, status, card_image_url) VALUES (?, ?, ?, ?, ?)`;
    let values = [card_name, reason_for_ban, recommended_by, status, card_image_url];
    connection.query(sql, values, (err) => {
        if (err) {
            console.log("Error: " + err)
        }
    })
})

router.post('/addVote', (req, res) => {
    console.log("Adding Vote: " + req.body.vote)
    let vote_id = req.body.vote_id;
    let card_id = req.body.card_id;
    let user_uuid = req.body.user_id;
    let vote = req.body.vote;
    connection.query(`INSERT INTO Votes (vote_id, card_id, user_uuid, vote) VALUES ('${vote_id}', '${card_id}', '${user_uuid}', '${vote}')`, (err) => {
        if (err) {
            console.log("Error: " + err)
        }
    })
})

router.post('/updateCard', (req, res) => {
    console.log("Updating Card: " + req.body.card)
    let card_id = req.body.card_id;
    let status = req.body.status;
    connection.query(`UPDATE Cards SET status = '${status}' WHERE card_id = '${card_id}'`, (err) => {
        if (err) {
            console.log("Error: " + err)
        }
    })
})

router.post('/updateVote', (req, res) => {
    console.log("Updating Vote: " + req.body.vote)
    let vote_id = req.body.vote_id;
    let vote = req.body.vote;
    connection.query(`UPDATE Votes SET vote = '${vote}' WHERE vote_id = '${vote_id}'`, (err) => {
        if (err) {
            console.log("Error: " + err)
        }
    })
})

router.post('/deleteCard', (req, res) => {
    console.log("Deleting Card: " + req.body.card)
    let card_id = req.body.card_id;
    connection.query(`DELETE FROM Cards WHERE card_id = '${card_id}'`, (err) => {
        if (err) {
            console.log("Error: " + err)
        }
    })
})


module.exports = router;
