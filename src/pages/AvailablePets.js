import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './AvailablePets.css';
// import PetListingNew from './PetListingNew';

// Online pet images
import pawImage from '../media/LandingPage/paw1.png'; // Keep local paw image

// Define online image URLs for pet types
const catImage = 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
const dogImage = 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
const birdImage = 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';
const reptileImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Bartagame_%28fcm%29.jpg/960px-Bartagame_%28fcm%29.jpg';
const otherImage = 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80';

const AvailablePets = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [showAdoptionSuccess, setShowAdoptionSuccess] = useState(false);
  const [adoptedPet, setAdoptedPet] = useState(null);
  const [pawsArray, setPawsArray] = useState([]);
  const navigate = useNavigate();
  
  // Generate paw prints on component mount
  useEffect(() => {
    const newPaws = [];
    for (let i = 0; i < 8; i++) {
      newPaws.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * 360,
        size: 30 + Math.random() * 25,
        opacity: 0.3 + Math.random() * 0.3,
      });
    }
    setPawsArray(newPaws);
  }, []);

  // Pet types data with images and descriptions
  const petTypes = [
    {
      type: 'Cats',
      image: catImage || 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Playful and affectionate feline friends looking for loving homes.',
      icon: '🐱'
    },
    {
      type: 'Dogs',
      image: dogImage || 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Loyal and energetic canine companions ready to join your family.',
      icon: '🐶'
    },
    {
      type: 'Birds',
      image: birdImage || 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Colorful feathered friends to brighten your home with song.',
      icon: '🦜'
    },
    {
      type: 'Reptiles',
      image: reptileImage,
      description: 'Fascinating scaled companions for the exotic pet enthusiast.',
      icon: '🦎'
    },
    {
      type: 'Other',
      image: otherImage || 'https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      description: 'Unique and special pets looking for their forever homes.',
      icon: '🐹'
    }
  ];

  // Adoption steps with clear and helpful information
  const adoptionSteps = [
    {
      step: 1,
      title: 'Browse Available Pets',
      description: 'Explore our selection of cats, dogs, birds, reptiles and other animals to find your perfect match.',
      icon: '🔍'
    },
    {
      step: 2,
      title: 'Submit an Application',
      description: 'Complete our adoption application form with your information and preferences.',
      icon: '📝'
    },
    {
      step: 3,
      title: 'Meet Your New Friend',
      description: 'Schedule a visit to meet the pet you\'re interested in and see if it\'s a good match.',
      icon: '🤝'
    },
    {
      step: 4,
      title: 'Bring Your Pet Home',
      description: 'Complete the adoption process, receive care guidance, and welcome your new family member!',
      icon: '🏠'
    }
  ];

  // Benefits of adopting from us
  const benefits = [
    {
      title: 'Veterinary Checked',
      description: 'All our pets receive complete health checks, vaccinations, and necessary treatments.'
    },
    {
      title: 'Microchipped & Spayed/Neutered',
      description: 'Pets are microchipped and spayed/neutered prior to adoption for their health and safety.'
    },
    {
      title: 'Behavior Assessment',
      description: 'Each pet undergoes behavior evaluation to match them with the right home environment.'
    },
    {
      title: 'Ongoing Support',
      description: 'Our team provides post-adoption guidance and resources for your pet care journey.'
    }
  ];

  // When a pet type is selected
  const handleSelectPetType = (type) => {
    setSelectedType(type);
    // Scroll to top when navigating to pet listings
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle going back to pet types
  const handleBackToPetTypes = () => {
    setSelectedType(null);
    setShowAdoptionSuccess(false);
  };

  // Handle adoption request submission
  const handleAdoptionRequest = (data) => {
    // In a real app, you'd send this data to your backend
    console.log('Adoption request submitted:', data);
    
    // Show success message
    setAdoptedPet(data.pet);
    setShowAdoptionSuccess(true);
    
    // Auto-scroll to success message
    setTimeout(() => {
      document.getElementById('adoption-success')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Mock data for pets by category
  const petsByCategory = {
    'Cats': [
      {
        id: 'cat1',
        name: 'Whiskers',
        age: '2 years',
        gender: 'Female',
        breed: 'Domestic Shorthair',
        description: 'Playful and affectionate cat who loves to snuggle and play with toys.',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        status: 'Available'
      },
      {
        id: 'cat2',
        name: 'Oliver',
        age: '1 year',
        gender: 'Male',
        breed: 'Maine Coon',
        description: 'Very calm and gentle giant who loves attention and treats.',
        image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        status: 'Available'
      },
      {
        id: 'cat3',
        name: 'Luna',
        age: '3 years',
        gender: 'Female',
        breed: 'Siamese',
        description: 'Chatty and social cat who follows you everywhere you go.',
        image: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        status: 'Available'
      }
    ],
    'Dogs': [
      {
        id: 'dog1',
        name: 'Max',
        age: '4 years',
        gender: 'Male',
        breed: 'Golden Retriever',
        description: 'Friendly and energetic dog who loves outdoor activities and playing fetch.',
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        status: 'Available'
      },
      {
        id: 'dog2',
        name: 'Bella',
        age: '2 years',
        gender: 'Female',
        breed: 'Beagle',
        description: 'Curious and friendly dog who loves exploring and cuddling equally.',
        image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        status: 'Available'
      },
      {
        id: 'dog3',
        name: 'Charlie',
        age: '5 years',
        gender: 'Male',
        breed: 'Labrador Mix',
        description: 'Loving and well-trained dog who gets along with everyone, including other pets.',
        image: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        status: 'Available'
      }
    ],
    'Birds': [
      {
        id: 'bird1',
        name: 'Sky',
        age: '1 year',
        gender: 'Male',
        breed: 'Budgerigar',
        description: 'Colorful and cheerful bird who sings beautifully throughout the day.',
        image: 'https://images.unsplash.com/photo-1522858547137-f1dcec554f55?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        status: 'Available'
      },
      {
        id: 'bird2',
        name: 'Rio',
        age: '3 years',
        gender: 'Female',
        breed: 'Cockatiel',
        description: 'Friendly and social bird who enjoys human interaction and learning tricks.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Nymphicus_hollandicus_-pet_-grey_colour_mutation-8a.jpg/960px-Nymphicus_hollandicus_-pet_-grey_colour_mutation-8a.jpg',
        status: 'Available'
      }
    ],
    'Reptiles': [
      {
        id: 'rep1',
        name: 'Spike',
        age: '2 years',
        gender: 'Male',
        breed: 'Bearded Dragon',
        description: 'Gentle reptile with lots of personality who enjoys basking and being handled.',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Bartagame_%28fcm%29.jpg/960px-Bartagame_%28fcm%29.jpg',
        status: 'Available'
      },
      {
        id: 'rep2',
        name: 'Shell',
        age: '5 years',
        gender: 'Female',
        breed: 'Russian Tortoise',
        description: 'Calm tortoise who enjoys exploring and munching on fresh vegetables.',
        image: 'https://images.unsplash.com/photo-1559253664-ca249d4608c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        status: 'Available'
      }
    ],
    'Other': [
      {
        id: 'oth1',
        name: 'Peanut',
        age: '1 year',
        gender: 'Male',
        breed: 'Holland Lop Rabbit',
        description: 'Gentle and curious rabbit who loves to hop around and be petted.',
        image: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        status: 'Available'
      },
      {
        id: 'oth2',
        name: 'Nibbles',
        age: '6 months',
        gender: 'Female',
        breed: 'Syrian Hamster',
        description: 'Tiny ball of energy who loves running on her wheel and exploring tunnels.',
        image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        status: 'Available'
      }
    ]
  };
  
  // State for the currently selected pet (for detailed view)
  const [selectedPet, setSelectedPet] = useState(null);
  const [adoptionFormData, setAdoptionFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    maritalStatus: '',
    childrenInHome: '',
    petExperience: '',
    housingType: '',
    reason: ''
  });

  // Handle adoption form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAdoptionFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Submit adoption request
  const submitAdoptionRequest = (e) => {
    e.preventDefault();
    handleAdoptionRequest({
      form: adoptionFormData,
      pet: selectedPet
    });
    
    // Reset form
    setAdoptionFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      reason: ''
    });
    
    // Close the detailed view
    setSelectedPet(null);
  };
  
  // If a pet type is selected, show the specific pet listings
  if (selectedType) {
    // Get pets for this category
    const petsToDisplay = petsByCategory[selectedType] || [];
    
    return (
      <div className="pets-page-container">
        <div className="pets-listings-container">
          <div className="pets-listings-header">
            <button 
              className="pets-back-button"
              onClick={handleBackToPetTypes}
            >
              ← Back to Pet Types
            </button>
            <h2 className="pets-listings-title">Available {selectedType}</h2>
            <p className="pets-listings-subtitle">
              {selectedType === 'Cats' && 'Find your purr-fect feline companion'}
              {selectedType === 'Dogs' && 'Find your loyal canine friend'}
              {selectedType === 'Birds' && 'Find your feathered companion'}
              {selectedType === 'Reptiles' && 'Find your scaly friend'}
              {selectedType === 'Other' && 'Find your special pet companion'}
            </p>
          </div>
          
          {petsToDisplay.length === 0 ? (
            <div className="pets-no-results">
              <h3>No {selectedType} available at the moment</h3>
              <p>Please check back later or browse other pet categories.</p>
              <button 
                className="pets-primary-button"
                onClick={handleBackToPetTypes}
              >
                Explore Other Pets
              </button>
            </div>
          ) : (
            <div className="pets-grid">
              {petsToDisplay.map(pet => (
                <motion.div
                  key={pet.id}
                  className="pet-card"
                  whileHover={{ 
                    scale: 1.03,
                    y: -5,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="pet-card-image-container">
                    <img src={pet.image} alt={pet.name} className="pet-card-image" />
                    <div className="pet-card-status" data-status={pet.status.toLowerCase()}>
                      {pet.status}
                    </div>
                  </div>
                  
                  <div className="pet-card-content">
                    <h3 className="pet-card-name">{pet.name}</h3>
                    <div className="pet-card-details">
                      <span>{pet.breed}</span>
                      <span>•</span>
                      <span>{pet.age}</span>
                      <span>•</span>
                      <span>{pet.gender}</span>
                    </div>
                    <p className="pet-card-description">{pet.description}</p>
                    
                    <button 
                      className="pet-adopt-button"
                      onClick={() => setSelectedPet(pet)}
                    >
                      Meet {pet.name}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
        
        {/* Pet Details Modal */}
        {selectedPet && (
          <div className="pet-detail-overlay">
            <div className="pet-detail-modal">
              <button 
                className="pet-detail-close"
                onClick={() => setSelectedPet(null)}
              >
                ×
              </button>
              
              <div className="pet-detail-content">
                <div className="pet-detail-header">
                  <div className="pet-detail-images">
                    <img 
                      src={selectedPet.image} 
                      alt={selectedPet.name} 
                      className="pet-detail-main-image" 
                    />
                  </div>
                  
                  <div className="pet-detail-info">
                    <h2 className="pet-detail-name">{selectedPet.name}</h2>
                    <div className="pet-detail-status" data-status={selectedPet.status.toLowerCase()}>
                      {selectedPet.status}
                    </div>
                    
                    <div className="pet-detail-attributes">
                      <div className="pet-attribute">
                        <span className="pet-attribute-label">Breed</span>
                        <span className="pet-attribute-value">{selectedPet.breed}</span>
                      </div>
                      <div className="pet-attribute">
                        <span className="pet-attribute-label">Age</span>
                        <span className="pet-attribute-value">{selectedPet.age}</span>
                      </div>
                      <div className="pet-attribute">
                        <span className="pet-attribute-label">Gender</span>
                        <span className="pet-attribute-value">{selectedPet.gender}</span>
                      </div>
                    </div>
                    
                    <div className="pet-detail-about">
                      <h3>About {selectedPet.name}</h3>
                      <p>{selectedPet.description}</p>
                    </div>
                  </div>
                </div>
                
                <div className="pet-adoption-form-container">
                  <h3>Want to adopt {selectedPet.name}?</h3>
                  <p className="pet-form-subtitle">Fill out this form and we'll contact you shortly to arrange a meeting.</p>
                  
                  <form className="pet-adoption-form" onSubmit={submitAdoptionRequest}>
                    <div className="pet-form-row">
                      <div className="pet-form-group">
                        <label htmlFor="name">Full Name</label>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          value={adoptionFormData.name}
                          onChange={handleFormChange}
                          required 
                        />
                      </div>
                      
                      <div className="pet-form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          value={adoptionFormData.email}
                          onChange={handleFormChange}
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="pet-form-row">
                      <div className="pet-form-group">
                        <label htmlFor="phone">Phone</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          name="phone" 
                          value={adoptionFormData.phone}
                          onChange={handleFormChange}
                          required 
                        />
                      </div>
                      
                      <div className="pet-form-group">
                        <label htmlFor="address">Address</label>
                        <input 
                          type="text" 
                          id="address" 
                          name="address" 
                          value={adoptionFormData.address}
                          onChange={handleFormChange}
                          required 
                        />
                      </div>
                    </div>
                    
                    <div className="pet-form-row">
                      <div className="pet-form-group">
                        <label htmlFor="maritalStatus">Marital Status</label>
                        <select
                          id="maritalStatus"
                          name="maritalStatus"
                          value={adoptionFormData.maritalStatus || ''}
                          onChange={handleFormChange}
                          required
                        >
                          <option value="">Please select</option>
                          <option value="single">Single</option>
                          <option value="married">Married</option>
                          <option value="divorced">Divorced</option>
                          <option value="widowed">Widowed</option>
                          <option value="domestic_partnership">Domestic Partnership</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                      
                      <div className="pet-form-group">
                        <label htmlFor="childrenInHome">Children in the Home</label>
                        <select
                          id="childrenInHome"
                          name="childrenInHome"
                          value={adoptionFormData.childrenInHome || ''}
                          onChange={handleFormChange}
                          required
                        >
                          <option value="">Please select</option>
                          <option value="no">No children</option>
                          <option value="under5">Yes, under 5 years old</option>
                          <option value="5to12">Yes, 5-12 years old</option>
                          <option value="13to18">Yes, 13-18 years old</option>
                          <option value="mixed">Yes, mixed age groups</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="pet-form-row">
                      <div className="pet-form-group">
                        <label htmlFor="petExperience">Experience with Pets</label>
                        <select
                          id="petExperience"
                          name="petExperience"
                          value={adoptionFormData.petExperience || ''}
                          onChange={handleFormChange}
                          required
                        >
                          <option value="">Please select</option>
                          <option value="first_time">First-time pet owner</option>
                          <option value="previous">Had pets previously</option>
                          <option value="current">Currently have other pets</option>
                          <option value="experienced">Experienced with multiple pets</option>
                          <option value="professional">Professional experience (vet, trainer, etc.)</option>
                        </select>
                      </div>
                      
                      <div className="pet-form-group">
                        <label htmlFor="housingType">Housing Type</label>
                        <select
                          id="housingType"
                          name="housingType"
                          value={adoptionFormData.housingType || ''}
                          onChange={handleFormChange}
                          required
                        >
                          <option value="">Please select</option>
                          <option value="house">House with yard</option>
                          <option value="house_no_yard">House without yard</option>
                          <option value="apartment">Apartment</option>
                          <option value="condo">Condominium</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="pet-form-group full-width">
                      <label htmlFor="reason">Why do you want to adopt {selectedPet.name}?</label>
                      <textarea 
                        id="reason" 
                        name="reason" 
                        value={adoptionFormData.reason}
                        onChange={handleFormChange}
                        rows="4" 
                        required 
                      ></textarea>
                    </div>
                    
                    <div className="pet-form-actions">
                      <button 
                        type="button" 
                        className="pet-form-cancel"
                        onClick={() => setSelectedPet(null)}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="pet-form-submit">
                        Submit Adoption Request
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Success message after adoption request */}
        {showAdoptionSuccess && adoptedPet && (
          <div className="pets-adoption-success" id="adoption-success">
            <div className="pets-success-inner">
              <div className="pets-success-icon">✓</div>
              <h3 className="pets-success-title">Adoption Request Submitted!</h3>
              <p className="pets-success-text">Thank you for your interest in adopting {adoptedPet.name}!</p>
              <p className="pets-success-text">We've received your request and will review it shortly. Our team will contact you within 1-2 business days to discuss next steps.</p>
              <div className="pets-success-actions">
                <button 
                  className="pets-primary-button" 
                  onClick={() => setShowAdoptionSuccess(false)}
                >
                  Continue Browsing
                </button>
                <button 
                  className="pets-secondary-button"
                  onClick={handleBackToPetTypes}
                >
                  Back to Pet Types
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main Available Pets page with all sections
  return (
    <motion.div 
      className="pets-page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative paw prints in the background */}
      {pawsArray.map((paw) => (
        <motion.img
          key={paw.id}
          src={pawImage}
          alt=""
          className="pets-paw-print"
          style={{
            left: `${paw.x}%`,
            top: `${paw.y}%`,
            width: `${paw.size}px`,
            height: `${paw.size}px`,
            opacity: paw.opacity,
            transform: `rotate(${paw.rotation}deg)`,
            position: 'absolute',
            zIndex: 0,
          }}
        />
      ))}

      {/* SECTION 1: Header */}
      <section className="pets-header-section">
        <motion.div 
          className="pets-header-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h1 className="pets-page-title">Find Your Perfect Companion</h1>
          <p className="pets-page-subtitle">
            Browse our available pets and start your journey to giving a loving animal their forever home. 
            Each pet has been rescued, cared for, and is ready to become part of your family.
          </p>
        </motion.div>
      </section>

      {/* SECTION 2: Pet Types */}
      <section className="pets-types-section">
        <div className="pets-section-container">
          <motion.h2 
            className="pets-section-title"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Choose a Pet Type
          </motion.h2>
          <motion.p 
            className="pets-section-subtitle"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Explore our different categories of animals waiting for adoption
          </motion.p>
          
          <motion.div 
            className="pets-types-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {petTypes.map((petType, index) => (
              <motion.div 
                className="pets-type-card"
                key={petType.type}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
                  y: -5 
                }}
                transition={{ duration: 0.3 }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <div className="pets-type-image-container">
                  <img src={petType.image} alt={petType.type} className="pets-type-image" />
                  <div className="pets-type-icon">{petType.icon}</div>
                </div>
                <div className="pets-type-content">
                  <h3>{petType.type}</h3>
                  <p>{petType.description}</p>
                  <button 
                    className="pets-view-button"
                    onClick={() => handleSelectPetType(petType.type)}
                  >
                    View {petType.type}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Adoption Steps */}
      <section className="pets-adoption-steps">
        <div className="pets-section-container">
          <motion.h2 
            className="pets-section-title"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Adoption Process
          </motion.h2>
          <motion.p 
            className="pets-section-subtitle"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Four simple steps to welcome a new pet into your family
          </motion.p>

          <div className="pets-steps-container">
            {adoptionSteps.map((step, index) => (
              <motion.div 
                className="pets-step-card"
                key={step.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="pets-step-number">{step.step}</div>
                <div className="pets-step-icon">{step.icon}</div>
                <h3 className="pets-step-title">{step.title}</h3>
                <p className="pets-step-description">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Why Choose Us */}
      <section className="pets-why-choose-us">
        <div className="pets-section-container">
          <motion.h2 
            className="pets-section-title"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Why Choose Our Adoption Service?
          </motion.h2>
          <motion.p 
            className="pets-section-subtitle"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            The benefits of adopting through our platform
          </motion.p>

          <div className="pets-benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div 
                className="pets-benefit-card"
                key={benefit.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="pets-benefit-check">✓</div>
                <h3 className="pets-benefit-title">{benefit.title}</h3>
                <p className="pets-benefit-description">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us CTA Section */}
      <section className="pets-contact-section">
        <div className="pets-section-container">
          <motion.div 
            className="pets-contact-content"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2>Have Questions About Adoption?</h2>
            <p>Our team is ready to assist you with the adoption process or answer any questions you might have about our pets.</p>
            <button 
              className="pets-contact-button"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AvailablePets;
