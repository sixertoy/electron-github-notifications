import React from 'react';
import PropTypes from 'prop-types';

const Repository = ({ checked, item, onClick }) => {
  const { id } = item;
  return (
    <div className="repository">
      <label htmlFor={`repos_${id}`} className="is-block">
        <input
          id={id}
          value={id}
          type="checkbox"
          onChange={onClick}
          checked={checked}
        />
        <span className="ml3">{item.name}</span>
        <span className="ml3">{item.type}</span>
      </label>
    </div>
  );
};

Repository.propTypes = {
  checked: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Repository;
