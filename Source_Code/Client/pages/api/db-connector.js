// Get an instance of mysql we can use in the app
const mariadb = require('mariadb');

// Create a 'connection pool' using the provided credentials
const pool = mariadb.createPool({
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_schwartf',
    password: '0387',
    database: 'cs340_schwartf',
    connectionLimit: 10
  });

// Export it for use in our application
module.exports.pool = pool;