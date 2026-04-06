import { useState } from "react";

function SignIn() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {

    e.preventDefault();

    if (username && password) {

      alert("Login Successful");

    } else {

      alert("Enter username and password");

    }

  }

  return (

    <div>

      <h1>Sign In</h1>

      <form onSubmit={handleLogin}>

        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>

      </form>

    </div>

  );
}

export default SignIn;