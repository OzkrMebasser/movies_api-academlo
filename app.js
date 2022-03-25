const express = require('express');
const bodyParser = require('body-parser');


// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');


// Routers
const { usersRouter } = require('./routes/users.routes');
const { moviesRouter } = require('./routes/movies.routes');
const { reviewsRouter } = require('./routes/reviews.routes');
const { actorsRouter } = require('./routes/actors.routes');


// Utils
// const {upload} = require('./utils/multer')

// Init express app
const app = express();
// app.use(express.json());
// app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
// Enable JSON incoming data



// Endpoints

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/actors', actorsRouter)
app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/movies/byuser', moviesRouter);
app.use('/api/v1/reviews', reviewsRouter);

app.use('*', (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

// Error handler (err -> AppError)
app.use(globalErrorHandler);

module.exports = { app };