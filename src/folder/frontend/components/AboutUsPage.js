// Import necessary dependencies
import React from "react";
import "../css/AboutUsPage.css";

const AboutUsPage = () => {
  return (
    <div className="about-us-page">
      {/* Header Section */}
      <header className="about-header">
        <h1 className="header-title">About Rescue Radar</h1>
        <p className="header-description">
          Your trusted partner in connecting rescuers, NGOs, and organizations for animal welfare.
        </p>
      </header>

      {/* Mission Section */}
      <section className="mission-section">
        <h2 className="mission-title">Our Mission</h2>
        <p className="mission-description">
          At Rescue Radar, we strive to create a platform that empowers individuals and groups to collaborate
          in providing timely rescue, rehabilitation, and care for animals in need. We believe every life matters.
        </p>
      </section>

      {/* Vision Section */}
      <section className="vision-section">
        <h2 className="vision-title">Our Vision</h2>
        <p className="vision-description">
          A future where no animal suffers due to lack of support. Our vision is to bridge the gap between
          rescuers and organizations, ensuring that help reaches every corner of the community.
        </p>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2 className="team-title">Meet Our Team</h2>
        <p className="team-description">
          Rescue Radar is powered by a passionate team of animal lovers, dedicated to making a difference one rescue at a time.
        </p>
        <ul className="team-list">
          <li className="team-member">Bharat D - Founder</li>
          <li className="team-member">Abhishek M  - Operations Manager</li>
          <li className="team-member">Bagesh T - Outreach Coordinator</li>
        </ul>
      </section>

      {/* Footer Section */}
      <footer className="about-footer">
        <p className="footer-text">2023 Copyright: Rescue Radar | rescue-radar@gmail.com</p>
        <p className="footer-credits">Designed with ❤️ by the Rescue Radar Team</p>
      </footer>
    </div>
  );
};

export default AboutUsPage;
