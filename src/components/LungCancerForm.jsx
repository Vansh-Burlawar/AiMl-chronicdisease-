import { useState } from "react";

function LungCancerForm({patientData , onBack}){
    const[formData, setFormData] =useState({
        alcoholUse: '', dustAllergy : '', chronicLungDisease: '', swallowingDifficulty:'', frequentCold:'', dryCough: '',snoring: '' 
    })

    const handleChange= (e) => {
        const{name, value} = e.target 
        setFormData(prev=> ({
            ...prev, [name]:value
        }))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log('Lung Cancer Data', {...patientData , ...formData})
        alert('Data submitted Successfully!!!')
    }

    const yesNoOptions=[
        {value:'', label:'Sekect...'},
        {value:'yes', lable:'Yes'},
        {value:'no', lable:'No'}
    ]

    return (
        <div className="form-container">
            <div className="form-header">
                <button className="back-button" onClick={onBack}> Back</button>
                <h1 className="form-title"> Lung Cancer Prediction</h1>
                <div className="patient-info">
                    <span>Patient:{patientData.name}</span>
                    <span>Age: {patientData.age}</span>
                </div>
            </div>

            <form lassName="prediction-form" onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3>LifeStyle & symptom Assessment</h3>
                    <p className="section-description">Please Answer The Followig Questions</p>
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="alcoholUse">Alcohol Use</label>
                            <select
                            id="alcoholUse"
                            name="alcoholUse"
                            value={formData.alcoholUse}
                            onChange={handleChange}
                            required >
                                {yesNoOptions.map(option=>(
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <small>Regular Consumption of Alcohol beverages</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="chronicLungDisease"> Dust Allergy</label>
                            <select
                            id="chronicLungDisease"
                            name="chronicLungDisease"
                            value={formData.alcoholUse}
                            onChange={handleChange}
                            required >
                                {yesNoOptions.map(option=>(
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <small>History of Respiratory Condition</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="swallowingDiffficuilty"> Swallowing Difficulty</label>
                            <select
                            id="swallowingDifficulty"
                            name="swallowingDifficulty"
                            value={formData.alcoholUse}
                            onChange={handleChange}
                            required >
                                {yesNoOptions.map(option=>(
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <small>Difficuilty in Swallowing </small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="frequentCold"> Frequent Cold</label>
                            <select
                            id="frequentCold"
                            name="frequentCold"
                            value={formData.alcoholUse}
                            onChange={handleChange}
                            required >
                                {yesNoOptions.map(option=>(
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <small>Recurring Cold and flu Symptoms</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dryCough"> Dry Cough</label>
                            <select
                            id="dryCough"
                            name="dryCough"
                            value={formData.alcoholUse}
                            onChange={handleChange}
                            required >
                                {yesNoOptions.map(option=>(
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <small> Persistent Dry Cough</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="snoring"> Snoring</label>
                            <select
                            id="snoring"
                            name="snoring"
                            value={formData.alcoholUse}
                            onChange={handleChange}
                            required >
                                {yesNoOptions.map(option=>(
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <small>Snoring During Sleep</small>
                        </div>

                    </div>
                </div>
                <div className="form-actions">
                    <button type='button' className="cancel-button" onClick={onBack}> Cancel</button>
                    <button type='submit' className="Submit-button" > Click To Analyze</button>
                </div>
            </form>
        </div>
    )
}

export default LungCancerForm