import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import './Pages.css';
import dogImage from '../assets/images/dog-please-adopt-me-fb.jpg';

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Sample user credentials (in a real app, this would be server-side validation)
  const users = {
    // Regular users
    "user1": { password: "password1", role: "user", name: "John Doe" },
    "user2": { password: "password2", role: "user", name: "Jane Smith" },
    // Shelter accounts
    "happypaws": { password: "shelter123", role: "shelter", name: "Happy Paws Shelter" },
    "cairorescue": { password: "cairo456", role: "shelter", name: "Cairo Pet Rescue" }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const user = users[username];
      
      if (!user) {
        setError("Username not found");
        setLoading(false);
        return;
      }
      
      if (user.password !== password) {
        setError("Invalid password");
        setLoading(false);
        return;
      }
      
      // Successfully authenticated
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('username', username);
      
      // Call the onLogin handler from props
      onLogin();
      
      // Redirect to appropriate dashboard based on role
      if (user.role === 'shelter') {
        navigate('/shelter-dashboard');
      } else {
        navigate('/profile');
      }
      
      setLoading(false);
    }, 1000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="auth-page">
      <motion.div 
        className="auth-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="auth-card" variants={itemVariants}>
          <div className="auth-image-container">
            <img
              src={dogImage}
              className="auth-image"
              alt="A cute dog waiting to be adopted"
            />
            <div className="auth-image-overlay"></div>
          </div>
          
          <div className="auth-content">
            <motion.h2 
              className="auth-title"
              variants={itemVariants}
            >
              Welcome Back
            </motion.h2>
            
            {error && (
              <motion.div 
                className="auth-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}
            
            <motion.form 
              className="auth-form"
              onSubmit={handleSubmit}
              variants={itemVariants}
            >
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="Enter your username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>

              <motion.button 
                className="auth-button"
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {loading ? 'Logging in...' : 'Login'}
              </motion.button>
            </motion.form>
            
            <motion.div
              className="auth-links"
              variants={itemVariants}
            >
              <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </motion.div>

            <motion.div className="auth-demo-accounts" variants={itemVariants}>
              <h4>Demo accounts — click one to fill the form</h4>
              <div className="demo-account-list">
                <button
                  type="button"
                  className="demo-account"
                  onClick={() => { setUsername('user1'); setPassword('password1'); setError(''); }}
                >
                  <p className="demo-account-role">🐾 Pet Adopter</p>
                  <p>Username: <strong>user1</strong></p>
                  <p>Password: <strong>password1</strong></p>
                </button>
                <button
                  type="button"
                  className="demo-account"
                  onClick={() => { setUsername('happypaws'); setPassword('shelter123'); setError(''); }}
                >
                  <p className="demo-account-role">🏠 Shelter</p>
                  <p>Username: <strong>happypaws</strong></p>
                  <p>Password: <strong>shelter123</strong></p>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
