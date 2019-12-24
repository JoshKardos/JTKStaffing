import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { LAYOUTS } from '../Redux/LayoutRedux'
import MenuBar from '../Components/MenuBar/MenuBar'
import LogInLayout from './LogIn/LogInLayout'
import SignUpLayout from './SignUp/SignUpLayout'

class MainScreen extends Component {
  render() {
    const { currentLayout } = this.props
    return (
      <div>
        <MenuBar />
        { currentLayout === LAYOUTS.LOGIN && <LogInLayout /> }
        { currentLayout === LAYOUTS.SIGNUP && <SignUpLayout /> }
      </div>
    )
  }
}

MainScreen.propTypes = {
  currentLayout: PropTypes.string.isRequired
}

const mapStateToProps = state => ({
  currentLayout: state.LayoutReducers.layoutReducer.currentLayout
})

// const mapDispatchToProps = dispatch => ({
//   setHome: () => dispatch(setHomeLayout())
// })

export default connect(mapStateToProps, null)(MainScreen)
// export default MainScreen
