import React, { Component } from 'react'
import PropTypes from 'prop-types';
// import Calendar from 'react-calendar' // https://www.npmjs.com/package/react-calendar
// import DatePicker from 'react-datepicker'; // https://www.npmjs.com/package/react-datepicker
// import 'react-datepicker/dist/react-datepicker.css';
// import ReactDataSheet from 'react-datasheet';
// // Be sure to include styles at some point, probably during your bootstrapping
// import 'react-datasheet/lib/react-datasheet.css'; // https://github.com/nadbm/react-datasheet
import { FilePicker } from 'react-file-picker'

class DashboardLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      timesheetFile: null
    };
  }


  render() {
    const { setTimesheetFileError } = this.props
    console.log(this.state.timesheetFile)
    return (
      <div>
        <p>DASHBOARDLAYOUT</p>
        <FilePicker
          extensions={['md']}
          onChange={FileObject => this.setState({ timesheetFile: FileObject })}
          onError={(error) => setTimesheetFileError({ payload: error })}
        >
          <button type="submit">
            Click to upload timesheet
          </button>
        </FilePicker>
      </div>
    )
  }
}

DashboardLayout.propTypes = {
  isAdmin: PropTypes.bool.isRequired,
  setTimesheetFileError: PropTypes.func.isRequired
}

export default DashboardLayout
