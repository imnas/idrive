import React, { Component } from "react";
import Checkbox from "rc-checkbox";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import Header from "../includes/header.class";
import { NavLink } from "react-router-dom";
import "rc-checkbox/assets/index.css";

export default class InstructorRegister extends Component {
  constructor() {
    super();
    this.state = { gender: "" };
  }

  componentDidMount = () => {
    document.title = 'InstantDriving - Profile'; 
  }

  gender = e => {
    if (e.target.checked) {
      this.setState({
        gender: e.target.value
      });
    } else {
      this.setState({
        gender: ""
      });
    }
  };

  addProfile = () => {
    const data = {};
    console.log(data);
  }

  render() {
    return (
      <div>
        <Header />
        <div class="formContainerExternal">
          <div className="formContainer registerForm">
            <h2>Congratulations newUser.firstName!</h2>
            <h4>You're only a minute away from getting signed up!</h4>
            <form>
              <div className="sectionBlocksQuestion">
                <div className="sectionBlockHeader">
                  <h4>Gender:</h4>
                </div>
                <div className="sectionBlockBody">
                  <h5>I am</h5>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox onChange={this.gender} value={"Male"} />
                        &nbsp;&nbsp;&nbsp; Male
                      </label>
                    </p>
                  </div>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox onChange={this.gender} value={"Female"} />
                        &nbsp;&nbsp;&nbsp; Female
                      </label>
                    </p>
                  </div>
                </div>
              </div>

              <div className="sectionBlocksQuestion">
                <div className="sectionBlockHeader">
                  <h4>Your experience:</h4>
                </div>
                <div className="sectionBlockBody">
                  <div
                    className="floatingInputContainer"
                    style={{ margin: "25px 0 0 0" }}
                  >
                    <input
                      onChange={this.onChange}
                      name="firstName"
                      type="number"
                      class="inputText"
                      required
                    />
                    <span class="floating-label">Years as a instructor:</span>
                  </div>
                  <h5>Certifications:</h5>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox />
                        &nbsp;&nbsp;&nbsp; ADI CoP ( Approved Driving Instructor
                        )
                      </label>
                    </p>
                  </div>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox />
                        &nbsp;&nbsp;&nbsp; CPD ( Continued Professional
                        Development )
                      </label>
                    </p>
                  </div>
                  <h5>Transmission Types:</h5>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox />
                        &nbsp;&nbsp;&nbsp; Manual
                      </label>
                    </p>
                  </div>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox />
                        &nbsp;&nbsp;&nbsp; Automatic
                      </label>
                    </p>
                  </div>
                </div>
              </div>

              <div className="sectionBlocksQuestion">
                <div className="sectionBlockHeader">
                  <h4>Your business</h4>
                </div>
                <div className="sectionBlockBody">
                  <div className="floatingInputContainer">
                    <input
                      onChange={this.onChange}
                      name="firstName"
                      type="text"
                      class="inputText"
                      required
                    />
                    <span class="floating-label">Business website address</span>
                  </div>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox />
                        &nbsp;&nbsp;&nbsp; I don't have a website
                      </label>
                    </p>
                  </div>
                  <h5>Do you hold public liability insurance?</h5>

                  <RadioGroup
                    className="radiosContainers"
                    onChange={this.onChange}
                    horizontal
                  >
                    <RadioButton
                      value="Yes"
                      iconSize={20}
                      pointColor={"#0a71dd"}
                      rootColor={"#e8eaf0"}
                    >
                      Yes
                    </RadioButton>
                    <RadioButton
                      value="No"
                      iconSize={20}
                      pointColor={"#0a71dd"}
                      rootColor={"#e8eaf0"}
                    >
                      No
                    </RadioButton>
                    <RadioButton
                      value="Unsure"
                      iconSize={20}
                      pointColor={"#0a71dd"}
                      rootColor={"#e8eaf0"}
                    >
                      Unsure
                    </RadioButton>
                  </RadioGroup>

                  <h5>Are you VAT registered?</h5>
                  <RadioGroup
                    className="radiosContainers"
                    onChange={this.onChange}
                    horizontal
                  >
                    <RadioButton
                      value="Yes"
                      iconSize={20}
                      pointColor={"#0a71dd"}
                      rootColor={"#e8eaf0"}
                    >
                      Yes
                    </RadioButton>
                    <RadioButton
                      value="No"
                      iconSize={20}
                      pointColor={"#0a71dd"}
                      rootColor={"#e8eaf0"}
                    >
                      No
                    </RadioButton>
                    <RadioButton
                      value="Unsure"
                      iconSize={20}
                      pointColor={"#0a71dd"}
                      rootColor={"#e8eaf0"}
                    >
                      Unsure
                    </RadioButton>
                  </RadioGroup>
                  <h5>
                    What kind of services do you offer? (tick all that apply)
                  </h5>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox />
                        &nbsp;&nbsp;&nbsp; Pickup and dropoff
                      </label>
                    </p>
                  </div>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox />
                        &nbsp;&nbsp;&nbsp; Pass plus
                      </label>
                    </p>
                  </div>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox />
                        &nbsp;&nbsp;&nbsp; Car hire for test
                      </label>
                    </p>
                  </div>
                </div>
              </div>

              <div className="formCta">
                <button onClick={this.addProfile}>Apply</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
