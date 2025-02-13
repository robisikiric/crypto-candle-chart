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
exports.LogarithmicTickProvider = exports.ELogarithmicMajorTickMode = exports.ELogarithmicMinorTickMode = void 0;
var Guard_1 = require("../../../Core/Guard");
var NumberRange_1 = require("../../../Core/NumberRange");
var isRealNumber_1 = require("../../../utils/isRealNumber");
var TickProvider_1 = require("./TickProvider");
var ELogarithmicMinorTickMode;
(function (ELogarithmicMinorTickMode) {
    ELogarithmicMinorTickMode["Linear"] = "Linear";
    ELogarithmicMinorTickMode["Logarithmic"] = "Logarithmic";
    ELogarithmicMinorTickMode["Auto"] = "Auto";
})(ELogarithmicMinorTickMode = exports.ELogarithmicMinorTickMode || (exports.ELogarithmicMinorTickMode = {}));
var ELogarithmicMajorTickMode;
(function (ELogarithmicMajorTickMode) {
    ELogarithmicMajorTickMode["EqualSpacing"] = "EqualSpacing";
    ELogarithmicMajorTickMode["RoundNumbers"] = "RoundNumbers";
})(ELogarithmicMajorTickMode = exports.ELogarithmicMajorTickMode || (exports.ELogarithmicMajorTickMode = {}));
/**
 * @summary The LogarithmicTickProvider is a {@link TickProvider} implementation for Logarithmic 2D or 3D Axis.
 * @description TickProviders are responsible for calculating the interval between major and minor gridlines, ticks and labels.
 *
 *  * The method {@link getMajorTicks} returns an array of major ticks (data-values values where SciChart will place labels and major gridlines.
 *  * The method {@link getMinorTicks} returns an array of minor ticks (data-values values where SciChart will place minor gridlines.
 *  * The method {@link calculateTicks} performs the actual calculation
 *
 * Override these methods to create custom implementations of Tick intervals in SciChart
 * @remarks
 * See also {@link TickProvider} for the base implementation.
 */
var LogarithmicTickProvider = /** @class */ (function (_super) {
    __extends(LogarithmicTickProvider, _super);
    function LogarithmicTickProvider(wasmContext) {
        var _this = _super.call(this) || this;
        _this.logarithmicBase = 10;
        _this.isHighPrecisionTicks = true;
        _this.majorTickModeProperty = ELogarithmicMajorTickMode.EqualSpacing;
        _this.minorTickModeProperty = ELogarithmicMinorTickMode.Linear;
        _this.wasmContext = wasmContext;
        return _this;
    }
    Object.defineProperty(LogarithmicTickProvider.prototype, "majorTickMode", {
        /**
         * Gets or sets the mode for Major ticks using {@link ELogarithmicMajorTickMode}
         * Equally spaced (best for large ranges) or
         * Round numbers (better for small ranges)
         */
        get: function () {
            return this.majorTickModeProperty;
        },
        /**
         * Gets or sets the mode for Major ticks using {@link ELogarithmicMajorTickMode}
         * Equally spaced (best for large ranges) or
         * Round numbers (better for small ranges)
         */
        set: function (mode) {
            var _a;
            this.majorTickModeProperty = mode;
            if ((_a = this.parentAxis) === null || _a === void 0 ? void 0 : _a.invalidateParentCallback) {
                this.parentAxis.invalidateParentCallback();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LogarithmicTickProvider.prototype, "minorTickMode", {
        /**
         * Gets or sets the mode for minor ticks using {@link ELogarithmicMinorTickMode},
         * Linear (default, best for smaller ranges),
         * Logarithmic (better for very large ranges) or
         * Auto (switches from linear to Logarithmic when the visible range is such that
         *  the first linear minor tick would be more than 70% of the major tick)
         */
        get: function () {
            return this.minorTickModeProperty;
        },
        /**
         * Gets or sets the mode for minor ticks using {@link ELogarithmicMinorTickMode},
         * Linear (default, best for smaller ranges),
         * Logarithmic (better for very large ranges) or
         * Auto (switches from linear to Logarithmic when the visible range is such that
         *  the first linear minor tick would be more than 70% of the major tick)
         */
        set: function (mode) {
            var _a;
            this.minorTickModeProperty = mode;
            if ((_a = this.parentAxis) === null || _a === void 0 ? void 0 : _a.invalidateParentCallback) {
                this.parentAxis.invalidateParentCallback();
            }
        },
        enumerable: false,
        configurable: true
    });
    LogarithmicTickProvider.prototype.getMajorTicks = function (minorDelta, majorDelta, visibleRange) {
        var deltaRange = new NumberRange_1.NumberRange(minorDelta, majorDelta);
        var logAxis = this.parentAxis;
        var adj = 1;
        if ((logAxis === null || logAxis === void 0 ? void 0 : logAxis.isNegative) && visibleRange.min < 0) {
            adj = -1;
            visibleRange = new NumberRange_1.NumberRange(Math.abs(visibleRange.max), Math.abs(visibleRange.min));
        }
        if (!this.isParamsValid(visibleRange, deltaRange)) {
            return [];
        }
        if (this.majorTickMode === ELogarithmicMajorTickMode.RoundNumbers) {
            return this.getRoundNumberMajorTicks(minorDelta, majorDelta, visibleRange);
        }
        else {
            var results = [];
            if (this.logarithmicBase === 0)
                return results;
            var current = visibleRange.min;
            var min = visibleRange.min;
            var max = visibleRange.max;
            var numberUtil = this.wasmContext.NumberUtil;
            if (!this.isHighPrecisionTicks &&
                !numberUtil.IsPowerOf(current, this.logarithmicBase, this.logarithmicBase)) {
                current = numberUtil.RoundDownPower(current, this.logarithmicBase, this.logarithmicBase);
            }
            var start = numberUtil.Log(current, this.logarithmicBase);
            start = numberUtil.RoundToDigits(start, 10);
            if (!numberUtil.IsDivisibleBy(start, majorDelta)) {
                start = numberUtil.RoundUp(start, majorDelta);
            }
            var exp = start;
            current = Math.pow(this.logarithmicBase, exp);
            var tickCount = 0;
            while (current <= max) {
                // If major ticks are calculated, the exponent of current should be divisible by MajorDelta
                if (numberUtil.IsDivisibleBy(exp, majorDelta)) {
                    results.push(adj * current);
                }
                exp = start + ++tickCount * majorDelta;
                current = Math.pow(this.logarithmicBase, exp);
            }
            //console.log(majorDelta, minorDelta, results);
            if (adj === -1) {
                return results.reverse();
            }
            else {
                return results;
            }
        }
    };
    LogarithmicTickProvider.prototype.getRoundNumberMajorTicks = function (minorDelta, majorDelta, visibleRange) {
        var results = [];
        var current = visibleRange.min;
        var min = visibleRange.min;
        var max = visibleRange.max;
        var diff = Math.pow(this.logarithmicBase, majorDelta);
        var minDiff = this.roundNum(min * (diff - 1));
        current = this.roundNum(current, minDiff);
        results.push(current);
        while (current <= max) {
            var nextDiff = current * (diff - 1);
            var next = this.roundNum(current * diff, nextDiff);
            var working = next;
            while (next === current) {
                working = working * diff;
                next = this.roundNum(working, nextDiff);
            }
            current = next;
            results.push(current);
        }
        return results;
    };
    LogarithmicTickProvider.prototype.roundNum = function (value, difference) {
        if (value === 0)
            return 0;
        var exponent = Math.floor(Math.log10(value));
        if (difference) {
            exponent = Math.min(exponent, Math.round(Math.log10(difference)));
        }
        // Fractional part of range
        var figures = this.wasmContext.NumberUtil.RoundToDigits(value / Math.pow(10, exponent), 1);
        var base = Math.floor(figures);
        var fraction = figures - base;
        var niceFraction = NaN;
        if (fraction < 0.3) {
            niceFraction = 0;
        }
        else if (fraction < 0.7) {
            niceFraction = 0.5;
        }
        else {
            niceFraction = 1;
        }
        return (base + niceFraction) * Math.pow(10, exponent);
    };
    LogarithmicTickProvider.prototype.getMinorTicks = function (minorDelta, majorDelta, visibleRange) {
        var logAxis = this.parentAxis;
        var adj = 1;
        if (logAxis === null || logAxis === void 0 ? void 0 : logAxis.isNegative) {
            adj = -1;
            visibleRange = new NumberRange_1.NumberRange(Math.abs(visibleRange.max), Math.abs(visibleRange.min));
        }
        var firstIncrement = visibleRange.min * minorDelta;
        var partMajor = visibleRange.min * Math.pow(this.logarithmicBase, majorDelta * 0.7);
        var minorsToMajors = (Math.pow(this.logarithmicBase, majorDelta) - 1) / minorDelta;
        var minorLogMode = this.minorTickMode === ELogarithmicMinorTickMode.Logarithmic ||
            (this.minorTickMode === ELogarithmicMinorTickMode.Auto && partMajor < firstIncrement);
        var results = [];
        var majorTicks = this.getMajorTicks(minorDelta, majorDelta, visibleRange);
        var count = majorTicks.length;
        var logDiff = Math.pow(this.logarithmicBase, majorDelta);
        if (count > 0) {
            for (var index = 0; index <= count; index++) {
                var upper = index < count ? majorTicks[index] : majorTicks[index - 1] * logDiff;
                var prev = Math.max(upper / logDiff, visibleRange.min);
                var increment = prev * minorDelta;
                if (minorLogMode) {
                    var ticks = this.getMajorTicks(1, majorDelta / minorsToMajors, new NumberRange_1.NumberRange(prev, upper));
                    ticks.forEach(function (t) { return results.push(adj * t); });
                }
                else {
                    var current = prev + increment;
                    while (current < upper && increment > 0) {
                        results.push(adj * current);
                        current += increment;
                    }
                }
            }
        }
        return results;
    };
    /**
     * @summary Performs sanity checks to see if parameters are valid.
     * @description If this method returns false, then we should not process or compute major/minor gridlines, but instead should
     * return empty array ```[]``` in {@link getMajorTicks} / {@link getMinorTicks}
     * @param visibleRange The current {@link AxisCore.visibleRange} which is the minimum / maximum range visible on the Axis.
     * @param deltaRange The current {@link AxisCore.minorDelta} and {@link AxisCore.majorDelta} which is the difference between minor
     * and major gridlines requested by the {@link AxisCore | Axis}
     */
    LogarithmicTickProvider.prototype.isParamsValid = function (visibleRange, deltaRange) {
        Guard_1.Guard.notNull(visibleRange, "visibleRange");
        Guard_1.Guard.notNull(deltaRange, "deltaRange");
        return ((0, isRealNumber_1.isRealNumber)(visibleRange.min) &&
            (0, isRealNumber_1.isRealNumber)(visibleRange.max) &&
            (0, isRealNumber_1.isRealNumber)(deltaRange.min) &&
            (0, isRealNumber_1.isRealNumber)(deltaRange.max));
    };
    return LogarithmicTickProvider;
}(TickProvider_1.TickProvider));
exports.LogarithmicTickProvider = LogarithmicTickProvider;
