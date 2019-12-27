import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './Styles/MenuBarStyles.css'
import MenuBarItem from './MenuBarItem'
import logo from '../../logo-1.png'
import { setHomeLayout, setLogInLayout, setSignUpLayout } from '../../Redux/LayoutRedux'
import { logOut, userLoggedIn } from '../../Redux/UserRedux'

class MenuBar extends Component {
  render() {
    const { setHome, setLogIn, setSignUp, logOut, userState } = this.props
    return (
      <div className="Bar">
        <div className="Left">
          <img src={logo} className="Logo" alt="logo" />
          <MenuBarItem label="Home" onClick={setHome} />
        </div>
        { !userLoggedIn(userState) &&
          <div className="Right">
            <MenuBarItem label="Login" onClick={setLogIn} />
            <MenuBarItem label="Sign Up" onClick={setSignUp} />
          </div>}
        { userLoggedIn(userState) &&
          <div className="Right">
            <MenuBarItem label="Log Out" onClick={logOut} />
          </div>}
      </div>
    );
  }
}

MenuBar.propTypes = {
  setHome: PropTypes.func.isRequired,
  setLogIn: PropTypes.func.isRequired,
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
  setLogIn: () => dispatch(setLogInLayout()),
  setSignUp: () => dispatch(setSignUpLayout()),
  logOut: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
