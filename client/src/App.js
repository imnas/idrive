import React, { Component } from "react";
import { connect } from "react-redux";
import { simpleAction } from "./actions/simpleAction";

import bg from "./assets/bg.png";
import bgBot from "./assets/bgBot.png";
import logo from "./assets/logo.png";

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

class App extends Component {
  simpleAction = event => {
    this.props.simpleAction();
  };
  render() {
    return (
      <div className="appContainer">
        <div className="homeHeader">
          <div className="universalMenu">
            <div className="uMLeft">
              <a className="logo">
                <img src={logo} />
              </a>
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
                  <a>Login</a>
                </li>
                <li className="getStarted">
                  <a>Get Started</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="headerBodyContainer">
            <div>
              <h1>
                Book your driving lesson <strong>in the next 2 minutes</strong>
              </h1>
              <ul>
                <li>
                  <i className="fal fa-check" /> Choose from over 64,000 cars
                </li>
                <li>
                  <i className="fal fa-check" /> Book lessons from anywhere in
                  the UK
                </li>
                <li>
                  <i className="fal fa-check" /> Select your instructor easily
                  by checking pass rates
                </li>
              </ul>
              <div className="ctaFormContainer">
                <form className="homeCtaLocator">
                  <div>
                    <input placeholder="Your Postcode e.g. (LS15 8ZG)" />
                    <button>
                      <i className="far fa-search-location" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <img className="bgImageHome" src={bg} />
        </div>
        <div className="bgImageBotContainer">
          <img className="bgImageBot" src={bgBot} />
          <div className="featuresContainerBlocks">
            <div>
              <i class="fal fa-file-certificate" />
              <h5>100% Pass Rate</h5>
            </div>
            <div>
              <i class="fal fa-car" />
              <h5>Learn in any car</h5>
            </div>
            <div>
              <i class="fal fa-chalkboard-teacher" />
              <h5>Trusted teachers</h5>
            </div>
            <div>
              <i class="fal fa-smile" />
              <h5>Highly rated</h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
