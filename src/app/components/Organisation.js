import React from 'react';
import PropTypes from 'prop-types';

const Organisation = ({ checked, item, onClick }) => {
  const { id, name } = item;
  return (
    <div className="organisation">
      <label htmlFor={`orgas_${id}`} className="is-block">
        <input
          id={`orgas_${id}`}
          value={id}
          type="checkbox"
          onChange={onClick}
          checked={checked}
        />
        <span className="ml3">#{name}</span>
      </label>
    </div>
  );
};

Organisation.defaultProps = {
  checked: false,
};

Organisation.propTypes = {
  checked: PropTypes.bool,
  item: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Organisation;
