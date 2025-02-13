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
exports.DateTimeDeltaCalculator = void 0;
var performanceWarnings_1 = require("../../../../constants/performanceWarnings");
var NumberRange_1 = require("../../../../Core/NumberRange");
var NumericDeltaCalculator_1 = require("./NumericDeltaCalculator");
/**
 * The DateTimeDeltaCalculator is respinsible for calculating {@link AxisCore.minorDelta} and {@link AxisCore.majorDelta} on
 * {@link NumericAxis} types.
 */
var DateTimeDeltaCalculator = /** @class */ (function (_super) {
    __extends(DateTimeDeltaCalculator, _super);
    function DateTimeDeltaCalculator(webAssemblyContext, options) {
        var _this = this;
        var _a;
        _this = _super.call(this, webAssemblyContext) || this;
        _this.possibleDeltasProperty = [
            1,
            2,
            5,
            10,
            15,
            30,
            60,
            2 * 60,
            5 * 60,
            10 * 60,
            15 * 60,
            30 * 60,
            60 * 60,
            2 * 60 * 60,
            3 * 60 * 60,
            6 * 60 * 60,
            12 * 60 * 60,
            24 * 60 * 60,
            2 * 24 * 60 * 60,
            3 * 24 * 60 * 60,
            5 * 24 * 60 * 60,
            10 * 24 * 60 * 60,
            15 * 24 * 60 * 60,
            20 * 24 * 60 * 60,
            30 * 24 * 60 * 60,
            // TODO these month deltas really need special handling
            2 * 30 * 24 * 60 * 60,
            4 * 30 * 24 * 60 * 60,
            6 * 30 * 24 * 60 * 60,
            365.25 * 24 * 60 * 60
            // Years also need special handling
        ];
        _this.currIndex = 1;
        _this.possibleDeltasProperty = (_a = options === null || options === void 0 ? void 0 : options.possibleDeltas) !== null && _a !== void 0 ? _a : _this.possibleDeltasProperty;
        _this.minTicks = options === null || options === void 0 ? void 0 : options.minTicks;
        _this.currIndex = Math.floor(_this.possibleDeltas.length / 2);
        return _this;
    }
    Object.defineProperty(DateTimeDeltaCalculator.prototype, "possibleDeltas", {
        /**
         * Gets or sets deltas array
         */
        get: function () {
            return this.possibleDeltasProperty;
        },
        set: function (value) {
            if (this.possibleDeltasProperty !== value) {
                this.possibleDeltasProperty = value;
                this.currIndex = Math.floor(this.possibleDeltas.length / 2);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateTimeDeltaCalculator.prototype, "minTicks", {
        get: function () {
            return this.minTicksProperty;
        },
        set: function (value) {
            if (this.minTicksProperty !== value) {
                this.minTicksProperty = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    DateTimeDeltaCalculator.prototype.getDeltaFromRange = function (min, max, minorsPerMajor, maxTicks) {
        var _this = this;
        var diff = max - min;
        this.prevIndex = undefined;
        if (this.currIndex >= this.possibleDeltas.length) {
            this.currIndex = Math.floor(this.possibleDeltas.length / 2);
        }
        var tries = 0;
        var calculateDelta = function (index) {
            var _a, _b;
            var delta = _this.possibleDeltasProperty[index];
            tries++;
            if (tries > _this.possibleDeltas.length + 1) {
                performanceWarnings_1.performanceWarnings.dateTimeDeltaCalculatorBadDelta.warn();
                return delta;
            }
            var ticksCount = Math.floor(diff / delta);
            if (ticksCount < ((_a = _this.minTicks) !== null && _a !== void 0 ? _a : maxTicks / 3) && index === 0 && index !== _this.prevIndex) {
                if (!_this.prevIndex)
                    _this.prevIndex = index;
                return _super.prototype.getDeltaFromRange.call(_this, min, max, minorsPerMajor, maxTicks).max;
            }
            if (ticksCount < ((_b = _this.minTicks) !== null && _b !== void 0 ? _b : maxTicks / 3) && index > 0 && index !== _this.prevIndex) {
                if (!_this.prevIndex)
                    _this.prevIndex = index;
                return calculateDelta(index - 1);
            }
            if (ticksCount > maxTicks && index < _this.possibleDeltasProperty.length - 1 && index !== _this.prevIndex) {
                if (!_this.prevIndex)
                    _this.prevIndex = index;
                return calculateDelta(index + 1);
            }
            else if (ticksCount > maxTicks && index === _this.possibleDeltasProperty.length - 1) {
                var yearDelta = _super.prototype.getDeltaFromRange.call(_this, min / delta, max / delta, minorsPerMajor, maxTicks);
                return yearDelta.max * delta;
            }
            else {
                if (_this.currIndex !== index) {
                    _this.currIndex = index;
                }
                return delta;
            }
        };
        var delta = calculateDelta(this.currIndex);
        return new NumberRange_1.NumberRange(delta / minorsPerMajor, delta);
    };
    return DateTimeDeltaCalculator;
}(NumericDeltaCalculator_1.NumericDeltaCalculator));
exports.DateTimeDeltaCalculator = DateTimeDeltaCalculator;
