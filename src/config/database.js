import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // load variables from .env file

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'UK@412uk',
  database: process.env.DB_NAME || 'medical_app',
  port: process.env.DB_PORT || 3306,
};

let connection = null;

export const connectDB = async () => {
  try {
    if (!connection) {
      connection = await mysql.createConnection(dbConfig);
      console.log('✅ Connected to DataBase');
    }
    return connection;
  } catch (error) {
    console.error('❌ Connection failed:', error);
    throw error;
  }
};

export const closeDB = async () => {
  if (connection) {
    await connection.end();
    connection = null;
    console.log('🔒 Connection Ended');
  }
};

export default connection;
