import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from '../DashboardLayoutStyles'

class AdminEmployeeCell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false
    }
  }

  render() {
    const { employee, index, onClick } = this.props
    const { hover } = this.state
    const oddStyle = index % 2 === 1 ? Styles.whiteBackground : null
    const hoveredStyle = hover ? Styles.darkGrayBackground : null
    const cellStyle = {...oddStyle, ...hoveredStyle}
    return (
      <tr style={cellStyle} 
        key={employee.uid}
        onClick={() => onClick(employee)}
        onMouseEnter={() => this.setState({ hover: true })} 
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <td>{employee.email}</td>
        <td>{employee.name}</td>
      </tr>
    )
  }
}

AdminEmployeeCell.propTypes = {
  employee: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default AdminEmployeeCell
