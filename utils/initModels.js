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
  
  User.hasMany(Movie);
  Movie.belongsTo(User);
  // 1 Movie <---> M Review
  Movie.hasMany(Review);
  Review.belongsTo(Movie);

  
  // Movie.belongsToMany(Actor, { through: "ActorsInMovie"});
  // Actor.belongsToMany(Movie, {through:"ActorsInMovie"});

  // Actor.hasMany(Movie);
  // Movie.belongsToMany(Actor);


  // 1 Actor <---> M Comment
  // Actor.belongsToMany(Movie,{ through: "ActorsInMovie"});
  // Movie.belongsToMany(Actor,{ through:"ActorsInMovie"});
};

module.exports = { initModels };
