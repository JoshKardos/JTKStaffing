import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from '../../DashboardLayoutStyles'
import firebase from '../../../../Firebase/index'
import { getMMMDDYYYY } from '../../../../helpers/CalendarHelpers'

class RecentTimesheet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timesheetUrl: null
    }
  }

  componentDidMount() {
    const { timesheet } = this.props
    firebase.storage().ref().child(timesheet.filepath).getDownloadURL()
      .then(url => {
        this.setState({ timesheetUrl: url })
      })
      .catch(error => {
        console.log(`error ${error}`)
      })
  }

  renderSubmittedText(date, dayText) {
    if (date - Date.now() > -600000) {
      return <p>Submitted: Just Now </p>
    }
    if (date - Date.now() > -86400000) {
      return <p>Submitted: Today</p>
    }
    return <p>Submitted: {dayText}</p>
  }

  render() {
    const { timesheet } = this.props
    const { timesheetUrl } = this.state
    const date = new Date(parseInt(timesheet.timestamp))
    const dayText = getMMMDDYYYY(date)
    return (
      <div style={Styles.recentTimesheet}>
        { this.renderSubmittedText(date, dayText)}
        <p>Days: {timesheet.timesheetTimePeriod}</p>
        <a
          style={Styles.downloadLink}
          href={timesheetUrl}
          download
        >Download</a>
      </div>
    )
  }
}

RecentTimesheet.propTypes = {
  timesheet: PropTypes.object.isRequired
}

export default RecentTimesheet
