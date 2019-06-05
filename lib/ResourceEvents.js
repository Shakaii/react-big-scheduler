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

var _AddMore = require('./AddMore');

var _AddMore2 = _interopRequireDefault(_AddMore);

var _Summary = require('./Summary');

var _Summary2 = _interopRequireDefault(_Summary);

var _SelectedArea = require('./SelectedArea');

var _SelectedArea2 = _interopRequireDefault(_SelectedArea);

var _index = require('./index');

var _Util = require('./Util');

var _DnDTypes = require('./DnDTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResourceEvents = (_temp = _class = function (_Component) {
    _inherits(ResourceEvents, _Component);

    function ResourceEvents(props) {
        _classCallCheck(this, ResourceEvents);

        var _this = _possibleConstructorReturn(this, (ResourceEvents.__proto__ || Object.getPrototypeOf(ResourceEvents)).call(this, props));

        _this.getBrowserId = function () {
            var aKeys = ["MSIE", "Firefox", "Safari", "Chrome", "Opera"],
            sUsrAg = navigator.userAgent,
            nIdx = aKeys.length - 1;

            for (nIdx; nIdx > -1 && sUsrAg.indexOf(aKeys[nIdx]) === -1; nIdx--);

            return nIdx;
        }

        _this.initDrag = function (ev) {
            ev.stopPropagation();
            if (ev.buttons !== undefined && ev.buttons !== 1) return;
            if ((ev.srcElement || ev.target) !== _this.eventContainer) return;

            var schedulerData = _this.props.schedulerData;
            var viewType = schedulerData.viewType
            var scroll = window.pageYOffset
            var cellWidth = schedulerData.getContentCellWidth();
            //en fonction du mode d'affichage, change la facon de calculer
            if (viewType !== 1) {
                var pos = (0, _Util.getPos)(_this.eventContainer);
                var startX = ev.clientX - pos.x;
                var leftIndex = Math.floor(startX / cellWidth);
                var left = leftIndex * cellWidth;
                var rightIndex = Math.ceil(startX / cellWidth);
                var width = (rightIndex - leftIndex) * cellWidth;

                _this.setState({
                    startX: startX,
                    left: left,
                    leftIndex: leftIndex,
                    width: width,
                    rightIndex: rightIndex,
                    isSelecting: true
                });
            } else {
                var cellWidth = schedulerData.getContentCellWidth();
                var pos = (0, _Util.getPos)(_this.eventContainer);
                 
                var startX = ev.clientX - pos.x; //postion x de la souris
                var leftIndex = Math.floor(startX / cellWidth); //calcule dans quelle cellule ce toruve le curseur
                var left = leftIndex * cellWidth; // calcule la marge de gauche
 
                var currentX = ev.clientX - pos.x; //ev.clientY - pos.y
                 leftIndex = Math.floor(Math.min(startX, currentX) / cellWidth); 
 
                 var startY = ev.clientY - pos.y //positon y de la souris
                 _this.getBrowserId() === 3 ? startY = startY + scroll : undefined //dans le cas de chrome et mozilla, reglagle du probleme ou le scroll decalle la valeur du startX
                 var topIndex =  Math.floor(startY / 15) //dans quelque cellule vertical (heure) ce trouve le curseur
                 var top = (topIndex * 15) //margin top
                 var bottomIndex = Math.ceil(startY / 15); //dans quelle celle le curseur s'arrete
                 var height = (bottomIndex - topIndex) * 15 //hauteur de la selection
 
                 _this.setState({
                     startX: startY,
                     left: left,
                     top: top,
                     leftIndex: leftIndex,
                     topIndex: topIndex,
                     width: height,
                     bottomIndex: bottomIndex, 
                     isSelecting: true
                 });
         }
            document.documentElement.addEventListener('mousemove', _this.doDrag, false);
            document.documentElement.addEventListener('mouseup', _this.stopDrag, false);
            document.onselectstart = function () {
                return false;
            };
            document.ondragstart = function () {
                return false;
            };
        };

        _this.doDrag = function (ev) {
            ev.stopPropagation();

            var startX = _this.state.startX;
            var startY = startX;
            var scroll = window.pageYOffset
            var schedulerData = _this.props.schedulerData;
            var headers = schedulerData.headers;
            var viewType = schedulerData.viewType
            var cellWidth = schedulerData.getContentCellWidth();

            if (viewType !== 1) {
                var pos = (0, _Util.getPos)(_this.eventContainer);
                var currentX = ev.clientX - pos.x;
                var leftIndex = Math.floor(Math.min(startX, currentX) / cellWidth);
                leftIndex = leftIndex < 0 ? 0 : leftIndex;
                var left = leftIndex * cellWidth;
                var rightIndex = Math.ceil(Math.max(startX, currentX) / cellWidth);
                rightIndex = rightIndex > headers.length ? headers.length : rightIndex;
                var width = (rightIndex - leftIndex) * cellWidth;

                _this.setState({
                    leftIndex: leftIndex,
                    left: left,
                    rightIndex: rightIndex,
                    width: width,
                    isSelecting: true
                });
            } else {
                var pos = (0, _Util.getPos)(_this.eventContainer);
                var startX = ev.clientX - pos.x;
                var leftIndex = Math.floor(startX / cellWidth);
                var left = leftIndex * cellWidth;
                var currentX = ev.clientX - pos.x; 
                leftIndex = Math.floor(Math.min(startX, currentX) / cellWidth); 

                //meme utilité que precedemment
                var currentY = ev.clientY - pos.y; 
                _this.getBrowserId() === 3 ? currentY = currentY + scroll : undefined
                var topIndex = Math.floor(Math.min(startY, currentY) / 15);
                topIndex = topIndex < 0 ? 0 : topIndex; 
                var top = (topIndex * 15); //8.8
                var bottomIndex = Math.ceil(Math.max(startY, currentY) / 15);
                bottomIndex = bottomIndex > 15 ? 15 : bottomIndex;
                var height = (bottomIndex - topIndex) * 15;
                _this.setState({
                    leftIndex: leftIndex,
                    topIndex: topIndex,
                    top: top,
                    left: left,
                    bottomIndex: bottomIndex,
                    width: height,
                    isSelecting: true
                });
            }
        };

        _this.stopDrag = function (ev) {
            ev.stopPropagation();
            var _this$props = _this.props,
                schedulerData = _this$props.schedulerData,
                newEvent = _this$props.newEvent,
                resourceEvents = _this$props.resourceEvents;
            var headers = schedulerData.headers,
                events = schedulerData.events,
                config = schedulerData.config,
                cellUnit = schedulerData.cellUnit,
                localeMoment = schedulerData.localeMoment;
            var _this$state = _this.state,
                leftIndex = _this$state.leftIndex,
                rightIndex = _this$state.rightIndex,
                topIndex = _this$state.topIndex,
                bottomIndex = _this$state.bottomIndex;
            var viewType = schedulerData.viewType
            document.documentElement.removeEventListener('mousemove', _this.doDrag, false);
            document.documentElement.removeEventListener('mouseup', _this.stopDrag, false);
            document.onselectstart = null;
            document.ondragstart = null;

            //en fonction du ttype de vue ajoute le nombre d'heure necessaire
            var startTime = viewType !== 1 ? headers[leftIndex].time : localeMoment(headers[leftIndex].time).add(topIndex + 6, 'hours').format(_index.DATETIME_FORMAT);//.add(topIndex, hours)
            var endTime = viewType !== 1 ? resourceEvents.headerItems[rightIndex - 1].end : localeMoment(headers[leftIndex].time).add(bottomIndex + 6, 'hours').format(_index.DATETIME_FORMAT);//headers[leftIndex].time.add(bottomIndex, hours)
            //if (cellUnit !== _index.CellUnits.Hour) endTime = localeMoment(resourceEvents.headerItems[rightIndex - 1].start).hour(23).minute(59).second(59).format(_index.DATETIME_FORMAT);
            var slotId = resourceEvents.slotId;
            var slotName = resourceEvents.slotName;

            _this.setState({
                startX: 0,
                leftIndex: 0,
                left: 0,
                rightIndex: 0,
                width: 0,
                isSelecting: false
            });

            var hasConflict = false;
            if (config.checkConflict) {
                var start = localeMoment(startTime),
                    end = localeMoment(endTime);

                events.forEach(function (e) {
                    if (schedulerData._getEventSlotId(e) === slotId) {
                        var eStart = localeMoment(e.start),
                            eEnd = localeMoment(e.end);
                        if (start >= eStart && start < eEnd || end > eStart && end <= eEnd || eStart >= start && eStart < end || eEnd > start && eEnd <= end) hasConflict = true;
                    }
                });
            }

            if (hasConflict) {
                var conflictOccurred = _this.props.conflictOccurred;

                if (conflictOccurred != undefined) {
                    conflictOccurred(schedulerData, 'New', {
                        id: undefined,
                        start: startTime,
                        end: endTime,
                        slotId: slotId,
                        slotName: slotName,
                        title: undefined
                    }, _DnDTypes.DnDTypes.EVENT, slotId, slotName, startTime, endTime);
                } else {
                    console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
                }
            } else {
                if (newEvent != undefined) newEvent(schedulerData, slotId, slotName, startTime, endTime);
            }
        };

        _this.onAddMoreClick = function (headerItem) {
            var _this$props2 = _this.props,
                onSetAddMoreState = _this$props2.onSetAddMoreState,
                resourceEvents = _this$props2.resourceEvents,
                schedulerData = _this$props2.schedulerData;

            if (!!onSetAddMoreState) {
                var config = schedulerData.config;

                var cellWidth = schedulerData.getContentCellWidth();
                var index = resourceEvents.headerItems.indexOf(headerItem);
                if (index !== -1) {
                    var left = index * (cellWidth - 1);
                    var pos = (0, _Util.getPos)(_this.eventContainer);
                    left = left + pos.x;
                    var top = pos.y;
                    var height = (headerItem.count + 1) * config.eventItemLineHeight + 20;

                    onSetAddMoreState({
                        headerItem: headerItem,
                        left: left,
                        top: top,
                        height: height
                    });
                }
            }
        };

        _this.eventContainerRef = function (element) {
            _this.eventContainer = element;
        };

        _this.state = {
            isSelecting: false,
            left: 0,
            width: 0
        };
        return _this;
    }

    _createClass(ResourceEvents, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var schedulerData = this.props.schedulerData;
            var config = schedulerData.config;

            if (config.creatable === true) {
                this.eventContainer.addEventListener('mousedown', this.initDrag, false);
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(np) {
            this.eventContainer.removeEventListener('mousedown', this.initDrag, false);
            if (np.schedulerData.config.creatable) this.eventContainer.addEventListener('mousedown', this.initDrag, false);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                resourceEvents = _props.resourceEvents,
                schedulerData = _props.schedulerData,
                connectDropTarget = _props.connectDropTarget,
                dndSource = _props.dndSource;
            var cellUnit = schedulerData.cellUnit,
                startDate = schedulerData.startDate,
                endDate = schedulerData.endDate,
                config = schedulerData.config,
                localeMoment = schedulerData.localeMoment;
            var _state = this.state,
                isSelecting = _state.isSelecting,
                left = _state.left,
                width = _state.width,
                top = _state.top;

            var cellWidth = schedulerData.getContentCellWidth();
            var cellMaxEvents = schedulerData.getCellMaxEvents();
            var rowWidth = schedulerData.getContentTableWidth();
            var DnDEventItem = dndSource.getDragSource();

            var selectedArea = isSelecting ? _react2.default.createElement(_SelectedArea2.default, _extends({}, this.props, { left: left, width: width, top: top })) : _react2.default.createElement('div', null);

            var eventList = [];
            resourceEvents.headerItems.forEach(function (headerItem, index) {

                if (headerItem.count > 0 || headerItem.summary != undefined) {

                    var isTop = config.summaryPos === _index.SummaryPos.TopRight || config.summaryPos === _index.SummaryPos.Top || config.summaryPos === _index.SummaryPos.TopLeft;
                    var marginTop = resourceEvents.hasSummary && isTop ? 1 + config.eventItemLineHeight : 1;
                    var renderEventsMaxIndex = headerItem.addMore === 0 ? cellMaxEvents : headerItem.addMoreIndex;
                    var viewType = schedulerData.viewType
                    //on peiut verifier si plusieurs 
                    headerItem.events.forEach(function (evt, idx) {
                        if (idx < renderEventsMaxIndex && evt !== undefined && evt.render) {
                            var durationStart = localeMoment(startDate);
                            var durationEnd = localeMoment(endDate).add(1, 'days');
                            if (cellUnit === _index.CellUnits.Hour) {
                                durationStart = localeMoment(startDate).add(config.dayStartFrom, 'hours');
                                durationEnd = localeMoment(endDate).add(config.dayStopTo + 1, 'hours');
                            }
                            var eventStart = localeMoment(evt.eventItem.start);
                            var eventEnd = localeMoment(evt.eventItem.end);
                            var isStart = eventStart >= durationStart;
                            var isEnd = eventEnd <= durationEnd;
                            var _left = index * cellWidth + (index > 0 ? 2 : 3);
                            var _width = evt.span * cellWidth - (index > 0 ? 5 : 6) > 0 ? evt.span * cellWidth - (index > 0 ? 5 : 6) : 0;
                            var top = marginTop + idx * config.eventItemLineHeight;
                            var top2 = (eventStart.format('H')-6) * 15//marge top de l'event
                            var eventItem = _react2.default.createElement(DnDEventItem, _extends({}, _this2.props, {
                                key: evt.eventItem.id,
                                eventItem: evt.eventItem,
                                isStart: isStart,
                                isEnd: isEnd,
                                isInPopover: false,
                                left: _left,
                                width: _width,
                                top: viewType === 1 ? top2 : top, //si mode semiane alors ajuste la marge top
                                leftIndex: index,
                                rightIndex: index + evt.span
                            }));
                            eventList.push(eventItem);
                        }
                    });

                    if (headerItem.addMore > 0) {
                        var _left2 = index * cellWidth + (index > 0 ? 2 : 3);
                        var _width2 = cellWidth - (index > 0 ? 5 : 6);
                        var top = marginTop + headerItem.addMoreIndex * config.eventItemLineHeight;
                        var addMoreItem = _react2.default.createElement(_AddMore2.default, _extends({}, _this2.props, {
                            key: headerItem.time,
                            headerItem: headerItem,
                            number: headerItem.addMore,
                            left: _left2,
                            width: _width2,
                            top: top,
                            clickAction: _this2.onAddMoreClick
                        }));
                        eventList.push(addMoreItem);
                    }

                    if (headerItem.summary != undefined) {
                        var _top = isTop ? 1 : resourceEvents.rowHeight - config.eventItemLineHeight + 1;
                        var _left3 = index * cellWidth + (index > 0 ? 2 : 3);
                        var _width3 = cellWidth - (index > 0 ? 5 : 6);
                        var key = resourceEvents.slotId + '_' + headerItem.time;
                        var summary = _react2.default.createElement(_Summary2.default, { key: key, schedulerData: schedulerData, summary: headerItem.summary, left: _left3, width: _width3, top: _top });
                        eventList.push(summary);
                    }
                }
            });

            return _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                    'td',
                    { style: { width: rowWidth } },
                    connectDropTarget(_react2.default.createElement(
                        'div',
                        { ref: this.eventContainerRef, className: 'event-container', style: { height: resourceEvents.rowHeight } },
                        selectedArea,
                        eventList
                    ))
                )
            );
        }
    }]);

    return ResourceEvents;
}(_react.Component), _class.propTypes = {
    resourceEvents: _propTypes.PropTypes.object.isRequired,
    schedulerData: _propTypes.PropTypes.object.isRequired,
    dndSource: _propTypes.PropTypes.object.isRequired,
    onSetAddMoreState: _propTypes.PropTypes.func,
    updateEventStart: _propTypes.PropTypes.func,
    updateEventEnd: _propTypes.PropTypes.func,
    moveEvent: _propTypes.PropTypes.func,
    conflictOccurred: _propTypes.PropTypes.func,
    subtitleGetter: _propTypes.PropTypes.func,
    eventItemClick: _propTypes.PropTypes.func,
    viewEventClick: _propTypes.PropTypes.func,
    viewEventText: _propTypes.PropTypes.string,
    viewEvent2Click: _propTypes.PropTypes.func,
    viewEvent2Text: _propTypes.PropTypes.string,
    newEvent: _propTypes.PropTypes.func,
    eventItemTemplateResolver: _propTypes.PropTypes.func
}, _temp);
exports.default = ResourceEvents;