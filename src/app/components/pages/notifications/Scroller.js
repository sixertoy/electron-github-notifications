import React from 'react';
import omit from 'lodash.omit';
import PropTypes from 'prop-types';

class Scroller extends React.PureComponent {
  constructor(props) {
    super(props);
    const { startPage } = this.props;
    this.fluxScrollerContainer = React.createRef();
    this.state = { firstheight: 0, page: startPage, scrollposition: 0 };
  }

  componentDidMount() {
    const current = this.getScrollContainer();
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
    const current = this.getScrollContainer();
    current.removeEventListener('scroll', this.handleScroll);
  }

  getScrollContainer = () => this.fluxScrollerContainer.current;

  getScrollNextState = prev => {
    const current = this.getScrollContainer();
    const page = prev.page + 1;
    const scrollposition = current.scrollHeight;
    const firstheight = current.firstChild.clientHeight;
    return { firstheight, page, scrollposition };
  };

  onScrollNextStateChange = () => {
    const { page } = this.state;
    const { loadMoreHandler } = this.props;
    // const config = { page }
    loadMoreHandler(page);
  };

  handleScroll = () => {
    const current = this.getScrollContainer();
    const shouldRequest = current.scrollTop <= 0;
    if (!shouldRequest) return;
    this.setState(this.getScrollNextState, this.onScrollNextStateChange);
  };

  scrollToNextPosition = position => {
    const current = this.getScrollContainer();
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
      'startPage',
    ]);
    return (
      <div className={`flux-scroller is-relative ${className}`} {...props}>
        <div ref={this.fluxScrollerContainer} className="flux-scroller-inner">
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
  startPage: 1,
};

Scroller.propTypes = {
  className: PropTypes.string,
  loadMoreHandler: PropTypes.func.isRequired,
  provider: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
  showReload: PropTypes.bool,
  startPage: PropTypes.number,
};

export default Scroller;
