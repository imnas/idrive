import React, { Component } from "react";
import Checkbox from "rc-checkbox";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { NavLink } from "react-router-dom";
import Header from "../includes/header.class";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "rc-checkbox/assets/index.css";

// Guess what, time to do some REEEEEEEEEEEEEEEEFACTORING

export default class InstructorRegister extends Component {
  constructor() {
    super();
    this.state = {
      gender: "",
      src: null,
      imagesrc1: null,
      imagesrc2: null,
      imagesrc3: null,
      croppedImageUrl: null,
      blob: null,
      crop: {
        aspect: 1,
        width: 50
      }
    };
  }

  componentDidMount = () => {
    document.title = "InstantDriving - Profile";
  };

  confirmUpload = () => {
    if (this.state.croppedImageUrl) {
      if (!this.state.imagesrc1) {
        this.setState({
          imagesrc1: this.state.croppedImageUrl
        });
      } else if (!this.state.imagesrc2) {
        this.setState({
          imagesrc2: this.state.croppedImageUrl
        });
      } else {
        this.setState({
          imagesrc3: this.state.croppedImageUrl
        });
      }
    }
  };

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

  onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
  };

  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error("Canvas is empty");
          return;
        }
        this.setState({ blob });
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg", 0.7);
    });
  }

  addProfile = () => {
    // Execute the functions here
  };

  render() {
    const { crop, croppedImageUrl, src } = this.state;
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
                  <h4>Your business:</h4>
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

              <div className="sectionBlocksQuestion">
                <div className="sectionBlockHeader">
                  <h4>Your Vehicle Images:</h4>
                </div>
                <div className="sectionBlockBody">
                  <h5>Upload up to 3 images:</h5>
                  <div className="formLinks">
                    <div className="reactCropContainer">
                      <div className="cropUpload">
                        <input
                          type="file"
                          onChange={this.onSelectFile}
                          className="custom-file-input"
                        />
                      </div>
                      {src && (
                        <ReactCrop
                          src={src}
                          crop={crop}
                          onImageLoaded={this.onImageLoaded}
                          onComplete={this.onCropComplete}
                          onChange={this.onCropChange}
                        />
                      )}
                      {croppedImageUrl && (
                        <div className="confirmImageContainer">
                          <a onClick={this.confirmUpload}>Confirm Upload</a>
                        </div>
                      )}
                      <div className="triImageContainer">
                        <div>
                          <img
                            src={
                              this.state.imagesrc1 ? this.state.imagesrc1 : ""
                            }
                          />
                          <i class="far fa-image" />
                        </div>
                        <div>
                          <img
                            src={
                              this.state.imagesrc2 ? this.state.imagesrc2 : ""
                            }
                          />
                          <i class="far fa-image" />
                        </div>
                        <div>
                          <img
                            src={
                              this.state.imagesrc3 ? this.state.imagesrc3 : ""
                            }
                          />
                          <i class="far fa-image" />
                        </div>
                      </div>
                    </div>
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
