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
exports.getXRange = exports.FastColumnRenderableSeries = void 0;
var NumberRange_1 = require("../../../Core/NumberRange");
var DataPointWidthMode_1 = require("../../../types/DataPointWidthMode");
var SeriesType_1 = require("../../../types/SeriesType");
var IThemeProvider_1 = require("../../Themes/IThemeProvider");
var SciChartSurfaceBase_1 = require("../SciChartSurfaceBase");
var BaseRenderableSeries_1 = require("./BaseRenderableSeries");
var constants_1 = require("./constants");
var ColumnSeriesDataLabelProvider_1 = require("./DataLabels/ColumnSeriesDataLabelProvider");
var ColumnSeriesDrawingProvider_1 = require("./DrawingProviders/ColumnSeriesDrawingProvider");
var PointMarkerDrawingProvider_1 = require("./DrawingProviders/PointMarkerDrawingProvider");
var ColumnSeriesHitTestProvider_1 = require("./HitTest/ColumnSeriesHitTestProvider");
/**
 * Defines a column-series or JavaScript column chart type in the SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * To add a column series to a {@link SciChartSurface} you need to declare both the {@link FastColumnRenderableSeries | RenderableSeries}
 * and a {@link XyDataSeries | DataSeries}. Simplified code sample below:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const wasmContext: TSciChart;
 * // Create and fill the dataseries
 * const dataSeries = new XyDataSeries(wasmContext);
 * dataSeries.append(1,2);
 * dataSeries.append(1,2);
 * // Create the renderableSeries
 * const columnSeries = new FastColumnRenderableSeries(wasmContext);
 * columnSeries.dataSeries = dataSeries;
 * // append to the SciChartSurface
 * sciChartSurface.renderableSeries.add(columnSeries);
 * ```
 */
var FastColumnRenderableSeries = /** @class */ (function (_super) {
    __extends(FastColumnRenderableSeries, _super);
    /**
     * Creates an instance of the {@link FastColumnRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options optional parameters of type {@link IColumnRenderableSeriesOptions} applied when constructing the series type
     */
    function FastColumnRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h;
        _this = _super.call(this, webAssemblyContext, options) || this;
        /** @inheritDoc */
        _this.type = SeriesType_1.ESeriesType.ColumnSeries;
        _this.fillProperty = SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.columnFillBrush;
        _this.zeroLineYProperty = 0;
        _this.dataPointWidthProperty = 0.8;
        _this.dataPointWidthModeProperty = DataPointWidthMode_1.EDataPointWidthMode.Relative;
        _this.cornerRadiusProperty = 0;
        _this.fill = (_a = options === null || options === void 0 ? void 0 : options.fill) !== null && _a !== void 0 ? _a : _this.fillProperty;
        _this.zeroLineY = (_b = options === null || options === void 0 ? void 0 : options.zeroLineY) !== null && _b !== void 0 ? _b : _this.zeroLineYProperty;
        _this.dataPointWidthProperty = (_c = options === null || options === void 0 ? void 0 : options.dataPointWidth) !== null && _c !== void 0 ? _c : _this.dataPointWidthProperty;
        _this.dataPointWidthMode = (_d = options === null || options === void 0 ? void 0 : options.dataPointWidthMode) !== null && _d !== void 0 ? _d : _this.dataPointWidthModeProperty;
        _this.fillLinearGradientProperty = (_e = options === null || options === void 0 ? void 0 : options.fillLinearGradient) !== null && _e !== void 0 ? _e : _this.fillLinearGradientProperty;
        _this.cornerRadiusProperty = (_f = options === null || options === void 0 ? void 0 : options.cornerRadius) !== null && _f !== void 0 ? _f : _this.cornerRadiusProperty;
        // Must be called here for the series type to be available
        if ((_g = _this.paletteProvider) === null || _g === void 0 ? void 0 : _g.onAttached) {
            (_h = _this.paletteProvider) === null || _h === void 0 ? void 0 : _h.onAttached(_this);
        }
        if (!_this.dataLabelProviderProperty) {
            _this.dataLabelProviderProperty = new ColumnSeriesDataLabelProvider_1.ColumnSeriesDataLabelProvider(options === null || options === void 0 ? void 0 : options.dataLabels);
            _this.dataLabelProviderProperty.onAttach(_this.webAssemblyContext, _this);
        }
        _this.drawingProviders.push(new ColumnSeriesDrawingProvider_1.ColumnSeriesDrawingProvider(webAssemblyContext, _this));
        _this.drawingProviders.push(new PointMarkerDrawingProvider_1.PointMarkerDrawingProvider(webAssemblyContext, _this));
        if (options === null || options === void 0 ? void 0 : options.animation) {
            _this.animationQueue.push(options.animation);
        }
        return _this;
    }
    FastColumnRenderableSeries.prototype.applyTheme = function (themeProvider) {
        _super.prototype.applyTheme.call(this, themeProvider);
        var previousThemeProvider = this.parentSurface.previousThemeProvider;
        if (this.fill === previousThemeProvider.columnFillBrush) {
            this.fill = themeProvider.columnFillBrush;
        }
        if (this.stroke === previousThemeProvider.columnLineColor) {
            this.stroke = themeProvider.columnLineColor;
        }
    };
    Object.defineProperty(FastColumnRenderableSeries.prototype, "fill", {
        get: function () {
            return (0, IThemeProvider_1.stripAutoColor)(this.fillProperty);
        },
        set: function (htmlColorCode) {
            this.fillProperty = htmlColorCode;
            this.notifyPropertyChanged(constants_1.PROPERTY.FILL);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FastColumnRenderableSeries.prototype, "fillLinearGradient", {
        /**
         * Gets or sets the fill as a gradient brush
         */
        get: function () {
            return this.fillLinearGradientProperty;
        },
        /**
         * Gets or sets the fill as a gradient brush
         */
        set: function (gradientBrushParams) {
            // We need this check, to prevent creating new Texture if we set the same value
            if (gradientBrushParams !== this.fillLinearGradientProperty) {
                this.fillLinearGradientProperty = gradientBrushParams;
                this.notifyPropertyChanged(constants_1.PROPERTY.FILL_LINEAR_GRADIENT);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FastColumnRenderableSeries.prototype, "zeroLineY", {
        /**
         * Gets or sets the Zero-line Y, the Y-value for the base of the columns. Default is 0
         */
        get: function () {
            return this.zeroLineYProperty;
        },
        /**
         * Gets or sets the Zero-line Y, the Y-value for the base of the columns. Default is 0
         */
        set: function (zeroLineY) {
            this.zeroLineYProperty = zeroLineY;
            this.notifyPropertyChanged(constants_1.PROPERTY.ZERO_LINE_Y);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FastColumnRenderableSeries.prototype, "dataPointWidth", {
        /**
         * Gets or sets a value used to calculate the width of columns, depending on the dataPointWidthMode.
         * With the default dataPointWidthMode: EDataPointWidthMode.Relative, dataPointWidth is a fraction of available space per column. Valid values range from 0.0 - 1.0
         */
        get: function () {
            return this.dataPointWidthProperty;
        },
        /**
         * Gets or sets a value used to calculate the width of columns, depending on the dataPointWidthMode.
         * With the default dataPointWidthMode: EDataPointWidthMode.Relative, dataPointWidth is a fraction of available space per column. Valid values range from 0.0 - 1.0
         */
        set: function (dataPointWidth) {
            this.dataPointWidthProperty = dataPointWidth;
            this.notifyPropertyChanged(constants_1.PROPERTY.DATA_POINT_WIDTH);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FastColumnRenderableSeries.prototype, "dataPointWidthMode", {
        /**
         * Gets or sets the mode which determines how dataPointWidth is interpreted. Available values are {@link EDataPointWidthMode}.  Default Relative.
         */
        get: function () {
            return this.dataPointWidthModeProperty;
        },
        /**
         * Gets or sets the mode which determines how dataPointWidth is interpreted. Available values are {@link EDataPointWidthMode}.  Default Relative.
         */
        set: function (value) {
            this.dataPointWidthModeProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.DATA_POINT_WIDTH_MODE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FastColumnRenderableSeries.prototype, "cornerRadius", {
        /**
         * Gets or sets the corner radius, to give the columns rounded corners. Default is 0
         */
        get: function () {
            return this.cornerRadiusProperty;
        },
        /**
         * Gets or sets the corner radius, to give the columns rounded corners. Default is 0
         */
        set: function (cornerRadius) {
            this.cornerRadiusProperty = cornerRadius;
            this.notifyPropertyChanged(constants_1.PROPERTY.CORNER_RADIUS);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    FastColumnRenderableSeries.prototype.getXRange = function () {
        var range = _super.prototype.getXRange.call(this);
        var count = this.dataSeries.count();
        // Range
        var additionalValue = this.dataPointWidth / 2;
        if (this.dataPointWidthMode === DataPointWidthMode_1.EDataPointWidthMode.Relative) {
            if (count > 1) {
                additionalValue = ((range.diff / (count - 1)) * this.dataPointWidth) / 2;
            }
            else {
                additionalValue = 0;
            }
        }
        if (this.dataPointWidthMode === DataPointWidthMode_1.EDataPointWidthMode.Absolute) {
            var cc = this.xAxis.getCurrentCoordinateCalculator();
            var dataWidth = cc.getDataValue(this.dataPointWidth) - cc.getDataValue(0);
            additionalValue = dataWidth / 2;
        }
        return new NumberRange_1.NumberRange(range.min - additionalValue, range.max + additionalValue);
    };
    /**
     * @inheritDoc
     */
    FastColumnRenderableSeries.prototype.getYRange = function (xVisibleRange, isXCategoryAxis) {
        if (isXCategoryAxis === void 0) { isXCategoryAxis = false; }
        var yRange = _super.prototype.getYRange.call(this, xVisibleRange, isXCategoryAxis);
        if (!yRange) {
            return undefined;
        }
        return new NumberRange_1.NumberRange(Math.min(yRange.min, this.zeroLineY), Math.max(yRange.max, this.zeroLineY));
    };
    /** @inheritDoc */
    FastColumnRenderableSeries.prototype.resolveAutoColors = function (index, maxSeries, theme) {
        _super.prototype.resolveAutoColors.call(this, index, maxSeries, theme);
        if (this.fillProperty.startsWith(IThemeProvider_1.AUTO_COLOR)) {
            var color = theme.getFillColor(index, maxSeries, this.webAssemblyContext);
            this.fill = IThemeProvider_1.AUTO_COLOR + this.adjustAutoColor("fill", color);
        }
    };
    /** @inheritDoc */
    FastColumnRenderableSeries.prototype.toJSON = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.toJSON.call(this, excludeData);
        var options = {
            dataPointWidth: this.dataPointWidth,
            dataPointWidthMode: this.dataPointWidthMode,
            fill: this.fill,
            zeroLineY: this.zeroLineY,
            fillLinearGradient: this.fillLinearGradient,
            cornerRadius: this.cornerRadius
        };
        Object.assign(json.options, options);
        return json;
    };
    /** @inheritDoc */
    FastColumnRenderableSeries.prototype.newHitTestProvider = function () {
        return new ColumnSeriesHitTestProvider_1.ColumnSeriesHitTestProvider(this, this.webAssemblyContext);
    };
    return FastColumnRenderableSeries;
}(BaseRenderableSeries_1.BaseRenderableSeries));
exports.FastColumnRenderableSeries = FastColumnRenderableSeries;
var getXRange = function (range, count, widthFraction) {
    if (count > 1) {
        var additionalValue = ((range.diff / (count - 1)) * widthFraction) / 2;
        return new NumberRange_1.NumberRange(range.min - additionalValue, range.max + additionalValue);
    }
    // TODO: figure out what to do if we have only one point
    return range;
};
exports.getXRange = getXRange;
