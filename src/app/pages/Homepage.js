import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Repositories from '../components/Repositories';
import Notifications from '../components/Notifications';
import { retrieveRepositories, retrieveNotifications } from '../actions';

class Homepage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.actions = bindActionCreators(
      { retrieveNotifications, retrieveRepositories },
      dispatch
    );
  }

  componentDidMount() {
    this.actions.retrieveRepositories();
    this.actions.retrieveNotifications();
  }

  render() {
    return (
      <div>
        {/* <h1>Homepage</h1> */}
        <Notifications />
        <Repositories />
      </div>
    );
  }
}

Homepage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Homepage);
