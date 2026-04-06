const questions = [
  {
    id: 1,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct: "4"
  },
  {
    id: 2,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: "Paris"
  },
  {
    id: 3,
    question: "What is 5 * 5?",
    options: ["20", "25", "30", "35"],
    correct: "25"
  }
];

function calculateScore(answers) {
  let score = 0;
  questions.forEach((q, index) => {
    if (answers[index] === q.correct) {
      score++;
    }
  });
  return score;
}

export { questions, calculateScore };