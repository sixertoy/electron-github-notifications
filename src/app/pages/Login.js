import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Field } from 'react-final-form';

import { login } from '../actions';
import { retrieveUser } from '../actions/xhr';

const renderTokenField = input => (
  <label htmlFor="token">
    <span>Github Token</span>
    <input type="text" id="token" {...input} />
  </label>
);

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    const actions = { login, retrieveUser };
    this.actions = bindActionCreators(actions, dispatch);
  }

  onSubmitForm = ({ token }) => {
    const { history } = this.props;
    this.actions.login(token);
    this.actions.retrieveUser();
    history.push('/');
  };

  render() {
    return (
      <Form onSubmit={this.onSubmitForm}
        validate={() => []}
        initialValues={{ token: null }}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
              <Field type="text"
                name="token"
                placeholder="Github token"
                render={({ input }) => renderTokenField(input)} />
            </div>
            <button type="submit" disabled={pristine || invalid}>
              <span>Submit</span>
            </button>
          </form>
        )} />
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default connect()(Login);
