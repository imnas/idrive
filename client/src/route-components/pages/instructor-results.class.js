import React, { Component } from "react";
import Dropdown from "react-dropdown";
import Header from "../includes/header.class";
import "react-dropdown/style.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInstructors } from "../../actions/resultActions";

const distance = ["1 mile", "30 miles", "40 miles"];
const transmission = ["Both", "Automatic", "Manual"];
const gender = ["Any", "Male", "Female"];

export class InstructorResults extends Component {
  constructor() {
    super();
    this.state = {
      zipCode: "",
      gender: "",
      transmission: "",
      distance: "1"
    };
    this.search = this.search.bind(this);
    this.zipCode = this.zipCode.bind(this);
  }

  search() {
    const { gender, transmission, zipCode } = this.state;
    const filterQuery = {
      gender,
      transmission
    };
    this.props.getInstructors(zipCode);
    setTimeout(() => {
      console.log(this.filterFunction(this.props.results.instructors, filterQuery));
    }, 1000);
  }

  zipCode(e) {
    this.setState({
      zipCode: e.target.value
    });
  }

  _onSelectGender = e => {
    if (e.value !== "Any") {
      this.setState({
        gender: e.value.toLowerCase()
      });
    } else {
      this.setState({
        gender: ""
      });
    }
  };

  _onSelectTransmission = e => {
    if (e.value !== "Both") {
      this.setState({
        transmission: e.value.toLowerCase()
      });
    } else {
      this.setState({
        transmission: ""
      });
    }
  };

  _onSelectDistance = e => {
    const value = e.value.split(" ");
    this.setState({
      distance: `${value[0]}`
    });
  };

  filterByGender(array, gender) {
    if (gender !== '') {
      return array.filter(value => {
        return value.gender === gender;
      });
    } else {
      return 'Gender: No results found.';
    }
  }

  filterByTransmission(array, transmission) {
    if (transmission !== '') {
      return array.filter(value => {
        return value.carGearbox === transmission;
      });
    } else {
      return 'Transmission: No results found.';
    }
  }

  filter = (array, query) => {
    if (query.gender === '' && query.transmission === '') {
      // Return the error message
      return 'No results found.';
    } else {
      // Filter by gender
      const genderArray = this.filterByGender(array, query.gender);
      // If a string has not been returned, filter the array by transmission type
      if (typeof genderArray !== 'string' && query.transmission !== '') {
        const resultArray = this.filterByTransmission(genderArray, query.transmission);
        return resultArray;
      } else {
        // Return the error message
        return genderArray;
      }
    }
  };

  filterFunction = (array, query) => {
    if (query.gender !== '' && query.transmission === '') {
      return this.filterByGender(array, query.gender);
    } else if (query.transmission !== '' && query.gender === '') {
      return this.filterByTransmission(array, query.transmission)
    } else if (query.gender !== '' && query.transmission !== '') {
      return this.filter(array, query);
    }
  }

  render() {
    return (
      <div className="resultsWrapper">
        <Header />
        <div className="resultsFilterTopWrap">
          <div className="resultsFilterContainer">
            {this.props.results.loading ? (
              <h4>
                <i className="far fa-search-location" /> Driving instructors
                near:
                <strong>{this.state.zipCode}</strong>
              </h4>
            ) : null}
            <div className="filterOptionsContainer">
              <div className="filterRow">
                <div className="individualFilterContainer">
                  <label>Your Location</label>
                  <input
                    name="zipCode"
                    onChange={this.zipCode}
                    placeholder="SK7 2JE"
                  />
                </div>
                <div className="individualFilterContainer">
                  <label>Search Distance</label>
                  <Dropdown
                    options={distance}
                    onChange={this._onSelectDistance}
                    value={
                      this.state.distance === "1"
                        ? `${this.state.distance} mile`
                        : `${this.state.distance} miles`
                    }
                    placeholder="1 mile"
                  />
                </div>
                <div className="individualFilterContainer">
                  <label>Transmission Type</label>
                  <Dropdown
                    options={transmission}
                    onChange={this._onSelectTransmission}
                    value={`${this.state.transmission
                      .charAt(0)
                      .toUpperCase()}${this.state.transmission.slice(1)}`}
                    placeholder="Both"
                  />
                </div>
                <div className="individualFilterContainer">
                  <label>Instructor Gender</label>
                  <Dropdown
                    options={gender}
                    onChange={this._onSelectGender}
                    value={`${this.state.gender
                      .charAt(0)
                      .toUpperCase()}${this.state.gender.slice(1)}`}
                    placeholder="Any"
                  />
                </div>
                <div className="searchCtaContainerResults">
                  <button type="submit" onClick={this.search}>
                    Update <i class="fas fa-search" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="resultsFilterWrapper">
          {this.props.results.loading ? (
            <div className="resultsLoader">
              <div className="loader">
                <svg
                  className="car"
                  width={102}
                  height={40}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    transform="translate(2 1)"
                    stroke="#ffffff"
                    fill="none"
                    fillRule="evenodd"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      className="car__body"
                      d="M47.293 2.375C52.927.792 54.017.805 54.017.805c2.613-.445 6.838-.337 9.42.237l8.381 1.863c2.59.576 6.164 2.606 7.98 4.531l6.348 6.732 6.245 1.877c3.098.508 5.609 3.431 5.609 6.507v4.206c0 .29-2.536 4.189-5.687 4.189H36.808c-2.655 0-4.34-2.1-3.688-4.67 0 0 3.71-19.944 14.173-23.902zM36.5 15.5h54.01"
                      strokeWidth={3}
                    />
                    <ellipse
                      className="car__wheel--left"
                      strokeWidth="3.2"
                      fill="#0a71dd"
                      cx="83.493"
                      cy="30.25"
                      rx="6.922"
                      ry="6.808"
                    />
                    <ellipse
                      className="car__wheel--right"
                      strokeWidth="3.2"
                      fill="#0a71dd"
                      cx="46.511"
                      cy="30.25"
                      rx="6.922"
                      ry="6.808"
                    />
                    <path
                      className="car__line car__line--top"
                      d="M22.5 16.5H2.475"
                      strokeWidth={3}
                    />
                    <path
                      className="car__line car__line--middle"
                      d="M20.5 23.5H.4755"
                      strokeWidth={3}
                    />
                    <path
                      className="car__line car__line--bottom"
                      d="M25.5 9.5h-19"
                      strokeWidth={3}
                    />
                  </g>
                </svg>
              </div>
              <h5>Hold on for a sec...</h5>
              <p>We're just finding instructors close to you</p>
            </div>
          ) : (
            <div className="noSearchResultsContainer">
              <div>
                <i class="fal fa-map-marker-times" />
                <h4>You haven't entered a postcode yet</h4>
                <p>
                  Please use the location field above and click update to view
                  results
                </p>
              </div>
            </div>
          )}
          <div className="resultsContainer">
            {this.props.results.instructors.map((instructor, index) => {
              return (
                <div key={index} className="individualResultAlt">
                  <div className="instructorProfilePicContainer">
                    <span className="distanceFromLearner">
                      <i class="fas fa-location-circle" /> 3.4 mi
                    </span>
                    <div
                      className="instructorCarContainer"
                      style={{
                        backgroundImage: `url(${instructor.carImage})`
                      }}
                    />
                    <span className="starRatingInstructor">
                      <i class="fas fa-star" />
                      <i class="fas fa-star" />
                      <i class="fas fa-star" />
                      <i class="fas fa-star" />
                      <i class="fas fa-star" />
                    </span>
                  </div>
                  <div className="instructorListingInfoContainer">
                    <div className="vehicleContainer">
                      <h5>{`${instructor.carMake} ${instructor.carModel}`}</h5>
                      <div className="skillsContainer">
                        <span>{instructor.carGearbox}</span>
                        <span>{instructor.carFuel}</span>
                      </div>
                    </div>
                    <span className="costLesson">
                      <span>{instructor.rate}</span> Per lesson
                    </span>
                    <div className="iPICta">
                      <a>Bulk Prices</a>
                      <a>Book Now</a>
                    </div>
                  </div>
                  <div className="instructorProfileInListing">
                    <div>
                      <h4>{instructor.name}</h4>
                      <h6>Driving Instructor</h6>
                    </div>
                    <div>
                      <div
                        className="instructorProfileRound"
                        style={{
                          backgroundImage: `url(${instructor.profilePicture})`
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

InstructorResults.propTypes = {
  getInstructors: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  results: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  results: state.results
});

export default connect(
  mapStateToProps,
  { getInstructors }
)(InstructorResults);
