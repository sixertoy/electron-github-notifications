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

const PageComponent = ({ version, location }) => (
  <div id="app-container">
    <Helmet>
      <body className={getbodyclass(location.pathname)} />
      <title>
        {pagetitle(routes.main, location.pathname)}
        {usedebug() ? ' | DEV' : ''} | Backoffice
      </title>
    </Helmet>
    {/* <AppNavigation routes={routes} path={location.pathname} /> */}
    <div id="page-container">
      <div id="application-header" className="rainbow p30">
        <h1 className="title">
          <span>{Manifest.name}</span>
          <small>{Manifest.description}</small>
        </h1>
        <div className="user align-right" />
      </div>
      {/* <AppBreadcrumbs /> */}
      <div id="application-body">
        <Switch>
          <Route exact path="/login" component={Login} />
          {routes.main.map(buildRoute)}
          <Route component={NoMatch} />
        </Switch>
      </div>
      <div id="application-footer"
        className="flex-columns flex-between p20 mt60">
        <div className="col-left">
          <span>{Manifest.copyright}</span>
        </div>
        <div className="col-right">
          <span>{`v${version}`}</span>
        </div>
      </div>
    </div>
  </div>
);

PageComponent.defaultProps = {};

PageComponent.propTypes = {
  version: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = ({ minimized }) => ({ minimized });

export default withRouter(connect(mapStateToProps)(PageComponent));
