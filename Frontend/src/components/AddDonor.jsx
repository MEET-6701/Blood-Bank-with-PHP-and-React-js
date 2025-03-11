import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import '../css/addDonor.css';

function AddDonor() {
  // State for form inputs
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [address, setAddress] = useState('');
  const [bloodType, setBloodType] = useState('');
  //const [lastDonationDate, setLastDonationDate] = useState('');
  const [contact, setContact] = useState('');

  // Handle form submission
  const handleAddDonor = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submission

    // Create the new donor object
    const newDonor = {
      name,
      blood_type: bloodType,
      contact,
        age,
        address,
    };

    try {
      // Send the new donor data to the backend using POST
      const response = await axios.post('http://localhost/bloodbank/addDonor', newDonor, {
        headers: {
          'Content-Type': 'application/json', // Ensure the content is sent as JSON
        },
      });
      if (response.data.success) {
        alert('Donor added successfully');
        // Reset the form fields after successful submission
        setName('');
        setBloodType('');
        setContact('');
        setAge('');
        setAddress('');
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log('Error adding donor:', error);
    }
  };

  return (
    <div className="add-donor-form">
        <div className="add-donor-heading">
      <h2>Add New Donor</h2>
      <Link to="/donors">
        <button className="back-btn">Back to Donor List</button>
      </Link>
      </div>
        <hr className="solid"/>
      <form onSubmit={handleAddDonor}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
  Blood Type:
  <select
    value={bloodType}
    onChange={(e) => setBloodType(e.target.value)}
    required
  >
    <option value="">Select Blood Type</option> {/* Placeholder */}
    <option value="A+">A+</option>
    <option value="A-">A-</option>
    <option value="B+">B+</option>
    <option value="B-">B-</option>
    <option value="O+">O+</option>
    <option value="O-">O-</option>
    <option value="AB+">AB+</option>
    <option value="AB-">AB-</option>
  </select>
</label>
<br />

        <label>
          Age:
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Contact:
          <input
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Address:
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <br />
        
        <button type="submit">Add Donor</button>
      </form>
    </div>
  );
}

export default AddDonor;
