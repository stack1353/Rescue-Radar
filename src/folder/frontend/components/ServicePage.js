// Import necessary dependencies
import React, { useState, useEffect } from "react";
import "../css/ServicePage.css";

const ServicePage = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Simulating an API call for services
    const fetchData = async () => {
      const response = await fetch("/api/services"); // Replace with actual API endpoint
      const data = await response.json();
      setServices(data);
    };

    fetchData();
  }, []);

  return (
    <div className="service-page">
      {/* Header Section */}
      <header className="service-header">
        <h1 className="header-title">Welcome to Rescue Radar</h1>
        <p className="header-description">Efficiently Connecting Rescuers and NGOs for Animal Welfare</p>
      </header>

      {/* Statistics Section */}
      <div className="stats-container">
        <div className="stat-box">
          <h2 className="stat-title">Users</h2>
          <p className="stat-value">25</p>
        </div>
        <div className="stat-box">
          <h2 className="stat-title">Requests Raised</h2>
          <p className="stat-value">62</p>
        </div>
        <div className="stat-box">
          <h2 className="stat-title">Requests Approved</h2>
          <p className="stat-value">45</p>
        </div>
        <div className="stat-box">
          <h2 className="stat-title">Organizations</h2>
          <p className="stat-value">8</p>
        </div>
      </div>

      {/* About Section */}
      <section className="about-section">
        <h2 className="about-title">Our Mission</h2>
        <p className="about-description">
          Rescue Radar is dedicated to providing a collaborative platform where rescuers
          and organizations can connect, share resources, and streamline animal rescue efforts.
        </p>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2 className="services-title">Our Services</h2>
        <ul className="services-list">
          {services.length > 0 ? (
            services.map((service, index) => <li className="service-item" key={index}>{service}</li>)
          ) : (
            <p className="loading-message">Loading services...</p>
          )}
        </ul>
      </section>

      {/* Footer Section */}
      <footer className="service-footer">
        <p className="footer-text">2024 Copyright: Rescue Radar | rescue-radar@gmail.com</p>
        <p className="footer-credits">Designed with ❤️ by the Rescue Radar Team</p>
      </footer>
    </div>
  );
};

export default ServicePage;
