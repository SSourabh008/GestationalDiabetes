from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import joblib

# Load the pipeline model (which includes scaling and classification)
model = joblib.load("best_model.pkl")

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Gestational Diabetes Prediction API is Running on Localhost!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        # Expecting features in the order: age, pregnancies, bmi, sys_bp, dia_bp, ogtt
        features = np.array(data["features"]).reshape(1, -1)
        prediction = model.predict(features)[0]
        response = {"Prediction": int(prediction)}
        
        # If prediction is high risk, analyze each attribute for potential contribution.
        if prediction == 1:
            # Unpack the features into individual variables.
            age, pregnancies, bmi, sys_bp, dia_bp, ogtt = features[0]
            advice = []
            
            # Evaluate each attribute against its threshold (adjust thresholds as needed)
            if age > 35:
                advice.append("Age is above 35; regular check-ups and early screening are recommended.")
            if pregnancies > 3:
                advice.append("A high number of pregnancies (more than 3) can increase risk; consult your healthcare provider.")
            if bmi > 30:
                advice.append("BMI is over 30; consider weight management strategies such as diet and exercise.")
            if sys_bp > 140:
                advice.append("Systolic blood pressure exceeds 140 mmHg; monitor your blood pressure closely.")
            if dia_bp > 90:
                advice.append("Diastolic blood pressure is above 90 mmHg; discuss blood pressure control with your doctor.")
            if ogtt > 200:
                advice.append("OGTT levels are high (above 200 mg/dL); dietary modifications and further testing might be necessary.")
            
            # If no single attribute crosses the threshold (unlikely for high risk), provide general advice.
            if not advice:
                advice.append("Multiple factors indicate increased risk; please consult with your healthcare provider for a detailed evaluation.")
            
            # Format the advice as bullet points.
            formatted_advice = "\n".join([f"• {msg}" for msg in advice])
            response["Advice"] = formatted_advice
        
        return jsonify(response)
    except Exception as e:
        return jsonify({"Error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
