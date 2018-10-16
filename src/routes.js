import ChannelPage from './app/pages/ChannelPage';
import SettingsPage from './app/pages/SettingsPage';

const Routes = {
  main: [
    {
      component: ChannelPage,
      icon: 'bell',
      name: 'ChannelPage',
      path: '/channel/:view?',
    },
    {
      component: SettingsPage,
      icon: 'gear',
      name: 'Settings',
      path: '/settings',
    },
  ],
};

export default Routes;
