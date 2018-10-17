import React from 'react';

import Channels from './Channels';
import UserProfile from './UserProfile';
import Repositories from './Repositories';

const Settings = () => (
  <div id="application-page" className="p12 is-full-height">
    <UserProfile />
    <Channels />
    <Repositories />
  </div>
);

export default Settings;
