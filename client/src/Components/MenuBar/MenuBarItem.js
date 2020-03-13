import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Styles from './Styles/MenuBarItemStyles.js';

class MenuBarItem extends Component {
  render() {
    const { label, onClick } = this.props
    return (
      <div style={Styles.Button} onClick={onClick} role="button">
        <p style={Styles.Label}>{label}</p>
      </div>
    )
  }
}

MenuBarItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default MenuBarItem;
