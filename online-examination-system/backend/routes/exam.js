const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Get database connection from app
const getDb = (req) => req.app.get('db');

// Get all questions
router.get('/questions', auth, async (req, res) => {
  try {
    const db = getDb(req);
    const Question = new (require('../models/Question'))(db);
    const questions = await Question.getRandomQuestions(10); // Get 10 random questions
    res.json(questions);
  } catch (error) {
    console.error('Questions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit exam
router.post('/submit', auth, async (req, res) => {
  try {
    const db = getDb(req);
    const Question = new (require('../models/Question'))(db);
    const Result = new (require('../models/Result'))(db);
    const { answers } = req.body;

    // Get questions to calculate score
    const questions = await Question.getRandomQuestions(10);
    let score = 0;

    questions.forEach((q, index) => {
      if (answers && answers[index] === q.correctAnswer) {
        score++;
      }
    });

    const totalScore = questions.length;
    const percentage = Math.round((score / totalScore) * 100);

    // Save result
    await Result.create({
      userId: req.user.id,
      score,
      totalScore,
      percentage,
      answers: answers || []
    });

    res.json({
      score,
      totalScore,
      percentage
    });
  } catch (error) {
    console.error('Submit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user results
router.get('/results', auth, async (req, res) => {
  try {
    const db = getDb(req);
    const Result = new (require('../models/Result'))(db);
    const results = await Result.findByUserId(req.user.id);
    res.json(results);
  } catch (error) {
    console.error('Results error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add question (admin only)
router.post('/questions', auth, async (req, res) => {
  try {
    const db = getDb(req);
    const User = new (require('../models/User'))(db);
    const Question = new (require('../models/Question'))(db);

    const user = await User.findById(req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { question, options, correctAnswer, subject, difficulty = 'medium' } = req.body;
    const questionId = await Question.create({
      question,
      options,
      correctAnswer,
      subject,
      difficulty
    });

    res.json({ id: questionId, message: 'Question added successfully' });
  } catch (error) {
    console.error('Add question error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Seed initial questions
router.post('/seed', async (req, res) => {
  try {
    const db = getDb(req);
    const Question = new (require('../models/Question'))(db);

    const questions = [
      {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1, // Index of correct answer (0-based)
        subject: "Mathematics",
        difficulty: "easy"
      },
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2,
        subject: "Geography",
        difficulty: "easy"
      },
      {
        question: "What is 5 * 5?",
        options: ["20", "25", "30", "35"],
        correctAnswer: 1,
        subject: "Mathematics",
        difficulty: "easy"
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        subject: "Science",
        difficulty: "easy"
      },
      {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3,
        subject: "Geography",
        difficulty: "medium"
      }
    ];

    for (const q of questions) {
      await Question.create(q);
    }

    res.json({ message: 'Questions seeded successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;