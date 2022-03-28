const { DataTypes } = require('sequelize');
const { db } = require('../utils/dababase');

const ActorsInMovie = db.define('actorsinmovie', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  actorId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = { ActorsInMovie };
