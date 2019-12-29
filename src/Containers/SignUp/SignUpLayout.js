import React, { Component } from 'react'
import PropTypes from 'prop-types';
import '../Login/LoginLayoutStyles.css'
import Loader from 'react-loader-spinner';

class SignUpLayout extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      company: ''
    }
  }

  validateEmail = (inputText) => {
    // eslint-disable-next-line no-useless-escape
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (inputText.match(mailformat)) {
      return true
    }
    return false
  } // src: https://www.w3resource.com/javascript/form/email-validation.php

  handleSubmit = (evt) => {
    const { name, email, password, company, passwordConfirm } = this.state
    const { signUp, setSignUpError } = this.props
    evt.preventDefault()

    if (!name.replace(/\s+/g, '')) {
      const action = {
        payload: 'Name is required'
      }
      return setSignUpError(action)
    }

    if (!email.replace(/\s+/g, '')) {
      const action = {
        payload: 'Email is required'
      }
      return setSignUpError(action)
    }

    if (!company.replace(/\s+/g, '')) {
      const action = {
        payload: 'Company is required'
      }
      return setSignUpError(action)
    }

    if (!password.replace(/\s+/g, '')) {
      const action = {
        payload: 'Password is required'
      }
      return setSignUpError(action)
    }

    if (!passwordConfirm.replace(/\s+/g, '')) {
      const action = {
        payload: 'Confirm password'
      }
      return setSignUpError(action)
    }

    if (password !== passwordConfirm) {
      const action = {
        payload: 'Passwords do not match'
      }
      return setSignUpError(action)
    }

    if (!this.validateEmail(email)) {
      const action = {
        payload: 'Invalid email'
      }
      return setSignUpError(action)
    }
    const action = {
      name,
      email,
      password,
      company
    }
    return signUp(action)
  }

  handleNameChange = (evt) => {
    this.setState({
      name: evt.target.value
    })
  }

  handleEmailChange = (evt) => {
    this.setState({
      email: evt.target.value
    })
  }

  handlePassChange = (evt) => {
    this.setState({
      password: evt.target.value
    })
  }

  handlePassConfirmChange = (evt) => {
    this.setState({
      passwordConfirm: evt.target.value
    })
  }

  handleCompanyChange = (evt) => {
    this.setState({
      company: evt.target.value,
    })
  }

  render() {
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)
    const { email, password, passwordConfirm, company, name } = this.state
    const { isLoading } = this.props
    return (
      <div className="Container">
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <div className="NameContainer">
              <label className="NameLabel">Name:</label>
              <input className="NameInput" type="text" data-test="email" value={name} onChange={this.handleNameChange} />
            </div>
            <div className="EmailContainer">
              <label className="EmailLabel">Email:</label>
              <input className="EmailInput" type="text" data-test="username" value={email} onChange={this.handleEmailChange} />
            </div>
            <div className="CompanyContainer">
              <label className="CompanyLabel">Company:</label>
              <input className="CompanyInput" type="text" data-test="company" value={company} onChange={this.handleCompanyChange} />
            </div>
            <div className="PasswordContainer">
              <label className="PasswordLabel">Password:</label>
              <input className="PasswordInput" type="password" data-test="password" value={password} onChange={this.handlePassChange} />
            </div>
            <div className="PasswordContainer2">
              <label className="PasswordLabel2">Password:</label>
              <input className="PasswordInput2" type="password" data-test="password" value={passwordConfirm} onChange={this.handlePassConfirmChange} />
            </div>
            <button className="SubmitButton" type="submit">
              { !isLoading && <p>Sign Up</p> }
              { isLoading && <Loader type="ThreeDots" color="#00BFFF" height={40} width={80} /> }
            </button>
          </form>
        </div>
      </div>
    )
  }
}

SignUpLayout.propTypes = {
  signUp: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setSignUpError: PropTypes.func.isRequired
}

export default SignUpLayout
