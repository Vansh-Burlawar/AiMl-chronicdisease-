import { useState } from 'react'

function DiabetesForm({ patientData, onBack }) {
  const [formData, setFormData] = useState({
    glucose: '',
    bloodPressure: '',
    skinThickness: '',
    insulin: '',
    bmi: '',
    dpf: '',
    age: patientData.age || ''
  })

  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setResult(null)
    setError('')
    setIsLoading(true)

    const payload = {
      GLUCOSE: parseFloat(formData.glucose),
      BLOOD_PRESSURE: parseFloat(formData.bloodPressure),
      SKIN_THICKNESS: parseFloat(formData.skinThickness),
      INSULIN: parseFloat(formData.insulin),
      BMI: parseFloat(formData.bmi),
      DPF: parseFloat(formData.dpf),   // CHANGED
      AGE: parseFloat(formData.age)
    }

    try {
      const res = await fetch('http://127.0.0.1:5000/predict/diabetes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })

      if (!res.ok) throw new Error('Network error')

      const data = await res.json()

      if (data.error) setError(data.error)
      else setResult(data)

    } catch (err) {
      setError('Backend not reachable. Ensure Flask server is running.')
    } finally {
      setIsLoading(false)
    }
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
          <p className="section-description">Enter test results</p>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="glucose">Glucose Level</label>
              <input
                type="number"
                id="glucose"
                name="glucose"
                value={formData.glucose}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bloodPressure">Blood Pressure</label>
              <input
                type="number"
                id="bloodPressure"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="skinThickness">Skin Thickness</label>
              <input
                type="number"
                id="skinThickness"
                name="skinThickness"
                value={formData.skinThickness}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="insulin">Insulin Level</label>
              <input
                type="number"
                id="insulin"
                name="insulin"
                value={formData.insulin}
                onChange={handleChange}
                required
              />
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
                required
              />
            </div>

            {/* CHANGED FIELD */}
            <div className="form-group">
              <label htmlFor="dpf">Diabetes Pedigree Function</label>
              <input
                type="number"
                id="dpf"
                name="dpf"
                value={formData.dpf}
                onChange={handleChange}
                step="0.001"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={onBack}>Cancel</button>
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Analyze Risk'}
          </button>
        </div>
      </form>

      <div className="results-container">
        {error && <div className="error-message">{error}</div>}

        {result && (
          <div className="result">
            <h3>Prediction Result</h3>
            <p><b>Risk of Diabetes:</b> {result.prediction}</p>
            <p><b>Confidence (Yes):</b> {result.probability_YES}%</p>
            <p><b>Confidence (No):</b> {result.probability_NO}%</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DiabetesForm
