import React from "react";

import "../css/TeamPage.css";

const TeamPage = () => {
  const teamMembers = [
    {
      name: "Arun Kumar",
      role: "Project Lead",
      photo: "/images/arun.jpg",
      description: "Arun oversees the project's direction and ensures smooth collaboration.",
    },
    {
      name: "Priya Sharma",
      role: "Frontend Developer",
      photo: "/images/priya.jpg",
      description: "Priya specializes in crafting user-friendly interfaces for Rescue Radar.",
    },
    {
      name: "Rahul Mehta",
      role: "Backend Developer",
      photo: "/images/rahul.jpg",
      description: "Rahul handles the server-side logic and database integrations.",
    },
    {
      name: "Sneha Iyer",
      role: "UI/UX Designer",
      photo: "/images/sneha.jpg",
      description: "Sneha designs intuitive and visually appealing layouts for the platform.",
    },
  ];

  return (
    <div className="team-page">
      <header className="team-header">
        <h1 className="team-title">Meet Our Team</h1>
        <p className="team-description">
          The passionate individuals driving the Rescue Radar mission.
        </p>
      </header>

      <section className="team-members-section">
        <div className="team-members-container">
          {teamMembers.map((member, index) => (
            <div className="team-member-card" key={index}>
              <img
                src={member.photo}
                alt={`${member.name}'s photo`}
                className="team-member-photo"
              />
              <h2 className="team-member-name">{member.name}</h2>
              <h3 className="team-member-role">{member.role}</h3>
              <p className="team-member-description">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="team-footer">
        <p className="team-footer-text">
          Dedicated to improving animal welfare through innovation and teamwork.
        </p>
      </footer>
    </div>
  );
};

export default TeamPage;
