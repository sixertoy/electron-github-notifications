import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

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
  const { path, name, icon, links } = route;
  const Component = route.component;
  return (
    <PrivateRoute
      exact
      path={path}
      key={slugify(path, 'route')}
      render={() => {
        const pageconfig = { name, icon, path, links };
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
        <Navigation />
      </div>
      <div id="application-body" className="flex-1 is-relative no-overflow">
        <Switch>
          <Route exact path="/login" component={Login} />
          {Routes.main.map(buildRoute)}
          <Route component={NoMatch} />
        </Switch>
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
