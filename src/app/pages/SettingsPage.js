import React from 'react';

import Channels from './settings/Channels';
import UserProfile from './settings/UserProfile';
import Repositories from './settings/Repositories';

const SettingsPage = () => (
  <div id="settings-page" className="p12 is-full-height no-overflow flex-rows">
    <UserProfile />
    <Channels />
    <Repositories />
  </div>
);

export default SettingsPage;
