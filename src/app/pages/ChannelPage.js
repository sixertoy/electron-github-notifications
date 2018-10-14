import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { Route, Switch, withRouter } from 'react-router-dom';

import ChannelFlux from './channels/ChannelFlux';
import ChannelsSidebar from './channels/ChannelsSidebar';
import CreateChannel from './channels/CreateChannel';

class ChannelPage extends React.PureComponent {
  render() {
    const { location } = this.props;
    return (
      <div id="channel-page" className="flex-columns is-full-height">
        <div id="channel-sidebar" className="flex-0 flex-rows items-center">
          <ChannelsSidebar />
        </div>
        <div className="flex-1 scroll-y">
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
      </div>
    );
  }
}

ChannelPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default compose(withRouter)(ChannelPage);
