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
exports.ColumnSeriesDrawingProvider = void 0;
var Deleter_1 = require("../../../../Core/Deleter");
var BrushCache_1 = require("../../../Drawing/BrushCache");
var Pen2DCache_1 = require("../../../Drawing/Pen2DCache");
var SciChartSurfaceBase_1 = require("../../SciChartSurfaceBase");
var constants_1 = require("../constants");
var BaseSeriesDrawingProvider_1 = require("./BaseSeriesDrawingProvider");
/**
 * Used internally - a drawing provider performs drawing for a {@link FastColumnRenderableSeries} using
 * our WebAssembly WebGL rendering engine
 */
var ColumnSeriesDrawingProvider = /** @class */ (function (_super) {
    __extends(ColumnSeriesDrawingProvider, _super);
    /**
     * Creates an instance of the {@link ColumnSeriesDrawingProvider}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link FastColumnRenderableSeries} which this drawing provider is attached to
     */
    function ColumnSeriesDrawingProvider(webAssemblyContext, parentSeries, ySelector, xSelector) {
        var _this = _super.call(this, webAssemblyContext, parentSeries, ySelector, xSelector) || this;
        _this.nativeDrawingProvider = new webAssemblyContext.SCRTColumnSeriesDrawingProvider();
        _this.args = new _this.webAssemblyContext.SCRTColumnDrawingParams();
        _this.strokePenCache = new Pen2DCache_1.Pen2DCache(webAssemblyContext);
        _this.strokePenFillColoredCache = new Pen2DCache_1.Pen2DCache(webAssemblyContext);
        _this.fillBrushCache = new BrushCache_1.BrushCache(webAssemblyContext);
        var _a = _this.getProperties(_this.parentSeries), stroke = _a.stroke, strokeThickness = _a.strokeThickness, fill = _a.fill, opacity = _a.opacity;
        (0, Pen2DCache_1.createPenInCache)(_this.strokePenCache, stroke, strokeThickness, opacity);
        // the pen is used to fix a bug when columns disappear when zooming out with zero stroke thickness
        if (strokeThickness === 0) {
            (0, Pen2DCache_1.createPenInCache)(_this.strokePenFillColoredCache, fill, 1, opacity);
        }
        _this.createBrush();
        return _this;
    }
    /**
     * @inheritDoc
     */
    ColumnSeriesDrawingProvider.prototype.delete = function () {
        this.nativeDrawingProvider = (0, Deleter_1.deleteSafe)(this.nativeDrawingProvider);
        this.args = (0, Deleter_1.deleteSafe)(this.args);
        this.strokePenCache = (0, Deleter_1.deleteSafe)(this.strokePenCache);
        this.strokePenFillColoredCache = (0, Deleter_1.deleteSafe)(this.strokePenFillColoredCache);
        this.fillBrushCache = (0, Deleter_1.deleteSafe)(this.fillBrushCache);
        _super.prototype.delete.call(this);
    };
    ColumnSeriesDrawingProvider.prototype.getProperties = function (parentSeries) {
        var stroke = parentSeries.stroke, strokeThickness = parentSeries.strokeThickness, opacity = parentSeries.opacity, fill = parentSeries.fill, fillLinearGradient = parentSeries.fillLinearGradient;
        return {
            stroke: stroke,
            strokeThickness: strokeThickness,
            opacity: opacity,
            fill: fill,
            fillLinearGradient: fillLinearGradient
        };
    };
    /**
     * @inheritDoc
     */
    ColumnSeriesDrawingProvider.prototype.draw = function (renderContext, renderPassData) {
        var pointSeries = renderPassData.pointSeries;
        var viewRect = this.parentSeries.parentSurface.seriesViewRect;
        var strokeThickness = this.getProperties(this.parentSeries).strokeThickness;
        this.args.Reset();
        this.args.forceShaderMethod = true;
        this.args.verticalChart = renderPassData.isVerticalChart;
        this.args.zeroLineY = this.parentSeries.zeroLineY;
        this.args.columnWidth = this.parentSeries.getDataPointWidth(renderPassData.xCoordinateCalculator, this.parentSeries.dataPointWidth, this.parentSeries.dataPointWidthMode);
        this.args.bottomRadius = this.parentSeries.cornerRadius;
        var strokePenCache = this.strokePenCache;
        // ISSUE: If the strokeThickness property is not provided,
        // the fill will be disappeared with large zoom (when the column width will be small or zero)
        if (this.args.columnWidth === 1 && strokeThickness === 0) {
            this.args.columnWidth = 0;
            strokePenCache = this.strokePenFillColoredCache;
        }
        var linesPen = (0, Pen2DCache_1.getScrtPenFromCache)(strokePenCache);
        if (linesPen) {
            this.args.SetLinesPen(linesPen);
        }
        var fillBrush = (0, BrushCache_1.getScrtBrushFromCache)(this.fillBrushCache);
        if (fillBrush) {
            this.args.SetFillBrush(fillBrush);
        }
        this.args.viewportWidth = viewRect.width;
        this.args.viewportHeight = viewRect.height;
        // Paletting per point
        _super.prototype.applyStrokeFillPaletting.call(this, this.parentSeries.stroke, linesPen, this.parentSeries.fill, fillBrush, this.parentSeries.opacity, false, this.parentSeries.fillLinearGradient !== undefined);
        this.args.SetPalettedColors(this.palettingState.palettedColors);
        this.args.paletteStart = this.palettingState.paletteStartIndex * 2;
        var isCategoryAxis = renderPassData.xCoordinateCalculator.isCategoryCoordinateCalculator;
        var xValues = this.xSelector(pointSeries);
        var yValues = this.ySelector(pointSeries);
        var xDrawValues = isCategoryAxis ? pointSeries.indexes : xValues;
        var _a = this.getStartAndCount(renderPassData, xDrawValues), startIndex = _a.startIndex, count = _a.count;
        this.args.count = count;
        this.args.startIndex = startIndex;
        var _b = this.parentSeries.dataSeries, fifoCapacity = _b.fifoCapacity, fifoSweeping = _b.fifoSweeping, fifoSweepingGap = _b.fifoSweepingGap;
        var fifoStartIndex = pointSeries.fifoStartIndex;
        if (fifoSweeping && fifoCapacity === this.parentSeries.dataSeries.count()) {
            this.args.count = fifoStartIndex;
        }
        var nativeContext = renderContext.getNativeContext();
        this.nativeDrawingProvider.DrawPointsVec(nativeContext, xDrawValues, yValues, renderPassData.xCoordinateCalculator.nativeCalculator, renderPassData.yCoordinateCalculator.nativeCalculator, this.args);
        if (fifoSweeping && fifoCapacity === this.parentSeries.dataSeries.count()) {
            this.args.startIndex = Math.min(yValues.size(), fifoStartIndex + fifoSweepingGap);
            this.args.count = Math.max(0, yValues.size() - fifoStartIndex - fifoSweepingGap);
            if (this.args.count > 0) {
                this.nativeDrawingProvider.DrawPointsVec(nativeContext, xDrawValues, yValues, renderPassData.xCoordinateCalculator.nativeCalculator, renderPassData.yCoordinateCalculator.nativeCalculator, this.args);
            }
        }
    };
    /**
     * @inheritDoc
     */
    ColumnSeriesDrawingProvider.prototype.onDpiChanged = function (args) {
        _super.prototype.onDpiChanged.call(this, args);
        this.onSeriesPropertyChange(constants_1.PROPERTY.STROKE);
    };
    /**
     * @inheritDoc
     */
    ColumnSeriesDrawingProvider.prototype.onSeriesPropertyChange = function (propertyName) {
        _super.prototype.onSeriesPropertyChange.call(this, propertyName);
        var _a = this.parentSeries, stroke = _a.stroke, strokeThickness = _a.strokeThickness, opacity = _a.opacity, fill = _a.fill;
        if (propertyName === constants_1.PROPERTY.STROKE ||
            propertyName === constants_1.PROPERTY.STROKE_THICKNESS ||
            propertyName === constants_1.PROPERTY.OPACITY) {
            (0, Pen2DCache_1.createPenInCache)(this.strokePenCache, stroke, strokeThickness, opacity);
        }
        if (propertyName === constants_1.PROPERTY.FILL || propertyName === constants_1.PROPERTY.OPACITY) {
            this.createBrush();
        }
        if (strokeThickness === 0 &&
            (propertyName === constants_1.PROPERTY.STROKE_THICKNESS ||
                propertyName === constants_1.PROPERTY.STROKE ||
                propertyName === constants_1.PROPERTY.OPACITY ||
                propertyName === constants_1.PROPERTY.FILL)) {
            (0, Pen2DCache_1.createPenInCache)(this.strokePenFillColoredCache, fill, 1, opacity);
        }
    };
    ColumnSeriesDrawingProvider.prototype.createBrush = function () {
        var parentSurface = this.parentSeries.parentSurface;
        var _a = this.getProperties(this.parentSeries), fillLinearGradient = _a.fillLinearGradient, fill = _a.fill, opacity = _a.opacity;
        var textureHeightRatio = (parentSurface === null || parentSurface === void 0 ? void 0 : parentSurface.isCopyCanvasSurface)
            ? parentSurface.domCanvas2D.height / SciChartSurfaceBase_1.SciChartSurfaceBase.domMasterCanvas.height
            : 1;
        var textureWidthRatio = (parentSurface === null || parentSurface === void 0 ? void 0 : parentSurface.isCopyCanvasSurface)
            ? parentSurface.domCanvas2D.width / SciChartSurfaceBase_1.SciChartSurfaceBase.domMasterCanvas.width
            : 1;
        return (0, BrushCache_1.createBrushInCache)(this.fillBrushCache, fill, opacity, textureHeightRatio, textureWidthRatio, fillLinearGradient);
    };
    return ColumnSeriesDrawingProvider;
}(BaseSeriesDrawingProvider_1.BaseSeriesDrawingProvider));
exports.ColumnSeriesDrawingProvider = ColumnSeriesDrawingProvider;
