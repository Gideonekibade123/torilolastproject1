import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="container mt-5 text-center">
      <div className="card p-5 shadow-sm">
        <h1 className="display-3 text-success mb-4">Thank You!</h1>

        <p className="lead mb-3">
          Your order has been successfully placed.
          <br />
          We have sent a confirmation email to your registered email address.
        </p>

        <p className="mb-4 fw-semibold">
          Thank you for shopping with us.
        </p>

        <Link to="/" className="btn btn-dark btn-lg">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;