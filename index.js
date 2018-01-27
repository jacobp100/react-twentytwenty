'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEGREES_IN_RADIAN = 180 / Math.PI;

var TwentyTwenty = function (_Component) {
  _inherits(TwentyTwenty, _Component);

  function TwentyTwenty(props) {
    _classCallCheck(this, TwentyTwenty);

    var _this = _possibleConstructorReturn(this, (TwentyTwenty.__proto__ || Object.getPrototypeOf(TwentyTwenty)).call(this, props));

    _this.state = {
      startX: NaN,
      startY: NaN,
      isDragging: false,
      position: props.initialPosition
    };

    _this.beginDrag = _this.beginDrag.bind(_this);
    _this.endDrag = _this.endDrag.bind(_this);
    _this.onDragMove = _this.onDragMove.bind(_this);
    return _this;
  }

  _createClass(TwentyTwenty, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.endDrag();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var newPosition = _ref.newPosition;

      this.setState({ position: newPosition });
    }
  }, {
    key: 'onDragMove',
    value: function onDragMove(e) {
      if (!this.props.isDraggingEnabled) return;

      var isDragging = this.state.isDragging;

      var isTouch = 'touches' in e;

      var _ref2 = isTouch ? e.touches[0] : e,
          pageX = _ref2.pageX,
          pageY = _ref2.pageY;

      if (!isDragging && isTouch) {
        var _props = this.props,
            maxAngleToBeginInteraction = _props.maxAngleToBeginInteraction,
            minDistanceToBeginInteraction = _props.minDistanceToBeginInteraction;
        var _state = this.state,
            startX = _state.startX,
            startY = _state.startY;


        var dx = startX - pageX;
        var dy = startY - pageY;

        var angle = Math.atan(dy / dx) * DEGREES_IN_RADIAN;
        var distance = Math.sqrt(dx * dx + dy * dy);
        isDragging = distance >= minDistanceToBeginInteraction;

        if (isDragging && Math.abs(angle) > maxAngleToBeginInteraction) {
          // They're trying to scroll vertically
          this.endDrag();
          return;
        } else if (!isDragging) {
          return;
        }
      }

      var _refs$component$getBo = this.refs.component.getBoundingClientRect(),
          left = _refs$component$getBo.left,
          width = _refs$component$getBo.width;

      var position = 100 * (pageX - left) / width;
      position = Math.max(Math.min(position, 100), 0);
      this.setState({ position: position, isDragging: isDragging });
    }
  }, {
    key: 'beginDrag',
    value: function beginDrag(e) {
      if (e) e.preventDefault();
      if (!this.props.isDraggingEnabled) return;

      var _ref3 = 'touches' in e ? e.touches[0] : e,
          pageX = _ref3.pageX,
          pageY = _ref3.pageY;

      this.setState({ startX: pageX, startY: pageY });

      document.addEventListener('mousemove', this.onDragMove);
      document.addEventListener('mouseup', this.endDrag);
      document.addEventListener('touchmove', this.onDragMove);
      document.addEventListener('touchend', this.endDrag);
    }
  }, {
    key: 'endDrag',
    value: function endDrag() {
      document.removeEventListener('mousemove', this.onDragMove);
      document.removeEventListener('mouseup', this.endDrag);
      document.removeEventListener('touchmove', this.onDragMove);
      document.removeEventListener('touchend', this.endDrag);

      this.setState({ isDragging: false, startY: NaN, endY: NaN });
    }
  }, {
    key: 'render',
    value: function render() {
      var position = this.state.position;
      var _props2 = this.props,
          children = _props2.children,
          verticalAlign = _props2.verticalAlign,
          leftHorizontalAlign = _props2.leftHorizontalAlign,
          rightHorizontalAlign = _props2.rightHorizontalAlign;


      if (children.length !== 2 && children.length !== 3) {
        console.warn('Expected exactly two or three children'); // eslint-disable-line
        return null;
      }

      return _react2.default.createElement(
        'div',
        {
          ref: 'component',
          style: { position: 'relative', overflow: 'hidden', whiteSpace: 'nowrap' },
          onMouseDown: this.beginDrag,
          onTouchStart: this.beginDrag
        },
        _react2.default.createElement(
          'div',
          {
            style: {
              position: 'absolute',
              left: position + '%',
              height: '100%',
              width: 0,
              zIndex: 1
            }
          },
          children[2]
        ),
        _react2.default.createElement(
          'div',
          {
            style: {
              display: 'inline-block',
              width: '100%',
              position: 'relative',
              verticalAlign: verticalAlign,
              left: position - 100 + '%',
              overflow: 'hidden'
            }
          },
          _react2.default.createElement(
            'div',
            {
              style: {
                position: 'relative',
                right: position - 100 + '%',
                textAlign: leftHorizontalAlign
              }
            },
            children[0]
          )
        ),
        _react2.default.createElement(
          'div',
          {
            style: {
              display: 'inline-block',
              width: '100%',
              position: 'relative',
              verticalAlign: verticalAlign,
              left: position - 100 + '%',
              overflow: 'hidden'
            }
          },
          _react2.default.createElement(
            'div',
            {
              style: {
                position: 'relative',
                right: position + '%',
                textAlign: rightHorizontalAlign
              }
            },
            children[1]
          )
        )
      );
    }
  }]);

  return TwentyTwenty;
}(_react.Component);

exports.default = TwentyTwenty;


TwentyTwenty.propTypes = {
  children: _react.PropTypes.array,
  verticalAlign: _react.PropTypes.string,
  leftHorizontalAlign: _react.PropTypes.string,
  rightHorizontalAlign: _react.PropTypes.string,
  minDistanceToBeginInteraction: _react.PropTypes.number,
  maxAngleToBeginInteraction: _react.PropTypes.number,
  initialPosition: _react.PropTypes.number,
  isDraggingEnabled: _react.PropTypes.bool
};

TwentyTwenty.defaultProps = {
  verticalAlign: 'middle',
  leftHorizontalAlign: 'center',
  rightHorizontalAlign: 'center',
  minDistanceToBeginInteraction: 15,
  maxAngleToBeginInteraction: 30,
  initialPosition: 50,
  isDraggingEnabled: true
};
