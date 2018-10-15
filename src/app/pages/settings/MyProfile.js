import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../../actions';

const MyProfile = ({ logoutHandler, user }) => (
  <section id="settings-my-profile" className="flex-0">
    <div className="flex-0">
      <h2>My Profile</h2>
    </div>
    <div>
      <span>{user.login}</span>
      <span>{user.name}</span>
    </div>
    <div>
      <button type="button" onClick={logoutHandler}>
        <span>logout</span>
      </button>
    </div>
  </section>
);

MyProfile.propTypes = {
  logoutHandler: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = dispatch => ({
  logoutHandler: () => dispatch(logout()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyProfile);
