import React, { useContext } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext.jsx';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return (
    <nav
      className="flex items-center justify-between px-6 py-4 shadow-md"
      style={{
        backgroundColor: "#FFFDF2", // cream background
        borderBottom: "2px solid #000000", // black border
      }}
    >
      
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold tracking-wide">
          <RouterLink
            to="/"
            className="transition-colors duration-300"
            style={{
              color: "#000000", // black
            }}
          >
            <img 
             src="https://www.svgrepo.com/show/103299/job-search.svg" 
              alt="Job Board Logo"
              style={{ height: "50px", width: "50px" }}
            />
          </RouterLink>
        </h1>
      </div>

    
      <div className="flex items-center space-x-6">
        <RouterLink
          to="/jobs"
          className="font-medium transition-colors duration-300 hover:underline"
          style={{ color: "#000000" }}
        >
          All Jobs
        </RouterLink>
        <RouterLink
          to="/jobs/new"
          className="font-medium transition-colors duration-300 hover:underline"
          style={{ color: "#000000" }}
        >
          Post Job
        </RouterLink>

       
        {user ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 font-semibold rounded-md transition-all duration-300 hover:bg-black hover:text-[#FFFDF2]"
            style={{
              backgroundColor: "#000000",
              color: "#FFFDF2",
              border: "2px solid #000000",
            }}
          >
            Logout
          </button>
        ) : (
          <RouterLink
            to="/auth"
            className="px-4 py-2 font-semibold rounded-md transition-all duration-300 hover:bg-black hover:text-[#FFFDF2]"
            style={{
              backgroundColor: "#000000",
              color: "#FFFDF2",
              border: "2px solid #000000",
            }}
          >
            Login
          </RouterLink>
        )}
      </div>
    </nav>
  );
};

export default Header;
