import classes from "./Header.module.css";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../../assets/logo1.png";
import { AppState } from "../../App";
import { GiHamburgerMenu } from "react-icons/gi";

function Header() {
  const user = useContext(AppState);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    user.setUser(null);
    navigate("/login");
  };

  return (
    <section className={classes.navbar}>
      <div className={classes.header_container}>
        <div className={classes.logo_container}>
          <Link to={user.user ? "/" : "/login"}>
            <img src={logo1} alt="evangadi logo" />
          </Link>
        </div>
        <div
          className={`${classes.header_links} ${isMenuOpen ? classes.show : ""}`}
        >
          <Link to={user.user ? "/" : "/login"}>
            <p>Home</p>
          </Link>
          <Link to={"/how-it-works"}>
            <p>How it works</p>
          </Link>
          <div>
            {user.user ? (
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button>Login</button>
              </Link>
            )}
          </div>
        </div>
        <div className={classes.hamburger_menu} onClick={toggleMenu}>
          <GiHamburgerMenu size={25} />
        </div>
      </div>
    </section>
  );
}

export default Header;
