import React, { Component } from "react";
import Checkbox from "rc-checkbox";
import Header from "../includes/header.class";
import { NavLink } from "react-router-dom";
import "rc-checkbox/assets/index.css";
import axios from 'axios';

export default class Login extends Component {
  constructor() {
    super();
    this.state = { disabled: false };
  }

  toggle = () => {
    this.setState(state => ({
      disabled: !state.disabled
    }));
  };

  testLogin = (e) => {
    e.preventDefault();
    // Change to ref value and put input field values into state
    const newUser = {
      email: document.getElementById('inputEmail').value,
      password: document.getElementById('inputPassword').value, 
    };
    axios.post('http://localhost:9000/api/auth/login', newUser)
      .then(res => res.data)
      .then(data => {
        localStorage.setItem('token', data.token);
        if(localStorage.token) {
          console.log('Logged In!');
        }
      })
      .catch(err => console.log(err));
    };

  render() {
    return (
      <div className="formsWrapper">
        <Header />
        <div className="formContainerExternal">
          <div className="formContainer loginForm">
            <h2>
              Together we are creating a revolution for the driving industry
            </h2>
            <h4>Welcome back, Please login to your account</h4>
            <form>
              <div className="floatingInputContainer">
                <input id="inputEmail" type="text" className="inputText" required />
                <span className="floating-label">Your Email</span>
              </div>
              <div className="floatingInputContainer">
                <input id="inputPassword" type="password" className="inputText" required />
                <span className="floating-label">Your Password</span>
              </div>
              <div className="formLinks">
                <p>
                  <label>
                    <Checkbox />
                    &nbsp;&nbsp;&nbsp; Remember me
                  </label>
                </p>
                <NavLink to="/recover">Forgot Password?</NavLink>
              </div>
              <div className="formCta">
                <button onClick={this.testLogin}>Login</button>
                <NavLink to="/signup">Sign Up</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
