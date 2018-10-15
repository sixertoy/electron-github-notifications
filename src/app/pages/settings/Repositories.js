/* eslint
  camelcase: 0
*/
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { subscribe, unsubscribe } from '../../actions';

const filterstates = ['all', 'checked', 'unchecked'];

class Repositories extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.state = { filtering: 'all' };
    this.onToggleClick = this.onToggleClick.bind(this);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.renderRepository = this.renderRepository.bind(this);
    this.actions = bindActionCreators({ subscribe, unsubscribe }, dispatch);
  }

  onToggleClick() {
    this.setState(prev => {
      const current = filterstates.indexOf(prev.filtering);
      let next = current + 1;
      next = next >= filterstates.length ? 0 : next;
      return { filtering: filterstates[next] };
    });
  }

  onCheckboxChange({ target }) {
    const { value, checked } = target;
    const id = Number(value);
    if (checked) this.actions.subscribe(id);
    else this.actions.unsubscribe(id);
  }

  renderRepository(obj) {
    const { filtering } = this.state;
    const { id, name } = obj;
    const { watched } = this.props;
    const ischecked = watched.includes(id);
    if (!ischecked && filtering === 'checked') return null;
    if (ischecked && filtering === 'unchecked') return null;
    return (
      <label key={id} htmlFor={`repos_${id}`} className="is-block">
        <input
          type="checkbox"
          id={id}
          value={id}
          checked={ischecked}
          onChange={this.onCheckboxChange}
        />
        <span>{name}</span>
      </label>
    );
  }

  render() {
    const { repositories } = this.props;
    const { filtering } = this.state;
    return (
      <div className="repositories flex-1">
        <h2>Watched Repositories ({filtering})</h2>
        <button type="button" onClick={this.onToggleClick}>
          <span>Show/Hide</span>
        </button>
        <div className="">
          {repositories && repositories.map(this.renderRepository)}
        </div>
      </div>
    );
  }
}

Repositories.propTypes = {
  dispatch: PropTypes.func.isRequired,
  watched: PropTypes.array.isRequired,
  repositories: PropTypes.array.isRequired,
};

const mapStateToProps = ({ watched, repositories }) => ({
  watched,
  repositories,
});

export default connect(mapStateToProps)(Repositories);
