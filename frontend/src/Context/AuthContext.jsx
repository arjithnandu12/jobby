import { createContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();
export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('accessToken'); // get token from cookies
    if (token) {
      try {
        
        setUser({});
      } catch (e) {
        console.error('Failed to decode token:', e);
        Cookies.remove('accessToken');
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    // store token in cookie, expires in 1 day
    Cookies.set('accessToken', token, { expires: 1, secure: true });
    const decoded = jwtDecode(token);
    setUser({ token, ...decoded.user });
  };

  const logout = () => {
    Cookies.remove('accessToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
