import React from 'react';
import pick from 'lodash.pick';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Sidebar extends React.PureComponent {
  addChannelHandler = () => {};

  changeChannelHandler = () => {};

  render() {
    const { data } = this.props;
    return (
      <div id="flux-sidebar">
        <nav>
          {data &&
            data.map(obj => (
              <NavLink key={obj.id} to={`/notifications?channel=${obj.id}`}>
                <span>{obj.name}</span>
                <img src={obj.icon}
                  alt=""
                  width="80"
                  height="80"
                  style={{ minWidth: 80, minHeight: 80 }} />
              </NavLink>
            ))}
          <NavLink key="add-channel-button" to="/new">
            <span>add</span>
          </NavLink>
        </nav>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  data: [],
};

Sidebar.propTypes = {
  data: PropTypes.array,
};

const mapStateToProps = ({ channels }) => {
  const props = ['name', 'icon', 'id'];
  console.log('channels', channels);
  const data = channels.map(o => pick(o, props));
  return { data };
};

export default connect(mapStateToProps)(Sidebar);
