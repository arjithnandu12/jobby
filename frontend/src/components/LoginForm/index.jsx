import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../../Context/AuthContext.jsx";
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5001/api/user';

const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null); 
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); 
    try {
      if (isLogin) {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        login(response.data.accessToken);
        navigate('/',{ replace: true });
      } else {
        await axios.post(`${API_URL}/register`, { username, email, password });
        
        alert('Registration successful. You can now log in.');
        setIsLogin(true);
      }
    } catch (err) {
      
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto mt-10 border border-gray-700 rounded-lg shadow-lg bg-black text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">
        {isLogin ? 'Login' : 'Register'}
      </h2>
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-4 p-3 bg-red-800 text-red-200 rounded-md text-sm">
            {error}
          </div>
        )}
        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 font-bold text-black bg-yellow-400 rounded-md hover:bg-yellow-500 transition-colors duration-300"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <div className="mt-4 text-center text-gray-400">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-yellow-400 hover:underline transition-colors duration-300"
        >
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;