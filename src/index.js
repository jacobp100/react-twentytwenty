import React, { Component, PropTypes } from 'react';

export default class TwentyTwenty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: 50,
    };

    this.beginDrag = this.beginDrag.bind(this);
    this.endDrag = this.endDrag.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
  }

  componentWillUnmount() {
    this.endDrag();
  }

  onDragMove(e) {
    const { clientX } = ('touches' in e)
      ? e.touches[0]
      : e;
    const { left, width } = this.refs.component.getBoundingClientRect();
    let position = 100 * (clientX - left) / width;
    position = Math.max(Math.min(position, 100), 0);
    this.setState({ position });
  }

  beginDrag(e) {
    if (e) e.preventDefault();
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
};

TwentyTwenty.defaultProps = {
  verticalAlign: 'middle',
  leftHorizontalAlign: 'center',
  rightHorizontalAlign: 'center',
};
