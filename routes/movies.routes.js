const express = require('express');

const {
  createNewMovie,
  getAllMovies,
  getMovieById,
  getMovieByUserId,
  updateMovie,
  disableMovie
} = require('../controllers/movies.controller');

// Utils

const { upload } = require('../utils/multer');

const router = express.Router();

//Get all Movies
router.get('/', getAllMovies);
//Get movie by ID
router.get('/:id', getMovieById);

router.get('/byuser/:userId', getMovieByUserId);

router.patch('/:id', updateMovie);

//Create a new Movie
router.post('/', upload.single('imgUrl'), createNewMovie);

router.delete('/:id', disableMovie);

module.exports = { moviesRouter: router };
