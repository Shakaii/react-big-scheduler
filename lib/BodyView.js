'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BodyView = (_temp = _class = function (_Component) {
    _inherits(BodyView, _Component);

    function BodyView(props) {
        _classCallCheck(this, BodyView);

        return _possibleConstructorReturn(this, (BodyView.__proto__ || Object.getPrototypeOf(BodyView)).call(this, props));
    }

    _createClass(BodyView, [{
        key: 'render',
        value: function render() {
            var schedulerData = this.props.schedulerData;
            var renderData = schedulerData.renderData,
                headers = schedulerData.headers,
                config = schedulerData.config,
                behaviors = schedulerData.behaviors,
                viewType = schedulerData.viewType;

            var cellWidth = schedulerData.getContentCellWidth();

            var tableRows = renderData.map(function (item) {
                var rowCells = headers.map(function (header, index) {
                    var arr = [1, 1, 3, 2, 5, 3, 7, 4, 9, 5, 11, 6, 13, 7, 15, 8, 17, 9, 19, 10, 21, 11, 23, 12, 24, 13, 26, 14, 28, 15]
                    /*
                    var colCells = arr.map(function(val, index) {
                        return _react2.default.createElement(
                            'hr',
                            {key: index, style: {marginTop: 12.6, marginBottom: 12.6} }
                        );
                    })
                    */
                   //genere les chiffre pour l'heure
                    var row = _react2.default.createElement(
                        'p',
                        {key: "index", style: {textAlign: "left", marginBottom: 0, fontSize: "13px", lineHeight: 1} },
                        6
                    );
                    var test = false // 1 fois/2 genereation du text puis du hr
                    var numCells = arr.map(function(val, index) {
                        if (test) {
                            test = !test
                            return _react2.default.createElement(
                                'p',
                                {key: index, style: {textAlign: "left", marginBottom: 0, fontSize: "13px", lineHeight: 1} },
                                val+6
                            );
                        } else {
                            test = !test
                            return _react2.default.createElement(
                                'hr',
                                {key: index, style: {marginBottom: 0, marginTop: 0} },
                                null
                            );
                        }
                    })
                    numCells.unshift(row)
                    
                    var key = item.slotId + '_' + header.time;
                    var style = index === headers.length - 1 ? {} : { width: cellWidth };
                    if (!!header.nonWorkingTime) style = _extends({}, style, { backgroundColor: config.nonWorkingTimeBodyBgColor });
                    if (!!behaviors.getNonAgendaViewBodyCellBgColorFunc) {
                        var cellBgColor = behaviors.getNonAgendaViewBodyCellBgColorFunc(schedulerData, item.slotId, header);
                        if (!!cellBgColor) style = _extends({}, style, { backgroundColor: cellBgColor });
                    }
                    return _react2.default.createElement(
                        'td',
                        { key: key, style: style },
                        _react2.default.createElement('div', null, viewType === 1 ? numCells : null)
                    );
                });

                return _react2.default.createElement(
                    'tr',
                    { key: item.slotId, style: { height: item.rowHeight } },
                    rowCells
                );
            });

            return _react2.default.createElement(
                'tbody',
                null,
                tableRows
            );
        }
    }]);

    return BodyView;
}(_react.Component), _class.propTypes = {
    schedulerData: _propTypes.PropTypes.object.isRequired
}, _temp);
exports.default = BodyView;