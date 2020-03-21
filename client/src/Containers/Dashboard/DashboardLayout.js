import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import moment from 'moment'
import FileUploader from 'react-firebase-file-uploader'
import Generator from 'generate-password'
import DayPicker from 'react-day-picker' // https://react-day-picker.js.org/examples/selected-week
import Loader from 'react-loader-spinner'
import firebase from '../../Firebase/index'
import 'react-day-picker/lib/style.css'
import { getWeekDays, getWeekRange } from '../../helpers/CalendarHelpers'
import RecentTimesheet from './Worker/RecentTimesheet/RecentTimesheet'
import AdminTimesheetTile from './Admin/AdminTimesheetTile/AdminTimesheetTile'
import redX from '../../Images/redX.png'
import greenCheck from '../../Images/greenCheck.jpg'
import Styles from './DashboardLayoutStyles'
import { validateEmail } from '../../helpers/UserHelpers'
import edit from '../../Images/edit.png'
import Tooltip, { TooltipItems } from '../../Components/Tooltip/Tooltip'
import AdminEmployeeCell from './Admin/AdminEmployeeCell'
import { signUpWorker, signUpAdmin, setSignUpError, fetchUserData, login, setLoginError, adminLoggedIn, editName } from '../../Redux/UserRedux'
import { uploadTimesheet, setTimesheetFileError, timesheetUploadError, saveToDatabase, timesheetUploadStart } from '../../Redux/DashboardRedux'
import { resetError } from '../../Redux/ErrorRedux'

const AdminLayouts = {
  // HOME: 'HOME',
  TIMESHEETS: 'TIMESHEETS',
  EMPLOYEES: 'EMPLOYEES',
  SETTINGS: 'SETTINGS'
}

const EmployeeLayouts = {
  SUBMIT: 'SUBMIT',
  RECENT: 'RECENT',
  SETTINGS: 'SETTINGS'
}

const UserSetting = { 
  EMAIL: "Email",
  PASSWORD: "Password",
  NAME: "Name"
}

class DashboardLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // employee state
      timesheetTimestamp: null,
      timesheetFile: null,
      hoverRange: null,
      selectedDays: [],

      currentEmployeeLayout: EmployeeLayouts.SUBMIT,
      currentAdminLayout: AdminLayouts.EMPLOYEES,

      // Add employee state
      shouldShowAddEmployee: false,
      email: '',
      password: '',
      name: '',

      // admin view
      adminTimesheetsSearchText: '',
      filtersApplied: [],
      submissionTimePeriods: new Set(), // 'September 2, 2019 - September 8, 2019'
      employeeIdSubmissionTimePeriodsMap: {}, // { 12345678 : 'September 2, 2019 - September 8, 2019', 987654321 : 'September 2, 2019 - September 8, 2019' }
    
      // settings
      editting: null,
      newSettingEmail: '',
      newEmailPassword: '',
      oldPassword: '',
      newPassword: '',
      
      // tooltips
      shouldShowAddEmployeeToolTip: !(localStorage.getItem(TooltipItems.AddEmployee)),
      shouldShowSubmitTimesheetTooltip: !(localStorage.getItem(TooltipItems.SubmitTimesheet)),
      shouldShowDayPickerTooltip: !(localStorage.getItem(TooltipItems.DayPicker)),
      shouldFileUploaderTooltip: !(localStorage.getItem(TooltipItems.FileUploader))
    }
    this.fileUploader = null
  }

  handleFilterPressed = (event) => {
    const { filtersApplied } = this.state
    const timePeriod = event.target.value
    if (filtersApplied.includes(timePeriod)) {
      // remove
      this.setState({ filtersApplied: filtersApplied.filter(filter => filter !== timePeriod) })
    } else {
      // add
      this.setState({ filtersApplied: [...filtersApplied, timePeriod] })
    }
  }

  handleEmployeeIdSubmissionTimePeriodsMap = (userId, timePeriodArr) => {
    const { employeeIdSubmissionTimePeriodsMap } = this.state
    const map = { ...employeeIdSubmissionTimePeriodsMap }
    map[userId] = timePeriodArr
    this.setState({
      employeeIdSubmissionTimePeriodsMap: map
    })
  }

  handleAddSubmissionTimePeriods = timePeriodsArr => {
    const { submissionTimePeriods } = this.state
    const timePeriodSet = new Set(submissionTimePeriods)
    timePeriodsArr.forEach(item => timePeriodSet.add(item))
    this.setState({
      submissionTimePeriods: timePeriodSet
    })
  }

  startUploadManually = () => {
    const { setTimesheetFileError } = this.props
    const { timesheetFile } = this.state;

    if (!navigator.onLine) {
      setTimesheetFileError({ payload: 'Check internet connection...' })
      return
    }
    this.fileUploader.startUpload(timesheetFile)
  }

  handleDayChange = date => {
    this.setState({
      selectedDays: getWeekDays(getWeekRange(date).from),
    })
  }

  handleDayEnter = date => {
    this.setState({
      hoverRange: getWeekRange(date),
    })
  }

  handleDayLeave = () => {
    this.setState({
      hoverRange: null // cahnge this
    })
  }

  handleWeekClick = (weekNumber, days) => {
    this.setState({
      selectedDays: days,
    })
  }

  handleNameChange = (evt) => {
    this.setState({
      name: evt.target.value
    })
  }

  handleEmailChange = (evt) => {
    this.setState({
      email: evt.target.value
    })
  }

  handlePassChange = (evt) => {
    this.setState({
      password: evt.target.value
    })
  }

  searchTextFieldChanged = (evt) => {
    this.setState({
      adminTimesheetsSearchText: evt.target.value
    })
  }

  handleSubmit = (evt) => {
    const { name, email, password } = this.state
    const { signUpWorker, setSignUpError } = this.props
    evt.preventDefault()

    if (!name.replace(/\s+/g, '')) {
      const action = {
        payload: 'Name is required'
      }
      return setSignUpError(action)
    }

    if (!email.replace(/\s+/g, '')) {
      const action = {
        payload: 'Email is required'
      }
      return setSignUpError(action)
    }

    if (!password.replace(/\s+/g, '')) {
      const action = {
        payload: 'Password is required'
      }
      return setSignUpError(action)
    }

    if (!validateEmail(email)) {
      const action = {
        payload: 'Invalid email'
      }
      return setSignUpError(action)
    }
    const action = {
      name,
      email,
      password
    }
    return signUpWorker(action)
  }

  clearFields() {
    this.setState({ timesheetFile: null, selectedDays: [], hoverRange: null })
  }

  addEmployeeClicked() {
    // const { addEmployeeUnderAdmin } = this.props
    this.setState({ shouldShowAddEmployee: true, password: Generator.generate({ length: 10 }) })
    // return addEmployeeUnderAdmin
  }

  renderFileName() {
    const { timesheetFile } = this.state
    return (
      <p style={Styles.FileName}>{timesheetFile.name}</p>
    )
  }

  // eslint-disable-next-line class-methods-use-this
  renderFirstStep(daysAreSelected, daysSelectedText) {
    if (daysAreSelected) {
      return (
        <div style={Styles.StepRow}>
          <h3>1. {daysSelectedText}</h3>
          <img src={greenCheck} style={Styles.redX} alt="redX" />
        </div>
      )
    }
    return (
      <div style={Styles.StepRow}>
        <h3>1. Select your time period</h3>
        <img src={redX} style={Styles.redX} alt="redX" />
      </div>
    )
  }

  renderSecondStep() {
    const { timesheetFile } = this.state
    if (timesheetFile) {
      return (
        <div style={Styles.StepRow}>
          <h3>2. {timesheetFile.name}</h3>
          <img src={greenCheck} style={Styles.redX} alt="redX" />
        </div>
      )
    }
    return (
      <div style={Styles.StepRow} onMouseEnter={this.toggleHover}>
        <h3>2. Upload excel file (xlsx)</h3>
        <img src={redX} style={Styles.redX} alt="redX" />
      </div>
    )
  }

  renderRecentTimesheets() {
    const { recentlySubmittedTimesheets } = this.props
    if (recentlySubmittedTimesheets.length > 0) {
      return <ul style={Styles.recentTimesheetsList}>
        { recentlySubmittedTimesheets.map(timesheet => <RecentTimesheet key={timesheet.timestamp} timesheet={timesheet} />) }
      </ul>
    }
    return null
  }

  renderEmployeeLayout() {
    return (
      <div style={Styles.DasboardContainer}>
        { this.renderEmployeeSidePanel() }
        { this.renderEmployeeContent() }
      </div>
    )
  }

  renderEmployeeContent = () => {
    const { currentEmployeeLayout } = this.state

    if (currentEmployeeLayout === EmployeeLayouts.SUBMIT) {
      return this.renderEmployeeSubmitLayout()
    }
    if (currentEmployeeLayout === EmployeeLayouts.RECENT) {
      return this.renderEmployeeRecentlySubmittedLayout()
    }
    if (currentEmployeeLayout === EmployeeLayouts.SETTINGS) {
      return this.renderAdminSettingsLayout()
    }
    return null
  }

  renderEmployeeSidePanel = () => {
    return (
      <div style={Styles.adminSidePanel}>
        <div style={Styles.adminSidePanelButton} onClick={() => this.setState({ currentEmployeeLayout: EmployeeLayouts.SUBMIT })}>Submit</div>
        <div style={Styles.adminSidePanelButton} onClick={() => this.setState({ currentEmployeeLayout: EmployeeLayouts.RECENT })}>Recent</div>
        <div style={Styles.adminSidePanelButton} onClick={() => this.setState({ currentEmployeeLayout: EmployeeLayouts.SETTINGS })}>Settings</div>
      </div>
    )
  }

  renderAdminSidePanel() {
    return (
      <div style={Styles.adminSidePanel}>
        <div style={Styles.adminSidePanelButton} onClick={() => this.setState({ currentAdminLayout: AdminLayouts.TIMESHEETS })}>View Timesheets</div>
        <div style={Styles.adminSidePanelButton} onClick={() => this.setState({ currentAdminLayout: AdminLayouts.EMPLOYEES })}>View Employees</div>
        <div style={Styles.adminSidePanelButton} onClick={() => this.setState({ currentAdminLayout: AdminLayouts.SETTINGS })}>Settings</div>
      </div>
    )
  }

  renderEmployeeRecentlySubmittedLayout = () => {
    return (
      <div style={Styles.RecentlySubmittedContainer}>
        <p style={Styles.RecentlySubmittedText}>Recently Submitted</p>
        { this.renderRecentTimesheets() }
      </div> 
    )
  }

  renderEmployeeSubmitLayout = () => {
    const { userState, saveToDatabase, timesheetUploadError, timesheetUploadStart, timesheetUploading } = this.props
    const { timesheetFile, hoverRange, selectedDays, timesheetTimestamp, shouldShowDayPickerTooltip, shouldFileUploaderTooltip, shouldShowSubmitTimesheetTooltip } = this.state

    const daysAreSelected = selectedDays.length > 0;
    const daysSelectedText = `${moment(selectedDays[0]).format('LL')} – ${moment(selectedDays[6]).format('LL')}`
    const modifiers = {
      hoverRange,
      selectedRange: daysAreSelected && {
        from: selectedDays[0],
        to: selectedDays[6],
      },
      hoverRangeStart: hoverRange && hoverRange.from,
      hoverRangeEnd: hoverRange && hoverRange.to,
      selectedRangeStart: daysAreSelected && selectedDays[0],
      selectedRangeEnd: daysAreSelected && selectedDays[6],
    }
    return (
      <div style={Styles.SubmitContainer}>
        <div style={Styles.SubmitHeader}>
          <h2>Submit</h2>
          { 
            shouldShowSubmitTimesheetTooltip &&
              <Tooltip hideTooltip={() => this.setState({ shouldShowSubmitTimesheetTooltip: false })} containerStyle={Styles.EmployeeSubmitHeaderTooltip} itemName={TooltipItems.SubmitTimesheet} text='Select your time period and excel file then press submit' />
          }
        </div>
        <div style={Styles.StepsList}>
          {/* FIRST STEP */ }
          {this.renderFirstStep(daysAreSelected, daysSelectedText)}
          {/* SECOND STEP */}
          {this.renderSecondStep()}
          {/* SUBMIT BUTTON */}
          { timesheetFile && daysAreSelected &&
            <button type="button" style={Styles.SubmitTimesheetButton} onClick={this.startUploadManually}>
              { !timesheetUploading && <p>Submit</p> }
              { timesheetUploading && <Loader type="ThreeDots" color="#00BFFF" height={40} width={80} /> }
            </button> }
        </div>
        <div style={Styles.CalendarContainer}>
        { 
            shouldShowDayPickerTooltip &&
              <Tooltip hideTooltip={() => this.setState({ shouldShowDayPickerTooltip: false })} containerStyle={Styles.dayPickerTooltip} itemName={TooltipItems.DayPicker} text='Select the work week of your timesheet'/>
          }
          <div style={Styles.Calendar}>
            <DayPicker
              selectedDays={selectedDays}
              showWeekNumbers
              showOutsideDays
              modifiers={modifiers}
              onDayClick={this.handleDayChange}
              onDayMouseEnter={this.handleDayEnter}
              onDayMouseLeave={this.handleDayLeave}
              onWeekClick={this.handleWeekClick}
            />
          </div>
        </div>
        
        { selectedDays.length > 0 &&
          <div style={Styles.fileUploader}>
            <FileUploader
              ref={instance => { this.fileUploader = instance }}
              onChange={event => this.setState({ timesheetFile: event.target.files[0], timesheetTimestamp: Date.now() })}
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" // only .xlsx
              storageRef={firebase.storage().ref(`timesheets/${userState.id}`)}
              filename={timesheetTimestamp}
              onUploadStart={timesheetUploadStart}
              onUploadError={timesheetUploadError}
              onUploadSuccess={(filename, task) => {
                this.clearFields()
                return firebase.storage().ref(`timesheets/${userState.id}`).child(filename).getDownloadURL()
                  .then(downloadUrl => {
                    const timesheetTimePeriod = daysSelectedText
                    const filepath = task.snapshot.metadata.fullPath
                    const timestamp = task.snapshot.metadata.name.split('.')[0]
                    const id = timestamp
                    const userId = userState.id
                    const action = {
                      timesheetTimePeriod,
                      filepath,
                      id,
                      userId,
                      timestamp,
                      downloadUrl
                    }
                    return saveToDatabase(action)
                  })
                  .catch(error => {
                    timesheetUploadError(error)
                  })
              }}
              onProgress={this.handleProgress}
            />
            { 
              shouldFileUploaderTooltip &&
                <Tooltip hideTooltip={() => this.setState({ shouldFileUploaderTooltip: false })} containerStyle={Styles.FileUploaderTooltip} text='hello' itemName={TooltipItems.FileUploader} />
            }
          </div>
        }
      </div>
    )
  }

  renderAdminEmployeesTableData() {
    const { employees, setSignUpError, fetchUserData } = this.props
    if (!employees) return null
    return employees.map((employee, index) => (
      <AdminEmployeeCell employee={employee} index={index} setSignUpError={setSignUpError} fetchUserData={fetchUserData} />
    ))
  }

  renderAddEmployeeLayout() {
    const { signUpLoading } = this.props
    const { email, password, name } = this.state
    return (
      <form onSubmit={this.handleSubmit} style={Styles.addEmployeeContainer}>
        <div style={Styles.AddEmployeeNameContainer}>
          <label style={Styles.AddEmployeeNameLabel}>Name:</label>
          <input style={Styles.AddEmployeeNameInput} type="text" value={name} onChange={this.handleNameChange} />
        </div>
        <div style={Styles.AddEmployeeEmailContainer}>
          <label style={Styles.AddEmployeeEmailLabel}>Email:</label>
          <input style={Styles.AddEmployeeEmailInput} type="text" value={email} onChange={this.handleEmailChange} />
        </div>
        <div style={Styles.AddEmployeePasswordContainer}>
          <label style={Styles.AddEmployeePasswordLabel}>Password:</label>
          <input style={Styles.AddEmployeePasswordInput} value={password} onChange={this.handlePassChange} />
        </div>
        <button style={Styles.submitButton} type="submit">
          { !signUpLoading && <p>Sign Up</p> }
          { signUpLoading && <Loader type="ThreeDots" color="#00BFFF" height={40} width={80} /> }
        </button>
      </form>
    )
  }

  renderAdminEmployeesLayout() {
    const { shouldShowAddEmployee, shouldShowAddEmployeeToolTip } = this.state
    return (
      <div style={Styles.adminEmployeesLayoutContainer}>
        <p style={Styles.timesheetHeader}>Employees</p>
        <div style={Styles.employeesTableContainer}>
          <table style={Styles.employeesTable}>
            <tr>
              <th style={Styles.employeesTableCell}>Email address</th>
              <th style={Styles.employeesTableCell}>Name</th>
            </tr>
            <tbody>
              {this.renderAdminEmployeesTableData()}
            </tbody>
          </table>
          <div style={Styles.addEmployeeButtonContainer}>
            <div style={Styles.addEmployeeButton} onClick={() => this.addEmployeeClicked()}>
              <p>Add Employee</p>
            </div>
            { 
              shouldShowAddEmployeeToolTip && 
                <Tooltip hideTooltip={() => this.setState({ shouldShowAddEmployeeToolTip: false })} containerStyle={Styles.addEmployeeButtonTooltip} itemName={TooltipItems.AddEmployee} text='Click here to add employees from your company'/>
            }
          </div>
          { shouldShowAddEmployee && this.renderAddEmployeeLayout() }
        </div>
      </div>
    )
  }

  renderEmailEditting = () => {
    return (
      <div style={Styles.EmailContainer}>
        <p>Email</p>
        <div style={Styles.SettingsEmail}>
          <input placeholder='Password' autoFocus onChange={(evt) => this.setState({ newEmailPassword: evt.target.value }) } />
          <input placeholder='New Email' onChange={(evt) => this.setState({ newSettingEmail: evt.target.value }) } />
        </div>
        <div style={Styles.EditButtonContainer}>
          <button type='submit' onClick={this.edittingEmailSubmit}>Submit</button>
        </div>
      </div>
    )
  }

  renderPasswordEditting = (key) => {
    return (
      <div style={Styles.EmailContainer} key={key}>
        <p>Password</p>
        <div style={Styles.SettingsPassword}>
          <input placeholder='Old Password' autoFocus onChange={(evt) => this.setState({ oldPassword: evt.target.value }) } />
          <input placeholder='New Password' onChange={(evt) => this.setState({ newPassword: evt.target.value }) } />
        </div>
        <div style={Styles.EditButtonContainer}>
          <button type='submit' onClick={this.edittingPasswordSubmit}>Submit</button>
        </div>
      </div>
    )
  }

  renderNameEditting = (key) => {
    return (
      <div style={Styles.EmailContainer} key={key}>
        <p>Name</p>
        <div style={Styles.SettingsPassword}>
          <input placeholder='New name' onChange={(evt) => this.setState({ newName: evt.target.value }) } />
        </div>
        <div style={Styles.EditButtonContainer}>
          <button type='submit' onClick={this.edittingNameSubmit}>Submit</button>
        </div>
      </div>
    )
  }

  renderAdminSetting(header, label, style) {
    const { editting } = this.state
    return (
      <div>
        { !(editting === header) && 
          <div style={Styles.EmailContainer}>
            <p>{header}</p>
            <p style={style}>
              {label}
            </p>
            <div style={Styles.EditButtonContainer}>
            <img src={edit} style={Styles.EmailEditButton} alt="edit" 
              onClick={() => this.setState({ editting: header, newSettingEmail: '', newEmailPassword: '', oldPassword: '', newPassword: '' }) } />
            </div>
          </div>
        }
        { editting === header && header === UserSetting.EMAIL && this.renderEmailEditting(header) }
        { editting === header && header === UserSetting.PASSWORD && this.renderPasswordEditting(header) }
        { editting === header && header === UserSetting.NAME && this.renderNameEditting(header) }

      </div>
    )
  }

  edittingNameSubmit = () => {
    const { setSignUpError, fetchUserData, editNameSubmit } = this.props
    const { newName } = this.state
    const { uid } = firebase.auth().currentUser
    const action = {
      uid,
      newName
    }
    editNameSubmit(uid, newName)
    this.setState({ editting: null })
  }

  edittingEmailSubmit = () => {
    const { fetchUserData, setSignUpError } = this.props
    const { newEmailPassword, newSettingEmail } = this.state
    const user = firebase.auth().currentUser
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      newEmailPassword
    )
    if (!validateEmail(newSettingEmail)) {
      const action = {
        payload: 'Invalid email'
      }
      return setSignUpError(action)
    }
    if (user.email === newSettingEmail) {
      const action = {
        payload: 'Must be a different email'
      }
      return setSignUpError(action)
    }
    user.reauthenticateWithCredential(credential).then(() => {
      user.updateEmail(newSettingEmail).then(() => {
        firebase.database().ref(`/users/${user.uid}/email`).set(newSettingEmail).then(() => {
          // Update successful.
          const action = {
            payload: user.uid
          }
          fetchUserData(action)
          this.setState({ editting: null })
        }).catch((error) => {
          console.log(error)
          const action = {
            payload: error.message
          }
          setSignUpError(action)
        })
      }).catch((error) => {
        // An error happened.
        console.log(error)
        const action = {
          payload: error.message
        }
        setSignUpError(action)

      })
    }).catch((error) => {
      // An error happened.
      console.log(error)
      const action = {
        payload: error.message
      }
      setSignUpError(action)
    })
  }

  edittingPasswordSubmit = () => {
    const { setSignUpError } = this.props
    const { oldPassword, newPassword } = this.state
    const user = firebase.auth().currentUser
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      oldPassword
    )
    user.reauthenticateWithCredential(credential).then(() => {
      user.updatePassword(newPassword).then(() => {
        // Update successful.
        const action = {
          payload: "Successfully changed your password"
        }
        this.setState({ editting: null })
        setSignUpError(action)
      }).catch((error) => {
        // An error happened.
        console.log(error)
        const action = {
          payload: error.message
        }
        setSignUpError(action)

      })
    }).catch((error) => {
      // An error happened.
      console.log(error)
      const action = {
        payload: error.message
      }
      setSignUpError(action)
    })
  }

  renderAdminSettingsLayout() {
    const { userState } = this.props
    const { email, name } = userState
    return (
      <div style={Styles.SettingsLayoutContainer}>
        { this.renderAdminSetting(UserSetting.EMAIL, email, Styles.SettingsEmail) }
        { this.renderAdminSetting(UserSetting.PASSWORD, "**********", Styles.SettingsPassword) }
        { this.renderAdminSetting(UserSetting.NAME, name, Styles.SettingsName) }
      </div>
    )
  }

  renderAdminTimesheets() {
    const { filtersApplied, employeeIdSubmissionTimePeriodsMap, adminTimesheetsSearchText } = this.state
    const { employees } = this.props
    return employees.filter(employee => { // check for time period filter
      if (!filtersApplied || filtersApplied.length <= 0) return true
      for (let i = 0; i < filtersApplied.length; i += 1) {
        if (employeeIdSubmissionTimePeriodsMap[employee.uid]
          && employeeIdSubmissionTimePeriodsMap[employee.uid].includes(filtersApplied[i])) {
          return true
        }
      }
      return false
    })
      .filter(employee => employee.name.includes(adminTimesheetsSearchText))
      .map(employee => <AdminTimesheetTile handleEmployeeIdSubmissionTimePeriodsMap={this.handleEmployeeIdSubmissionTimePeriodsMap} handleAddSubmissionTimePeriods={this.handleAddSubmissionTimePeriods} key={employee.uid} employee={employee} />)
  }

  renderFilterAdminTimesheets() {
    const { submissionTimePeriods, filtersApplied } = this.state
    return (
      <div style={Styles.submittalDateFilterContainer}>
        <p style={Styles.filterContainerHeader}>Filter employees by submittal date:</p>
        <div style={Styles.filtersList}>
          { [...submissionTimePeriods].map(timePeriod => {
            const isChecked = filtersApplied.includes(timePeriod)
            return <label>
              <input style={Styles.filtersCheckbox} checked={isChecked} type="checkbox" value={timePeriod} onChange={(event) => this.handleFilterPressed(event)} />
              {timePeriod}
              <br />
            </label>
          }) }
        </div>
      </div>
    )
  }

  renderSearchTextField() {
    return (
      <input type="text" style={Styles.searchTextField} placeholder="Search by employee..." onChange={(event) => this.searchTextFieldChanged(event)} />
    )
  }

  renderAdminTimesheetsLayout() {
    return (
      <div style={Styles.adminEmployeesLayoutContainer}>
        <p style={Styles.timesheetHeader}>Timesheets</p>
        <div style={Styles.rowFlex}>
          {this.renderSearchTextField()}
          {this.renderFilterAdminTimesheets()}
        </div>
        <div style={Styles.separatorLine} />
        <div style={Styles.adminTimesheetsContainer}>
          {this.renderAdminTimesheets()}
        </div>
      </div>
    )
  }

  renderAdminContent() {
    const { currentAdminLayout } = this.state
    // if (currentAdminLayout === AdminLayouts.HOME) {
    //   return this.renderAdminHomeLayout()
    // }
    if (currentAdminLayout === AdminLayouts.TIMESHEETS) {
      return this.renderAdminTimesheetsLayout()
    }
    if (currentAdminLayout === AdminLayouts.EMPLOYEES) {
      return this.renderAdminEmployeesLayout()
    }
    if (currentAdminLayout === AdminLayouts.SETTINGS) {
      return this.renderAdminSettingsLayout()
    }
    return null
  }

  renderAdminLayout() {
    return (
      <div style={Styles.DasboardContainer}>
        {this.renderAdminSidePanel()}
        {this.renderAdminContent()}
      </div>
    )
  }

  render() {
    const { userState } = this.props
    const isAdmin = adminLoggedIn(userState)
    if (!isAdmin) {
      return (
        this.renderEmployeeLayout()
      )
    }
    if (isAdmin) {
      return (
        this.renderAdminLayout()
      )
    }
    return null
  }
}

DashboardLayout.propTypes = {
  recentlySubmittedTimesheets: PropTypes.array.isRequired,
  signUpLoading: PropTypes.bool.isRequired,
  setSignUpError: PropTypes.func.isRequired,
  signUpWorker: PropTypes.func.isRequired,
  employees: PropTypes.array.isRequired,
  userState: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  setTimesheetFileError: PropTypes.func.isRequired,
  saveToDatabase: PropTypes.func.isRequired,
  timesheetUploadError: PropTypes.func.isRequired,
  timesheetUploadStart: PropTypes.func.isRequired,
  timesheetUploading: PropTypes.bool.isRequired,
  fetchUserData: PropTypes.func.isRequired,
  editNameSubmit: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  recentlySubmittedTimesheets: state.UserReducers.userReducer.timesheets,
  employees: state.UserReducers.userReducer.employees,
  userState: state.UserReducers.userReducer,
  currentLayout: state.LayoutReducers.layoutReducer.currentLayout,
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
  timesheetUploadStart: () => dispatch(timesheetUploadStart()),
  editNameSubmit: (userId, newName) => dispatch(editName(userId, newName))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout)
