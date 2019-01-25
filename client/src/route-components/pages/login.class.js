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
      showErrors: false
    };
    this.onChange = this.onChange.bind(this);
    this.loginUser = this.loginUser.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  loginUser(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      window.location.href = "/search";
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("new props", nextProps);
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  toggleErrors = () => {
    this.setState({ showErrors: true });
    setTimeout(() => {
      this.setState({ showErrors: false });
    }, 500);
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
                {this.state.errors.result ? (
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
                {this.state.errors.result ? (
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
                <button onClick={this.loginUser}>Login</button>
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
