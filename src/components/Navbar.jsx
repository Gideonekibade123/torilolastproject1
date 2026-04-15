import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // ✅ Use state so navbar updates immediately on logout
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("access"));

  const handleLogout = () => {
    // Remove JWT tokens to log out
    localStorage.removeItem("access");
    localStorage.removeItem("refresh"); // if you use a refresh token

    // ✅ Update state immediately so navbar re-renders
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <h1>MASCO FASHION</h1>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-5">
            <li className="nav-item">
              <Link className="nav-link p-4 ms-5" to="ShopPage/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link p-4 ms-5" to="ShopPage/">Deals</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link p-4 ms-5" to="ShopPage/">New Arrival</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link p-4 ms-5" to="ShopPage/">Packages</Link>
            </li>

            {/* Conditional Sign In / Logout */}
            {!isLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link p-4 ms-5" to="/Signin">Sign in</Link>
              </li>
            )}

            {isLoggedIn && (
              <li className="nav-item">
                <button
                  className="nav-link p-4 ms-5 btn btn-link"
                  style={{ textDecoration: "none" }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>

          <form className="d-flex">
            <div className="col bg-dark rounded-4 p-2">
              <Link className="nav-link text-white" to="/Signup">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;













