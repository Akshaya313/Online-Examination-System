class Result {
  constructor(db) {
    this.db = db;
  }

  // Create a new result
  async create(resultData) {
    const { userId, score, totalScore, percentage, answers } = resultData;
    const [result] = await this.db.execute(
      'INSERT INTO results (user_id, score, total_score, percentage, answers) VALUES (?, ?, ?, ?, ?)',
      [userId, score, totalScore, percentage, JSON.stringify(answers || [])]
    );
    return result.insertId;
  }

  // Get results by user ID
  async findByUserId(userId) {
    const [rows] = await this.db.execute(
      'SELECT id, score, total_score, percentage, answers, exam_date FROM results WHERE user_id = ? ORDER BY exam_date DESC',
      [userId]
    );
    return rows.map(row => ({
      id: row.id,
      examName: 'General Knowledge Quiz',
      score: row.score,
      totalScore: row.total_score,
      percentage: row.percentage,
      answers: JSON.parse(row.answers || '[]'),
      date: row.exam_date
    }));
  }

  // Get all results (for admin)
  async findAll() {
    const [rows] = await this.db.execute(`
      SELECT r.id, r.score, r.total_score, r.percentage, r.answers, r.exam_date,
             u.username, u.email
      FROM results r
      JOIN users u ON r.user_id = u.id
      ORDER BY r.exam_date DESC
    `);
    return rows.map(row => ({
      id: row.id,
      examName: 'General Knowledge Quiz',
      score: row.score,
      totalScore: row.total_score,
      percentage: row.percentage,
      answers: JSON.parse(row.answers || '[]'),
      date: row.exam_date,
      user: {
        username: row.username,
        email: row.email
      }
    }));
  }

  // Get result statistics
  async getStats() {
    const [rows] = await this.db.execute(`
      SELECT
        COUNT(*) as total_exams,
        AVG(percentage) as avg_percentage,
        MAX(percentage) as highest_score,
        MIN(percentage) as lowest_score
      FROM results
    `);
    return rows[0];
  }
}

module.exports = Result;