import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const renderRedirect = () => <Route render={() => <Redirect to="/login" />} />;

const PrivateRoute = ({ render, exact, path, isauthentificated }) => {
  const shouldredirect = !isauthentificated;
  if (shouldredirect) return renderRedirect();
  return <Route exact={exact} path={path} render={render} />;
};

PrivateRoute.propTypes = {
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  isauthentificated: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ token }) => ({
  isauthentificated: token !== null,
});

export default connect(mapStateToProps)(PrivateRoute);
