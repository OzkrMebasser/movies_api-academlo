const { DataTypes } = require('sequelize');
const { db } = require('../utils/dababase');

const User = db.define('user', {
	id: {
		primaryKey: true,
		autoIncrement: true,
		type: DataTypes.INTEGER,
		allowNull: false,
	},
	userName: {
		type: DataTypes.STRING(100),
		allowNull: false,
	},
	email: {
		type: DataTypes.STRING(100),
		unique: true,
		allowNull: false,
	},
	password: {
		type: DataTypes.STRING(255),
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING(10),
		defaultValue: 'active',
		allowNull: false,
	},
    role: {
		type: DataTypes.STRING(15),
		//admin | standard
		defaultValue: 'standard',
		allowNull: false,
	}
});

module.exports = { User };
