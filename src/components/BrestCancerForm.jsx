import { useState } from 'react'

function BreastCancerForm({ patientData, onBack }) {
  const [formData, setFormData] = useState({
    texture_mean: '',
    perimeter_mean: '',
    area_mean: '',
    smoothness_mean: '',
    compactness_mean: ''
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
    console.log('Breast Cancer Prediction Data:', { ...patientData, ...formData })
    alert('Breast cancer prediction analysis submitted successfully!')
  }

  return (
    <div className="form-container">
      <div className="form-header">
        <button className="back-button" onClick={onBack}>← Back</button>
        <h1 className="form-title">Breast Cancer Prediction</h1>
        <div className="patient-info">
          <span>Patient: {patientData.name}</span>
          <span>Age: {patientData.age}</span>
        </div>
      </div>

      <form className="prediction-form" onSubmit={handleSubmit}>
        <div className="form-section">
          <h3>Tissue Analysis Parameters</h3>
          <p className="section-description">Enter the tissue characteristics from medical examination</p>
          
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="texture_mean">Texture Mean</label>
              <input
                type="number"
                id="texture_mean"
                name="texture_mean"
                value={formData.texture_mean}
                onChange={handleChange}
                step="0.01"
                placeholder="e.g., 17.99"
                required
              />
              <small>Standard deviation of gray-scale values</small>
            </div>

            <div className="form-group">
              <label htmlFor="perimeter_mean">Perimeter Mean</label>
              <input
                type="number"
                id="perimeter_mean"
                name="perimeter_mean"
                value={formData.perimeter_mean}
                onChange={handleChange}
                step="0.01"
                placeholder="e.g., 122.80"
                required
              />
              <small>Mean perimeter of cell nuclei</small>
            </div>

            <div className="form-group">
              <label htmlFor="area_mean">Area Mean</label>
              <input
                type="number"
                id="area_mean"
                name="area_mean"
                value={formData.area_mean}
                onChange={handleChange}
                step="0.01"
                placeholder="e.g., 1001.0"
                required
              />
              <small>Mean area of cell nuclei</small>
            </div>

            <div className="form-group">
              <label htmlFor="smoothness_mean">Smoothness Mean</label>
              <input
                type="number"
                id="smoothness_mean"
                name="smoothness_mean"
                value={formData.smoothness_mean}
                onChange={handleChange}
                step="0.0001"
                placeholder="e.g., 0.1184"
                required
              />
              <small>Local variation in radius lengths</small>
            </div>

            <div className="form-group">
              <label htmlFor="compactness_mean">Compactness Mean</label>
              <input
                type="number"
                id="compactness_mean"
                name="compactness_mean"
                value={formData.compactness_mean}
                onChange={handleChange}
                step="0.0001"
                placeholder="e.g., 0.2776"
                required
              />
              <small>Perimeter² / area - 1.0</small>
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

export default BreastCancerForm