import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnimalRescueLanding from "./components/AnimalRescueLanding";
import Login from "./components/Login";

// import About from "./About";
// import Services from "./Services";
// import Gallery from "./Gallery";
// import Team from "./Team";

const Approuter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnimalRescueLanding />} />
        {/* <Route path="" element={<About />} />
        <Route path="" element={<Services />} />
        <Route path="" element={<Gallery />} />
        <Route path="" element={<Team />} /> */}
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </Router>
  );
};

export default Approuter;
