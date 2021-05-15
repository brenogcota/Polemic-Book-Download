const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const fetch = require('node-fetch');

require('dotenv').config();

const app = express();

app.use(morgan('tiny'));
app.use(cors());

app.use('/static', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/views' });
});

function notFound(req, res, next) {
    const error = new Error('Not found');
    next(error);
}

function errorHandler(error, req, res, next) {
    res.status(res.statusCode || 500)
    res.json({
        message: error.message
    })
}

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listen on port: ", port);
})