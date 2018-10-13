import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { retrieveUserRepositories } from '../actions/xhr';
import FluxSidebar from '../components/flux/FluxSidebar';
import FluxChannel from '../components/flux/FluxChannel';
import CreateChannel from '../components/flux/CreateChannel';

class FluxPage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    const actions = { retrieveUserRepositories };
    this.actions = bindActionCreators(actions, dispatch);
  }

  componentDidMount() {
    this.actions.retrieveUserRepositories();
  }

  render() {
    const { location } = this.props;
    return (
      <div id="channel-page" className="flex-columns">
        <div className="flex-0">
          <FluxSidebar />
        </div>
        <div className="flex-1">
          <Switch location={location}>
            <Route exact key="new" path="/new" component={CreateChannel} />
            <Route exact
              key="notifications"
              path="/notifications"
              component={FluxChannel} />
            <Redirect to="/new" />
          </Switch>
        </div>
      </div>
    );
  }
}

FluxPage.defaultProps = {};

FluxPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = ({ repositories }) => ({ repositories });

export default compose(
  withRouter,
  connect(mapStateToProps)
)(FluxPage);
