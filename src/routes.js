import FluxPage from './app/pages/flux';
import SettingsPage from './app/pages/SettingsPage';

const Routes = {
  main: [
    {
      component: FluxPage,
      icon: 'bell',
      name: 'FluxPage',
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
