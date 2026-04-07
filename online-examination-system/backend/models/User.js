class User {
  constructor(db) {
    this.db = db;
  }

  // Create a new user
  async create(userData) {
    const { username, email, password, role = 'student' } = userData;
    const [result] = await this.db.execute(
      'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
      [username, email, password, role]
    );
    return result.insertId;
  }

  // Find user by username
  async findByUsername(username) {
    const [rows] = await this.db.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    return rows[0];
  }

  // Find user by email
  async findByEmail(email) {
    const [rows] = await this.db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  }

  // Find user by ID
  async findById(id) {
    const [rows] = await this.db.execute(
      'SELECT id, username, email, role, created_at FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  }

  // Check if user exists (by username or email)
  async exists(username, email) {
    const [rows] = await this.db.execute(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    return rows.length > 0;
  }
}

module.exports = User;