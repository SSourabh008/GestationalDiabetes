import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", minWidth: "100vw" }}>
      <Navbar />
      <Hero />
      <Features />
      <Footer/>
    </div>
  );
};

export default LandingPage;

