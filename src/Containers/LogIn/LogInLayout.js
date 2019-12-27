import React, { Component } from 'react'
import './LogInLayoutStyles.css'

class LoginPage extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      error: '',
    }
  }

  dismissError = () => {
    this.setState({ error: '' })
  }

  handleSubmit = (evt) => {
    const { email, password } = this.state
    evt.preventDefault()

    if (!email) {
      return this.setState({ error: 'Email is required' })
    }

    if (!password) {
      return this.setState({ error: 'Password is required' })
    }

    return this.setState({ error: '' })
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
    const { error, email, password } = this.state
    return (
      <div className="Container">
        <div className="Login">
          <form onSubmit={this.handleSubmit}>
            {
              error &&
              <h3 className="Error" data-test="error" onClick={this.dismissError}>
                <button className="XButton" type="button" onClick={this.dismissError}>✖</button>
                {error}
              </h3>
            }
            <div className="EmailContainer">
              <label className="EmailLabel">Email:</label>
              <input className="EmailInput" type="text" data-test="email" value={email} onChange={this.handleEmailChange} />
            </div>
            <div className="PasswordContainer">
              <label className="PasswordLabel">Password:</label>
              <input className="PasswordInput" type="password" data-test="password" value={password} onChange={this.handlePassChange} />
            </div>
            <input className="SubmitButton" type="submit" value="Log In" data-test="submit" />
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
