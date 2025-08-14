import { useState } from 'react'

function LungCancerForm({ patientData, onBack }) {
  const [formData, setFormData] = useState({
    alcoholUse: '',
    dustAllergy: '',
    chronicLungDisease: '',
    swallowingDifficulty: '',
    frequentCold: '',
    dryCough: '',
    snoring: ''
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
    console.log('Lung Cancer Prediction Data:', { ...patientData, ...formData })
    alert('Lung cancer prediction analysis submitted successfully!')
  }


  return (
    <div className="form-container">
      <div className="form-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1 className="form-title">Lung Cancer Prediction</h1>
        <div className="patient-info">
          <span>Patient: {patientData.name}</span>
          <span>Age: {patientData.age}</span>
        </div>
      </div>

      <form className="prediction-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Lifestyle & Symptom Assessment</h3>
          <p className="section-description">Please rate each factor on a scale of 1-8 (1 = Very Low, 8 = Very High)</p>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="alcoholUse">Alcohol Use</label>
              <input
                type="number"
                id="alcoholUse"
                name="alcoholUse"
                value={formData.alcoholUse}
                onChange={handleChange}
                min="1"
                max="8"
                placeholder="1-8"
                required
              />
              <small>Regular consumption of alcoholic beverages</small>
            </div>

            <div className="form-group">
              <label htmlFor="dustAllergy">Dust Allergy</label>
              <input
                type="number"
                id="dustAllergy"
                name="dustAllergy"
                value={formData.dustAllergy}
                onChange={handleChange}
                min="1"
                max="8"
                placeholder="1-8"
                required
              />
              <small>Allergic reactions to dust particles</small>
            </div>

            <div className="form-group">
              <label htmlFor="chronicLungDisease">Chronic Lung Disease</label>
              <input
                type="number"
                id="chronicLungDisease"
                name="chronicLungDisease"
                value={formData.chronicLungDisease}
                onChange={handleChange}
                min="1"
                max="8"
                placeholder="1-8"
                required
              />
              <small>History of chronic respiratory conditions</small>
            </div>

            <div className="form-group">
              <label htmlFor="swallowingDifficulty">Swallowing Difficulty</label>
              <input
                type="number"
                id="swallowingDifficulty"
                name="swallowingDifficulty"
                value={formData.swallowingDifficulty}
                onChange={handleChange}
                min="1"
                max="8"
                placeholder="1-8"
                required
              />
              <small>Difficulty swallowing food or liquids</small>
            </div>

            <div className="form-group">
              <label htmlFor="frequentCold">Frequent Cold</label>
              <input
                type="number"
                id="frequentCold"
                name="frequentCold"
                value={formData.frequentCold}
                onChange={handleChange}
                min="1"
                max="8"
                placeholder="1-8"
                required
              />
              <small>Recurring cold and flu symptoms</small>
            </div>

            <div className="form-group">
              <label htmlFor="dryCough">Dry Cough</label>
              <input
                type="number"
                id="dryCough"
                name="dryCough"
                value={formData.dryCough}
                onChange={handleChange}
                min="1"
                max="8"
                placeholder="1-8"
                required
              />
              <small>Persistent dry cough without phlegm</small>
            </div>

            <div className="form-group">
              <label htmlFor="snoring">Snoring</label>
              <input
                type="number"
                id="snoring"
                name="snoring"
                value={formData.snoring}
                onChange={handleChange}
                min="1"
                max="8"
                placeholder="1-8"
                required
              />
              <small>Regular snoring during sleep</small>
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

export default LungCancerForm