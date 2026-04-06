import { useState, useEffect } from "react";

import {
  questions,
  calculateScore
} from "../utils/examLogic";

import {
  startTimer,
  formatTime
} from "../utils/timer";

function Examination() {

  const [answers, setAnswers] = useState(
    Array(questions.length).fill("")
  );

  const [score, setScore] =
    useState(null);

  const [timeLeft, setTimeLeft] =
    useState(60); // 60 seconds

  const [submitted, setSubmitted] =
    useState(false);

  // Start Timer

  useEffect(() => {

    const timer = startTimer(

      60,

      (time) => {
        setTimeLeft(time);
      },

      () => {
        handleSubmit(); // auto submit
      }

    );

    return () => clearInterval(timer);

  }, []);

  function handleOptionChange(
    qIndex,
    option
  ) {

    const newAnswers = [...answers];

    newAnswers[qIndex] = option;

    setAnswers(newAnswers);

  }

  function handleSubmit() {

    if (submitted) return;

    const result =
      calculateScore(answers);

    setScore(result);

    setSubmitted(true);

  }

  return (

    <div>

      <h1>Examination</h1>

      {/* Timer Display */}

      <h2>

        Time Left:
        {formatTime(timeLeft)}

      </h2>

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

                  disabled={submitted}

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

      <button
        onClick={handleSubmit}
        disabled={submitted}
      >

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