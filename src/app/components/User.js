import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const User = ({ user }) => (
  <div className="user flex-0">
    <span>{user.login}</span>
    <span>{user.name}</span>
    {/* <span className="avatar">
      <img src={user.avatar_url} alt="" />
    </span> */}
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
