import { Link } from "react-router-dom";

function Marksheet() {
  const sampleResults = [
    { examName: "General Knowledge Quiz", date: "2026-04-07", score: 18, totalScore: 30, percentage: 60 },
    { examName: "Science Assessment", date: "2026-04-06", score: 25, totalScore: 30, percentage: 83 },
    { examName: "Mathematics Test", date: "2026-04-05", score: 27, totalScore: 30, percentage: 90 }
  ];

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: "A+", color: "#27ae60" };
    if (percentage >= 80) return { grade: "A", color: "#27ae60" };
    if (percentage >= 70) return { grade: "B", color: "#f39c12" };
    if (percentage >= 60) return { grade: "C", color: "#f39c12" };
    return { grade: "F", color: "#e74c3c" };
  };

  return (
    <div>
      <h1>Your Marksheet</h1>
      <p>View your examination results and performance analytics.</p>
      
      <div style={{ maxWidth: "900px", margin: "30px auto" }}>
        {sampleResults.length > 0 ? (
          <div>
            <h3 style={{ marginBottom: "20px", textAlign: "center" }}>Examination History</h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginBottom: "30px"
            }}>
              {sampleResults.map((result, index) => {
                const { grade, color } = getGrade(result.percentage);
                return (
                  <div key={index} style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                    borderTop: `4px solid ${color}`
                  }}>
                    <h4 style={{ marginTop: 0, color: "#2c3e50" }}>{result.examName}</h4>
                    <p style={{ fontSize: "0.9rem", color: "#999" }}>Date: {result.date}</p>
                    
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "15px",
                      padding: "15px",
                      backgroundColor: "#f9f9f9",
                      borderRadius: "8px"
                    }}>
                      <div>
                        <p style={{ margin: "5px 0", color: "#666" }}>Score</p>
                        <p style={{ margin: "5px 0", fontSize: "1.5rem", fontWeight: "bold", color: "#2c3e50" }}>
                          {result.score}/{result.totalScore}
                        </p>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <p style={{ margin: "5px 0", color: "#666" }}>Percentage</p>
                        <p style={{ margin: "5px 0", fontSize: "1.5rem", fontWeight: "bold", color }}>
                          {result.percentage}%
                        </p>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <p style={{ margin: "5px 0", color: "#666" }}>Grade</p>
                        <p style={{
                          margin: "5px 0",
                          fontSize: "2rem",
                          fontWeight: "bold",
                          color
                        }}>
                          {grade}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div style={{
              background: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              textAlign: "center"
            }}>
              <h3>Overall Performance</h3>
              <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>Average Score: <strong>85.67%</strong></p>
              <p style={{ color: "#666", marginBottom: "20px" }}>
                Great job! Continue improving your skills by taking more examinations.
              </p>
              <Link to="/examination" style={{
                display: "inline-block",
                padding: "12px 30px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                textDecoration: "none",
                borderRadius: "25px",
                fontWeight: "600"
              }}>Take Another Exam</Link>
            </div>
          </div>
        ) : (
          <div style={{
            background: "white",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            textAlign: "center"
          }}>
            <p style={{ fontSize: "1.2rem", marginBottom: "20px" }}>No examination results yet.</p>
            <Link to="/examination" style={{
              display: "inline-block",
              padding: "12px 30px",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              textDecoration: "none",
              borderRadius: "25px",
              fontWeight: "600"
            }}>Start Your First Exam</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Marksheet;