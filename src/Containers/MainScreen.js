import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { LAYOUTS } from '../Redux/LayoutRedux'
import MenuBar from '../Components/MenuBar/MenuBar'
import LogInLayout from './LogIn/LogInLayout'
import SignUpLayout from './SignUp/SignUpLayout'
import { signUp, setSignUpError } from '../Redux/UserRedux'
import { resetError } from '../Redux/ErrorRedux'
import GenericErrorModal from './GenericErrorModal'

class MainScreen extends Component {
  render() {
    const { currentLayout, signUp, errorDescription, resetError, signUpLoading, setSignUpError } = this.props
    return (
      <div>
        <MenuBar />
        { errorDescription ?
          <GenericErrorModal errorDescription={errorDescription} resetError={resetError} /> : null}
        { currentLayout === LAYOUTS.LOGIN && <LogInLayout /> }
        { currentLayout === LAYOUTS.SIGNUP && <SignUpLayout signUp={signUp} isLoading={signUpLoading} setSignUpError={setSignUpError} /> }
      </div>
    )
  }
}

MainScreen.propTypes = {
  currentLayout: PropTypes.string.isRequired,
  signUp: PropTypes.func.isRequired,
  errorDescription: PropTypes.string.isRequired,
  resetError: PropTypes.func.isRequired,
  signUpLoading: PropTypes.bool.isRequired,
  setSignUpError: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  currentLayout: state.LayoutReducers.layoutReducer.currentLayout,
  signUpLoading: state.UserReducers.userReducer.signUpLoading,
  errorDescription: state.ErrorReducers.errorReducer.errorDescription
})

const mapDispatchToProps = dispatch => ({
  signUp: (name, email, password, company) => dispatch(signUp(name, email, password, company)),
  setSignUpError: (error) => dispatch(setSignUpError(error)),
  resetError: () => dispatch(resetError())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
// export default MainScreen
