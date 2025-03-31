import { Link } from "react-router-dom";
import "../styles/styles.css"; // Import CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 style={{ color: "white" }}>GDM Predictor</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/form">Check Risk</Link>
      </div>
    </nav>
  );
};

export default Navbar;
