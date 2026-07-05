import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import './Pages.css';
import dogImage from '../assets/images/dog-please-adopt-me-fb.jpg';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    city: '',
    zipCode: '',
    birthdate: '',
    gender: '',
    previousPets: '',
    currentPets: '',
    job: '',
    maritalStatus: '',
    children: '',
    childrenCount: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.userName) newErrors.userName = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const prevStep = () => {
    setStep(1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // If no errors, proceed with signup
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setLoading(false);
      // Redirect to login
      navigate('/login');
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  // Page transition variants
  const pageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 250, damping: 25 }
    },
    exit: { 
      opacity: 0, 
      x: -100,
      transition: { type: "spring", stiffness: 250, damping: 25 }
    }
  };

  return (
    <div className="auth-page signup-page">
      <motion.div 
        className="auth-container signup-container"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="auth-card signup-card" variants={itemVariants}>
          <div className="auth-image-container">
            <img
              src={dogImage}
              className="auth-image"
              alt="A cute dog waiting for a home"
            />
            <div className="auth-image-overlay"></div>
          </div>
          
          <div className="auth-content">
            <motion.h2 
              className="auth-title"
              variants={itemVariants}
            >
              Create Your Account
            </motion.h2>
            
            {step === 1 ? (
              <motion.form 
                className="auth-form signup-form"
                initial="hidden"
                animate="visible"
                variants={pageVariants}
                key="step1"
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="userName">Username</label>
                    <input
                      type="text"
                      id="userName"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      className={errors.userName ? 'error' : ''}
                      required
                      placeholder="Create a username"
                    />
                    {errors.userName && <span className="error-message">{errors.userName}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={errors.email ? 'error' : ''}
                      required
                      placeholder="your@email.com"
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={errors.password ? 'error' : ''}
                      required
                      placeholder="Create a secure password"
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={errors.confirmPassword ? 'error' : ''}
                      required
                      placeholder="Enter password again"
                    />
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Your street address"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Your city"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="zipCode">Zip Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="Postal code"
                    />
                  </div>
                </div>

                <motion.button 
                  className="auth-button"
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Continue <span className="button-arrow">→</span>
                </motion.button>
                
                <motion.div 
                  className="auth-links"
                  variants={itemVariants}
                >
                  <p>Already have an account? <Link to="/login">Login</Link></p>
                </motion.div>
              </motion.form>
            ) : (
              <motion.form 
                className="auth-form signup-form"
                onSubmit={handleSubmit}
                initial="hidden"
                animate="visible"
                variants={pageVariants}
                key="step2"
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="birthdate">Birthdate</label>
                    <input
                      type="date"
                      id="birthdate"
                      name="birthdate"
                      value={formData.birthdate}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="select-input"
                    >
                      <option value="" disabled>Select Gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="previousPets">Have you had pets before?</label>
                    <select
                      id="previousPets"
                      name="previousPets"
                      value={formData.previousPets}
                      onChange={handleChange}
                      className="select-input"
                    >
                      <option value="" disabled>Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="currentPets">Do you currently have pets?</label>
                    <select
                      id="currentPets"
                      name="currentPets"
                      value={formData.currentPets}
                      onChange={handleChange}
                      className="select-input"
                    >
                      <option value="" disabled>Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="job">Occupation</label>
                  <input
                    type="text"
                    id="job"
                    name="job"
                    value={formData.job}
                    onChange={handleChange}
                    placeholder="Your occupation"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="maritalStatus">Marital Status</label>
                    <select
                      id="maritalStatus"
                      name="maritalStatus"
                      value={formData.maritalStatus}
                      onChange={handleChange}
                      className="select-input"
                    >
                      <option value="" disabled>Select Status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="children">Do you have children?</label>
                    <select
                      id="children"
                      name="children"
                      value={formData.children}
                      onChange={handleChange}
                      className="select-input"
                    >
                      <option value="" disabled>Select</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                </div>

                {formData.children === 'yes' && (
                  <div className="form-group">
                    <label htmlFor="childrenCount">Number of Children</label>
                    <input
                      type="number"
                      id="childrenCount"
                      name="childrenCount"
                      value={formData.childrenCount}
                      onChange={handleChange}
                      min="1"
                      placeholder="How many children do you have?"
                    />
                  </div>
                )}

                <div className="buttons-row">
                  <motion.button 
                    className="auth-button secondary-button"
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span className="button-arrow">←</span> Back
                  </motion.button>
                  
                  <motion.button 
                    className="auth-button"
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {loading ? 'Creating Account...' : 'Complete Sign Up'}
                  </motion.button>
                </div>
              </motion.form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
