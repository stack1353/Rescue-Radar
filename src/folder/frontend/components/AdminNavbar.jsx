import React from "react";

const AdminNavbar = ({ onLogout }) => {
  return (
    <>
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
      <style>
        {`
          .admin-navbar {
            background-color: #f8ffe4; /* Soft pastel green background */
            border-bottom: 2px solid #d0e6a5; /* Slightly darker green for contrast */
            padding: 10px 20px;
            display: flex;
            justify-content: center;
          }

          .admin-navbar ul {
            list-style: none;
            display: flex;
            gap: 20px;
            margin: 0;
            padding: 0;
          }

          .admin-navbar li {
            display: inline-block;
          }

          .admin-navbar a {
            text-decoration: none;
            color: #2d3e50; /* Dark gray for links */
            font-weight: bold;
            font-size: 16px;
            transition: color 0.3s ease;
          }

          .admin-navbar a:hover {
            color: #529f5b; /* Green hover effect */
          }

          .logout-button {
            background-color: #ff6b6b; /* Bright red for the logout button */
            color: white;
            border: none;
            border-radius: 4px;
            padding: 5px 10px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .logout-button:hover {
            background-color: #d9534f; /* Slightly darker red for hover */
          }

          .logout-button:active {
            background-color: #c9302c; /* Even darker red for active state */
          }

          .admin-navbar a, .logout-button {
            font-family: 'Roboto', sans-serif; /* Clean, professional font */
          }
        `}
      </style>
    </>
  );
};

export default AdminNavbar;
