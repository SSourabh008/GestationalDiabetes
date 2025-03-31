import { useState } from "react";
import axios from "axios";
import "../styles/styles.css";
import { Link } from "react-router-dom";

const FormPage = () => {
  const [formData, setFormData] = useState({
    age: "",
    pregnancies: "",
    bmi: "",
    sys_bp: "",
    dia_bp: "",
    ogtt: "",
  });

  // State for storing the result from the backend
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        features: Object.values(formData).map(Number),
      });
      setResult(response.data); // Store the entire response (Prediction + Advice)
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  // Function to close the splash screen
  const closeSplashScreen = () => {
    setResult(null);
  };

  return (
    <div className="page-wrapper">
      <div className="form-page">
        <div className="form-container">
          <Link to="/">Gestational Diabetes Risk Predictor</Link>
          <form onSubmit={handleSubmit}>
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <label>Number of Pregnancies:</label>
            <input
              type="number"
              name="pregnancies"
              value={formData.pregnancies}
              onChange={handleChange}
              required
            />

            <label>BMI:</label>
            <input
              type="number"
              name="bmi"
              value={formData.bmi}
              onChange={handleChange}
              required
            />

            <label>Systolic BP:</label>
            <input
              type="number"
              name="sys_bp"
              value={formData.sys_bp}
              onChange={handleChange}
              required
            />

            <label>Diastolic BP:</label>
            <input
              type="number"
              name="dia_bp"
              value={formData.dia_bp}
              onChange={handleChange}
              required
            />

            <label>OGTT Result:</label>
            <input
              type="number"
              name="ogtt"
              value={formData.ogtt}
              onChange={handleChange}
              required
            />

            <button type="submit">Get Prediction</button>
          </form>
        </div>
      </div>

      {/* Splash Screen (Modal) appears only if result is not null */}
      {result !== null && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeSplashScreen}>
              X
            </button>
            {result.Prediction === 1 ? (
              <>
                <h2 className="high-risk">
                  High Risk of Gestational Diabetes! ⚠️
                </h2>
                {result.Advice && (
                  <p className="advice">{result.Advice}</p>
                )}
              </>
            ) : (
              <h2 className="low-risk">
                Low Risk of Gestational Diabetes ✅
              </h2>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FormPage;
