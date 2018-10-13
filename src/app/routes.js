import Settings from './pages/Settings';
import Notifications from './pages/Notifications';

export const routes = {
  main: [
    {
      icon: 'home',
      name: 'Notification',
      component: Notifications,
      paths: ['/'],
      title: 'Notification',
    },
    {
      icon: 'gear',
      name: 'Settings',
      component: Settings,
      paths: ['/settings'],
      title: 'Settings',
    },
  ],
};

export default routes;
