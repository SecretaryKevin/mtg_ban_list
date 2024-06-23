const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/router.js');
const dotenv = require('dotenv');

let origin = process.env.ORIGIN
let port = process.env.PORT
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(
    {
        origin: origin,
        credentials: true,
        optionsSuccessStatus: 200
    }
));


app.use('/', router);

const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})


