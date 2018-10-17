import React from 'react';

import Channels from './Channels';
import UserProfile from './UserProfile';
import Repositories from './Repositories';

const Settings = () => (
  <div id="settings-page" className="p12 is-full-height no-overflow flex-rows">
    <UserProfile />
    <Channels />
    <Repositories />
  </div>
);

export default Settings;
