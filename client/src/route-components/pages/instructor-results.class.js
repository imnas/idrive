import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getInstructors } from '../../actions/resultActions';

const distance = ["+ 1 miles", "+ 30 miles", "+ 40 miles"];
const transmission = ["Both", "Automatic", "Manual"];
const gender = ["Any", "Male", "Female"];

const defaultOptionDistance = distance[0];
const defaultOptionTransmission = transmission[0];
const defaultOptionGender = gender[0];

export class InstructorResults extends Component {
  constructor() {
    super();
    this.state = {
      zipCode: "",
      TEMP_DATA: []
    };
    this.search = this.search.bind(this);
    this.zipCode = this.zipCode.bind(this);
  }

  search() {
    this.props.getInstructors(this.state.zipCode);
    // axios
    //   .get(`http://localhost:9000/api/results/${this.state.zipCode}`)
    //   .then(res => this.setState({ TEMP_DATA: res.data }));
  }

  zipCode(e) {
    this.setState({
      zipCode: e.target.value
    });
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
                    onChange={this._onSelect}
                    value={defaultOptionTransmission}
                    placeholder="Automatic"
                  />
                </div>
                <div className="individualFilterContainer">
                  <label>Instructor Gender</label>
                  <Dropdown
                    options={gender}
                    onChange={this._onSelect}
                    value={defaultOptionGender}
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
            {/* {this.state.TEMP_DATA.map((instructor, index) => {
              return (
                <div
                  key={index}
                  className="individualResult"
                  style={{ marginBottom: "1em" }}
                >
                  <div className="iRTop">
                    <div
                      className="profileCarContainer"
                      style={{
                        backgroundImage:
                          "url(" +
                          "https://mydrivinglesson.co.uk/wp-content/uploads/2018/02/gp-pro-pic1-220x220.jpg" +
                          ")"
                      }}
                    />
                    <div className="instructorDetailsContainer">
                      <h4>{instructor.name}</h4>
                      <p>Driving Instructor</p>
                      <div className="skillsContainer">
                        <span>ADI CoP</span>
                        <span>CPD</span>
                        <span>Multilingual</span>
                      </div>
                      <div className="vehicleContainer">
                        <h5>Vehicle</h5>
                        <div className="skillsContainer">
                          <span>Automatic</span>
                          <span>Petrol</span>
                          <span>Saloon</span>
                        </div>
                      </div>
                    </div>
                    <div className="locationDistance">0.3 Miles away</div>
                  </div>
                  <div className="irBot">
                    <div className="instructorCta">
                      <a>Book Now</a>
                    </div>
                    <div className="abilitiesContainer">
                      <h4>
                        <i class="fas fa-hand-holding-magic" /> £10/Lesson
                      </h4>
                      <h4>
                        <i class="fas fa-trophy-alt" /> 100% Success Rate
                      </h4>
                      <h4>
                        <i class="fas fa-car" /> Porsche Panamera
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })} */}

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
}

const mapStateToProps = state => ({
  errors: state.errors,
  results: state.results
});

export default connect(mapStateToProps, { getInstructors })(InstructorResults);
