import mysql from "mysql";
import appConfig from "./app-config";

// Create a connection to MySQL's database:
const connection = mysql.createPool({
    host: appConfig.mySqlHost,
    user: appConfig.mySqlUser,
    password: appConfig.mySqlPassword,
    database: appConfig.mySqlDatabase
});

// Execute any sql query:
function execute(sql: string, ...values: any[]): Promise<any> {
    return new Promise<any>((resolve, reject) => {

        // Send query to database:
        connection.query(sql, values, (err, result) => {

            // If there is an error executing the query: 
            if (err) {
                reject(err);
                return;
            }

            // If all is ok:
            resolve(result);
        });

    });
}

export default {
    execute
};