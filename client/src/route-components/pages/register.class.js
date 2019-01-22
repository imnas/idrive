import React, { Component } from "react";
import Checkbox from "rc-checkbox";
import Header from "../includes/header.class";
import { NavLink } from "react-router-dom";
import "rc-checkbox/assets/index.css";
import { registerUser } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      // Temporary solution for testing
      type: 'learner',
      firstName: '',
      lastName: '',
      email: '',
      postalCode: '',
      phone: '',
      city: '',
      address: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };
    this.registerUser = this.registerUser.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  registerUser = (e) => {
    e.preventDefault();
    const newUser = {
      // Change to learner - currently set to instructor for testing
      type: 'instructor',
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      postalCode: this.state.postalCode,
      phone: this.state.phone,
      city: this.state.city,
      address: this.state.address,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword 
    };
    console.log(newUser);
    this.props.registerUser(newUser, this.props.history);
    };

    onChange = (e) => {
      this.setState({
        [e.target.name]: e.target.value
      });
    }

    componentDidMount() {
      if (this.props.auth.isAuthenticated) {
        this.props.history.push('/dashboard');
      };
    }
  
    componentWillReceiveProps(nextProps) {
      if(nextProps.errors) {
        this.setState({errors: nextProps.errors})
      }
    }

  render() {

    const { errors } = this.state;

    return (
      <div>
        <Header />
        <div class="formContainerExternal">
          <div className="formContainer registerForm">
            <h2>
              Together we are creating a revolution for the driving industry
            </h2>
            <h4>Hey, register and get your first lesson absolutely free!</h4>
            <form>
              <div className="dualFloatingInputs">
                <div className="floatingInputContainer">
                  <input onChange={this.onChange} name="firstName" type="text" class="inputText" required />
                  <span class="floating-label">First Name</span>
                </div>
                <div className="floatingInputContainer">
                  <input onChange={this.onChange} name="lastName" type="text" class="inputText" required />
                  <span class="floating-label">Last Name</span>
                </div>
              </div>
              <div className="floatingInputContainer">
                <input onChange={this.onChange} name="email" type="text" class="inputText" required />
                <span class="floating-label">Your Email</span>
              </div>
              <div className="dualFloatingInputs">
                <div className="floatingInputContainer">
                  <input onChange={this.onChange} name="postalCode" type="text" class="inputText" required />
                  <span class="floating-label">Postcode</span>
                </div>
                <div className="floatingInputContainer">
                  <input onChange={this.onChange} name="phone" type="text" class="inputText" required />
                  <span class="floating-label">Mobile No.</span>
                </div>
              </div>
              <div className="dualFloatingInputs">
                <div className="floatingInputContainer">
                  <input onChange={this.onChange} name="city" type="text" class="inputText" required />
                  <span class="floating-label">City</span>
                </div>
                <div className="floatingInputContainer">
                  <input onChange={this.onChange} name="address" type="text" class="inputText" required />
                  <span class="floating-label">Street Name</span>
                </div>
              </div>
              <div className="dualFloatingInputs">
                <div className="floatingInputContainer">
                  <input onChange={this.onChange} name="password" type="password" class="inputText" required />
                  <span class="floating-label">Password</span>
                </div>
                <div className="floatingInputContainer">
                  <input onChange={this.onChange} name="confirmPassword" type="password" class="inputText" required />
                  <span class="floating-label">Confirm Password</span>
                </div>
              </div>
              <div className="formLinks">
                <p>
                  <label>
                    <Checkbox />
                    &nbsp;&nbsp;&nbsp; By creating an account, I accept the
                    terms and conditions
                  </label>
                </p>
              </div>
              <div className="formCta">
                <button onClick={this.registerUser}>Sign up</button>
                <NavLink to="/login">Already have an account</NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
