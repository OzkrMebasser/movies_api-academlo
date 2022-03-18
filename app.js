const express = require('express');

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');


// Routers
const { usersRouter } = require('./routes/users.routes');


// Utils

// Init express app
const app = express();

// Enable JSON incoming data
app.use(express.json());

// Endpoints
// app.use('/api/v1/posts', postsRouter);
app.use('/api/v1/users', usersRouter);
// app.use('/api/v1/comments', commentsRouter);

app.use('*', (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

// Error handler (err -> AppError)
app.use(globalErrorHandler);

module.exports = { app };