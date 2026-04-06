import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.username && credentials.password) {
      alert(`Welcome, ${credentials.username}!`);
      navigate("/examination");
      setCredentials({ username: "", password: "" });
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <p>Enter your credentials to access the examination platform.</p>
      
      <div style={{ maxWidth: "400px", margin: "30px auto", textAlign: "left" }}>
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
          
          <button type="submit" style={{ width: "100%" }}>Sign In</button>
        </form>
        
        <p style={{ textAlign: "center", marginTop: "20px", color: "#666" }}>
          Demo Credentials:<br/>
          Username: <strong>student</strong><br/>
          Password: <strong>password123</strong>
        </p>
      </div>
    </div>
  );
}

export default SignIn;