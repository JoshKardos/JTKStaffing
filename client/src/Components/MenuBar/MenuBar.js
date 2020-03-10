import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import logo from '../../Images/logo-1.png'
import { setHomeLayout, setLoginLayout, setSignUpLayout } from '../../Redux/LayoutRedux'
import { logOut, userLoggedIn } from '../../Redux/UserRedux'
import MenuBarItem from './MenuBarItem'
import Styles from './Styles/MenuBarStyles.js'

class MenuBar extends Component {
  renderLoggedIn() {
    const { logOut } = this.props
    return (
      <div style={Styles.Bar}>
        <img src={logo} style={Styles.Logo} alt="logo" />
        <h3 style={Styles.Title}>JTK Staffing</h3>
        <div style={Styles.Right}>
          <MenuBarItem label="Log Out" onClick={logOut} />
        </div>
      </div>
    )
  }

  renderLoggedOut() {
    const { setLogin, setSignUp, setHome } = this.props
    return (
      <div style={Styles.Bar}>
        <div style={Styles.Left}>
          <img src={logo} style={Styles.Logo} alt="logo" />
          <MenuBarItem label="Home" onClick={setHome} />
        </div>
        <h3 style={Styles.Title}>JTK Staffing</h3>
        <div style={Styles.Right}>
          <MenuBarItem label="Login" onClick={setLogin} />
          <MenuBarItem label="Sign Up" onClick={setSignUp} />
        </div>
      </div>
    )
  }

  render() {
    const { userState } = this.props
    if (userLoggedIn(userState)) {
      return <div style={Styles.BarContainer}>
        {this.renderLoggedIn()}
      </div>
    }
    return <div style={Styles.BarContainer}>
      {this.renderLoggedOut()}
    </div>
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
