/* eslint
  camelcase: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout } from '../actions';
import { retrieveUser, retrieveUserRepositories } from '../actions/xhr';
import Repositories from '../components/settings/Repositories';

class SettingsPage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    const actions = { logout, retrieveUser, retrieveUserRepositories };
    this.actions = bindActionCreators(actions, dispatch);
  }

  componentDidMount() {
    this.actions.retrieveUser();
    this.actions.retrieveUserRepositories();
  }

  logoutHandler = () => {
    this.actions.logout();
  };

  render() {
    const { user } = this.props;
    return (
      <div id="settings" className="flex-rows">
        <div className="flex-0">
          <span>{user.login}</span>
          <span>{user.name}</span>
        </div>
        <Repositories />
        <div className="flex-0">
          <button type="button" onClick={this.logoutHandler}>
            <span>logout</span>
          </button>
        </div>
      </div>
    );
  }
}

SettingsPage.propTypes = {
  // repositories: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = ({ notifications, user, watched }) => ({
  notifications,
  repositories: watched.map(o => o.name),
  user,
});

export default connect(mapStateToProps)(SettingsPage);
