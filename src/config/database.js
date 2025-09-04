import mysql from 'mysql2/promise';
import dontenv from 'dotenv';

const dbConfig ={
    host: import.meta.env.VITE_DB_HOST || 'localhost',
    user: import.meta.env.VITE_DB_USER || 'root',
    password: import.meta.env.VITE_DB_PASSWORD || 'UK@412uk',
    database:  import.meta.env.VITE_DB_NAME || 'medical_app',
    port: import.meta.env.VITE_DB_PORT || 3306,

};

let connection=null;
export const connectDB = async()=> {
    try{
        if(!connection){
            connection= await mysql.createConnection(dbConfig);
            console.log('Connected to DataBase')
        }
        return connection;
    }catch(error){
        console.log("Connection faield",error);
        throw error;
    }
};


export const closeDB = async()=> {
    if(connection){
        await connection.end();
        connection= null;
        console.log('Connection Ended');
    }
};

export default connection;