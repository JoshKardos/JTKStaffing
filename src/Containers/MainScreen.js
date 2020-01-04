import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import firebase from '../Firebase/index'
import { LAYOUTS } from '../Redux/LayoutRedux'
import MenuBar from '../Components/MenuBar/MenuBar'
import LoginLayout from './LogIn/LoginLayout'
import SignUpLayout from './SignUp/SignUpLayout'
import DashboardLayout from './Dashboard/DashboardLayout'
import HomeLayout from './Home/HomeLayout'
import { setTimesheetFileError } from '../Redux/DashboardRedux'
import { signUp, setSignUpError, fetchUserData, login, setLoginError, userLoggedIn, adminLoggedIn } from '../Redux/UserRedux'
import { resetError } from '../Redux/ErrorRedux'
import GenericErrorModal from './GenericErrorModal'
import './MainScreenStyles.css'

class MainScreen extends Component {
  componentDidMount() {
    const { fetchUserData } = this.props
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const action = {
          payload: user.uid
        }
        // User is signed in.
        fetchUserData(action)
      } else {
        // No user is signed in.
      }
    })
  }

  render() {
    const { currentLayout, signUp, errorDescription, resetError, signUpLoading,
      setSignUpError, login, loginLoading, setLoginError, userState, setTimesheetFileError } = this.props
    const loggedIn = userLoggedIn(userState)

    return (
      <div>
        <MenuBar />
        { errorDescription ?
          <GenericErrorModal errorDescription={errorDescription} resetError={resetError} /> : null }
        { !loggedIn && currentLayout === LAYOUTS.HOME && <HomeLayout /> }
        { loggedIn && currentLayout === LAYOUTS.HOME && <DashboardLayout setTimesheetFileError={setTimesheetFileError} isAdmin={adminLoggedIn(userState)} /> }
        { currentLayout === LAYOUTS.LOGIN && <LoginLayout login={login} isLoading={loginLoading} setLoginError={setLoginError} /> }
        { currentLayout === LAYOUTS.SIGNUP && <SignUpLayout signUp={signUp} isLoading={signUpLoading} setSignUpError={setSignUpError} /> }
        <div className="ContactTextContainer">
          <p className="ContactText">Contact us at joshkardos@gmail.com</p>
        </div>
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
  setSignUpError: PropTypes.func.isRequired,
  setLoginError: PropTypes.func.isRequired,
  fetchUserData: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loginLoading: PropTypes.bool.isRequired,
  userState: PropTypes.object.isRequired,
  setTimesheetFileError: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  userState: state.UserReducers.userReducer,
  currentLayout: state.LayoutReducers.layoutReducer.currentLayout,
  loginLoading: state.UserReducers.userReducer.loginLoading,
  signUpLoading: state.UserReducers.userReducer.signUpLoading,
  errorDescription: state.ErrorReducers.errorReducer.errorDescription
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
  signUp: (name, email, password, company) => dispatch(signUp(name, email, password, company)),
  setSignUpError: (error) => dispatch(setSignUpError(error)),
  setLoginError: (error) => dispatch(setLoginError(error)),
  setTimesheetFileError: (error) => dispatch(setTimesheetFileError(error)),
  resetError: () => dispatch(resetError()),
  fetchUserData: (userId) => dispatch(fetchUserData(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
// export default MainScreen
