/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

export class Header extends Component {
  render() {
    return (
      <div
        className={
          this.props.landing ? "universalMenu onLandingMenu" : "universalMenu"
        }
      >
        <div className="uMLeft">
          <NavLink to="/" className="logo">
            <img src={logo} alt="" />
          </NavLink>
          <div className="umLeftMenu">
            <ul>
              <li>
                <a>How it works</a>
              </li>
              <li>
                <a>For Instructors</a>
              </li>
              <li>
                <a>Support</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="umRight">
          <ul>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li className="getStarted">
              <NavLink to="/register">Get Started</NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Header;
