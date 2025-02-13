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
exports.XyLinearTrendFilter = void 0;
var DataFilterType_1 = require("../../../types/DataFilterType");
var XyFilterBase_1 = require("./XyFilterBase");
/**
 * An XyDataSeries that represents the linear trendline (or linear regression) of the original series
 */
var XyLinearTrendFilter = /** @class */ (function (_super) {
    __extends(XyLinearTrendFilter, _super);
    function XyLinearTrendFilter(originalSeries, options) {
        var _this = _super.call(this, originalSeries, options) || this;
        if (_this.getOriginalCount() > 0) {
            _this.filterAll();
        }
        return _this;
    }
    Object.defineProperty(XyLinearTrendFilter.prototype, "slope", {
        /**
         * Gets the slope of the trendline
         */
        get: function () {
            return this.slopeProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(XyLinearTrendFilter.prototype, "intercept", {
        /**
         * Gets the y-intercept of the trendline
         */
        get: function () {
            return this.interceptProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(XyLinearTrendFilter.prototype, "correlation", {
        /**
         * Gets the correlation coefficient of the trendline
         */
        get: function () {
            return this.correlationProperty;
        },
        enumerable: false,
        configurable: true
    });
    // @ts-ignore
    XyLinearTrendFilter.prototype.toJSON = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var original = _super.prototype.toJSON.call(this, excludeData);
        return __assign(__assign({}, original), { filter: {
                type: DataFilterType_1.EDataFilterType.XyLinearTrend,
                options: { field: this.field, slope: this.slope, intercept: this.intercept }
            } });
    };
    XyLinearTrendFilter.prototype.filterAll = function () {
        var sumByIndex = 0;
        var sumX = 0;
        var sumY = 0;
        var sumPowX = 0;
        var sumPowY = 0;
        var rawX = this.getOriginalXValues();
        var rawY = this.getOriginalYValues();
        var originalCount = this.getOriginalCount();
        for (var i = 0; i < this.getOriginalCount(); i++) {
            var dblY = rawY.get(i);
            var dblX = rawX.get(i);
            sumByIndex += dblX * dblY;
            sumX += dblX;
            sumY += dblY;
            sumPowX += Math.pow(dblX, 2);
            sumPowY += Math.pow(dblY, 2);
        }
        var a = sumByIndex * originalCount;
        var b = sumX * sumY;
        var c = sumPowX * originalCount;
        var d = Math.pow(sumX, 2);
        this.correlationProperty = (a - b) / Math.sqrt((c - d) * (sumPowY * originalCount - Math.pow(sumY, 2)));
        this.slopeProperty = (a - b) / (c - d); // y = mx + c, m is a slope, c is an intercept
        var f = this.slopeProperty * sumX;
        this.interceptProperty = (sumY - f) / originalCount; // y = mx + c, m is a slope, c is an intercept
        var yValues = [];
        var xValues = [];
        for (var i = 0; i < originalCount; i++) {
            var x = rawX.get(i);
            xValues.push(x);
            yValues.push(x * this.slopeProperty + this.interceptProperty);
        }
        this.clear();
        this.appendRange(xValues, yValues);
    };
    return XyLinearTrendFilter;
}(XyFilterBase_1.XyFilterBase));
exports.XyLinearTrendFilter = XyLinearTrendFilter;
