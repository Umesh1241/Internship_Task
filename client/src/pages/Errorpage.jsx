import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Errorpage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center p-6">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl mb-4">Oops! The page you're looking for doesn't exist.</p>
          <p className="text-md text-gray-400 mb-8">
            It seems you may have taken a wrong turn. Let's get you back on track.
          </p>
          <Link
            to="/"
            className="px-6 py-3 bg-red-500 text-white rounded-lg shadow-lg hover:bg-red-600 transition duration-200"
          >
            Go to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Errorpage;
