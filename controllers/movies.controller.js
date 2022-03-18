// Models
const { Movie } = require('../models/movie.model');


// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');


  exports.getAllMovies = catchAsync(async (req, res, next) => {
    // Nested includes
    const movies = await Movie.findAll({
      where: { status: 'active' }
      // ,
      // include: [
      //   {
      //     model: Post,
      //     include: [
      //       {
      //         model: Comment,
      //         include: [{ model: User }]
      //       }
      //     ]
      //   },
      //   { model: Comment, include: [{ model: Post }] }
      // ]
    });
  
    res.status(200).json({
      status: 'success',
      data: { movies }
    });
  });
  
  // Get user by ID
  exports.getMovieById = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  
    const movie = await Movie.findOne({ where: { id } });
  
    if (!movie) {
      return next(new AppError(404, 'Movie not found'));
    }
  
    res.status(200).json({
      status: 'success',
      data: { movie }
    });
  });
  
  // Save new user
  exports.createNewMovie = catchAsync(
    async (req, res, next) => {
      const { userName, email, password } = req.body;
  
      if (!userName || !email || !password) {
        return next(
          new AppError(
            400,
            'Must provide a valid name, email and password'
          )
        );
      }
  
    //   const salt = await bcrypt.genSalt(12);
  
    //   const hashedPassword = await bcrypt.hash(
    //     password,
    //     salt
    //   );
  
      const newUser = await User.create({
        userName,
        email,
        password, // hashedPassword
      });
  
      // Remove password from response
    //   newUser.password = undefined;
  
      res.status(201).json({
        status: 'success',
        data: { newUser }
        
      });
    }
  );
  
  exports.loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    // Find user given an email and has status active
    const user = await User.findOne({
      where: { email, status: 'active' }
    });
  
    // Compare entered password vs hashed password
    if (
      !user ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return next(
        new AppError(400, 'Credentials are invalid')
      );
    }
  
    // Create JWT
    // const token = await jwt.sign(
    //   { id: user.id },
    //   process.env.JWT_SECRET,
    //   {
    //     expiresIn: process.env.JWT_EXPIRES_IN
    //   }
    // );
  
    // res.status(200).json({
    //   status: 'success',
    //   data: { token }
    // });
  });