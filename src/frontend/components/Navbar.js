

import "../css/AnimalRescueLanding.css";
import logo from "../assets/logo.png"
const Navbar =()=>{
    return ( <header className="header">
        
        <img className="logo" src={logo} alt="Animal Rescue Logo" />
        
        <nav className="nav">
          <a href="/">HOME</a>
          <a href="/services">SERVICES</a>
          <a href="#gallery">GALLERY</a>
          <a href="/about">ABOUT US</a>
          <a href="/team">OUR TEAM</a>
         <a href="/login"> RESCUER LOGIN</a>
         </nav>
      </header>)
}
export default Navbar;