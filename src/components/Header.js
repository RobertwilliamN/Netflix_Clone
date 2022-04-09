import React from "react";
import "./Header.css";
import Logo from '../Image/Logo.png';

export default () => {
   return (
    <header>
        <div className="header--logo">
            <a href="/">
                <img src={Logo} alt="Netflix"/>
            </a>
        </div>
    </header>
   ) 
}
