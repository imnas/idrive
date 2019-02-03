import React, { Component } from "react";
import Checkbox from "rc-checkbox";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import Header from "../includes/header.class";
import { NavLink } from "react-router-dom";
import "rc-checkbox/assets/index.css";

export default class InstructorRegister extends Component {
  constructor() {
    super();
    this.state = { myDevice: "" };
  }

  myDevice = e => {
    if (e.target.checked) {
      this.setState({
        myDevice: e.target.value
      });
    } else {
      this.setState({
        myDevice: ""
      });
    }
  };

  render() {
    return (
      <div>
        <Header />
        <div class="formContainerExternal">
          <div className="formContainer registerForm">
            <h2>Congratulations John!</h2>
            <h4>You're only a minute away from getting signed up!</h4>
            <form>
              <div className="sectionBlocksQuestion">
                <div className="sectionBlockHeader">
                  <h4>Devices</h4>
                </div>
                <div className="sectionBlockBody">
                  <h5>I own an</h5>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox onChange={this.myDevice} value={"iPhone"} />
                        &nbsp;&nbsp;&nbsp; iPhone
                      </label>
                    </p>
                  </div>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox onChange={this.myDevice} value={"Android"} />
                        &nbsp;&nbsp;&nbsp; Android
                      </label>
                    </p>
                  </div>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox
                          onChange={this.myDevice}
                          value={"Other Smartphone"}
                        />
                        &nbsp;&nbsp;&nbsp; Other Smartphone
                      </label>
                    </p>
                  </div>
                </div>
              </div>

              <div className="sectionBlocksQuestion">
                <div className="sectionBlockHeader">
                  <h4>Your experience</h4>
                </div>
                <div className="sectionBlockBody">
                  <h5>Work history</h5>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox />
                        &nbsp;&nbsp;&nbsp; Independend Instructor
                      </label>
                    </p>
                  </div>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox />
                        &nbsp;&nbsp;&nbsp; Franchise Instructor
                      </label>
                    </p>
                  </div>
                  <div
                    className="floatingInputContainer"
                    style={{ margin: "25px 0 0 0" }}
                  >
                    <input
                      onChange={this.onChange}
                      name="firstName"
                      type="text"
                      class="inputText"
                      required
                    />
                    <span class="floating-label">Years as a instructor</span>
                  </div>
                  <h5>Certifications</h5>
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
                <button>Apply</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
