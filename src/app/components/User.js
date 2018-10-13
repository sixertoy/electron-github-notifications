import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const User = ({ user }) => (
  <div>
    <span>{user.login}</span>
    <span>{user.name}</span>
    <img src={user.avatar_url} alt="" />
  </div>
);

User.defaultProps = {
  user: null,
};

User.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(User);
