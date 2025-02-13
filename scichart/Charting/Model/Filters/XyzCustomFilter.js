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
exports.XyzCustomFilter = void 0;
var XyzFilterBase_1 = require("./XyzFilterBase");
var XyzCustomFilter = /** @class */ (function (_super) {
    __extends(XyzCustomFilter, _super);
    function XyzCustomFilter(originalSeries, options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, originalSeries, options) || this;
        _this.filterFunctionProperty = (_a = options === null || options === void 0 ? void 0 : options.filterFunction) !== null && _a !== void 0 ? _a : _this.filterFunctionProperty;
        _this.zfilterFunctionProperty = (_b = options === null || options === void 0 ? void 0 : options.zfilterFunction) !== null && _b !== void 0 ? _b : _this.filterFunctionProperty;
        if (_this.getOriginalCount() > 0 && ((options === null || options === void 0 ? void 0 : options.filterFunction) || (options === null || options === void 0 ? void 0 : options.zfilterFunction))) {
            _this.filterAll();
        }
        return _this;
    }
    Object.defineProperty(XyzCustomFilter.prototype, "filterFunction", {
        get: function () {
            return this.filterFunctionProperty;
        },
        set: function (ff) {
            this.filterFunctionProperty = ff;
            this.filterAll();
        },
        enumerable: false,
        configurable: true
    });
    XyzCustomFilter.prototype.filterFunctionProperty = function (index, y) {
        return y;
    };
    Object.defineProperty(XyzCustomFilter.prototype, "zfilterFunction", {
        get: function () {
            return this.zfilterFunctionProperty;
        },
        set: function (ff) {
            this.zfilterFunctionProperty = ff;
            this.filterAll();
        },
        enumerable: false,
        configurable: true
    });
    XyzCustomFilter.prototype.zfilterFunctionProperty = function (index, y) {
        return y;
    };
    XyzCustomFilter.prototype.filterOnAppend = function (count) {
        var _a = this.filter(this.count(), count), xValues = _a.xValues, yValues = _a.yValues, zValues = _a.zValues, metadata = _a.metadata;
        this.appendRange(xValues, yValues, zValues, metadata);
    };
    XyzCustomFilter.prototype.filterOnUpdate = function (index) {
        this.update(index, this.filterFunction(index, this.getOriginalYValues().get(index)), this.zfilterFunction(index, this.getOriginalZValues().get(index)), this.originalSeries.getMetadataAt(index));
    };
    XyzCustomFilter.prototype.filterOnInsert = function (startIndex, count) {
        var _a = this.filter(startIndex, count), xValues = _a.xValues, yValues = _a.yValues, zValues = _a.zValues, metadata = _a.metadata;
        this.insertRange(startIndex, xValues, yValues, zValues, metadata);
    };
    XyzCustomFilter.prototype.filterOnRemove = function (startIndex, count) {
        this.removeRange(startIndex, count);
    };
    XyzCustomFilter.prototype.filterAll = function () {
        this.clear();
        var _a = this.filter(0, this.getOriginalCount()), xValues = _a.xValues, yValues = _a.yValues, zValues = _a.zValues, metadata = _a.metadata;
        this.appendRange(xValues, yValues, zValues, metadata);
    };
    XyzCustomFilter.prototype.filter = function (startIndex, count) {
        var rawX = this.getOriginalXValues();
        var rawY = this.getOriginalYValues();
        var rawZ = this.getOriginalZValues();
        var xValues = [];
        var yValues = [];
        var zValues = [];
        var metadata = undefined;
        // leave metadata unset if if original series has no metadata
        if (this.originalSeries.hasMetadata) {
            metadata = [];
            for (var i = startIndex; i < startIndex + count; i++) {
                xValues.push(rawX.get(i));
                yValues.push(this.filterFunction(i, rawY.get(i)));
                zValues.push(this.zfilterFunction(i, rawZ.get(i)));
                metadata.push(this.originalSeries.getMetadataAt(i));
            }
        }
        else {
            for (var i = startIndex; i < startIndex + count; i++) {
                xValues.push(rawX.get(i));
                yValues.push(this.filterFunction(i, rawY.get(i)));
                zValues.push(this.zfilterFunction(i, rawZ.get(i)));
            }
        }
        return { xValues: xValues, yValues: yValues, zValues: zValues, metadata: metadata };
    };
    return XyzCustomFilter;
}(XyzFilterBase_1.XyzFilterBase));
exports.XyzCustomFilter = XyzCustomFilter;
