import React from 'react';
import uuid from 'uuid/v1';
import slugify from 'slugify';
import sillyname from 'sillyname';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { bindActionCreators, compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import { createChannel } from '../../actions';

class FluxChannelCreate extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    const actions = { createChannel };
    this.actions = bindActionCreators(actions, dispatch);
  }

  submitHandler = values => {
    const { history } = this.props;
    let slug = slugify(values.name);
    slug = slug.toLowerCase();
    // const icon = `https://identicons.github.com/${slug}.png`;
    // const icon = `https://identicon-api.herokuapp.com/${slug}/100?format=png`;
    const icon = `http://identicon.org?t=${slug}&s=100`;
    this.actions.createChannel({ icon, slug, ...values });
    history.replace(`/channel/${values.id}`);
  };

  renderNameInput = () => (
    <Field name="name"
      id="name"
      type="text"
      render={({ input, meta }) => (
        <label htmlFor="name">
          <span className="is-block is-full-width">Channel Name</span>
          <input {...input} className="is-block is-full-width" />
          {meta.touched && meta.error && <span>{meta.error}</span>}
        </label>
      )} />
  );

  render() {
    const { initialValues, selected } = this.props;
    const hasWatched = selected && selected.length > 0;
    return (
      <div id="flux-channel-create">
        {!hasWatched && (
          <Link to="/settings">
            <span>Add some repositories to watch</span>
          </Link>
        )}
        {hasWatched && (
          <Form onSubmit={this.submitHandler}
            initialValues={initialValues}
            render={({ handleSubmit, pristine, invalid }) => (
              <form onSubmit={handleSubmit}>
                <div className="final-form-row">{this.renderNameInput()}</div>
                <div className="final-form-row">
                  {selected.map(obj => (
                    <label key={obj.id} htmlFor={`repo_${obj.id}`}>
                      <Field id={`repo_${obj.id}`}
                        value={obj.id}
                        type="checkbox"
                        component="input"
                        name="repositories" />
                      <span>{obj.name}</span>
                    </label>
                  ))}
                </div>
                <div className="final-form-row">
                  <button type="submit" disabled={pristine || invalid}>
                    <span>Submit</span>
                  </button>
                </div>
              </form>
            )} />
        )}
      </div>
    );
  }
}

FluxChannelCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired,
};

const mapStateToProps = ({ repositories, watched }) => {
  const selected = repositories.filter(obj => watched.includes(obj.id));
  const initialValues = { name: sillyname(), id: uuid() };
  return { initialValues, selected };
};

export default compose(
  withRouter,
  connect(mapStateToProps)
)(FluxChannelCreate);
