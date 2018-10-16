import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

// application
import { usedebug } from './app/core/config';
import { slugify, pagetitle } from './app/helpers';
import Routes from './routes';
import Login from './app/pages/Login';
import Header from './app/components/Header';
import Navigation from './app/components/Navigation';
import NoMatch from './app/components/router/NoMatch';
import PrivateRoute from './app/components/router/PrivateRoute';

const buildRoute = route => {
  if (!route) return null;
  const { path, name } = route;
  const Component = route.component;
  return (
    <PrivateRoute
      exact
      path={path}
      key={slugify(path, 'route')}
      render={() => {
        const pageconfig = { name, path };
        return <Component config={pageconfig} />;
      }}
    />
  );
};

const getbodyclass = path => `page-${(path && slugify(path)) || 'home'}`;

const Main = ({ location }) => (
  <React.Fragment>
    <Helmet>
      <body className={getbodyclass(location.pathname)} />
      <title>
        {pagetitle(Routes.main, location.pathname)}
        {usedebug() ? ' | DEV' : ''} | Backoffice
      </title>
    </Helmet>
    <div id="app-container" className="flex-rows">
      <div id="application-header" className="flex-0 p12">
        <Header />
      </div>
      <div id="application-body" className="flex-1 is-relative no-overflow">
        <Switch>
          {Routes.main.map(buildRoute)}
          <Route exact path="/login" component={Login} />
          <Route exact path="/" render={() => <Redirect to="/channel" />} />
          <Route component={NoMatch} />
        </Switch>
      </div>
      <div id="application-footer" className="flex-0 mt12 p12">
        <Navigation />
      </div>
    </div>
  </React.Fragment>
);

Main.defaultProps = {};

Main.propTypes = {
  location: PropTypes.object.isRequired,
};

const mapStateToProps = ({ minimized }) => ({ minimized });

export default withRouter(connect(mapStateToProps)(Main));
