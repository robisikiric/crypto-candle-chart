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
exports.BaseCenteredAxisLayoutStrategy = void 0;
var AxisBase2D_1 = require("../Visuals/Axis/AxisBase2D");
var BaseAxisLayoutStrategy_1 = require("./BaseAxisLayoutStrategy");
var constants_1 = require("./constants");
var EInnerAxisPlacementCoordinateMode_1 = require("./EInnerAxisPlacementCoordinateMode");
/**
 * The Base Layout Strategy for Central Axes
 */
var BaseCenteredAxisLayoutStrategy = /** @class */ (function (_super) {
    __extends(BaseCenteredAxisLayoutStrategy, _super);
    /**
     * Creates Inner Axis Layout Strategy
     * param options {@link IInnerAxisLayoutStrategyOptions}
     */
    function BaseCenteredAxisLayoutStrategy(options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this) || this;
        _this.orthogonalAxisIdProperty = AxisBase2D_1.AxisBase2D.DEFAULT_AXIS_ID;
        _this.coordinateModeProperty = EInnerAxisPlacementCoordinateMode_1.EInnerAxisPlacementCoordinateMode.DataValue;
        _this.orthogonalAxisIdProperty = (_a = options === null || options === void 0 ? void 0 : options.orthogonalAxisId) !== null && _a !== void 0 ? _a : _this.orthogonalAxisIdProperty;
        _this.coordinateModeProperty = (_b = options === null || options === void 0 ? void 0 : options.coordinateMode) !== null && _b !== void 0 ? _b : _this.coordinateModeProperty;
        _this.axisPositionProperty = (_c = options === null || options === void 0 ? void 0 : options.axisPosition) !== null && _c !== void 0 ? _c : _this.axisPositionProperty;
        return _this;
    }
    Object.defineProperty(BaseCenteredAxisLayoutStrategy.prototype, "orthogonalAxisId", {
        /**
         * Gets or sets the id for the vertical or horizontal axis which is used for positioning the central axes
         */
        get: function () {
            return this.orthogonalAxisIdProperty;
        },
        /**
         * Gets or sets the id for the vertical or horizontal axis which is used for positioning the central axes
         */
        set: function (value) {
            if (this.orthogonalAxisId !== value) {
                this.orthogonalAxisIdProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.VERTICAL_AXIS_ID);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCenteredAxisLayoutStrategy.prototype, "coordinateMode", {
        /**
         * The Coordinate mode. See {@link EInnerAxisPlacementCoordinateMode} for a list of values
         * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
         * The {@link EInnerAxisPlacementCoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
         * placement.
         */
        get: function () {
            return this.coordinateModeProperty;
        },
        /**
         * The Coordinate mode. See {@link EInnerAxisPlacementCoordinateMode} for a list of values
         * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
         * The {@link EInnerAxisPlacementCoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
         * placement.
         */
        set: function (value) {
            if (this.coordinateModeProperty !== value) {
                this.coordinateModeProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.COORDINATE_MODE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseCenteredAxisLayoutStrategy.prototype, "axisPosition", {
        /**
         * Gets or sets the coordinate of the Layout Area anchor point
         * @remarks The axisPosition obeys {@link coordinateMode} which defines whether it is a pixel, data-value or relative coordinate
         */
        get: function () {
            return this.axisPositionProperty;
        },
        /**
         * Gets or sets the coordinate of the Layout Area anchor point
         * @remarks The axisPosition obeys {@link coordinateMode} which defines whether it is a pixel, data-value or relative coordinate
         */
        set: function (value) {
            if (this.axisPositionProperty !== value) {
                this.axisPositionProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.AXIS_POSITION_COORDINATE);
            }
        },
        enumerable: false,
        configurable: true
    });
    BaseCenteredAxisLayoutStrategy.prototype.toJSON = function () {
        var options = {
            axisPosition: this.axisPosition,
            coordinateMode: this.coordinateMode,
            orthogonalAxisId: this.orthogonalAxisId
        };
        return { type: this.type, options: options };
    };
    /**
     * @summary Notifies subscribers that a property has changed and the chart requires redrawing
     * @description SciChart provides fully reactive components, changing any property or changing data will cause the {@link SciChartSurface} to
     * redraw where necessary.
     * @param propertyName The name of the property which has changed
     */
    BaseCenteredAxisLayoutStrategy.prototype.notifyPropertyChanged = function (propertyName) {
        var _a;
        if ((_a = this.sciChartSurface) === null || _a === void 0 ? void 0 : _a.invalidateElement) {
            this.sciChartSurface.invalidateElement();
        }
    };
    return BaseCenteredAxisLayoutStrategy;
}(BaseAxisLayoutStrategy_1.BaseAxisLayoutStrategy));
exports.BaseCenteredAxisLayoutStrategy = BaseCenteredAxisLayoutStrategy;
