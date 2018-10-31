import React, { Component } from 'react';
import PropTypes from 'prop-types'

const DEGREES_IN_RADIAN = 180 / Math.PI;

export default class TwentyTwenty extends Component {
  constructor(props) {
    super(props);

    // initialPosition was between 0 and 100, defaultPosition is between 0 and 1
    const { initialPosition = 50, defaultPosition = initialPosition / 100 } = props
    this.state = {
      startX: NaN,
      startY: NaN,
      isDragging: false,
      position: defaultPosition,
    };

    this.beginDrag = this.beginDrag.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.onDragMove = this.onDragMove.bind(this);

    // TODO: Replace with React.createRef() when React 16.3 is more widely adopted
    this.container = element => {
      this.container.current = element;
    };
    this.container.current = null;
  }

  componentWillUnmount() {
    this.endDrag();
  }

  onDragMove(e) {
    if (!this.props.isDraggingEnabled) return;

    let { isDragging } = this.state;
    const isTouch = 'touches' in e;

    const { pageX, pageY } = isTouch
      ? e.touches[0]
      : e;

    if (!isDragging && isTouch) {
      const { maxAngleToBeginInteraction, minDistanceToBeginInteraction } = this.props;
      const { startX, startY } = this.state;

      const dx = startX - pageX;
      const dy = startY - pageY;

      const angle = Math.atan(dy / dx) * DEGREES_IN_RADIAN;
      const distance = Math.sqrt(dx * dx + dy * dy);
      isDragging = distance >= minDistanceToBeginInteraction;

      if (isDragging && Math.abs(angle) > maxAngleToBeginInteraction) {
        // They're trying to scroll vertically
        this.endDrag();
        return;
      } else if (!isDragging) {
        return;
      }
    }

    if (isTouch) e.preventDefault();

    const { left, width } = this.container.current.getBoundingClientRect();
    let position = (pageX - left) / width;
    position = Math.max(Math.min(position, 1), 0);

    if (this.props.position != null) {
      this.setState(state => (
        !state.isDragging !== isDragging ? { isDragging } : null
      ), () => {
        this.props.onChange(position);
      });
    } else {
      this.setState({ position, isDragging });
    }
  }

  beginDrag(e) {
    if (e != null && !('touches' in e)) e.preventDefault();
    if (!this.props.isDraggingEnabled) return;

    const { pageX, pageY } = ('touches' in e)
      ? e.touches[0]
      : e;

    this.setState({ startX: pageX, startY: pageY });

    document.addEventListener('mousemove', this.onDragMove);
    document.addEventListener('mouseup', this.endDrag);
    document.addEventListener('touchmove', this.onDragMove);
    document.addEventListener('touchend', this.endDrag);

    if (this.props.onDragStart) {
      this.props.onDragStart();
    }
  }

  endDrag(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    document.removeEventListener('mousemove', this.onDragMove);
    document.removeEventListener('mouseup', this.endDrag);
    document.removeEventListener('touchmove', this.onDragMove);
    document.removeEventListener('touchend', this.endDrag);

    this.setState({ isDragging: false, startY: NaN, endY: NaN });

    if (this.props.onDragEnd) {
      this.props.onDragEnd();
    }
  }

  render() {
    const { position = this.state.position } = this.props;
    const {
      children = [],
      left = children[0], // legacy API
      right = children[1],
      slider = children[2],
      verticalAlign,
      leftHorizontalAlign,
      rightHorizontalAlign,
    } = this.props;

    return (
      <div
        ref={this.container}
        style={{ position: 'relative', overflow: 'hidden', whiteSpace: 'nowrap' }}
        onMouseDown={this.beginDrag}
        onTouchStart={this.beginDrag}
      >
        <div
          style={{
            position: 'absolute',
            left: `${position * 100}%`,
            height: '100%',
            width: 0,
            zIndex: 1,
          }}
        >
          {slider}
        </div>
        <div
          style={{
            display: 'inline-block',
            width: '100%',
            position: 'relative',
            verticalAlign,
            left: `${(position - 1) * 100}%`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'relative',
              right: `${(position - 1) * 100}%`,
              textAlign: leftHorizontalAlign,
            }}
          >
            {left}
          </div>
        </div>
        <div
          style={{
            display: 'inline-block',
            width: '100%',
            position: 'relative',
            verticalAlign,
            left: `${(position - 1) * 100}%`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'relative',
              right: `${position * 100}%`,
              textAlign: rightHorizontalAlign,
            }}
          >
            {right}
          </div>
        </div>
      </div>
    );
  }
}

TwentyTwenty.propTypes = {
  left: PropTypes.element.isRequired,
  right: PropTypes.element.isRequired,
  splitter: PropTypes.element,
  verticalAlign: PropTypes.string,
  leftHorizontalAlign: PropTypes.string,
  rightHorizontalAlign: PropTypes.string,
  minDistanceToBeginInteraction: PropTypes.number,
  maxAngleToBeginInteraction: PropTypes.number,
  defaultPosition: PropTypes.number,
  position: PropTypes.number,
  isDraggingEnabled: PropTypes.bool,
  onChange: PropTypes.func,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
};

TwentyTwenty.defaultProps = {
  verticalAlign: 'middle',
  leftHorizontalAlign: 'center',
  rightHorizontalAlign: 'center',
  minDistanceToBeginInteraction: 15,
  maxAngleToBeginInteraction: 30,
  isDraggingEnabled: true,
  onChange: () => {},
};
