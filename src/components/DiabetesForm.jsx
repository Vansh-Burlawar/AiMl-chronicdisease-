import { useState } from 'react'

function DiabetesForm({ patientData, onBack }) {
  const [formData, setFormData] = useState({
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    diabetesPedigreeFunction: '',
    age: patientData.age || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Diabetes Prediction Data:', { ...patientData, ...formData })
    alert('Diabetes prediction analysis submitted successfully!')
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1 className="form-title">Diabetes Prediction</h1>
        <div className="patient-info">
          <span>Patient: {patientData.name}</span>
          <span>Age: {patientData.age}</span>
        </div>
      </div>

      <form className="prediction-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Metabolic Assessment Parameters</h3>
          <p className="section-description">Enter the medical test results and health indicators</p>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="glucose">Glucose Level</label>
              <input
                type="number"
                id="glucose"
                name="glucose"
                value={formData.glucose}
                onChange={handleChange}
                placeholder="e.g., 148"
                required
              />
              <small>Plasma glucose concentration (mg/dL)</small>
            </div>

            <div className="form-group">
              <label htmlFor="bloodPressure">Blood Pressure</label>
              <input
                type="number"
                id="bloodPressure"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleChange}
                placeholder="e.g., 72"
                required
              />
              <small>Diastolic blood pressure (mm Hg)</small>
            </div>

            <div className="form-group">
              <label htmlFor="skinThickness">Skin Thickness</label>
              <input
                type="number"
                id="skinThickness"
                name="skinThickness"
                value={formData.skinThickness}
                onChange={handleChange}
                placeholder="e.g., 35"
                required
              />
              <small>Triceps skin fold thickness (mm)</small>
            </div>

            <div className="form-group">
              <label htmlFor="insulin">Insulin Level</label>
              <input
                type="number"
                id="insulin"
                name="insulin"
                value={formData.insulin}
                onChange={handleChange}
                placeholder="e.g., 0"
                required
              />
              <small>2-Hour serum insulin (mu U/ml)</small>
            </div>

            <div className="form-group">
              <label htmlFor="bmi">BMI</label>
              <input
                type="number"
                id="bmi"
                name="bmi"
                value={formData.bmi}
                onChange={handleChange}
                step="0.1"
                placeholder="e.g., 33.6"
                required
              />
              <small>Body Mass Index (weight in kg/(height in m)²)</small>
            </div>

            <div className="form-group">
              <label htmlFor="diabetesPedigreeFunction">Diabetes Pedigree Function</label>
              <input
                type="number"
                id="diabetesPedigreeFunction"
                name="diabetesPedigreeFunction"
                value={formData.diabetesPedigreeFunction}
                onChange={handleChange}
                step="0.001"
                placeholder="e.g., 0.627"
                required
              />
              <small>Diabetes pedigree function score</small>
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="e.g., 50"
                required
              />
              <small>Age in years</small>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onBack}>Cancel</button>
          <button type="submit" className="submit-button">Analyze Risk</button>
        </div>
      </form>
    </div>
  )
}

export default DiabetesForm