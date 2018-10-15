import React from 'react';
import PropTypes from 'prop-types';

const Repository = ({ checked, item, onClick }) => {
  const { icon, id, name } = item;
  return (
    <div className="repository">
      <label htmlFor={`repos_${id}`} className="is-block">
        <input
          value={id}
          type="checkbox"
          checked={checked}
          id={`repos_${id}`}
          onChange={onClick}
        />
        <span className="ml3">{name}</span>
        {icon && <i className={`icon-${icon}`} />}
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
