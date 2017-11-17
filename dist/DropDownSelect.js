'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactstrap = require('reactstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DropDownSelect = function (_React$Component) {
  _inherits(DropDownSelect, _React$Component);

  function DropDownSelect() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DropDownSelect);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DropDownSelect.__proto__ || Object.getPrototypeOf(DropDownSelect)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      dropdownOpen: false
    }, _this.toggle = function () {
      _this.setState({
        dropdownOpen: !_this.state.dropdownOpen
      });
    }, _this.handleClick = function (e) {
      if (_this.props.onChange) {
        _this.props.onChange(e.target.value);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DropDownSelect, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          options = _props.options,
          block = _props.block;

      var selected = options.find(function (option) {
        return option.selected;
      });

      return _react2.default.createElement(
        _reactstrap.Dropdown,
        { isOpen: this.state.dropdownOpen, toggle: this.toggle },
        _react2.default.createElement(
          _reactstrap.DropdownToggle,
          { block: block, color: selected.color },
          _react2.default.createElement('i', { className: 'fa fa-refresh' }),
          ' ',
          selected ? selected.caption : ''
        ),
        _react2.default.createElement(
          _reactstrap.DropdownMenu,
          null,
          options.map(function (o) {
            return _react2.default.createElement(
              _reactstrap.DropdownItem,
              { onClick: _this2.handleClick, key: o.value, value: o.value },
              o.caption
            );
          })
        )
      );
    }
  }]);

  return DropDownSelect;
}(_react2.default.Component);

DropDownSelect.propTypes = {
  block: _propTypes2.default.bool,
  icon: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  options: _propTypes2.default.array
};
DropDownSelect.defaultProps = {
  onChange: null,
  options: []
};
exports.default = DropDownSelect;