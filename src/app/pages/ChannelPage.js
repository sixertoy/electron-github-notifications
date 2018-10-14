import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import { retrieveUserRepositories } from '../actions/xhr';
import Loader from '../components/Loader';
import ChannelFlux from '../components/channels/ChannelFlux';
import ChannelsSidebar from '../components/channels/ChannelsSidebar';
import CreateChannel from '../components/channels/CreateChannel';

class ChannelPage extends React.PureComponent {
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
    const { loading, location } = this.props;
    return (
      <div id="channel-page" className="flex-columns">
        <div id="channel-sidebar" className="flex-0 flex-rows">
          <ChannelsSidebar />
        </div>
        {loading && <Loader />}
        {!loading && (
          <div className="flex-1">
            <Switch location={location}>
              <Route exact
                key="add-channel-route"
                path="/channel/create"
                component={CreateChannel} />
              <Route exact
                key="channel-route"
                path="/channel/:id"
                component={ChannelFlux} />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

ChannelPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = ({ loading, repositories }) => ({
  loading,
  repositories,
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ChannelPage);
