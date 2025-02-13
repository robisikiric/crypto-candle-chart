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
exports.XyMovingAverageFilter = void 0;
var DataFilterType_1 = require("../../../types/DataFilterType");
var XyFilterBase_1 = require("./XyFilterBase");
/**
 * An XyDataSeries that is the moving average of the original series
 */
var XyMovingAverageFilter = /** @class */ (function (_super) {
    __extends(XyMovingAverageFilter, _super);
    function XyMovingAverageFilter(originalSeries, options) {
        var _this = this;
        var _a;
        _this = _super.call(this, originalSeries, options) || this;
        _this.lengthProperty = 30;
        // Buffer to store the data for the latest average
        _this.buffer = [];
        // pointer to the latest position in the buffer
        _this.pointer = -1;
        _this.bufferTotal = 0;
        _this.lengthProperty = (_a = options === null || options === void 0 ? void 0 : options.length) !== null && _a !== void 0 ? _a : _this.lengthProperty;
        if (!originalSeries.dataDistributionCalculator.isSortedAscending) {
            throw new Error("XyMovingAverageFilter requires original data to be sorted in X");
        }
        if (_this.getOriginalCount() > 0) {
            _this.calculate(0);
        }
        return _this;
    }
    Object.defineProperty(XyMovingAverageFilter.prototype, "length", {
        /**
         * Gets or Sets the length of the moving average
         */
        get: function () {
            return this.lengthProperty;
        },
        /**
         * Gets or Sets the length of the moving average
         */
        set: function (value) {
            this.lengthProperty = value;
            this.calculate(0);
        },
        enumerable: false,
        configurable: true
    });
    // @ts-ignore
    XyMovingAverageFilter.prototype.toJSON = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var original = this.originalSeries.toJSON(excludeData);
        return __assign(__assign({}, original), { filter: {
                type: DataFilterType_1.EDataFilterType.XyMovingAverage,
                options: { field: this.field, length: this.length }
            } });
    };
    XyMovingAverageFilter.prototype.onOriginalPropertyChanged = function (name) { };
    XyMovingAverageFilter.prototype.filterOnAppend = function (count) {
        this.calculate(this.count());
    };
    XyMovingAverageFilter.prototype.filterOnUpdate = function (index) {
        var y = this.getOriginalYValues().get(index) || 0;
        this.calculateUpdate(index, y);
    };
    XyMovingAverageFilter.prototype.filterOnInsert = function (startIndex, count) {
        this.calculate(startIndex);
    };
    XyMovingAverageFilter.prototype.filterOnRemove = function (startIndex, count) {
        this.calculate(startIndex);
    };
    XyMovingAverageFilter.prototype.filterAll = function () {
        this.calculate(0);
    };
    XyMovingAverageFilter.prototype.calculateUpdate = function (index, y) {
        if (index < this.count() - 1) {
            this.calculate(index);
        }
        else {
            // Just update latest
            var oldY = this.buffer[this.pointer];
            this.bufferTotal = this.bufferTotal - oldY + y;
            this.buffer[this.pointer] = y;
            this.update(index, this.bufferTotal / this.length);
        }
    };
    XyMovingAverageFilter.prototype.calculate = function (start) {
        var originalStart = start;
        if (start < this.count()) {
            if (start === 0) {
                this.clear();
            }
            else {
                this.removeRange(start, this.count() - start);
            }
            start = Math.max(0, start - this.length + 1);
            this.buffer = [];
            this.pointer = -1;
            this.bufferTotal = 0;
        }
        var rawX = this.getOriginalXValues();
        var rawY = this.getOriginalYValues();
        var length = Math.min(this.length, this.getOriginalCount());
        for (var i = start; i < this.getOriginalCount(); i++) {
            var x = rawX.get(i) || 0;
            var y = rawY.get(i) || 0;
            this.pointer = (this.pointer + 1) % this.length;
            var oldY = this.buffer[this.pointer];
            this.buffer[this.pointer] = y;
            this.bufferTotal = this.bufferTotal + y - (oldY !== null && oldY !== void 0 ? oldY : 0);
            if (this.buffer.length === this.length) {
                this.append(x, this.bufferTotal / this.length);
            }
            else if (originalStart < this.length) {
                this.append(x, NaN);
            }
        }
    };
    return XyMovingAverageFilter;
}(XyFilterBase_1.XyFilterBase));
exports.XyMovingAverageFilter = XyMovingAverageFilter;
