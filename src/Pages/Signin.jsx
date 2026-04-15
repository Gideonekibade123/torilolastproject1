// src/Pages/Signin.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // ✅ If user already logged in, do not show signin again
 useEffect(() => {
  const token = localStorage.getItem("access");
  if (token && token !== "undefined") {
    navigate("/ShopPage");
  }
}, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // const response = await fetch(
      //   "https://mascofashion.onrender.com/api/users/login/",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       email: email,
      //       password: password,
      //     }),
      //   }
      // );
     const response = await fetch(
  "https://mascofashion.onrender.com/api/users/login/",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }
);

const data = await response.json();

console.log(data);

      if (response.ok) {
        // ✅ Save tokens
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);

        // ✅ Save user info
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        // ✅ Redirect to shop page
        navigate("/ShopPage");
      } else {
        if (data.detail) {
          setError(data.detail);
        } else if (data.non_field_errors) {
          setError(data.non_field_errors[0]);
        } else if (data.message) {
          setError(data.message);
        } else {
          setError("Invalid email or password");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="mb-4 text-center">Sign In</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3 text-center">
          <label htmlFor="email" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter email"
          />
        </div>

        <div className="mb-3 text-center">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter password"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-end mb-3">
          <Link to="/ForgotPassword" style={{ fontSize: "14px" }}>
            Forgot Password?
          </Link>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Sign In
        </button>
      </form>

      <p className="mt-3 text-center">
        Don't have an account? <Link to="/Signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Signin;





