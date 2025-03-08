import React, { createContext, useState, useContext, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is authenticated from localStorage
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const [userProfile, setUserProfile] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : {
      name: "",
      gender: "",
      phone: "",
      dob: "",
      email: "",
      workEmail: "",
      profileImage: null
    };
  });

  useEffect(() => {
    // Update localStorage when authentication state changes
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    // Only save profile if it has data
    if (userProfile.name || userProfile.email) {
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }
  }, [userProfile]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const updateProfile = async (updatedProfile) => {
    try {
      // First update local state
      setUserProfile(updatedProfile);

      // If you have a backend API, you can make the API call here
      // const response = await fetch('/api/update-profile', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(updatedProfile),
      // });
      
      // if (!response.ok) {
      //   throw new Error('Failed to update profile');
      // }

      // const data = await response.json();
      // console.log('Profile updated successfully:', data);
    } catch (error) {
      console.error('Error updating profile:', error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      login, 
      logout, 
      userProfile, 
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
}; 