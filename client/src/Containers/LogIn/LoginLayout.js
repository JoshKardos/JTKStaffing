import React, { Component } from 'react'
import Styles from './LoginLayoutStyles'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'
import firebase from '../../Firebase/index'

class LoginPage extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      forgotPassword: false
    }
  }

  handleLogin = (evt) => {
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

  handleSendPasswordReset = (evt) => {
    const { email } = this.state
    const { setLoginError } = this.props
    evt.preventDefault() // doesn't rerender

    if (!email) {
      const action = {
        payload: 'Email is required'
      }
      return setLoginError(action)
    }
    const auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(function() {
      // Email sent.
      const action = {
        payload: 'Password reset email sent'
      }
      return setLoginError(action)
    }).catch(function(error) {
      // An error happened.
      const action = {
        payload: error.message
      }
      return setLoginError(action)
    });
  }

  render() {
    const { email, password, forgotPassword } = this.state
    const { isLoading } = this.props

    if (forgotPassword) {
      return (
        <div style={Styles.Container}>
          <div style={Styles.Login}>
            <form onSubmit={this.handleSendPasswordReset}>
              <div style={Styles.PasswordResetBackButton} onClick={() => this.setState({forgotPassword: false})}>
                X
              </div>
              <div style={Styles.EmailContainer}>
                <label style={Styles.EmailLabel}>Email:</label>
                <input style={Styles.EmailInput} type="text" data-test="email" value={email} onChange={this.handleEmailChange} />
              </div>
              <button style={Styles.SendPasswordResetButton} type="submit">
                <p>Send password reset</p>
              </button>
            </form>
          </div>
        </div>
      )
    }


    return (
      <div style={Styles.Container}>
        <div style={Styles.Login}>
          <form onSubmit={this.handleLogin}>
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
            <div style={Styles.ForgotPassword} onClick={() => this.setState({forgotPassword: true})}>
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
