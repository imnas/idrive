import React, { Component } from "react";
import Header from "../includes/header.class";
import Footer from "../includes/footer.class";
import bg from "../../assets/bg.png";
import bgBot from "../../assets/bgBot.png";

export default class Landing extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="homeContainer">
        <div className="homeHeader">
          <Header landing={true} />
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
              <span className="abShape" />
              <i class="fal fa-file-certificate" />
              <h5>100% Pass Rate</h5>
            </div>
            <div>
              <span className="abShape" />
              <i class="fal fa-car-bump" />
              <h5>Learn in any car</h5>
            </div>
            <div>
              <span className="abShape" />
              <i class="fal fa-chalkboard-teacher" />
              <h5>Trusted teachers</h5>
            </div>
            <div>
              <span className="abShape" />
              <i class="fal fa-star-half-alt" />
              <h5>Highly rated</h5>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
