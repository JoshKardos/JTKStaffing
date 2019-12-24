import React, { Component } from 'react'
import '../LogIn/LogInLayoutStyles.css'
// import firebase from '../../Firebase/index'

class SignUpLayout extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      error: '',
      company: ''
    }
  }

  dismissError = () => {
    this.setState({ error: '' })
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
    evt.preventDefault()

    if (!name.replace(/\s+/g, '')) {
      return this.setState({ error: 'Name is required' })
    }

    if (!email.replace(/\s+/g, '')) {
      return this.setState({ error: 'Email is required' })
    }

    if (!company.replace(/\s+/g, '')) {
      return this.setState({ error: 'Company is required' })
    }

    if (!password.replace(/\s+/g, '')) {
      return this.setState({ error: 'Password is required' })
    }

    if (!passwordConfirm.replace(/\s+/g, '')) {
      return this.setState({ error: 'Confirm password' })
    }

    if (password !== passwordConfirm) {
      return this.setState({ error: 'Passwords do not match' })
    }

    if (!this.validateEmail(email)) {
      return this.setState({ error: 'Invalid email' })
    }

    return this.setState({ error: '' })
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
    const { error, email, password, passwordConfirm, company, name } = this.state
    const cName = error ? 'SignupError' : 'Login'
    return (
      <div className="Container">
        <div className={cName}>
          <form onSubmit={this.handleSubmit}>
            {
              error &&
              <h3 className="Error" data-test="error" onClick={this.dismissError}>
                <button className="XButton" type="button" onClick={this.dismissError}>✖</button>
                {error}
              </h3>
            }
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
            <input className="SubmitButton" type="submit" value="Sign Up" data-test="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default SignUpLayout
