import React from 'react';
import pick from 'lodash.pick';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { changeChannel } from '../../actions';

class Sidebar extends React.PureComponent {
  channelClickHandler = id => {
    const { dispatch } = this.props;
    dispatch(changeChannel(id));
  };

  renderChannelLink = obj => {
    const { id, icon, name } = obj;
    const destination = `/channel/${id}`;
    return (
      <NavLink
        key={id}
        to={destination}
        className="avatar item"
        activeClassName="active"
        onClick={() => this.channelClickHandler(id)}
      >
        <img src={icon} alt={name} />
      </NavLink>
    );
  };

  render() {
    const { data } = this.props;
    return (
      <nav id="channel-sidebar-navigation" className="flex-rows">
        {data && data.map(this.renderChannelLink)}
        <NavLink
          key="add-channel-button"
          to="/channel/create"
          className="item last-item"
        >
          <i className="icon-plus" />
        </NavLink>
      </nav>
    );
  }
}

Sidebar.defaultProps = {
  data: [],
};

Sidebar.propTypes = {
  data: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ channels }) => {
  const props = ['name', 'icon', 'id'];
  const data = channels.map(o => pick(o, props));
  return { data };
};

export default connect(mapStateToProps)(Sidebar);
