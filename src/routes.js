import HomePage from './app/pages/HomePage';
import ChannelPage from './app/pages/ChannelPage';
import SettingsPage from './app/pages/SettingsPage';

const Routes = {
  main: [
    {
      icon: 'home',
      name: 'Home',
      component: HomePage,
      path: '/',
    },
    {
      icon: 'bell',
      name: 'ChannelPage',
      component: ChannelPage,
      path: '/channel/:view?',
    },
    {
      icon: 'cog',
      name: 'Settings',
      component: SettingsPage,
      path: '/settings',
    },
  ],
};

export default Routes;
