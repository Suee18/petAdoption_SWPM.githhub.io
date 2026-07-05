// src/pages/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Pages.css';
import './ProfilePage.css';

const Profile = () => {
  const navigate = useNavigate();
  // Tabs management
  const [activeTab, setActiveTab] = useState('profile');

  // User profile state
  const [userProfile, setUserProfile] = useState({
    name: localStorage.getItem('userName') || 'John Doe',
    email: 'johndoe@example.com',
    phone: '+20 123 456 7890',
    address: '123 Cairo Street',
    city: 'Cairo',
    profileImage: null,
    bio: 'Animal lover looking to adopt a furry friend!'
  });

  // User profile edit mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({...userProfile});

  // Mock adoption requests data
  const [adoptionRequests, setAdoptionRequests] = useState([
    {
      id: 'req-001',
      petId: 'pet-001',
      petName: 'Max',
      petType: 'Dog',
      petImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/8b84c5112602709.6017f09c33cf4.jpg',
      shelterId: 'sh-001',
      shelterName: 'Happy Paws Shelter',
      status: 'pending',
      date: '2025-05-10',
      notes: 'I would love to adopt this wonderful dog!'
    },
    {
      id: 'req-002',
      petId: 'pet-003',
      petName: 'Luna',
      petType: 'Cat',
      petImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/309586112602709.6017f41be1dd3.jpg',
      shelterId: 'sh-002',
      shelterName: 'Cairo Pet Rescue',
      status: 'approved',
      date: '2025-05-05',
      notes: 'I have experience with cats and would provide a good home.'
    },
    {
      id: 'req-003',
      petId: 'pet-007',
      petName: 'Buddy',
      petType: 'Dog',
      petImage: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/1ced16112602709.6017f09c32912.jpg',
      shelterId: 'sh-001',
      shelterName: 'Happy Paws Shelter',
      status: 'rejected',
      date: '2025-04-28',
      notes: 'Looking for a friendly companion for my children.'
    }
  ]);

  // Donation form state
  const [donationForm, setDonationForm] = useState({
    amount: '',
    shelterName: '',
    paymentMethod: 'credit-card',
    cardNumber: '',
    nameOnCard: '',
    expiryDate: '',
    cvv: '',
    note: ''
  });

  // List of shelters for donation dropdown
  const [shelters, setShelters] = useState([
    { id: 'sh-001', name: 'Happy Paws Shelter' },
    { id: 'sh-002', name: 'Cairo Pet Rescue' },
    { id: 'sh-003', name: 'Furry Friends Sanctuary' },
    { id: 'sh-004', name: 'Whiskers Haven' }
  ]);

  const [donationSubmitted, setDonationSubmitted] = useState(false);
  const [messageModal, setMessageModal] = useState({
    isOpen: false,
    shelterId: null,
    shelterName: '',
    petId: null,
    petName: '',
    message: ''
  });

  // Next steps modal state
  const [nextStepsModal, setNextStepsModal] = useState({
    isOpen: false,
    request: null,
    option: null, // 'pickup' or 'delivery'
    deliveryForm: {
      preferredDate: '',
      preferredTime: '',
      address: '',
      phoneNumber: '',
      specialInstructions: ''
    }
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Handle profile edit
  const handleEditProfile = () => {
    setIsEditing(true);
    setEditedProfile({...userProfile});
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveProfile = () => {
    setUserProfile({...editedProfile});
    setIsEditing(false);
    // In a real app, you would save this to a database
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedProfile(prev => ({
          ...prev,
          profileImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle donation form
  const handleDonationChange = (e) => {
    const { name, value } = e.target;
    setDonationForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    console.log('Donation submitted:', donationForm);
    // In a real app, you would process the donation here
    setDonationSubmitted(true);
    setTimeout(() => {
      setDonationSubmitted(false);
      setDonationForm({
        amount: '',
        shelterName: '',
        paymentMethod: 'credit-card',
        cardNumber: '',
        nameOnCard: '',
        expiryDate: '',
        cvv: '',
        note: ''
      });
    }, 3000);
  };

  // Message modal functions
  const openMessageModal = (shelterId, shelterName, petId, petName) => {
    setMessageModal({
      isOpen: true,
      shelterId,
      shelterName,
      petId,
      petName,
      message: ''
    });
  };

  const closeMessageModal = () => {
    setMessageModal({
      isOpen: false,
      shelterId: null,
      shelterName: '',
      petId: null,
      petName: '',
      message: ''
    });
  };

  const handleMessageChange = (e) => {
    setMessageModal(prev => ({
      ...prev,
      message: e.target.value
    }));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    console.log('Message sent:', messageModal);
    // In a real app, you would save this message to a database
    closeMessageModal();
    // Show success notification
    alert(`Message sent to ${messageModal.shelterName} about ${messageModal.petName}`);
  };

  // Next steps modal functions
  const openNextStepsModal = (request) => {
    setNextStepsModal({
      ...nextStepsModal,
      isOpen: true,
      request,
      option: null
    });
  };

  const closeNextStepsModal = () => {
    setNextStepsModal({
      isOpen: false,
      request: null,
      option: null,
      deliveryForm: {
        preferredDate: '',
        preferredTime: '',
        address: '',
        phoneNumber: '',
        specialInstructions: ''
      }
    });
  };

  const selectNextStepOption = (option) => {
    setNextStepsModal({
      ...nextStepsModal,
      option
    });
  };

  const handleDeliveryFormChange = (e) => {
    const { name, value } = e.target;
    setNextStepsModal(prev => ({
      ...prev,
      deliveryForm: {
        ...prev.deliveryForm,
        [name]: value
      }
    }));
  };

  const submitDeliveryRequest = (e) => {
    e.preventDefault();
    console.log('Delivery request submitted:', {
      requestId: nextStepsModal.request?.id,
      petName: nextStepsModal.request?.petName,
      ...nextStepsModal.deliveryForm
    });
    // In a real app, you would save this to a database
    
    // Show success notification and close modal
    alert(`Delivery request for ${nextStepsModal.request?.petName} has been submitted!`);
    closeNextStepsModal();
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="container">
          <div className="profile-header-content">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              My Dashboard
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Welcome back, {userProfile.name}!
            </motion.p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="profile-tabs">
          <button 
            className={`profile-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="tab-icon">👤</span> My Profile
          </button>
          <button 
            className={`profile-tab ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            <span className="tab-icon">📋</span> My Requests
            <span className="request-count">{adoptionRequests.length}</span>
          </button>
          <button 
            className={`profile-tab ${activeTab === 'donate' ? 'active' : ''}`}
            onClick={() => setActiveTab('donate')}
          >
            <span className="tab-icon">💰</span> Donate
          </button>
        </div>

        <div className="profile-content">
          {/* My Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div 
              className="profile-section"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="profile-card" variants={itemVariants}>
                <div className="profile-card-header">
                  <h2>Personal Information</h2>
                  {!isEditing ? (
                    <button className="edit-button" onClick={handleEditProfile}>Edit</button>
                  ) : (
                    <div className="edit-actions">
                      <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                      <button className="save-button" onClick={handleSaveProfile}>Save</button>
                    </div>
                  )}
                </div>
                
                <div className="profile-card-content">
                  <div className="profile-image-section">
                    <div className="profile-image-container">
                      {(isEditing ? editedProfile.profileImage : userProfile.profileImage) ? (
                        <img 
                          src={isEditing ? editedProfile.profileImage : userProfile.profileImage} 
                          alt="Profile" 
                          className="profile-image"
                        />
                      ) : (
                        <div className="profile-image-placeholder">
                          {userProfile.name.charAt(0)}
                        </div>
                      )}
                      
                      {isEditing && (
                        <div className="profile-image-overlay">
                          <label htmlFor="profile-image-upload" className="image-upload-label">
                            Change Photo
                          </label>
                          <input 
                            type="file" 
                            id="profile-image-upload" 
                            accept="image/*"
                            onChange={handleProfileImageChange}
                            style={{ display: 'none' }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="profile-details">
                    {isEditing ? (
                      <div className="profile-form">
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input 
                              type="text" 
                              id="name" 
                              name="name"
                              value={editedProfile.name}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                              type="email" 
                              id="email" 
                              name="email"
                              value={editedProfile.email}
                              onChange={handleProfileChange}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input 
                              type="tel" 
                              id="phone" 
                              name="phone"
                              value={editedProfile.phone}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input 
                              type="text" 
                              id="city" 
                              name="city"
                              value={editedProfile.city}
                              onChange={handleProfileChange}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <label htmlFor="address">Address</label>
                          <input 
                            type="text" 
                            id="address" 
                            name="address"
                            value={editedProfile.address}
                            onChange={handleProfileChange}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="bio">Bio</label>
                          <textarea 
                            id="bio" 
                            name="bio"
                            value={editedProfile.bio}
                            onChange={handleProfileChange}
                            rows="3"
                          ></textarea>
                        </div>
                      </div>
                    ) : (
                      <div className="profile-info">
                        <div className="profile-info-row">
                          <div className="profile-info-item">
                            <span className="profile-info-label">Name:</span>
                            <span className="profile-info-value">{userProfile.name}</span>
                          </div>
                          <div className="profile-info-item">
                            <span className="profile-info-label">Email:</span>
                            <span className="profile-info-value">{userProfile.email}</span>
                          </div>
                        </div>
                        <div className="profile-info-row">
                          <div className="profile-info-item">
                            <span className="profile-info-label">Phone:</span>
                            <span className="profile-info-value">{userProfile.phone}</span>
                          </div>
                          <div className="profile-info-item">
                            <span className="profile-info-label">City:</span>
                            <span className="profile-info-value">{userProfile.city}</span>
                          </div>
                        </div>
                        <div className="profile-info-row">
                          <div className="profile-info-item full-width">
                            <span className="profile-info-label">Address:</span>
                            <span className="profile-info-value">{userProfile.address}</span>
                          </div>
                        </div>
                        <div className="profile-info-row">
                          <div className="profile-info-item full-width">
                            <span className="profile-info-label">Bio:</span>
                            <span className="profile-info-value bio">{userProfile.bio}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* My Requests Tab */}
          {activeTab === 'requests' && (
            <motion.div 
              className="requests-section"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="requests-header" variants={itemVariants}>
                <h2>My Adoption Requests</h2>
              </motion.div>
              
              {adoptionRequests.length > 0 ? (
                <div className="requests-list">
                  {adoptionRequests.map(request => (
                    <motion.div 
                      key={request.id} 
                      className="request-card"
                      variants={itemVariants}
                    >
                      <div className="request-pet-image">
                        <img src={request.petImage} alt={request.petName} />
                      </div>
                      <div className="request-details">
                        <div className="request-main-info">
                          <div>
                            <h3>{request.petName}</h3>
                            <p className="request-type">{request.petType}</p>
                            <p className="request-shelter">From: {request.shelterName}</p>
                            <p className="request-date">Request Date: {request.date}</p>
                          </div>
                          <div className={`request-status ${request.status}`}>
                            {request.status === 'pending' && '⏳ Pending'}
                            {request.status === 'approved' && '✅ Approved'}
                            {request.status === 'rejected' && '❌ Rejected'}
                          </div>
                        </div>
                        <div className="request-notes">
                          <p><strong>Your Note:</strong> {request.notes}</p>
                        </div>
                        <div className="request-actions">
                          <button 
                            className="message-button"
                            onClick={() => openMessageModal(
                              request.shelterId,
                              request.shelterName,
                              request.petId,
                              request.petName
                            )}
                          >
                            Message Shelter
                          </button>
                          {request.status === 'approved' && (
                            <button 
                              className="view-next-steps-button"
                              onClick={() => openNextStepsModal(request)}
                            >
                              View Next Steps
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div className="empty-state" variants={itemVariants}>
                  <div className="empty-icon">📋</div>
                  <h3>No Adoption Requests Yet</h3>
                  <p>You haven't made any adoption requests yet. Browse our available pets to find your perfect companion!</p>
                  <button className="browse-pets-button" onClick={() => navigate('/available-pets')}>Browse Pets</button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Donate Tab */}
          {activeTab === 'donate' && (
            <motion.div 
              className="donate-section"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="donate-header" variants={itemVariants}>
                <h2>Support Animal Shelters</h2>
                <p>Your donations help provide care for animals in need</p>
              </motion.div>
              
              {donationSubmitted ? (
                <motion.div 
                  className="donation-success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="success-icon">✅</div>
                  <h3>Thank You for Your Donation!</h3>
                  <p>Your generosity helps animals find their forever homes.</p>
                </motion.div>
              ) : (
                <motion.form 
                  className="donation-form"
                  onSubmit={handleDonationSubmit}
                  variants={itemVariants}
                >
                  <div className="form-section">
                    <div className="form-group">
                      <label htmlFor="shelterName">Select a Shelter</label>
                      <select 
                        id="shelterName" 
                        name="shelterName"
                        value={donationForm.shelterName}
                        onChange={handleDonationChange}
                        required
                      >
                        <option value="">Choose a shelter</option>
                        {shelters.map(shelter => (
                          <option key={shelter.id} value={shelter.name}>
                            {shelter.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="amount">Donation Amount (EGP)</label>
                      <input 
                        type="number" 
                        id="amount" 
                        name="amount"
                        min="1"
                        value={donationForm.amount}
                        onChange={handleDonationChange}
                        placeholder="Enter amount in EGP"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <div className="form-group">
                      <label>Payment Method</label>
                      <div className="payment-options">
                        <label className="payment-option">
                          <input 
                            type="radio"
                            name="paymentMethod" 
                            value="credit-card"
                            checked={donationForm.paymentMethod === 'credit-card'}
                            onChange={handleDonationChange}
                          />
                          <span className="payment-icon">💳</span>
                          <span>Credit Card</span>
                        </label>
                        <label className="payment-option">
                          <input 
                            type="radio"
                            name="paymentMethod" 
                            value="bank-transfer"
                            checked={donationForm.paymentMethod === 'bank-transfer'}
                            onChange={handleDonationChange}
                          />
                          <span className="payment-icon">🏦</span>
                          <span>Bank Transfer</span>
                        </label>
                      </div>
                    </div>
                    
                    {donationForm.paymentMethod === 'credit-card' && (
                      <div className="card-details">
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="cardNumber">Card Number</label>
                            <input 
                              type="text" 
                              id="cardNumber" 
                              name="cardNumber"
                              value={donationForm.cardNumber}
                              onChange={handleDonationChange}
                              placeholder="XXXX XXXX XXXX XXXX"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="nameOnCard">Name on Card</label>
                            <input 
                              type="text" 
                              id="nameOnCard" 
                              name="nameOnCard"
                              value={donationForm.nameOnCard}
                              onChange={handleDonationChange}
                              placeholder="Cardholder name"
                              required
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="form-group">
                            <label htmlFor="expiryDate">Expiry Date</label>
                            <input 
                              type="text" 
                              id="expiryDate" 
                              name="expiryDate"
                              value={donationForm.expiryDate}
                              onChange={handleDonationChange}
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="cvv">CVV</label>
                            <input 
                              type="text" 
                              id="cvv" 
                              name="cvv"
                              value={donationForm.cvv}
                              onChange={handleDonationChange}
                              placeholder="XXX"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {donationForm.paymentMethod === 'bank-transfer' && (
                      <div className="bank-details">
                        <div className="bank-info">
                          <h4>Bank Transfer Information</h4>
                          <p><strong>Bank:</strong> Cairo National Bank</p>
                          <p><strong>Account Name:</strong> Pet Adoption Platform</p>
                          <p><strong>Account Number:</strong> 1234567890123</p>
                          <p><strong>IBAN:</strong> EG123456789012345678901234</p>
                          <p><em>Please include your name and selected shelter in the transfer description</em></p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="note">Message (Optional)</label>
                    <textarea 
                      id="note" 
                      name="note"
                      value={donationForm.note}
                      onChange={handleDonationChange}
                      placeholder="Add a personal note with your donation"
                      rows="3"
                    ></textarea>
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      type="submit" 
                      className="donate-button"
                      disabled={donationForm.paymentMethod === 'credit-card' && 
                                (!donationForm.cardNumber || 
                                 !donationForm.nameOnCard || 
                                 !donationForm.expiryDate || 
                                 !donationForm.cvv)}
                    >
                      Complete Donation
                    </button>
                  </div>
                </motion.form>
              )}
            </motion.div>
          )}
        </div>
      </div>
      
      {/* Message Modal */}
      {messageModal.isOpen && (
        <div className="modal-backdrop">
          <div className="message-modal">
            <div className="modal-header">
              <h3>Message to {messageModal.shelterName}</h3>
              <button className="close-modal" onClick={closeMessageModal}>×</button>
            </div>
            <div className="modal-body">
              <p className="modal-subject">
                Regarding adoption request for: <strong>{messageModal.petName}</strong>
              </p>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea 
                  id="message"
                  value={messageModal.message}
                  onChange={handleMessageChange}
                  rows="5"
                  placeholder="Enter your message to the shelter..."
                  required
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-button" onClick={closeMessageModal}>Cancel</button>
              <button 
                className="send-button" 
                onClick={sendMessage}
                disabled={!messageModal.message.trim()}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Next Steps Modal */}
      {nextStepsModal.isOpen && (
        <div className="modal-backdrop">
          <div className="next-steps-modal">
            <div className="modal-header">
              <h3>
                {nextStepsModal.option === null ? (
                  `Next Steps for Adopting ${nextStepsModal.request?.petName}`
                ) : nextStepsModal.option === 'pickup' ? (
                  `Pickup Details for ${nextStepsModal.request?.petName}`
                ) : (
                  `Request Delivery for ${nextStepsModal.request?.petName}`
                )}
              </h3>
              <button className="close-modal" onClick={closeNextStepsModal}>×</button>
            </div>
            
            <div className="modal-body">
              {/* Option selection view */}
              {nextStepsModal.option === null && (
                <div className="next-steps-options">
                  <p className="next-steps-intro">
                    Congratulations! Your adoption request for <strong>{nextStepsModal.request?.petName}</strong> has been approved.
                    Please choose how you would like to welcome your new pet home:
                  </p>
                  
                  <div className="options-container">
                    <motion.div 
                      className="option-card"
                      onClick={() => selectNextStepOption('pickup')}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="option-icon">🏠</div>
                      <h4>Visit the Shelter</h4>
                      <p>Come to {nextStepsModal.request?.shelterName} to meet and pick up your new pet in person.</p>
                      <button className="option-button">Select</button>
                    </motion.div>
                    
                    <motion.div 
                      className="option-card"
                      onClick={() => selectNextStepOption('delivery')}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <div className="option-icon">🚚</div>
                      <h4>Request Delivery</h4>
                      <p>We can arrange to bring your new pet directly to your home.</p>
                      <button className="option-button">Select</button>
                    </motion.div>
                  </div>
                </div>
              )}
              
              {/* Pickup information */}
              {nextStepsModal.option === 'pickup' && (
                <div className="pickup-info">
                  <div className="shelter-details">
                    <h4>Visit {nextStepsModal.request?.shelterName}</h4>
                    
                    <div className="shelter-address">
                      <div className="shelter-map">
                        <div className="map-placeholder">
                          <span className="map-icon">📍</span>
                        </div>
                      </div>
                      
                      <div className="address-details">
                        <p><strong>Address:</strong></p>
                        <p>123 Animal Care Street</p>
                        <p>Cairo, Egypt 12345</p>
                        <p className="shelter-hours"><strong>Hours:</strong> Mon-Sat: 10AM - 6PM, Sun: 12PM - 4PM</p>
                        <p className="shelter-phone"><strong>Phone:</strong> +20 123 456 7890</p>
                      </div>
                    </div>
                    
                    <div className="pickup-instructions">
                      <h5>What to Bring:</h5>
                      <ul>
                        <li>Valid ID/passport</li>
                        <li>Proof of address</li>
                        <li>Adoption fee (EGP 500) - cash or card accepted</li>
                        <li>Pet carrier (for cats) or leash (for dogs)</li>
                      </ul>
                      
                      <div className="pickup-note">
                        <p>
                          <strong>Note:</strong> Please call the shelter at least 24 hours in advance to schedule
                          your visit to ensure that staff are prepared for your arrival.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="modal-footer">
                    <button className="back-button" onClick={() => selectNextStepOption(null)}>
                      Back to Options
                    </button>
                    <button className="send-button" onClick={closeNextStepsModal}>
                      Got It
                    </button>
                  </div>
                </div>
              )}
              
              {/* Delivery form */}
              {nextStepsModal.option === 'delivery' && (
                <form className="delivery-form" onSubmit={submitDeliveryRequest}>
                  <p className="delivery-intro">
                    Please provide the following details to arrange delivery of {nextStepsModal.request?.petName} to your home:
                  </p>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="preferredDate">Preferred Date</label>
                      <input 
                        type="date" 
                        id="preferredDate"
                        name="preferredDate"
                        value={nextStepsModal.deliveryForm.preferredDate}
                        onChange={handleDeliveryFormChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="preferredTime">Preferred Time</label>
                      <select
                        id="preferredTime"
                        name="preferredTime"
                        value={nextStepsModal.deliveryForm.preferredTime}
                        onChange={handleDeliveryFormChange}
                        required
                      >
                        <option value="">Select a time</option>
                        <option value="9am-12pm">Morning (9AM - 12PM)</option>
                        <option value="12pm-3pm">Afternoon (12PM - 3PM)</option>
                        <option value="3pm-6pm">Evening (3PM - 6PM)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="address">Delivery Address</label>
                    <input 
                      type="text"
                      id="address"
                      name="address"
                      value={nextStepsModal.deliveryForm.address}
                      onChange={handleDeliveryFormChange}
                      placeholder="Enter your full delivery address"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Contact Phone Number</label>
                    <input 
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={nextStepsModal.deliveryForm.phoneNumber}
                      onChange={handleDeliveryFormChange}
                      placeholder="Phone number for delivery coordination"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="specialInstructions">Special Instructions (Optional)</label>
                    <textarea
                      id="specialInstructions"
                      name="specialInstructions"
                      value={nextStepsModal.deliveryForm.specialInstructions}
                      onChange={handleDeliveryFormChange}
                      rows="3"
                      placeholder="Add any special instructions for delivery"
                    />
                  </div>
                  
                  <div className="delivery-note">
                    <p>
                      <strong>Note:</strong> A delivery fee of EGP 200 will be added to the adoption fee.
                      Payment will be collected upon delivery (cash or card accepted).
                    </p>
                  </div>
                  
                  <div className="modal-footer">
                    <button type="button" className="back-button" onClick={() => selectNextStepOption(null)}>
                      Back to Options
                    </button>
                    <button type="submit" className="send-button">
                      Request Delivery
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;