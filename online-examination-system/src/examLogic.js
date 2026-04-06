// Questions Data

export const questions = [

  {
    id: 1,
    question: "What does HTML stand for?",

    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyper Tool Multi Language",
      "Hyperlinks Text Management Language"
    ],

    answer: "Hyper Text Markup Language"
  },

  {
    id: 2,
    question: "Which language is used for styling web pages?",

    options: [
      "HTML",
      "JQuery",
      "CSS",
      "XML"
    ],

    answer: "CSS"
  },

  {
    id: 3,
    question: "Which is a JavaScript framework?",

    options: [
      "React",
      "HTML",
      "CSS",
      "Python"
    ],

    answer: "React"
  }

];



// Function to Calculate Score

export function calculateScore(userAnswers) {

  let score = 0;

  questions.forEach((q, index) => {

    if (userAnswers[index] === q.answer) {

      score++;

    }

  });

  return score;

}