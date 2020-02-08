import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Styles from './TooltipStyles'

class Tooltip extends Component {
  render() {
    const { containerStyle, text } = this.props
    return (
      <div style={Styles.container}>
        <div style={containerStyle}>
          <p>{text}</p>
        </div>
      </div>
    )
  }
}

Tooltip.propTypes = {
  containerStyle: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired
}

export default Tooltip
