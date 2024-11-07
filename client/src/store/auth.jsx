import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(""); 

  const storeTokenInLs = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token;

  const LogoutUser = () => {
    setToken(null);
    localStorage.removeItem("token");
    setUser("");
  };

  const userAuthentication = async () => {
    if (!token) {
      setUser("");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        setUser("");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser("");
    }
  };

  useEffect(() => {
    userAuthentication();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLs, LogoutUser, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const AuthContextValue = useContext(AuthContext);

  if (!AuthContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return AuthContextValue;
};
