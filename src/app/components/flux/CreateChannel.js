import React from 'react';
import uuid from 'uuid/v1';
import slugify from 'slugify';
import sillyname from 'sillyname';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { Field, Form } from 'react-final-form';

import { createChannel } from '../../actions';

class FluxChannelCreate extends React.PureComponent {
  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    const actions = { createChannel };
    this.actions = bindActionCreators(actions, dispatch);
  }

  submitHandler = values => {
    const name = 'channel-name';
    const slugified = slugify(name);
    const icon = `https://github.com/identicons/${slugified}.png`;
    this.actions.createChannel({ icon, ...values });
  };

  renderNameInput = ({ input, meta }) => (
    <div className="final-form-row">
      <label htmlFor="name">
        <input type="text" {...input} />
        {meta.touched && meta.error && <span>{meta.error}</span>}
      </label>
    </div>
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
                <Field name="name" render={this.renderNameInput} />
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
                <button type="submit" disabled={pristine || invalid}>
                  <span>Submit</span>
                </button>
              </form>
            )} />
        )}
      </div>
    );
  }
}

FluxChannelCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  selected: PropTypes.array.isRequired,
};

const mapStateToProps = ({ repositories, watched }) => {
  const selected = repositories.filter(obj => watched.includes(obj.id));
  const initialValues = { name: sillyname(), id: uuid() };
  return { initialValues, selected };
};

export default connect(mapStateToProps)(FluxChannelCreate);
