import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import FileUploader from 'react-firebase-file-uploader'
import Generator from 'generate-password'
// import Calendar from 'react-calendar' // https://www.npmjs.com/package/react-calendar
// import DatePicker from 'react-datepicker'; // https://www.npmjs.com/package/react-datepicker
// import 'react-datepicker/dist/react-datepicker.css';
// import ReactDataSheet from 'react-datasheet';
// // Be sure to include styles at some point, probably during your bootstrapping
// import 'react-datasheet/lib/react-datasheet.css'; // https://github.com/nadbm/react-datasheet
// import { FilePicker } from 'react-file-picker'
import DayPicker from 'react-day-picker'; // https://react-day-picker.js.org/examples/selected-week
import Loader from 'react-loader-spinner'
import firebase from '../../Firebase/index'
import 'react-day-picker/lib/style.css';
import { getWeekDays, getWeekRange } from '../../helpers/CalendarHelpers'
import redX from '../../redX.png'
import greenCheck from '../../greenCheck.jpg'
import Styles from './DashboardLayoutStyles'
import { validateEmail } from '../../helpers/UserHelpers'

const AdminLayouts = {
  HOME: 'HOME',
  EMPLOYEES: 'EMPLOYEES'
}

class DashboardLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timesheetTimestamp: null,
      timesheetFile: null,
      hoverRange: null,
      selectedDays: [],
      currentAdminLayout: AdminLayouts.HOME,

      // Add employee state
      shouldShowAddEmployee: false,
      email: '',
      password: '',
      name: ''
    }
    this.fileUploader = null
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

  // renderRecentStands() {
  //   return null
  // }

  renderSubmitLayout() {
    const { userState, saveToDatabase, timesheetUploadError, timesheetUploadStart, timesheetUploading } = this.props
    const { timesheetFile, hoverRange, selectedDays, timesheetTimestamp } = this.state

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
    };
    return (
      <div style={Styles.DasboardContainer}>
        <div style={Styles.RecentlySubmittedContainer}>
          <p style={Styles.RecentlySubmittedText}>Recently Submitted</p>
          {/* {this.renderRecentStands()} */}
        </div>
        <div style={Styles.SubmitContainer}>
          <h2>Submit</h2>
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
                timestamp
              }
              return saveToDatabase(action)
            }}
            onProgress={this.handleProgress}
          />
        </div>
      </div>
    )
  }

  renderAdminSidePanel() {
    return (
      <div style={Styles.adminSidePanel}>
        <button type="button" style={Styles.adminSidePanelButton} onClick={() => this.setState({ currentAdminLayout: AdminLayouts.HOME })}>Home</button>
        <button type="button" style={Styles.adminSidePanelButton} onClick={() => this.setState({ currentAdminLayout: AdminLayouts.EMPLOYEES })}>View Employees</button>
      </div>
    )
  }

  renderAdminHomeLayout() {
    return (
      <p>Home</p>
    )
  }

  renderAdminEmployeesTableData() {
    const { employees } = this.props
    if (!employees) return null
    return employees.map(employee => (
      <tr key={employee.uid}>
        <td>{employee.email}</td>
        <td>{employee.name}</td>
      </tr>
    ))
  }

  renderAddEmployeeLayout() {
    const { isLoading } = this.props
    const { email, password, name } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="NameContainer">
            <label className="NameLabel">Name:</label>
            <input className="NameInput" type="text" value={name} onChange={this.handleNameChange} />
          </div>
          <div className="EmailContainer">
            <label className="EmailLabel">Email:</label>
            <input className="EmailInput" type="text" value={email} onChange={this.handleEmailChange} />
          </div>
          <div className="PasswordContainer">
            <label className="PasswordLabel">Password:</label>
            <input className="PasswordInput" value={password} onChange={this.handlePassChange} />
          </div>
          <button className="SubmitButton" type="submit">
            { !isLoading && <p>Sign Up</p> }
            { isLoading && <Loader type="ThreeDots" color="#00BFFF" height={40} width={80} /> }
          </button>
        </form>
      </div>
    )
  }

  renderAdminEmployeesLayout() {
    const { shouldShowAddEmployee } = this.state
    return (
      <div style={Styles.adminEmployeesLayoutContainer}>
        <table style={Styles.employeesTable}>
          <thead>
            <tr>
              <td style={Styles.employeesTableCell}>Email address</td>
              <td style={Styles.employeesTableCell}>Name</td>
            </tr>
          </thead>
          <tbody>
            {this.renderAdminEmployeesTableData()}
          </tbody>
        </table>
        <button style={Styles.addEmployeeButton} type="button" onClick={() => this.addEmployeeClicked()}>Add Employee</button>
        { shouldShowAddEmployee && this.renderAddEmployeeLayout() }
      </div>
    )
  }

  renderAdminContent() {
    const { currentAdminLayout } = this.state
    if (currentAdminLayout === AdminLayouts.HOME) {
      return this.renderAdminHomeLayout()
    }
    if (currentAdminLayout === AdminLayouts.EMPLOYEES) {
      return this.renderAdminEmployeesLayout()
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
    const { isAdmin } = this.props
    if (!isAdmin) {
      return (
        this.renderSubmitLayout()
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
  isLoading: PropTypes.bool.isRequired,
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
}

export default DashboardLayout
