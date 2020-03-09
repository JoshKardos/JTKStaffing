import React, { Component } from 'react'
import Styles from './LoginLayoutStyles'
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
    const { email, password } = this.state
    const { isLoading } = this.props
    return (
      <div style={Styles.Container}>
        <div style={Styles.Login}>
          <form onSubmit={this.handleSubmit}>
            <div style={Styles.EmailContainer}>
              <label style={Styles.EmailLabel}>Email:</label>
              <input style={Styles.EmailInput} type="text" data-test="email" value={email} onChange={this.handleEmailChange} />
            </div>
            <div style={Styles.PasswordContainer}>
              <label style={Styles.PasswordLabel}>Password:</label>
              <input style={Styles.PasswordInput} type="password" data-test="password" value={password} onChange={this.handlePassChange} />
            </div>
            <button style={Styles.SubmitButton} type="submit">
              { !isLoading && <p>Login</p> }
              { isLoading && <Loader type="ThreeDots" color="#3b5998" height={40} width={80} /> }
            </button>
            <div>
              Forgot Password?
            </div>
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
