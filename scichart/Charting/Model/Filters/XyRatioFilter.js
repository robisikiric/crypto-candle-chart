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
exports.XyRatioFilter = void 0;
var Guard_1 = require("../../../Core/Guard");
var DataFilterType_1 = require("../../../types/DataFilterType");
var IDataSeries_1 = require("../IDataSeries");
var XyFilterBase_1 = require("./XyFilterBase");
/**
 * An XyDataSeries where each point is the ratio of the original series and the given divisorSeries
 */
var XyRatioFilter = /** @class */ (function (_super) {
    __extends(XyRatioFilter, _super);
    function XyRatioFilter(originalSeries, options) {
        var _this = this;
        var _a;
        _this = _super.call(this, originalSeries, options) || this;
        _this.divisorField = XyFilterBase_1.EDataSeriesField.Y;
        Guard_1.Guard.notNull(options.divisorSeries, "divisorSeries");
        _this.divisorSeries = options.divisorSeries;
        _this.divisorField = (_a = options.divisorField) !== null && _a !== void 0 ? _a : _this.divisorField;
        _this.onDivisorDataChanged = _this.onDivisorDataChanged.bind(_this);
        _this.divisorSeries.dataChanged.subscribe(_this.onDivisorDataChanged);
        if (_this.getOriginalCount() > 0) {
            _this.filterAll();
        }
        return _this;
    }
    // @ts-ignore
    XyRatioFilter.prototype.toJSON = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var original = this.originalSeries.toJSON(excludeData);
        var divisorValues = [];
        var divisorRaw = this.getDivisorYValues();
        for (var i = 0; i < this.divisorSeries.count(); i++) {
            divisorValues.push(divisorRaw.get(i));
        }
        return __assign(__assign({}, original), { filter: {
                type: DataFilterType_1.EDataFilterType.XyRatio,
                options: { field: this.field, divisorSeries: divisorValues }
            } });
    };
    XyRatioFilter.prototype.filterOnAppend = function (count) {
        // Don't filter unless both series are the same length.
        if (this.getOriginalCount() !== this.divisorSeries.count()) {
            return;
        }
        var _a = this.filter(this.count(), count), xValues = _a.xValues, yValues = _a.yValues;
        this.appendRange(xValues, yValues);
    };
    XyRatioFilter.prototype.filterOnUpdate = function (index) {
        this.update(index, this.getOriginalYValues().get(index) / this.getDivisorYValues().get(index));
    };
    XyRatioFilter.prototype.filterOnInsert = function (startIndex, count) {
        if (this.getOriginalCount() !== this.divisorSeries.count()) {
            return;
        }
        var _a = this.filter(startIndex, count), xValues = _a.xValues, yValues = _a.yValues;
        this.insertRange(startIndex, xValues, yValues);
    };
    XyRatioFilter.prototype.filterOnRemove = function (startIndex, count) {
        if (this.getOriginalCount() !== this.divisorSeries.count()) {
            return;
        }
        this.removeRange(startIndex, count);
    };
    XyRatioFilter.prototype.filterAll = function () {
        if (this.getOriginalCount() !== this.divisorSeries.count()) {
            return;
        }
        this.clear();
        var _a = this.filter(0, this.getOriginalCount()), xValues = _a.xValues, yValues = _a.yValues;
        this.appendRange(xValues, yValues);
    };
    XyRatioFilter.prototype.filter = function (startIndex, count) {
        var rawX = this.getOriginalXValues();
        var rawY = this.getOriginalYValues();
        var xValues = [];
        var yValues = [];
        // TODO check if metadata is needed here
        for (var i = startIndex; i < startIndex + count; i++) {
            xValues.push(rawX.get(i));
            yValues.push(rawY.get(i) / this.getDivisorYValues().get(i));
        }
        return { xValues: xValues, yValues: yValues };
    };
    XyRatioFilter.prototype.getDivisorYValues = function () {
        var divY = this.divisorSeries.getNativeYValues();
        if (this.divisorSeries.type === IDataSeries_1.EDataSeriesType.Xyy) {
            var xyySeries = this.divisorSeries;
            divY = (0, XyFilterBase_1.switchData)(this.divisorField, xyySeries.getNativeYValues(), xyySeries.getNativeY1Values());
        }
        else if (this.divisorSeries.type === IDataSeries_1.EDataSeriesType.Xyz) {
            var xyzSeries = this.divisorSeries;
            divY = (0, XyFilterBase_1.switchData)(this.field, xyzSeries.getNativeYValues(), xyzSeries.getNativeZValues());
        }
        else if (this.divisorSeries.type === IDataSeries_1.EDataSeriesType.Ohlc) {
            var ohlcSeries = this.divisorSeries;
            divY = (0, XyFilterBase_1.switchData)(this.field, ohlcSeries.getNativeYValues(), ohlcSeries.getNativeOpenValues(), ohlcSeries.getNativeHighValues(), ohlcSeries.getNativeLowValues());
        }
        return divY;
    };
    XyRatioFilter.prototype.onDivisorDataChanged = function (args) {
        var changeType = args.changeType, name = args.name, index = args.index, count = args.count;
        switch (changeType) {
            case IDataSeries_1.EDataChangeType.Append:
                this.filterOnAppend(count);
                break;
            case IDataSeries_1.EDataChangeType.Clear:
                this.onClear();
                break;
            case IDataSeries_1.EDataChangeType.Insert:
                this.filterOnInsert(index, count);
                break;
            case IDataSeries_1.EDataChangeType.Remove:
                this.filterOnRemove(index, count);
                break;
            case IDataSeries_1.EDataChangeType.Update:
                this.filterOnUpdate(index);
                break;
            default:
                break;
        }
    };
    return XyRatioFilter;
}(XyFilterBase_1.XyFilterBase));
exports.XyRatioFilter = XyRatioFilter;
