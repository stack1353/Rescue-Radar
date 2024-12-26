import React from "react";
import { useState } from "react";
import "../css/AnimalRescueLanding.css";
import puppyImage from "../assets/dogs.png";
import dog_icon from "../assets/doglogo.png"
import paw_icon from "../assets/pawlogo.png"
import logo1 from "../assets/logo_transparant.png"
import home_icon from "../assets/homelogo.png"
import HelpAnimal from "./HelpAnimal";
import Rescuer from "./Rescuer";
import dog from "../assets/dog_img1.png"
import bird from "../assets/bird_img1.png"
import snake from "../assets/snake_img1.png"
const AnimalRescueLanding = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRescuerPopupOpen, setIsRescuerPopupOpen] = useState(false);

  return (
    <div className="landing-container">
      <img src={logo1} id="logo1"></img>

      <main className="main">
        <div className="content">
          <h1 className="main-heading">
            Every life matters—rescuing one animal won’t change the world, but it will change the world for that one
            animal. Join us in making a difference, one rescue at a time.
          </h1>
          <p className="subtext">Quest for Animal Rescue and Sanctuary</p>

        </div>
        <div className="buttons">

          {/* Include HelpAnimal and control visibility */ }
          <HelpAnimal 
            isOpen={isPopupOpen}
            onClose={() => setIsPopupOpen(false)}
          />
           <button
        className="action-button"
        onClick={() => setIsRescuerPopupOpen(true)} // Open the popup
      >
        Rescuer Update
      </button>

      {/* Rescuer Popup */}
      <Rescuer
        isOpen={isRescuerPopupOpen} // Pass visibility state
        onClose={() => setIsRescuerPopupOpen(false)} // Close handler
      />
     
        </div>
        {/* <div className="illustration-container">
          <img className="illustration" src="rescue-illustration.png" alt="Animal Rescue Illustration" />
        </div> */}
         
      </main>
      <section className="rescue-section">
      <div className="rescue-left">
        <h1 className="rescue-heading">Pets change our lives.<br /> We're on a quest to change theirs.</h1>
        <p className="rescue-description">
          Quest for Paws Animal Rescue and Sanctuary is a nonprofit organization dedicated to rescuing, fostering, and
          rehoming the abandoned, sick, and injured animals around our city.
        </p>
        <p className="rescue-mission">
          With your help, we hope to make a difference in the lives of these wonderful animals.
        </p>
      </div>
      <div className="rescue-right">
        <img id="rescue-image"
          src={puppyImage}
          alt="Group of rescued puppies" />
      </div>
    </section>
    <section id="how-we-help">
      <h2 id="how-we-help-title">How We Help</h2>
      <div className="help-container">
        {/* Animal Rescue */}
        <div className="help-item" id="animal-rescue">
          <div className="icon-container">
            <img
              src={dog_icon} // Replace with a real image path or SVG
              alt="Animal Rescue Icon"
              className="help-icon"
            />
          </div>
          <h3 className="help-title">Animal Rescue</h3>
          <p className="help-description">
            We go on quests to rescue and recover any dog or cat roaming our streets.
          </p>
        </div>

        {/* Veterinary Services */}
        <div className="help-item" id="veterinary-services">
          <div className="icon-container">
            <img
              src={paw_icon} // Replace with a real image path or SVG
              alt="Veterinary Services Icon"
              className="help-icon"
            />
          </div>
          <h3 className="help-title">Veterinary Services</h3>
          <p className="help-description">
            We provide free veterinary treatment to strays, rescues, and pets.
          </p>
        </div>

        {/* Fostering and Adoption */}
        <div className="help-item" id="fostering-adoption">
          <div className="icon-container">
            <img
            src={home_icon} // Replace with a real image path or SVG
              alt="Fostering and Adoption Icon"
              className="help-icon"
            />
          </div>
          <h3 className="help-title">Fostering and Adoption</h3>
          <p className="help-description">
            We help our rescues find their temporary and forever homes.
          </p>
        </div>
      </div>
    </section>
    <section id="how-you-can-help">
      <div className="help-content">
        <div className="help-images">
          <img
            src={snake} // Replace with the actual image path
            alt="Snake in hand"
            className="help-image"
            id="snake-image"
          />
          <img
            src={bird} // Replace with the actual image path
            alt="Bird in hand"
            className="help-image"
            id="bird-image"
          />
          <img
            src={dog} // Replace with the actual image path
            alt="Rescued dog"
            className="help-image"
            id="dog-image"
          />
        </div>

        <div className="help-text">
          <h2 id="help-title">How You Can Help</h2>
          <p id="help-description">
            You can make a significant impact by reporting sightings of injured
            or distressed animals in your area. Your timely action helps rescuers
            respond quickly and provide the necessary care. You can also spread
            the word to raise awareness within your community, amplifying the
            reach and effectiveness of our efforts. Together, we can create a
            network of compassionate individuals committed to saving lives and
            protecting the vulnerable.
          </p>
          <div className="help-actions">
            <p className="action-item">
              <span className="action-arrow">➝</span> <strong>Donate</strong>
            </p>
            <p className="action-item">
              <span className="action-arrow">➝</span> <strong>Join</strong>
            </p>
            <p className="action-item">
              <span className="action-arrow">➝</span> <strong>Volunteer</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
    </div>
    
  );
};

export default AnimalRescueLanding;
