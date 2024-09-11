require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
};

// {
//   "development": {
//     "username": "root",
//     "password": "galo1011",
//     "database": "mytrilhas",
//     "host": "localhost",
//     "dialect": "mysql"
//   }
// }
