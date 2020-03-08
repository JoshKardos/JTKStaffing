import React, { Component } from 'react'
import Styles from './HomeLayoutStyles.js'
// import PropTypes from 'prop-types'

class HomeLayout extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div style={Styles.HomeContainer}>
        <div style={Styles.InnerHomeContainer}>
          <ul>
            <p style={Styles.WhatWeOffer}>What We Offer:</p>
            <li style={Styles.li}>Easy timesheet completion and submittal</li>
            <li style={Styles.li}>Store timesheet history in the cloud</li>
            <li style={Styles.li}>Send a copy of a submitted timesheet to the company admin&apos;s email</li>
            <li style={Styles.li}>Keep your employees&apos; time information organized and all in one place</li>
          </ul>
          <p style={Styles.SignUpText}>Sign up as an admin and register your employees to get started...</p>
        </div>
      </div>
    )
  }
}

HomeLayout.propTypes = {

}

export default HomeLayout
