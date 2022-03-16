// Models
const { User } = require('../models/user.model');
const { Review } = require('../models/review.model');
const { Movie } = require('../models/movie.model');
const { ActorsInMovie } = require('../models/actorsInMovie.model')
const { Actor } = require('../models/actor.model');



const initModels = () => {
  // 1 User <----> M Review
  User.hasMany(Review);
  Review.belongsTo(User);

  // 1 Movie <---> M Review
  Movie.hasMany(Review);
  Review.belongsTo(Movie);

  Movie.hasMany(Actor)
  Actor.belongsToMany(Movie,{through:ActorsInMovie});


  // 1 Actor <---> M Comment
//   Actor.hasMany(Movie);
//   Movie.belongsToMany(Actor);
};

module.exports = { initModels };
