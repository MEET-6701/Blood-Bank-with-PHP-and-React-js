import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './components/Home';
import DonorList from './components/Donorlist';
import AddDonor from './components/AddDonor';
import Login from './components/Login';
import BloodRequest from './components/BloodRequest';
import Requser from './components/RequestTable';

function App() {
  // State to track if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  // Check the login status on initial load
  useEffect(() => {
    const myFunction = () => {
      const token = localStorage.getItem('ReactToken');
      console.log('Token in localStorage:', token); // Debugging line

      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setIsLoading(false); // Set loading to false after checking the token
    };

    myFunction(); // Call on initial load to set login status
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message while checking the token
  }

  return (
    <Router>
      <Routes>
        {/* Home and Login pages are accessible by everyone */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        
        {/* Donor List and Add Donor pages are only accessible if logged in */}
        <Route
          path="/donors"
          element={isLoggedIn ? <DonorList /> : <Navigate to="/login" />}
        />
        
        <Route
          path="/add-donor"
          element={isLoggedIn ? <AddDonor /> : <Navigate to="/login" />}
        />
         <Route
          path="/Request"
          element={isLoggedIn ? <BloodRequest /> : <Navigate to="/login" />}
        />
         <Route
          path="/Requser"
          element={isLoggedIn ? <Requser /> : <Navigate to="/login" />}
        />
        
        {/* Optionally, you can redirect any undefined routes to the home page or login page */}
        <Route path="*" element={isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
