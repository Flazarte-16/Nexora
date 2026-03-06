import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? jwtDecode(token) : null;
  });

  const login = async (inputForm) => {
    const response = await fetch("http://localhost:3000/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(inputForm),
    });
    const data = await response.json();

    if (data.type === "OK") {
      localStorage.setItem("token", data.token);
      setUser(jwtDecode(data.token));
      return { type: "OK", message: data.message };
    } else {
      return { type: "ERROR", message: data.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    return { type: "OK", message: "Logged out successfully." };
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
