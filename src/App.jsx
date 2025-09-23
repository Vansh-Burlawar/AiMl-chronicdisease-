import { useState } from 'react'
import PatientForm from './components/PatientForm'
import LungCancerForm from './components/LungCancerForm'
import DiabetesForm from './components/DiabetesForm'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [patientData, setPatientData] = useState({
    name: '',
    age: '',
    gender: '',//Default userState
    phoneNumber: ''
  })

  const handlePatientDataSubmit = (data) => {
    setPatientData(data)
  }

  const renderCurrentView = () => {
    switch(currentView) {
      case 'lung-cancer':
        return <LungCancerForm patientData={patientData} onBack={() => setCurrentView('home')} />
      case 'diabetes':
        return <DiabetesForm patientData={patientData} onBack={() => setCurrentView('home')} />
      default:
        return (
          <div className="home-container">
            <div className="header">
              <h1 className="main-title">Disease Prediction System</h1>
              <p className="subtitle">Advanced AI-powered medical diagnosis assistance</p>
            </div>

            <PatientForm onSubmit={handlePatientDataSubmit} />

            <div className="prediction-cards">
              <h2 className="cards-title">Select Prediction Type</h2>
              <div className="cards-grid">
                <div className="prediction-card" onClick={() => setCurrentView('lung-cancer')}>
                  <div className="card-icon">🫁</div>
                  <h3>Lung Cancer</h3>
                  <p>Evaluate respiratory symptoms and lifestyle factors</p>
                  <div className="card-footer">
                    <span className="fields-count">7 parameters</span>
                  </div>
                </div>

                <div className="prediction-card" onClick={() => setCurrentView('diabetes')}>
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
        )
    }
  }

  return (
    <div className="app">
      {renderCurrentView()}
    </div>
  )
}

export default App