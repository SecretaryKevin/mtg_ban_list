import mysql from 'mysql';


function createConnection(){
    // create a connection to the database
    return mysql.createConnection({
        host: import.meta.env.VITE_DATABASE_HOST,
        database: import.meta.env.VITE_DATABASE_NAME,
        port: import.meta.env.VITE_DATABASE_PORT,
        user: import.meta.env.VITE_DATABASE_USER,
        password: import.meta.env.VITE_DATABASE_PASSWORD,
    });
}

export async function queryDatabase(query) {
    // query database then return the result
    const connection = createConnection();
    connection.connect();
    let result = null;
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error querying database:', error);
        }
        result = results;
    });
    console.log("data from query", result);
    CloseConnection(connection);
    return result;
}

function CloseConnection(connection) {
    // close the connection
    connection.end();
}
