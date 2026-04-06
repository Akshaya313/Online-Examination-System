import { Link } from "react-router-dom";

function Instructions() {
  return (
    <div>
      <h1>Examination Instructions</h1>
      <p style={{ fontSize: "1.1rem", marginBottom: "30px", color: "#e74c3c" }}>
        <strong>Please read these instructions carefully before starting your examination.</strong>
      </p>
      
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "left" }}>
        <h3>General Guidelines</h3>
        <ol style={{ lineHeight: "1.8", marginBottom: "30px" }}>
          <li>You will have a limited time to complete this examination.</li>
          <li>Answer all questions to the best of your knowledge.</li>
          <li>Once submitted, your answers cannot be changed.</li>
          <li>Ensure you have a stable internet connection.</li>
          <li>Do not refresh the page during the examination.</li>
        </ol>
        
        <h3>Question Format</h3>
        <ol style={{ lineHeight: "1.8", marginBottom: "30px" }}>
          <li>Each question has multiple choice options.</li>
          <li>Select one answer per question by clicking on the radio button.</li>
          <li>Review your answers before submitting.</li>
          <li>You can navigate between questions easily.</li>
        </ol>
        
        <h3>Scoring</h3>
        <ul style={{ lineHeight: "1.8", marginBottom: "30px" }}>
          <li>Each correct answer is awarded points.</li>
          <li>Your final score will be displayed immediately after submission.</li>
          <li>You can view your detailed results and marksheet after completion.</li>
        </ul>
        
        <h3>Technical Requirements</h3>
        <ul style={{ lineHeight: "1.8", marginBottom: "30px" }}>
          <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
          <li>Stable internet connection (minimum 1 Mbps)</li>
          <li>Desktop, laptop, or tablet device</li>
          <li>JavaScript enabled in your browser</li>
        </ul>
        
        <div style={{ 
          backgroundColor: "#f0f4ff",
          padding: "20px",
          borderRadius: "8px",
          marginBottom: "30px",
          borderLeft: "4px solid #667eea"
        }}>
          <h3 style={{ marginTop: 0 }}>Important Notes</h3>
          <p>✓ Closing the browser window will end your exam session.</p>
          <p>✓ Do not use any external resources or assistance during the exam.</p>
          <p>✓ In case of technical issues, contact support immediately.</p>
        </div>
        
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>By clicking the button below, you confirm that you have read and understood these instructions.</p>
          <Link to="/examination" style={{
            display: "inline-block",
            padding: "12px 40px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            textDecoration: "none",
            borderRadius: "25px",
            fontWeight: "600",
            transition: "all 0.3s ease",
            cursor: "pointer"
          }}>Start Examination</Link>
        </div>
      </div>
    </div>
  );
}

export default Instructions;