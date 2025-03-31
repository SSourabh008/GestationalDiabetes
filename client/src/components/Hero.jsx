import { Link } from "react-router-dom";
import "../styles/styles.css"; // Import CSS

const Hero = () => {
  return (
    <div className="hero">
      <h1>Check Your Risk of Gestational Diabetes</h1>
      <p>"You're strong, mom—each healthy choice makes a difference."</p>
      <Link to="/form">
        <button>Check Now</button>
      </Link>
    </div>
  );
};

export default Hero;
