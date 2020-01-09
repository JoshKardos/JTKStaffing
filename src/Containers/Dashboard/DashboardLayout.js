import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import FileUploader from 'react-firebase-file-uploader';
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

class DashboardLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timesheetTimestamp: null,
      timesheetFile: null,
      hoverRange: null,
      selectedDays: []
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

  clearFields() {
    this.setState({ timesheetFile: null, selectedDays: [], hoverRange: null })
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

  render() {
    const { isAdmin } = this.props
    if (isAdmin) {
      return (
        this.renderSubmitLayout()
      )
    }
    return null
  }
}

DashboardLayout.propTypes = {
  userState: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  setTimesheetFileError: PropTypes.func.isRequired,
  saveToDatabase: PropTypes.func.isRequired,
  timesheetUploadError: PropTypes.func.isRequired,
  timesheetUploadStart: PropTypes.func.isRequired,
  timesheetUploading: PropTypes.bool.isRequired
}

export default DashboardLayout
