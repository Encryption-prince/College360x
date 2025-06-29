import React, { useState, useRef, useEffect } from 'react';
import * as echarts from 'echarts';

/**
 * EventForm Component
 * 
 * This component creates a multi-step form for creating new events.
 * It integrates with the backend API at localhost:4000/api/v1/event
 * 
 * API Endpoint: POST http://localhost:4000/api/v1/event
 * 
 * Expected API Response Format:
 * {
 *   "data": {
 *     "registration_count": 0,
 *     "permission": false,
 *     "id": 1,
 *     "name": "HackQuest",
 *     "collegeId": "2",
 *     "venueId": "1",
 *     "clubId": "1",
 *     "price": "0",
 *     "startingTime": "2025-06-28T17:52:02.482Z",
 *     "endingTime": "2025-06-28T19:52:02.482Z",
 *     "total_seats": "10",
 *     "updatedAt": "2025-06-28T17:54:02.615Z",
 *     "createdAt": "2025-06-28T17:54:02.615Z"
 *   },
 *   "success": true,
 *   "message": "successfully created a event",
 *   "err": {}
 * }
 */

const EventForm = () => {
  // Form state matching database model
  const [eventInfo, setEventInfo] = useState({
    name: '',
    venueId: '',
    startingTime: '',
    endingTime: '',
    clubId: '',
    collegeId: '',
    total_seats: 100,
    registration_count: 0,
    price: 0,
    permission: false
  });
  
  const [activeSection, setActiveSection] = useState('event-info');
  const [themeColor, setThemeColor] = useState('#4ade80'); // Default mint color
  const [showPreview, setShowPreview] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  // Refs for smooth scrolling
  const sectionRefs = {
    'event-info': useRef(null),
    'venue': useRef(null),
    'timing': useRef(null),
    'capacity': useRef(null),
    'publish': useRef(null)
  };
  
  // Theme color options
  const themeColors = [
    { name: 'Mint', value: '#4ade80' },
    { name: 'Peach', value: '#fb923c' },
    { name: 'Sky', value: '#38bdf8' },
    { name: 'Violet', value: '#a78bfa' }
  ];
  
  // Font options
  const fonts = [
    { name: 'Poppins', value: 'font-poppins' },
    { name: 'Inter', value: 'font-inter' },
    { name: 'Montserrat', value: 'font-montserrat' }
  ];
  
  const [selectedFont, setSelectedFont] = useState(fonts[0].value);
  
  // Mock data for dropdowns
  const venues = [
    { id: 1, name: 'Main Auditorium' },
    { id: 2, name: 'Conference Hall A' },
    { id: 3, name: 'Seminar Room 101' },
    { id: 4, name: 'Open Air Amphitheater' },
    { id: 5, name: 'Sports Complex' }
  ];
  
  const clubs = [
    { id: 1, name: 'Tech Club' },
    { id: 2, name: 'Cultural Club' },
    { id: 3, name: 'Sports Club' },
    { id: 4, name: 'Literary Club' },
    { id: 5, name: 'Photography Club' }
  ];
  
  const colleges = [
    { id: 1, name: 'Engineering College' },
    { id: 2, name: 'Medical College' },
    { id: 3, name: 'Arts College' },
    { id: 4, name: 'Commerce College' },
    { id: 5, name: 'Science College' }
  ];
  
  // Handle section toggle with smooth scrolling
  const handleSectionToggle = (section) => {
    setActiveSection(section);
    
    // Smooth scroll to the section
    if (sectionRefs[section]?.current) {
      sectionRefs[section].current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };
  
  // Auto-scroll to active section when it changes
  useEffect(() => {
    if (sectionRefs[activeSection]?.current) {
      setTimeout(() => {
        sectionRefs[activeSection].current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);
    }
  }, [activeSection]);
  
  const handlePublish = async () => {
    // Validate required fields
    const requiredFields = ['name', 'venueId', 'startingTime', 'endingTime', 'clubId', 'collegeId'];
    const missingFields = requiredFields.filter(field => !eventInfo[field]);
    
    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    
    // Validate that end time is after start time
    if (new Date(eventInfo.endingTime) <= new Date(eventInfo.startingTime)) {
      setError('End time must be after start time');
      return;
    }
    
    // Validate total seats
    if (eventInfo.total_seats <= 0) {
      setError('Total seats must be greater than 0');
      return;
    }
    
    // Clear any previous errors
    setError('');
    setIsLoading(true);
    
    try {
      // Prepare the data according to your API format
      const eventData = {
        name: eventInfo.name,
        venueId: eventInfo.venueId.toString(), // Ensure it's a string
        startingTime: eventInfo.startingTime,
        endingTime: eventInfo.endingTime,
        clubId: eventInfo.clubId.toString(), // Ensure it's a string
        collegeId: eventInfo.collegeId.toString(), // Ensure it's a string
        total_seats: eventInfo.total_seats.toString(), // Convert to string as per API
        registration_count: eventInfo.registration_count,
        price: eventInfo.price.toString(), // Convert to string as per API
        permission: eventInfo.permission
      };
      
      console.log('Sending event data:', eventData); // For debugging
      
      const response = await fetch('http://localhost:4000/api/v1/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        credentials: 'include', // Include cookies if needed
        body: JSON.stringify(eventData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      console.log('API Response:', result); // For debugging
      
      if (result.success) {
        // Show success toast
        setShowSuccess(true);
        setSuccessMessage(result.message || 'Event published successfully!');
        
        // Reset form after successful creation
        setEventInfo({
          name: '',
          venueId: '',
          startingTime: '',
          endingTime: '',
          clubId: '',
          collegeId: '',
          total_seats: 100,
          registration_count: 0,
          price: 0,
          permission: false
        });
        
        // Hide toast after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
          setSuccessMessage('');
        }, 3000);
      } else {
        setError(result.message || 'Failed to create event');
      }
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Clear error when user starts typing
  const handleFieldChange = (field, value) => {
    if (error) {
      setError('');
    }
    setEventInfo({...eventInfo, [field]: value});
  };
  
  return (
    <div className="flex h-screen bg-gray-50">   
      {/* Main Content */}
      <div className=" flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Create New Event</h1>
            <p className="text-gray-600 mt-2">Design a unique event experience for your club members</p>
          </header>
          
          {/* Progress Navigation */}
          <div className="mb-10 bg-white rounded-lg shadow-sm p-4 sticky top-4 z-10">
            <div className="flex justify-between">
              {['event-info', 'venue', 'timing', 'capacity', 'publish'].map((section, index) => (
                <button 
                  key={section}
                  onClick={() => handleSectionToggle(section)}
                  className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${activeSection === section ? 'text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'}`}
                  style={{
                    backgroundColor: activeSection === section ? themeColor : 'transparent'
                  }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center border-2 mb-1 transition-all duration-300"
                    style={{
                      borderColor: activeSection === section ? 'white' : themeColor,
                      transform: activeSection === section ? 'scale(1.1)' : 'scale(1)'
                    }}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs whitespace-nowrap font-medium">
                    {section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Form Sections */}
          <div className="space-y-8">
            {/* Event Info Section */}
            <section 
              ref={sectionRefs['event-info']}
              className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 ${activeSection === 'event-info' ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-60 transform translate-y-4 scale-95'}`}
              style={{
                borderTop: `4px solid ${themeColor}`
              }}
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <i className="fas fa-info-circle mr-3" style={{ color: themeColor }}></i>
                  Event Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Name *
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:outline-none transition"
                      style={{ focusRing: themeColor }}
                      placeholder="Enter event name"
                      value={eventInfo.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Club ID *
                    </label>
                    <div className="relative">
                      <select 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:outline-none transition appearance-none bg-white"
                        value={eventInfo.clubId}
                        onChange={(e) => handleFieldChange('clubId', e.target.value)}
                        required
                      >
                        <option value="">Select a club ID</option>
                        {clubs.map(club => (
                          <option key={club.id} value={club.id}>{club.name}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <i className="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      College *
                    </label>
                    <div className="relative">
                      <select 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:outline-none transition appearance-none bg-white"
                        value={eventInfo.collegeId}
                        onChange={(e) => handleFieldChange('collegeId', e.target.value)}
                        required
                      >
                        <option value="">Select a college</option>
                        {colleges.map(college => (
                          <option key={college.id} value={college.id}>{college.name}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <i className="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Permission Required
                    </label>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="permission"
                        checked={eventInfo.permission}
                        onChange={(e) => handleFieldChange('permission', e.target.checked)}
                        className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label htmlFor="permission" className="ml-2 text-sm text-gray-700">
                        This event requires special permission to attend
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Venue Section */}
            <section 
              ref={sectionRefs['venue']}
              className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 ${activeSection === 'venue' ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-60 transform translate-y-4 scale-95'}`}
              style={{
                borderTop: `4px solid ${themeColor}`
              }}
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <i className="fas fa-map-marked-alt mr-3" style={{ color: themeColor }}></i>
                  Venue Selection
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Venue ID *
                    </label>
                    <div className="relative">
                      <select 
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:outline-none transition appearance-none bg-white"
                        value={eventInfo.venueId}
                        onChange={(e) => handleFieldChange('venueId', e.target.value)}
                        required
                      >
                        <option value="">Choose a venue ID</option>
                        {venues.map(venue => (
                          <option key={venue.id} value={venue.id}>{venue.name}</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <i className="fas fa-chevron-down text-gray-400"></i>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Venue Preview
                    </label>
                    <div className="h-48 bg-gray-100 rounded-lg overflow-hidden">
                      <img 
                        src="https://readdy.ai/api/search-image?query=A%20clean%20and%20minimalist%20map%20view%20of%20a%20college%20campus%20with%20main%20buildings%20highlighted%2C%20modern%20cartography%20style%20with%20soft%20colors%2C%20professional%20looking%20design%20suitable%20for%20event%20location%2C%20high%20quality%20digital%20illustration&width=600&height=300&seq=2&orientation=landscape" 
                        alt="Location map"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Timing Section */}
            <section 
              ref={sectionRefs['timing']}
              className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 ${activeSection === 'timing' ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-60 transform translate-y-4 scale-95'}`}
              style={{
                borderTop: `4px solid ${themeColor}`
              }}
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <i className="fas fa-clock mr-3" style={{ color: themeColor }}></i>
                  Event Timing
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Starting Date & Time *
                    </label>
                    <input 
                      type="datetime-local" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:outline-none transition"
                      value={eventInfo.startingTime}
                      onChange={(e) => handleFieldChange('startingTime', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ending Date & Time *
                    </label>
                    <input 
                      type="datetime-local" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:outline-none transition"
                      value={eventInfo.endingTime}
                      onChange={(e) => handleFieldChange('endingTime', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Event Duration</h4>
                      {eventInfo.startingTime && eventInfo.endingTime ? (
                        <p className="text-sm text-gray-600">
                          {(() => {
                            const start = new Date(eventInfo.startingTime);
                            const end = new Date(eventInfo.endingTime);
                            const diff = end - start;
                            const hours = Math.floor(diff / (1000 * 60 * 60));
                            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                            return `${hours} hours ${minutes} minutes`;
                          })()}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">Set start and end times to see duration</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Capacity & Pricing Section */}
            <section 
              ref={sectionRefs['capacity']}
              className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 ${activeSection === 'capacity' ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-60 transform translate-y-4 scale-95'}`}
              style={{
                borderTop: `4px solid ${themeColor}`
              }}
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <i className="fas fa-users mr-3" style={{ color: themeColor }}></i>
                  Capacity & Pricing
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Seats *
                    </label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:outline-none transition"
                      placeholder="Enter total number of seats"
                      value={eventInfo.total_seats}
                      onChange={(e) => handleFieldChange('total_seats', parseInt(e.target.value) || 0)}
                      min="1"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Default: 100 seats</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Price (₹)
                    </label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:outline-none transition"
                      placeholder="Enter event price"
                      value={eventInfo.price}
                      onChange={(e) => handleFieldChange('price', parseInt(e.target.value) || 0)}
                      min="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">Set to 0 for free events</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium mb-2">Registration Summary</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Total Seats:</span>
                          <span className="ml-2 font-medium">{eventInfo.total_seats}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Available Seats:</span>
                          <span className="ml-2 font-medium">{eventInfo.total_seats - eventInfo.registration_count}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Registered:</span>
                          <span className="ml-2 font-medium">{eventInfo.registration_count}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Price:</span>
                          <span className="ml-2 font-medium">₹{eventInfo.price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Publish Section */}
            <section 
              ref={sectionRefs['publish']}
              className={`bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 ${activeSection === 'publish' ? 'opacity-100 transform translate-y-0 scale-100' : 'opacity-60 transform translate-y-4 scale-95'}`}
              style={{
                borderTop: `4px solid ${themeColor}`
              }}
            >
              <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <i className="fas fa-paper-plane mr-3" style={{ color: themeColor }}></i>
                  Review & Publish
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h3 className="text-lg font-medium mb-4">Event Summary</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Event Name:</span>
                          <span className="font-medium">{eventInfo.name || 'Not set'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Venue:</span>
                          <span className="font-medium">
                            {venues.find(v => v.id == eventInfo.venueId)?.name || 'Not set'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Club:</span>
                          <span className="font-medium">
                            {clubs.find(c => c.id == eventInfo.clubId)?.name || 'Not set'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">College:</span>
                          <span className="font-medium">
                            {colleges.find(c => c.id == eventInfo.collegeId)?.name || 'Not set'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Start Time:</span>
                          <span className="font-medium">
                            {eventInfo.startingTime ? new Date(eventInfo.startingTime).toLocaleString() : 'Not set'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">End Time:</span>
                          <span className="font-medium">
                            {eventInfo.endingTime ? new Date(eventInfo.endingTime).toLocaleString() : 'Not set'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Total Seats:</span>
                          <span className="font-medium">{eventInfo.total_seats}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Price:</span>
                          <span className="font-medium">₹{eventInfo.price}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Permission Required:</span>
                          <span className="font-medium">{eventInfo.permission ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <span className="font-medium text-yellow-600">Draft</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        {/* Error Display */}
                        {error && (
                          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                            <div className="flex items-center">
                              <i className="fas fa-exclamation-circle text-red-500 mr-2"></i>
                              <p className="text-sm text-red-700">{error}</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center mb-4">
                          <i className="fas fa-exclamation-circle text-yellow-500 mr-2"></i>
                          <p className="text-sm text-gray-600">Please review all details before publishing.</p>
                        </div>
                        
                        <button 
                          onClick={() => setShowPreview(true)}
                          className="w-full mb-3 px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition flex items-center justify-center !rounded-button whitespace-nowrap cursor-pointer"
                          disabled={isLoading}
                        >
                          <i className="fas fa-eye mr-2"></i>
                          Preview Event
                        </button>
                        
                        <button 
                          onClick={handlePublish}
                          disabled={isLoading}
                          className="w-full px-6 py-3 rounded-lg text-white font-medium flex items-center justify-center !rounded-button whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          style={{ 
                            backgroundColor: themeColor,
                            boxShadow: `0 0 20px ${themeColor}80`
                          }}
                        >
                          {isLoading ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Publishing...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-paper-plane mr-2"></i>
                              Publish Event
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Publishing Options
                      </label>
                      <div className="space-y-3">
                        <label className="flex items-center cursor-pointer">
                          <input type="checkbox" className="hidden" defaultChecked />
                          <div className="w-10 h-5 bg-gray-200 rounded-full p-1 transition duration-300 relative"
                            style={{ backgroundColor: themeColor }}
                          >
                            <div className="w-3 h-3 bg-white rounded-full transform translate-x-5"></div>
                          </div>
                          <span className="ml-3">Feature on homepage</span>
                        </label>
                        
                        <label className="flex items-center cursor-pointer">
                          <input type="checkbox" className="hidden" defaultChecked />
                          <div className="w-10 h-5 bg-gray-200 rounded-full p-1 transition duration-300 relative"
                            style={{ backgroundColor: themeColor }}
                          >
                            <div className="w-3 h-3 bg-white rounded-full transform translate-x-5"></div>
                          </div>
                          <span className="ml-3">Send email notification to club members</span>
                        </label>
                        
                        <label className="flex items-center cursor-pointer">
                          <input type="checkbox" className="hidden" />
                          <div className="w-10 h-5 bg-gray-200 rounded-full p-1 transition duration-300 relative">
                            <div className="w-3 h-3 bg-white rounded-full transform"></div>
                          </div>
                          <span className="ml-3">Schedule for later</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="text-xl font-bold">Event Preview</h3>
              <button 
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700 transition cursor-pointer"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            
            <div className="p-6">
              <div className="rounded-xl overflow-hidden shadow-lg mb-6">
                <div className="h-64 bg-gray-200 relative">
                  <img 
                    src="https://readdy.ai/api/search-image?query=A%20vibrant%20and%20colorful%20abstract%20banner%20image%20for%20a%20college%20event%20with%20soft%20pastel%20colors%20and%20dynamic%20shapes%2C%20professional%20looking%20design%20with%20modern%20aesthetic%2C%20high%20quality%20digital%20art&width=1200&height=400&seq=3&orientation=landscape" 
                    alt="Event banner preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6" style={{ backgroundColor: themeColor + '08' }}>
                  <div className="flex flex-wrap items-center mb-4">
                    <span className="px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2" style={{ backgroundColor: themeColor + '20', color: themeColor }}>
                      {clubs.find(c => c.id == eventInfo.clubId)?.name || 'Club'}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 bg-gray-100 text-gray-700">
                      <i className="fas fa-users mr-1"></i> {eventInfo.total_seats} seats
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2 bg-gray-100 text-gray-700">
                      <i className="fas fa-map-marker-alt mr-1"></i>
                      {venues.find(v => v.id == eventInfo.venueId)?.name || 'Venue'}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl font-bold mb-4">
                    {eventInfo.name || 'Event Name'}
                  </h1>
                  
                  <div className="flex items-center text-gray-600 mb-6">
                    <div className="flex items-center mr-6">
                      <i className="fas fa-calendar-alt mr-2"></i>
                      <span>{eventInfo.startingTime ? new Date(eventInfo.startingTime).toLocaleDateString() : 'Date'}</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-clock mr-2"></i>
                      <span>{eventInfo.startingTime ? new Date(eventInfo.startingTime).toLocaleTimeString() : 'Time'}</span>
                    </div>
                  </div>
                  
                  <div className="prose max-w-none mb-8">
                    <p>Join us for this exciting event organized by {clubs.find(c => c.id == eventInfo.clubId)?.name || 'our club'}.</p>
                    <ul>
                      <li>Venue: {venues.find(v => v.id == eventInfo.venueId)?.name || 'TBD'}</li>
                      <li>Total Seats: {eventInfo.total_seats}</li>
                      <li>Price: ₹{eventInfo.price}</li>
                      <li>Permission Required: {eventInfo.permission ? 'Yes' : 'No'}</li>
                    </ul>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer !rounded-button whitespace-nowrap">
                        <i className="fas fa-share-alt"></i>
                      </button>
                      <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition cursor-pointer !rounded-button whitespace-nowrap">
                        <i className="far fa-bookmark"></i>
                      </button>
                    </div>
                    
                    <button 
                      className="px-6 py-3 rounded-lg text-white font-medium !rounded-button whitespace-nowrap cursor-pointer"
                      style={{ backgroundColor: themeColor }}
                    >
                      Register Now
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-500 mb-2">This is a preview of how your event will appear to users</p>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="text-sm px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg p-4 flex items-center z-50 animate-fadeIn">
          <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: themeColor + '20' }}>
            <i className="fas fa-check" style={{ color: themeColor }}></i>
          </div>
          <div>
            <h4 className="font-medium">Success!</h4>
            <p className="text-sm text-gray-600">{successMessage}</p>
          </div>
          <button 
            onClick={() => {
              setShowSuccess(false);
              setSuccessMessage('');
            }}
            className="ml-4 text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default EventForm;
