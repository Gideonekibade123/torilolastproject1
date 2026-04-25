import { Link } from "react-router-dom";

const SignupSuccess = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>🎉 Registration Successful!</h2>

      <p style={{ marginTop: "20px" }}>
        We’ve sent an activation link to your email. <br />
        Please check your inbox (and spam folder) to activate your account.
      </p>

      <Link to="/signin">
        <button className="btn btn-primary mt-3">
          Go to Sign In
        </button>
      </Link>
    </div>
  );
};

export default SignupSuccess;