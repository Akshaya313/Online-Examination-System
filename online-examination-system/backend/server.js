const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// MySQL Connection Pool
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'exam_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let db;
(async () => {
  try {
    db = await mysql.createPool(dbConfig);
    console.log('MySQL connected');

    // Create tables if they don't exist
    await createTables();
  } catch (err) {
    console.error('MySQL connection error:', err);
  }
})();

// Create database tables
async function createTables() {
  try {
    // Users table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('student', 'admin') DEFAULT 'student',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Questions table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS questions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        question_text TEXT NOT NULL,
        options JSON NOT NULL,
        correct_answer INT NOT NULL,
        subject VARCHAR(50),
        difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Results table
    await db.execute(`
      CREATE TABLE IF NOT EXISTS results (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        score INT NOT NULL,
        total_score INT NOT NULL,
        percentage DECIMAL(5,2) NOT NULL,
        answers JSON,
        exam_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);

    console.log('Database tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}

// Middleware
app.use(cors());
app.use(express.json());

// Make db available to routes
app.set('db', db);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/exam', require('./routes/exam'));

// Default route
app.get('/', (req, res) => {
  res.json({ message: 'Online Examination System API' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});