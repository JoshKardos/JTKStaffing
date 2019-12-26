import React, { Component } from 'react'
import PropTypes from 'prop-types';
import './GenericErrorModalStyles.css'

class GenericErrorModal extends Component {
  render() {
    const { errorDescription, resetError } = this.props
    return (
      <div className="Backdrop">
        <div className="Modal">
          <p className="Description">{errorDescription}</p>
          <button type="button" className="OkayButton" onClick={resetError}>Okay</button>
        </div>
      </div>
    )
  }
}

GenericErrorModal.propTypes = {
  errorDescription: PropTypes.string.isRequired,
  resetError: PropTypes.func.isRequired
}

export default GenericErrorModal
