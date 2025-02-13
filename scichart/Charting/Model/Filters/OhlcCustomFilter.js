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
exports.OhlcCustomFilter = void 0;
var IDataSeries_1 = require("../IDataSeries");
var OhlcFilterBase_1 = require("./OhlcFilterBase");
var OhlcCustomFilter = /** @class */ (function (_super) {
    __extends(OhlcCustomFilter, _super);
    function OhlcCustomFilter(originalSeries, options) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this, originalSeries, options) || this;
        if (originalSeries.type !== IDataSeries_1.EDataSeriesType.Ohlc) {
            throw new Error("OhlcCustomFilter only supports Ohlc original series");
        }
        _this.closefilterFunctionProperty = (_a = options === null || options === void 0 ? void 0 : options.closefilterFunction) !== null && _a !== void 0 ? _a : _this.closefilterFunctionProperty;
        _this.openfilterFunctionProperty = (_b = options === null || options === void 0 ? void 0 : options.openfilterFunction) !== null && _b !== void 0 ? _b : _this.closefilterFunction;
        _this.highfilterFunctionProperty = (_c = options === null || options === void 0 ? void 0 : options.highfilterFunction) !== null && _c !== void 0 ? _c : _this.closefilterFunction;
        _this.lowfilterFunctionProperty = (_d = options === null || options === void 0 ? void 0 : options.lowfilterFunction) !== null && _d !== void 0 ? _d : _this.closefilterFunction;
        if (_this.getOriginalCount() > 0 &&
            ((options === null || options === void 0 ? void 0 : options.closefilterFunction) ||
                (options === null || options === void 0 ? void 0 : options.openfilterFunction) ||
                (options === null || options === void 0 ? void 0 : options.highfilterFunction) ||
                (options === null || options === void 0 ? void 0 : options.lowfilterFunction))) {
            _this.filterAll();
        }
        return _this;
    }
    Object.defineProperty(OhlcCustomFilter.prototype, "closefilterFunction", {
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
    Object.defineProperty(OhlcCustomFilter.prototype, "openfilterFunction", {
        get: function () {
            return this.openfilterFunctionProperty;
        },
        set: function (ff) {
            this.openfilterFunctionProperty = ff;
            this.filterAll();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OhlcCustomFilter.prototype, "highfilterFunction", {
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
    Object.defineProperty(OhlcCustomFilter.prototype, "lowfilterFunction", {
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
    OhlcCustomFilter.prototype.openfilterFunctionProperty = function (index, y) {
        return y;
    };
    OhlcCustomFilter.prototype.highfilterFunctionProperty = function (index, y) {
        return y;
    };
    OhlcCustomFilter.prototype.lowfilterFunctionProperty = function (index, y) {
        return y;
    };
    OhlcCustomFilter.prototype.closefilterFunctionProperty = function (index, y) {
        return y;
    };
    OhlcCustomFilter.prototype.filterOnAppend = function (count) {
        var _a = this.filter(this.count(), count), xValues = _a.xValues, openValues = _a.openValues, highValues = _a.highValues, lowValues = _a.lowValues, closeValues = _a.closeValues, metadata = _a.metadata;
        this.appendRange(xValues, openValues, highValues, lowValues, closeValues, metadata);
    };
    OhlcCustomFilter.prototype.filterOnUpdate = function (index) {
        var ohlcSeries = this.originalSeries;
        this.update(index, this.openfilterFunction(index, ohlcSeries.getNativeOpenValues().get(index)), this.highfilterFunction(index, ohlcSeries.getNativeHighValues().get(index)), this.lowfilterFunction(index, ohlcSeries.getNativeLowValues().get(index)), this.closefilterFunction(index, ohlcSeries.getNativeCloseValues().get(index)), this.originalSeries.getMetadataAt(index));
    };
    OhlcCustomFilter.prototype.filterOnInsert = function (startIndex, count) {
        var _a = this.filter(startIndex, count), xValues = _a.xValues, openValues = _a.openValues, highValues = _a.highValues, lowValues = _a.lowValues, closeValues = _a.closeValues, metadata = _a.metadata;
        this.insertRange(startIndex, xValues, openValues, highValues, lowValues, closeValues, metadata);
    };
    OhlcCustomFilter.prototype.filterOnRemove = function (startIndex, count) {
        this.removeRange(startIndex, count);
    };
    OhlcCustomFilter.prototype.filterAll = function () {
        this.clear();
        var _a = this.filter(0, this.getOriginalCount()), xValues = _a.xValues, openValues = _a.openValues, highValues = _a.highValues, lowValues = _a.lowValues, closeValues = _a.closeValues, metadata = _a.metadata;
        this.appendRange(xValues, openValues, highValues, lowValues, closeValues, metadata);
    };
    OhlcCustomFilter.prototype.filter = function (startIndex, count) {
        var rawX = this.getOriginalXValues();
        var ohlcSeries = this.originalSeries;
        var xValues = [];
        var openValues = [];
        var highValues = [];
        var lowValues = [];
        var closeValues = [];
        var metadata = undefined;
        if (this.originalSeries.hasMetadata) {
            metadata = [];
            for (var i = startIndex; i < startIndex + count; i++) {
                xValues.push(rawX.get(i));
                openValues.push(this.openfilterFunction(i, ohlcSeries.getNativeOpenValues().get(i)));
                highValues.push(this.highfilterFunction(i, ohlcSeries.getNativeHighValues().get(i)));
                lowValues.push(this.lowfilterFunction(i, ohlcSeries.getNativeLowValues().get(i)));
                closeValues.push(this.closefilterFunction(i, ohlcSeries.getNativeCloseValues().get(i)));
                metadata.push(this.originalSeries.getMetadataAt(i));
            }
        }
        else {
            for (var i = startIndex; i < startIndex + count; i++) {
                xValues.push(rawX.get(i));
                openValues.push(this.openfilterFunction(i, ohlcSeries.getNativeOpenValues().get(i)));
                highValues.push(this.highfilterFunction(i, ohlcSeries.getNativeHighValues().get(i)));
                lowValues.push(this.lowfilterFunction(i, ohlcSeries.getNativeLowValues().get(i)));
                closeValues.push(this.closefilterFunction(i, ohlcSeries.getNativeCloseValues().get(i)));
            }
        }
        return { xValues: xValues, openValues: openValues, highValues: highValues, lowValues: lowValues, closeValues: closeValues, metadata: metadata };
    };
    return OhlcCustomFilter;
}(OhlcFilterBase_1.OhlcFilterBase));
exports.OhlcCustomFilter = OhlcCustomFilter;
