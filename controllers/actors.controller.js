

// Models 
const { Actor } = require('../models/actor.model');
const { Movie } = require('../models/movie.model');
const { Review } = require('../models/review.model');
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync');

exports.getAllActors = catchAsync(async (req, res, next) => {  
    const actors = await Actor.findAll({
    where: { status: 'active' }
    , 
    include: [{model: Movie, include: [{model: User, attributes: {exclude: ['password', 'role']}, include: [{model: Review}]}]}]
    
  });

  res.status(200).json({
    status: 'success',
    data: { actors }
  });});

exports.getActorById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

  const actor = await Actor.findOne({ where: { id } });

  if (!actor) {
    return next(new AppError(404, 'Actor not found'));
  }

  res.status(200).json({
    status: 'success',
    data: { actor }
  });
});

exports.createActor = catchAsync(async (req, res, next) => {
    const { name, country, rating, age , profilePic, status } = req.body;

    if (!name || !country || !rating || !age || !status) {
      return next(
        new AppError(
          400,
          'Must provide a valid name, age, and all info required'
        )
      );
    }

    

    const newActor = await Actor.create({
        name, country, rating, age , profilePic, status 
    });

 

    res.status(201).json({
      status: 'success',
      data: { newActor }
    });
});

exports.updateActor = catchAsync(async (req, res, next) => {
    const { id } = req.params;
  const { name, country, rating, age , status } = req.body;

  if (!name || !country || !rating || !age ) {
    return next(
      new AppError(
        'You must provide Actor name & email',
        400
      )
    );
  }

  const actor = await Actor.findOne({ where: { id } });

  if (!actor) {
    return next(
      new AppError('No user found with this id', 404)
    );
  }

  await actor.update({ name, country, rating, age , status});

  res.status(204).json({ status: 'success' });
});

exports.deleteActor = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const actor = await Actor.findOne({ where: { id } });

    if (!actor) {
      return next(
        new AppError('No user found with this id', 404)
      );
    }

    await actor.update({ status: 'disabled' });

    res.status(204).json({ status: 'success' });
});