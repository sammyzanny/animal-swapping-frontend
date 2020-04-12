import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  
  const style = {
    width: '100px',
    padding: '12px',
    margin: '0 6px 6px',
    background: 'blue',
    textDecoration: 'none',
    color: 'white',
  }
  
if (props.currentUser){
  return <div className="navbar">
    <NavLink
      to="/"
      exact
      style={style}
      activeStyle={{
        background: 'darkblue'
      }}
    >Home</NavLink>
    <NavLink
      to={`/profile/${props.currentUser.username}`}
      exact
      style={style}
      activeStyle={{
        background: 'darkblue'
      }}
    >Your Profile</NavLink>
    <NavLink
      to="/items"
      exact
      style={style}
      activeStyle={{
        background: 'darkblue'
      }}
    >Items</NavLink>
    <NavLink
      to="/custom-items"
      exact
      style={style}
      activeStyle={{
        background: 'darkblue'
      }}
    >Custom Items</NavLink>
    <NavLink
      to="/create-custom-item"
      exact
      style={style}

      activeStyle={{
        background: 'darkblue'
      }}
    >Create Custom Item</NavLink>
    </div>;
  } else 
return <div className="navbar">
  <NavLink
    to="/login"
    exact
    style={style}
    activeStyle={{
      background: 'darkblue'
    }}
  >Log In</NavLink>
  <NavLink
    to="/sign-up"
    exact
    style={style}
    activeStyle={{
      background: 'darkblue'
    }}
  >Sign Up</NavLink>
  </div>;
}

export default NavBar;
