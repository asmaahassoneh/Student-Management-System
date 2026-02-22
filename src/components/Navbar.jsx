import { NavLink } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">Student Management System</div>

        <div className="links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/students">Students</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/random-user">Random User</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
