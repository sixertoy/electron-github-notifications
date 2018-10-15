import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { logout } from '../actions';
import { retrieveUser, retrieveUserRepositories } from '../actions/xhr';
import MyProfile from './settings/MyProfile';
import MyRepositories from './settings/MyRepositories';

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
    return (
      <div id="settings" className="p12 is-full-height no-overflow flex-rows">
        <MyProfile />
        <MyRepositories />
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ notifications }) => ({
  notifications,
});

export default connect(mapStateToProps)(SettingsPage);
