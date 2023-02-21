import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fakeAuth } from "../utils/FakeAuth";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  const handleLogin = async () => {
    const token = await fakeAuth();
    setToken(token);
    navigate("/landing");
  };

  const handleLogout = () => {
    // remove token from local storage
    localStorage.removeItem('token');
    setToken(null);
  };

  const value = {
    token,
    onLogin: handleLogin,
    onLogout: handleLogout,
  };

  return (
    <AuthContext.Provider value={{ value }}>
      {children}
    </AuthContext.Provider>
  );
};

// give callers access to the context
export const useAuth = () => useContext(AuthContext);