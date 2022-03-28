const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// Localhost connection
const db = new Sequelize({
  host: process.env.DB_HOST, // localhost
  username: process.env.DB_USER, // postgres
  password: process.env.DB_PASSWORD,
  port: 5432,
  database: process.env.DB, // example
  dialect: 'postgres',
  logging: false
  // ,
  // 	dialectOptions: {
  // 	ssl: {
  // 		require: true,
  // 		rejectUnauthorized: false,
  // 	},
  // },
});

module.exports = { db };

// Host
// ec2-3-216-221-31.compute-1.amazonaws.com
// Database
// d176b3t60f03hm
// User
// dxabqrwebxjoau
// Port
// 5432
// Password
// 15ad27badec632c60b8d7a57000f181881aec5a5b5c8c193fbc4c6899acf40f8
// URI
// postgres://dxabqrwebxjoau:15ad27badec632c60b8d7a57000f181881aec5a5b5c8c193fbc4c6899acf40f8@ec2-3-216-221-31.compute-1.amazonaws.com:5432/d176b3t60f03hm
// Heroku CLI
// heroku pg:psql postgresql-elliptical-57520 --app academlo-sequelize-example

// Connect to Heroku cloud
// const sequelize = new Sequelize({
// 	host: 'heroku_host',
// 	username: 'heroku_user',
// 	password: 'heroku_password',
// 	port: 5432,
// 	database: 'heroku_database',
// 	dialect: 'postgres',
// 	dialectOptions: {
// 		ssl: {
// 			require: true,
// 			rejectUnauthorized: false,
// 		},
// 	},
// });
