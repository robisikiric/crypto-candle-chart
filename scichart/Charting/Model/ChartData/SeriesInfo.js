"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeriesInfo = void 0;
var SeriesType_1 = require("../../../types/SeriesType");
/**
 * SeriesInfo is a data-structure which provides enriched information about a hit-test operation.
 * It's derived by calling {@link BaseRenderableSeries.hitTestProvider.hitTest} (returns {@link HitTestInfo}) and then
 * enriched by calling {@link BaseRenderableSeries.getSeriesInfo}. There is a class hierachy for {@link SeriesInfo} which
 * is a different class depending on series type, e.g. line, mountain, scatter series has {@link XySeriesInfo},
 * heatmap series as {@link HeatmapSeriesInfo} etc.
 */
var SeriesInfo = /** @class */ (function () {
    function SeriesInfo(renderableSeries, hitTestInfo) {
        var _a;
        this.renderableSeries = renderableSeries;
        this.seriesName = (_a = renderableSeries.dataSeries) === null || _a === void 0 ? void 0 : _a.dataSeriesName;
        this.stroke = renderableSeries.stroke;
        this.dataSeriesType = hitTestInfo.dataSeriesType;
        this.dataSeriesIndex = hitTestInfo.dataSeriesIndex;
        this.isHit = hitTestInfo.isHit;
        this.isWithinDataBounds = hitTestInfo.isWithinDataBounds;
        this.hitTestPointValues = hitTestInfo.hitTestPointValues;
        this.xValue = hitTestInfo.isCategoryAxis ? hitTestInfo.xCategoryValue : hitTestInfo.xValue;
        this.point2xValue = hitTestInfo.point2xValue;
        this.yValue = hitTestInfo.yValue;
        this.point2yValue = hitTestInfo.point2yValue;
        this.xCoordinate = hitTestInfo.xCoord;
        this.yCoordinate = hitTestInfo.yCoord;
        this.point2xCoordinate = hitTestInfo.point2xCoord;
        this.point2yCoordinate = hitTestInfo.point2yCoord;
        this.pointMetadata = hitTestInfo.metadata;
        this.point2metadata = hitTestInfo.point2metadata;
        this.distance = hitTestInfo.distance;
        if (renderableSeries.type === SeriesType_1.ESeriesType.ColumnSeries) {
            this.fill = renderableSeries.fill;
        }
        else if (renderableSeries.type === SeriesType_1.ESeriesType.MountainSeries) {
            this.fill = renderableSeries.fill;
        }
        else if (renderableSeries.type === SeriesType_1.ESeriesType.BandSeries) {
            this.fill = renderableSeries.fill;
        }
    }
    Object.defineProperty(SeriesInfo.prototype, "isVisible", {
        get: function () {
            return this.renderableSeries.isVisible;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SeriesInfo.prototype, "formattedYValue", {
        get: function () {
            return this.getYCursorFormattedValue(this.yValue);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SeriesInfo.prototype, "formattedXValue", {
        get: function () {
            return this.getXCursorFormattedValue(this.xValue);
        },
        enumerable: false,
        configurable: true
    });
    SeriesInfo.prototype.getYCursorFormattedValue = function (value) {
        return this.renderableSeries.yAxis.labelProvider.formatCursorLabel(value);
    };
    SeriesInfo.prototype.getXCursorFormattedValue = function (value) {
        return this.renderableSeries.xAxis.labelProvider.formatCursorLabel(value);
    };
    SeriesInfo.prototype.equals = function (other) {
        return (other &&
            this.renderableSeries.id === other.renderableSeries.id &&
            this.isHit === other.isHit &&
            (this.xValue === other.xValue || (this.xValue !== this.xValue && other.xValue !== other.xValue)) &&
            (this.yValue === other.yValue || (this.yValue !== this.yValue && other.yValue !== other.yValue)) &&
            this.pointMetadata === other.pointMetadata);
    };
    return SeriesInfo;
}());
exports.SeriesInfo = SeriesInfo;
