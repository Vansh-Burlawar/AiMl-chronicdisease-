from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# LOAD MODELS
diabetes_model = joblib.load("Diabetes.pkl")
lung_model = joblib.load("lung_cancer_model.pkl")

# --- ADD THIS LINE ---
# Load the scaler for the diabetes model
diabetes_scaler = joblib.load("diabetes_scaler.pkl")
# ---------------------


# -----------------------------------------------------
# DIABETES PREDICTION
# -----------------------------------------------------
@app.route('/predict/diabetes', methods=['POST'])
def predict_diabetes():
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

        final = np.array([features], dtype=float)

        # --- APPLY THE SCALER ---
        # Scale the incoming data just like you scaled the training data
        scaled_data = diabetes_scaler.transform(final)
        # ------------------------

        # --- USE THE SCALED DATA TO PREDICT ---
        pred_raw = diabetes_model.predict(scaled_data)
        pred_prob = diabetes_model.predict_proba(scaled_data)
        # --------------------------------------

        prediction = "YES" if int(pred_raw[0]) == 1 else "NO"

        prob_no = float(pred_prob[0][0] * 100)
        prob_yes = float(pred_prob[0][1] * 100)

        return jsonify({
            "prediction": prediction,
            "probability_NO": round(prob_no, 2),
            "probability_YES": round(prob_yes, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)})


# -----------------------------------------------------
# LUNG CANCER PREDICTION
# (This part is correct, no changes needed)
# -----------------------------------------------------
@app.route('/predict/lung_cancer', methods=['POST'])
def predict_lung():
    try:
        data = request.get_json()

        features = [
            int(data['SMOKING']),
            int(data['YELLOW_FINGERS']),
            int(data['FATIGUE']),
            int(data['ALLERGY']),
            int(data['WHEEZING']),
            int(data['COUGHING']),
            int(data['SHORTNESS_OF_BREATH']),
            int(data['SWALLOWING_DIFFICULTY']),
            int(data['CHEST_PAIN'])
        ]

        final = np.array([features], dtype=float)

        pred_raw = lung_model.predict(final)
        pred_prob = lung_model.predict_proba(final)

        prediction = "YES" if int(pred_raw[0]) == 1 else "NO"

        prob_no = float(pred_prob[0][0] * 100)
        prob_yes = float(pred_prob[0][1] * 100)

        return jsonify({
            "prediction": prediction,
            "probability_NO": round(prob_no, 2),
            "probability_YES": round(prob_yes, 2)
        })

    except Exception as e:
        return jsonify({"error": str(e)})


# -----------------------------------------------------
# RUN SERVER
# -----------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
