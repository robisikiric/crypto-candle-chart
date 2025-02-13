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
exports.HlcFilterBase = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var HlcDataSeries_1 = require("../HlcDataSeries");
var IDataSeries_1 = require("../IDataSeries");
var XyFilterBase_1 = require("./XyFilterBase");
var HlcFilterBase = /** @class */ (function (_super) {
    __extends(HlcFilterBase, _super);
    function HlcFilterBase(originalSeries, options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, originalSeries.webAssemblyContext, options) || this;
        _this.closefield = XyFilterBase_1.EDataSeriesField.Close;
        _this.highfield = XyFilterBase_1.EDataSeriesField.High;
        _this.lowfield = XyFilterBase_1.EDataSeriesField.Low;
        _this.originalSeriesProperty = originalSeries;
        _this.closefield = (_a = options === null || options === void 0 ? void 0 : options.closefield) !== null && _a !== void 0 ? _a : _this.closefield;
        _this.highfield = (_b = options === null || options === void 0 ? void 0 : options.highfield) !== null && _b !== void 0 ? _b : _this.highfield;
        _this.onBaseDataChanged = _this.onBaseDataChanged.bind(_this);
        originalSeries.dataChanged.subscribe(_this.onBaseDataChanged);
        switch (_this.originalSeries.type) {
            case IDataSeries_1.EDataSeriesType.Ohlc:
                var ohlcSeries_1 = _this.originalSeries;
                _this.getOriginalYValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.closefield, ohlcSeries_1.getNativeYValues(), ohlcSeries_1.getNativeOpenValues(), ohlcSeries_1.getNativeHighValues(), ohlcSeries_1.getNativeLowValues());
                };
                _this.getOriginalHighValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.highfield, ohlcSeries_1.getNativeYValues(), ohlcSeries_1.getNativeOpenValues(), ohlcSeries_1.getNativeHighValues(), ohlcSeries_1.getNativeLowValues());
                };
                _this.getOriginalLowValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.lowfield, ohlcSeries_1.getNativeYValues(), ohlcSeries_1.getNativeOpenValues(), ohlcSeries_1.getNativeHighValues(), ohlcSeries_1.getNativeLowValues());
                };
                break;
            case IDataSeries_1.EDataSeriesType.Xy:
                var xySeries_1 = _this.originalSeries;
                _this.getOriginalYValues = function () { return xySeries_1.getNativeYValues(); };
                _this.getOriginalHighValues = function () { return xySeries_1.getNativeYValues(); };
                _this.getOriginalLowValues = function () { return xySeries_1.getNativeYValues(); };
                break;
            case IDataSeries_1.EDataSeriesType.Xyy:
                var xyySeries_1 = _this.originalSeries;
                _this.getOriginalYValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.closefield, xyySeries_1.getNativeYValues(), xyySeries_1.getNativeY1Values());
                };
                _this.getOriginalHighValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.highfield, xyySeries_1.getNativeYValues(), xyySeries_1.getNativeY1Values());
                };
                _this.getOriginalLowValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.lowfield, xyySeries_1.getNativeYValues(), xyySeries_1.getNativeY1Values());
                };
                break;
            case IDataSeries_1.EDataSeriesType.Xyz:
                var xyzSeries_1 = _this.originalSeries;
                _this.getOriginalYValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.closefield, xyzSeries_1.getNativeYValues(), xyzSeries_1.getNativeZValues());
                };
                _this.getOriginalHighValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.highfield, xyzSeries_1.getNativeYValues(), xyzSeries_1.getNativeZValues());
                };
                _this.getOriginalLowValues = function () {
                    return (0, XyFilterBase_1.switchData)(_this.lowfield, xyzSeries_1.getNativeYValues(), xyzSeries_1.getNativeZValues());
                };
                break;
            default:
                break;
        }
        return _this;
    }
    Object.defineProperty(HlcFilterBase.prototype, "originalSeries", {
        get: function () {
            return this.originalSeriesProperty;
        },
        enumerable: false,
        configurable: true
    });
    HlcFilterBase.prototype.detachFromOriginalSeries = function () {
        this.originalSeries.dataChanged.unsubscribe(this.onBaseDataChanged);
        this.originalSeriesProperty = undefined;
    };
    HlcFilterBase.prototype.delete = function () {
        this.originalSeriesProperty = (0, Deleter_1.deleteSafe)(this.originalSeries);
        _super.prototype.delete.call(this);
    };
    HlcFilterBase.prototype.getOriginalXValues = function () {
        return this.originalSeries.getNativeXValues();
    };
    HlcFilterBase.prototype.getOriginalYValues = function () {
        return this.originalSeries.getNativeYValues();
    };
    HlcFilterBase.prototype.getOriginalHighValues = function () {
        return this.originalSeries.getNativeHighValues();
    };
    HlcFilterBase.prototype.getOriginalLowValues = function () {
        return this.originalSeries.getNativeLowValues();
    };
    HlcFilterBase.prototype.getOriginalCount = function () {
        return this.originalSeries.count();
    };
    HlcFilterBase.prototype.onOriginalPropertyChanged = function (name) { };
    HlcFilterBase.prototype.filterOnAppend = function (count) {
        this.filterAll();
    };
    HlcFilterBase.prototype.filterOnUpdate = function (index) {
        this.filterAll();
    };
    HlcFilterBase.prototype.filterOnInsert = function (startIndex, count) {
        this.filterAll();
    };
    HlcFilterBase.prototype.filterOnRemove = function (startIndex, count) {
        this.filterAll();
    };
    HlcFilterBase.prototype.onClear = function () {
        this.clear();
    };
    HlcFilterBase.prototype.onBaseDataChanged = function (args) {
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
    return HlcFilterBase;
}(HlcDataSeries_1.HlcDataSeries));
exports.HlcFilterBase = HlcFilterBase;
