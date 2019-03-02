'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Calendar = require('./Calendar');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _reactstrap = require('reactstrap');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateTimeSelector = function (_React$Component) {
  _inherits(DateTimeSelector, _React$Component);

  function DateTimeSelector(props) {
    _classCallCheck(this, DateTimeSelector);

    var _this = _possibleConstructorReturn(this, (DateTimeSelector.__proto__ || Object.getPrototypeOf(DateTimeSelector)).call(this, props));

    _initialiseProps.call(_this);

    if (props.defaultValue && _moment2.default.isMoment(props.defaultValue)) {
      _this.state.moment = props.defaultValue;
    }
    return _this;
  }

  _createClass(DateTimeSelector, [{
    key: 'update',
    value: function update(value) {
      var _this2 = this;

      var mo = (0, _moment2.default)(value, this.props.format, true); // true means strict parsing

      var isValid = mo.isValid();

      var newState = {
        value: value,
        isValid: isValid,
        moment: isValid ? mo : null
      };

      this.setState(newState, function () {
        if (_this2.props.onChange && isValid) {
          _this2.props.onChange({ value: value, moment: mo });
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          value = _state.value,
          isValid = _state.isValid,
          isCalendarVisible = _state.isCalendarVisible,
          mo = _state.moment;

      var _props = this.props,
          buttonClasses = _props.buttonClasses,
          inputClasses = _props.inputClasses,
          defaultValue = _props.defaultValue,
          format = _props.format,
          rest = _objectWithoutProperties(_props, ['buttonClasses', 'inputClasses', 'defaultValue', 'format']);

      var currentValue = value;

      if (!value && defaultValue) {
        currentValue = defaultValue.format(format);
      }

      return _react2.default.createElement(
        'div',
        { className: 'position-relative' },
        _react2.default.createElement(
          _reactstrap.InputGroup,
          null,
          _react2.default.createElement(_reactstrap.Input, _extends({
            className: 'form-control ' + (isValid ? '' : 'is-invalid') + ' ' + inputClasses
          }, rest, {
            value: currentValue,
            onChange: this.handleChange
          })),
          _react2.default.createElement(
            _reactstrap.InputGroupAddon,
            { addonType: 'append' },
            _react2.default.createElement(
              _reactstrap.Button,
              {
                className: buttonClasses,
                onClick: this.toggleCalendar },
              _react2.default.createElement('i', { className: 'fa fa-calendar' })
            )
          )
        ),
        _react2.default.createElement(_Calendar2.default, {
          asDropDown: true,
          visible: isCalendarVisible,
          value: mo,
          onSubmit: this.handleCalendarSelection,
          format: this.props.format
        })
      );
    }
  }]);

  return DateTimeSelector;
}(_react2.default.Component);

DateTimeSelector.propTypes = {
  defaultValue: function defaultValue(props, propName) {
    if (props[propName] && !_moment2.default.isMoment(props[propName])) {
      throw new Error('Not a moment object');
    }
  },
  onChange: _propTypes2.default.func,
  buttonClasses: _propTypes2.default.string,
  inputClasses: _propTypes2.default.string,
  format: _propTypes2.default.string
};
DateTimeSelector.defaultProps = {
  defaultValue: null,
  onChange: null,
  buttonClasses: '',
  inputClasses: '',
  format: ''
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.state = {
    moment: null,
    value: '',
    isValid: true,
    isCalendarVisible: false
  };

  this.attachOutsideClickListener = function () {
    document.addEventListener('click', _this3.toggleCalendar, false);
  };

  this.detachOutsideClickListener = function () {
    document.removeEventListener('click', _this3.toggleCalendar, false);
  };

  this.handleChange = function (e) {
    _this3.update(e.target.value);
  };

  this.toggleCalendar = function (event) {
    console.log('in toggle', event);
    if (event) {
      if (event.target.closest('.picker')) return;

      event.stopPropagation();
    }

    if (_this3.state.isCalendarVisible) {
      _this3.detachOutsideClickListener();
    } else {
      _this3.attachOutsideClickListener();
    }

    _this3.setState({ isCalendarVisible: !_this3.state.isCalendarVisible });
  };

  this.handleCalendarSelection = function (mo) {
    var value = mo ? mo.format(_this3.props.format) : '';

    _this3.setState({ isValid: true, value: value, moment: mo }, function () {
      _this3.toggleCalendar();

      if (_this3.props.onChange) {
        _this3.props.onChange({ value: value, moment: mo });
      }
    });
  };
};

exports.default = DateTimeSelector;