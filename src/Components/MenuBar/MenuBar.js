import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Styles/MenuBarStyles.css'
import MenuBarItem from './MenuBarItem'
import logo from '../../logo-1.png'
import { setHomeLayout, setLoginLayout, setSignUpLayout } from '../../Redux/LayoutRedux'
import { logOut, userLoggedIn } from '../../Redux/UserRedux'

class MenuBar extends Component {
  renderLoggedIn() {
    const { setHome, logOut } = this.props
    return (
      <div className="Bar">
        <div className="Left">
          <img src={logo} className="Logo" alt="logo" />
          <MenuBarItem label="Dashboard" onClick={setHome} />
        </div>
        <div className="Right">
          <MenuBarItem label="Log Out" onClick={logOut} />
        </div>
      </div>
    )
  }

  renderLoggedOut() {
    const { setHome, setLogin, setSignUp } = this.props
    return (
      <div className="Bar">
        <div className="Left">
          <img src={logo} className="Logo" alt="logo" />
          <MenuBarItem label="Home" onClick={setHome} />
        </div>
        <div className="Right">
          <MenuBarItem label="Login" onClick={setLogin} />
          <MenuBarItem label="Sign Up" onClick={setSignUp} />
        </div>
      </div>
    )
  }

  render() {
    const { userState } = this.props
    if (userLoggedIn(userState)) {
      return this.renderLoggedIn()
    }
    return this.renderLoggedOut()
  }
}

MenuBar.propTypes = {
  setHome: PropTypes.func.isRequired,
  setLogin: PropTypes.func.isRequired,
  setSignUp: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  userState: PropTypes.object.isRequired
}


const mapStateToProps = state => ({
  userState: state.UserReducers.userReducer,
  currentLayout: state.LayoutReducers.layoutReducer.currentLayout
})

const mapDispatchToProps = dispatch => ({
  setHome: () => dispatch(setHomeLayout()),
  setLogin: () => dispatch(setLoginLayout()),
  setSignUp: () => dispatch(setSignUpLayout()),
  logOut: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
