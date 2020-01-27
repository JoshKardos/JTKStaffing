import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from '../../DashboardLayoutStyles'
import { getMMMDDYYYY } from '../../../../helpers/CalendarHelpers'
import download from '../../../../download.png'
import firebase from '../../../../Firebase/index'

class AdminTimesheetTileTableCell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timesheetRowHovered: false,
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

  render() {
    const { timesheet } = this.props
    const { timesheetRowHovered, timesheetUrl } = this.state
    const date = new Date(parseInt(timesheet.timestamp))
    return (
      <a href={timesheetUrl}>
        <tr
          onMouseEnter={() => this.setState({ timesheetRowHovered: true })}
          onMouseLeave={() => this.setState({ timesheetRowHovered: false })}
          style={timesheetRowHovered ? Styles.timesheetTileTableBodyHeadHovered : Styles.timesheetTileTableBodyHead}
        >
          <td>{timesheet.timesheetTimePeriod}</td>
          <td>{getMMMDDYYYY(date)}</td>
          <td><img src={download} style={Styles.redX} alt="download" /></td>
        </tr>
      </a>
    )
  }
}

AdminTimesheetTileTableCell.propTypes = {
  timesheet: PropTypes.object.isRequired
}

export default AdminTimesheetTileTableCell
