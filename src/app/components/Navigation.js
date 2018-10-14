import React from 'react';
import { NavLink } from 'react-router-dom';

import Routes from '../../routes';

const Navigation = () => {
  const routes = Routes.main;
  const len = routes.length;
  return (
    <nav id="main-navigation" className="flex-0 flex-columns">
      {routes.map(obj => {
        const { icon, name, path } = obj;
        return (
          <NavLink to={path}
            key={path}
            className={`text-center is-block col-1of${len}`}>
            <span>{name}</span>
            <i className={`icon-${icon}`} />
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Navigation;
