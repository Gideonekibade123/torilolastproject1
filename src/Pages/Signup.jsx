
// // src/Pages/Signup.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setError(""); // clear previous errors

//     try {
//       // 1️⃣ Signup request
//       const response = await fetch("https://mascofashion.onrender.com/api/users/signup/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           username: email, // backend expects username
//           email: email,
//           password: password,
//           first_name: firstName,
//           last_name: lastName,
//         }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // 2️⃣ Auto-login after successful signup
//         const loginResponse = await fetch("https://mascofashion.onrender.com/api/users/login/", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email: email, password: password }),
//         });

//         const loginData = await loginResponse.json();

//         if (loginResponse.ok && loginData.access) {
//           // ✅ Store JWT access & refresh tokens
//           localStorage.setItem("access", loginData.access);
//           localStorage.setItem("refresh", loginData.refresh);

//           // ✅ Redirect to ShopPage
//           navigate("/ShopPage");
//         } else {
//           setError(loginData.detail || "Login failed after signup.");
//         }
//       } else {
//         // Signup backend error
//         if (data.detail) {
//           setError(data.detail);
//         } else {
//           const firstKey = Object.keys(data)[0];
//           setError(`${firstKey}: ${data[firstKey][0]}`);
//         }
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Network error. Try again later.");
//     }
//   };

//   return (
//     <form onSubmit={handleSignup} style={{ maxWidth: "400px", margin: "2rem auto" }}>
//       <h2 className="text-center mb-4">Sign Up</h2>

//       {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

//       <div className="mb-3">
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="form-control"
//         />
//       </div>

//       <div className="mb-3">
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="form-control"
//         />
//       </div>

//       <div className="mb-3">
//         <input
//           type="text"
//           placeholder="First Name"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           required
//           className="form-control"
//         />
//       </div>

//       <div className="mb-3">
//         <input
//           type="text"
//           placeholder="Last Name"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           required
//           className="form-control"
//         />
//       </div>

//       <button type="submit" className="btn btn-primary w-100">
//         Sign Up
//       </button>
//     </form>
//   );
// };

// export default Signup;






import { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("https://mascofashion.onrender.com/api/users/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: email,
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // setSuccess("Registration successful! Please check your email to activate your account before signing in.");
        navigate("/signup-success");
      } else {
        if (data.detail) {
          setError(data.detail);
        } else {
          const firstKey = Object.keys(data)[0];
          setError(`${firstKey}: ${data[firstKey][0]}`);
        }
      }
    } catch (err) {
      console.error(err);
      setError("Network error. Try again later.");
    }
  };

  return (
    <form onSubmit={handleSignup} style={{ maxWidth: "400px", margin: "2rem auto" }}>
      <h2 className="text-center mb-4">Sign Up</h2>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

      <div className="mb-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="form-control"
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">
        Sign Up
      </button>

      <p className="mt-3 text-center">
        Already have an account? <Link to="/signin">Sign In</Link>
      </p>
    </form>
  );
};

export default Signup;
