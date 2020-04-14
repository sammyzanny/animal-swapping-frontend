import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  
  const style = {
    width: '100px',
    height: '80',
    padding: '12px',
    margin: '0 6px 6px',
    background: 'red',
    border: '2px solid red',
    borderRadius: '0 0 15px 15px',
    textDecoration: 'white wavy underline',
    fontFamily: 'Impact, Charcoal, sans-serif',
    color: 'white',
    textAlign: 'center'
  }

  const activeStyle = {
    background: 'white',
    color: 'red',
    textDecoration: 'red wavy underline'
  }
  
if (props.currentUser){
  return <div className="navbar">
    <NavLink
      to="/"
      exact
      style={style}
      activeStyle={activeStyle}
    >Home </NavLink>
    <NavLink
      to={`/profile/${props.currentUser.username}`}
      exact
      style={style}
      activeStyle={activeStyle}
    >Your Profile </NavLink>
    <NavLink
      to="/items"
      exact
      style={style}
      activeStyle={activeStyle}
    >Items </NavLink>
    <NavLink
      to="/custom-items"
      exact
      style={style}
      activeStyle={activeStyle}
    >Custom Items </NavLink>
    <NavLink
      to="/create-custom-item"
      exact
      style={style}

      activeStyle={activeStyle}
    >Create Custom Item </NavLink>
    </div>;
  } else 
return <div className="navbar">
  <NavLink
    to="/login"
    exact
    style={style}
    activeStyle={activeStyle}
  >Log In </NavLink>
  <NavLink
    to="/sign-up"
    exact
    style={style}
    activeStyle={activeStyle}
  >Sign Up </NavLink>
  </div>;
}

export default NavBar;
