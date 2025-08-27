import { useState } from 'react'

function LungCancerForm({ patientData, onBack }) {
  const [formData, setFormData] = useState({
    smoking: '',
    yellowFingers: '',
    anxiety: '',
    peerPressure: '',
    chronicDisease: '',
    fatigue: '',
    allergy: '',
    wheezing: ''
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
          <h3>Lung Cancer Risk Assessment</h3>
          <p className="section-description">Please answer each question (YES = 2, NO = 1)</p>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="smoking">Smoking</label>
              <select
                id="smoking"
                name="smoking"
                value={formData.smoking}
                onChange={handleChange}
                required
              >
                <option value="">Select Option</option>
                <option value="1">NO (1)</option>
                <option value="2">YES (2)</option>
              </select>
              <small>Do you smoke cigarettes?</small>
            </div>

            <div className="form-group">
              <label htmlFor="yellowFingers">Yellow Fingers</label>
              <select
                id="yellowFingers"
                name="yellowFingers"
                value={formData.yellowFingers}
                onChange={handleChange}
                required
              >
                <option value="">Select Option</option>
                <option value="1">NO (1)</option>
                <option value="2">YES (2)</option>
              </select>
              <small>Do you have yellow staining on fingers?</small>
            </div>

            <div className="form-group">
              <label htmlFor="anxiety">Anxiety</label>
              <select
                id="anxiety"
                name="anxiety"
                value={formData.anxiety}
                onChange={handleChange}
                required
              >
                <option value="">Select Option</option>
                <option value="1">NO (1)</option>
                <option value="2">YES (2)</option>
              </select>
              <small>Do you experience anxiety frequently?</small>
            </div>

            <div className="form-group">
              <label htmlFor="peerPressure">Peer Pressure</label>
              <select
                id="peerPressure"
                name="peerPressure"
                value={formData.peerPressure}
                onChange={handleChange}
                required
              >
                <option value="">Select Option</option>
                <option value="1">NO (1)</option>
                <option value="2">YES (2)</option>
              </select>
              <small>Have you experienced peer pressure to smoke?</small>
            </div>

            <div className="form-group">
              <label htmlFor="chronicDisease">Chronic Disease</label>
              <select
                id="chronicDisease"
                name="chronicDisease"
                value={formData.chronicDisease}
                onChange={handleChange}
                required
              >
                <option value="">Select Option</option>
                <option value="1">NO (1)</option>
                <option value="2">YES (2)</option>
              </select>
              <small>Do you have any chronic diseases?</small>
            </div>

            <div className="form-group">
              <label htmlFor="fatigue">Fatigue</label>
              <select
                id="fatigue"
                name="fatigue"
                value={formData.fatigue}
                onChange={handleChange}
                required
              >
                <option value="">Select Option</option>
                <option value="1">NO (1)</option>
                <option value="2">YES (2)</option>
              </select>
              <small>Do you experience frequent fatigue?</small>
            </div>

            <div className="form-group">
              <label htmlFor="allergy">Allergy</label>
              <select
                id="allergy"
                name="allergy"
                value={formData.allergy}
                onChange={handleChange}
                required
              >
                <option value="">Select Option</option>
                <option value="1">NO (1)</option>
                <option value="2">YES (2)</option>
              </select>
              <small>Do you have allergies?</small>
            </div>

            <div className="form-group">
              <label htmlFor="wheezing">Wheezing</label>
              <select
                id="wheezing"
                name="wheezing"
                value={formData.wheezing}
                onChange={handleChange}
                required
              >
                <option value="">Select Option</option>
                <option value="1">NO (1)</option>
                <option value="2">YES (2)</option>
              </select>
              <small>Do you experience wheezing?</small>
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