import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth'; // Custom hook for managing authentication context
import { toast } from 'react-toastify';

const Logout = () => {
  const { LogoutUser, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not logged in, we should not proceed with logout
    if (!isLoggedIn) {
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    // Call the backend logout API (optional, if you want server-side tracking of logout)
    fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Send the token if needed
      },
    })
      .then(response => response.json())
      .then(data => {
         toast.success("Successfully logged out")
        console.log(data.message); // Log server response (optional)
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });

    // Remove the token from localStorage (or sessionStorage, or cookies)
    LogoutUser(); // Assuming LogoutUser clears the token from context/localStorage

    // Navigate to login page
    navigate('/login');
  }, [LogoutUser, isLoggedIn, navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
