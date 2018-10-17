import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Form, Field } from 'react-final-form';

import { login } from '../../actions';
import { retrieveUser } from '../../actions/xhr';
import Client from '../../core/client';

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

  componentDidMount() {
    const { history, token } = this.props;
    if (!token) return;
    history.replace('/');
  }

  onSubmitForm = ({ token }) => {
    const { history } = this.props;
    Client.init(token);
    this.actions.login(token);
    this.actions.retrieveUser();
    history.push('/');
  };

  render() {
    return (
      <div id="login">
        <Form
          onSubmit={this.onSubmitForm}
          validate={() => []}
          initialValues={{ token: null }}
          render={({ handleSubmit, pristine, invalid }) => (
            <form onSubmit={handleSubmit}>
              <h2>Login</h2>
              <div>
                <Field
                  type="text"
                  name="token"
                  placeholder="Github token"
                  render={({ input }) => renderTokenField(input)}
                />
              </div>
              <button type="submit" disabled={pristine || invalid}>
                <span>Submit</span>
              </button>
            </form>
          )}
        />
      </div>
    );
  }
}

Login.defaultProps = {
  token: null,
};

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = ({ token }) => ({ token });

export default connect(mapStateToProps)(Login);
