import PatientForm from './components/PatientForm'
import './App.css'

function App() {
  return (
    <div className="app">
      <div className="home-container">
        <div className="header">
          <h1 className="main-title">Disease Prediction System</h1>
          <p className="subtitle">Advanced AI-powered medical diagnosis assistance</p>
        </div>

        <PatientForm />

        <div className="prediction-cards">
          <h2 className="cards-title">Select Prediction Type</h2>
          <div className="cards-grid">
            <div className="prediction-card">
              <div className="card-icon">🫁</div>
              <h3>Lung Cancer</h3>
              <p>Evaluate respiratory symptoms and lifestyle factors</p>
              <div className="card-footer">
                <span className="fields-count">7 parameters</span>
              </div>
            </div>

            <div className="prediction-card">
              <div className="card-icon">🩺</div>
              <h3>Diabetes</h3>
              <p>Assess metabolic indicators for diabetes risk</p>
              <div className="card-footer">
                <span className="fields-count">7 parameters</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
