"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutManager = void 0;
var classFactory_1 = require("../../Builder/classFactory");
var Rect_1 = require("../../Core/Rect");
var AxisAlignment_1 = require("../../types/AxisAlignment");
var BaseType_1 = require("../../types/BaseType");
var LayoutMangerType_1 = require("../../types/LayoutMangerType");
var LayoutStrategyType_1 = require("../../types/LayoutStrategyType");
var BottomAlignedInnerAxisLayoutStrategy_1 = require("./BottomAlignedInnerAxisLayoutStrategy");
var BottomAlignedOuterAxisLayoutStrategy_1 = require("./BottomAlignedOuterAxisLayoutStrategy");
var ChartLayoutState_1 = require("./ChartLayoutState");
var LayoutStrategyAxes_1 = require("./LayoutStrategyAxes");
var LeftAlignedInnerAxisLayoutStrategy_1 = require("./LeftAlignedInnerAxisLayoutStrategy");
var LeftAlignedOuterAxisLayoutStrategy_1 = require("./LeftAlignedOuterAxisLayoutStrategy");
var RightAlignedInnerAxisLayoutStrategy_1 = require("./RightAlignedInnerAxisLayoutStrategy");
var RightAlignedOuterAxisLayoutStrategy_1 = require("./RightAlignedOuterAxisLayoutStrategy");
var TopAlignedInnerAxisLayoutStrategy_1 = require("./TopAlignedInnerAxisLayoutStrategy");
var TopAlignedOuterAxisLayoutStrategy_1 = require("./TopAlignedOuterAxisLayoutStrategy");
var MIN_SERIES_AREA_SIZE = 10;
/**
 * The job of the ILayoutManager is to calculate the size and location of the axes and the resulting size of the seriesViewRect - the area where series will be drawn.
 * This is done by deferring to the LayoutStrategy for each area which could house axes.
 */
var LayoutManager = /** @class */ (function () {
    // tslint:disable: max-line-length
    function LayoutManager(options) {
        this.type = LayoutMangerType_1.ELayoutManagerType.Default;
        /**
         * Layout strategy for layout of left aligned axis outside
         */
        this.leftOuterAxesLayoutStrategyProperty = new LeftAlignedOuterAxisLayoutStrategy_1.LeftAlignedOuterAxisLayoutStrategy();
        /**
         * Layout strategy for layout of right aligned axis outside
         */
        this.rightOuterAxesLayoutStrategyProperty = new RightAlignedOuterAxisLayoutStrategy_1.RightAlignedOuterAxisLayoutStrategy();
        /**
         * Layout strategy for layout of top aligned axis outside
         */
        this.topOuterAxesLayoutStrategyProperty = new TopAlignedOuterAxisLayoutStrategy_1.TopAlignedOuterAxisLayoutStrategy();
        /**
         * Layout strategy for layout of bottom aligned axis outside
         */
        this.bottomOuterAxesLayoutStrategyProperty = new BottomAlignedOuterAxisLayoutStrategy_1.BottomAlignedOuterAxisLayoutStrategy();
        /**
         * Layout strategy for layout of left aligned inner axis
         */
        this.leftInnerAxesLayoutStrategy = new LeftAlignedInnerAxisLayoutStrategy_1.LeftAlignedInnerAxisLayoutStrategy();
        /**
         * Layout strategy for layout of right aligned inner axis
         */
        this.rightInnerAxesLayoutStrategy = new RightAlignedInnerAxisLayoutStrategy_1.RightAlignedInnerAxisLayoutStrategy();
        /**
         * Layout strategy for layout of top aligned inner axis
         */
        this.topInnerAxesLayoutStrategy = new TopAlignedInnerAxisLayoutStrategy_1.TopAlignedInnerAxisLayoutStrategy();
        /**
         * Layout strategy for layout of bottom aligned inner axis
         */
        this.bottomInnerAxesLayoutStrategy = new BottomAlignedInnerAxisLayoutStrategy_1.BottomAlignedInnerAxisLayoutStrategy();
        this.chartLayoutState = new ChartLayoutState_1.ChartLayoutState();
        this.axesGroupedByLayoutStrategy = new LayoutStrategyAxes_1.LayoutStrategyAxes();
        this.leftOuterAxesLayoutStrategy = this.createStrategy(options === null || options === void 0 ? void 0 : options.LeftOuter, this.leftOuterAxesLayoutStrategy);
        this.rightOuterAxesLayoutStrategy = this.createStrategy(options === null || options === void 0 ? void 0 : options.RightOuter, this.rightOuterAxesLayoutStrategy);
        this.topOuterAxesLayoutStrategy = this.createStrategy(options === null || options === void 0 ? void 0 : options.TopOuter, this.topOuterAxesLayoutStrategy);
        this.bottomOuterAxesLayoutStrategy = this.createStrategy(options === null || options === void 0 ? void 0 : options.BottomOuter, this.bottomOuterAxesLayoutStrategy);
        this.leftInnerAxesLayoutStrategy = this.createStrategy(options === null || options === void 0 ? void 0 : options.LeftInner, this.leftInnerAxesLayoutStrategy);
        this.rightInnerAxesLayoutStrategy = this.createStrategy(options === null || options === void 0 ? void 0 : options.RightInner, this.rightInnerAxesLayoutStrategy);
        this.topInnerAxesLayoutStrategy = this.createStrategy(options === null || options === void 0 ? void 0 : options.TopInner, this.topInnerAxesLayoutStrategy);
        this.bottomInnerAxesLayoutStrategy = this.createStrategy(options === null || options === void 0 ? void 0 : options.BottomInner, this.bottomInnerAxesLayoutStrategy);
    }
    Object.defineProperty(LayoutManager.prototype, "leftOuterAxesLayoutStrategy", {
        get: function () {
            return this.leftOuterAxesLayoutStrategyProperty;
        },
        set: function (value) {
            var _a;
            var currentValue = this.leftOuterAxesLayoutStrategyProperty;
            if (currentValue !== value) {
                this.leftOuterAxesLayoutStrategyProperty = value;
                if (currentValue.isStacked && !value.isStacked) {
                    this.groupAxesByLayoutStrategy();
                    resetAxes(this.axesGroupedByLayoutStrategy.leftOuterAxes);
                }
                (_a = this.sciChartSurface) === null || _a === void 0 ? void 0 : _a.invalidateElement();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "rightOuterAxesLayoutStrategy", {
        get: function () {
            return this.rightOuterAxesLayoutStrategyProperty;
        },
        set: function (value) {
            var _a;
            var currentValue = this.rightOuterAxesLayoutStrategyProperty;
            if (currentValue !== value) {
                this.rightOuterAxesLayoutStrategyProperty = value;
                if (currentValue.isStacked && !value.isStacked) {
                    this.groupAxesByLayoutStrategy();
                    resetAxes(this.axesGroupedByLayoutStrategy.rightOuterAxes);
                }
                (_a = this.sciChartSurface) === null || _a === void 0 ? void 0 : _a.invalidateElement();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "topOuterAxesLayoutStrategy", {
        get: function () {
            return this.topOuterAxesLayoutStrategyProperty;
        },
        set: function (value) {
            var _a;
            var currentValue = this.topOuterAxesLayoutStrategyProperty;
            if (currentValue !== value) {
                this.topOuterAxesLayoutStrategyProperty = value;
                if (currentValue.isStacked && !value.isStacked) {
                    this.groupAxesByLayoutStrategy();
                    resetAxes(this.axesGroupedByLayoutStrategy.topOuterAxes);
                }
                (_a = this.sciChartSurface) === null || _a === void 0 ? void 0 : _a.invalidateElement();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LayoutManager.prototype, "bottomOuterAxesLayoutStrategy", {
        get: function () {
            return this.bottomOuterAxesLayoutStrategyProperty;
        },
        set: function (value) {
            var _a;
            var currentValue = this.bottomOuterAxesLayoutStrategyProperty;
            if (currentValue !== value) {
                this.bottomOuterAxesLayoutStrategyProperty = value;
                if (currentValue.isStacked && !value.isStacked) {
                    this.groupAxesByLayoutStrategy();
                    resetAxes(this.axesGroupedByLayoutStrategy.bottomOuterAxes);
                }
                (_a = this.sciChartSurface) === null || _a === void 0 ? void 0 : _a.invalidateElement();
            }
        },
        enumerable: false,
        configurable: true
    });
    LayoutManager.prototype.getAxisLayoutStrategy = function (axisAlignment, isInnerAxis) {
        switch (axisAlignment) {
            case AxisAlignment_1.EAxisAlignment.Left: {
                return isInnerAxis ? this.leftInnerAxesLayoutStrategy : this.leftOuterAxesLayoutStrategy;
            }
            case AxisAlignment_1.EAxisAlignment.Right: {
                return isInnerAxis ? this.rightInnerAxesLayoutStrategy : this.rightOuterAxesLayoutStrategy;
            }
            case AxisAlignment_1.EAxisAlignment.Top: {
                return isInnerAxis ? this.topInnerAxesLayoutStrategy : this.topOuterAxesLayoutStrategy;
            }
            case AxisAlignment_1.EAxisAlignment.Bottom: {
                return isInnerAxis ? this.bottomInnerAxesLayoutStrategy : this.bottomOuterAxesLayoutStrategy;
            }
            default: {
                return (0, AxisAlignment_1.handleInvalidAxisAlignment)(axisAlignment);
            }
        }
    };
    LayoutManager.prototype.layoutChart = function (viewportSize, padding) {
        var _a, _b, _c, _d;
        this.groupAxesByLayoutStrategy();
        // Padding are hardcoded for now
        var paddingRight = (_a = padding === null || padding === void 0 ? void 0 : padding.right) !== null && _a !== void 0 ? _a : 0;
        var paddingLeft = (_b = padding === null || padding === void 0 ? void 0 : padding.left) !== null && _b !== void 0 ? _b : 0;
        var paddingTop = (_c = padding === null || padding === void 0 ? void 0 : padding.top) !== null && _c !== void 0 ? _c : 0;
        var paddingBottom = (_d = padding === null || padding === void 0 ? void 0 : padding.bottom) !== null && _d !== void 0 ? _d : 0;
        var availableWidth = viewportSize.width - paddingLeft - paddingRight;
        var availableHeight = viewportSize.height - paddingTop - paddingBottom;
        try {
            // measure outer axes areas
            this.measureTopOuterAxes();
            this.measureBottomOuterAxes();
            this.measureLeftOuterAxes();
            this.measureRightOuterAxes();
            // measure inner axes areas
            this.measureTopInnerAxes();
            this.measureBottomInnerAxes();
            this.measureLeftInnerAxes();
            this.measureRightInnerAxes();
            var remainingWidth = availableWidth - this.chartLayoutState.leftOuterAreaSize - this.chartLayoutState.rightOuterAreaSize;
            var remainingHeight = availableHeight - this.chartLayoutState.topOuterAreaSize - this.chartLayoutState.bottomOuterAreaSize;
            var leftStart = paddingLeft;
            var leftEnd = leftStart + this.chartLayoutState.leftOuterAreaSize;
            var rightStart = leftEnd + (remainingWidth < MIN_SERIES_AREA_SIZE ? MIN_SERIES_AREA_SIZE : remainingWidth);
            var rightEnd = rightStart + this.chartLayoutState.rightOuterAreaSize;
            var topStart = paddingTop;
            var topEnd = topStart + this.chartLayoutState.topOuterAreaSize;
            var bottomStart = topEnd + (remainingHeight < MIN_SERIES_AREA_SIZE ? MIN_SERIES_AREA_SIZE : remainingHeight);
            var bottomEnd = bottomStart + this.chartLayoutState.bottomOuterAreaSize;
            // layout center parts
            if (this.sciChartSurface.drawSeriesBehindAxis) {
                this.layoutChartCenter(leftStart, topStart, rightEnd, bottomEnd);
            }
            else {
                this.layoutChartCenter(leftEnd, topEnd, rightStart, bottomStart);
            }
            // layout outer axes
            this.leftOuterAxesLayoutStrategy.layoutAxes(leftStart, topEnd, leftEnd - this.sciChartSurface.leftViewportBorder, bottomStart, this.axesGroupedByLayoutStrategy.leftOuterAxes);
            this.rightOuterAxesLayoutStrategy.layoutAxes(rightStart + this.sciChartSurface.rightViewportBorder, topEnd, rightEnd, bottomStart, this.axesGroupedByLayoutStrategy.rightOuterAxes);
            this.topOuterAxesLayoutStrategy.layoutAxes(leftEnd, topStart, rightStart, topEnd - this.sciChartSurface.topViewportBorder, this.axesGroupedByLayoutStrategy.topOuterAxes);
            this.bottomOuterAxesLayoutStrategy.layoutAxes(leftEnd, bottomStart + this.sciChartSurface.bottomViewportBorder, rightStart, bottomEnd, this.axesGroupedByLayoutStrategy.bottomOuterAxes);
            var innerLeftEnd = leftEnd + this.chartLayoutState.leftInnerAreaSize;
            var innerRightStart = rightStart - this.chartLayoutState.rightInnerAreaSize;
            var innerTopEnd = topEnd + this.chartLayoutState.topInnerAreaSize;
            var innerBottomStart = bottomStart - this.chartLayoutState.bottomInnerAreaSize;
            // layout inner axes
            this.leftInnerAxesLayoutStrategy.layoutAxes(leftEnd, topEnd, innerLeftEnd, bottomStart, this.axesGroupedByLayoutStrategy.leftInnerAxes);
            this.rightInnerAxesLayoutStrategy.layoutAxes(innerRightStart, topEnd, rightStart, bottomStart, this.axesGroupedByLayoutStrategy.rightInnerAxes);
            this.topInnerAxesLayoutStrategy.layoutAxes(leftEnd, topEnd, rightStart, innerTopEnd, this.axesGroupedByLayoutStrategy.topInnerAxes);
            this.bottomInnerAxesLayoutStrategy.layoutAxes(leftEnd, innerBottomStart, rightStart, bottomStart, this.axesGroupedByLayoutStrategy.bottomInnerAxes);
            return this.sciChartSurface.seriesViewRect;
        }
        finally {
            this.chartLayoutState.clear();
        }
        return undefined;
    };
    LayoutManager.prototype.toJSON = function () {
        var options = {
            BottomInner: this.bottomInnerAxesLayoutStrategy.toJSON(),
            BottomOuter: this.bottomOuterAxesLayoutStrategy.toJSON(),
            LeftInner: this.leftInnerAxesLayoutStrategy.toJSON(),
            LeftOuter: this.leftOuterAxesLayoutStrategy.toJSON(),
            RightInner: this.rightInnerAxesLayoutStrategy.toJSON(),
            RightOuter: this.rightOuterAxesLayoutStrategy.toJSON(),
            TopInner: this.topInnerAxesLayoutStrategy.toJSON(),
            TopOuter: this.topOuterAxesLayoutStrategy.toJSON()
        };
        return { type: this.type, options: options };
    };
    LayoutManager.prototype.measureLeftOuterAxes = function () {
        this.leftOuterAxesLayoutStrategy.measureAxes(this.sciChartSurface, this.chartLayoutState, this.axesGroupedByLayoutStrategy.leftOuterAxes);
    };
    LayoutManager.prototype.measureRightOuterAxes = function () {
        this.rightOuterAxesLayoutStrategy.measureAxes(this.sciChartSurface, this.chartLayoutState, this.axesGroupedByLayoutStrategy.rightOuterAxes);
    };
    LayoutManager.prototype.measureTopOuterAxes = function () {
        this.topOuterAxesLayoutStrategy.measureAxes(this.sciChartSurface, this.chartLayoutState, this.axesGroupedByLayoutStrategy.topOuterAxes);
    };
    LayoutManager.prototype.measureBottomOuterAxes = function () {
        this.bottomOuterAxesLayoutStrategy.measureAxes(this.sciChartSurface, this.chartLayoutState, this.axesGroupedByLayoutStrategy.bottomOuterAxes);
    };
    LayoutManager.prototype.measureLeftInnerAxes = function () {
        this.leftInnerAxesLayoutStrategy.measureAxes(this.sciChartSurface, this.chartLayoutState, this.axesGroupedByLayoutStrategy.leftInnerAxes);
    };
    LayoutManager.prototype.measureRightInnerAxes = function () {
        this.rightInnerAxesLayoutStrategy.measureAxes(this.sciChartSurface, this.chartLayoutState, this.axesGroupedByLayoutStrategy.rightInnerAxes);
    };
    LayoutManager.prototype.measureTopInnerAxes = function () {
        this.topInnerAxesLayoutStrategy.measureAxes(this.sciChartSurface, this.chartLayoutState, this.axesGroupedByLayoutStrategy.topInnerAxes);
    };
    LayoutManager.prototype.measureBottomInnerAxes = function () {
        this.bottomInnerAxesLayoutStrategy.measureAxes(this.sciChartSurface, this.chartLayoutState, this.axesGroupedByLayoutStrategy.bottomInnerAxes);
    };
    LayoutManager.prototype.groupAxesByLayoutStrategy = function () {
        this.axesGroupedByLayoutStrategy.clear();
        var _a = this.axesGroupedByLayoutStrategy, topInnerAxes = _a.topInnerAxes, bottomInnerAxes = _a.bottomInnerAxes, leftInnerAxes = _a.leftInnerAxes, rightInnerAxes = _a.rightInnerAxes, topOuterAxes = _a.topOuterAxes, bottomOuterAxes = _a.bottomOuterAxes, leftOuterAxes = _a.leftOuterAxes, rightOuterAxes = _a.rightOuterAxes;
        var groupAxes = function (axes) {
            axes.forEach(function (axis) {
                var axisAlignment = axis.axisAlignment, isInnerAxis = axis.isInnerAxis, isVisible = axis.isVisible;
                if (isInnerAxis) {
                    switch (axisAlignment) {
                        case AxisAlignment_1.EAxisAlignment.Top:
                            topInnerAxes.push(axis);
                            break;
                        case AxisAlignment_1.EAxisAlignment.Bottom:
                            bottomInnerAxes.push(axis);
                            break;
                        case AxisAlignment_1.EAxisAlignment.Left:
                            leftInnerAxes.push(axis);
                            break;
                        case AxisAlignment_1.EAxisAlignment.Right:
                            rightInnerAxes.push(axis);
                            break;
                    }
                }
                else {
                    switch (axisAlignment) {
                        case AxisAlignment_1.EAxisAlignment.Top:
                            topOuterAxes.push(axis);
                            break;
                        case AxisAlignment_1.EAxisAlignment.Bottom:
                            bottomOuterAxes.push(axis);
                            break;
                        case AxisAlignment_1.EAxisAlignment.Left:
                            leftOuterAxes.push(axis);
                            break;
                        case AxisAlignment_1.EAxisAlignment.Right:
                            rightOuterAxes.push(axis);
                            break;
                    }
                }
            });
        };
        groupAxes(this.sciChartSurface.xAxes.asArray());
        groupAxes(this.sciChartSurface.yAxes.asArray());
    };
    LayoutManager.prototype.layoutChartCenter = function (left, top, right, bottom) {
        this.setSeriesViewRect(left, top, right, bottom);
        this.sciChartSurface.annotationUnderlaySurfaceViewRect = Rect_1.Rect.createWithCoords(left, top, right, bottom);
        this.sciChartSurface.annotationOverlaySurfaceViewRect = Rect_1.Rect.createWithCoords(left, top, right, bottom);
        this.sciChartSurface.chartModifierSurfaceViewRect = Rect_1.Rect.createWithCoords(left, top, right, bottom);
    };
    LayoutManager.prototype.setSeriesViewRect = function (left, top, right, bottom) {
        var seriesViewRect = this.sciChartSurface.seriesViewRect;
        var newRect = Rect_1.Rect.createWithCoords(left, top, right, bottom);
        if (!seriesViewRect || !Rect_1.Rect.isEqual(seriesViewRect, newRect)) {
            this.sciChartSurface.setSeriesViewRect(newRect);
        }
    };
    LayoutManager.prototype.createStrategy = function (option, strategy) {
        if (option && option.type !== strategy.type) {
            if ("measureAxes" in option) {
                return option;
            }
            if (option.type === LayoutStrategyType_1.ELayoutStrategyType.Custom) {
                return (0, classFactory_1.createType)(BaseType_1.EBaseType.LayoutStrategy, option.customType, undefined, option.options);
            }
            else {
                return (0, classFactory_1.createType)(BaseType_1.EBaseType.LayoutStrategy, option.type, undefined, option.options);
            }
        }
        else {
            return strategy;
        }
    };
    return LayoutManager;
}());
exports.LayoutManager = LayoutManager;
var resetAxes = function (axes) {
    if (axes.length > 0) {
        axes[0].isPrimaryAxis = true;
    }
};
