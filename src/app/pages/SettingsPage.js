import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { retrieveUser, retrieveUserRepositories } from '../actions/xhr';
import MyProfile from './settings/MyProfile';
import MyRepositories from './settings/MyRepositories';

class SettingsPage extends React.PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(retrieveUser());
    dispatch(retrieveUserRepositories());
  }

  render() {
    return (
      <div id="settings" className="p12 is-full-height no-overflow flex-rows">
        <MyProfile />
        <MyRepositories />
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
