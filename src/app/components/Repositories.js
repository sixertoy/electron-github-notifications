/* eslint
  camelcase: 0
*/
import React from 'react';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { subscribe, unsubscribe } from '../actions';

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
    if (checked) {
      // FIXME -> doit on parser ici la valeur de l'object
      // ou dans l'action
      const { id, name, owner } = value;
      this.actions.subscribe({ id, name, owner: owner.login });
    } else this.actions.unsubscribe(value.id);
  }

  renderRepository(obj) {
    const { filtering } = this.state;
    const { id, name, svn_url } = obj;
    const { subscriptions } = this.props;
    const ischecked = subscriptions.includes(id);
    if (!ischecked && filtering === 'checked') return null;
    if (ischecked && filtering === 'unchecked') return null;
    return (
      <li key={id}>
        <Checkbox value={obj}
          checked={ischecked}
          onChange={this.onCheckboxChange} />
        <a href={svn_url} target="_blank" rel="noopener noreferrer">
          <span>{name}</span>
        </a>
      </li>
    );
  }

  render() {
    const { watched } = this.props;
    const { filtering } = this.state;
    return (
      <div>
        <h2>Watched Repositories ({filtering})</h2>
        <button type="button" onClick={this.onToggleClick}>
          <span>Show/Hide</span>
        </button>
        <ul>{watched && watched.map(this.renderRepository)}</ul>
      </div>
    );
  }
}

Repositories.propTypes = {
  dispatch: PropTypes.func.isRequired,
  watched: PropTypes.array.isRequired,
  subscriptions: PropTypes.array.isRequired,
};

const mapStateToProps = ({ watched, subscriptions }) => {
  const parsed = subscriptions.map(o => o.id);
  return {
    watched,
    subscriptions: parsed,
  };
};

export default connect(mapStateToProps)(Repositories);
