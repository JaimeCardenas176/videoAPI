const express = require('express');
const { config } = require('./config/index');

const app = express();

const { logErrors, wrapErrors, errorHandler} = require('./utils/middlewares/errorHandler');
const notFoundHandler = require('./utils/middlewares/notFoundHandler');
const moviesApi = require('./routes/movies');

//body parser
app.use(express.json());

moviesApi(app);
app.use(notFoundHandler);

//los middlewares de error tienen que ir tab al final (las rutas tambien son middlewares)
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`Listening on http://localhost:${config.port}`);
});