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

var TwentyTwenty = function (_Component) {
  _inherits(TwentyTwenty, _Component);

  function TwentyTwenty() {
    _classCallCheck(this, TwentyTwenty);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TwentyTwenty).call(this));

    _this.state = {
      position: 50
    };
    return _this;
  }

  _createClass(TwentyTwenty, [{
    key: 'render',
    value: function render() {
      var position = this.state.position;
      var _props = this.props;
      var children = _props.children;
      var leftVerticalAlign = _props.leftVerticalAlign;
      var leftHorizontalAlign = _props.leftHorizontalAlign;
      var rightVerticalAlign = _props.rightVerticalAlign;
      var rightHorizontalAlign = _props.rightHorizontalAlign;


      if (children.length !== 2) {
        console.warn('Expected exactly two children'); // eslint-disable-line
        return null;
      }

      return _react2.default.createElement(
        'div',
        { style: { overflow: 'hidden', whiteSpace: 'nowrap' } },
        _react2.default.createElement(
          'div',
          {
            style: {
              display: 'inline-block',
              width: '100%',
              position: 'relative',
              verticalAlign: leftVerticalAlign,
              left: position - 100 + '%'
            }
          },
          _react2.default.createElement(
            'div',
            {
              style: {
                position: 'relative',
                right: 100 - position + '%',
                textAlign: leftHorizontalAlign,
                overflow: 'hidden'
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
              verticalAlign: rightVerticalAlign,
              textAlign: rightHorizontalAlign,
              left: position + '%'
            }
          },
          _react2.default.createElement(
            'div',
            { style: { position: 'relative', right: position + '%', overflow: 'hidden' } },
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
  leftVerticalAlign: _react.PropTypes.string,
  leftHorizontalAlign: _react.PropTypes.string,
  rightVerticalAlign: _react.PropTypes.string,
  rightHorizontalAlign: _react.PropTypes.string
};

TwentyTwenty.defautProps = {
  leftVerticalAlign: 'center',
  leftHorizontalAlign: 'center',
  rightVerticalAlign: 'center',
  rightHorizontalAlign: 'center'
};
