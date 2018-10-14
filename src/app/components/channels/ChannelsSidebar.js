import React from 'react';
import pick from 'lodash.pick';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class ChannelsSidebar extends React.PureComponent {
  addChannelHandler = () => {};

  changeChannelHandler = () => {};

  renderChannelLink = obj => {
    const { id, icon, name } = obj;
    return (
      <NavLink key={id} to={`/notifications?channel=${id}`}>
        <span>{name}</span>
        <img src={icon}
          alt={name}
          width="80"
          height="80"
          style={{ minWidth: 80, minHeight: 80 }} />
      </NavLink>
    );
  };

  render() {
    const { data } = this.props;
    return (
      <div id="flux-sidebar" className="flex-rows">
        <nav>
          {data && data.map(this.renderChannelLink)}
          <NavLink key="add-channel-button" to="/channel/create">
            <span>add</span>
          </NavLink>
        </nav>
      </div>
    );
  }
}

ChannelsSidebar.defaultProps = {
  data: [],
};

ChannelsSidebar.propTypes = {
  data: PropTypes.array,
};

const mapStateToProps = ({ channels }) => {
  const props = ['name', 'icon', 'id'];
  const data = channels.map(o => pick(o, props));
  return { data };
};

export default connect(mapStateToProps)(ChannelsSidebar);
