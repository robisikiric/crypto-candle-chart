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
exports.NumericAxis3D = void 0;
var FlippedNumericCoordinateCalculator_1 = require("../../../Charting/Numerics/CoordinateCalculators/FlippedNumericCoordinateCalculator");
// tslint:disable-next-line:max-line-length
var NumericCoordinateCalculator_1 = require("../../../Charting/Numerics/CoordinateCalculators/NumericCoordinateCalculator");
var NumericTickProvider_1 = require("../../../Charting/Numerics/TickProviders/NumericTickProvider");
var NumericDeltaCalculator_1 = require("../../../Charting/Visuals/Axis/DeltaCalculator/NumericDeltaCalculator");
var NumericLabelProvider_1 = require("../../../Charting/Visuals/Axis/LabelProvider/NumericLabelProvider");
var EasingFunctions_1 = require("../../../Core/Animations/EasingFunctions");
var NumberRangeAnimator_1 = require("../../../Core/Animations/NumberRangeAnimator");
var NumberRange_1 = require("../../../Core/NumberRange");
var AxisType_1 = require("../../../types/AxisType");
var AxisBase3D_1 = require("./AxisBase3D");
/**
 * @summary A 3D Chart Numeric / Value Axis type
 * @description A Numeric axis uses the X-value to measure data-points on the XAxis. The axis can represent
 * both numbers and dates using text-formatting
 * @remarks
 * Set a {@link NumericAxis3D} on the {@link SciChart3DSurface.xAxis}, {@link SciChart3DSurface.yAxis} or {@link SciChart3DSurface.zAxis} property.
 */
var NumericAxis3D = /** @class */ (function (_super) {
    __extends(NumericAxis3D, _super);
    /**
     * Creates an instance of a {@link NumericAxis3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options optional parameters of type {@link INumericAxis3dOptions} to configure the axis
     */
    function NumericAxis3D(webAssemblyContext, options) {
        var _this = this;
        var _a;
        _this = _super.call(this, webAssemblyContext, options) || this;
        /**
         * @inheritDoc
         */
        _this.type = AxisType_1.EAxisType.NumericAxis3D;
        _this.tickProvider = new NumericTickProvider_1.NumericTickProvider(_this.webAssemblyContext3D);
        _this.labelProvider = new NumericLabelProvider_1.NumericLabelProvider();
        _this.deltaCalculator = new NumericDeltaCalculator_1.NumericDeltaCalculator(_this.webAssemblyContext3D);
        // Workaround for deprecated property
        if (options === null || options === void 0 ? void 0 : options.precision) {
            options.labelPrecision = options.precision;
        }
        _this.labelProvider =
            (_a = options === null || options === void 0 ? void 0 : options.labelProvider) !== null && _a !== void 0 ? _a : new NumericLabelProvider_1.NumericLabelProvider(options);
        return _this;
    }
    /**
     * @inheritDoc
     */
    NumericAxis3D.prototype.getDefaultNonZeroRange = function () {
        return new NumberRange_1.NumberRange(0, 10);
    };
    /**
     * @inheritDoc
     */
    NumericAxis3D.prototype.animateVisibleRange = function (visibleRange, durationMs, easingFunction, onCompleted) {
        var _this = this;
        var _a;
        if (easingFunction === void 0) { easingFunction = EasingFunctions_1.easing.outCubic; }
        if (onCompleted === void 0) { onCompleted = function () { }; }
        if (durationMs <= 0) {
            // Don't allow setting visibleRange to undefined if there is no data
            this.visibleRange = visibleRange || this.visibleRange;
            onCompleted();
            return undefined;
        }
        (_a = this.visibleRangeAnimationToken) === null || _a === void 0 ? void 0 : _a.cancel();
        this.visibleRangeAnimationToken = NumberRangeAnimator_1.NumberRangeAnimator.animate(this.visibleRange, visibleRange, durationMs, function (range) {
            _this.visibleRange = range;
        }, function () {
            _this.visibleRangeAnimationToken = undefined;
            onCompleted();
        }, easingFunction);
        this.parentSurface.addAnimation(this.visibleRangeAnimationToken);
        return this.visibleRangeAnimationToken;
    };
    /**
     * @inheritDoc
     */
    NumericAxis3D.prototype.getCurrentCoordinateCalculatorInternal = function () {
        var min = this.visibleRange.min;
        var max = this.visibleRange.max;
        var size = this.getAxisSize();
        var shouldFlip = !this.flippedCoordinatesProperty;
        return shouldFlip
            ? new FlippedNumericCoordinateCalculator_1.FlippedNumericCoordinateCalculator(this.webAssemblyContext3D, size, min, max)
            : new NumericCoordinateCalculator_1.NumericCoordinateCalculator(this.webAssemblyContext3D, size, min, max);
    };
    return NumericAxis3D;
}(AxisBase3D_1.AxisBase3D));
exports.NumericAxis3D = NumericAxis3D;
