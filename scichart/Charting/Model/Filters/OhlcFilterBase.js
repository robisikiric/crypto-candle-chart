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
exports.OhlcFilterBase = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var IDataSeries_1 = require("../IDataSeries");
var OhlcDataSeries_1 = require("../OhlcDataSeries");
var OhlcFilterBase = /** @class */ (function (_super) {
    __extends(OhlcFilterBase, _super);
    function OhlcFilterBase(originalSeries, options) {
        var _this = _super.call(this, originalSeries.webAssemblyContext, options) || this;
        _this.originalSeriesProperty = originalSeries;
        _this.onBaseDataChanged = _this.onBaseDataChanged.bind(_this);
        originalSeries.dataChanged.subscribe(_this.onBaseDataChanged);
        return _this;
    }
    Object.defineProperty(OhlcFilterBase.prototype, "originalSeries", {
        get: function () {
            return this.originalSeriesProperty;
        },
        enumerable: false,
        configurable: true
    });
    OhlcFilterBase.prototype.detachFromOriginalSeries = function () {
        this.originalSeries.dataChanged.unsubscribe(this.onBaseDataChanged);
        this.originalSeriesProperty = undefined;
    };
    OhlcFilterBase.prototype.delete = function () {
        this.originalSeriesProperty = (0, Deleter_1.deleteSafe)(this.originalSeries);
        _super.prototype.delete.call(this);
    };
    OhlcFilterBase.prototype.getOriginalXValues = function () {
        return this.originalSeries.getNativeXValues();
    };
    OhlcFilterBase.prototype.getOriginalCount = function () {
        return this.originalSeries.count();
    };
    OhlcFilterBase.prototype.onOriginalPropertyChanged = function (name) { };
    OhlcFilterBase.prototype.filterOnAppend = function (count) {
        this.filterAll();
    };
    OhlcFilterBase.prototype.filterOnUpdate = function (index) {
        this.filterAll();
    };
    OhlcFilterBase.prototype.filterOnInsert = function (startIndex, count) {
        this.filterAll();
    };
    OhlcFilterBase.prototype.filterOnRemove = function (startIndex, count) {
        this.filterAll();
    };
    OhlcFilterBase.prototype.onClear = function () {
        this.clear();
    };
    OhlcFilterBase.prototype.onBaseDataChanged = function (args) {
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
    return OhlcFilterBase;
}(OhlcDataSeries_1.OhlcDataSeries));
exports.OhlcFilterBase = OhlcFilterBase;
