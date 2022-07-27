import React from "react";
import {NavLink} from 'react-router-dom';

function LeftNav() {
  return (
<div className="left-nav-container">
  <div className="icons">
    <div className="icons-bis">
      <NavLink to="/" exact activeClassName="active-left-nav" >
        <img src="./img/icons/home.svg" alt="Accueil" />
      </NavLink>
      <NavLink to="/profil" exact activeClassName="active-left-nav" >
        <img src="./img/icons/user.svg" alt="Profil utilisateur" />
      </NavLink>
    </div>
  </div>
</div>
    )
}
export default LeftNav