import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Landing.css';
import petid from '../media/LandingPage/petid.png';
import petsearchicon from '../media/LandingPage/petsearchicon.png';
import requestdoc from '../media/LandingPage/requestdoc.png';
import request from '../media/LandingPage/request.png';
import petshop from '../media/LandingPage/petshop.png';
import chat from '../media/LandingPage/chat.png';
import donation from '../media/LandingPage/donation.png';
// Import the paw image
import pawImage from '../media/LandingPage/paw1.png';

const Landing = () => {
  const navigate = useNavigate();
  // State for paw animation management
  const [pawsArray, setPawsArray] = useState([]);
  const [shouldAnimate, setShouldAnimate] = useState(true);

  // Generate random position within the hero section
  const getRandomPosition = () => {
    return {
      x: Math.random() * 100, // percentage of width
      y: Math.random() * 100, // percentage of height
      rotation: Math.random() * 360, // random rotation
      size: 30 + Math.random() * 40, // random size between 30px and 70px
      opacity: 0.4 + Math.random() * 0.4, // random opacity between 0.4 and 0.8
      scale: 0.8 + Math.random() * 0.4, // random scale between 0.8 and 1.2
      delay: Math.random() * 0.5, // random delay for animation
      duration: 2 + Math.random() * 2, // random duration for fade effect
      id: Date.now() + Math.random(), // unique id
    };
  };

  // Function to add a new paw print - memoize with useCallback
  const addPaw = useCallback(() => {
    if (!shouldAnimate) return;

    const newPaw = getRandomPosition();
    setPawsArray(prevPaws => [...prevPaws, newPaw]);

    // Remove the paw after animation completes
    setTimeout(() => {
      setPawsArray(prevPaws => prevPaws.filter(paw => paw.id !== newPaw.id));
    }, (newPaw.duration + newPaw.delay) * 1000);
  }, [shouldAnimate]);

  // Setup paw creation interval
  useEffect(() => {
    // Initialize with a few paws
    for (let i = 0; i < 5; i++) {
      addPaw();
    }

    // Create new paws at random intervals
    const interval = setInterval(() => {
      // Add 1-3 paws at random
      const pawCount = 1 + Math.floor(Math.random() * 3);
      for (let i = 0; i < pawCount; i++) {
        addPaw();
      }
    }, 1000);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShouldAnimate(!prefersReducedMotion);

    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, [addPaw]); // Add addPaw to the dependency array

  // Features data for both user and shelter sides
  const features = {
    users: [
      {
        title: "Browse Pets",
        description: "Discover pets available for adoption with advanced filtering options",
        icon: petsearchicon
      },
      
      {
        title: "Request Adoption",
        description: "Simple click to request adoption for your selected pet",
        icon: request
      },
      {
        title: "Donate directly to shelters",
        description: "Support shelters and rescues with donations",
        icon: donation
      },
      {
        title: "Chat with shelters",
        description: "Easily communicate with shelters to ask questions",
        icon: chat
      }
    ],
    shelters: [
      {
        title: "Shelter Profile",
        description: "Create a detailed profile for your shelter or rescue organization",
        icon: petshop
      },
      {
        title: "Pets display",
        description: "Create detailed profiles for pets available for adoption",
        icon: petid
      },
      {
        title: "Requests Management",
        description: "Review and manage adoption applications efficiently",
        icon: requestdoc
      },
      {
        title: "Receive donations",
        description: "Accept donations directly through the platform",
        icon: donation
      },
      {
        title: "Chat with adopters",
        description: "Easily communicate with potential adopters",
        icon: chat
      },
    ]
  };

  // Animation variants for content elements
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
    <div className="landing-container">
      {/* Hero Section with Animated Paws */}
      <section className="hero-section">
        {/* Animated paw prints */}
        <div className="paws-container" aria-hidden="true">
          <AnimatePresence>
            {pawsArray.map((paw) => (
              <motion.div
                key={paw.id}
                className="animated-paw"
                initial={{ opacity: 0, scale: 0, rotate: paw.rotation }}
                animate={{
                  opacity: paw.opacity,
                  scale: paw.scale,
                  rotate: paw.rotation
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{
                  opacity: {
                    duration: paw.duration,
                    delay: paw.delay,
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: paw.duration * 0.8,
                    delay: paw.delay,
                    ease: "easeOut"
                  }
                }}
                style={{
                  left: `${paw.x}%`,
                  top: `${paw.y}%`,
                  width: `${paw.size}px`,
                  height: `${paw.size}px`,
                }}
              >
                <img
                  src={pawImage}
                  alt=""
                  className="paw-image"
                  style={{
                    filter: `hue-rotate(${Math.random() * 30}deg)`,
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants}>Find Your Forever Friend</motion.h1>
          <motion.p className="motto" variants={itemVariants}>
            Connecting loving homes with pets who need it
          </motion.p>

          {/* Image Collage Container */}
          <motion.div
            className="hero-image-container"
            variants={itemVariants}
          >
            <motion.div
              className="hero-image-wrapper collage-wrapper"
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 }
              }}
            >
              <div className="hero-image-glow"></div>

              {/* Image Collage Grid */}
              <div className="image-collage">
                <div className="collage-item collage-item-1">
                  <img
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8b84c5112602709.6017f09c33cf4.jpg"
                    alt="Happy dog with owner"
                    className="collage-image"
                  />
                </div>
                <div className="collage-item collage-item-2">
                  <img
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/309586112602709.6017f41be1dd3.jpg"
                    alt="Cat looking for home"
                    className="collage-image"
                  />
                </div>
                <div className="collage-item collage-item-3">
                  <img
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1ced16112602709.6017f09c32912.jpg"
                    alt="Puppy adoption day"
                    className="collage-image"
                  />
                </div>
                <div className="collage-item collage-item-4">
                  <img
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/source/8c3eaa112602709.6017f09c2ef33.jpg"
                    alt="Family with new pet"
                    className="collage-image"
                  />
                </div>
                <div className="collage-item collage-item-5">
                  <img
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/source/471b04112602709.6017f09c2f6fc.jpg"
                    alt="Pet shelter volunteer"
                    className="collage-image"
                  />
                </div>
                <div className="collage-item collage-item-6">
                  <img
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/source/c4ae32112602709.6017f09c2a8f3.jpg"
                    alt="Adopted pets in new home"
                    className="collage-image"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="scroll-indicator"
            animate={{
              y: [0, 10, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <svg className="scroll-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <motion.h2
          className='features-title'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          How We Help
        </motion.h2>

        <div className="features-container">
          <motion.div
            className="feature-column"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className='column-header'>For Pet Adopters</h3>
            <div className="feature-cards">
              {features.users.map((feature, index) => (
                <motion.div
                  className="feature-card"
                  key={`user-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  <div className="feature-icon">
                    <img src={feature.icon} alt="" />
                  </div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Simple vertical divider between feature columns */}
          <div className="feature-divider" aria-hidden="true">
            <span className="divider-line"></span>
          </div>

          <motion.div
            className="feature-column"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className='column-header'>For Shelters</h3>
            <div className="feature-cards">
              {features.shelters.map((feature, index) => (
                <motion.div
                  className="feature-card"
                  key={`shelter-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                >
                  <div className="feature-icon">
                    <img src={feature.icon} alt="" aria-hidden="true" />
                  </div>
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    
        
      {/* CTA Section with Enhanced Buttons */}
<section className="cta-section">
  <motion.div
    className="cta-content"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
  >
    <h2>Ready to make a difference?</h2>
    <p>Whether you're looking to adopt or you represent a shelter, we're here to help.</p>
    
    <div className="cta-buttons">
      <motion.button
        className="cta-button primary"
        whileHover="hover"
        whileTap="tap"
        variants={{
          hover: {
            scale: 1.03,
            boxShadow: "0 6px 20px rgba(108, 95, 141, 0.4)"
          },
          tap: { scale: 0.97 }
        }}
        onClick={() => navigate('/available-pets')}
      >
        <motion.span 
          className="button-text"
          variants={{
            hover: {
              y: [-1, -4, -1],
              transition: { 
                duration: 0.6, 
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }
            }
          }}
        >
          Adopt a Pet
        </motion.span>
        <motion.span 
          className="button-highlight"
          variants={{
            hover: {
              width: "95%",
              transition: { duration: 0.4 }
            }
          }}
        />
      </motion.button>
      
      <motion.button
        className="cta-button secondary"
        whileHover="hover"
        whileTap="tap"
        variants={{
          hover: {
            scale: 1.03
          },
          tap: { scale: 0.97 }
        }}
        onClick={() => navigate('/register-shelter')}
      >
        <motion.span 
          className="button-text"
          variants={{
            hover: {
              letterSpacing: "0.1em",
              transition: { duration: 0.3 }
            }
          }}
        >
          Add Your Shelter
        </motion.span>
        <motion.span 
          className="button-border"
          variants={{
            hover: {
              opacity: 1,
              pathLength: 1,
              transition: { duration: 0.8, ease: "easeInOut" }
            }
          }}
        />
      </motion.button>
    </div>
  </motion.div>
</section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>Dedicated to connecting pets with loving homes since 2025.</p>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: hello@petadoption.com</p>
            <p>Phone: (555) 123-4567</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <motion.span whileHover={{ y: -3, scale: 1.2 }}>📱</motion.span>
              <motion.span whileHover={{ y: -3, scale: 1.2 }}>📘</motion.span>
              <motion.span whileHover={{ y: -3, scale: 1.2 }}>📸</motion.span>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>© 2025 Pet Adoption Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;