import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { retrieveNotifications } from '../actions';

class Homepage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.actions = bindActionCreators({ retrieveNotifications }, dispatch);
  }

  componentDidMount() {
    this.actions.retrieveNotifications();
  }

  render() {
    return (
      <div>
        <h1>Homepage</h1>
      </div>
    );
  }
}

Homepage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Homepage);
