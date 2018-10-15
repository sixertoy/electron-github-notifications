import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const MyProfile = ({ user }) => (
  <div className="flex-0">
    <span>{user.login}</span>
    <span>{user.name}</span>
  </div>
);

MyProfile.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = ({ user }) => ({
  user,
});

export default connect(mapStateToProps)(MyProfile);
