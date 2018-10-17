import React from 'react';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';

class Scroller extends React.PureComponent {
  constructor(props) {
    super(props);
    this.fluxScrollerContainer = React.createRef();
    this.state = { firstheight: 0, page: 1, scrollposition: 0 };
  }

  componentDidMount() {
    const current = this.getCurrent();
    current.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate() {
    const { provider } = this.props;
    const { firstheight, scrollposition } = this.state;
    if (!provider.length) return;
    const nextposition = scrollposition - firstheight;
    this.scrollToNextPosition(nextposition);
  }

  componentWillUnmount() {
    const current = this.getCurrent();
    current.removeEventListener('scroll', this.handleScroll);
  }

  getCurrent = () => this.fluxScrollerContainer.current;

  handleScroll = () => {
    const { loadMoreHandler } = this.props;
    const current = this.getCurrent();
    const shouldRequest = current.scrollTop <= 0;
    if (!shouldRequest) return;
    const getNextState = prev => {
      const page = prev.page + 1;
      const scrollposition = current.scrollHeight;
      const firstheight = current.firstChild.clientHeight;
      return { firstheight, page, scrollposition };
    };
    this.setState(getNextState, () => {
      const { page } = this.state;
      loadMoreHandler(page);
    });
  };

  scrollToNextPosition = position => {
    const current = this.getCurrent();
    const { clientHeight, scrollHeight } = current;
    const nextPosition = scrollHeight - position - clientHeight;
    current.scrollTop = nextPosition;
  };

  reloadHandler = () => {
    window.location.reload();
  };

  render() {
    const { className, provider, render, showReload } = this.props;
    const props = omit(this.props, [
      'className',
      'loadMoreHandler',
      'provider',
      'render',
      'showReload',
    ]);
    return (
      <div className="flux-scroller is-relative" {...props}>
        <div
          ref={this.fluxScrollerContainer}
          className={`flux-scroller-inner ${className}`}
        >
          {provider &&
            provider.map(obj => (
              <div key={obj.id} className="item">
                {render(obj)}
              </div>
            ))}
        </div>
        {showReload && (
          <button
            type="button"
            onClick={this.reloadHandler}
            className="flux-scroller-reloader"
          >
            <i className="octicon-sync" />
            <span>Reload</span>
          </button>
        )}
      </div>
    );
  }
}

Scroller.defaultProps = {
  className: '',
  showReload: true,
};

Scroller.propTypes = {
  className: PropTypes.string,
  loadMoreHandler: PropTypes.func.isRequired,
  provider: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
  showReload: PropTypes.bool,
};

export default Scroller;
