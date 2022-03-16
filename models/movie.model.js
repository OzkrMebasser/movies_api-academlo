const { DataTypes } = require('sequelize');
const { db } = require('../utils/dababase');

const Movie = db.define('movie', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    imgUrl: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
    genre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    status:{
        // premier 
        type: DataTypes.STRING(10),
		defaultValue: 'active',
		allowNull: false,
    }
})

module.exports = { Movie };