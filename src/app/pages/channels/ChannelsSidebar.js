import React from 'react';
import pick from 'lodash.pick';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { changeChannel } from '../../actions';

class ChannelsSidebar extends React.PureComponent {
  channelClickHandler = id => {
    const { dispatch } = this.props;
    dispatch(changeChannel(id));
  };

  renderChannelLink = obj => {
    const { id, icon, name } = obj;
    return (
      <NavLink key={id}
        to={`/channel/${id}`}
        className="avatar item"
        onClick={() => this.channelClickHandler(id)}>
        <img src={icon} alt={name} />
      </NavLink>
    );
  };

  render() {
    const { data } = this.props;
    return (
      <nav id="channel-sidebar-navigation" className="flex-rows">
        {data && data.map(this.renderChannelLink)}
        <NavLink key="add-channel-button"
          to="/channel/create"
          className="item last-item">
          <i className="fs20 icon-plus" />
        </NavLink>
      </nav>
    );
  }
}

ChannelsSidebar.defaultProps = {
  data: [],
};

ChannelsSidebar.propTypes = {
  data: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ channels }) => {
  const props = ['name', 'icon', 'id'];
  const data = channels.map(o => pick(o, props));
  return { data };
};

export default connect(mapStateToProps)(ChannelsSidebar);
