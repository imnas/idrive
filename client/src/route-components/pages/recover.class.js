import React, { Component } from "react";
import Checkbox from "rc-checkbox";
import Header from "../includes/header.class";
import { NavLink } from "react-router-dom";
import "rc-checkbox/assets/index.css";

export default class Recover extends Component {
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
          <div className="formContainer recoverForm">
            <h2>
              Passwords can get hard to remember, that's why we recommend
              lastpass
            </h2>
            <h4>Enter your email below to regain access to your account</h4>
            <form>
              <div className="floatingInputContainer">
                <input type="text" class="inputText" required />
                <span class="floating-label">Your Registered Email</span>
              </div>
              <div className="formCta">
                <button>Recover now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
