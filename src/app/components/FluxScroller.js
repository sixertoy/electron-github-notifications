import React from 'react';
import PropTypes from 'prop-types';

class FluxScroller extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { page: 0 };
  }

  componentDidMount() {
    const { container } = this.props;
    container.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    const { container } = this.props;
    container.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { loadMore } = this.props;
    const { current } = this.fluxScroller;
    const shouldRequest = current.scrollTop <= 0;
    if (!shouldRequest) return;
    const getNextState = prev => {
      const page = prev.page + 1;
      const scrollposition = current.scrollHeight;
      const firstheight = current.firstChild.clientHeight;
      return { firstheight, page, scrollposition };
    };
    const loadMoreCallback = () => {
      const { page } = this.state;
      loadMore(page);
    };
    this.setState(getNextState, loadMoreCallback);
  };

  scrollToNextPosition = position => {
    const { container } = this.props;
    const { clientHeight, scrollHeight } = container;
    const nextPosition = scrollHeight - position - clientHeight;
    container.scrollTop = nextPosition;
  };

  render() {
    return children;
  }
}

FluxScroller.propTypes = {
  children: PropTypes.array.isRequired,
  container: PropTypes.element.isRequired,
  loadMore: PropTypes.func.isRequired,
  provider: PropTypes.array.isRequired,
  render: PropTypes.func.isRequired,
};
export default FluxScroller;
