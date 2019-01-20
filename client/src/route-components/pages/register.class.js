import React, { Component } from "react";
import Checkbox from "rc-checkbox";
import Header from "../includes/header.class";
import { NavLink } from "react-router-dom";
import "rc-checkbox/assets/index.css";
import axios from 'axios';

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

  testRegister = (e) => {
    e.preventDefault();
    // Change to ref value and put input field values into state
    const newUser = {
      type: 'learner',
      firstName: document.getElementById('inputFirstName').value,
      lastName: document.getElementById('inputLastName').value,
      email: document.getElementById('inputEmail').value,
      postalCode: document.getElementById('inputPostcode').value,
      phone: document.getElementById('inputNumber').value,
      city: document.getElementById('inputCity').value,
      address: document.getElementById('inputAddress').value,
      password: document.getElementById('inputPassword').value,
      confirmPassword: document.getElementById('inputConfirm').value 
    };
    axios.post('http://localhost:9000/api/auth/register', newUser)
      .then(res => res.data)
      .then(data => console.log(data))
      .catch(err => console.log(err));
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
                  <input id="inputFirstName" type="text" class="inputText" required />
                  <span class="floating-label">First Name</span>
                </div>
                <div className="floatingInputContainer">
                  <input id="inputLastName" type="text" class="inputText" required />
                  <span class="floating-label">Last Name</span>
                </div>
              </div>
              <div className="floatingInputContainer">
                <input id="inputEmail" type="text" class="inputText" required />
                <span class="floating-label">Your Email</span>
              </div>
              <div className="dualFloatingInputs">
                <div className="floatingInputContainer">
                  <input id="inputPostcode" type="text" class="inputText" required />
                  <span class="floating-label">Postcode</span>
                </div>
                <div className="floatingInputContainer">
                  <input id="inputNumber" type="text" class="inputText" required />
                  <span class="floating-label">Mobile No.</span>
                </div>
              </div>
              <div className="dualFloatingInputs">
                <div className="floatingInputContainer">
                  <input id="inputCity" type="text" class="inputText" required />
                  <span class="floating-label">City</span>
                </div>
                <div className="floatingInputContainer">
                  <input id="inputAddress" type="text" class="inputText" required />
                  <span class="floating-label">Street Name</span>
                </div>
              </div>
              <div className="dualFloatingInputs">
                <div className="floatingInputContainer">
                  <input id="inputPassword" type="password" class="inputText" required />
                  <span class="floating-label">Password</span>
                </div>
                <div className="floatingInputContainer">
                  <input id="inputConfirm" type="password" class="inputText" required />
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
                <button onClick={this.testRegister}>Sign up</button>
                <NavLink to="/login">Already have an account</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
