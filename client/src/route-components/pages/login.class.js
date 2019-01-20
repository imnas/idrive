import React, { Component } from "react";
import Checkbox from "rc-checkbox";
import Header from "../includes/header.class";
import { NavLink } from "react-router-dom";
import "rc-checkbox/assets/index.css";

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
  render() {
    return (
      <div className="formsWrapper">
        <Header />
        <div class="formContainerExternal">
          <div className="formContainer loginForm">
            <h2>
              Together we are creating a revolution for the driving industry
            </h2>
            <h4>Welcome back, Please login to your account</h4>
            <form>
              <div className="floatingInputContainer">
                <input type="text" class="inputText" required />
                <span class="floating-label">Your Email</span>
              </div>
              <div className="floatingInputContainer">
                <input type="password" class="inputText" required />
                <span class="floating-label">Your Password</span>
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
                <button>Login</button>
                <NavLink to="/signup">Sign Up</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
