import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to the Online Examination System</h1>
      <p>Take assessments at your convenience with our secure and reliable online examination platform.</p>
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <h2 style={{ marginBottom: "20px" }}>Get Started</h2>
        <p style={{ marginBottom: "20px" }}>Ready to test your knowledge? Sign in to begin an examination.</p>
        <Link to="/instructions" style={{
          display: "inline-block",
          padding: "12px 30px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          textDecoration: "none",
          borderRadius: "25px",
          marginRight: "15px",
          fontWeight: "600",
          transition: "all 0.3s ease"
        }}>Read Instructions</Link>
        <Link to="/signin" style={{
          display: "inline-block",
          padding: "12px 30px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          textDecoration: "none",
          borderRadius: "25px",
          fontWeight: "600",
          transition: "all 0.3s ease"
        }}>Sign In</Link>
      </div>
    </div>
  );
}

export default Home;