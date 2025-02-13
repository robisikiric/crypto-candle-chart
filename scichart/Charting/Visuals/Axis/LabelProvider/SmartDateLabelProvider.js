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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmartDateLabelProvider = exports.ETradeChartLabelFormat = void 0;
var LabelProviderType_1 = require("../../../../types/LabelProviderType");
var NumericFormat_1 = require("../../../../types/NumericFormat");
var date_1 = require("../../../../utils/date");
var number_1 = require("../../../../utils/number");
var LabelProviderBase2D_1 = require("./LabelProviderBase2D");
var ETradeChartLabelFormat;
(function (ETradeChartLabelFormat) {
    // 04:01 ... 45.1234 ... 46.3456
    ETradeChartLabelFormat["MilliSeconds"] = "MilliSeconds";
    // Apr 25 ... 04:01:45 ... 02:02:30
    ETradeChartLabelFormat["Seconds"] = "Seconds";
    // Apr 25 ... 01:34 ... 02:24
    ETradeChartLabelFormat["Minutes"] = "Minutes";
    // Apr ... 08 ... 13
    ETradeChartLabelFormat["Days"] = "Days";
    // 2020 ... Jan ... Feb
    ETradeChartLabelFormat["Months"] = "Months";
})(ETradeChartLabelFormat = exports.ETradeChartLabelFormat || (exports.ETradeChartLabelFormat = {}));
var TEN_SECONDS = 10;
var ONE_HOUR = 60 * 60;
var FIVE_DAYS = 60 * 60 * 24 * 5;
var FIFTY_DAYS = 60 * 60 * 24 * 50;
/**
 * The {@link SmartDateLabelProvider} formats Axis Labels and Cursor / Tooltips for {@link NumericAxis} types
 */
var SmartDateLabelProvider = /** @class */ (function (_super) {
    __extends(SmartDateLabelProvider, _super);
    /**
     * Creates an instance of {@link SmartDateLabelProvider}
     */
    function SmartDateLabelProvider(options) {
        var _this = this;
        var _a, _b, _c, _d, _e;
        _this = _super.call(this, __assign({ labelFormat: (_a = options === null || options === void 0 ? void 0 : options.labelFormat) !== null && _a !== void 0 ? _a : NumericFormat_1.ENumericFormat.Date_DDMMYYYY, cursorLabelFormat: (_b = options === null || options === void 0 ? void 0 : options.cursorLabelFormat) !== null && _b !== void 0 ? _b : NumericFormat_1.ENumericFormat.Date_DDMMYYYY }, options)) || this;
        _this.type = LabelProviderType_1.ELabelProviderType.SmartDate;
        _this.textVariesForSameTick = true;
        _this.showWiderDateOnFirstLabelProperty = true;
        _this.showYearOnWiderDateProperty = false;
        _this.dateOffsetProperty = 0;
        _this.firstLabel = true;
        _this.showWiderDateOnFirstLabelProperty = (_c = options === null || options === void 0 ? void 0 : options.showWiderDateOnFirstLabel) !== null && _c !== void 0 ? _c : _this.showWiderDateOnFirstLabel;
        _this.showYearOnWiderDateProperty = (_d = options === null || options === void 0 ? void 0 : options.showYearOnWiderDate) !== null && _d !== void 0 ? _d : _this.showYearOnWiderDate;
        _this.dateOffsetProperty = (_e = options === null || options === void 0 ? void 0 : options.dateOffset) !== null && _e !== void 0 ? _e : _this.dateOffset;
        _this.formatCursorLabelProperty = function (dataValue) {
            var _a, _b;
            return _this.applyFormat((0, number_1.formatNumber)(dataValue + _this.dateOffset, (_a = _this.cursorNumericFormat) !== null && _a !== void 0 ? _a : _this.numericFormat, (_b = _this.cursorPrecision) !== null && _b !== void 0 ? _b : _this.precision));
        };
        _this.doFormat = _this.doFormat.bind(_this);
        _this.formatLabelProperty = _this.doFormat;
        return _this;
    }
    Object.defineProperty(SmartDateLabelProvider.prototype, "showWiderDateOnFirstLabel", {
        /**
         * Gets or Sets whether the first label should be formatted using the wider format (eg Month Day or Month Day Year if {@link showYearOnWiderDate}).
         * If false the wider format will only be used when it changes (eg day/month boundary)
         */
        get: function () {
            return this.showWiderDateOnFirstLabelProperty;
        },
        /**
         * Gets or Sets whether the first label should be formatted using the wider format (eg Month Day or Month Day Year if {@link showYearOnWiderDate}).
         * If false the wider format will only be used when it changes (eg day/month boundary).
         */
        set: function (value) {
            if (this.showWiderDateOnFirstLabelProperty !== value) {
                this.showWiderDateOnFirstLabelProperty = value;
                this.invalidateParent();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SmartDateLabelProvider.prototype, "dateOffset", {
        /**
         * A timestamp in seconds to add to the value being formatted.  This allows you to plot dates with more than millisecond precision
         * but still show a full date with year on the axis
         */
        get: function () {
            var _a;
            return (_a = this.dateOffsetProperty) !== null && _a !== void 0 ? _a : 0;
        },
        /**
         * A timestamp in seconds to add to the value being formatted.  This allows you to plot dates with more than millisecond precision
         * but still show a full date with year on the axis
         */
        set: function (value) {
            if (this.dateOffsetProperty !== value) {
                this.dateOffsetProperty = value;
                this.invalidateParent();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SmartDateLabelProvider.prototype, "showYearOnWiderDate", {
        /**
         * Gets or Sets whether the year should be shown in the wider format used on first label. Default false.
         */
        get: function () {
            return this.showYearOnWiderDateProperty;
        },
        /**
         * Gets or Sets whether the year should be shown in the wider format used on first label. Default false.
         */
        set: function (value) {
            if (this.showYearOnWiderDateProperty !== value) {
                this.showYearOnWiderDateProperty = value;
                this.invalidateParent();
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    SmartDateLabelProvider.prototype.onBeginAxisDraw = function () {
        // TODO: user can override here if they want
    };
    /**
     * @inheritDoc
     */
    SmartDateLabelProvider.prototype.getLabels = function (majorTicks) {
        var first = majorTicks[0];
        var ticksNumber = majorTicks.length;
        var last = majorTicks[ticksNumber - 1];
        // Only convert the values we need
        if (this.parentAxis.isCategoryAxis) {
            var categoryCoordCalc = this.parentAxis.getCurrentCoordinateCalculator();
            first = categoryCoordCalc.transformIndexToData(first);
            last = categoryCoordCalc.transformIndexToData(last);
        }
        this.prevPrevValue = undefined;
        this.prevValue = undefined;
        var timeRange = last - first;
        this.firstLabel = true;
        this.format = this.getLabelRange(timeRange, ticksNumber);
        var labels = _super.prototype.getLabels.call(this, majorTicks);
        this.format = undefined;
        return labels;
    };
    Object.defineProperty(SmartDateLabelProvider.prototype, "numericFormat", {
        /** @inheritDoc */
        get: function () {
            return undefined;
            // SCJS-1206 throwing erros here breaks serialization
            // throw new Error("Setting or getting numericFormat is not supported for SmartDateLabelProvider");
        },
        /** @inheritDoc */
        set: function (value) {
            // throw new Error("Setting or getting numericFormat is not supported for SmartDateLabelProvider");
        },
        enumerable: false,
        configurable: true
    });
    /** Format the value in a wider format, for the first label, and when the wider formated value would change */
    SmartDateLabelProvider.prototype.formatDateWide = function (labelRange, value) {
        if (labelRange === ETradeChartLabelFormat.MilliSeconds) {
            return ((this.showYearOnWiderDate ? (0, date_1.formatUnixDateToHumanString)(value) + " " : "") +
                (0, date_1.formatUnixDateToHumanStringHHMM)(value));
        }
        else if (labelRange === ETradeChartLabelFormat.Seconds || labelRange === ETradeChartLabelFormat.Minutes) {
            return ((0, date_1.formatUnixDateToHumanStringMMMDD)(value) +
                (this.showYearOnWiderDate ? " " + (0, date_1.formatUnixDateToHumanStringYYYY)(value) : ""));
        }
        else if (labelRange === ETradeChartLabelFormat.Days) {
            return ((0, date_1.formatUnixDateToHumanStringMMM)(value) +
                (this.showYearOnWiderDate ? " " + (0, date_1.formatUnixDateToHumanStringYYYY)(value) : ""));
        }
        else {
            return (0, date_1.formatUnixDateToHumanStringYYYY)(value);
        }
    };
    /** Format the value using precise format */
    SmartDateLabelProvider.prototype.formatDatePrecise = function (labelRange, value) {
        if (labelRange === ETradeChartLabelFormat.MilliSeconds) {
            return (0, date_1.formatUnixDateToHumanStringSSms)(value);
        }
        else if (labelRange === ETradeChartLabelFormat.Seconds) {
            return (0, date_1.formatUnixDateToHumanStringHHMMSS)(value);
        }
        else if (labelRange === ETradeChartLabelFormat.Minutes) {
            return (0, date_1.formatUnixDateToHumanStringHHMM)(value);
        }
        else if (labelRange === ETradeChartLabelFormat.Days) {
            return (0, date_1.formatUnixDateToHumanStringDD)(value);
        }
        else if (labelRange === ETradeChartLabelFormat.Months) {
            return (0, date_1.formatUnixDateToHumanStringDD)(value);
        }
        return (0, number_1.formatNumber)(value, NumericFormat_1.ENumericFormat.Date_DDMMYYYY, 0);
    };
    /** This method is bound to the formatLabel method of the base labelProvider.
     * It calls formatSmartLabel if a format has been set by getLabelRange
     */
    SmartDateLabelProvider.prototype.doFormat = function (dataValue) {
        var _a, _b;
        var valueToFormat = dataValue + this.dateOffset;
        if (this.format) {
            var text = this.formatSmartLabel(this.format, valueToFormat, this.prevValue, this.prevPrevValue, dataValue);
            this.prevPrevValue = this.prevValue;
            this.prevValue = valueToFormat;
            return text;
        }
        else {
            return this.applyFormat((0, number_1.formatNumber)(valueToFormat, (_a = this.cursorNumericFormat) !== null && _a !== void 0 ? _a : this.numericFormat, (_b = this.cursorPrecision) !== null && _b !== void 0 ? _b : this.precision));
        }
    };
    /** Return a range string, based on the numeric range of the axis.  This will be used to choose which formatting to use */
    SmartDateLabelProvider.prototype.getLabelRange = function (timeRange, ticksNumber) {
        if (timeRange <= TEN_SECONDS) {
            return ETradeChartLabelFormat.MilliSeconds;
        }
        else if (timeRange <= ONE_HOUR) {
            return ETradeChartLabelFormat.Seconds;
        }
        else if (timeRange <= FIVE_DAYS) {
            return ETradeChartLabelFormat.Minutes;
        }
        else if (timeRange <= FIFTY_DAYS) {
            return ETradeChartLabelFormat.Days;
        }
        else {
            return ETradeChartLabelFormat.Months;
        }
    };
    /** Decide whether to format wide or precise, based on the range string, the current value and the two previous values
     * value has the dateOffset added.  originalValue is the actual value of the tick */
    SmartDateLabelProvider.prototype.formatSmartLabel = function (tradeChartLabelFormat, value, prevValue, prevPrevValue, originalValue) {
        // TODO this needs to be smarter to use the original value rather than combined value for some ranges
        var showWider = !this.firstLabel || this.showWiderDateOnFirstLabel;
        this.firstLabel = false;
        var wideDate = this.formatDateWide(tradeChartLabelFormat, value);
        if (tradeChartLabelFormat !== ETradeChartLabelFormat.Months) {
            var newDate = prevValue === undefined || wideDate !== this.formatDateWide(tradeChartLabelFormat, prevValue);
            if (newDate && showWider) {
                return wideDate;
            }
            else {
                return this.formatDatePrecise(tradeChartLabelFormat, value);
            }
        }
        else {
            var newYear = prevValue === undefined || wideDate !== this.formatDateWide(tradeChartLabelFormat, prevValue);
            if (newYear && showWider) {
                return wideDate;
            }
            // If previous label was year, display month label
            var prevPrevNewYear = prevPrevValue === undefined ||
                this.formatDateWide(tradeChartLabelFormat, prevValue) !==
                    this.formatDateWide(tradeChartLabelFormat, prevPrevValue);
            var newMonth = prevPrevNewYear || (0, date_1.formatUnixDateToHumanStringMMM)(value) !== (0, date_1.formatUnixDateToHumanStringMMM)(prevValue);
            if (newMonth) {
                return (0, date_1.formatUnixDateToHumanStringMMM)(value);
            }
            return this.formatDatePrecise(tradeChartLabelFormat, value);
        }
    };
    return SmartDateLabelProvider;
}(LabelProviderBase2D_1.LabelProviderBase2D));
exports.SmartDateLabelProvider = SmartDateLabelProvider;
