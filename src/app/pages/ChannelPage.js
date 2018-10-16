import PropTypes from 'prop-types';
import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

import { retrieveRepositories } from '../actions/xhr';
import Flux from './channels/Flux';
import Sidebar from './channels/Sidebar';
import Loader from '../components/Loader';
import CreateChannel from './channels/CreateChannel';

class ChannelPage extends React.PureComponent {
  componentDidMount() {
    const { repositories } = this.props;
    const hasRepositories = repositories && repositories.length > 0;
    if (hasRepositories) return;
    // FIXME -> mettre en place un systeme de cache
    // quand on charge les repositories
    // pour les charger qu'une seule fois
    const { dispatch } = this.props;
    dispatch(retrieveRepositories());
  }

  render() {
    const { channels, lastchannel, location, repositories } = this.props;
    const firstchannel =
      (channels && channels[0] && channels[0].id) || 'create';
    const channelid = lastchannel || firstchannel;
    const hasRepositories = repositories && repositories.length > 0;
    return (
      <div id="channel-page" className="flex-columns is-full-height">
        <div id="channel-sidebar" className="flex-0 flex-rows items-center">
          <Sidebar />
        </div>
        {!hasRepositories && <Loader />}
        {hasRepositories && (
          <div className="flex-1">
            <Switch location={location}>
              <Route
                exact
                key="add-channel-route"
                path="/channel"
                render={() =>
                  lastchannel && <Redirect to={`/channel/${channelid}`} />
                }
              />
              <Route
                exact
                key="add-channel-route"
                path="/channel/create"
                component={CreateChannel}
              />
              <Route
                exact
                key="channel-route"
                path="/channel/:id"
                component={Flux}
              />
            </Switch>
          </div>
        )}
      </div>
    );
  }
}

ChannelPage.propTypes = {
  channels: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  lastchannel: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
  repositories: PropTypes.array.isRequired,
};

const mapStateToProps = ({ channels, lastchannel, repositories }) => ({
  channels,
  lastchannel,
  repositories,
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ChannelPage);
