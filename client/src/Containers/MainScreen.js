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
import { uploadTimesheet, setTimesheetFileError, timesheetUploadError, saveToDatabase, timesheetUploadStart } from '../Redux/DashboardRedux'
import { signUpWorker, signUpAdmin, setSignUpError, fetchUserData, login, setLoginError, userLoggedIn } from '../Redux/UserRedux'
import { resetError } from '../Redux/ErrorRedux'
import GenericErrorModal from './GenericErrorModal'
import Styles from './MainScreenStyles.js'

class MainScreen extends Component {
  componentDidMount() {
    const { fetchUserData } = this.props
    firebase.auth().onAuthStateChanged((user) => {
      if (user) { // User is signed in.
        const action = {
          payload: user.uid
        }
        fetchUserData(action)
      } else {
        // No user is signed in.
      }
    })
  }

  render() {
    const { currentLayout, signUpAdmin, errorDescription, resetError, signUpLoading,
      setSignUpError, login, loginLoading, setLoginError, userState
    } = this.props
    const loggedIn = userLoggedIn(userState)

    return (
      <div style={Styles.App}>
        <MenuBar />
        { errorDescription ?
          <GenericErrorModal errorDescription={errorDescription} resetError={resetError} /> : null }
        { !loggedIn && currentLayout === LAYOUTS.HOME && <HomeLayout /> }
        { loggedIn && currentLayout === LAYOUTS.HOME && <DashboardLayout /> }
        { currentLayout === LAYOUTS.LOGIN && <LoginLayout login={login} isLoading={loginLoading} setLoginError={setLoginError} /> }
        { currentLayout === LAYOUTS.SIGNUP && <SignUpLayout signUpAdmin={signUpAdmin} isLoading={signUpLoading} setSignUpError={setSignUpError} /> }
      </div>
    )
  }
}

MainScreen.propTypes = {
  timesheets: PropTypes.array.isRequired,
  employees: PropTypes.array.isRequired,
  currentLayout: PropTypes.string.isRequired,
  signUpAdmin: PropTypes.func.isRequired,
  signUpWorker: PropTypes.func.isRequired,
  errorDescription: PropTypes.string.isRequired,
  resetError: PropTypes.func.isRequired,
  signUpLoading: PropTypes.bool.isRequired,
  setSignUpError: PropTypes.func.isRequired,
  setLoginError: PropTypes.func.isRequired,
  fetchUserData: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  loginLoading: PropTypes.bool.isRequired,
  userState: PropTypes.object.isRequired,
  setTimesheetFileError: PropTypes.func.isRequired,
  uploadTimesheet: PropTypes.func.isRequired,
  timesheetUploadError: PropTypes.func.isRequired,
  saveToDatabase: PropTypes.func.isRequired,
  timesheetUploadStart: PropTypes.func.isRequired,
  timesheetUploading: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  timesheets: state.UserReducers.userReducer.timesheets,
  employees: state.UserReducers.userReducer.employees,
  userState: state.UserReducers.userReducer,
  currentLayout: state.LayoutReducers.layoutReducer.currentLayout,
  loginLoading: state.UserReducers.userReducer.loginLoading,
  signUpLoading: state.UserReducers.userReducer.signUpLoading,
  errorDescription: state.ErrorReducers.errorReducer.errorDescription,
  timesheetUploading: state.DashboardReducers.dashboardReducer.uploading
})

const mapDispatchToProps = dispatch => ({
  login: (email, password) => dispatch(login(email, password)),
  signUpAdmin: (name, email, password, company) => dispatch(signUpAdmin(name, email, password, company)),
  signUpWorker: (name, email, password) => dispatch(signUpWorker(name, email, password)),
  setSignUpError: (error) => dispatch(setSignUpError(error)),
  setLoginError: (error) => dispatch(setLoginError(error)),
  setTimesheetFileError: (error) => dispatch(setTimesheetFileError(error)),
  resetError: () => dispatch(resetError()),
  fetchUserData: (userId) => dispatch(fetchUserData(userId)),
  uploadTimesheet: (file) => dispatch(uploadTimesheet(file)),
  saveToDatabase: (timesheetTimePeriod, filepath, id, userId, timestamp) => dispatch(saveToDatabase(timesheetTimePeriod, filepath, id, userId, timestamp)),
  timesheetUploadError: () => dispatch(timesheetUploadError()),
  timesheetUploadStart: () => dispatch(timesheetUploadStart())
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
// export default MainScreen
