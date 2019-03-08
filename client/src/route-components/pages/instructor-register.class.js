import React, { Component } from "react";
import Checkbox from "rc-checkbox";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import Header from "../includes/header.class";
import "rc-checkbox/assets/index.css";
import axios from "axios";

export default class InstructorRegister extends Component {
  constructor() {
    super();
    this.state = {
      gender: "",
      experience: "",
      adiHook: false,
      cpdHook: false,
      adi: '',
      cpd: '',
      manual: false,
      automatic: false,
      website: '',
      liabilityInsurance: false,
      vatRegistered: false,
      pickupAndDropoff: false,
      passPlus: false,
      carHireForTest: false,
      make: '',
      model: '',
      year: NaN,
      registration: '',
      gearbox: '',
      fuel: '',
      profilePicture: "",
      image: ""
    };
  }

  componentDidMount = () => {
    document.title = "InstantDriving - Profile";
  };

  onChangeGender = e => {
    this.setState({
      gender: e.toLowerCase()
    });
  }

  onChangeLiability = e => {
    this.setState({
      liabilityInsurance: e.toLowerCase()
    });
  }

  onChangeVatRegistered = e => {
    this.setState({
      vatRegistered: e.toLowerCase()
    });
  }

  onChangeGearbox = e => {
    this.setState({
      gearbox: e.toLowerCase()
    });
  }

  onChangeFuelType = e => {
    this.setState({
      fuel: e.toLowerCase()
    });
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onClick = e => {
    const value = this.state[e.target.name]
    this.setState({
      [e.target.name]: !value
    });
  };

  uploadProfilePicture = () => {
    const image = document.getElementById('fileUploadProfile');
    let newImage = new FormData();
    newImage.append('file', image.files[0]);
    axios.post('http://localhost:9000/api/fs/upload', newImage, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(res => res.data)
      .then(data => this.setState({ profilePicture: data.file }))
      .catch(err => console.log(err));
  };

  uploadAdiPicture = () => {
    const image = document.getElementById('fileUploadAdi');
    let newImage = new FormData();
    newImage.append('file', image.files[0]);
    axios.post('http://localhost:9000/api/fs/upload', newImage, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(res => res.data)
      .then(data => this.setState({ adi: data.file }))
      .catch(err => console.log(err));
  };

  uploadCpdPicture = () => {
    const image = document.getElementById('fileUploadCpd');
    let newImage = new FormData();
    newImage.append('file', image.files[0]);
    axios.post('http://localhost:9000/api/fs/upload', newImage, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(res => res.data)
      .then(data => this.setState({ cpd: data.file }))
      .catch(err => console.log(err));
  };

  uploadCarPicture = () => {
    const image = document.getElementById('fileUploadCar');
    let newImage = new FormData();
    newImage.append('file', image.files[0]);
    axios.post('http://localhost:9000/api/fs/upload', newImage, { headers: { 'Content-Type': 'multipart/form-data' } })
      .then(res => res.data)
      .then(data => this.setState({ image: data.file }))
      .catch(err => console.log(err));
  };

  addProfile = () => {
    // https://www.youtube.com/watch?v=xLxHtBt2jtU
  };

  render() {
    return (
      <div>
        <Header />
        <div class="formContainerExternal">
          <div className="formContainer registerForm">
            <h2>Congratulations newUser.firstName!</h2>
            <h4>You're only a minute away from getting signed up!</h4>
            <div className="sectionBlocksQuestion" style={{ marginBottom: '25px' }}>
              <div className="sectionBlockHeader">
                <h4>Profile Picture:</h4>
              </div>
              <div className="sectionBlockHeader">
                <input type="file" className="custom-file-input" name="file" id="fileUploadProfile" />
                <form onSubmit={e => e.preventDefault()}>
                  <div className="formCta">
                    <button onClick={this.uploadProfilePicture}>Confirm Image Upload</button>
                  </div>
                </form>
              </div>
            </div>
            <form>
              <div className="sectionBlocksQuestion">
                <div className="sectionBlockHeader">
                  <h4 style={{ margin: '0' }}>Gender:</h4>
                </div>
                <div className="sectionBlockBody">
                  <div className="formLinks" style={{ marginTop: '0' }}>
                    <RadioGroup
                      className="radiosContainers"
                      onChange={this.onChangeGender}
                      horizontal
                      name="gender"
                    >
                      <RadioButton
                        value="Male"
                        iconSize={20}
                        pointColor={"#0a71dd"}
                        rootColor={"#e8eaf0"}
                      >
                        Male
                    </RadioButton>
                      <RadioButton
                        value="Female"
                        iconSize={20}
                        pointColor={"#0a71dd"}
                        rootColor={"#e8eaf0"}
                      >
                        Female
                    </RadioButton>
                    </RadioGroup>
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
                      name="experience"
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
                        <Checkbox name="adiHook" onClick={this.onClick} />
                        &nbsp;&nbsp;&nbsp; ADI CoP ( Approved Driving Instructor
                        )
                      </label>
                    </p>
                  </div>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox name="cpdHook" onClick={this.onClick} />
                        &nbsp;&nbsp;&nbsp; CPD ( Continued Professional
                        Development )
                      </label>
                    </p>
                  </div>
                  <h5>Transmission Types:</h5>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox name="manual" onClick={this.onClick} />
                        &nbsp;&nbsp;&nbsp; Manual
                      </label>
                    </p>
                  </div>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox name="automatic" onClick={this.onClick} />
                        &nbsp;&nbsp;&nbsp; Automatic
                      </label>
                    </p>
                  </div>
                </div>
              </div>

              <div className="sectionBlocksQuestion" style={{ marginBottom: '25px', display: this.state.adiHook ? 'block' : 'none' }}>
                <div className="sectionBlockHeader">
                  <h4>ADI Certification:</h4>
                </div>
                <div className="sectionBlockHeader">
                  <h5 style={{ marginBottom: '25px' }}>Please provide a picture of the certificate for validation.</h5>
                  <input type="file" className="custom-file-input" name="file" id="fileUploadAdi" />
                  <form onSubmit={e => e.preventDefault()}>
                    <div className="formCta">
                      <button onClick={this.uploadAdiPicture}>Confirm Image Upload</button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="sectionBlocksQuestion" style={{ marginBottom: '25px', display: this.state.cpdHook ? 'block' : 'none' }}>
                <div className="sectionBlockHeader">
                  <h4>CPD Certification:</h4>
                </div>
                <div className="sectionBlockHeader">
                  <h5 style={{ marginBottom: '25px' }}>Please provide a picture of the certificate for validation.</h5>
                  <input type="file" className="custom-file-input" name="file" id="fileUploadCpd" />
                  <form onSubmit={e => e.preventDefault()}>
                    <div className="formCta">
                      <button onClick={this.uploadCpdPicture}>Confirm Image Upload</button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="sectionBlocksQuestion">
                <div className="sectionBlockHeader">
                  <h4>Your business:</h4>
                </div>
                <div className="sectionBlockBody">
                  <div className="floatingInputContainer">
                    <input
                      onChange={this.onChange}
                      name="website"
                      type="text"
                      class="inputText"
                    />
                    <span class="floating-label">Business website address</span>
                  </div>

                  <h5>Do you hold public liability insurance?</h5>

                  <RadioGroup
                    className="radiosContainers"
                    horizontal
                    onChange={this.onChangeLiability}
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
                    horizontal
                    onChange={this.onChangeVatRegistered}
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
                        <Checkbox name="pickupAndDropoff" onClick={this.onClick} />
                        &nbsp;&nbsp;&nbsp; Pickup and dropoff
                      </label>
                    </p>
                  </div>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox name="passPlus" onClick={this.onClick} />
                        &nbsp;&nbsp;&nbsp; Pass plus
                      </label>
                    </p>
                  </div>
                  <div className="formLinks">
                    <p>
                      <label>
                        <Checkbox name="carHireForTest" onClick={this.onClick} />
                        &nbsp;&nbsp;&nbsp; Car hire for test
                      </label>
                    </p>
                  </div>
                </div>
              </div>

              <div className="sectionBlocksQuestion">
                <div className="sectionBlockHeader">
                  <h4>Your Vehicle:</h4>
                </div>
                <div className="sectionBlockBody">
                  <div
                    className="floatingInputContainer"
                    style={{ margin: "25px 0 0 0" }}
                  >
                    <input
                      onChange={this.onChange}
                      name="make"
                      type="text"
                      class="inputText"
                      required
                    />
                    <span class="floating-label">Make:</span>
                  </div>
                  <div
                    className="floatingInputContainer"
                    style={{ margin: "25px 0 0 0" }}
                  >
                    <input
                      onChange={this.onChange}
                      name="model"
                      type="text"
                      class="inputText"
                      required
                    />
                    <span class="floating-label">Model:</span>
                  </div>
                  <div
                    className="floatingInputContainer"
                    style={{ margin: "25px 0 0 0" }}
                  >
                    <input
                      onChange={this.onChange}
                      name="year"
                      type="number"
                      class="inputText"
                      required
                    />
                    <span class="floating-label">Year:</span>
                  </div>
                  <div
                    className="floatingInputContainer"
                    style={{ margin: "25px 0 0 0" }}
                  >
                    <input
                      onChange={this.onChange}
                      name="registration"
                      type="text"
                      class="inputText"
                      required
                    />
                    <span class="floating-label">Registration:</span>
                  </div>
                  <h5>
                    Gearbox:
                  </h5>
                  <div className="formLinks" style={{ marginTop: '0' }}>
                    <RadioGroup
                      className="radiosContainers"
                      onChange={this.onChangeGearbox}
                      horizontal
                    >
                      <RadioButton
                        value="Manual"
                        iconSize={20}
                        pointColor={"#0a71dd"}
                        rootColor={"#e8eaf0"}
                      >
                        Manual
                    </RadioButton>
                      <RadioButton
                        value="Automatic"
                        iconSize={20}
                        pointColor={"#0a71dd"}
                        rootColor={"#e8eaf0"}
                      >
                        Automatic
                    </RadioButton>
                    </RadioGroup>
                  </div>
                  <h5>
                    Fuel Type:
                  </h5>
                  <div className="formLinks" style={{ marginTop: '0' }}>
                    <RadioGroup
                      className="radiosContainers"
                      onChange={this.onChangeFuelType}
                      horizontal
                    >
                      <RadioButton
                        value="Petrol"
                        iconSize={20}
                        pointColor={"#0a71dd"}
                        rootColor={"#e8eaf0"}
                      >
                        Petrol
                    </RadioButton>
                      <RadioButton
                        value="Diesel"
                        iconSize={20}
                        pointColor={"#0a71dd"}
                        rootColor={"#e8eaf0"}
                      >
                        Diesel
                    </RadioButton>
                      <RadioButton
                        value="Electric"
                        iconSize={20}
                        pointColor={"#0a71dd"}
                        rootColor={"#e8eaf0"}
                      >
                        Electric
                    </RadioButton>
                      <RadioButton
                        value="LPG"
                        iconSize={20}
                        pointColor={"#0a71dd"}
                        rootColor={"#e8eaf0"}
                      >
                        LPG
                    </RadioButton>
                    </RadioGroup>
                  </div>
                  <h5 style={{ marginBottom: '25px' }}>Car Picture:</h5>
                  <input type="file" className="custom-file-input" name="file" id="fileUploadCar" />
                  <form onSubmit={e => e.preventDefault()}>
                    <div className="formCta">
                      <button onClick={this.uploadCarPicture}>Confirm Image Upload</button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="formCta">
                <button onClick={this.addProfile}>Apply</button>
              </div>

            </form>
          </div>
        </div>
      </div >
    );
  }
}
