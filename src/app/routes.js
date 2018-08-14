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
  ],
};

export default routes;
