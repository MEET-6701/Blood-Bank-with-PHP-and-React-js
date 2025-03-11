import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../css/addDonor.css';

function BloodRequest() {
  const [bloodGroup, setBloodGroup] = useState('');
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
    const [quantity, setQuantity] = useState('');

  const handleAddDonor = async (e) => {
    e.preventDefault();

    const donorData = {
      name,
      bloodGroup,
      contact,
      quantity
    };

    try {
        const response = await fetch('http://localhost/bloodbank/requestBlood', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(donorData),
        });
  
        const data = await response.json();
  
        if (data.success == true) {
          // Handle successful response
          window.alert('Request added successfully');
          setName('');
          setBloodGroup('');
          setContact('');
          setQuantity('');
        } else {
          // Handle error response
          console.error('Failed to add Request');
          window.alert(data.quantity + ' Not Enough blood' || 'Failed to add Request');
        }
      } catch (error) {
        console.error('Error:', error);
        if (error.response && error.response.data) {
          window.alert(error.response.data.quantity + ' not enough blood available');
        } else {
          window.alert('An error occurred while adding the request');
        }
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
      <hr className="solid" />
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
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            required
          >
            <option value="">Select Blood Type</option>
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
          Contact:
          <input
            type="number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Add Donor</button>
      </form>
    </div>
  );
}

export default BloodRequest;