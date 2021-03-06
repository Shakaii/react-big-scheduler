'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _popover = require('antd/lib/popover')

var _popover2 = _interopRequireDefault(_popover);

var _propTypes = require('prop-types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectedArea = (_temp = _class = function (_Component) {
    _inherits(SelectedArea, _Component);

    function SelectedArea(props) {
        _classCallCheck(this, SelectedArea);

        return _possibleConstructorReturn(this, (SelectedArea.__proto__ || Object.getPrototypeOf(SelectedArea)).call(this, props));
    }

    _createClass(SelectedArea, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                left = _props.left,
                width = _props.width,
                top = _props.top,
                schedulerData = _props.schedulerData;
            var config = schedulerData.config;
            var viewType = schedulerData.viewType;
            var content = ((top/15) + 6) + ".H - " + (((width+top)/15)+6) + ".H"; //contenu du popover (4H.-6H.)
            /*
            if (viewType !== 1) {
                return (
                    <div className="selected-area" style={left: left, width: width, top: 0, bottom: 0, backgroundColor: config.selectedAreaColor}>
                    </div>
                );
            } else {
                return (
                    <div className="selected-area" style={width:  100/7+'%', height: width, top: top, left: left, backgroundColor: config.selectedAreaColor }>
                        <Popover content={content} placement='bottom' trigger='click' visible='true' />
                    </div>
                );
            }
            */
            if (viewType !== 1) {
                return _react2.default.createElement('div', { className: 'selected-area', style: { left: left, width: width, top: 0, bottom: 0, backgroundColor: config.selectedAreaColor } });
            } else {
                //si en mode semaine on fdait la selection a la vertical
                return _react2.default.createElement('div', { className: 'selected-area', style: { left: left, width: 100/7+'%', height: width, top: top, bottom: 0, backgroundColor: config.selectedAreaColor } }, _react2.default.createElement(_popover2.default, {content: content, placement: 'bottom', trigger: 'click', visible: true}));
            }
        }
    }]);

    return SelectedArea;
}(_react.Component), _class.propTypes = {
    schedulerData: _propTypes.PropTypes.object.isRequired,
    left: _propTypes.PropTypes.number.isRequired,
    width: _propTypes.PropTypes.number.isRequired
}, _temp);
exports.default = SelectedArea;