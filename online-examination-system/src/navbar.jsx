import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  return (

    <nav className="navbar">

      <h2 className="logo">
        Exam System
      </h2>

      <div>

        <Link to="/">Home</Link>

        <Link to="/about">About</Link>

        <Link to="/contact">Contact</Link>

        <Link to="/signin">Sign In</Link>

        <Link to="/instructions">Instructions</Link>

        <Link to="/examination">Exam</Link>

        <Link to="/marksheet">Marksheet</Link>

      </div>

    </nav>

  );
}

export default Navbar;