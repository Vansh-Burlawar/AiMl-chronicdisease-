import { connectDB } from '../config/database.js';

// Create patients table if it doesn't exist
export const createPatientsTable = async () => {
  try {
    const connection = await connectDB();
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS patients (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT NOT NULL,
        gender ENUM('male', 'female', 'other') NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    await connection.execute(createTableQuery);
    console.log('Patients table created or already exists');
  } catch (error) {
    console.error('Error creating patients table:', error);
    throw error;
  }
};

// Save patient data
export const savePatient = async (patientData) => {
  try {
    const connection = await connectDB();
    const { name, age, gender, phoneNumber } = patientData;
    
    const insertQuery = `
      INSERT INTO patients (name, age, gender, phone_number)
      VALUES (?, ?, ?, ?)
    `;
    
    const [result] = await connection.execute(insertQuery, [name, age, gender, phoneNumber]);
    
    console.log('Patient saved successfully with ID:', result.insertId);
    return {
      success: true,
      patientId: result.insertId,
      message: 'Patient data saved successfully'
    };
  } catch (error) {
    console.error('Error saving patient:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get patient by ID
export const getPatientById = async (patientId) => {
  try {
    const connection = await connectDB();
    const selectQuery = 'SELECT * FROM patients WHERE id = ?';
    const [rows] = await connection.execute(selectQuery, [patientId]);
    
    if (rows.length > 0) {
      return {
        success: true,
        patient: rows[0]
      };
    } else {
      return {
        success: false,
        message: 'Patient not found'
      };
    }
  } catch (error) {
    console.error('Error fetching patient:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Get all patients
export const getAllPatients = async () => {
  try {
    const connection = await connectDB();
    const selectQuery = 'SELECT * FROM patients ORDER BY created_at DESC';
    const [rows] = await connection.execute(selectQuery);
    
    return {
      success: true,
      patients: rows
    };
  } catch (error) {
    console.error('Error fetching patients:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Update patient data
export const updatePatient = async (patientId, patientData) => {
  try {
    const connection = await connectDB();
    const { name, age, gender, phoneNumber } = patientData;
    
    const updateQuery = `
      UPDATE patients 
      SET name = ?, age = ?, gender = ?, phone_number = ?
      WHERE id = ?
    `;
    
    const [result] = await connection.execute(updateQuery, [name, age, gender, phoneNumber, patientId]);
    
    if (result.affectedRows > 0) {
      return {
        success: true,
        message: 'Patient updated successfully'
      };
    } else {
      return {
        success: false,
        message: 'Patient not found'
      };
    }
  } catch (error) {
    console.error('Error updating patient:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

// Delete patient
export const deletePatient = async (patientId) => {
  try {
    const connection = await connectDB();
    const deleteQuery = 'DELETE FROM patients WHERE id = ?';
    const [result] = await connection.execute(deleteQuery, [patientId]);
    
    if (result.affectedRows > 0) {
      return {
        success: true,
        message: 'Patient deleted successfully'
      };
    } else {
      return {
        success: false,
        message: 'Patient not found'
      };
    }
  } catch (error) {
    console.error('Error deleting patient:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
