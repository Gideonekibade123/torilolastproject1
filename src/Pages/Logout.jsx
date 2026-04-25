import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove JWT tokens or any auth info from localStorage
    localStorage.removeItem("access");
    localStorage.removeItem("refresh"); // if you have a refresh token

    // Optionally, clear other user info from localStorage
    // localStorage.removeItem("user");

    // Redirect to home page
    navigate("/");
  };

  return (
    <button
      className="btn btn-link nav-link"
      style={{ textDecoration: "none" }}
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}

export default LogoutButton;