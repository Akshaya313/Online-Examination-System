// API base URL - temporarily using mock data until MySQL is set up
const API_BASE = 'http://localhost:5002/api'; // Will work once MySQL is configured

// Mock data for testing without backend
let mockUsers = [];
let mockResults = [];
let currentUser = null;

// Mock questions for testing
const mockQuestions = [
  {
    id: 1,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1, // Index of correct answer (0-based)
    subject: "Mathematics",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2, // Index of correct answer (0-based)
    subject: "Geography",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "What is 5 × 5?",
    options: ["20", "25", "30", "35"],
    correctAnswer: 1, // Index of correct answer (0-based)
    subject: "Mathematics",
    difficulty: "easy"
  }
];

// Helper function to get auth token
const getToken = () => localStorage.getItem('token');

// Helper function for API calls (with fallback to mock data)
const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  };

  try {
    console.log('Making API call to:', endpoint);
    const response = await fetch(`${API_BASE}${endpoint}`, config);
    console.log('API response status:', response.status);
    if (response.ok) {
      const data = await response.json();
      console.log('API response data:', data);
      return data;
    }
    throw new Error('API not available, using mock data');
  } catch (error) {
    console.log('API call failed, using mock data for:', endpoint);
    // Return mock data based on endpoint
    return getMockData(endpoint, options);
  }
};

// Mock data provider
const getMockData = (endpoint, options) => {
  const body = options.body ? JSON.parse(options.body) : {};

  if (endpoint === '/auth/register' && options.method === 'POST') {
    const { username, email, password } = body;
    const existingUser = mockUsers.find(u => u.username === username || u.email === email);
    if (existingUser) {
      throw new Error('User already exists');
    }
    const user = { id: Date.now(), username, email, password };
    mockUsers.push(user);
    const token = btoa(JSON.stringify({ id: user.id, username }));
    return { token, user: { id: user.id, username, email } };
  }

  if (endpoint === '/auth/login' && options.method === 'POST') {
    const { username, password } = body;
    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const token = btoa(JSON.stringify({ id: user.id, username }));
    return { token, user: { id: user.id, username, email: user.email } };
  }

  if (endpoint === '/exam/questions') {
    return mockQuestions.slice(0, 3); // Return 3 questions (actual available)
  }

  if (endpoint === '/exam/submit' && options.method === 'POST') {
    const { answers } = body;
    let score = 0;
    mockQuestions.slice(0, 3).forEach((q, index) => { // Check 3 questions
      if (answers && answers[index]) {
        // Find the index of the selected answer in the options array
        const selectedIndex = q.options.indexOf(answers[index]);
        if (selectedIndex === q.correctAnswer) score++;
      }
    });
    const totalScore = 3; // Match the number of questions returned
    const percentage = Math.round((score / totalScore) * 100);
    const result = {
      id: Date.now(),
      examName: 'Mock Exam',
      score,
      totalScore, // Now correctly 3
      percentage,
      answers,
      date: new Date().toISOString()
    };
    mockResults.push(result);
    return { score, totalScore, percentage };
  }

  if (endpoint === '/exam/results') {
    return mockResults;
  }

  throw new Error('Mock endpoint not implemented');
};

// Get questions from backend
export const getQuestions = async () => {
  try {
    const questions = await apiCall('/exam/questions');
    return questions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correct: q.correctAnswer
    }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    // Fallback to mock questions
    return mockQuestions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options,
      correct: q.correctAnswer
    }));
  }
};

// Calculate score (client-side for now)
export const calculateScore = (answers, questions) => {
  let score = 0;
  questions.forEach((q, index) => {
    if (answers[index]) {
      // Find the index of the selected answer in the options array
      const selectedIndex = q.options.indexOf(answers[index]);
      if (selectedIndex === q.correct) {
        score++;
      }
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
      totalScore: 3, // Fixed to 3 questions
      percentage: Math.round((score / 3) * 100),
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