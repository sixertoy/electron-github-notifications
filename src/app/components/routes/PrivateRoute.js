import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const renderRedirect = () => <Route render={() => <Redirect to="/login" />} />;

const PrivateRoute = ({ children, location, isauthentificated }) => {
  const islogin = location.pathname === '/login';
  const shouldredirect = !isauthentificated;
  if (islogin) return null;
  if (shouldredirect) return renderRedirect();
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  location: PropTypes.object.isRequired,
  isauthentificated: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ githubtoken }) => ({
  isauthentificated: githubtoken !== null,
});

export default compose(
  connect(mapStateToProps),
  withRouter
)(PrivateRoute);
