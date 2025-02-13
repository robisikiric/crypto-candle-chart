"use strict";
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
exports.buildDataSeries = void 0;
var HlcScaleOffsetFilter_1 = require("../Charting/Model/Filters/HlcScaleOffsetFilter");
var OhlcScaleOffsetFilter_1 = require("../Charting/Model/Filters/OhlcScaleOffsetFilter");
var XyLinearTrendFilter_1 = require("../Charting/Model/Filters/XyLinearTrendFilter");
var XyMovingAverageFilter_1 = require("../Charting/Model/Filters/XyMovingAverageFilter");
var XyRatioFilter_1 = require("../Charting/Model/Filters/XyRatioFilter");
var XyScaleOffsetFilter_1 = require("../Charting/Model/Filters/XyScaleOffsetFilter");
var XyyScaleOffsetFilter_1 = require("../Charting/Model/Filters/XyyScaleOffsetFilter");
var XyzScaleOffsetFilter_1 = require("../Charting/Model/Filters/XyzScaleOffsetFilter");
var HlcDataSeries_1 = require("../Charting/Model/HlcDataSeries");
var IDataSeries_1 = require("../Charting/Model/IDataSeries");
var NonUniformHeatmapDataSeries_1 = require("../Charting/Model/NonUniformHeatmapDataSeries");
var OhlcDataSeries_1 = require("../Charting/Model/OhlcDataSeries");
var UniformHeatmapDataSeries_1 = require("../Charting/Model/UniformHeatmapDataSeries");
var XyDataSeries_1 = require("../Charting/Model/XyDataSeries");
var XyTextDataSeries_1 = require("../Charting/Model/XyTextDataSeries");
var XyyDataSeries_1 = require("../Charting/Model/XyyDataSeries");
var XyzDataSeries_1 = require("../Charting/Model/XyzDataSeries");
var DataFilterType_1 = require("../types/DataFilterType");
var chartBuilder_1 = require("./chartBuilder");
/**
 * Build a data series from a definition that can be pure data.
 * @param wasmContext A {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart | SciChart 3D WebAssembly Context}
 * @param definition A {@link TSeriesDefinition}
 * @param sharedData Optional {@link TSharedDataDefinition} to define shared data which can be referenced by the data series
 * @param originalDataSeries Optional {@Link IDataSeries} to define original data for filter
 * @returns An {@link IDataSeries}
 */
var buildDataSeries = function (wasmContext, dataSeriesDefinition, sharedData, originalDataSeries) {
    if (!dataSeriesDefinition) {
        return undefined;
    }
    if (typeof dataSeriesDefinition === "string") {
        dataSeriesDefinition = JSON.parse(dataSeriesDefinition, chartBuilder_1.chartReviver);
    }
    if (typeof sharedData === "string") {
        sharedData = JSON.parse(sharedData, chartBuilder_1.chartReviver);
    }
    var dataSeries;
    var filterDef;
    dataSeries = createDataSeries(wasmContext, dataSeriesDefinition, sharedData);
    if ("filter" in dataSeriesDefinition.options) {
        // @ts-ignore
        filterDef = dataSeriesDefinition.options.filter;
    }
    if (filterDef &&
        dataSeriesDefinition.type !== IDataSeries_1.EDataSeriesType.HeatmapUniform &&
        dataSeriesDefinition.type !== IDataSeries_1.EDataSeriesType.HeatmapNonUniform) {
        if (dataSeries) {
            var filter = buildFilter((originalDataSeries !== null && originalDataSeries !== void 0 ? originalDataSeries : dataSeries), filterDef);
            if (filter) {
                dataSeries = filter;
            }
        }
    }
    return dataSeries;
};
exports.buildDataSeries = buildDataSeries;
var buildFilter = function (dataSeries, definition) {
    if (definition.type === DataFilterType_1.EDataFilterType.HlcScaleOffset) {
        return new HlcScaleOffsetFilter_1.HlcScaleOffsetFilter(dataSeries, definition.options);
    }
    else if (definition.type === DataFilterType_1.EDataFilterType.OhlcScaleOffset) {
        return new OhlcScaleOffsetFilter_1.OhlcScaleOffsetFilter(dataSeries, definition.options);
    }
    else if (definition.type === DataFilterType_1.EDataFilterType.XyLinearTrend) {
        return new XyLinearTrendFilter_1.XyLinearTrendFilter(dataSeries, definition.options);
    }
    else if (definition.type === DataFilterType_1.EDataFilterType.XyMovingAverage) {
        return new XyMovingAverageFilter_1.XyMovingAverageFilter(dataSeries, definition.options);
    }
    else if (definition.type === DataFilterType_1.EDataFilterType.XyRatio) {
        var options = definition.options;
        if (Array.isArray(options.divisorSeries)) {
            var xValues = new Array(dataSeries.count()).fill(0);
            definition.options.divisorSeries = new XyDataSeries_1.XyDataSeries(dataSeries.webAssemblyContext, {
                xValues: xValues,
                yValues: options.divisorSeries
            });
        }
        return new XyRatioFilter_1.XyRatioFilter(dataSeries, definition.options);
    }
    else if (definition.type === DataFilterType_1.EDataFilterType.XyScaleOffset) {
        return new XyScaleOffsetFilter_1.XyScaleOffsetFilter(dataSeries, definition.options);
    }
    else if (definition.type === DataFilterType_1.EDataFilterType.XyyScaleOffset) {
        return new XyyScaleOffsetFilter_1.XyyScaleOffsetFilter(dataSeries, definition.options);
    }
    else if (definition.type === DataFilterType_1.EDataFilterType.XyzScaleOffset) {
        return new XyzScaleOffsetFilter_1.XyzScaleOffsetFilter(dataSeries, definition.options);
    }
    else {
        return undefined;
    }
};
var createDataSeries = function (wasmContext, dataSeriesDefinition, sharedData) {
    var rawOptions = __assign({}, dataSeriesDefinition.options);
    switch (dataSeriesDefinition.type) {
        case IDataSeries_1.EDataSeriesType.Xy: {
            var data = rawOptions;
            if (sharedData && data.xDataId) {
                data.xValues = sharedData[data.xDataId];
                data.yValues = sharedData[data.yDataId];
            }
            return new XyDataSeries_1.XyDataSeries(wasmContext, data);
        }
        case IDataSeries_1.EDataSeriesType.Xyy: {
            var data = rawOptions;
            if (sharedData && data.xDataId) {
                data.xValues = sharedData[data.xDataId];
                data.yValues = sharedData[data.yDataId];
                data.y1Values = sharedData[data.y1DataId];
            }
            return new XyyDataSeries_1.XyyDataSeries(wasmContext, data);
        }
        case IDataSeries_1.EDataSeriesType.Xyz: {
            var data = rawOptions;
            if (sharedData && data.xDataId) {
                data.xValues = sharedData[data.xDataId];
                data.yValues = sharedData[data.yDataId];
                data.zValues = sharedData[data.zDataId];
            }
            return new XyzDataSeries_1.XyzDataSeries(wasmContext, data);
        }
        case IDataSeries_1.EDataSeriesType.XyText: {
            var data = rawOptions;
            if (sharedData && data.xDataId) {
                data.xValues = sharedData[data.xDataId];
                data.yValues = sharedData[data.yDataId];
            }
            return new XyTextDataSeries_1.XyTextDataSeries(wasmContext, data);
        }
        case IDataSeries_1.EDataSeriesType.Hlc: {
            var data = rawOptions;
            if (sharedData && data.xDataId) {
                data.xValues = sharedData[data.xDataId];
                data.highValues = sharedData[data.highDataId];
                data.lowValues = sharedData[data.lowDataId];
                data.yValues = sharedData[data.closeDataId];
            }
            return new HlcDataSeries_1.HlcDataSeries(wasmContext, data);
        }
        case IDataSeries_1.EDataSeriesType.Ohlc: {
            var data = rawOptions;
            if (sharedData && data.xDataId) {
                data.xValues = sharedData[data.xDataId];
                data.openValues = sharedData[data.openDataId];
                data.highValues = sharedData[data.highDataId];
                data.lowValues = sharedData[data.lowDataId];
                data.closeValues = sharedData[data.closeDataId];
            }
            return new OhlcDataSeries_1.OhlcDataSeries(wasmContext, data);
        }
        case IDataSeries_1.EDataSeriesType.HeatmapUniform: {
            var data = rawOptions;
            return new UniformHeatmapDataSeries_1.UniformHeatmapDataSeries(wasmContext, data);
        }
        case IDataSeries_1.EDataSeriesType.HeatmapNonUniform: {
            var data = rawOptions;
            return new NonUniformHeatmapDataSeries_1.NonUniformHeatmapDataSeries(wasmContext, data);
        }
        default: {
            var handleInvalidDataSeriesType = function (type) {
                throw new Error("Invalid Data Series Type value: \"".concat(type, "\"!"));
            };
            return handleInvalidDataSeriesType(dataSeriesDefinition.type);
        }
    }
};
