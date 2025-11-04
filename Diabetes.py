from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)


model = joblib.load("Diabetes.pkl")  

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

      
        features = [
            float(data['GLUCOSE']),
            float(data['BLOOD_PRESSURE']),
            float(data['SKIN_THICKNESS']),
            float(data['INSULIN']),
            float(data['BMI']),
            float(data['DPF']),
            float(data['AGE'])
        ]

        final_features = np.array([features])

        pred_raw = model.predict(final_features)
        pred_prob = model.predict_proba(final_features)

        prediction = "YES" if pred_raw[0] == 1 else "NO"

        response = {
            "prediction": prediction,
            "probability_NO": round(pred_prob[0][0] * 100, 2),
            "probability_YES": round(pred_prob[0][1] * 100, 2)
        }

        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    app.run(debug=True)
