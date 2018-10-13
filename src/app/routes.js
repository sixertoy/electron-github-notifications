import Settings from './pages/Settings';
import Flux from './pages/Flux';

export const routes = {
  main: [
    {
      icon: 'home',
      name: 'Flux',
      component: Flux,
      path: '/:view(new|notifications)?',
      title: 'Flux',
    },
    {
      icon: 'gear',
      name: 'Settings',
      component: Settings,
      path: '/settings',
      title: 'Settings',
    },
  ],
};

export default routes;
