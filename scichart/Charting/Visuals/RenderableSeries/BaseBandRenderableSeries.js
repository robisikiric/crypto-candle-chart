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
exports.BaseBandRenderableSeries = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var NumberRange_1 = require("../../../Core/NumberRange");
var BaseDataSeries_1 = require("../../Model/BaseDataSeries");
var IDataSeries_1 = require("../../Model/IDataSeries");
var XyyPointSeriesResampled_1 = require("../../Model/PointSeries/XyyPointSeriesResampled");
var XyyPointSeriesWrapped_1 = require("../../Model/PointSeries/XyyPointSeriesWrapped");
var XyyDataSeries_1 = require("../../Model/XyyDataSeries");
var IThemeProvider_1 = require("../../Themes/IThemeProvider");
var SciChartSurfaceBase_1 = require("../SciChartSurfaceBase");
var BaseRenderableSeries_1 = require("./BaseRenderableSeries");
var constants_1 = require("./constants");
var BandSeriesDataLabelProvider_1 = require("./DataLabels/BandSeriesDataLabelProvider");
var BandSeriesDrawingProvider_1 = require("./DrawingProviders/BandSeriesDrawingProvider");
var PointMarkerDrawingProvider_1 = require("./DrawingProviders/PointMarkerDrawingProvider");
var BandSeriesHitTestProvider_1 = require("./HitTest/BandSeriesHitTestProvider");
var BaseBandRenderableSeries = /** @class */ (function (_super) {
    __extends(BaseBandRenderableSeries, _super);
    function BaseBandRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.stroke = (_a = options === null || options === void 0 ? void 0 : options.stroke) !== null && _a !== void 0 ? _a : SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.downBandSeriesLineColor;
        _this.strokeY1Property = (_b = options === null || options === void 0 ? void 0 : options.strokeY1) !== null && _b !== void 0 ? _b : SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.upBandSeriesLineColor;
        _this.fillProperty = (_c = options === null || options === void 0 ? void 0 : options.fill) !== null && _c !== void 0 ? _c : SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.upBandSeriesFillColor;
        _this.fillY1Property = (_d = options === null || options === void 0 ? void 0 : options.fillY1) !== null && _d !== void 0 ? _d : SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.downBandSeriesFillColor;
        _this.fillLinearGradient = options === null || options === void 0 ? void 0 : options.fillLinearGradient;
        _this.fillLinearGradientY1 = options === null || options === void 0 ? void 0 : options.fillLinearGradientY1;
        _this.strokeY1DashArrayProperty = options === null || options === void 0 ? void 0 : options.strokeY1DashArray;
        _this.strokeDashArrayProperty = options === null || options === void 0 ? void 0 : options.strokeDashArray;
        _this.drawingProviders.push(new BandSeriesDrawingProvider_1.BandSeriesDrawingProvider(webAssemblyContext, _this));
        _this.drawingProviders.push(new PointMarkerDrawingProvider_1.PointMarkerDrawingProvider(webAssemblyContext, _this));
        _this.drawingProviders.push(new PointMarkerDrawingProvider_1.PointMarkerDrawingProvider(webAssemblyContext, _this, function (ps) { return ps.y1Values; }, function (rs) { return rs.y1SplineValues; }));
        if (!_this.dataLabelProviderProperty) {
            _this.dataLabelProviderProperty = new BandSeriesDataLabelProvider_1.BandSeriesDataLabelProvider(options === null || options === void 0 ? void 0 : options.dataLabels);
            _this.dataLabelProviderProperty.onAttach(_this.webAssemblyContext, _this);
        }
        if (options === null || options === void 0 ? void 0 : options.animation) {
            _this.animationQueue.push(options.animation);
        }
        return _this;
    }
    /**
     * @inheritDoc
     */
    BaseBandRenderableSeries.prototype.applyTheme = function (themeProvider) {
        _super.prototype.applyTheme.call(this, themeProvider);
        var previousThemeProvider = this.parentSurface.previousThemeProvider;
        if (this.stroke === previousThemeProvider.downBandSeriesLineColor) {
            this.stroke = themeProvider.downBandSeriesLineColor;
        }
        if (this.strokeY1 === previousThemeProvider.upBandSeriesLineColor) {
            this.strokeY1 = themeProvider.upBandSeriesLineColor;
        }
        if (this.fill === previousThemeProvider.upBandSeriesFillColor) {
            this.fill = themeProvider.upBandSeriesFillColor;
        }
        if (this.fillY1 === previousThemeProvider.downBandSeriesFillColor) {
            this.fillY1 = themeProvider.downBandSeriesFillColor;
        }
    };
    Object.defineProperty(BaseBandRenderableSeries.prototype, "fill", {
        /**
         * Gets or sets the fill color for when Y is less than Y1 as an HTML Color code
         */
        get: function () {
            return (0, IThemeProvider_1.stripAutoColor)(this.fillProperty);
        },
        /**
         * Gets or sets the fill color for when Y is less than Y1 as an HTML Color code
         */
        set: function (fill) {
            if (this.fillProperty !== fill) {
                this.fillProperty = fill;
                this.notifyPropertyChanged(constants_1.PROPERTY.FILL);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseBandRenderableSeries.prototype, "strokeY1", {
        /**
         * Gets or sets the stroke color the Y1 values in the data-series.
         * See associated {@link XyyDataSeries} for further information
         */
        get: function () {
            return (0, IThemeProvider_1.stripAutoColor)(this.strokeY1Property);
        },
        /**
         * Gets or sets the stroke color the Y1 values in the data-series.
         * See associated {@link XyyDataSeries} for further information
         */
        set: function (strokeY1) {
            if (this.strokeY1Property !== strokeY1) {
                this.strokeY1Property = strokeY1;
                this.notifyPropertyChanged(constants_1.PROPERTY.STROKE_Y1);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseBandRenderableSeries.prototype, "fillY1", {
        /**
         * Gets or sets the fill color for when Y1 is less than Y as an HTML Color code
         */
        get: function () {
            return (0, IThemeProvider_1.stripAutoColor)(this.fillY1Property);
        },
        /**
         * Gets or sets the fill color for when Y1 is less than Y as an HTML Color code
         */
        set: function (fillY1) {
            if (this.fillY1Property !== fillY1) {
                this.fillY1Property = fillY1;
                this.notifyPropertyChanged(constants_1.PROPERTY.FILL_Y1);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseBandRenderableSeries.prototype, "strokeDashArray", {
        /**
         * The StrokeDashArray defines the stroke or dash pattern for the Y0 line.
         * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
         */
        get: function () {
            return this.strokeDashArrayProperty;
        },
        /**
         * The StrokeDashArray defines the stroke or dash pattern for the Y0 line.
         * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
         */
        set: function (strokeDashArray) {
            this.strokeDashArrayProperty = strokeDashArray;
            this.notifyPropertyChanged(constants_1.PROPERTY.STROKE_DASH_ARRAY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseBandRenderableSeries.prototype, "strokeY1DashArray", {
        /**
         * The strokeY1DashArray defines the stroke or dash pattern for the Y1 line.
         * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
         */
        get: function () {
            return this.strokeY1DashArrayProperty;
        },
        /**
         * The strokeY1DashArray defines the stroke or dash pattern for the Y1 line.
         * Accepts an array of values, e.g. [2,2] will have a line of length 2 and a gap of length 2.
         */
        set: function (strokeY1DashArray) {
            this.strokeY1DashArrayProperty = strokeY1DashArray;
            this.notifyPropertyChanged(constants_1.PROPERTY.STROKE_Y1_DASH_ARRAY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseBandRenderableSeries.prototype, "fillLinearGradient", {
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
    Object.defineProperty(BaseBandRenderableSeries.prototype, "fillLinearGradientY1", {
        /**
         * Gets or sets the fill as a gradient brush
         */
        get: function () {
            return this.fillLinearGradientY1Property;
        },
        /**
         * Gets or sets the fill as a gradient brush
         */
        set: function (gradientBrushParams) {
            // We need this check, to prevent creating new Texture if we set the same value
            if (gradientBrushParams !== this.fillLinearGradientY1Property) {
                this.fillLinearGradientY1Property = gradientBrushParams;
                this.notifyPropertyChanged(constants_1.PROPERTY.FILL_LINEAR_GRADIENT_Y1);
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the {@link XyyDataSeries.getNativeY1Values} for the associated {@link dataSeries}
     */
    BaseBandRenderableSeries.prototype.getNativeY1Values = function () {
        return this.dataSeries.getNativeY1Values();
    };
    /** @inheritDoc */
    BaseBandRenderableSeries.prototype.delete = function () {
        this.xyyTempPointSeries = (0, Deleter_1.deleteSafe)(this.xyyTempPointSeries);
        _super.prototype.delete.call(this);
    };
    /** @inheritDoc */
    BaseBandRenderableSeries.prototype.toPointSeries = function (rp) {
        if (rp) {
            if (!this.xyyTempPointSeries) {
                this.xyyTempPointSeries = new XyyPointSeriesResampled_1.XyyPointSeriesResampled(this.webAssemblyContext, rp.xVisibleRange);
            }
            else {
                this.xyyTempPointSeries.xRange = rp.xVisibleRange;
            }
            if (!this.pointSeries) {
                this.pointSeries = new XyyPointSeriesResampled_1.XyyPointSeriesResampled(this.webAssemblyContext, rp.xVisibleRange);
            }
            else {
                this.pointSeries.xRange = rp.xVisibleRange;
            }
            var ps = this.pointSeries;
            var ds = this.dataSeries;
            var xValues = ds.getNativeXValues();
            var yValues = ds.getNativeYValues();
            var y1Values = ds.getNativeY1Values();
            var result = this.resamplerHelper.resampleIntoPointSeries(this.webAssemblyContext, rp, xValues, yValues, this.xyyTempPointSeries.intIndexes, undefined, this.xyyTempPointSeries.xValues, this.xyyTempPointSeries.yValues, false);
            this.pointSeries.fifoStartIndex = result.OutputSplitIndex;
            var xySize = this.xyyTempPointSeries.intIndexes.size();
            this.resamplerHelper.resampleIntoPointSeries(this.webAssemblyContext, rp, xValues, y1Values, this.xyyTempPointSeries.intIndexes, undefined, this.xyyTempPointSeries.xValues, this.xyyTempPointSeries.y1Values);
            // Because intIndexes vector is not cleared indexes for rpLow are appended at the end of rpHigh indexes
            var xy1Size = this.xyyTempPointSeries.intIndexes.size() - xySize;
            // We merge indexes excluding duplicates for Y and Y1 into one vector
            var mergedSize = this.resamplerHelper.mergeIndexes(this.xyyTempPointSeries.intIndexes, xySize, xy1Size, ps.intIndexes);
            // Clear the intIndexes as long as we do not need them any more
            this.xyyTempPointSeries.intIndexes.clear();
            if (rp.dataIsFifo) {
                ps.indexes.resizeFast(mergedSize);
            }
            else {
                ps.indexes.resizeFast(mergedSize + 1);
            }
            // Get values by indexes for Y and Y1 values
            this.resamplerHelper.copyValuesByIndexes(ps.intIndexes, xValues, yValues, y1Values, mergedSize, rp.isCategoryAxis, this.dataSeries.fifoSweeping, ps.indexes, ps.xValues, ps.yValues, ps.y1Values);
            // This is now done in the copy step above
            //ps.updateIndexes();
            ps.clearIntIndexes();
            // ps.debugOutputForUnitTests();
            return ps;
        }
        else {
            return new XyyPointSeriesWrapped_1.XyyPointSeriesWrapped(this.dataSeries);
        }
    };
    /** @inheritDoc */
    BaseBandRenderableSeries.prototype.getYRange = function (xVisibleRange, isXCategoryAxis) {
        if (isXCategoryAxis === void 0) { isXCategoryAxis = false; }
        var dataSeriesValueType = this.isRunningDataAnimation
            ? IDataSeries_1.EDataSeriesValueType.FinalAnimationValues
            : IDataSeries_1.EDataSeriesValueType.Default;
        // We can't just check and use this.pointSeries because it may be filled, but out of date.
        var pointSeries = this.getResampledPointSeries(isXCategoryAxis);
        // if there is a transform as well, it will run off this.pointSeries
        if (this.renderDataTransform && this.renderDataTransform.useForYRange) {
            this.updateTransformedValues(dataSeriesValueType);
            return (0, BaseDataSeries_1.getWindowedYRange)(this.webAssemblyContext, this.transformedRenderPassData.pointSeries.xValues, this.transformedRenderPassData.pointSeries.yValues, xVisibleRange, true, isXCategoryAxis, this.dataSeries.dataDistributionCalculator.isSortedAscending);
        }
        // Use resampled data for autoRange if possible
        if (pointSeries) {
            var _a = pointSeries, yValues = _a.yValues, y1Values = _a.y1Values;
            var indicesRange = new NumberRange_1.NumberRange(0, pointSeries.count - 1);
            return (0, XyyDataSeries_1.getYyYRange)(this.webAssemblyContext, indicesRange, yValues, y1Values);
        }
        return this.dataSeries.getWindowedYRange(xVisibleRange, true, isXCategoryAxis, dataSeriesValueType, this.yRangeMode);
    };
    /** @inheritDoc */
    BaseBandRenderableSeries.prototype.toJSON = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.toJSON.call(this, excludeData);
        var options = {
            fill: this.fill,
            fillY1: this.fillY1,
            strokeDashArray: this.strokeDashArray,
            strokeY1: this.strokeY1,
            strokeY1DashArray: this.strokeY1DashArray
        };
        Object.assign(json.options, options);
        return json;
    };
    /** @inheritDoc */
    BaseBandRenderableSeries.prototype.resolveAutoColors = function (index, maxSeries, theme) {
        _super.prototype.resolveAutoColors.call(this, index, maxSeries, theme);
        if (this.fillProperty.startsWith(IThemeProvider_1.AUTO_COLOR)) {
            var color = theme.getFillColor(index, maxSeries, this.webAssemblyContext);
            this.fill = IThemeProvider_1.AUTO_COLOR + this.adjustAutoColor("fill", color);
        }
        var y1Index = (index + Math.floor(maxSeries / 2)) % maxSeries;
        if (this.strokeY1Property.startsWith(IThemeProvider_1.AUTO_COLOR)) {
            var color = theme.getStrokeColor(y1Index, maxSeries, this.webAssemblyContext);
            this.strokeY1 = IThemeProvider_1.AUTO_COLOR + this.adjustAutoColor("strokeY1", color);
        }
        if (this.fillY1Property.startsWith(IThemeProvider_1.AUTO_COLOR)) {
            var color = theme.getFillColor(y1Index, maxSeries, this.webAssemblyContext);
            this.fillY1 = IThemeProvider_1.AUTO_COLOR + this.adjustAutoColor("fillY1", color);
        }
    };
    /** @inheritDoc */
    BaseBandRenderableSeries.prototype.newHitTestProvider = function () {
        return new BandSeriesHitTestProvider_1.BandSeriesHitTestProvider(this, this.webAssemblyContext);
    };
    return BaseBandRenderableSeries;
}(BaseRenderableSeries_1.BaseRenderableSeries));
exports.BaseBandRenderableSeries = BaseBandRenderableSeries;
