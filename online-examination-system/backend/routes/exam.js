const express = require('express');
const Question = require('../models/Question');
const Result = require('../models/Result');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all questions
router.get('/questions', auth, async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit exam
router.post('/submit', auth, async (req, res) => {
  try {
    const { answers } = req.body;
    
    // Get questions to calculate score
    const questions = await Question.find();
    let score = 0;
    
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) {
        score++;
      }
    });
    
    // Save result
    const result = new Result({
      userId: req.user.id,
      answers,
      score,
      totalQuestions: questions.length,
      percentage: Math.round((score / questions.length) * 100)
    });
    
    await result.save();
    
    res.json({
      score,
      totalQuestions: questions.length,
      percentage: result.percentage
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user results
router.get('/results', auth, async (req, res) => {
  try {
    const results = await Result.find({ userId: req.user.id })
      .populate('userId', 'username')
      .sort({ date: -1 });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add question (admin only)
router.post('/questions', auth, async (req, res) => {
  try {
    const user = await require('../models/User').findById(req.user.id);
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const { question, options, correctAnswer, subject } = req.body;
    const newQuestion = new Question({
      question,
      options,
      correctAnswer,
      subject
    });
    
    await newQuestion.save();
    res.json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Seed initial questions
router.post('/seed', async (req, res) => {
  try {
    const questions = [
      {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4",
        subject: "Mathematics"
      },
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris",
        subject: "Geography"
      },
      {
        question: "What is 5 * 5?",
        options: ["20", "25", "30", "35"],
        correctAnswer: "25",
        subject: "Mathematics"
      }
    ];
    
    await Question.insertMany(questions);
    res.json({ message: 'Questions seeded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;