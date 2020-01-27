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
    const { employee } = this.props
    let timesheetArr = []
    firebase.database().ref(`/user-timesheets/${employee.uid}`).once('value').then(timesheetSnapshot => {
      if (!timesheetSnapshot.val()) return
      Object.keys(timesheetSnapshot.val()).map(key => {
        timesheetArr = [...timesheetArr, timesheetSnapshot.val()[key]]
        // eslint-disable-next-line no-useless-return
        return
      })
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
    return timesheets.map(timesheet => <AdminTimesheetTileTableCell timesheet={timesheet} />)
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
    const { hover } = this.state
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
      </div>
    )
  }
}

AdminTimesheetTile.propTypes = {
  employee: PropTypes.object.isRequired
}

export default AdminTimesheetTile
