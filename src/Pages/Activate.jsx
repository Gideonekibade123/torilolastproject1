import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Activate = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Activating your account...");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const response = await fetch(
          `https://mascofashion.onrender.com/api/users/activate/${uid}/${token}/`,
          { method: "GET" }
        );

        const data = await response.json();

        if (response.ok) {
          setSuccess(true);
          setMessage("Account activated successfully! You can now sign in.");
          setTimeout(() => navigate("/signin"), 3000);
        } else {
          setError(data.error || "Activation failed. Link may be expired.");
        }
      } catch (err) {
        console.error(err);
        setError("Server error. Please try again.");
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  return (
    <div className="container mt-5" style={{ maxWidth: "400px", textAlign: "center" }}>
      <h2 className="mb-4">Account Activation</h2>

      {!error && !success && (
        <div className="alert alert-info">{message}</div>
      )}

      {success && (
        <div className="alert alert-success">
          {message} Redirecting to signin...
        </div>
      )}

      {error && (
        <div className="alert alert-danger">{error}</div>
      )}
    </div>
  );
};

export default Activate;