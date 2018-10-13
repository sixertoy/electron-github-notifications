import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Field } from 'react-final-form';

import { login } from '../actions';

const renderTokenField = input => (
  <label htmlFor="githubtoken">
    <span>Github Token</span>
    <input type="text" id="githubtoken" {...input} />
  </label>
);

class Login extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.actions = bindActionCreators({ login }, dispatch);
  }

  onSubmitForm = ({ githubtoken }) => {
    const { history } = this.props;
    this.actions.login(githubtoken);
    history.push('/');
  };

  render() {
    return (
      <Form onSubmit={this.onSubmitForm}
        validate={() => []}
        initialValues={{ githubtoken: null }}
        render={({ handleSubmit, pristine, invalid }) => (
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div>
              <Field type="text"
                name="githubtoken"
                placeholder="First Name"
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
