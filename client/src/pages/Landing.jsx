import React from "react";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";
import Logo from "../assets/Logo.webp";

const Landing = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center">
      <div className="text-center mb-8 border-2 border-red-500 rounded-full">
        <img src={Logo} alt="Logo" className="mx-auto w-80 h-80 rounded-full" />
      </div>

      <h2 className="text-white text-3xl">Welcome to CRUD Application</h2>
      <button
        onClick={handleLoginRedirect}
        className="flex items-center justify-center mt-4 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
      >
        <FaSignInAlt className="mr-2" /> Login
      </button>
    </div>
  );
};

export default Landing;
