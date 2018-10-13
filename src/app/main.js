import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';

// application
import Manifest from './manifest';
import { routes } from './routes';
import { usedebug } from './core/config';
import { slugify, pagetitle } from './helpers';
import Login from './pages/Login';
import NoMatch from './components/routes/NoMatch';
import PrivateRoute from './components/routes/PrivateRoute';

const buildRoute = route => {
  if (!route) return null;
  const { paths, name, icon, links } = route;
  const Component = route.component;
  return paths.map(path => (
    <PrivateRoute exact
      path={path}
      key={slugify(path, 'route')}
      render={() => {
        const pageconfig = { name, icon, path, links };
        return <Component config={pageconfig} />;
      }} />
  ));
};

const getbodyclass = path => `page-${(path && slugify(path)) || 'home'}`;

const Application = ({ version, location }) => (
  <React.Fragment>
    <Helmet>
      <body className={getbodyclass(location.pathname)} />
      <title>
        {pagetitle(routes.main, location.pathname)}
        {usedebug() ? ' | DEV' : ''} | Backoffice
      </title>
    </Helmet>
    <div id="app-container" className="flex-rows">
      <div id="application-header" className="flex-0 p30">
        <h1 className="title">
          <span>{Manifest.name}</span>
          <small>{Manifest.description}</small>
        </h1>
      </div>
      <div id="application-body" className="p30 flex-1 is-relative no-overflow">
        <Switch>
          <Route exact path="/login" component={Login} />
          {routes.main.map(buildRoute)}
          <Route component={NoMatch} />
        </Switch>
      </div>
      {/* <AppNavigation routes={routes} path={location.pathname} /> */}
      <div id="application-footer" className="flex-0 p30 mt60">
        <div className="align-right">
          <span>{`v${version}`}</span>
        </div>
      </div>
    </div>
  </React.Fragment>
);

Application.defaultProps = {};

Application.propTypes = {
  version: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = ({ minimized }) => ({ minimized });

export default withRouter(connect(mapStateToProps)(Application));
