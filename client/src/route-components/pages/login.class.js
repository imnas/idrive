import React, { Component } from "react";
import Checkbox from "rc-checkbox";
import Header from "../includes/header.class";
import { NavLink } from "react-router-dom";
import "rc-checkbox/assets/index.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      showErrors: false,
      loadingForm: false
    };
    this.onChange = this.onChange.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  loginUser(e) {
    this.setState({ errors: {}, loadingForm: true });
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
    setTimeout(() => {
      this.setState({ loadingForm: false });
    }, 2500);
    this.toggleErrors();
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      window.location.href = "/search";
      this.setState({ loadingForm: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  toggleErrors = () => {
    this.setState({ showErrors: true });
    setTimeout(() => {
      this.setState({ showErrors: false });
    }, 2500);
  };

  render() {
    return (
      <div className="formsWrapper">
        <Header />
        <div className="formContainerExternal">
          <div className="formContainer loginForm">
            <h2>
              Together we are creating a revolution for the driving industry
            </h2>
            <h4>Welcome back, Please login to your account</h4>
            <form>
              <div className="floatingInputContainer">
                <input
                  onChange={this.onChange}
                  name="email"
                  type="text"
                  className="inputText"
                  required
                />
                <span className="floating-label">Your Email</span>
                {this.state.errors.result && this.state.showErrors ? (
                  <div>
                    {this.state.errors.result.userDoesNotExist ? (
                      <span className="errorsOutputField">
                        {this.state.errors.result.userDoesNotExist}
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="floatingInputContainer">
                <input
                  onChange={this.onChange}
                  name="password"
                  type="password"
                  className="inputText"
                  required
                />
                <span className="floating-label">Your Password</span>
                {this.state.errors.result && this.state.showErrors ? (
                  <div>
                    {this.state.errors.result.incorrectPassword ? (
                      <span className="errorsOutputField">
                        {this.state.errors.result.incorrectPassword}
                      </span>
                    ) : null}
                  </div>
                ) : null}
              </div>
              <div className="formLinks">
                <p>
                  <label>
                    <Checkbox />
                    &nbsp;&nbsp;&nbsp; Remember me
                  </label>
                </p>
                <NavLink to="/recover">Forgot Password?</NavLink>
              </div>
              <div className="formCta">
                <button onClick={this.loginUser}>
                  {this.state.loadingForm ? (
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
                  ) : (
                    "Login"
                  )}
                </button>
                <NavLink to="/signup">Sign Up</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
