const express = require('express');
const { config } = require('./config/index');

const app = express();

app.get('/', (req, res) => {
    res.send("probando server con express")
});

app.get('/json', (req, res) => {
    res.json({
        hello: 'world'
    });
});

app.listen(config.port, () => {
    console.log(`Listening on http://localhost:${config.port}`);
});