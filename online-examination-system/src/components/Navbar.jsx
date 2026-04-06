import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/instructions">Instructions</Link></li>
        <li><Link to="/examination">Examination</Link></li>
        <li><Link to="/marksheet">Marksheet</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;