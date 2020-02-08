import React, { Component } from 'react'
import './HomeLayoutStyles.css'
// import PropTypes from 'prop-types'

class HomeLayout extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div className="HomeContainer">
        <div className="InnerHomeContainer">
          <ul>
            <p className="WhatWeOffer">What We Offer:</p>
            <li>Easy timesheet completion and submittal</li>
            <li>Store timesheet history in the cloud</li>
            <li>Send a copy of a submitted timesheet to the company admin&apos;s email</li>
            <li>Keep your employees&apos; time information organized and all in one place</li>
          </ul>
          <p className="SignUpText">Sign up as an admin and register your employees to get started...</p>
        </div>
      </div>
    )
  }
}

HomeLayout.propTypes = {

}

export default HomeLayout
