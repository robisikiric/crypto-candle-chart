"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPointInfo = void 0;
var DataPointInfo = /** @class */ (function () {
    function DataPointInfo(renderableSeries, metadata, index) {
        this.renderableSeriesProperty = renderableSeries;
        this.indexProperty = index;
        this.metadataProperty = metadata;
    }
    Object.defineProperty(DataPointInfo.prototype, "metadata", {
        get: function () {
            return this.metadataProperty;
        },
        set: function (metadata) {
            this.metadataProperty = metadata;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataPointInfo.prototype, "index", {
        get: function () {
            return this.indexProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataPointInfo.prototype, "xValue", {
        get: function () {
            return this.dataSeries.getNativeXValues().get(this.index);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataPointInfo.prototype, "yValue", {
        get: function () {
            return this.dataSeries.getNativeYValues().get(this.index);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataPointInfo.prototype, "renderableSeries", {
        get: function () {
            return this.renderableSeriesProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataPointInfo.prototype, "dataSeries", {
        get: function () {
            return this.renderableSeries.dataSeries;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataPointInfo.prototype, "seriesName", {
        get: function () {
            return this.dataSeries.dataSeriesName;
        },
        enumerable: false,
        configurable: true
    });
    return DataPointInfo;
}());
exports.DataPointInfo = DataPointInfo;
