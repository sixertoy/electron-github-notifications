import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Loader from '../../components/Loader';
import { logout } from '../../actions';
import { retrieveUser } from '../../actions/xhr';

class MyProfile extends React.PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(retrieveUser());
  }

  logoutClickHandler = () => {
    const { dispatch } = this.props;
    dispatch(logout());
  };

  render() {
    const { loading, user } = this.props;
    return (
      <div id="settings-my-profile" className="flex-0">
        {loading && <Loader />}
        {!loading && (
          <React.Fragment>
            <div className="flex-0">
              <h2>My Profile</h2>
            </div>
            <div>
              <span>{user.login}</span>
              <span>{user.name}</span>
            </div>
            <div>
              <button type="button" onClick={this.logoutClickHandler}>
                <span>logout</span>
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

MyProfile.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = ({ loading, user }) => ({
  loading,
  user,
});

export default connect(mapStateToProps)(MyProfile);
