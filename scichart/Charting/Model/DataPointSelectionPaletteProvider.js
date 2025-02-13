"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPointSelectionPaletteProvider = void 0;
var PaletteProviderType_1 = require("../../types/PaletteProviderType");
var SeriesType_1 = require("../../types/SeriesType");
var parseColor_1 = require("../../utils/parseColor");
var IPaletteProvider_1 = require("./IPaletteProvider");
var DataPointSelectionPaletteProvider = /** @class */ (function () {
    function DataPointSelectionPaletteProvider(options) {
        this.strokePaletteMode = IPaletteProvider_1.EStrokePaletteMode.SOLID;
        this.fillPaletteMode = IPaletteProvider_1.EFillPaletteMode.SOLID;
        if (options === null || options === void 0 ? void 0 : options.stroke) {
            this.selectedStroke = (0, parseColor_1.parseColorToUIntArgb)(options === null || options === void 0 ? void 0 : options.stroke);
        }
        if (options === null || options === void 0 ? void 0 : options.fill) {
            this.selectedFill = (0, parseColor_1.parseColorToUIntArgb)(options === null || options === void 0 ? void 0 : options.fill);
        }
        this.selectedPointMarker = { stroke: this.selectedStroke, fill: this.selectedFill };
    }
    DataPointSelectionPaletteProvider.prototype.onAttached = function (parentSeries) {
        if (!this.seriesType) {
            this.seriesType = parentSeries.type;
        }
        else if (this.seriesType !== parentSeries.type) {
            parentSeries.paletteProvider = IPaletteProvider_1.DefaultPaletteProvider.createEmpty();
            console.error("One instance of a DataPointSelectionPaletteProvider cannot be shared between series of different types");
        }
    };
    DataPointSelectionPaletteProvider.prototype.onDetached = function () { };
    DataPointSelectionPaletteProvider.prototype.overridePointMarkerArgb = function (xValue, yValue, index, opacity, metadata) {
        if (metadata === null || metadata === void 0 ? void 0 : metadata.isSelected) {
            return this.selectedPointMarker;
        }
        return undefined;
    };
    DataPointSelectionPaletteProvider.prototype.overrideStrokeArgb = function (xValue, yValue, index, opacity, metadata) {
        var strokeSeriesTypes = [SeriesType_1.ESeriesType.OhlcSeries, SeriesType_1.ESeriesType.CandlestickSeries, SeriesType_1.ESeriesType.ColumnSeries];
        if (strokeSeriesTypes.includes(this.seriesType) && (metadata === null || metadata === void 0 ? void 0 : metadata.isSelected))
            return this.selectedStroke;
        return undefined;
    };
    DataPointSelectionPaletteProvider.prototype.overrideFillArgb = function (xValue, yValue, index, opacity, metadata) {
        var fillSeriesTypes = [
            SeriesType_1.ESeriesType.StackedColumnSeries,
            SeriesType_1.ESeriesType.ColumnSeries,
            SeriesType_1.ESeriesType.CandlestickSeries
        ];
        if (fillSeriesTypes.includes(this.seriesType) && (metadata === null || metadata === void 0 ? void 0 : metadata.isSelected))
            return this.selectedFill;
        return undefined;
    };
    DataPointSelectionPaletteProvider.prototype.toJSON = function () {
        return {
            type: PaletteProviderType_1.EPaletteProviderType.DataPointSelection,
            options: {
                stroke: runIfValue(this.selectedStroke, parseColor_1.parseArgbToHtmlColor),
                fill: runIfValue(this.selectedFill, parseColor_1.parseArgbToHtmlColor)
            }
        };
    };
    return DataPointSelectionPaletteProvider;
}());
exports.DataPointSelectionPaletteProvider = DataPointSelectionPaletteProvider;
var runIfValue = function (value, fn) {
    if (!value)
        return undefined;
    return fn(value);
};
