import { useState } from "react";

import {
  questions,
  calculateScore
} from "../utils/examLogic";

function Examination() {

  const [answers, setAnswers] = useState(
    Array(questions.length).fill("")
  );

  const [score, setScore] = useState(null);

  function handleOptionChange(qIndex, option) {

    const newAnswers = [...answers];

    newAnswers[qIndex] = option;

    setAnswers(newAnswers);
  }

  function handleSubmit() {

    const result = calculateScore(answers);

    setScore(result);

    // Save result to localStorage for marksheet
    const examResult = {
      examName: "General Knowledge Quiz",
      date: new Date().toISOString().split('T')[0],
      score: result,
      totalScore: questions.length,
      percentage: Math.round((result / questions.length) * 100),
      answers: answers
    };

    const existingResults = JSON.parse(localStorage.getItem('examResults') || '[]');
    existingResults.push(examResult);
    localStorage.setItem('examResults', JSON.stringify(existingResults));
  }

  return (

    <div>

      <h1>Examination</h1>

      {questions.map((q, qIndex) => (

        <div key={q.id}>

          <h3>
            {q.id}. {q.question}
          </h3>

          {q.options.map((opt, i) => (

            <div key={i}>

              <label>

                <input
                  type="radio"
                  name={`question-${qIndex}`}
                  value={opt}

                  onChange={() =>
                    handleOptionChange(
                      qIndex,
                      opt
                    )
                  }
                />

                {opt}

              </label>

            </div>

          ))}

        </div>

      ))}

      <br />

      <button onClick={handleSubmit}>
        Submit Exam
      </button>

      {score !== null && (

        <h2>

          Your Score:
          {score} / {questions.length}

        </h2>

      )}

    </div>

  );
}

export default Examination;