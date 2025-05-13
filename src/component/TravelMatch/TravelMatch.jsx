import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TravelMatch = () => {
  const { userProfile, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    currentLocation: '',
    travelLocation: '',
    travelDate: '',
    returnDate: '',
    interests: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Set user profile data if available
    if (userProfile) {
      setFormData(prev => ({
        ...prev,
        name: userProfile.name || '',
        phone: userProfile.phone || '',
        email: userProfile.email || '',
      }));
    }
    setIsLoading(false);
  }, [isAuthenticated, userProfile, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      // Get existing travel matches from localStorage
      const existingMatches = JSON.parse(localStorage.getItem('travelMatches') || '[]');
      
      // Add new travel details with a unique ID
      const newTravelDetails = {
        ...formData,
        id: Date.now(),
        userId: userProfile.id || Date.now(),
        createdAt: new Date().toISOString()
      };

      // Find potential matches
      const matches = existingMatches.filter(match => 
        match.travelLocation.toLowerCase() === formData.travelLocation.toLowerCase() &&
        match.travelDate === formData.travelDate &&
        match.userId !== newTravelDetails.userId
      );

      // Save the new travel details
      localStorage.setItem('travelMatches', JSON.stringify([...existingMatches, newTravelDetails]));

      setSuccess(
        matches.length > 0 
          ? `Found ${matches.length} potential travel buddies! Check the chat to connect with them.`
          : "Travel details saved! We'll notify you when we find a match."
      );
      
      // Reset form except for personal details
      setFormData(prev => ({
        ...prev,
        currentLocation: '',
        travelLocation: '',
        travelDate: '',
        returnDate: '',
        interests: '',
      }));

      // If matches were found, navigate to chat after a delay
      if (matches.length > 0) {
        setTimeout(() => {
          navigate('/travel-chat');
        }, 2000);
      }

    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);
  //   setError(null);
  //   setSuccess(null);
  
  //   try {
  //     const token = localStorage.getItem('accessToken'); // Assuming you store auth token
  //     if (!token) throw new Error('User not authenticated.');
  
  //     const response = await fetch('http://127.0.0.1:8000/api/travel/submit/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify({
  //         ...formData
  //       })
  //     });
  
  //     if (!response.ok) {
  //       const data = await response.json();
  //       throw new Error(data.detail || 'Failed to submit travel details.');
  //     }
  
  //     const data = await response.json();
  
  //     setSuccess(
  //       data.matches.length > 0 
  //         ? `Found ${data.matches.length} potential travel buddies! Check the chat to connect with them.`
  //         : "Travel details saved! We'll notify you when we find a match."
  //     );
  
  //     setFormData(prev => ({
  //       ...prev,
  //       currentLocation: '',
  //       travelLocation: '',
  //       travelDate: '',
  //       returnDate: '',
  //       interests: '',
  //     }));
  
  //     if (data.matches.length > 0) {
  //       setTimeout(() => {
  //         navigate('/travel-chat');
  //       }, 2000);
  //     }
  
  //   } catch (err) {
  //     setError(err.message);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
  


  if (isLoading) {
    return (
      <div className=" min-h-screen bg-white dark:bg-black pt-32 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mt-10 min-h-screen bg-white dark:bg-black pt-20 sm:pt-24 md:pt-28 lg:pt-32 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-serif text-gray-900 dark:text-primary">
            Find Your
            <span className="ml-2 text-primary dark:text-white">
              Travel Buddy
            </span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 font-serif">
            Connect with fellow buddies travelers heading to the same destination
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-dark/90 p-6 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Personal Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark/50 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="18"
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark/50 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark/50 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark/50 dark:text-white"
              />
            </div>

            {/* Location Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Location</label>
              <div className="mt-1 relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="currentLocation"
                  value={formData.currentLocation}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark/50 dark:text-white"
                  placeholder="City, Country"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Travel Destination</label>
              <div className="mt-1 relative">
                <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="travelLocation"
                  value={formData.travelLocation}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark/50 dark:text-white"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* Travel Dates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Travel Date</label>
              <div className="mt-1 relative">
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark/50 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Return Date</label>
              <div className="mt-1 relative">
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={handleChange}
                  required
                  className="block w-full pl-10 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark/50 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Travel Interests</label>
            <textarea
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark/50 dark:text-white"
              placeholder="Share your interests and what you're looking for in a travel buddy..."
            />
          </div>

          <div className="flex justify-center gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-primary dark:text-white text-black/70 font-serif rounded-md hover:bg-primary/90 transition duration-300 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Find Travel Buddy'}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/travel-chat')}
              className="px-6 py-3 bg-gray-200 font-serif dark:text-white !text-black rounded-md hover:bg-primary transition duration-300"
            >
              View Matches
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TravelMatch; 