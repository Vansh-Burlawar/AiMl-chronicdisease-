// services/patientservices.js
import { connectDB } from '../config/database.js';

// Create table if not exists
export const createPatientsTable = async () => {
  try {
    const connection = await connectDB();
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS patients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        gender ENUM('male','female','other') NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Patients table is ready');
  } catch (err) {
    console.error('Error creating patients table:', err.message);
  }
};

// Save new patient
export const savePatient = async ({ name, age, gender, phoneNumber }) => {
  try {
    const connection = await connectDB();
    const [result] = await connection.execute(
      `INSERT INTO patients (name, age, gender, phone_number) VALUES (?,?,?,?)`,
      [name, age, gender, phoneNumber]
    );
    return { success: true, id: result.insertId };
  } catch (err) {
    console.error('Error saving patient:', err.message);
    return { success: false, error: err.message };
  }
};
