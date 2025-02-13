"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CentralAxesLayoutManager = void 0;
var AxisAlignment_1 = require("../../types/AxisAlignment");
var LayoutMangerType_1 = require("../../types/LayoutMangerType");
var BottomAlignedInnerAxisLayoutStrategy_1 = require("./BottomAlignedInnerAxisLayoutStrategy");
var constants_1 = require("./constants");
var EInnerAxisPlacementCoordinateMode_1 = require("./EInnerAxisPlacementCoordinateMode");
var LayoutManager_1 = require("./LayoutManager");
var LeftAlignedInnerAxisLayoutStrategy_1 = require("./LeftAlignedInnerAxisLayoutStrategy");
var RightAlignedInnerAxisLayoutStrategy_1 = require("./RightAlignedInnerAxisLayoutStrategy");
var TopAlignedInnerAxisLayoutStrategy_1 = require("./TopAlignedInnerAxisLayoutStrategy");
/**
 * A Layout manager which simplifies the handling of central axes.
 */
var CentralAxesLayoutManager = /** @class */ (function (_super) {
    __extends(CentralAxesLayoutManager, _super);
    function CentralAxesLayoutManager(options) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this, options) || this;
        _this.type = LayoutMangerType_1.ELayoutManagerType.CentralAxes;
        _this.horizontalAxisPositionCoordinateModeProperty = EInnerAxisPlacementCoordinateMode_1.EInnerAxisPlacementCoordinateMode.Relative;
        _this.verticalAxisPositionCoordinateModeProperty = EInnerAxisPlacementCoordinateMode_1.EInnerAxisPlacementCoordinateMode.Relative;
        _this.horizontalAxisPositionProperty = 0.5;
        _this.verticalAxisPositionProperty = 0.5;
        _this.verticalAxisPositionProperty = (_a = options === null || options === void 0 ? void 0 : options.verticalAxisPosition) !== null && _a !== void 0 ? _a : _this.verticalAxisPositionProperty;
        _this.verticalAxisPositionCoordinateModeProperty =
            (_b = options === null || options === void 0 ? void 0 : options.verticalAxisPositionCoordinateMode) !== null && _b !== void 0 ? _b : _this.verticalAxisPositionCoordinateModeProperty;
        _this.horizontalAxisPositionProperty = (_c = options === null || options === void 0 ? void 0 : options.horizontalAxisPosition) !== null && _c !== void 0 ? _c : _this.horizontalAxisPositionProperty;
        _this.horizontalAxisPositionCoordinateModeProperty =
            (_d = options === null || options === void 0 ? void 0 : options.horizontalAxisPositionCoordinateMode) !== null && _d !== void 0 ? _d : _this.horizontalAxisPositionCoordinateModeProperty;
        _this.leftInnerAxesLayoutStrategy = new LeftAlignedInnerAxisLayoutStrategy_1.LeftAlignedInnerAxisLayoutStrategy({
            axisPosition: _this.verticalAxisPositionProperty,
            coordinateMode: _this.verticalAxisPositionCoordinateModeProperty
        });
        _this.rightInnerAxesLayoutStrategy = new RightAlignedInnerAxisLayoutStrategy_1.RightAlignedInnerAxisLayoutStrategy({
            axisPosition: _this.verticalAxisPositionProperty,
            coordinateMode: _this.verticalAxisPositionCoordinateModeProperty
        });
        _this.topInnerAxesLayoutStrategy = new TopAlignedInnerAxisLayoutStrategy_1.TopAlignedInnerAxisLayoutStrategy({
            axisPosition: _this.horizontalAxisPositionProperty,
            coordinateMode: _this.horizontalAxisPositionCoordinateModeProperty
        });
        _this.bottomInnerAxesLayoutStrategy = new BottomAlignedInnerAxisLayoutStrategy_1.BottomAlignedInnerAxisLayoutStrategy({
            axisPosition: _this.horizontalAxisPositionProperty,
            coordinateMode: _this.horizontalAxisPositionCoordinateModeProperty
        });
        return _this;
    }
    Object.defineProperty(CentralAxesLayoutManager.prototype, "horizontalAxisPositionCoordinateMode", {
        /**
         * The Coordinate mode. See {@link EInnerAxisPlacementCoordinateMode} for a list of values
         * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
         * The {@link EInnerAxisPlacementCoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
         * placement.
         */
        get: function () {
            return this.horizontalAxisPositionCoordinateModeProperty;
        },
        /**
         * The Coordinate mode. See {@link EInnerAxisPlacementCoordinateMode} for a list of values
         * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
         * The {@link EInnerAxisPlacementCoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
         * placement.
         */
        set: function (value) {
            this.horizontalAxisPositionCoordinateModeProperty = value;
            this.topInnerAxesLayoutStrategy.coordinateMode = value;
            this.bottomInnerAxesLayoutStrategy.coordinateMode = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.COORDINATE_MODE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CentralAxesLayoutManager.prototype, "verticalAxisPositionCoordinateMode", {
        /**
         * The Coordinate mode. See {@link EInnerAxisPlacementCoordinateMode} for a list of values
         * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
         * The {@link EInnerAxisPlacementCoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
         * placement.
         */
        get: function () {
            return this.verticalAxisPositionCoordinateModeProperty;
        },
        /**
         * The Coordinate mode. See {@link EInnerAxisPlacementCoordinateMode} for a list of values
         * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
         * The {@link EInnerAxisPlacementCoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
         * placement.
         */
        set: function (value) {
            this.verticalAxisPositionCoordinateModeProperty = value;
            this.rightInnerAxesLayoutStrategy.coordinateMode = value;
            this.leftInnerAxesLayoutStrategy.coordinateMode = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.COORDINATE_MODE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CentralAxesLayoutManager.prototype, "horizontalAxisPosition", {
        /**
         * Gets or sets the coordinate of the Layout Area anchor point
         * @remarks The axisPosition obeys {@link coordinateMode} which defines whether it is a pixel, data-value or relative coordinate
         */
        get: function () {
            return this.horizontalAxisPositionProperty;
        },
        /**
         * Gets or sets the coordinate of the Layout Area anchor point
         * @remarks The axisPosition obeys {@link coordinateMode} which defines whether it is a pixel, data-value or relative coordinate
         */
        set: function (value) {
            this.horizontalAxisPositionProperty = value;
            this.topInnerAxesLayoutStrategy.axisPosition = value;
            this.bottomInnerAxesLayoutStrategy.axisPosition = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.AXIS_POSITION_COORDINATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CentralAxesLayoutManager.prototype, "verticalAxisPosition", {
        /**
         * Gets or sets the coordinate of the Layout Area anchor point
         * @remarks The axisPosition obeys {@link coordinateMode} which defines whether it is a pixel, data-value or relative coordinate
         */
        get: function () {
            return this.verticalAxisPositionProperty;
        },
        /**
         * Gets or sets the coordinate of the Layout Area anchor point
         * @remarks The axisPosition obeys {@link coordinateMode} which defines whether it is a pixel, data-value or relative coordinate
         */
        set: function (value) {
            this.verticalAxisPositionProperty = value;
            this.rightInnerAxesLayoutStrategy.axisPosition = value;
            this.leftInnerAxesLayoutStrategy.axisPosition = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.AXIS_POSITION_COORDINATE);
        },
        enumerable: false,
        configurable: true
    });
    CentralAxesLayoutManager.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            horizontalAxisPosition: this.horizontalAxisPosition,
            horizontalAxisPositionCoordinateMode: this.horizontalAxisPositionCoordinateMode,
            verticalAxisPosition: this.verticalAxisPosition,
            verticalAxisPositionCoordinateMode: this.verticalAxisPositionCoordinateMode
        };
        Object.assign(json, options);
        return json;
    };
    /**
     * @summary Notifies subscribers that a property has changed and the chart requires redrawing
     * @description SciChart provides fully reactive components, changing any property or changing data will cause the {@link SciChartSurface} to
     * redraw where necessary.
     * @param propertyName The name of the property which has changed
     */
    CentralAxesLayoutManager.prototype.notifyPropertyChanged = function (propertyName) {
        var _a;
        if ((_a = this.sciChartSurface) === null || _a === void 0 ? void 0 : _a.invalidateElement) {
            this.sciChartSurface.invalidateElement();
        }
    };
    CentralAxesLayoutManager.prototype.groupAxesByLayoutStrategy = function () {
        this.axesGroupedByLayoutStrategy.clear();
        var _a = this.axesGroupedByLayoutStrategy, topInnerAxes = _a.topInnerAxes, bottomInnerAxes = _a.bottomInnerAxes, leftInnerAxes = _a.leftInnerAxes, rightInnerAxes = _a.rightInnerAxes;
        var groupAxes = function (axes) {
            axes.forEach(function (axis) {
                var axisAlignment = axis.axisAlignment;
                axis.isInnerAxis = true;
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
            });
        };
        groupAxes(this.sciChartSurface.xAxes.asArray());
        groupAxes(this.sciChartSurface.yAxes.asArray());
    };
    return CentralAxesLayoutManager;
}(LayoutManager_1.LayoutManager));
exports.CentralAxesLayoutManager = CentralAxesLayoutManager;
