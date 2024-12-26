import React from "react";

const AdminNavbar = ({ onLogout }) => {
  return (
    <nav className="admin-navbar">
      <ul>
        <li>
          <a href="/admin/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/admin/rescuers">Rescuers</a>
        </li>
        <li>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
