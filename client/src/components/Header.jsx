import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import Logo from "../assets/Logo.webp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="w-full p-2 bg-gray-900 flex items-center justify-between shadow-3xl rounded-b-s">
      <div className="flex items-center ml-2">
        <Link to={"/home"}>
          <img
            src={Logo}
            alt="Logo"
            className="w-14 h-14 object-contain border-2 border-red-500 rounded-full"
          />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <button className="px-4 py-2 text-white font-semibold bg-red-600 rounded-lg hover:bg-red-700 transition duration-200">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button className="px-4 py-2 text-white font-semibold bg-gray-600 rounded-lg hover:bg-gray-700 transition duration-200">
                Register
              </button>
            </Link>
          </>
        ) : (
          <>
            <div className="text-white font-semibold">{user.username}</div>
            <button
              onClick={handleLogout}
              className="flex items-center text-white font-semibold bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800 transition duration-200"
            >
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
