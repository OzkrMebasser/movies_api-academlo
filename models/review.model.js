const { DataTypes } = require('sequelize');
const { db } = require('../utils/dababase');

const Review = db.define('review', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  rating: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  status: {
    // active || inactive
    type: DataTypes.STRING(10),
    defaultValue: 'active',
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = { Review };
