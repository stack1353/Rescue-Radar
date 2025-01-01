import React, { useEffect, useState } from 'react';
import axios from 'axios'; // For making API requests
import '../css/RescuerPage.css'; // Import CSS for styling

const RescuerPage = () => {
  const [rescues, setRescues] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch data from the API
  useEffect(() => {
    const fetchRescues = async () => {
      try {
        const response = await axios.get('/api/rescues'); // Replace with your API endpoint
        setRescues(response.data); // Assuming the API returns an array of rescues
        setLoading(false);
      } catch (err) {
        console.error("Error fetching rescues:", err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchRescues();
  }, []); // Empty dependency array ensures this runs once

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="rescuer-container">
      <header className="rescuer-header">
        <h1>We-Care</h1>
        <div className="rescuer-actions">
          <button className="action-button">Approve Rescue Request</button>
          <button className="action-button">Assign User</button>
          <button className="action-button">Accept NGO Join Request</button>
          <button className="logout-button">Log Out</button>
        </div>
      </header>

      <table className="rescuer-table">
        <thead>
          <tr>
            <th>Request No</th>
            <th>Description</th>
            <th>Rescue Location</th>
            <th>Image</th>
            <th>Raised By</th>
            <th>Contact Info</th>
            <th>Request Logged Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rescues.map((rescue) => (
            <tr key={rescue.id}>
              <td>{rescue.id}</td>
              <td>{rescue.description}</td>
              <td>{rescue.location}</td>
              <td>
                <img src={rescue.image} alt={`Rescue ${rescue.id}`} className="rescue-image" />
              </td>
              <td>{rescue.raisedBy}</td>
              <td>
                <div>Email: {rescue.contactInfo.email}</div>
                <div>Phone: {rescue.contactInfo.phone}</div>
              </td>
              <td>{rescue.loggedDate}</td>
              <td>{rescue.status}</td>
              <td className="rescue-action">{rescue.action}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="rescuer-footer">
        <p>© SRMCEM wecareforurbanfauna@gmail.com. All rights reserved.</p>
        <p>Made by Divyanshee Srivastava and Isha Rajwar</p>
      </footer>
    </div>
  );
};

export default RescuerPage;
