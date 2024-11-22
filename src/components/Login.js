import React from 'react';
import '../css/Login.css'; // Import the corresponding CSS file for styling

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form>
          <div className="input-group">
            <input type="text" id="username" placeholder="Username" />
            <span className="icon">&#128100;</span>
          </div>

          <div className="input-group">
            <input type="password" id="password" placeholder="Password" />
            <span className="icon">&#128274;</span>
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="login-button">Login</button>
        </form>
        <p>
          Don’t have an account? <a href="#register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
