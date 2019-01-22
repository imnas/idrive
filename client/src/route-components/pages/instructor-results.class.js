import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";

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
      zipCode: ""
    };
    this.search = this.search.bind(this);
    this.zipCode = this.zipCode.bind(this);
  }

  // @TODO: Output the data instead of logging it
  search() {
    setAuthToken(localStorage.jwt);
    axios
      .get(`http://localhost:9000/api/results/${this.state.zipCode}`)
      .then(res => console.log(res.data));
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
                  <input name="zipCode" onChange={this.zipCode} />
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
            <div className="individualResult">
              <div className="iRTop">
                <div
                  className="profileCarContainer"
                  style={{
                    backgroundImage:
                      "url(" + "https://i.imgur.com/DPLaNh0.jpg" + ")"
                  }}
                />
                <div className="instructorDetailsContainer">
                  <h4>Antonio Banderas</h4>
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
          </div>
        </div>
      </div>
    );
  }
}

export default InstructorResults;
