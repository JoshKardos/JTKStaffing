import React, { Component } from 'react';
import { connect } from 'react-redux'
import './Styles/MenuBarStyles.css';
import MenuBarItem from './MenuBarItem'
import logo from '../../logo-1.png'
import { setHomeLayout } from '../../Redux/LayoutRedux'

class MenuBar extends Component {
  render() {
    // eslint-disable-next-line react/prop-types
    const { setHome, currentLayout } = this.props
    return (
      <div className="Bar">
        <div className="Left">
          <img src={logo} className="Logo" alt="logo" />
          <MenuBarItem label="Home" onClick={setHome} />
        </div>
        { currentLayout === 'HOME' &&
          <div className="Right">
            <MenuBarItem label="Login" />
            <MenuBarItem label="Sign Up" />
          </div> }
      </div>
    );
  }
}


const mapStateToProps = state => ({
  status: state,
  currentLayout: state.LayoutReducers.layoutReducer.currentLayout
})

const mapDispatchToProps = dispatch => ({
  setHome: () => dispatch(setHomeLayout())
})

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar)
