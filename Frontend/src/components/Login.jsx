
import React, { useState } from 'react';
import axios from 'axios';
import '../css/home.css';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost/bloodbank/Login',
        { username, password }, 
        {
          headers: {
            'Content-Type': 'application/json',
             // This triggers preflight request
          }
        }
      );

      // Handle successful login response
      if (response.status === 200) {
        // Assuming backend returns a success message or token
        console.log('Login successful:', response.data);

        localStorage.setItem('ReactToken', 'LoginToken');
        window.location.href = '/donors'; // Redirect to donors page after login
      }
    } catch (err) {
      // Handle error
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
