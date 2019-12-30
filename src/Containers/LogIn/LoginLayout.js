import React, { Component } from 'react'
import './LoginLayoutStyles.css'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'

class LoginPage extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleSubmit = (evt) => {
    const { email, password } = this.state
    const { login, setLoginError } = this.props
    evt.preventDefault()

    if (!email) {
      const action = {
        payload: 'Email is required'
      }
      return setLoginError(action)
    }
    if (!password) {
      const action = {
        payload: 'Password is required'
      }
      return setLoginError(action)
    }
    const action = {
      email,
      password
    }
    return login(action)
  }

  handleEmailChange = (evt) => {
    this.setState({
      email: evt.target.value,
    })
  }

  handlePassChange = (evt) => {
    this.setState({
      password: evt.target.value,
    })
  }

  render() {
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)
    const { email, password } = this.state
    const { isLoading } = this.props
    return (
      <div className="Container">
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            <div className="EmailContainer">
              <label className="EmailLabel">Email:</label>
              <input className="EmailInput" type="text" data-test="email" value={email} onChange={this.handleEmailChange} />
            </div>
            <div className="PasswordContainer">
              <label className="PasswordLabel">Password:</label>
              <input className="PasswordInput" type="password" data-test="password" value={password} onChange={this.handlePassChange} />
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

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setLoginError: PropTypes.func.isRequired
}

export default LoginPage
