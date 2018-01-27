import React, { Component, PropTypes } from 'react';

const DEGREES_IN_RADIAN = 180 / Math.PI;

export default class TwentyTwenty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startX: NaN,
      startY: NaN,
      isDragging: false,
      position: props.initialPosition,
    };

    this.beginDrag = this.beginDrag.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
  }

  componentWillUnmount() {
    this.endDrag();
  }

  componentWillReceiveProps({ newPosition }) {
    this.setState({ position: newPosition });
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

    const { left, width } = this.refs.component.getBoundingClientRect();
    let position = 100 * (pageX - left) / width;
    position = Math.max(Math.min(position, 100), 0);
    this.setState({ position, isDragging });
  }

  beginDrag(e) {
    if (e) e.preventDefault();
    if (!this.props.isDraggingEnabled) return;

    const { pageX, pageY } = ('touches' in e)
      ? e.touches[0]
      : e;

    this.setState({ startX: pageX, startY: pageY });

    document.addEventListener('mousemove', this.onDragMove);
    document.addEventListener('mouseup', this.endDrag);
    document.addEventListener('touchmove', this.onDragMove);
    document.addEventListener('touchend', this.endDrag);
  }

  endDrag() {
    document.removeEventListener('mousemove', this.onDragMove);
    document.removeEventListener('mouseup', this.endDrag);
    document.removeEventListener('touchmove', this.onDragMove);
    document.removeEventListener('touchend', this.endDrag);

    this.setState({ isDragging: false, startY: NaN, endY: NaN });
  }

  render() {
    const { position } = this.state;
    const {
      children,
      verticalAlign,
      leftHorizontalAlign,
      rightHorizontalAlign,
    } = this.props;


    if (children.length !== 2 && children.length !== 3) {
      console.warn('Expected exactly two or three children'); // eslint-disable-line
      return null;
    }

    return (
      <div
        ref="component"
        style={{ position: 'relative', overflow: 'hidden', whiteSpace: 'nowrap' }}
        onMouseDown={this.beginDrag}
        onTouchStart={this.beginDrag}
      >
        <div
          style={{
            position: 'absolute',
            left: `${position}%`,
            height: '100%',
            width: 0,
            zIndex: 1,
          }}
        >
          {children[2]}
        </div>
        <div
          style={{
            display: 'inline-block',
            width: '100%',
            position: 'relative',
            verticalAlign,
            left: `${position - 100}%`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'relative',
              right: `${position - 100}%`,
              textAlign: leftHorizontalAlign,
            }}
          >
            {children[0]}
          </div>
        </div>
        <div
          style={{
            display: 'inline-block',
            width: '100%',
            position: 'relative',
            verticalAlign,
            left: `${position - 100}%`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'relative',
              right: `${position}%`,
              textAlign: rightHorizontalAlign,
            }}
          >
            {children[1]}
          </div>
        </div>
      </div>
    );
  }
}

TwentyTwenty.propTypes = {
  children: PropTypes.array,
  verticalAlign: PropTypes.string,
  leftHorizontalAlign: PropTypes.string,
  rightHorizontalAlign: PropTypes.string,
  minDistanceToBeginInteraction: PropTypes.number,
  maxAngleToBeginInteraction: PropTypes.number,
  initialPosition: PropTypes.number,
  isDraggingEnabled: PropTypes.bool,
};

TwentyTwenty.defaultProps = {
  verticalAlign: 'middle',
  leftHorizontalAlign: 'center',
  rightHorizontalAlign: 'center',
  minDistanceToBeginInteraction: 15,
  maxAngleToBeginInteraction: 30,
  initialPosition: 50,
  isDraggingEnabled: true,
};
