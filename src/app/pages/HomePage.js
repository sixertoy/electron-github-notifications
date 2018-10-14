import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const HomePage = ({ channels }) => {
  const len = channels && channels.length > 0;
  return (
    <div id="home-page">
      {!len && (
        <React.Fragment>
          <p>Aucune chaîne</p>
          <p>
            <Link to="/channel/create">
              <span>Ajouter une nouvelle chaîne</span>
            </Link>
          </p>
        </React.Fragment>
      )}
    </div>
  );
};

HomePage.propTypes = {
  channels: PropTypes.array.isRequired,
};

export default HomePage;
