// Get an instance of mysql we can use in the app
import * as mysql from 'mysql';

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_baplas',
    password        : '1780',
    database        : 'cs340_baplas'
})

// Export it for use in our application
export{pool}