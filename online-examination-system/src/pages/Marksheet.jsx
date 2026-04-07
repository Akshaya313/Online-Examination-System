import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserResults, isAuthenticated } from "../utils/examLogic";

function Marksheet() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/signin');
      return;
    }

    const loadResults = async () => {
      try {
        const userResults = await getUserResults();
        setResults(userResults);
      } catch (error) {
        console.error('Error loading results:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [navigate]);

  const getGrade = (percentage) => {
    if (percentage >= 90) return { grade: "A+", color: "#27ae60" };
    if (percentage >= 80) return { grade: "A", color: "#27ae60" };
    if (percentage >= 70) return { grade: "B", color: "#f39c12" };
    if (percentage >= 60) return { grade: "C", color: "#f39c12" };
    return { grade: "F", color: "#e74c3c" };
  };

  const clearResults = () => {
    // Note: In a real app, you'd call an API to delete results
    // For now, we'll just clear localStorage as fallback
    localStorage.removeItem('examResults');
    setResults([]);
  };

  const averagePercentage = results.length > 0 
    ? Math.round(results.reduce((sum, result) => sum + result.percentage, 0) / results.length)
    : 0;

  if (loading) {
    return (
      <div>
        <h1>Your Marksheet</h1>
        <p>Loading your results...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Marksheet</h1>
      <p>View your examination results and performance analytics.</p>
      
      <div style={{ maxWidth: "900px", margin: "30px auto" }}>
        {results.length > 0 ? (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3>Examination History</h3>
              <button onClick={clearResults} style={{
                padding: "8px 16px",
                background: "#e74c3c",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.9rem"
              }}>Clear Local Results</button>
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "20px",
              marginBottom: "30px"
            }}>
              {results.map((result, index) => {
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
              <p style={{ fontSize: "1.1rem", marginBottom: "20px" }}>Average Score: <strong>{averagePercentage}%</strong></p>
              <p style={{ color: "#666", marginBottom: "20px" }}>
                {results.length === 1 ? "Great job on your first exam!" : 
                 averagePercentage >= 80 ? "Excellent performance! Keep it up!" :
                 averagePercentage >= 60 ? "Good progress! Continue practicing." :
                 "Keep working hard to improve your scores."}
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
            <p style={{ color: "#666", marginBottom: "20px" }}>Complete your first exam to see your results here.</p>
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