const {
  ref,
  uploadBytes,
  getDownloadURL
} = require('firebase/storage');

// Models
const { Movie } = require('../models/movie.model');
const { User } = require('../models/user.model');
const { Review } = require('../models/review.model');
const { Actor } = require('../models/actor.model')
// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');
const { storage } = require('../utils/firebase');
const { upload } = require('../utils/multer');
const { async } = require('@firebase/util');

exports.getAllMovies = catchAsync(
  async (req, res, next) => {
    // Nested includes
    const movies = await Movie.findAll({
      where: { status: 'active' }
      ,
      include: [
        {
          model: Review
        },
        { model: Review, include: [{ model: Movie }] }
      ]
    });

      // Promise[]
  const postsPromises = movies.map(
    async ({
      title,
      description,
      duration,
      rating,
      imgUrl,
      genre,
      status,
      userId
    }) => {
      const imgRef = ref(storage, imgUrl);

      const imgDownloadUrl = await getDownloadURL(imgRef);

      return {
        title,
        description,
        duration,
        rating,
        imgUrl : imgDownloadUrl,
        genre,
        status,
        userId,
        // createdAt,
        // updatedAt
      };
    }
  );

  const resolvedPosts = await Promise.all(postsPromises);

    res.status(200).json({
      status: 'success',
      data: { movies: resolvedPosts}
    });
  }
);

// Get user by ID
exports.getMovieById = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const movie = await Movie.findOne({ where: { id } });

    if (!movie) {
      return next(new AppError(404, 'Movie not found'));
    }

    res.status(200).json({
      status: 'success',
      data: { movie }
    });
  }
);

//
exports.getMovieByUserId = catchAsync(
  async (req, res, next) => {
    const { userId } = req.params;

    const movieByUser = await Movie.findOne({
      where: { userId }
    });

    if (!movieByUser) {
      return next(
        new AppError(400, "This user doesn't exist")
      );
    }

    res.status(200).json({
      status: 'success',
      data: { movieByUser }
    });
  }
);
// Save new user
exports.createNewMovie = catchAsync(
  async (req, res, next) => {
    const {
      title,
      description,
      duration,
      rating,
      imgUrl,
      genre,
      status,
      userId
    } = req.body;

    if (
      !title ||
      !description ||
      !duration ||
      !rating ||
      !genre ||
      !status ||
      !userId
    ) {
      return next(
        new AppError(
          400,
          'Must provide all the info to register a movie'
        )
      );
    }

    // Upload img to Cloud Storage (Firebase)

    req.file;
    const imgRef = ref(
      storage,
      `imgs/${Date.now()}.${req.file.originalname}`
    );

    const result = await uploadBytes(
      imgRef,
      req.file.buffer
    );
    

    const newMovie = await Movie.create({
      title,
      description,
      duration,
      rating,
      imgUrl: result.metadata.fullPath,
      genre,
      status,
      userId
    });

    res.status(201).json({
      status: 'success',
      data: { newMovie }
    });
  }
);

// Update Movie by ID
exports.updateMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, description, duration,  genre } = req.body;

  if (!title || !description || !duration || !genre) {
    return next(
      new AppError(
        400,
        'Must provide all the info to update a movie',
      )
    );
  }
  

  const movieUpdate = await Movie.findOne({ where: { id } });
// Upload img to Cloud Storage (Firebase)

  // req.file;
  // const imgRef = ref(
  //   storage,
  //   `imgs/${Date.now()}.${req.file.originalname}`
  // );

  // const result = await uploadBytes(imgRef, req.file.buffer);
  // if (!movieUpdate) {
  //   return next(
  //     new AppError(404, 'No movie found with this id')
  //   );
  // }

  await movieUpdate.update({
    title,
    description,
    duration,
    // imgUrl: result.metadata.fullPath,
    genre
  });

  res.status(201).json({
    status: 'success',
    data: { movieUpdate }
  });
});

// Delete user
exports.disableMovie = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const movie = await Movie.findOne({ where: { id } });

    if (!movie) {
      return next(
        new AppError(404,'No movie found with this id')
      );
    }

    await movie.update({ status: 'disabled' });

    res.status(204).json({ status: 'success' });
  }
);
