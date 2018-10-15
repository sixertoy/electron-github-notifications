import React from 'react';
import { NavLink } from 'react-router-dom';

import Routes from '../../routes';
import { locationToArray } from '../helpers';

const Navigation = () => {
  const routes = Routes.main;
  const len = routes.length;
  return (
    <nav id="main-navigation" className="flex-columns">
      {routes.map(obj => {
        const { icon, name, path } = obj;
        const linkto = locationToArray(path).shift() || '';
        return (
          <NavLink
            to={`/${linkto}`}
            key={path}
            className={`text-center is-block col-1of${len}`}
          >
            <span>{name}</span>
            <i className={`icon-${icon}`} />
          </NavLink>
        );
      })}
    </nav>
  );
};

export default Navigation;
