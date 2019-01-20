import React, { Component } from "react";
import Checkbox from "rc-checkbox";
import Header from "../includes/header.class";
import { NavLink } from "react-router-dom";
import "rc-checkbox/assets/index.css";

export default class Register extends Component {
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
      <div>
        <Header />
        <div class="formContainerExternal">
          <div className="formContainer registerForm">
            <h2>
              Together we are creating a revolution for the driving industry
            </h2>
            <h4>Hey, register and get your first lesson absolutely free!</h4>
            <form>
              <div className="dualFloatingInputs">
                <div className="floatingInputContainer">
                  <input type="text" class="inputText" required />
                  <span class="floating-label">First Name</span>
                </div>
                <div className="floatingInputContainer">
                  <input type="text" class="inputText" required />
                  <span class="floating-label">Last Name</span>
                </div>
              </div>
              <div className="floatingInputContainer">
                <input type="text" class="inputText" required />
                <span class="floating-label">Your Email</span>
              </div>
              <div className="dualFloatingInputs">
                <div className="floatingInputContainer">
                  <input type="text" class="inputText" required />
                  <span class="floating-label">Postcode</span>
                </div>
                <div className="floatingInputContainer">
                  <input type="text" class="inputText" required />
                  <span class="floating-label">Mobile No.</span>
                </div>
              </div>
              <div className="dualFloatingInputs">
                <div className="floatingInputContainer">
                  <input type="password" class="inputText" required />
                  <span class="floating-label">Password</span>
                </div>
                <div className="floatingInputContainer">
                  <input type="password" class="inputText" required />
                  <span class="floating-label">Confirm Password</span>
                </div>
              </div>
              <div className="formLinks">
                <p>
                  <label>
                    <Checkbox />
                    &nbsp;&nbsp;&nbsp; By creating an account, I accept the
                    terms and conditions
                  </label>
                </p>
              </div>
              <div className="formCta">
                <button>Sign up</button>
                <NavLink to="/login">Already have an account</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
