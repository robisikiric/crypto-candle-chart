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
exports.NumericTickProvider = void 0;
var Guard_1 = require("../../../Core/Guard");
var NumberRange_1 = require("../../../Core/NumberRange");
var isRealNumber_1 = require("../../../utils/isRealNumber");
var TickProvider_1 = require("./TickProvider");
/**
 * @summary The NumericTickProvider is a {@link TickProvider} implementation for Numeric 2D or 3D Axis.
 * @description TickProviders are responsible for calculating the interval between major and minor gridlines, ticks and labels.
 *
 *  * The method {@link getMajorTicks} returns an array of major ticks (data-values values where SciChart will place labels and major gridlines.
 *  * The method {@link getMinorTicks} returns an array of minor ticks (data-values values where SciChart will place minor gridlines.
 *  * The method {@link isParamsValid} performs some sanity checks.
 *  * The method {@link calculateTicks} performs the actual calculation
 *
 * Override these methods to create custom implementations of Tick intervals in SciChart
 * @remarks
 * See also {@link TickProvider} for the base implementation.
 */
var NumericTickProvider = /** @class */ (function (_super) {
    __extends(NumericTickProvider, _super);
    /**
     * Creates an instance of a NumericTickProvider
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart | SciChart 3D WebAssembly Context}
     * containing native methods and access to our WebGL2 WebAssembly Rendering Engine
     */
    function NumericTickProvider(webAssemblyContext) {
        var _this = _super.call(this) || this;
        _this.minDeltaValue = 1e-13;
        _this.webAssemblyContext = webAssemblyContext;
        return _this;
    }
    /**
     * @inheritDoc
     */
    NumericTickProvider.prototype.getMinorTicks = function (minorDelta, majorDelta, visibleRange) {
        var deltaRange = new NumberRange_1.NumberRange(minorDelta, majorDelta);
        var tickRange = visibleRange;
        if (!this.isParamsValid(tickRange, deltaRange)) {
            return [];
        }
        return this.calculateTicks(tickRange, deltaRange.min, deltaRange.max);
    };
    /**
     * @inheritDoc
     */
    NumericTickProvider.prototype.getMajorTicks = function (minorDelta, majorDelta, visibleRange) {
        var deltaRange = new NumberRange_1.NumberRange(minorDelta, majorDelta);
        var tickRange = visibleRange;
        if (!this.isParamsValid(tickRange, deltaRange)) {
            return [];
        }
        return this.calculateTicks(tickRange, deltaRange.max, deltaRange.max);
    };
    /**
     * @summary Performs sanity checks to see if parameters are valid.
     * @description If this method returns false, then we should not process or compute major/minor gridlines, but instead should
     * return empty array ```[]``` in {@link getMajorTicks} / {@link getMinorTicks}
     * @param visibleRange The current {@link AxisCore.visibleRange} which is the minimum / maximum range visible on the Axis.
     * @param deltaRange The current {@link AxisCore.minorDelta} and {@link AxisCore.majorDelta} which is the difference between minor
     * and major gridlines requested by the {@link AxisCore | Axis}
     */
    NumericTickProvider.prototype.isParamsValid = function (visibleRange, deltaRange) {
        Guard_1.Guard.notNull(visibleRange, "visibleRange");
        Guard_1.Guard.notNull(deltaRange, "deltaRange");
        return ((0, isRealNumber_1.isRealNumber)(visibleRange.min) && (0, isRealNumber_1.isRealNumber)(visibleRange.max) && deltaRange.min > 0 && deltaRange.max > 0);
    };
    /**
     * @summary Performs the Numeric tick calculation
     * @param visibleRange The current {@link AxisCore.visibleRange} which is the minimum / maximum range visible on the Axis.
     * @param delta The delta we are calculating for (could be major or minor delta)
     * @param majorDelta The current {@link AxisCore.majorDelta} which is the difference between major
     * gridlines requested by the {@link AxisCore | Axis}
     */
    NumericTickProvider.prototype.calculateTicks = function (visibleRange, delta, majorDelta) {
        var results = [];
        var min = visibleRange.min;
        var max = visibleRange.max;
        var calcMajorTicks = delta === majorDelta;
        var numberUtil = this.webAssemblyContext.NumberUtil;
        // Skip the divisiblity check here as it can return true if the min is within epsilon of being divisible,
        // but false for min + delta, leading to only one tick being output.
        var current = numberUtil.RoundUp(min, delta);
        var start = current;
        var tickCount = 0;
        while (current <= max) {
            // TRUE if major ticks are calculated && Current is divisible by MajorDelta
            // or if minor ticks are calculated && Current is NOT divisible by MajorDelta
            if (!(numberUtil.IsDivisibleBy(current, majorDelta) !== calcMajorTicks)) {
                results.push(current);
            }
            current = start + ++tickCount * delta;
        }
        return results;
    };
    return NumericTickProvider;
}(TickProvider_1.TickProvider));
exports.NumericTickProvider = NumericTickProvider;
