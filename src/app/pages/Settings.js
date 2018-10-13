/* eslint
  camelcase: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout } from '../actions';
import { retrieveUserRepositories } from '../actions/xhr';
import Repositories from '../components/Repositories';

class SettingsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    const actions = { logout, retrieveUserRepositories };
    this.actions = bindActionCreators(actions, dispatch);
  }

  componentDidMount() {
    this.actions.retrieveUserRepositories();
  }

  logoutHandler = () => {
    this.actions.logout();
  };

  render() {
    return (
      <div id="settings-container" className="">
        <h2>Paramètres</h2>
        <div>
          <button type="button" onClick={this.logoutHandler}>
            <span>logout</span>
          </button>
        </div>
        <Repositories />
      </div>
    );
  }
}

SettingsPage.propTypes = {
  // repositories: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ notifications, watched }) => ({
  notifications,
  repositories: watched.map(o => o.name),
});

export default connect(mapStateToProps)(SettingsPage);
