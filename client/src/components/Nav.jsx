import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../redux/auth.js";
import Logo from "../assets/argentBankLogo.png";
import { FaUserCircle } from "react-icons/fa";
import { getProfile } from "../redux/profile.js";

const Nav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.profiles);

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
        />
      </NavLink>
      <div>
        {user ? (
          <div className="signin-link">
            <div className="profile-icon">
              <NavLink to="/dashboard" className="main-nav-logo">
                <FaUserCircle className="icon" />
              </NavLink>
            </div>
            <div className="profile-name">{profile?.firstName}</div>
            <button className="sign-in-button" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        ) : (
          <NavLink to="/signin" className="main-nav-item">
            <button className="sign-in-button">Sign In</button>
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Nav;
