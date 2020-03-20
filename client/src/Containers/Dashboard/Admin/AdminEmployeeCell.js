import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from '../DashboardLayoutStyles'
import firebase from '../../../Firebase/index'
import axios from 'axios'
import Loader from 'react-loader-spinner'

class AdminEmployeeCell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hover: false,
      editting: false,
      deleting: false,

      // editting state
      newEmployeeName: '',

      //deleting state
      deletingInProgress: false
    }
  }

  editSavePressed = () => {
    const { employee, setSignUpError, fetchUserData } = this.props
    const { newEmployeeName } = this.state
    if (newEmployeeName === '') {
      const action = {
        payload: 'Name must not be empty'
      }
      setSignUpError(action)
      return
    }

    firebase.database().ref(`/users/${employee.uid}/name`).set(newEmployeeName).then(() => {
      const action = {
        payload: firebase.auth().currentUser.uid
      }
      fetchUserData(action)
      this.setState({ editting: false })
    }).catch((error) => {
      const action = {
        payload: 'Error setting new name, try again'
      }
      setSignUpError(action)
    })
  }

  deleteConfirmPressed = (evt) => {
    const { employee, setSignUpError, fetchUserData } = this.props

    this.setState({ deletingInProgress: true })
    axios.post('/user/delete', {
      userId: employee.uid
    }).then(() => {
      firebase.database().ref(`/users/${employee.uid}`).remove().then(() => {
        const action = {
          payload: firebase.auth().currentUser.uid
        }
        fetchUserData(action)
        this.setState({ deleting: false, deletingInProgress: false })
      }).catch((error) => {
        const action = {
          payload: 'Error removing'
        }
        setSignUpError(action)
        this.setState({ deletingInProgress: false })
      })
    }).catch((error) => {
      const action = {
        payload: 'Error deleting'
      }
      setSignUpError(action)
      this.setState({ deletingInProgress: false })
    })
  }

  handleNameChange = (evt) => {
    return this.setState({ newEmployeeName: evt.target.value })
  }

  renderEdittingMode = () => {
    const { employee, index } = this.props
    const { hover, editting } = this.state
    const oddStyle = index % 2 === 1 ? Styles.whiteBackground : null
    const hoveredStyle = hover ? Styles.darkGrayBackground : null
    const cellStyle = { ...Styles.heightForty, ...oddStyle, ...hoveredStyle }
    return (
      <tr style={cellStyle} 
        key={employee.uid}
        onMouseEnter={() => this.setState({ hover: true })} 
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <td>{employee.email}</td>
        <td style={Styles.AdminEmployeeCellFlex}>
          <input type='text' defaultValue={employee.name} onChange={this.handleNameChange}/>
          { hover && <div style={Styles.AdminEmployeeCellButtons}>
            <button style={Styles.AdminEmployeeCellEditButton} onClick={this.editSavePressed}>
              <p>Save</p>
            </button>
            <button style={Styles.AdminEmployeeCellDeleteButton} onClick={() => this.setState({ editting: false })}>
              <p>Cancel</p>
            </button>
          </div> }
        </td>
      </tr>
    )
  }

  renderDeletingMode = () => {
    const { employee, index } = this.props
    const { hover, deletingInProgress} = this.state
    const oddStyle = index % 2 === 1 ? Styles.whiteBackground : null
    const hoveredStyle = hover ? Styles.darkGrayBackground : null
    const cellStyle = { ...Styles.heightForty, ...oddStyle, ...hoveredStyle }
    return (
      <tr style={cellStyle} 
        key={employee.uid}
        onMouseEnter={() => this.setState({ hover: true })} 
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <td>{employee.email}</td>
        <td style={Styles.AdminEmployeeCellFlex}>
          {employee.name}
          { hover && <div style={Styles.AdminEmployeeCellButtons}>
            <button style={Styles.AdminEmployeeCellEditButton} onClick={() => this.setState({ deleting: false })}>
              <p>Cancel</p>
            </button>
            { deletingInProgress && <Loader type="ThreeDots" color="#ff0000" height={40} width={60} /> }
            { !deletingInProgress && 
              <button style={Styles.AdminEmployeeCellDeleteButton} onClick={this.deleteConfirmPressed}>
                <p>Delete</p>
            </button>
            }
          </div> }
        </td>
      </tr>
    )
  }

  render() {
    const { employee, index } = this.props
    const { hover, editting, deleting } = this.state
    const oddStyle = index % 2 === 1 ? Styles.whiteBackground : null
    const hoveredStyle = hover ? Styles.darkGrayBackground : null
    const cellStyle = { ...Styles.heightForty, ...oddStyle, ...hoveredStyle }
    if (editting) {
      return this.renderEdittingMode()
    }
    if (deleting) {
      return this.renderDeletingMode()
    }
    return (
      <tr style={cellStyle} 
        key={employee.uid}
        onMouseEnter={() => this.setState({ hover: true })} 
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <td>{employee.email}</td>
        <td style={Styles.AdminEmployeeCellFlex}>
          {employee.name}
          { hover && <div style={Styles.AdminEmployeeCellButtons}>
            <button style={Styles.AdminEmployeeCellEditButton} onClick={() => this.setState({ editting: true })}>
              <p>Edit</p>
            </button>
            <button style={Styles.AdminEmployeeCellDeleteButton} onClick={() => this.setState({ deleting: true})}>
              <p>Delete</p>
            </button>
          </div> }
        </td>
      </tr>
    )
  }
}

AdminEmployeeCell.propTypes = {
  employee: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  setSignUpError: PropTypes.func.isRequired,
  fetchUserData: PropTypes.func.isRequired
}

export default AdminEmployeeCell
