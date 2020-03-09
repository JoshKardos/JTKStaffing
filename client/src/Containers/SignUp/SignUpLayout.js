import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from '../LogIn/LoginLayoutStyles.js'
import Loader from 'react-loader-spinner'
import { validateEmail } from '../../helpers/UserHelpers'

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

  handleSubmit = (evt) => {
    const { name, email, password, company, passwordConfirm } = this.state
    const { signUpAdmin, setSignUpError } = this.props
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

    if (!validateEmail(email)) {
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
    return signUpAdmin(action)
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
      <div style={Styles.Container}>
        <div style={Styles.Login}>
          <form onSubmit={this.handleSubmit}>
            <div style={Styles.NameContainer}>
              <label style={Styles.NameLabel}>Name:</label>
              <input style={Styles.NameInput} type="text" data-test="email" value={name} onChange={this.handleNameChange} />
            </div>
            <div style={Styles.EmailContainer}>
              <label style={Styles.EmailLabel}>Email:</label>
              <input style={Styles.EmailInput} type="text" data-test="username" value={email} onChange={this.handleEmailChange} />
            </div>
            <div style={Styles.CompanyContainer}>
              <label style={Styles.CompanyLabel}>Company:</label>
              <input style={Styles.CompanyInput} type="text" data-test="company" value={company} onChange={this.handleCompanyChange} />
            </div>
            <div style={Styles.PasswordContainer}>
              <label style={Styles.PasswordLabel}>Password:</label>
              <input style={Styles.PasswordInput} type="password" data-test="password" value={password} onChange={this.handlePassChange} />
            </div>
            <div style={Styles.PasswordContainer2}>
              <label style={Styles.PasswordLabel2}>Password:</label>
              <input style={Styles.PasswordInput2} type="password" data-test="password" value={passwordConfirm} onChange={this.handlePassConfirmChange} />
            </div>
            <button style={Styles.SubmitButton} type="submit">
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
  signUpAdmin: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setSignUpError: PropTypes.func.isRequired
}

export default SignUpLayout
