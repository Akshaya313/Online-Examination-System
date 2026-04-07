class Question {
  constructor(db) {
    this.db = db;
  }

  // Get all questions
  async findAll() {
    const [rows] = await this.db.execute(
      'SELECT id, question_text, options, correct_answer, subject, difficulty FROM questions ORDER BY id'
    );
    return rows.map(row => ({
      id: row.id,
      question: row.question_text,
      options: JSON.parse(row.options),
      correctAnswer: row.correct_answer,
      subject: row.subject,
      difficulty: row.difficulty
    }));
  }

  // Get questions by subject
  async findBySubject(subject) {
    const [rows] = await this.db.execute(
      'SELECT id, question_text, options, correct_answer, subject, difficulty FROM questions WHERE subject = ? ORDER BY id',
      [subject]
    );
    return rows.map(row => ({
      id: row.id,
      question: row.question_text,
      options: JSON.parse(row.options),
      correctAnswer: row.correct_answer,
      subject: row.subject,
      difficulty: row.difficulty
    }));
  }

  // Get random questions for exam
  async getRandomQuestions(limit = 10) {
    const [rows] = await this.db.execute(
      'SELECT id, question_text, options, correct_answer, subject, difficulty FROM questions ORDER BY RAND() LIMIT ?',
      [limit]
    );
    return rows.map(row => ({
      id: row.id,
      question: row.question_text,
      options: JSON.parse(row.options),
      correctAnswer: row.correct_answer,
      subject: row.subject,
      difficulty: row.difficulty
    }));
  }

  // Create a new question
  async create(questionData) {
    const { question, options, correctAnswer, subject = 'General Knowledge', difficulty = 'medium' } = questionData;
    const [result] = await this.db.execute(
      'INSERT INTO questions (question_text, options, correct_answer, subject, difficulty) VALUES (?, ?, ?, ?, ?)',
      [question, JSON.stringify(options), correctAnswer, subject, difficulty]
    );
    return result.insertId;
  }
}

module.exports = Question;