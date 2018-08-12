import Homepage from './pages/Homepage';

export const routes = {
  main: [
    {
      icon: 'home',
      name: 'Homepage',
      component: Homepage,
      paths: ['/'],
    },
  ],
};

export default routes;
