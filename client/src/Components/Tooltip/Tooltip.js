import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from './TooltipStyles'
import './TooltipStyles.css'
class Tooltip extends Component {
  
  iconClicked = () => {
    const { itemName, text, hideTooltip } = this.props
    if (window.confirm(text)) {
      localStorage.setItem(itemName, true)
      return hideTooltip()
    } else {

    } 
  }

  render() {
    const { containerStyle } = this.props
    return (
      <div>
        <div className="blob" style={Object.assign({}, containerStyle, Styles.icon)} onClick={this.iconClicked} >
          <p>?</p>
        </div>
      </div>
    )
  }
}

Tooltip.propTypes = {
  containerStyle: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  itemName: PropTypes.string.isRequired, // string to save to localStroage ex: localStorage.getItem({itemName})
  hideTooltip: PropTypes.func.isRequired
}
export const TooltipItems = {
  AddEmployee: "AddEmployee",
  SubmitTimesheet: 'SubmitTimesheet',
  DayPicker: 'DayPicker',
  FileUploader: 'FileUploader'
}

export const removeTooltipStorage = () => { // removes all tool tip data, never call unless testing
  localStorage.removeItem(TooltipItems.AddEmployee)
  localStorage.removeItem(TooltipItems.SubmitTimesheet)
  localStorage.removeItem(TooltipItems.DayPicker)
  localStorage.removeItem(TooltipItems.FileUploader)
}

export default Tooltip
