// src/pages/ShelterDashboard.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './ShelterDashboard.css';

// Import icons from assets/images folder
import petIcon from '../media/LandingPage/pets.png';
import requestIcon from '../media/LandingPage/request.png';
import donationIcon from '../media/LandingPage/donation.png';
import chatIcon from '../media/LandingPage/chat.png';

const ShelterDashboard = () => {
  const navigate = useNavigate();
  // Mock shelter data (in a real app, this would come from an API or context)
  const [shelter, setShelter] = useState({
    id: 'sh-123456',
    name: 'Happy Paws Shelter',
    email: 'info@happypawsshelter.com',
    phone: '+20 123-456-7890',
    address: '123 Pet Lane',
    city: 'Cairo',
    state: 'Cairo',
    zipCode: '12345',
    description: 'We are a non-profit animal shelter dedicated to finding forever homes for abandoned pets.',
    bankAccount: '',
    logo: null,
    petTypes: {
      dogs: true,
      cats: true,
      birds: false,
      smallAnimals: true,
      reptiles: false,
      other: false
    },
    donationsReceived: 12500,
    contactPerson: 'Ahmed Hassan'
  });

  // Mock data for pets
  const [pets, setPets] = useState([
    {
      id: 'pet-001',
      name: 'Max',
      type: 'Dog',
      breed: 'Golden Retriever',
      gender: 'Male',
      age: '3 years',
      image: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8b84c5112602709.6017f09c33cf4.jpg',
      injuries: 'None',
      story: 'Max was found wandering near a park. He is very friendly and loves to play fetch.',
      emoji: '🐕',
      status: 'Available',
      dateAdded: '2025-03-15'
    },
    {
      id: 'pet-002',
      name: 'Luna',
      type: 'Cat',
      breed: 'Siamese',
      gender: 'Female',
      age: '2 years',
      image: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/309586112602709.6017f41be1dd3.jpg',
      injuries: 'Slight limp in right back leg',
      story: 'Luna was rescued from a busy street. She is shy at first but very affectionate once she trusts you.',
      emoji: '🐱',
      status: 'Available',
      dateAdded: '2025-04-10'
    }
  ]);

  // Mock adoption requests data
  const [adoptionRequests, setAdoptionRequests] = useState([
    {
      id: 'req-001',
      petId: 'pet-001',
      petName: 'Max',
      requestedBy: 'sara_ahmed',
      requesterName: 'Sara Ahmed',
      requestDate: '2025-05-10',
      status: 'Pending',
      message: 'I would love to adopt Max. I have a big yard where he can play.'
    },
    {
      id: 'req-002',
      petId: 'pet-002',
      petName: 'Luna',
      requestedBy: 'mohamed_ali',
      requesterName: 'Mohamed Ali',
      requestDate: '2025-05-12',
      status: 'Pending',
      message: 'I have been looking for a cat like Luna for months. Would love to give her a good home.'
    },
    {
      id: 'req-003',
      petId: 'pet-003',
      petName: 'Buddy',
      requestedBy: 'ahmed_hassan',
      requesterName: 'Ahmed Hassan',
      requestDate: '2025-05-01',
      status: 'Approved',
      message: 'I would be honored to provide Buddy with a loving home. I have experience with dogs and a large, fenced yard.',
      approvedDate: '2025-05-03'
    },
    {
      id: 'req-004',
      petId: 'pet-004',
      petName: 'Bella',
      requestedBy: 'leila_mohamed',
      requesterName: 'Leila Mohamed',
      requestDate: '2025-04-25',
      status: 'Approved',
      message: 'I have always wanted a cat like Bella. I live alone and would give her all my attention.',
      approvedDate: '2025-04-28'
    }
  ]);
  
  // Mock approved adoptions with delivery/pickup details
  const [approvedAdoptions, setApprovedAdoptions] = useState([
    {
      requestId: 'req-003',
      petId: 'pet-003',
      petName: 'Buddy',
      requestedBy: 'ahmed_hassan',
      requesterName: 'Ahmed Hassan',
      approvedDate: '2025-05-03',
      processStatus: 'pickup_pending',
      scheduledDate: '2025-05-15',
      userResponse: null,
      deliveryDetails: null,
      notes: 'Adopter will visit on May 15th to pick up Buddy'
    },
    {
      requestId: 'req-004',
      petId: 'pet-004',
      petName: 'Bella',
      requestedBy: 'leila_mohamed',
      requesterName: 'Leila Mohamed',
      approvedDate: '2025-04-28',
      processStatus: 'delivery_scheduled',
      scheduledDate: '2025-05-16',
      userResponse: 'delivery',
      deliveryDetails: {
        address: '123 Nile Street, Cairo',
        contactPhone: '+20 456-789-0123',
        preferredTime: '2pm - 5pm',
        specialInstructions: 'Please call before arrival'
      },
      notes: 'Delivery scheduled for May 16th afternoon'
    }
  ]);

  // Mock donation requests data
  const [donationRequests, setDonationRequests] = useState([
    {
      id: 'don-001',
      title: 'Emergency Medical Fund',
      description: 'Help us cover the costs of emergency medical care for our most vulnerable animals.',
      targetAmount: 5000,
      currentAmount: 2500,
      createdDate: '2025-04-01',
      expiryDate: '2025-06-01',
      isActive: true
    }
  ]);

  // State for managing the active tab
  const [activeTab, setActiveTab] = useState('shelter');

  // State for new pet form
  const [newPet, setNewPet] = useState({
    name: '',
    type: 'Dog',
    breed: '',
    gender: 'Male',
    age: '',
    image: null,
    injuries: '',
    story: '',
    emoji: '',
    status: 'Available'
  });

  // State for new donation form
  const [newDonation, setNewDonation] = useState({
    title: '',
    description: '',
    targetAmount: 0,
    expiryDate: '',
    isActive: true
  });

  // State for edit mode
  const [editShelterInfo, setEditShelterInfo] = useState(false);
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Handler for shelter info update
  const handleShelterUpdate = (e) => {
    e.preventDefault();
    setEditShelterInfo(false);
    // In a real app, you'd send an API request to update the shelter info
    alert('Shelter information updated successfully!');
  };

  // Handler for shelter info change
  const handleShelterChange = (e) => {
    const { name, value } = e.target;
    setShelter(prev => ({ ...prev, [name]: value }));
  };

  // Handler for new pet form submission
  const handleAddPet = (e) => {
    e.preventDefault();
    const petId = `pet-${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    
    setPets(prev => [
      ...prev,
      {
        ...newPet,
        id: petId,
        dateAdded: today
      }
    ]);
    
    // Reset form
    setNewPet({
      name: '',
      type: 'Dog',
      breed: '',
      gender: 'Male',
      age: '',
      image: null,
      injuries: '',
      story: '',
      emoji: '',
      status: 'Available'
    });

    alert('Pet added successfully!');
  };

  // Handler for pet input changes
  const handlePetChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file' && files[0]) {
      setNewPet(prev => ({ ...prev, [name]: URL.createObjectURL(files[0]) }));
    } else {
      setNewPet(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handler for pet status change
  const handlePetStatusChange = (petId, newStatus) => {
    setPets(prev => prev.map(pet => 
      pet.id === petId ? { ...pet, status: newStatus } : pet
    ));
  };

  // Handler for deleting a pet
  const handleDeletePet = (petId) => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      setPets(prev => prev.filter(pet => pet.id !== petId));
    }
  };

  // Handler for adoption request action
  const handleAdoptionRequestAction = (requestId, action) => {
    // Update the request status
    const updatedRequests = adoptionRequests.map(req => 
      req.id === requestId ? { ...req, status: action, approvedDate: action === 'Approved' ? new Date().toISOString().split('T')[0] : req.approvedDate } : req
    );
    setAdoptionRequests(updatedRequests);
    
    // If approved, add to approved adoptions
    if (action === 'Approved') {
      const approvedRequest = updatedRequests.find(req => req.id === requestId);
      setApprovedAdoptions(prev => [
        ...prev,
        {
          requestId: approvedRequest.id,
          petId: approvedRequest.petId,
          petName: approvedRequest.petName,
          requestedBy: approvedRequest.requestedBy,
          requesterName: approvedRequest.requesterName,
          approvedDate: new Date().toISOString().split('T')[0],
          processStatus: 'new',
          scheduledDate: null,
          userResponse: null,
          deliveryDetails: null,
          notes: ''
        }
      ]);
      
      // Also update pet status to Pending
      setPets(prev => prev.map(pet => 
        pet.id === approvedRequest.petId ? { ...pet, status: 'Pending' } : pet
      ));
    }
  };
  
  // State for the adoption process modal
  const [processModal, setProcessModal] = useState({
    isOpen: false,
    adoption: null,
    editMode: false,
    scheduledDate: '',
    notes: '',
    processStatus: ''
  });
  
  // Open the adoption process modal
  const openProcessModal = (adoption, editMode = false) => {
    setProcessModal({
      isOpen: true,
      adoption,
      editMode,
      scheduledDate: adoption.scheduledDate || '',
      notes: adoption.notes || '',
      processStatus: adoption.processStatus || 'new'
    });
  };
  
  // Close the adoption process modal
  const closeProcessModal = () => {
    setProcessModal({
      isOpen: false,
      adoption: null,
      editMode: false,
      scheduledDate: '',
      notes: '',
      processStatus: ''
    });
  };
  
  // Handle process modal form changes
  const handleProcessModalChange = (e) => {
    const { name, value } = e.target;
    setProcessModal(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Update adoption process details
  const updateAdoptionProcess = (e) => {
    e.preventDefault();
    
    const { adoption, scheduledDate, notes, processStatus } = processModal;
    
    setApprovedAdoptions(prev => prev.map(item => 
      item.requestId === adoption.requestId ? {
        ...item,
        scheduledDate,
        notes,
        processStatus
      } : item
    ));
    
    closeProcessModal();
  };
  
  // Mark adoption as completed
  const completeAdoption = (requestId) => {
    if (window.confirm('Are you sure you want to mark this adoption as completed? This will update the pet status to Adopted.')) {
      // Update approved adoption status
      setApprovedAdoptions(prev => prev.map(item => 
        item.requestId === requestId ? {
          ...item,
          processStatus: 'completed'
        } : item
      ));
      
      // Find the petId from the approved adoption
      const adoption = approvedAdoptions.find(a => a.requestId === requestId);
      
      // Update pet status to Adopted
      if (adoption) {
        setPets(prev => prev.map(pet => 
          pet.id === adoption.petId ? { ...pet, status: 'Adopted' } : pet
        ));
      }
    }
  };

  // Handler for donation form submission
  const handleAddDonation = (e) => {
    e.preventDefault();
    const donationId = `don-${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];
    
    setDonationRequests(prev => [
      ...prev,
      {
        ...newDonation,
        id: donationId,
        createdDate: today,
        currentAmount: 0
      }
    ]);
    
    // Reset form
    setNewDonation({
      title: '',
      description: '',
      targetAmount: 0,
      expiryDate: '',
      isActive: true
    });

    alert('Donation request added successfully!');
  };

  // Handler for donation input changes
  const handleDonationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewDonation(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : name === 'targetAmount' ? Number(value) : value 
    }));
  };

  return (
    <div className="shelter-dashboard">
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>{shelter.name} Dashboard</h1>
          <p>Manage your shelter, pets, adoption requests, and donations</p>
        </div>
        <div className="dashboard-quick-stats">
          <div className="quick-stat">
            <span className="stat-value">{pets.filter(p => p.status === 'Available').length}</span>
            <span className="stat-label">Pets Available</span>
          </div>
          <div className="quick-stat">
            <span className="stat-value">{adoptionRequests.filter(r => r.status === 'Pending').length}</span>
            <span className="stat-label">Pending Requests</span>
          </div>
          <div className="quick-stat">
            <span className="stat-value">EGP {shelter.donationsReceived.toLocaleString()}</span>
            <span className="stat-label">Donations</span>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'shelter' ? 'active' : ''}`}
          onClick={() => setActiveTab('shelter')}
        >
          <img src={petIcon} alt="" className="tab-icon" />
          Shelter Information
        </button>
        <button 
          className={`tab-button ${activeTab === 'pets' ? 'active' : ''}`}
          onClick={() => setActiveTab('pets')}
        >
          <img src={petIcon} alt="" className="tab-icon" />
          Manage Pets
        </button>
        <button 
          className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          <img src={requestIcon} alt="" className="tab-icon" />
          Adoption Requests
        </button>
        <button 
          className={`tab-button ${activeTab === 'donations' ? 'active' : ''}`}
          onClick={() => setActiveTab('donations')}
        >
          <img src={donationIcon} alt="" className="tab-icon" />
          Donations
        </button>
        <button 
          className={`tab-button ${activeTab === 'approved' ? 'active' : ''}`}
          onClick={() => setActiveTab('approved')}
        >
          <span className="tab-icon">🏆</span>
          Approved Adoptions
        </button>
        <button 
          className={`tab-button inbox-button`}
          onClick={() => navigate('/inbox')}
        >
          <img src={chatIcon} alt="" className="tab-icon" />
          Inbox
        </button>
      </div>

      <div className="dashboard-content">
        <AnimatePresence mode="wait">
          {/* Shelter Information Tab */}
          {activeTab === 'shelter' && (
            <motion.div 
              className="tab-content"
              key="shelter-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card shelter-info-card">
                <div className="card-header">
                  <h2>Shelter Information</h2>
                  <button 
                    className="btn-edit"
                    onClick={() => setEditShelterInfo(!editShelterInfo)}
                  >
                    {editShelterInfo ? 'Cancel' : 'Edit'}
                  </button>
                </div>
                {!editShelterInfo ? (
                  <div className="shelter-info">
                    <div className="shelter-info-main">
                      <div className="shelter-logo-container">
                        {shelter.logo ? (
                          <img src={shelter.logo} alt={`${shelter.name} logo`} className="shelter-logo" />
                        ) : (
                          <div className="shelter-logo-placeholder">
                            {shelter.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="shelter-details">
                        <h3>{shelter.name}</h3>
                        <p><strong>Contact Person:</strong> {shelter.contactPerson}</p>
                        <p><strong>Email:</strong> {shelter.email}</p>
                        <p><strong>Phone:</strong> {shelter.phone}</p>
                        <p><strong>Address:</strong> {shelter.address}, {shelter.city}, {shelter.state} {shelter.zipCode}</p>
                        <p><strong>Bank Account:</strong> {shelter.bankAccount || 'Not provided'}</p>
                        <div className="shelter-pet-types">
                          <strong>Pet Types:</strong> 
                          <div className="pet-type-tags">
                            {Object.entries(shelter.petTypes)
                              .filter(([_, value]) => value)
                              .map(([key]) => (
                                <span key={key} className="pet-type-tag">
                                  {key.charAt(0).toUpperCase() + key.slice(1)}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                      <div className="shelter-credentials-container">
                        <h4>Account Credentials</h4>
                        <p className="credentials-note">Keep this information private & secure</p>
                        <div className="credentials-box">
                          <div className="credential-item">
                            <span className="credential-label">Username:</span>
                            <span className="credential-value">{localStorage.getItem('username') || 'happypaws'}</span>
                          </div>
                          <div className="credential-item">
                            <span className="credential-label">Password:</span>
                            <span className="credential-value">
                              {showPassword ? (localStorage.getItem('username') === 'happypaws' ? 'shelter123' : 
                                              localStorage.getItem('username') === 'cairorescue' ? 'cairo456' : 
                                              'password123') : '••••••••'}
                            </span>
                            <button 
                              className="btn-show-password"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? 'Hide' : 'Show'}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="shelter-description">
                      <h4>About {shelter.name}</h4>
                      <p>{shelter.description}</p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleShelterUpdate} className="shelter-edit-form">
                    <div className="form-group">
                      <label htmlFor="name">Shelter Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={shelter.name}
                        onChange={handleShelterChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="contactPerson">Contact Person</label>
                      <input
                        type="text"
                        id="contactPerson"
                        name="contactPerson"
                        value={shelter.contactPerson}
                        onChange={handleShelterChange}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={shelter.email}
                          onChange={handleShelterChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={shelter.phone}
                          onChange={handleShelterChange}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="address">Street Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={shelter.address}
                        onChange={handleShelterChange}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={shelter.city}
                          onChange={handleShelterChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="state">Governorate</label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={shelter.state}
                          onChange={handleShelterChange}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="zipCode">Postal Code</label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={shelter.zipCode}
                          onChange={handleShelterChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="bankAccount">Bank Account</label>
                      <input
                        type="text"
                        id="bankAccount"
                        name="bankAccount"
                        value={shelter.bankAccount}
                        onChange={handleShelterChange}
                        placeholder="Enter your bank account number for donations"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Shelter Description</label>
                      <textarea
                        id="description"
                        name="description"
                        value={shelter.description}
                        onChange={handleShelterChange}
                        rows={4}
                      ></textarea>
                    </div>
                    <div className="form-navigation">
                      <button 
                        type="submit"
                        className="btn-primary"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          )}

          {/* Manage Pets Tab */}
          {activeTab === 'pets' && (
            <motion.div 
              className="tab-content"
              key="pets-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="pets-management">
                <div className="card add-pet-card">
                  <div className="card-header">
                    <h2>Add New Pet</h2>
                  </div>
                  <form onSubmit={handleAddPet} className="add-pet-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="name">Pet Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={newPet.name}
                          onChange={handlePetChange}
                          required
                          placeholder="Enter pet name"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="type">Pet Type</label>
                        <select
                          id="type"
                          name="type"
                          value={newPet.type}
                          onChange={handlePetChange}
                          required
                          className="select-input"
                        >
                          <option value="Dog">Dog</option>
                          <option value="Cat">Cat</option>
                          <option value="Bird">Bird</option>
                          <option value="Small Animal">Small Animal</option>
                          <option value="Reptile">Reptile</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="breed">Breed</label>
                        <input
                          type="text"
                          id="breed"
                          name="breed"
                          value={newPet.breed}
                          onChange={handlePetChange}
                          placeholder="Enter breed"
                        />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                          id="gender"
                          name="gender"
                          value={newPet.gender}
                          onChange={handlePetChange}
                          className="select-input"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input
                          type="text"
                          id="age"
                          name="age"
                          value={newPet.age}
                          onChange={handlePetChange}
                          required
                          placeholder="Enter age (e.g., 2 years)"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="emoji">Emoji (Optional)</label>
                        <input
                          type="text"
                          id="emoji"
                          name="emoji"
                          value={newPet.emoji}
                          onChange={handlePetChange}
                          placeholder="Add emoji (e.g., 🐕, 🐱)"
                          maxLength="2"
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="injuries">Injuries/Medical Conditions</label>
                      <input
                        type="text"
                        id="injuries"
                        name="injuries"
                        value={newPet.injuries}
                        onChange={handlePetChange}
                        placeholder="List any injuries or medical conditions"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="story">Pet's Story (Optional)</label>
                      <textarea
                        id="story"
                        name="story"
                        value={newPet.story}
                        onChange={handlePetChange}
                        placeholder="Share this pet's background story"
                        rows={3}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="image">Pet Photo (Optional)</label>
                      <input
                        type="file"
                        id="image"
                        name="image"
                        onChange={handlePetChange}
                        accept="image/*"
                      />
                    </div>
                    <div className="form-navigation">
                      <button 
                        type="submit"
                        className="btn-primary"
                      >
                        Add Pet
                      </button>
                    </div>
                  </form>
                </div>

                <div className="card pets-list-card">
                  <div className="card-header">
                    <h2>Your Pets</h2>
                  </div>
                  {pets.length === 0 ? (
                    <div className="empty-state">
                      <p>No pets added yet. Add your first pet to get started!</p>
                    </div>
                  ) : (
                    <div className="pets-list">
                      {pets.map(pet => (
                        <div key={pet.id} className="pet-card">
                          <div className="pet-card-header">
                            <div className="pet-card-status" data-status={pet.status.toLowerCase()}>
                              {pet.status}
                            </div>
                            <div className="pet-card-actions">
                              <button 
                                className="btn-icon"
                                onClick={() => handleDeletePet(pet.id)}
                                title="Delete Pet"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                          <div className="pet-card-content">
                            <div className="pet-image-container">
                              {pet.image ? (
                                <img src={pet.image} alt={pet.name} className="pet-image" />
                              ) : (
                                <div className="pet-image-placeholder">
                                  {pet.emoji || pet.type.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="pet-details">
                              <h3>{pet.name} {pet.emoji && <span className="pet-emoji">{pet.emoji}</span>}</h3>
                              <p className="pet-type-breed">{pet.type} • {pet.breed}</p>
                              <p><strong>Age:</strong> {pet.age}</p>
                              <p><strong>Gender:</strong> {pet.gender}</p>
                              {pet.injuries && <p><strong>Medical:</strong> {pet.injuries}</p>}
                              <p className="pet-added-date">Added on {new Date(pet.dateAdded).toLocaleDateString()}</p>
                              {pet.story && (
                                <div className="pet-story">
                                  <strong>Story:</strong>
                                  <p>{pet.story}</p>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="pet-card-footer">
                            <label htmlFor={`status-${pet.id}`}>Status:</label>
                            <select 
                              id={`status-${pet.id}`}
                              value={pet.status}
                              onChange={(e) => handlePetStatusChange(pet.id, e.target.value)}
                              className="select-input status-select"
                            >
                              <option value="Available">Available</option>
                              <option value="Adopted">Adopted</option>
                              <option value="Pending">Pending Adoption</option>
                              <option value="Medical">Under Medical Care</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Adoption Requests Tab */}
          {activeTab === 'requests' && (
            <motion.div 
              className="tab-content"
              key="requests-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card adoption-requests-card">
                <div className="card-header">
                  <h2>Adoption Requests</h2>
                </div>
                {adoptionRequests.length === 0 ? (
                  <div className="empty-state">
                    <p>No adoption requests yet.</p>
                  </div>
                ) : (
                  <div className="adoption-requests-list">
                    <table className="requests-table">
                      <thead>
                        <tr>
                          <th>Pet</th>
                          <th>Requested By</th>
                          <th>Request Date</th>
                          <th>Status</th>
                          <th>Message</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adoptionRequests.map(request => (
                          <tr key={request.id} className={`request-row status-${request.status.toLowerCase()}`}>
                            <td>{request.petName}</td>
                            <td>{request.requesterName}</td>
                            <td>{new Date(request.requestDate).toLocaleDateString()}</td>
                            <td>
                              <span className={`status-badge status-${request.status.toLowerCase()}`}>
                                {request.status}
                              </span>
                            </td>
                            <td className="request-message">
                              <div className="message-preview">{request.message}</div>
                            </td>
                            <td className="request-actions">
                              {request.status === 'Pending' && (
                                <>
                                  <button
                                    className="btn-approve"
                                    onClick={() => handleAdoptionRequestAction(request.id, 'Approved')}
                                  >
                                    Approve
                                  </button>
                                  <button
                                    className="btn-reject"
                                    onClick={() => handleAdoptionRequestAction(request.id, 'Rejected')}
                                  >
                                    Reject
                                  </button>
                                </>
                              )}
                              <button
                                className="btn-chat"
                                onClick={() => navigate('/inbox')}
                                title="Chat with the requester"
                              >
                                <img src={chatIcon} alt="Chat" className="action-icon" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Donations Tab */}
          {activeTab === 'donations' && (
            <motion.div 
              className="tab-content"
              key="donations-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="donations-management">
                <div className="card donations-summary-card">
                  <div className="card-header">
                    <h2>Donations Summary</h2>
                  </div>
                  <div className="donations-summary">
                    <div className="donation-stat">
                      <h3>Total Received</h3>
                      <div className="donation-amount">EGP {shelter.donationsReceived.toLocaleString()}</div>
                    </div>
                    <div className="donation-stat">
                      <h3>Active Campaigns</h3>
                      <div className="donation-amount">{donationRequests.filter(d => d.isActive).length}</div>
                    </div>
                    <div className="banking-info">
                      <h3>Banking Information</h3>
                      {shelter.bankAccount ? (
                        <div className="bank-account-info">
                          <p><strong>Bank Account:</strong> {shelter.bankAccount}</p>
                          <p className="bank-notice">Donations will be transferred to this account.</p>
                        </div>
                      ) : (
                        <div className="bank-account-info missing-bank">
                          <p>No bank account information provided.</p>
                          <p className="bank-notice">Please add your bank account in the Shelter Information tab.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="card add-donation-card">
                  <div className="card-header">
                    <h2>Create Donation Campaign</h2>
                  </div>
                  <form onSubmit={handleAddDonation} className="add-donation-form">
                    <div className="form-group">
                      <label htmlFor="title">Campaign Title</label>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={newDonation.title}
                        onChange={handleDonationChange}
                        required
                        placeholder="E.g., Emergency Medical Fund"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        value={newDonation.description}
                        onChange={handleDonationChange}
                        required
                        placeholder="Explain what the donations will be used for"
                        rows={3}
                      ></textarea>
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="targetAmount">Target Amount (EGP)</label>
                        <input
                          type="number"
                          id="targetAmount"
                          name="targetAmount"
                          value={newDonation.targetAmount}
                          onChange={handleDonationChange}
                          required
                          min="1"
                          placeholder="Enter amount"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="expiryDate">End Date</label>
                        <input
                          type="date"
                          id="expiryDate"
                          name="expiryDate"
                          value={newDonation.expiryDate}
                          onChange={handleDonationChange}
                          required
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                    </div>
                    <div className="form-group checkbox-group">
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          name="isActive"
                          checked={newDonation.isActive}
                          onChange={handleDonationChange}
                        />
                        <span className="checkbox-label">Make campaign active immediately</span>
                      </label>
                    </div>
                    <div className="form-navigation">
                      <button 
                        type="submit"
                        className="btn-primary"
                        disabled={!shelter.bankAccount}
                      >
                        Create Campaign
                      </button>
                      {!shelter.bankAccount && (
                        <p className="form-error">Please add bank account information before creating a donation campaign.</p>
                      )}
                    </div>
                  </form>
                </div>

                <div className="card donation-campaigns-card">
                  <div className="card-header">
                    <h2>Active Donation Campaigns</h2>
                  </div>
                  {donationRequests.length === 0 ? (
                    <div className="empty-state">
                      <p>No donation campaigns created yet.</p>
                    </div>
                  ) : (
                    <div className="donation-campaigns-list">
                      {donationRequests.map(campaign => (
                        <div key={campaign.id} className="donation-campaign-card">
                          <div className="campaign-header">
                            <h3>{campaign.title}</h3>
                            <span className={`campaign-status ${campaign.isActive ? 'active' : 'inactive'}`}>
                              {campaign.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          <div className="campaign-body">
                            <p className="campaign-description">{campaign.description}</p>
                            <div className="campaign-progress">
                              <div className="progress-bar">
                                <div 
                                  className="progress-fill"
                                  style={{ width: `${Math.min(100, (campaign.currentAmount / campaign.targetAmount) * 100)}%` }}
                                ></div>
                              </div>
                              <div className="progress-stats">
                                <span>EGP {campaign.currentAmount.toLocaleString()}</span>
                                <span>EGP {campaign.targetAmount.toLocaleString()}</span>
                              </div>
                            </div>
                            <div className="campaign-dates">
                              <div>Created: {new Date(campaign.createdDate).toLocaleDateString()}</div>
                              <div>Ends: {new Date(campaign.expiryDate).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Approved Adoptions Tab */}
          {activeTab === 'approved' && (
            <motion.div 
              className="tab-content"
              key="approved-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="card approved-adoptions-card">
                <div className="card-header">
                  <h2>Approved Adoptions</h2>
                  <p className="subheader-text">Manage the next steps for approved adoptions</p>
                </div>
                
                {approvedAdoptions.length === 0 ? (
                  <div className="empty-state">
                    <p>No approved adoptions yet. When you approve adoption requests, they will appear here.</p>
                  </div>
                ) : (
                  <div className="approved-adoptions-list">
                    {approvedAdoptions.map(adoption => (
                      <div key={adoption.requestId} className="adoption-process-card">
                        <div className={`process-status-badge ${adoption.processStatus}`}>
                          {adoption.processStatus === 'new' && 'New Approval'}
                          {adoption.processStatus === 'awaiting_response' && 'Awaiting User Response'}
                          {adoption.processStatus === 'pickup_pending' && 'Pickup Scheduled'}
                          {adoption.processStatus === 'pickup_completed' && 'Pickup Completed'}
                          {adoption.processStatus === 'delivery_scheduled' && 'Delivery Scheduled'}
                          {adoption.processStatus === 'delivery_completed' && 'Delivery Completed'}
                          {adoption.processStatus === 'completed' && 'Adoption Completed'}
                        </div>
                        
                        <div className="adoption-process-header">
                          <h3>Pet: {adoption.petName}</h3>
                          <p className="adopter-info">Adopter: {adoption.requesterName} ({adoption.requestedBy})</p>
                          <p className="adoption-date">Approved on: {new Date(adoption.approvedDate).toLocaleDateString()}</p>
                        </div>
                        
                        <div className="adoption-process-details">
                          <div className="process-section">
                            <h4>Process Status</h4>
                            <div className="process-timeline">
                              <div className={`timeline-step ${['new', 'awaiting_response', 'pickup_pending', 'pickup_completed', 'delivery_scheduled', 'delivery_completed', 'completed'].includes(adoption.processStatus) ? 'completed' : ''}`}>
                                <div className="step-icon">1</div>
                                <div className="step-label">Approved</div>
                              </div>
                              <div className="timeline-connector"></div>
                              <div className={`timeline-step ${['pickup_pending', 'pickup_completed', 'delivery_scheduled', 'delivery_completed', 'completed'].includes(adoption.processStatus) ? 'completed' : ''}`}>
                                <div className="step-icon">2</div>
                                <div className="step-label">Scheduled</div>
                              </div>
                              <div className="timeline-connector"></div>
                              <div className={`timeline-step ${['pickup_completed', 'delivery_completed', 'completed'].includes(adoption.processStatus) ? 'completed' : ''}`}>
                                <div className="step-icon">3</div>
                                <div className="step-label">Completed</div>
                              </div>
                            </div>
                          </div>
                          
                          {adoption.scheduledDate && (
                            <div className="process-section">
                              <h4>{adoption.userResponse === 'delivery' ? 'Delivery' : 'Pickup'} Details</h4>
                              <p>
                                <strong>Scheduled Date:</strong> {new Date(adoption.scheduledDate).toLocaleDateString()}
                              </p>
                              {adoption.userResponse === 'delivery' && adoption.deliveryDetails && (
                                <>
                                  <p><strong>Delivery Address:</strong> {adoption.deliveryDetails.address}</p>
                                  <p><strong>Contact Phone:</strong> {adoption.deliveryDetails.contactPhone}</p>
                                  <p><strong>Preferred Time:</strong> {adoption.deliveryDetails.preferredTime}</p>
                                  {adoption.deliveryDetails.specialInstructions && (
                                    <p><strong>Special Instructions:</strong> {adoption.deliveryDetails.specialInstructions}</p>
                                  )}
                                </>
                              )}
                              {adoption.notes && (
                                <p><strong>Notes:</strong> {adoption.notes}</p>
                              )}
                            </div>
                          )}
                          
                          {adoption.userResponse === null && (
                            <div className="process-section">
                              <p className="user-response-pending">
                                User has not yet chosen between pickup or delivery.
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="adoption-process-actions">
                          {adoption.processStatus === 'new' && (
                            <button 
                              className="btn-primary"
                              onClick={() => openProcessModal(adoption, true)}
                            >
                              Set Up Process
                            </button>
                          )}
                          
                          {(adoption.processStatus === 'pickup_pending' || adoption.processStatus === 'delivery_scheduled') && (
                            <>
                              <button 
                                className="btn-secondary"
                                onClick={() => openProcessModal(adoption, true)}
                              >
                                Update Details
                              </button>
                              <button 
                                className="btn-primary"
                                onClick={() => completeAdoption(adoption.requestId)}
                              >
                                Mark as Completed
                              </button>
                            </>
                          )}
                          
                          {(adoption.processStatus === 'pickup_completed' || adoption.processStatus === 'delivery_completed') && (
                            <button 
                              className="btn-primary"
                              onClick={() => completeAdoption(adoption.requestId)}
                            >
                              Finalize Adoption
                            </button>
                          )}
                          
                          {adoption.processStatus !== 'new' && adoption.processStatus !== 'completed' && (
                            <button 
                              className="btn-view"
                              onClick={() => openProcessModal(adoption, false)}
                            >
                              View Details
                            </button>
                          )}
                          
                          {adoption.processStatus === 'completed' && (
                            <div className="adoption-completed-message">
                              This adoption has been completed successfully!
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Adoption Process Modal */}
      {processModal.isOpen && (
        <div className="modal-overlay">
          <div className="process-modal">
            <div className="modal-header">
              <h3>
                {processModal.editMode ? 'Manage Adoption Process' : 'Adoption Process Details'}
              </h3>
              <button className="btn-close" onClick={closeProcessModal}>×</button>
            </div>
            
            <div className="modal-body">
              {processModal.adoption && (
                <div className="process-details-summary">
                  <p><strong>Pet:</strong> {processModal.adoption.petName}</p>
                  <p><strong>Adopter:</strong> {processModal.adoption.requesterName}</p>
                  <p><strong>Approved Date:</strong> {new Date(processModal.adoption.approvedDate).toLocaleDateString()}</p>
                  
                  {processModal.editMode ? (
                    <form onSubmit={updateAdoptionProcess} className="process-edit-form">
                      <div className="form-group">
                        <label htmlFor="processStatus">Process Status</label>
                        <select
                          id="processStatus"
                          name="processStatus"
                          value={processModal.processStatus}
                          onChange={handleProcessModalChange}
                          className="select-input"
                          required
                        >
                          <option value="new">New Approval</option>
                          <option value="awaiting_response">Awaiting User Response</option>
                          <option value="pickup_pending">Pickup Scheduled</option>
                          <option value="pickup_completed">Pickup Completed</option>
                          <option value="delivery_scheduled">Delivery Scheduled</option>
                          <option value="delivery_completed">Delivery Completed</option>
                        </select>
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="scheduledDate">
                          {processModal.processStatus.includes('pickup') ? 'Pickup' : 'Delivery'} Date
                        </label>
                        <input
                          type="date"
                          id="scheduledDate"
                          name="scheduledDate"
                          value={processModal.scheduledDate}
                          onChange={handleProcessModalChange}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      
                      <div className="form-group">
                        <label htmlFor="notes">Notes</label>
                        <textarea
                          id="notes"
                          name="notes"
                          value={processModal.notes}
                          onChange={handleProcessModalChange}
                          rows={3}
                          placeholder="Add any notes or special instructions"
                        ></textarea>
                      </div>
                      
                      <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={closeProcessModal}>
                          Cancel
                        </button>
                        <button type="submit" className="btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="process-view-details">
                      <div className="detail-row">
                        <span className="detail-label">Current Status:</span>
                        <span className={`detail-value status ${processModal.adoption.processStatus}`}>
                          {processModal.adoption.processStatus === 'new' && 'New Approval'}
                          {processModal.adoption.processStatus === 'awaiting_response' && 'Awaiting User Response'}
                          {processModal.adoption.processStatus === 'pickup_pending' && 'Pickup Scheduled'}
                          {processModal.adoption.processStatus === 'pickup_completed' && 'Pickup Completed'}
                          {processModal.adoption.processStatus === 'delivery_scheduled' && 'Delivery Scheduled'}
                          {processModal.adoption.processStatus === 'delivery_completed' && 'Delivery Completed'}
                          {processModal.adoption.processStatus === 'completed' && 'Adoption Completed'}
                        </span>
                      </div>
                      
                      {processModal.adoption.scheduledDate && (
                        <div className="detail-row">
                          <span className="detail-label">Scheduled Date:</span>
                          <span className="detail-value">
                            {new Date(processModal.adoption.scheduledDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      
                      {processModal.adoption.userResponse && (
                        <div className="detail-row">
                          <span className="detail-label">User Preferred Method:</span>
                          <span className="detail-value method">
                            {processModal.adoption.userResponse === 'delivery' ? 'Delivery to Home' : 'Pickup from Shelter'}
                          </span>
                        </div>
                      )}
                      
                      {processModal.adoption.userResponse === 'delivery' && processModal.adoption.deliveryDetails && (
                        <div className="delivery-details-view">
                          <h4>Delivery Details</h4>
                          <div className="detail-row">
                            <span className="detail-label">Address:</span>
                            <span className="detail-value">{processModal.adoption.deliveryDetails.address}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Phone:</span>
                            <span className="detail-value">{processModal.adoption.deliveryDetails.contactPhone}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Preferred Time:</span>
                            <span className="detail-value">{processModal.adoption.deliveryDetails.preferredTime}</span>
                          </div>
                          {processModal.adoption.deliveryDetails.specialInstructions && (
                            <div className="detail-row">
                              <span className="detail-label">Special Instructions:</span>
                              <span className="detail-value">{processModal.adoption.deliveryDetails.specialInstructions}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {processModal.adoption.notes && (
                        <div className="detail-row">
                          <span className="detail-label">Notes:</span>
                          <span className="detail-value notes">{processModal.adoption.notes}</span>
                        </div>
                      )}
                      
                      <div className="form-actions view-actions">
                        <button className="btn-secondary" onClick={closeProcessModal}>
                          Close
                        </button>
                        <button 
                          className="btn-primary"
                          onClick={() => {
                            closeProcessModal();
                            openProcessModal(processModal.adoption, true);
                          }}
                        >
                          Edit Details
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShelterDashboard;
