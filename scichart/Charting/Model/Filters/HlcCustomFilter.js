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
exports.HlcCustomFilter = void 0;
var IDataSeries_1 = require("../IDataSeries");
var HlcFilterBase_1 = require("./HlcFilterBase");
var HlcCustomFilter = /** @class */ (function (_super) {
    __extends(HlcCustomFilter, _super);
    function HlcCustomFilter(originalSeries, options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, originalSeries, options) || this;
        if (originalSeries.type !== IDataSeries_1.EDataSeriesType.Hlc) {
            throw new Error("HlcCustomFilter only supports Hlc original series");
        }
        _this.closefilterFunctionProperty = (_a = options === null || options === void 0 ? void 0 : options.closefilterFunction) !== null && _a !== void 0 ? _a : _this.closefilterFunctionProperty;
        _this.highfilterFunctionProperty = (_b = options === null || options === void 0 ? void 0 : options.highfilterFunction) !== null && _b !== void 0 ? _b : _this.closefilterFunction;
        _this.lowfilterFunctionProperty = (_c = options === null || options === void 0 ? void 0 : options.lowfilterFunction) !== null && _c !== void 0 ? _c : _this.closefilterFunction;
        if (_this.getOriginalCount() > 0 &&
            ((options === null || options === void 0 ? void 0 : options.closefilterFunction) || (options === null || options === void 0 ? void 0 : options.highfilterFunction) || (options === null || options === void 0 ? void 0 : options.lowfilterFunction))) {
            _this.filterAll();
        }
        return _this;
    }
    Object.defineProperty(HlcCustomFilter.prototype, "closefilterFunction", {
        get: function () {
            return this.closefilterFunctionProperty;
        },
        set: function (ff) {
            this.closefilterFunctionProperty = ff;
            this.filterAll();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HlcCustomFilter.prototype, "highfilterFunction", {
        get: function () {
            return this.highfilterFunctionProperty;
        },
        set: function (ff) {
            this.highfilterFunctionProperty = ff;
            this.filterAll();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HlcCustomFilter.prototype, "lowfilterFunction", {
        get: function () {
            return this.lowfilterFunctionProperty;
        },
        set: function (ff) {
            this.lowfilterFunctionProperty = ff;
            this.filterAll();
        },
        enumerable: false,
        configurable: true
    });
    HlcCustomFilter.prototype.highfilterFunctionProperty = function (index, y) {
        return y;
    };
    HlcCustomFilter.prototype.lowfilterFunctionProperty = function (index, y) {
        return y;
    };
    HlcCustomFilter.prototype.closefilterFunctionProperty = function (index, y) {
        return y;
    };
    HlcCustomFilter.prototype.filterOnAppend = function (count) {
        var _a = this.filter(this.count(), count), xValues = _a.xValues, highValues = _a.highValues, lowValues = _a.lowValues, closeValues = _a.closeValues, metadata = _a.metadata;
        this.appendRange(xValues, closeValues, highValues, lowValues, metadata);
    };
    HlcCustomFilter.prototype.filterOnUpdate = function (index) {
        var hlcSeries = this.originalSeries;
        this.update(index, this.highfilterFunction(index, hlcSeries.getNativeHighValues().get(index)), this.lowfilterFunction(index, hlcSeries.getNativeLowValues().get(index)), this.closefilterFunction(index, hlcSeries.getNativeYValues().get(index)), this.originalSeries.getMetadataAt(index));
    };
    HlcCustomFilter.prototype.filterOnInsert = function (startIndex, count) {
        var _a = this.filter(startIndex, count), xValues = _a.xValues, highValues = _a.highValues, lowValues = _a.lowValues, closeValues = _a.closeValues, metadata = _a.metadata;
        this.insertRange(startIndex, xValues, closeValues, highValues, lowValues, metadata);
    };
    HlcCustomFilter.prototype.filterOnRemove = function (startIndex, count) {
        this.removeRange(startIndex, count);
    };
    HlcCustomFilter.prototype.filterAll = function () {
        this.clear();
        var _a = this.filter(0, this.getOriginalCount()), xValues = _a.xValues, highValues = _a.highValues, lowValues = _a.lowValues, closeValues = _a.closeValues, metadata = _a.metadata;
        this.appendRange(xValues, closeValues, highValues, lowValues, metadata);
    };
    HlcCustomFilter.prototype.filter = function (startIndex, count) {
        var rawX = this.getOriginalXValues();
        var rawClose = this.getOriginalYValues();
        var rawHigh = this.getOriginalHighValues();
        var rawLow = this.getOriginalLowValues();
        var xValues = [];
        var highValues = [];
        var lowValues = [];
        var closeValues = [];
        var metadata = undefined;
        // leave metadata unset if if original series has no metadata
        if (this.originalSeries.hasMetadata) {
            metadata = [];
            for (var i = startIndex; i < startIndex + count; i++) {
                xValues.push(rawX.get(i));
                highValues.push(this.highfilterFunction(i, rawHigh.get(i)));
                lowValues.push(this.lowfilterFunction(i, rawLow.get(i)));
                closeValues.push(this.closefilterFunction(i, rawClose.get(i)));
                metadata.push(this.originalSeries.getMetadataAt(i));
            }
        }
        else {
            for (var i = startIndex; i < startIndex + count; i++) {
                xValues.push(rawX.get(i));
                highValues.push(this.highfilterFunction(i, rawHigh.get(i)));
                lowValues.push(this.lowfilterFunction(i, rawLow.get(i)));
                closeValues.push(this.closefilterFunction(i, rawClose.get(i)));
            }
        }
        return { xValues: xValues, highValues: highValues, lowValues: lowValues, closeValues: closeValues, metadata: metadata };
    };
    return HlcCustomFilter;
}(HlcFilterBase_1.HlcFilterBase));
exports.HlcCustomFilter = HlcCustomFilter;
