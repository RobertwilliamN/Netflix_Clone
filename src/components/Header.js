import React from "react";
import "./Header.css";
import Logo from '../Image/Logo.png';
import user from '../Image/user.jpg';

export default ({black}) => {
   return (
    <header className={black ? "black" : ''}>
        <div className="header--logo">
            <a href="/">
                <img src={Logo} alt="Netflix"/>
            </a>
        </div>

        <div className="header--user">
            <a href="/">
                <img src={user} alt="Usuário"/>
            </a>
        </div>
    </header>
   ) 
}
