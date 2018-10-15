import React from 'react';

import MyProfile from './settings/MyProfile';
import MyRepositories from './settings/MyRepositories';

const SettingsPage = () => (
  <div id="settings-page" className="p12 is-full-height no-overflow flex-rows">
    <MyProfile />
    <MyRepositories />
  </div>
);

export default SettingsPage;
