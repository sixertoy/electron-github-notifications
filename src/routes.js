import Settings from './app/components/pages/settings';
import Notifications from './app/components/pages/notifications';

const Routes = {
  main: [
    {
      component: Notifications,
      icon: 'bell',
      name: 'Notifications',
      path: '/channel/:view?',
    },
    {
      component: Settings,
      icon: 'gear',
      name: 'Settings',
      path: '/settings',
    },
  ],
};

export default Routes;
