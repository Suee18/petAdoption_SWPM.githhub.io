// src/components/LoggedInNavbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const LoggedInNavbar = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  
  // Get the user role from localStorage when component mounts
  useEffect(() => {
    const role = localStorage.getItem('userRole') || 'user';
    setUserRole(role);
  }, []);
  
  const handleLogout = (e) => {
    e.preventDefault();
    
    // Remove all user data from localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('username');
    
    // Redirect to home page
    navigate('/');
    
    // Force page refresh to update the navbar
    window.location.reload();
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Cairo Paws
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/available-pets" className="nav-links">
              Available Pets
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/inbox" className="nav-links">
              Inbox
            </Link>
          </li>
          
          {userRole === 'shelter' ? (
            <li className="nav-item">
              <Link to="/shelter-dashboard" className="nav-links shelter-dashboard-link">
                Shelter Dashboard
              </Link>
            </li>
          ) : (
            <li className="nav-item">
              <Link to="/profile" className="nav-links">
                My Profile
              </Link>
            </li>
          )}
          
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={handleLogout}>
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LoggedInNavbar;