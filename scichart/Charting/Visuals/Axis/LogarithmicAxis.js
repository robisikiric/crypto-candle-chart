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
exports.LogarithmicAxis = exports.MIN_LOG_AXIS_VALUE = void 0;
var EasingFunctions_1 = require("../../../Core/Animations/EasingFunctions");
var NumberRangeAnimator_1 = require("../../../Core/Animations/NumberRangeAnimator");
var NumberRange_1 = require("../../../Core/NumberRange");
var AxisType_1 = require("../../../types/AxisType");
var XyDirection_1 = require("../../../types/XyDirection");
var LogarithmicCoordinateCalculator_1 = require("../../Numerics/CoordinateCalculators/LogarithmicCoordinateCalculator");
var LogarithmicTickProvider_1 = require("../../Numerics/TickProviders/LogarithmicTickProvider");
var AxisBase2D_1 = require("./AxisBase2D");
var constants_1 = require("./constants");
var LogarithmicDeltaCalculator_1 = require("./DeltaCalculator/LogarithmicDeltaCalculator");
var LogarithmicLabelProvider_1 = require("./LabelProvider/LogarithmicLabelProvider");
// TODO probably find better value, e.g. check if it works with Number.MIN_VALUE
exports.MIN_LOG_AXIS_VALUE = 0.0000000001;
/**
 * Creates an instance of a {@link LogarithmicAxis}
 * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
 * access to our WebGL2 Engine and WebAssembly numerical methods
 * @param options Optional parameters of type {@link ILogarithmicAxisOptions} used to configure the axis at instantiation time
 */
var LogarithmicAxis = /** @class */ (function (_super) {
    __extends(LogarithmicAxis, _super);
    function LogarithmicAxis(wasmContext, options) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        _this = _super.call(this, wasmContext, options) || this;
        _this.type = AxisType_1.EAxisType.LogarithmicAxis;
        _this.logBaseProperty = 10;
        _this.isHighPrecisionTicksProperty = true;
        _this.tickProvider = new LogarithmicTickProvider_1.LogarithmicTickProvider(wasmContext);
        _this.deltaCalculator = new LogarithmicDeltaCalculator_1.LogarithmicDeltaCalculator(wasmContext);
        _this.labelProvider =
            (_a = options === null || options === void 0 ? void 0 : options.labelProvider) !== null && _a !== void 0 ? _a : new LogarithmicLabelProvider_1.LogarithmicLabelProvider(options);
        _this.logBase = (_b = options === null || options === void 0 ? void 0 : options.logBase) !== null && _b !== void 0 ? _b : _this.logBaseProperty;
        _this.isNegativeProperty = (_c = options === null || options === void 0 ? void 0 : options.isNegative) !== null && _c !== void 0 ? _c : false;
        _this.visibleRange = NumberRange_1.NumberRange.hydrate(options === null || options === void 0 ? void 0 : options.visibleRange) || _this.getDefaultNonZeroRange();
        if (!(options === null || options === void 0 ? void 0 : options.visibleRange)) {
            _this.hasVisibleRangeSet = false;
        }
        _this.majorTickMode = (options === null || options === void 0 ? void 0 : options.majorTickMode) || _this.majorTickMode;
        _this.minorTickMode = (options === null || options === void 0 ? void 0 : options.minorTickMode) || _this.minorTickMode;
        _this.isHighPrecisionTicks = (_d = options === null || options === void 0 ? void 0 : options.isHighPrecisionTicks) !== null && _d !== void 0 ? _d : _this.isHighPrecisionTicksProperty;
        if (options === null || options === void 0 ? void 0 : options.visibleRangeLimit) {
            _this.visibleRangeLimit = (_e = NumberRange_1.NumberRange.hydrate(options === null || options === void 0 ? void 0 : options.visibleRangeLimit)) !== null && _e !== void 0 ? _e : options.visibleRangeLimit;
        }
        else {
            // Log axis can be positive or negative, but not both.
            if (_this.isNegativeProperty) {
                _this.visibleRangeLimit = new NumberRange_1.NumberRange(-Infinity, -exports.MIN_LOG_AXIS_VALUE);
            }
            else {
                _this.visibleRangeLimit = new NumberRange_1.NumberRange(exports.MIN_LOG_AXIS_VALUE, Infinity);
            }
        }
        return _this;
    }
    Object.defineProperty(LogarithmicAxis.prototype, "logBase", {
        /**
         * Gets or sets the Logarithmic Base for the axis. Defaults to 10
         */
        get: function () {
            return this.logBaseProperty;
        },
        /**
         * Gets or sets the Logarithmic Base for the axis. Defaults to 10
         */
        set: function (logBase) {
            if (this.logBaseProperty !== logBase) {
                this.logBaseProperty = logBase;
                this.clearCoordCalcCache();
                this.updateProviders();
                this.notifyPropertyChanged(constants_1.PROPERTY.LOG_BASE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LogarithmicAxis.prototype, "isNegative", {
        get: function () {
            return this.isNegativeProperty;
        },
        set: function (isNegative) {
            this.isNegativeProperty = isNegative;
            if (this.isNegativeProperty) {
                this.visibleRangeLimit = new NumberRange_1.NumberRange(-Infinity, -0.0000000001);
            }
            else {
                this.visibleRangeLimit = new NumberRange_1.NumberRange(0.0000000001, Infinity);
            }
            this.notifyPropertyChanged(constants_1.PROPERTY.IS_NEGATIVE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LogarithmicAxis.prototype, "isHighPrecisionTicks", {
        get: function () {
            return this.isHighPrecisionTicksProperty;
        },
        set: function (isHighPrecisionTicks) {
            this.isHighPrecisionTicksProperty = isHighPrecisionTicks;
            this.updateProviders();
            this.notifyPropertyChanged(constants_1.PROPERTY.HIGH_PRECISION_TICKS);
        },
        enumerable: false,
        configurable: true
    });
    LogarithmicAxis.prototype.getDefaultNonZeroRange = function () {
        var adj = this.isNegativeProperty ? -1 : 1;
        return new NumberRange_1.NumberRange(adj * Math.pow(this.logBase, -1), adj * Math.pow(this.logBase, 2));
    };
    LogarithmicAxis.prototype.hasValidVisibleRange = function () {
        return _super.prototype.hasValidVisibleRange.call(this) && this.visibleRange.min * this.visibleRange.max > 0;
    };
    Object.defineProperty(LogarithmicAxis.prototype, "tickProvider", {
        get: function () {
            return this.tickProviderProperty;
        },
        set: function (tickProvider) {
            this.tickProviderProperty = tickProvider;
            this.updateProviders();
            this.notifyPropertyChanged(constants_1.PROPERTY.TICK_PROVIDER);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LogarithmicAxis.prototype, "deltaCalculator", {
        get: function () {
            return this.deltaCalculatorProperty;
        },
        set: function (deltaCalculator) {
            this.deltaCalculatorProperty = deltaCalculator;
            this.updateProviders();
            this.notifyPropertyChanged(constants_1.PROPERTY.DELTA_CALCULATOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LogarithmicAxis.prototype, "labelProvider", {
        get: function () {
            return this.labelProviderProperty;
        },
        set: function (labelProvider) {
            this.labelProviderProperty = labelProvider;
            this.updateProviders();
            this.notifyPropertyChanged(constants_1.PROPERTY.LABEL_PROVIDER);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LogarithmicAxis.prototype, "majorTickMode", {
        /**
         * Gets or sets the mode for Major ticks using {@link ELogarithmicMajorTickMode}
         * Equally spaced (best for large ranges) or
         * Round numbers (better for small ranges)
         */
        get: function () {
            return this.logTickProvider.majorTickMode;
        },
        /**
         * Gets or sets the mode for Major ticks using {@link ELogarithmicMajorTickMode}
         * Equally spaced (best for large ranges) or
         * Round numbers (better for small ranges)
         */
        set: function (mode) {
            this.logTickProvider.majorTickMode = mode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LogarithmicAxis.prototype, "minorTickMode", {
        /**
         * Gets or sets the mode for minor ticks using {@link ELogarithmicMinorTickMode},
         * Linear (default, best for smaller ranges),
         * Logarithmic (better for very large ranges) or
         * Auto (switches from linear to Logarithmic when the visible range is such that
         *  the first linear minor tick would be more than 70% of the major tick)
         */
        get: function () {
            return this.logTickProvider.minorTickMode;
        },
        /**
         * Gets or sets the mode for minor ticks using {@link ELogarithmicMinorTickMode},
         * Linear (default, best for smaller ranges),
         * Logarithmic (better for very large ranges) or
         * Auto (switches from linear to Logarithmic when the visible range is such that
         *  the first linear minor tick would be more than 70% of the major tick)
         */
        set: function (mode) {
            this.logTickProvider.minorTickMode = mode;
        },
        enumerable: false,
        configurable: true
    });
    LogarithmicAxis.prototype.getWindowedYRange = function (xRanges) {
        var _this = this;
        var maxRange;
        if (this.parentSurface) {
            var visibleSeries = this.parentSurface.renderableSeries
                .asArray()
                .filter(function (s) { return s.yAxisId === _this.id && s.isVisible && s.hasDataSeriesValues(); });
            visibleSeries.forEach(function (rSeries) {
                // Get pre-calculated XRange if exists, otherwise, fetch from the axis for this series
                var xVisibleRange = (xRanges === null || xRanges === void 0 ? void 0 : xRanges.containsKey(rSeries.xAxisId))
                    ? xRanges.item(rSeries.xAxisId)
                    : _this.getXVisibleRange(rSeries.xAxisId);
                var isXCategoryAxis = _this.getIsXCategoryAxis(rSeries.xAxisId);
                if (xVisibleRange) {
                    var range = rSeries.getYRange(xVisibleRange, isXCategoryAxis);
                    if (range) {
                        maxRange = maxRange ? maxRange.union(range) : range;
                    }
                }
            });
        }
        if (maxRange === null || maxRange === void 0 ? void 0 : maxRange.isZero()) {
            maxRange = this.coerceZeroVisibleRange(maxRange);
        }
        if (this.growBy && maxRange) {
            maxRange = maxRange.growByLog(this.growBy, this.logBase);
        }
        if (this.visibleRangeLimit && maxRange) {
            maxRange = maxRange.clip(this.visibleRangeLimit);
        }
        return maxRange;
    };
    /**
     * @inheritdoc
     */
    LogarithmicAxis.prototype.animateVisibleRange = function (visibleRange, durationMs, easingFunction, onCompleted) {
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
        }, onCompleted, easingFunction, true);
        this.parentSurface.addAnimation(this.visibleRangeAnimationToken);
        return this.visibleRangeAnimationToken;
    };
    LogarithmicAxis.prototype.scale = function (initialRange, delta, isMoreThanHalf) {
        var deltaRange = initialRange.max / initialRange.min;
        var newMin, newMax;
        // Respect flippedCoordinates
        var isMoreThanHalf2 = this.flippedCoordinates ? !isMoreThanHalf : isMoreThanHalf;
        var delta2 = this.flippedCoordinates ? -delta : delta;
        if (isMoreThanHalf2) {
            newMin = initialRange.min;
            var mult = delta2 > 0 ? Math.pow(deltaRange, 1 - delta2) : Math.pow(deltaRange, 1 + Math.abs(delta2));
            newMax = mult * newMin;
        }
        else {
            newMax = initialRange.max;
            var mult = delta2 > 0 ? Math.pow(deltaRange, 1 + delta2) : Math.pow(deltaRange, 1 + delta2);
            newMin = newMax / mult;
        }
        this.visibleRange = new NumberRange_1.NumberRange(newMin, newMax);
    };
    LogarithmicAxis.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            logBase: this.logBase,
            isNegative: this.isNegative,
            majorTickMode: this.majorTickMode,
            minorTickMode: this.minorTickMode,
            isHighPrecisionTicks: this.isHighPrecisionTicks
        };
        Object.assign(json.options, options);
        return json;
    };
    LogarithmicAxis.prototype.getCurrentCoordinateCalculatorInternal = function () {
        var min = this.visibleRange.min;
        var max = this.visibleRange.max;
        var size = this.axisLength;
        var direction = this.isXAxis ? XyDirection_1.EXyDirection.XDirection : XyDirection_1.EXyDirection.YDirection;
        return new LogarithmicCoordinateCalculator_1.LogarithmicCoordinateCalculator(this.webAssemblyContext2D, size, min, max, direction, this.logBase, this.isXAxis !== this.flippedCoordinates, this.offset);
    };
    LogarithmicAxis.prototype.getMaxXRange = function () {
        var maximumRange = this.getXDataRange();
        if (!maximumRange)
            return undefined;
        // TODO: Coerce a zero range
        if (this.growBy && maximumRange) {
            maximumRange = maximumRange.growByLog(this.growBy, this.logBase);
        }
        if (this.visibleRangeLimit && maximumRange) {
            maximumRange = maximumRange.clip(this.visibleRangeLimit);
        }
        return maximumRange;
    };
    Object.defineProperty(LogarithmicAxis.prototype, "logTickProvider", {
        get: function () {
            return this.tickProvider;
        },
        enumerable: false,
        configurable: true
    });
    LogarithmicAxis.prototype.updateProviders = function () {
        var logTickProvider = this.tickProvider;
        if (logTickProvider) {
            logTickProvider.logarithmicBase = this.logBase;
            logTickProvider.isHighPrecisionTicks = this.isHighPrecisionTicks;
        }
        var logDeltaCalculator = this.deltaCalculator;
        if (logDeltaCalculator) {
            logDeltaCalculator.logarithmicBase = this.logBase;
            logDeltaCalculator.isHighPrecisionTicks = this.isHighPrecisionTicks;
        }
        var logLabelProvider = this.labelProvider;
        if (logLabelProvider) {
            logLabelProvider.logarithmicBase = this.logBase;
        }
    };
    return LogarithmicAxis;
}(AxisBase2D_1.AxisBase2D));
exports.LogarithmicAxis = LogarithmicAxis;
