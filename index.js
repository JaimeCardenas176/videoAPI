const express = require('express');
const { config } = require('./config/index');

const app = express();

const moviesApi = require('./router/movies');

moviesApi(app);
//app.get('/', (req, res) => {
    //res.send("probando server con express")
//});
//
//app.get('/json', (req, res) => {
//    res.json({
//        hello: 'world'
//    });
//});

app.listen(config.port, () => {
    console.log(`Listening on http://localhost:${config.port}`);
});