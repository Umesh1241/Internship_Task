import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(""); // Store confirmPassword separately
  // const [error, setError] = useState(""); // For handling error messages

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
 
   const navigate = useNavigate();
   const {storeTokenInLs} = useAuth();

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value); // Set confirmPassword separately
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!user.username || !user.email || !user.password || !confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (user.password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data=await response.json();
      if(response.ok){
        storeTokenInLs(res_data.token);
        setUser({
          username: "",
          email: "",
          password: "",
        })
        toast.success("Registration successful!");
        navigate("/home"); 
      }else{
        toast.error(res_data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Create an Account
        </h2>

        {/* Display error message */}
        {/* {error && <div className="text-red-500 text-center mb-4">{error}</div>} */}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="relative">
            <label htmlFor="username" className="block text-sm font-medium text-white">
              Username
            </label>
            <div className="mt-2 relative">
              <FaUser className="absolute left-3 top-3 text-gray-400 text-2xl" />
              <input
                id="username"
                name="username"
                type="text"
                value={user.username}
                onChange={handleInput}
                className="block w-full px-10 py-3 mt-2 text-white bg-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter your username"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email address
            </label>
            <div className="mt-2 relative">
              <FaEnvelope className="absolute left-3 top-3 text-gray-400 text-2xl" />
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                onChange={handleInput}
                className="block w-full px-10 py-3 mt-2 text-white bg-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <div className="mt-2 relative">
              <FaLock className="absolute left-3 top-3 text-gray-400 text-2xl" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={handleInput}
                className="block w-full px-10 py-3 mt-2 text-white bg-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 text-2xl"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-white">
              Confirm Password
            </label>
            <div className="mt-2 relative">
              <FaLock className="absolute left-3 top-3 text-gray-400 text-2xl" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={handleConfirmPassword}
                className="block w-full px-10 py-3 mt-2 text-white bg-gray-800 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 text-2xl"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 text-white font-semibold bg-red-500 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
            >
              Register
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4 text-white">
          <p>
            Already have an account?{" "}
            <a
              href="/login"
              className="font-semibold text-red-400 hover:text-red-500"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
