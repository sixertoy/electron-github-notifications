/* eslint
  camelcase: 0
*/
import React from 'react';
import { Checkbox } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { subscribe, unsubscribe } from '../actions';

class Repositories extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.actions = bindActionCreators({ subscribe, unsubscribe }, dispatch);
    this.onCheckboxChange = this.onCheckboxChange.bind(this);
    this.renderRepository = this.renderRepository.bind(this);
  }

  onCheckboxChange({ target }) {
    const { watched } = this.props;
    const { value, checked } = target;
    const [obj] = watched.filter(o => o.id === value);
    if (checked) this.actions.subscribe(obj);
    else this.actions.unsubscribe(value);
  }

  renderRepository(obj) {
    // owner.login
    // notifications_url
    const { id, name, svn_url } = obj;
    return (
      <li key={id}>
        <Checkbox value={id} onChange={this.onCheckboxChange} />
        <a href={svn_url} target="_blank" rel="noopener noreferrer">
          <span>{name}</span>
        </a>
      </li>
    );
  }

  render() {
    const { watched } = this.props;
    return <ul>{watched && watched.map(this.renderRepository)}</ul>;
  }
}

Repositories.defaultProps = {
  watched: null,
};

Repositories.propTypes = {
  watched: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
  // subscribed: PropTypes.array.isRequired,
};

const mapStateToProps = ({ watched, subscriptions }) => ({
  watched,
  subscriptions,
});

export default connect(mapStateToProps)(Repositories);
