import React from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const MainMenu = () => (
  <div className="is-absolute">
    <div className="is-relative">
      <NavLink to="/settings">
        <span>Settings</span>
      </NavLink>
    </div>
  </div>
);

MainMenu.defaultProps = {};

MainMenu.propTypes = {};

export default MainMenu;
