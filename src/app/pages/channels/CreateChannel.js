import React from 'react';
import uuid from 'uuid/v1';
import slugify from 'slugify';
import sillyname from 'sillyname';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';

import { createChannel } from '../../actions';
import { retrieveRepositories } from '../../actions/xhr';
import Loader from '../../components/Loader';

class CreateChannel extends React.PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(retrieveRepositories());
  }

  submitHandler = values => {
    const { dispatch, history } = this.props;
    let slug = slugify(values.name);
    slug = slug.toLowerCase();
    // const icon = `https://identicons.github.com/${slug}.png`;
    // const icon = `https://identicon-api.herokuapp.com/${slug}/100?format=png`;
    const icon = `http://identicon.org?t=${slug}&s=100`;
    const opts = { icon, slug, ...values };
    dispatch(createChannel(opts));
    history.replace(`/channel/${values.id}`);
  };

  renderNameInput = () => (
    <Field
      name="name"
      id="name"
      type="text"
      render={({ input, meta }) => (
        <label htmlFor="name">
          <span className="is-block is-full-width">Channel Name</span>
          <input {...input} className="is-block is-full-width" />
          {meta.touched && meta.error && <span>{meta.error}</span>}
        </label>
      )}
    />
  );

  render() {
    const { initialValues, loading, selected } = this.props;
    const hasWatched = selected && selected.length > 0;
    return (
      <div id="flux-channel-create">
        {loading && <Loader />}
        {!loading &&
          !hasWatched && (
          <Link to="/settings">
            <span>Add some repositories to watch</span>
          </Link>
        )}
        {!loading &&
          hasWatched && (
          <Form
            onSubmit={this.submitHandler}
            initialValues={initialValues}
            render={({ handleSubmit, pristine, invalid }) => (
              <form onSubmit={handleSubmit}>
                <div className="final-form-row">{this.renderNameInput()}</div>
                <div className="final-form-row">
                  {selected.map(obj => (
                    <label key={obj.id} htmlFor={`repo_${obj.id}`}>
                      <Field
                        id={`repo_${obj.id}`}
                        value={obj.id}
                        type="checkbox"
                        component="input"
                        name="repositories"
                      />
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
            )}
          />
        )}
      </div>
    );
  }
}

CreateChannel.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  selected: PropTypes.array.isRequired,
};

const mapStateToProps = ({ loading, repositories, watched }) => {
  const selected = repositories.filter(obj => watched.includes(obj.id));
  const initialValues = { id: uuid(), name: sillyname() };
  return { initialValues, loading, selected };
};

export default compose(
  withRouter,
  connect(mapStateToProps)
)(CreateChannel);
