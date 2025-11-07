import { createConnection } from "mysql2/promise";

let connection = null;
export async function connectDb() {
    try {
        connection = await createConnection({
            host: 'localhost',
            user: 'root',
            password: 'cdac',
            port: 3306,
            database: 'insurance_db'
        });
        console.log("db connected");
    } catch (error) {
        console.log("db connection error");
        console.log(error);
    }
};
export function getConnectionObject() {
    return connection;
}