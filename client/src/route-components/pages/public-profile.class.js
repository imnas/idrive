import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import Header from "../includes/header.class";

export class PublicProfile extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="publicProfile">
        <Header />
        <div className="publicProfileContainer">
          <div className="pProfileLeft">
            <div
              className="actualProfilePicture"
              style={{
                backgroundImage: `url('https://cdn.images.express.co.uk/img/dynamic/24/590x/VW-Golf-GTI-2017-761719.jpg')`
              }}
            />
            <a>Book John</a>
            <div className="repContainer">
              <span className="starRatingInstructor">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
              </span>
              <small>(834 ratings)</small>
              <div className="qualContainer">
                <div>
                  <i className="far fa-check-circle" /> 315 years professional
                  experience
                </div>
                <div>
                  <i className="far fa-check-circle" /> 65265 completed bookings
                </div>
                <div>
                  <i className="far fa-check-circle" /> Active since June 1066
                </div>
              </div>
            </div>
            <div className="qualificationsContainer">
              <div className="qualContainer">
                <div>
                  <i className="far fa-check-circle" /> AoD Certified
                </div>
                <div>
                  <i className="far fa-check-circle" /> Driver of the century
                </div>
              </div>
            </div>
          </div>
          <div className="pProfileRight">
            <h4>Johns Driving School, Greater Manchester | InstantDriving</h4>
            <small>John Madman</small>
            <p>
              My primary concern though is to develop safe and confident
              drivers. It’s a well known fact that a highly disproportionate
              number of newly qualified drivers are involved in accidents.
              Therefore my teaching methods are not only geared to my pupils
              passing their test first time, but to also be equipped with the
              skills required to drive their car safely during the years ahead.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PublicProfile);
