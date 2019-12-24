import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Styles/MenuBarStyles.css';
import MenuBarItem from './MenuBarItem'
import logo from '../../logo-1.png'
import { setHomeLayout, setLogInLayout, setSignUpLayout } from '../../Redux/LayoutRedux'

class MenuBar extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { setHome, setLogIn, setSignUp } = this.props
    return (
      <div className="Bar">
        <div className="Left">
          <img src={logo} className="Logo" alt="logo" />
          <MenuBarItem label="Home" onClick={setHome} />
        </div>
        <div className="Right">
          <MenuBarItem label="Login" onClick={setLogIn} />
          <MenuBarItem label="Sign Up" onClick={setSignUp} />
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  status: state,
  currentLayout: state.LayoutReducers.layoutReducer.currentLayout
})

const mapDispatchToProps = dispatch => ({
  setHome: () => dispatch(setHomeLayout()),
  setLogIn: () => dispatch(setLogInLayout()),
  setSignUp: () => dispatch(setSignUpLayout())
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
