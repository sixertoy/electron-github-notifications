import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { retrieveRepositories } from '../actions';
import Repositories from '../components/Repositories';

class Homepage extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = props;
    this.actions = bindActionCreators({ retrieveRepositories }, dispatch);
  }

  componentDidMount() {
    this.actions.retrieveRepositories();
  }

  render() {
    return (
      <div>
        <h1>Homepage</h1>
        <h2>Watched Repositories</h2>
        <Repositories />
      </div>
    );
  }
}

Homepage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Homepage);
