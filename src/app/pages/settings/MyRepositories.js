import PropTypes from 'prop-types';
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { subscribe, unsubscribe } from '../../actions';

const filterstates = ['all', 'checked', 'unchecked'];

class MyRepositories extends React.PureComponent {
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
      <div className="item">
        <label key={id} htmlFor={`repos_${id}`} className="is-block">
          <input
            id={id}
            value={id}
            type="checkbox"
            checked={ischecked}
            onChange={this.onCheckboxChange}
          />
          <span className="ml3">{name}</span>
        </label>
      </div>
    );
  }

  render() {
    const { repositories } = this.props;
    const { filtering } = this.state;
    return (
      <section id="settings-my-repositories" className="flex-rows flex-1">
        <div className="flex-0">
          <h2>Watched Repositories ({filtering})</h2>
          <button type="button" onClick={this.onToggleClick}>
            <span>Show/Hide</span>
          </button>
        </div>
        <div className="flex-1 scroll-y">
          <div className="repositories no-overflow">
            {repositories && repositories.map(this.renderRepository)}
          </div>
        </div>
      </section>
    );
  }
}

MyRepositories.propTypes = {
  dispatch: PropTypes.func.isRequired,
  repositories: PropTypes.array.isRequired,
  watched: PropTypes.array.isRequired,
};

const mapStateToProps = ({ watched, repositories }) => ({
  repositories,
  watched,
});

export default connect(mapStateToProps)(MyRepositories);
