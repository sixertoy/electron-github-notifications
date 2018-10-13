import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Sidebar extends React.PureComponent {
  addChannelHandler = () => {};

  changeChannelHandler = () => {};

  render() {
    const { channels } = this.props;
    return (
      <div id="flux-sidebar">
        <nav>
          {channels &&
            channels.map(obj => (
              <button type="button" onClick={this.changeChannelHandler}>
                <span>{obj.name}</span>
              </button>
            ))}
          <button type="button" onClick={this.addChannelHandler}>
            <span>add</span>
          </button>
        </nav>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  channels: [],
};

Sidebar.propTypes = {
  channels: PropTypes.array,
};

export default Sidebar;
