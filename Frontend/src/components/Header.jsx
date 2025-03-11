import React, { useState } from 'react';
import { useEffect } from 'react';
import '../css/Header.css';


function Header() {
  // State to track if the user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Toggle login/logout status

  useEffect(() => {
      const myFunction = () => {
        const token = localStorage.getItem('ReactToken');
        console.log('Token in localStorage:', token); // Debugging line
  
        if (token) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      };
  
      myFunction(); // Call on initial load to set login status
    }, []);

    const handleButtonClick = () => {
      if (isLoggedIn) {
        localStorage.removeItem('ReactToken');
        setIsLoggedIn(false);
      } else {
        window.location.href = '/login';
      }
    };

  return (
    <div className="header-div">
    <header className="header">
      <div className="Header-Heading">Blood Manegment</div>
      <div>
      <a href="http://localhost:3000/login">
        <button
        className="login-button"
        onClick={handleButtonClick}
        >
          {isLoggedIn ? 'Logout' : 'Login'}
        </button>
        </a>
      </div>
    </header>
    </div>
  );
}

export default Header;