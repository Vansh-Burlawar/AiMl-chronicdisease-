import { useState } from 'react';

function LungCancerForm({ patientData, onBack }) {
    const [formData, setFormData] = useState({
        smoking: '',
        yellowFingers: '',
        fatigue: '',
        allergy: '',
        wheezing: '',
        coughing: '',
        shortnessOfBreath: '',
        swallowingDifficulty: '',
        chestPain: ''
    });

    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setResult(null);
        setError('');

        const apiPayload = {
            "SMOKING": parseInt(formData.smoking),
            "YELLOW_FINGERS": parseInt(formData.yellowFingers),
            "FATIGUE": parseInt(formData.fatigue),
            "ALLERGY": parseInt(formData.allergy),
            "WHEEZING": parseInt(formData.wheezing),
            "COUGHING": parseInt(formData.coughing),
            "SHORTNESS_OF_BREATH": parseInt(formData.shortnessOfBreath),
            "SWALLOWING_DIFFICULTY": parseInt(formData.swallowingDifficulty),
            "CHEST_PAIN": parseInt(formData.chestPain)
        };
        
        try {
            const response = await fetch('http://127.0.0.1:5000/predict/lung_cancer', {   // ✅ UPDATED ENDPOINT
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiPayload),
            });

            if (!response.ok) {
                throw new Error('Network response was not successful.');
            }

            const data = await response.json();
            
            if (data.error) {
                setError(data.error);
            } else {
                setResult(data);
            }

        } catch (err) {
            setError('Failed to connect to the prediction service. Please ensure the backend server is running.');
            console.error("Fetch error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const createSelect = (name, label) => (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
            >
                <option value="">Select Option</option>
                <option value="0">NO</option>
                <option value="1">YES</option>
            </select>
        </div>
    );

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
                    <p className="section-description">Please answer each question to the best of your ability.</p>
                    
                    <div className="form-grid">
                        {createSelect('smoking', 'Smoking')}
                        {createSelect('yellowFingers', 'Yellow Fingers')}
                        {createSelect('fatigue', 'Fatigue')}
                        {createSelect('allergy', 'Allergy')}
                        {createSelect('wheezing', 'Wheezing')}
                        {createSelect('coughing', 'Coughing')}
                        {createSelect('shortnessOfBreath', 'Shortness of Breath')}
                        {createSelect('swallowingDifficulty', 'Swallowing Difficulty')}
                        {createSelect('chestPain', 'Chest Pain')}
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
                        <p><b>Risk of Lung Cancer:</b> {result.prediction}</p>
                        <p><b>Confidence (Yes):</b> {result.probability_YES}%</p>
                        <p><b>Confidence (No):</b> {result.probability_NO}%</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LungCancerForm;
