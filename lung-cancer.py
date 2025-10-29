from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

model = joblib.load('lung_cancer_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        features = [
            data['SMOKING'],
            data['YELLOW_FINGERS'],
            data['FATIGUE'],
            data['ALLERGY'],
            data['WHEEZING'],
            data['COUGHING'],
            data['SHORTNESS_OF_BREATH'],
            data['SWALLOWING_DIFFICULTY'],
            data['CHEST_PAIN']
        ]

        final_features = [np.array(features)]

        prediction_raw = model.predict(final_features)
        prediction_prob = model.predict_proba(final_features)

        prediction = 'YES' if prediction_raw[0] == 1 else 'NO'
        
        response = {
            'prediction': prediction,
            'probability_NO': round(prediction_prob[0][0] * 100, 2),
            'probability_YES': round(prediction_prob[0][1] * 100, 2)
        }
        
        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)