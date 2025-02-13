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
exports.XyyCustomFilter = void 0;
var XyyFilterBase_1 = require("./XyyFilterBase");
var XyyCustomFilter = /** @class */ (function (_super) {
    __extends(XyyCustomFilter, _super);
    function XyyCustomFilter(originalSeries, options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, originalSeries, options) || this;
        _this.filterFunctionProperty = (_a = options === null || options === void 0 ? void 0 : options.filterFunction) !== null && _a !== void 0 ? _a : _this.filterFunctionProperty;
        _this.y1filterFunctionProperty = (_b = options === null || options === void 0 ? void 0 : options.y1filterFunction) !== null && _b !== void 0 ? _b : _this.filterFunctionProperty;
        if (_this.getOriginalCount() > 0 && ((options === null || options === void 0 ? void 0 : options.filterFunction) || (options === null || options === void 0 ? void 0 : options.y1filterFunction))) {
            _this.filterAll();
        }
        return _this;
    }
    Object.defineProperty(XyyCustomFilter.prototype, "filterFunction", {
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
    XyyCustomFilter.prototype.filterFunctionProperty = function (index, y) {
        return y;
    };
    Object.defineProperty(XyyCustomFilter.prototype, "y1filterFunction", {
        get: function () {
            return this.y1filterFunctionProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(XyyCustomFilter.prototype, "y1yfilterFunction", {
        set: function (ff) {
            this.y1filterFunctionProperty = ff;
            this.filterAll();
        },
        enumerable: false,
        configurable: true
    });
    XyyCustomFilter.prototype.y1filterFunctionProperty = function (index, y1) {
        return y1;
    };
    XyyCustomFilter.prototype.filterOnAppend = function (count) {
        var _a = this.filter(this.count(), count), xValues = _a.xValues, yValues = _a.yValues, y1Values = _a.y1Values, metadata = _a.metadata;
        this.appendRange(xValues, yValues, y1Values, metadata);
    };
    XyyCustomFilter.prototype.filterOnUpdate = function (index) {
        this.update(index, this.filterFunction(index, this.getOriginalYValues().get(index)), this.y1filterFunction(index, this.getOriginalY1Values().get(index)), this.originalSeries.getMetadataAt(index));
    };
    XyyCustomFilter.prototype.filterOnInsert = function (startIndex, count) {
        var _a = this.filter(startIndex, count), xValues = _a.xValues, yValues = _a.yValues, y1Values = _a.y1Values, metadata = _a.metadata;
        this.insertRange(startIndex, xValues, yValues, y1Values, metadata);
    };
    XyyCustomFilter.prototype.filterOnRemove = function (startIndex, count) {
        this.removeRange(startIndex, count);
    };
    XyyCustomFilter.prototype.filterAll = function () {
        this.clear();
        var _a = this.filter(0, this.getOriginalCount()), xValues = _a.xValues, yValues = _a.yValues, y1Values = _a.y1Values, metadata = _a.metadata;
        this.appendRange(xValues, yValues, y1Values, metadata);
    };
    XyyCustomFilter.prototype.filter = function (startIndex, count) {
        var rawX = this.getOriginalXValues();
        var rawY = this.getOriginalYValues();
        var rawY1 = this.getOriginalY1Values();
        var xValues = [];
        var yValues = [];
        var y1Values = [];
        var metadata = undefined;
        // leave metadata unset if if original series has no metadata
        if (this.originalSeries.hasMetadata) {
            metadata = [];
            for (var i = startIndex; i < startIndex + count; i++) {
                xValues.push(rawX.get(i));
                yValues.push(this.filterFunction(i, rawY.get(i)));
                y1Values.push(this.y1filterFunction(i, rawY1.get(i)));
                metadata.push(this.originalSeries.getMetadataAt(i));
            }
        }
        else {
            for (var i = startIndex; i < startIndex + count; i++) {
                xValues.push(rawX.get(i));
                yValues.push(this.filterFunction(i, rawY.get(i)));
                y1Values.push(this.y1filterFunction(i, rawY1.get(i)));
            }
        }
        return { xValues: xValues, yValues: yValues, y1Values: y1Values, metadata: metadata };
    };
    return XyyCustomFilter;
}(XyyFilterBase_1.XyyFilterBase));
exports.XyyCustomFilter = XyyCustomFilter;
