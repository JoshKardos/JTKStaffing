import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from '../../DashboardLayoutStyles'
import firebase from '../../../../Firebase/index'
import AdminTimesheetTileTableCell from './AdminTimesheetTileTableCell'

class AdminTimesheetTile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timesheets: [],
      hover: false
    }
  }

  componentDidMount() {
    const { handleEmployeeIdSubmissionTimePeriodsMap, handleAddSubmissionTimePeriods } = this.props
    const { employee } = this.props
    let timesheetArr = []
    let timePeriodsArr = []
    firebase.database().ref(`/user-timesheets/${employee.uid}`).once('value').then(timesheetSnapshot => {
      if (!timesheetSnapshot.val()) return
      Object.keys(timesheetSnapshot.val()).map(key => {
        timesheetArr = [...timesheetArr, timesheetSnapshot.val()[key]]
        timePeriodsArr = [...timePeriodsArr, timesheetSnapshot.val()[key].timesheetTimePeriod]
        // eslint-disable-next-line no-useless-return
        return
      })
      handleAddSubmissionTimePeriods(timePeriodsArr)
      handleEmployeeIdSubmissionTimePeriodsMap(employee.uid, timePeriodsArr)
      this.setState({ timesheets: timesheetArr.reverse() })
    })
  }

  renderTimesheetMessage() {
    const { timesheets } = this.state
    return (
      <p>{timesheets.length}</p>
    )
  }

  renderTimesheetsTableData() {
    const { timesheets } = this.state
    return timesheets.map(timesheet => <AdminTimesheetTileTableCell key={timesheet.timestamp} timesheet={timesheet} />)
  }

  renderHoverTable() {
    const { timesheets } = this.state
    if (timesheets.length === 0) return null
    return (
      <table style={Styles.timesheetTileTable}>
        <thead style={Styles.timesheetTileTableBodyHead}>
          <tr>
            <td>Time Period</td>
            <td>Submittal Date</td>
            <td />
          </tr>
        </thead>
        <tbody style={Styles.timesheetTileTableBody}>
          {this.renderTimesheetsTableData()}
        </tbody>
      </table>
    )
  }

  render() {
    const { employee } = this.props
    const { hover, timesheets } = this.state
    return (
      <div
        style={hover ? Styles.adminTimesheetTileHover : Styles.adminTimesheetTile}
        onMouseEnter={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <p>{employee.name}</p>
        <p>{employee.email}</p>
        {this.renderTimesheetMessage()}
        { hover && this.renderHoverTable() }
        { hover && timesheets.length === 0 && <p>No timesheets uploaded</p>}
      </div>
    )
  }
}

AdminTimesheetTile.propTypes = {
  employee: PropTypes.object.isRequired,
  handleEmployeeIdSubmissionTimePeriodsMap: PropTypes.func.isRequired,
  handleAddSubmissionTimePeriods: PropTypes.func.isRequired
}

export default AdminTimesheetTile
