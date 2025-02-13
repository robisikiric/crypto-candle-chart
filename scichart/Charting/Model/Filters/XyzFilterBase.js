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
exports.XyzFilterBase = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var IDataSeries_1 = require("../IDataSeries");
var XyzDataSeries_1 = require("../XyzDataSeries");
var XyFilterBase_1 = require("./XyFilterBase");
var XyzFilterBase = /** @class */ (function (_super) {
    __extends(XyzFilterBase, _super);
    function XyzFilterBase(originalSeries, options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, originalSeries.webAssemblyContext, options) || this;
        _this.yfield = XyFilterBase_1.EDataSeriesField.Y;
        _this.zfield = XyFilterBase_1.EDataSeriesField.Z;
        _this.originalSeriesProperty = originalSeries;
        _this.yfield = (_a = options === null || options === void 0 ? void 0 : options.yfield) !== null && _a !== void 0 ? _a : _this.yfield;
        _this.zfield = (_b = options === null || options === void 0 ? void 0 : options.zfield) !== null && _b !== void 0 ? _b : _this.zfield;
        _this.onBaseDataChanged = _this.onBaseDataChanged.bind(_this);
        originalSeries.dataChanged.subscribe(_this.onBaseDataChanged);
        switch (_this.originalSeries.type) {
            case IDataSeries_1.EDataSeriesType.Ohlc:
                var ohlcSeries_1 = _this.originalSeries;
                _this.getOriginalYValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.yfield, ohlcSeries_1.getNativeYValues(), ohlcSeries_1.getNativeOpenValues(), ohlcSeries_1.getNativeHighValues(), ohlcSeries_1.getNativeLowValues());
                };
                _this.getOriginalZValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.zfield, ohlcSeries_1.getNativeYValues(), ohlcSeries_1.getNativeOpenValues(), ohlcSeries_1.getNativeHighValues(), ohlcSeries_1.getNativeLowValues());
                };
                break;
            case IDataSeries_1.EDataSeriesType.Xy:
                var xySeries_1 = _this.originalSeries;
                _this.getOriginalYValues = function () { return xySeries_1.getNativeYValues(); };
                _this.getOriginalZValues = function () { return xySeries_1.getNativeYValues(); };
                break;
            case IDataSeries_1.EDataSeriesType.Xyy:
                var xyySeries_1 = _this.originalSeries;
                _this.getOriginalYValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.yfield, xyySeries_1.getNativeYValues(), xyySeries_1.getNativeY1Values());
                };
                _this.getOriginalZValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.zfield, xyySeries_1.getNativeYValues(), xyySeries_1.getNativeY1Values());
                };
                break;
            case IDataSeries_1.EDataSeriesType.Hlc:
                var hlcSeries_1 = _this.originalSeries;
                _this.getOriginalYValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.yfield, hlcSeries_1.getNativeYValues(), undefined, hlcSeries_1.getNativeHighValues(), hlcSeries_1.getNativeLowValues());
                };
                _this.getOriginalZValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.zfield, hlcSeries_1.getNativeYValues(), undefined, hlcSeries_1.getNativeHighValues(), hlcSeries_1.getNativeLowValues());
                };
                break;
            default:
                break;
        }
        return _this;
    }
    Object.defineProperty(XyzFilterBase.prototype, "originalSeries", {
        get: function () {
            return this.originalSeriesProperty;
        },
        enumerable: false,
        configurable: true
    });
    XyzFilterBase.prototype.detachFromOriginalSeries = function () {
        this.originalSeries.dataChanged.unsubscribe(this.onBaseDataChanged);
        this.originalSeriesProperty = undefined;
    };
    XyzFilterBase.prototype.delete = function () {
        this.originalSeriesProperty = (0, Deleter_1.deleteSafe)(this.originalSeries);
        _super.prototype.delete.call(this);
    };
    XyzFilterBase.prototype.getOriginalXValues = function () {
        return this.originalSeries.getNativeXValues();
    };
    XyzFilterBase.prototype.getOriginalYValues = function () {
        return this.originalSeries.getNativeYValues();
    };
    XyzFilterBase.prototype.getOriginalZValues = function () {
        return this.originalSeries.getNativeZValues();
    };
    XyzFilterBase.prototype.getOriginalCount = function () {
        return this.originalSeries.count();
    };
    XyzFilterBase.prototype.onOriginalPropertyChanged = function (name) { };
    XyzFilterBase.prototype.filterOnAppend = function (count) {
        this.filterAll();
    };
    XyzFilterBase.prototype.filterOnUpdate = function (index) {
        this.filterAll();
    };
    XyzFilterBase.prototype.filterOnInsert = function (startIndex, count) {
        this.filterAll();
    };
    XyzFilterBase.prototype.filterOnRemove = function (startIndex, count) {
        this.filterAll();
    };
    XyzFilterBase.prototype.onClear = function () {
        this.clear();
    };
    XyzFilterBase.prototype.onBaseDataChanged = function (args) {
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
    return XyzFilterBase;
}(XyzDataSeries_1.XyzDataSeries));
exports.XyzFilterBase = XyzFilterBase;
