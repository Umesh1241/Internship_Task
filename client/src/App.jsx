import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './store/auth';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CreateEmployee from './pages/CreateEmployee';
import UpdateEmployee from './pages/UpdateEmployee';
import Errorpage from './pages/Errorpage';
import Logout from './pages/Logout';
import Landing from "./pages/Landing";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return element;
};

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createEmployee" element={<CreateEmployee />} />
          <Route path="/updateEmployee/:id" element={<UpdateEmployee />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
