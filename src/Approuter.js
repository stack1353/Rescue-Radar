import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimalRescueLanding from "./frontend/components/AnimalRescueLanding";
import Login from "./frontend/components/Login";
import ServicePage from "./frontend/components/ServicePage";
import AboutUsPage from "./frontend/components/AboutUsPage";
import Register from "./frontend/components/Register";
import RescuerPage from "./frontend/components/RescuerPage"
import TeamPage from "./frontend/components/TeamPage";
// import About from "./About";
// import Services from "./Services";
// import Gallery from "./Gallery";

 
const Approuter = () => {      
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnimalRescueLanding />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/team" element={<TeamPage/>}/>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
  );
};

export default Approuter;
