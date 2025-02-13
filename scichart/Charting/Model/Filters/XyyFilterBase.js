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
exports.XyyFilterBase = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var IDataSeries_1 = require("../IDataSeries");
var XyyDataSeries_1 = require("../XyyDataSeries");
var XyFilterBase_1 = require("./XyFilterBase");
var XyyFilterBase = /** @class */ (function (_super) {
    __extends(XyyFilterBase, _super);
    function XyyFilterBase(originalSeries, options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, originalSeries.webAssemblyContext, options) || this;
        _this.yfield = XyFilterBase_1.EDataSeriesField.Y;
        _this.y1field = XyFilterBase_1.EDataSeriesField.Y1;
        _this.originalSeriesProperty = originalSeries;
        _this.yfield = (_a = options === null || options === void 0 ? void 0 : options.yfield) !== null && _a !== void 0 ? _a : _this.yfield;
        _this.yfield = (_b = options === null || options === void 0 ? void 0 : options.yfield) !== null && _b !== void 0 ? _b : _this.yfield;
        _this.onBaseDataChanged = _this.onBaseDataChanged.bind(_this);
        originalSeries.dataChanged.subscribe(_this.onBaseDataChanged);
        switch (_this.originalSeries.type) {
            case IDataSeries_1.EDataSeriesType.Ohlc:
                var ohlcSeries_1 = _this.originalSeries;
                _this.getOriginalYValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.yfield, ohlcSeries_1.getNativeYValues(), ohlcSeries_1.getNativeOpenValues(), ohlcSeries_1.getNativeHighValues(), ohlcSeries_1.getNativeLowValues());
                };
                _this.getOriginalY1Values = function () {
                    return (0, XyFilterBase_1.switchData)(_this.y1field, ohlcSeries_1.getNativeYValues(), ohlcSeries_1.getNativeOpenValues(), ohlcSeries_1.getNativeHighValues(), ohlcSeries_1.getNativeLowValues());
                };
                break;
            case IDataSeries_1.EDataSeriesType.Xy:
                var xySeries_1 = _this.originalSeries;
                _this.getOriginalYValues = function () { return xySeries_1.getNativeYValues(); };
                _this.getOriginalY1Values = function () { return xySeries_1.getNativeYValues(); };
                break;
            case IDataSeries_1.EDataSeriesType.Xyz:
                var xyzSeries_1 = _this.originalSeries;
                _this.getOriginalYValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.yfield, xyzSeries_1.getNativeYValues(), xyzSeries_1.getNativeZValues());
                };
                _this.getOriginalY1Values = function () {
                    return (0, XyFilterBase_1.switchData)(_this.y1field, xyzSeries_1.getNativeYValues(), xyzSeries_1.getNativeZValues());
                };
                break;
            case IDataSeries_1.EDataSeriesType.Hlc:
                var hlcSeries_1 = _this.originalSeries;
                _this.getOriginalYValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.yfield, hlcSeries_1.getNativeYValues(), undefined, hlcSeries_1.getNativeHighValues(), hlcSeries_1.getNativeLowValues());
                };
                _this.getOriginalY1Values = function () {
                    return (0, XyFilterBase_1.switchData)(_this.y1field, hlcSeries_1.getNativeYValues(), undefined, hlcSeries_1.getNativeHighValues(), hlcSeries_1.getNativeLowValues());
                };
                break;
            default:
                break;
        }
        return _this;
    }
    Object.defineProperty(XyyFilterBase.prototype, "originalSeries", {
        get: function () {
            return this.originalSeriesProperty;
        },
        enumerable: false,
        configurable: true
    });
    XyyFilterBase.prototype.detachFromOriginalSeries = function () {
        this.originalSeries.dataChanged.unsubscribe(this.onBaseDataChanged);
        this.originalSeriesProperty = undefined;
    };
    XyyFilterBase.prototype.delete = function () {
        this.originalSeriesProperty = (0, Deleter_1.deleteSafe)(this.originalSeries);
        _super.prototype.delete.call(this);
    };
    XyyFilterBase.prototype.getOriginalXValues = function () {
        return this.originalSeries.getNativeXValues();
    };
    XyyFilterBase.prototype.getOriginalYValues = function () {
        return this.originalSeries.getNativeYValues();
    };
    XyyFilterBase.prototype.getOriginalY1Values = function () {
        return this.originalSeries.getNativeY1Values();
    };
    XyyFilterBase.prototype.getOriginalCount = function () {
        return this.originalSeries.count();
    };
    XyyFilterBase.prototype.onOriginalPropertyChanged = function (name) { };
    XyyFilterBase.prototype.filterOnAppend = function (count) {
        this.filterAll();
    };
    XyyFilterBase.prototype.filterOnUpdate = function (index) {
        this.filterAll();
    };
    XyyFilterBase.prototype.filterOnInsert = function (startIndex, count) {
        this.filterAll();
    };
    XyyFilterBase.prototype.filterOnRemove = function (startIndex, count) {
        this.filterAll();
    };
    XyyFilterBase.prototype.onClear = function () {
        this.clear();
    };
    XyyFilterBase.prototype.onBaseDataChanged = function (args) {
        var changeType = args.changeType, name = args.name, index = args.index, count = args.count;
        switch (changeType) {
            case IDataSeries_1.EDataChangeType.Property:
                this.onOriginalPropertyChanged(name);
                return;
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
    return XyyFilterBase;
}(XyyDataSeries_1.XyyDataSeries));
exports.XyyFilterBase = XyyFilterBase;
