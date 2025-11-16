import "./App.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "./SoundPound.png"

function LandingPage(){

  const navigate = useNavigate();

return (
    <div className="landingPage">
<div className="card">
     <img src={logoImage} alt="Logo" className="logo" />
            <h1>Green finance loan Credit union finder</h1>
    <div className="optionsContainer">
        
        <div className="methodContainer">
            <Link to="/payroll" className="nav-button">
            Payroll
            </Link>
            <p className="payroll-explanation">If your employer already works with a SoundPound credit union that provides green finance loans select them from the list below to check. </p>
        </div>
        <div className="methodContainer">
            <Link to="postcode" className="nav-button">
            Direct
            </Link>

        <p className="direct-explanation">Search based on either your own, or your employment postcode and see if any eligible credit unions cover the area.</p>
        </div>
    </div>
</div>
</div>
)
}

export default LandingPage