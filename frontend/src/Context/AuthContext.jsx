import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; 

const AuthContext = createContext();
export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ token, ...decoded.user });
      } catch (e) {
        console.error("Failed to decode token:", e);
        Cookies.remove("accessToken");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    Cookies.set("accessToken", token, { expires: 1, secure: true });
    try {
      const decoded = jwtDecode(token);
      setUser({ token, ...decoded.user });
    } catch (e) {
      console.error("Failed to decode token during login:", e);
      setUser(null);
    }
  };

  const logout = () => {
    Cookies.remove("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
