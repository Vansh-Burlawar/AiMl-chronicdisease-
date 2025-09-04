// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createPatientsTable, savePatient } from './services/patientservices.js';

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:5173' })); // allow frontend
app.use(express.json());

// create patients table when backend starts
createPatientsTable();

// API route for saving patient
app.post('/api/patients', async (req, res) => {
  try {
    const result = await savePatient(req.body);
    if (result.success) {
      res.status(201).json(result);
    } else {
      res.status(400).json(result);
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` Backend running at http://localhost:${PORT}`)
);
