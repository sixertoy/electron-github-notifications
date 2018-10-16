import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Loader from '../../components/Loader';
import Repository from '../../components/Repository';
import { subscribe, unsubscribe } from '../../actions';
import { retrieveRepositories } from '../../actions/xhr';
import { selectRepositories } from '../../selectors';

const filterstates = ['all', 'checked', 'unchecked'];

class Repositories extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { filtering: 'all' };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(retrieveRepositories());
  }

  onToggleClick = () => {
    this.setState(prev => {
      const current = filterstates.indexOf(prev.filtering);
      let next = current + 1;
      next = next >= filterstates.length ? 0 : next;
      return { filtering: filterstates[next] };
    });
  };

  onCheckboxChange = ({ target }) => {
    const { dispatch } = this.props;
    const { value, checked } = target;
    const id = Number(value);
    if (checked) dispatch(subscribe(id));
    else dispatch(unsubscribe(id));
  };

  renderRepository = obj => {
    const { id } = obj;
    const { watched } = this.props;
    const { filtering } = this.state;
    const ischecked = watched.includes(id);
    if (!ischecked && filtering === 'checked') return null;
    if (ischecked && filtering === 'unchecked') return null;
    return (
      <Repository
        key={id}
        item={obj}
        checked={ischecked}
        onClick={this.onCheckboxChange}
      />
    );
  };

  // renderOrganisation = obj => {
  //   const { id } = obj;
  //   return (
  //     <Repository key={id} item={obj} checked={false} onClick={() => {}} />
  //   );
  // };

  render() {
    const { loading, repositories, watched } = this.props;
    const count = watched.length;
    const { filtering } = this.state;
    return (
      <div id="settings-my-repositories" className="flex-rows flex-1">
        {loading && <Loader />}
        {!loading && (
          <React.Fragment>
            <div className="flex-0">
              <h2>
                {count} Watched Repositories ({filtering})
              </h2>
              <button type="button" onClick={this.onToggleClick}>
                <span>Show/Hide</span>
              </button>
            </div>
            <div className="flex-columns flex-1">
              {/* <div className="flex-1">
                <div className="organisations">
                  {organisations && organisations.map(this.renderOrganisation)}
                </div>
              </div> */}
              <div className="flex-1 scroll-y">
                <div className="repositories no-overflow">
                  {repositories && repositories.map(this.renderRepository)}
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

Repositories.propTypes = {
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  // organisations: PropTypes.array.isRequired,
  repositories: PropTypes.array.isRequired,
  watched: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  const { loading, watched } = state;
  return {
    loading,
    // organisations: selectOrganisations(state),
    repositories: selectRepositories(state),
    watched,
  };
};

export default connect(mapStateToProps)(Repositories);
