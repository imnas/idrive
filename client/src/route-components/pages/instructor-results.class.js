import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInstructors } from "../../actions/resultActions";

const distance = ["+ 1 miles", "+ 30 miles", "+ 40 miles"];
const transmission = ["Both", "Automatic", "Manual"];
const gender = ["Any", "Male", "Female"];

const defaultOptionDistance = distance[0];

export class InstructorResults extends Component {
  constructor() {
    super();
    this.state = {
      zipCode: "",
      gender: "",
      transmission: ""
    };
    this.search = this.search.bind(this);
    this.zipCode = this.zipCode.bind(this);
    this._onSelectGender = this._onSelectGender.bind(this);
    this._onSelectTransmission = this._onSelectTransmission.bind(this);
  }

  search() {
    const { gender, transmission, zipCode } = this.state;
    if (gender.length > 0 || transmission.length > 0) {
      const query = {
        gender: gender.toLowerCase(),
        transmissionTypes: transmission.toLowerCase()
      };
      this.props.getInstructors(zipCode, query);
    }
    this.props.getInstructors(zipCode);
  }

  zipCode(e) {
    this.setState({
      zipCode: e.target.value
    });
  }

  _onSelectGender = (e) => {
    if (e.value !== 'Any') {
      this.setState({
        gender: e.value
      });
    } else {
      this.setState({
        gender: ''
      });
    }
  }

  _onSelectTransmission = (e) => {
    if (e.value !== 'Both') {
      this.setState({
        transmission: e.value
      });
    } else {
      this.setState({
        transmission: ''
      });
    }
  }

  render() {
    return (
      <div className="resultsWrapper">
        <div className="resultsFilterTopWrap">
          <div className="resultsFilterContainer">
            <h4>
              <i className="far fa-search-location" /> Driving instructors near:
              <strong>{this.state.zipCode}</strong>
            </h4>
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
                    onChange={this._onSelect}
                    value={defaultOptionDistance}
                    placeholder="+ 1 miles"
                  />
                </div>
                <div className="individualFilterContainer">
                  <label>Transmission Type</label>
                  <Dropdown
                    options={transmission}
                    onChange={this._onSelectTransmission}
                    value={this.state.transmission}
                    placeholder="Both"
                  />
                </div>
                <div className="individualFilterContainer">
                  <label>Instructor Gender</label>
                  <Dropdown
                    options={gender}
                    onChange={this._onSelectGender}
                    value={this.state.gender}
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
