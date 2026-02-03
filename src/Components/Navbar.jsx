import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import ConfirmationModel from "./ConfirmationModel";
import { useState } from "react";
import EditProfileModal from "./EditProfileModal";
import { toast } from "react-toastify";
import { FaMoon, FaSun } from "react-icons/fa"; 
import { useTheme } from "../Context/ModelContext"; 

export function Navbar() {  
  const loggedInUserData = JSON.parse(localStorage.getItem("loginData")) || {};
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme(); 
  const [showModel, setShowModel] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const showModelHandler = () => {
    setShowModel(true);
  };

  const hideModelHandler = () => {
    setShowModel(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setShowModel(false);
    toast.success("Logged out successfully");
    navigate("/Login");
  };

  const profileLetter =
    loggedInUserData?.role === "admin"
      ? "A"
      : loggedInUserData?.name
      ? loggedInUserData.name.charAt(0).toUpperCase()
      : "U"; 

  return (
    <>
      <nav className={`nav ${theme}`}>
        <h2 className="title">Blogpost</h2>

        <div className="menubar">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Home
          </NavLink>
          {loggedInUserData?.role === "admin" && (
            <NavLink
              to="/CreatePostForm"
              className={({ isActive }) => (isActive ? "active-link" : "")}
            >
              New Post
            </NavLink>
          )}
          <NavLink
            to="/exploreposts"
            className={({ isActive }) => (isActive ? "active-link" : "")}
          >
            Explore Post
          </NavLink>
          <NavLink
            to=""
            className={({ isActive }) => (isActive ? "active-link" : "")}
            onClick={showModelHandler}
          >
            Logout
          </NavLink>
        </div>

        <div className="right-section">
          
          <div
            className="theme-toggle"
            onClick={toggleTheme} 
            style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" }}
          >
            {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />} 
            {theme === 'dark' ? 'Light' : 'Dark'}
          </div>

          <div
            className="profile-logo-circle"
            onClick={() => setShowEditModal(true)}
          >
            {profileLetter}
          </div>

          {showEditModal && (
            <EditProfileModal
              onClose={() => setShowEditModal(false)}
              userId={loggedInUserData?.id}
            />
          )}
        </div>
      </nav>

      {showModel && (
        <ConfirmationModel
          titlemodel="Logout?"
          descmodel="You are about to logout, are you sure?"
          onClose={hideModelHandler}
          onConfirm={handleLogout}
          confirmBtnText="Logout"
        />
      )}
    </>
  );
}
