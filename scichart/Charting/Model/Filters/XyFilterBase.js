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
exports.switchData = exports.XyFilterBase = exports.EDataSeriesField = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var IDataSeries_1 = require("../IDataSeries");
var XyDataSeries_1 = require("../XyDataSeries");
var EDataSeriesField;
(function (EDataSeriesField) {
    EDataSeriesField["X"] = "x";
    EDataSeriesField["Open"] = "open";
    EDataSeriesField["High"] = "high";
    EDataSeriesField["Low"] = "low";
    EDataSeriesField["Close"] = "close";
    EDataSeriesField["Y"] = "y";
    EDataSeriesField["Y1"] = "y1";
    EDataSeriesField["Z"] = "z";
})(EDataSeriesField = exports.EDataSeriesField || (exports.EDataSeriesField = {}));
/**
 * Base class for a filter that produces an {@link XyDataSeries}.
 * @remarks
 * The originalSeries can be any series type (other than heatmap).
 * Pass field in the options to determine which field will be returned by getOriginalYValues.
 *
 * To create a filter it is only necessary to implement filterAll, and onClear,
 * but if possible you should override filterOnAppend, filterOnUpdate, filterOnInsert and filterOnRemove
 */
var XyFilterBase = /** @class */ (function (_super) {
    __extends(XyFilterBase, _super);
    /**
     * Creates an instance of {@link XyFilterBase}
     * @param originalSeries the {@link BaseDataSeries} to be filtered
     * @param options the {@link IXyFilterOptions} which can be passed to configure the Filter at construct time
     */
    function XyFilterBase(originalSeries, options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this, originalSeries.webAssemblyContext, options) || this;
        /**
         * The field that will be returned by getOriginalYValues.
         */
        _this.field = EDataSeriesField.Y;
        /**
         * The field that will be returned by getOriginalYValues.
         */
        _this.xField = EDataSeriesField.X;
        _this.originalSeriesProperty = originalSeries;
        _this.field = (_a = options === null || options === void 0 ? void 0 : options.field) !== null && _a !== void 0 ? _a : _this.field;
        _this.xField = (_b = options === null || options === void 0 ? void 0 : options.xField) !== null && _b !== void 0 ? _b : _this.xField;
        _this.onBaseDataChanged = _this.onBaseDataChanged.bind(_this);
        originalSeries.dataChanged.subscribe(_this.onBaseDataChanged);
        switch (_this.originalSeries.type) {
            case IDataSeries_1.EDataSeriesType.Xy:
                if (_this.xField === EDataSeriesField.Y) {
                    _this.getOriginalXValues = function () { return _this.originalSeries.getNativeYValues(); };
                }
                if (_this.field === EDataSeriesField.X) {
                    _this.getOriginalYValues = function () { return _this.originalSeries.getNativeXValues(); };
                }
                break;
            case IDataSeries_1.EDataSeriesType.Ohlc:
                _this.getOriginalXValues = function () {
                    return _this.getValuesFromOHLC(_this.xField, _this.originalSeries);
                };
                _this.getOriginalYValues = function () {
                    return _this.getValuesFromOHLC(_this.field, _this.originalSeries);
                };
                break;
            case IDataSeries_1.EDataSeriesType.Xyy:
                _this.getOriginalXValues = function () {
                    return _this.getValuesFromXyy(_this.xField, _this.originalSeries);
                };
                _this.getOriginalYValues = function () { return _this.getValuesFromXyy(_this.field, _this.originalSeries); };
                break;
            case IDataSeries_1.EDataSeriesType.Xyz:
                _this.getOriginalXValues = function () {
                    return _this.getValuesFromXyz(_this.xField, _this.originalSeries);
                };
                _this.getOriginalYValues = function () { return _this.getValuesFromXyz(_this.field, _this.originalSeries); };
                break;
            case IDataSeries_1.EDataSeriesType.Hlc:
                _this.getOriginalXValues = function () {
                    return _this.getValuesFromHlc(_this.xField, _this.originalSeries);
                };
                _this.getOriginalYValues = function () { return _this.getValuesFromHlc(_this.field, _this.originalSeries); };
                break;
            default:
                break;
        }
        return _this;
    }
    Object.defineProperty(XyFilterBase.prototype, "originalSeries", {
        get: function () {
            return this.originalSeriesProperty;
        },
        enumerable: false,
        configurable: true
    });
    XyFilterBase.prototype.detachFromOriginalSeries = function () {
        this.originalSeries.dataChanged.unsubscribe(this.onBaseDataChanged);
        this.originalSeriesProperty = undefined;
    };
    XyFilterBase.prototype.delete = function () {
        this.originalSeriesProperty = (0, Deleter_1.deleteSafe)(this.originalSeries);
        _super.prototype.delete.call(this);
    };
    /**
     * Get the X values of the original series
     */
    XyFilterBase.prototype.getOriginalXValues = function () {
        return this.originalSeries.getNativeXValues();
    };
    /**
     * Get the Y values of the original series, according to the field set.
     */
    XyFilterBase.prototype.getOriginalYValues = function () {
        return this.originalSeries.getNativeYValues();
    };
    /**
     * Get the length of the original series.
     */
    XyFilterBase.prototype.getOriginalCount = function () {
        return this.originalSeries.count();
    };
    /**
     * Callback when a property on the original series is changed.
     * @param name The name of the property that changed
     */
    XyFilterBase.prototype.onOriginalPropertyChanged = function (name) { };
    /**
     * Called when data is appended to the original series
     * @param count The number of points appended
     */
    XyFilterBase.prototype.filterOnAppend = function (count) {
        this.filterAll();
    };
    /**
     * Called when a point on the original series is updated
     * @param index The index of the updated point.
     */
    XyFilterBase.prototype.filterOnUpdate = function (index) {
        this.filterAll();
    };
    /**
     * Called when data is inserted to the original series
     * @param startIndex The first index where data is inserted
     * @param count The number of points inserted
     */
    XyFilterBase.prototype.filterOnInsert = function (startIndex, count) {
        this.filterAll();
    };
    /**
     * Called when data is removed form the original series
     * @param startIndex The first index where data is removed
     * @param count The number of points removed
     */
    XyFilterBase.prototype.filterOnRemove = function (startIndex, count) {
        this.filterAll();
    };
    /**
     * Called when the original series is cleared.
     */
    XyFilterBase.prototype.onClear = function () {
        this.clear();
    };
    XyFilterBase.prototype.onBaseDataChanged = function (args) {
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
    XyFilterBase.prototype.getValuesFromOHLC = function (field, ohlcSeries) {
        return (0, exports.switchData)(field, ohlcSeries.getNativeXValues(), ohlcSeries.getNativeYValues(), ohlcSeries.getNativeOpenValues(), ohlcSeries.getNativeHighValues(), ohlcSeries.getNativeLowValues());
    };
    XyFilterBase.prototype.getValuesFromXyy = function (field, xyySeries) {
        return (0, exports.switchData)(field, xyySeries.getNativeXValues(), xyySeries.getNativeYValues(), xyySeries.getNativeY1Values());
    };
    XyFilterBase.prototype.getValuesFromXyz = function (field, xyzSeries) {
        return (0, exports.switchData)(field, xyzSeries.getNativeXValues(), xyzSeries.getNativeYValues(), xyzSeries.getNativeZValues());
    };
    XyFilterBase.prototype.getValuesFromHlc = function (field, hlcSeries) {
        return (0, exports.switchData)(field, hlcSeries.getNativeXValues(), hlcSeries.getNativeYValues(), undefined, hlcSeries.getNativeHighValues(), hlcSeries.getNativeLowValues());
    };
    return XyFilterBase;
}(XyDataSeries_1.XyDataSeries));
exports.XyFilterBase = XyFilterBase;
var switchData = function (field, x, closey, openy1z, high, low) {
    var data;
    switch (field) {
        case EDataSeriesField.X:
            data = x;
            break;
        case EDataSeriesField.Close:
        case EDataSeriesField.Y:
            data = closey;
            break;
        case EDataSeriesField.Open:
        case EDataSeriesField.Y1:
        case EDataSeriesField.Z:
            data = openy1z;
            break;
        case EDataSeriesField.High:
            data = high;
            break;
        case EDataSeriesField.Low:
            data = low;
            break;
    }
    if (!data) {
        throw new Error("".concat(field, " does not exist"));
    }
    return data;
};
exports.switchData = switchData;
