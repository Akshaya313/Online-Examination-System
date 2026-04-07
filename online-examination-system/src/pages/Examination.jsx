import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import {
  getQuestions,
  calculateScore,
  submitExam,
  isAuthenticated
} from "../utils/examLogic";

function Examination() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleOptionChange(qIndex, option) {
    const newAnswers = [...answers];
    newAnswers[qIndex] = option;
    setAnswers(newAnswers);
  }

  async function handleSubmit() {
    if (submitting) return;

    setSubmitting(true);
    try {
      console.log('Submitting exam with answers:', answers);
      console.log('Questions count:', questions.length);
      const calculatedScore = calculateScore(answers, questions);
      console.log('Calculated score:', calculatedScore);
      const result = await submitExam(answers, calculatedScore, questions.length);
      console.log('Submit result:', result);
      setScore(result.score);
    } catch (error) {
      console.error('Error submitting exam:', error);
      alert('Error submitting exam. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/signin');
      return;
    }

    const loadQuestions = async () => {
      try {
        const fetchedQuestions = await getQuestions();
        console.log('Loaded questions:', fetchedQuestions.length, fetchedQuestions);
        setQuestions(fetchedQuestions);
        setAnswers(new Array(fetchedQuestions.length).fill(""));
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [navigate]);

  if (loading) {
    return (
      <div>
        <h1>Examination</h1>
        <p>Loading questions...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div>
        <h1>Examination</h1>
        <p>No questions available. Please contact administrator.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Examination</h1>
      <p>Answer all questions and click submit when done.</p>

      {questions.map((q, qIndex) => (
        <div key={q.id} style={{
          background: "white",
          padding: "20px",
          margin: "15px 0",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)"
        }}>
          <h3 style={{ marginTop: 0 }}>
            {qIndex + 1}. {q.question}
          </h3>

          {q.options.map((opt, i) => (
            <div key={i} style={{ margin: "8px 0" }}>
              <label style={{
                display: "flex",
                alignItems: "center",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}>
                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  value={opt}
                  checked={answers[qIndex] === opt}
                  onChange={() => handleOptionChange(qIndex, opt)}
                  style={{
                    marginRight: "10px",
                    cursor: "pointer",
                    width: "18px",
                    height: "18px"
                  }}
                />
                {opt}
              </label>
            </div>
          ))}
        </div>
      ))}

      <br />

      <button
        onClick={handleSubmit}
        disabled={submitting}
        style={{
          width: "100%",
          opacity: submitting ? 0.6 : 1,
          cursor: submitting ? "not-allowed" : "pointer"
        }}
      >
        {submitting ? "Submitting..." : "Submit Exam"}
      </button>

      {score !== null && (
        <div style={{
          background: "white",
          padding: "20px",
          margin: "20px 0",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          textAlign: "center"
        }}>
          <h2 style={{ color: "#27ae60" }}>
            Your Score: {score} / {questions.length}
          </h2>
          <p>Percentage: {Math.round((score / questions.length) * 100)}%</p>
          <p style={{ marginTop: "15px" }}>
            <button
              onClick={() => navigate('/marksheet')}
              style={{
                padding: "10px 20px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              View Marksheet
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default Examination;