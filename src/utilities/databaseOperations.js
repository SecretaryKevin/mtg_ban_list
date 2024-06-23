import mysql from 'mysql';


async function createConnection(){
    // create a connection to the database
    try {
        console.log("establishing connection to database")

        let connection =  await mysql.createConnection({
            host: import.meta.env.VITE_DATABASE_HOST,
            database: import.meta.env.VITE_DATABASE_NAME,
            port: import.meta.env.VITE_DATABASE_PORT,
            user: import.meta.env.VITE_DATABASE_USER,
            password: import.meta.env.VITE_DATABASE_PASSWORD,
        });
        return connection;
    }
    catch (error) {
        console.error('Error creating database connection:', error);
    }
}

export async function queryDatabase(query) {
    // query database then return the result
    console.log("querying database using following query: ", query)
    const connection = createConnection();
    try{
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
    } catch (error) {
        console.error('Error querying database:', error);
    }




}

function CloseConnection(connection) {
    // close the connection
    try {
        console.log("closing connection to database")
        connection.end();
    } catch (error) {
        console.error('Error closing database connection:', error);
    }
}
