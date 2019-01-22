import React, { Component } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from 'axios';

const distance = ["+ 1 miles", "+ 30 miles", "+ 40 miles"];
const transmission = ["Both", "Automatic", "Manual"];
const gender = ["Any", "Male", "Female"];

const defaultOptionDistance = distance[0];
const defaultOptionTransmission = transmission[0];
const defaultOptionGender = gender[0];

export class InstructorResults extends Component {
  
  search() {
    const zipCode = document.getElementById('testingZipCode').value;
    const url = `http://localhost:9000/api/results/${zipCode}`;
    axios.get(url)
      .then(res => console.log(res.data));
  }

  render() {
    return (
      <div className="resultsWrapper">
        <div className="resultsFilterTopWrap">
          <div className="resultsFilterContainer">
            <h4>
              <i className="far fa-search-location" /> Driving instructors near
              <strong>12345</strong>
            </h4>
            <div className="filterOptionsContainer">
              <div className="filterRow">
                <div className="individualFilterContainer">
                  <label>Your Location</label>
                  <input id="testingZipCode" value="12345" />
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
            <div>xxx</div>
          </div>
        </div>
      </div>
    );
  }
}

export default InstructorResults;
