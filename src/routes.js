import HomePage from './app/pages/HomePage';
import ChannelPage from './app/pages/ChannelPage';
import SettingsPage from './app/pages/SettingsPage';

const Routes = {
  main: [
    {
      component: HomePage,
      icon: 'octoface',
      name: 'Home',
      path: '/',
    },
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
