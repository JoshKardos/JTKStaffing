import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Styles/MenuBarItemStyles.css';

class MenuBarItem extends Component {
  render() {
    const { label, onClick } = this.props
    return (
      <div className="Button" onClick={onClick} role="button">
        <p className="Label">{label}</p>
      </div>
    )
  }
}

MenuBarItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default MenuBarItem;
