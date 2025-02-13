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
exports.XyCustomFilter = void 0;
var XyFilterBase_1 = require("./XyFilterBase");
/**
 * An XyDataSeries where an arbitrary function is applied to each y value on the original series.
 * eg const filterAboveZero = new XyCustomFilter(originalSeries);
 * filterAboveZero.filterFunction = (index: number, y: number) => y > 0 ? y : NaN;
 * If you want to be able to refer to the original series, use a normal function, rather than an arrow function,
 * so that 'this' will refer to the filter.
 * eg const addPreviousFilter = new XyCustomFilter(originalSeries);
 * addPreviousFilter.filterFunction = function(index: number, y: number) {
 *      const prev = this.getOriginalYValues().get(index);
 *      return prev + y;
 * };
 */
var XyCustomFilter = /** @class */ (function (_super) {
    __extends(XyCustomFilter, _super);
    function XyCustomFilter(originalSeries, options) {
        var _this = this;
        var _a;
        _this = _super.call(this, originalSeries, options) || this;
        _this.filterFunctionProperty = (_a = options === null || options === void 0 ? void 0 : options.filterFunction) !== null && _a !== void 0 ? _a : _this.filterFunctionProperty;
        if (_this.getOriginalCount() > 0 && (options === null || options === void 0 ? void 0 : options.filterFunction)) {
            _this.filterAll();
        }
        return _this;
    }
    Object.defineProperty(XyCustomFilter.prototype, "filterFunction", {
        /** Gets or sets the filter function to be used by this filter */
        get: function () {
            return this.filterFunctionProperty;
        },
        /** Gets or sets the filter function to be used by this filter */
        set: function (ff) {
            this.filterFunctionProperty = ff;
            this.filterAll();
        },
        enumerable: false,
        configurable: true
    });
    XyCustomFilter.prototype.filterFunctionProperty = function (index, y) {
        return y;
    };
    XyCustomFilter.prototype.filterOnAppend = function (count) {
        var _a = this.filter(this.count(), count), xValues = _a.xValues, yValues = _a.yValues, metadata = _a.metadata;
        this.appendRange(xValues, yValues, metadata);
    };
    XyCustomFilter.prototype.filterOnUpdate = function (index) {
        this.update(index, this.filterFunction(index, this.getOriginalYValues().get(index)), this.originalSeries.getMetadataAt(index));
    };
    XyCustomFilter.prototype.filterOnInsert = function (startIndex, count) {
        var _a = this.filter(startIndex, count), xValues = _a.xValues, yValues = _a.yValues, metadata = _a.metadata;
        this.insertRange(startIndex, xValues, yValues, metadata);
    };
    XyCustomFilter.prototype.filterOnRemove = function (startIndex, count) {
        this.removeRange(startIndex, count);
    };
    XyCustomFilter.prototype.filterAll = function () {
        this.clear();
        var _a = this.filter(0, this.getOriginalCount()), xValues = _a.xValues, yValues = _a.yValues, metadata = _a.metadata;
        this.appendRange(xValues, yValues, metadata);
    };
    XyCustomFilter.prototype.filter = function (startIndex, count) {
        var rawX = this.getOriginalXValues();
        var rawY = this.getOriginalYValues();
        var xValues = [];
        var yValues = [];
        var metadata = undefined;
        // leave metadata unset if if original series has no metadata
        if (this.originalSeries.hasMetadata) {
            metadata = [];
            for (var i = startIndex; i < startIndex + count; i++) {
                xValues.push(rawX.get(i));
                yValues.push(this.filterFunction(i, rawY.get(i)));
                metadata.push(this.originalSeries.getMetadataAt(i));
            }
        }
        else {
            for (var i = startIndex; i < startIndex + count; i++) {
                xValues.push(rawX.get(i));
                yValues.push(this.filterFunction(i, rawY.get(i)));
            }
        }
        return { xValues: xValues, yValues: yValues, metadata: metadata };
    };
    return XyCustomFilter;
}(XyFilterBase_1.XyFilterBase));
exports.XyCustomFilter = XyCustomFilter;
