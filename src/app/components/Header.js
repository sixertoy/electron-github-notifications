import React from 'react';

import Manifest from '../../manifest';

const Header = () => (
  <h1 className="title">
    <span>{Manifest.name}</span>
    <small>{Manifest.description}</small>
  </h1>
);

export default Header;
