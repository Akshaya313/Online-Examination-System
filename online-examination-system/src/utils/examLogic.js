// API base URL
const API_BASE = process.env.NODE_ENV === 'production'
  ? 'https://your-backend-url.vercel.app/api'
  : 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = () => localStorage.getItem('token');

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'API call failed');
  }

  return data;
};

// Get questions from backend
export const getQuestions = async () => {
  try {
    const questions = await apiCall('/exam/questions');
    return questions.map(q => ({
      id: q._id,
      question: q.question,
      options: q.options,
      correct: q.correctAnswer
    }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    // Fallback to local questions if API fails
    return [
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
  }
};

// Calculate score (client-side for now)
export const calculateScore = (answers, questions) => {
  let score = 0;
  questions.forEach((q, index) => {
    if (answers[index] === q.correct) {
      score++;
    }
  });
  return score;
};

// Submit exam result to backend
export const submitExam = async (answers, score, totalQuestions) => {
  try {
    const result = await apiCall('/exam/submit', {
      method: 'POST',
      body: JSON.stringify({ answers })
    });
    return result;
  } catch (error) {
    console.error('Error submitting exam:', error);
    // Fallback: save to localStorage if API fails
    const examResult = {
      examName: "General Knowledge Quiz",
      date: new Date().toISOString().split('T')[0],
      score: score,
      totalScore: totalQuestions,
      percentage: Math.round((score / totalQuestions) * 100),
      answers: answers
    };

    const existingResults = JSON.parse(localStorage.getItem('examResults') || '[]');
    existingResults.push(examResult);
    localStorage.setItem('examResults', JSON.stringify(existingResults));

    return { score, totalQuestions, percentage: examResult.percentage };
  }
};

// Get user results from backend
export const getUserResults = async () => {
  try {
    const results = await apiCall('/exam/results');
    return results.map(r => ({
      examName: r.examName,
      date: new Date(r.date).toISOString().split('T')[0],
      score: r.score,
      totalScore: r.totalQuestions,
      percentage: r.percentage,
      answers: r.answers
    }));
  } catch (error) {
    console.error('Error fetching results:', error);
    // Fallback to localStorage
    return JSON.parse(localStorage.getItem('examResults') || '[]');
  }
};

// Authentication functions
export const login = async (username, password) => {
  const response = await apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password })
  });

  localStorage.setItem('token', response.token);
  localStorage.setItem('user', JSON.stringify(response.user));
  return response;
};

export const register = async (username, email, password) => {
  const response = await apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify({ username, email, password })
  });

  localStorage.setItem('token', response.token);
  localStorage.setItem('user', JSON.stringify(response.user));
  return response;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};