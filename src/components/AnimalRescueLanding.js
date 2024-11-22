import React from "react";
import "../css/AnimalRescueLanding.css";
import logo from "../assets/logo.png"
import logo1 from "../assets/logo_transparant.png"
const AnimalRescueLanding = () => {
  return (
    <div className="landing-container">
       <img src={logo1}  id="logo1"></img>

      <main className="main">
        <div className="content">
          <h1 className="main-heading">
            Every life matters—rescuing one animal won’t change the world, but it will change the world for that one
            animal. Join us in making a difference, one rescue at a time.
          </h1>
          <p className="subtext">Quest for Animal Rescue and Sanctuary</p>
          
        </div>
        <div className="buttons">
            <button className="action-button">Help Animal Now</button>
            <button className="action-button">Rescuer</button>
          </div>
        {/* <div className="illustration-container">
          <img className="illustration" src="rescue-illustration.png" alt="Animal Rescue Illustration" />
        </div> */}
      </main>
    </div>
  );
};

export default AnimalRescueLanding;
