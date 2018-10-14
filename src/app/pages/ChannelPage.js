import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';

import ChannelFlux from './channels/ChannelFlux';
import ChannelsSidebar from './channels/ChannelsSidebar';
import CreateChannel from './channels/CreateChannel';

class ChannelPage extends React.PureComponent {
  render() {
    const { channels, lastchannel, location } = this.props;
    const firstchannel =
      (channels && channels[0] && channels[0].id) || 'create';
    const channelid = lastchannel || firstchannel;
    return (
      <div id="channel-page" className="flex-columns is-full-height">
        <div id="channel-sidebar" className="flex-0 flex-rows items-center">
          <ChannelsSidebar />
        </div>
        <div className="flex-1 scroll-y">
          <Switch location={location}>
            <Route exact
              key="add-channel-route"
              path="/channel"
              render={() =>
                lastchannel && <Redirect to={`/channel/${channelid}`} />
              } />
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
      </div>
    );
  }
}

ChannelPage.propTypes = {
  channels: PropTypes.array.isRequired,
  lastchannel: PropTypes.string.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = ({ channels, lastchannel }) => ({
  channels,
  lastchannel,
});

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ChannelPage);
