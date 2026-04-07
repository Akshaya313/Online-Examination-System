import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../utils/examLogic";

function SignIn() {
  const [isLogin, setIsLogin] = useState(true);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        // Login
        if (!credentials.username || !credentials.password) {
          throw new Error("Please enter username and password");
        }
        await login(credentials.username, credentials.password);
        navigate("/examination");
      } else {
        // Register
        if (!credentials.username || !credentials.email || !credentials.password) {
          throw new Error("Please fill in all fields");
        }
        await register(credentials.username, credentials.email, credentials.password);
        navigate("/examination");
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError(error.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>{isLogin ? "Sign In" : "Create Account"}</h1>
      <p>{isLogin ? "Enter your credentials to access the examination platform." : "Create a new account to get started."}</p>
      
      <div style={{ maxWidth: "400px", margin: "30px auto", textAlign: "left" }}>
        {error && (
          <div style={{
            backgroundColor: "#fee",
            color: "#e74c3c",
            padding: "10px",
            borderRadius: "6px",
            marginBottom: "20px",
            border: "1px solid #fcc"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "1rem"
              }}
            />
          </div>
          
          {!isLogin && (
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Email</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                  fontSize: "1rem"
                }}
              />
            </div>
          )}
          
          <div style={{ marginBottom: "25px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "600" }}>Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                fontSize: "1rem"
              }}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Please wait..." : (isLogin ? "Sign In" : "Create Account")}
          </button>
        </form>
        
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setCredentials({ username: "", email: "", password: "" });
            }}
            style={{
              background: "none",
              border: "none",
              color: "#667eea",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "0.9rem"
            }}
          >
            {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
        
        {isLogin && (
          <p style={{ textAlign: "center", marginTop: "20px", color: "#666", fontSize: "0.9rem" }}>
            <strong>Demo Account:</strong><br/>
            Username: <code>demo</code><br/>
            Password: <code>password123</code>
          </p>
        )}
      </div>
    </div>
  );
}

export default SignIn;