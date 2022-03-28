const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Models
const { User } = require('../models/user.model');
const { Movie } = require('../models/movie.model');
const { Review } = require('../models/review.model');

// Middlewares

// Utils
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');


dotenv.config( {path:'./config.env'} );

exports.getAllUsers = catchAsync(async (req, res, next) => {
  // Nested includes
  const users = await User.findAll({
    where: { status: 'active' },
    attributes: { exclude: ['password', 'role'] },
    include: [
      {
        model: Movie,
        include: [
          {
            model: User,
            attributes: { exclude: ['password', 'role'] },
            include: [{ model: Review }]
          }
        ]
      }
    ]
  });

  res.status(200).json({
    status: 'success',
    data: { users }
  });
});

// Get user by ID
exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(new AppError(404, 'User not found'));
  }

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});

// Save new user
exports.createNewUser = catchAsync(
  async (req, res, next) => {
    const { userName, email, password, role } = req.body;

    if (!userName || !email || !password || !role) {
      return next(
        new AppError(
          400,
          'Must provide a valid name, email, password & role'
        )
      );
    }

    const salt = await bcrypt.genSalt(12);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      role: role || 'standard'
    });

    // Remove password from response
    newUser.password = undefined;

    res.status(201).json({
      status: 'success',
      data: { newUser }
    });
  }
);

// Update user by ID
exports.updateUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { userName, email, status } = req.body;

  if (!userName || !email) {
    return next(
      new AppError(
        'You must provide User name & email',
        400
      )
    );
  }

  const user = await User.findOne({ where: { id } });

  if (!user) {
    return next(
      new AppError('No user found with this id', 404)
    );
  }

  await user.update({ userName, email, status });

  res.status(204).json({ status: 'success' });
});

// Delete user
exports.disableUserAccount = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({ where: { id } });

    if (!user) {
      return next(
        new AppError('No user found with this id', 404)
      );
    }

    await user.update({ status: 'disabled' });

    res.status(204).json({ status: 'success' });
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
  const token = await jwt.sign(
    { id: user.id },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );

  res.status(200).json({
    status: 'success',
    data: { token }
  });
});
