import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/donorlist.css';

function DonorList() {
  // State to hold the donor data and loading state
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);  // To show loading message

  // Fetch the donor data from the backend using Axios
  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get('http://localhost/bloodbank/test');
        setDonors(response.data);  // Update the state with the fetched data
        setLoading(false);  // Stop loading when data is fetched
      } catch (error) {
        console.error('Error fetching donor data:', error);
        setLoading(false);  // Stop loading if there's an error
      }
    };

    fetchDonors();
  }, []);  // Empty dependency array ensures this effect runs only once (on mount)

  return (
    <div className="donor-list">
      <div className="donor-list-header">
      <h2>Donor List</h2>

      <Link to="/Request">
          <button className="add-donor-btn">Blood Request</button>
      </Link>
      <Link to="/add-donor">
          <button className="add-donor-btn">Add Donor</button>
      </Link>
     
      </div>
      <hr class="solid"/>
      {loading ? (
        <p>Loading donors...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Blood Type</th>
              <th>Age</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Last Donation Date</th>
            </tr>
          </thead>
          <tbody>
            {donors.length > 0 ? (
              donors.map(donor => (
                <tr key={donor.id}>
                  <td>{donor.id}</td>
                  <td>{donor.name}</td>
                  <td>{donor.blood_type}</td>
                  <td>{donor.age}</td>
                  <td>{donor.contact}</td>
                  <td>{donor.address}</td>
                  <td>{donor.Date || 'No donations yet'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No donors found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default DonorList;
