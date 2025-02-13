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
exports.MountainSeriesDrawingProvider = void 0;
var Deleter_1 = require("../../../../Core/Deleter");
var BrushCache_1 = require("../../../Drawing/BrushCache");
var Pen2DCache_1 = require("../../../Drawing/Pen2DCache");
var WebGlRenderContext2D_1 = require("../../../Drawing/WebGlRenderContext2D");
var SciChartSurfaceBase_1 = require("../../SciChartSurfaceBase");
var constants_1 = require("../constants");
var BaseSeriesDrawingProvider_1 = require("./BaseSeriesDrawingProvider");
/**
 * Used internally - a drawing provider performs drawing for a {@link BaseMountainRenderableSeries} using
 * our WebAssembly WebGL rendering engine
 */
var MountainSeriesDrawingProvider = /** @class */ (function (_super) {
    __extends(MountainSeriesDrawingProvider, _super);
    /**
     * Creates an instance of the {@link MountainSeriesDrawingProvider}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link BaseMountainRenderableSeries} which this drawing provider is attached to
     */
    function MountainSeriesDrawingProvider(webAssemblyContext, parentSeries) {
        var _this = _super.call(this, webAssemblyContext, parentSeries) || this;
        _this.nativeDrawingProvider = new _this.webAssemblyContext.SCRTMountainSeriesDrawingProvider();
        _this.args = new _this.webAssemblyContext.SCRTMountainDrawingParams();
        _this.strokePenCache = new Pen2DCache_1.Pen2DCache(webAssemblyContext);
        _this.fillBrushCache = new BrushCache_1.BrushCache(webAssemblyContext);
        return _this;
    }
    /**
     * @inheritDoc
     */
    MountainSeriesDrawingProvider.prototype.delete = function () {
        this.nativeDrawingProvider = (0, Deleter_1.deleteSafe)(this.nativeDrawingProvider);
        this.args = (0, Deleter_1.deleteSafe)(this.args);
        this.strokePenCache = (0, Deleter_1.deleteSafe)(this.strokePenCache);
        this.fillBrushCache = (0, Deleter_1.deleteSafe)(this.fillBrushCache);
        _super.prototype.delete.call(this);
    };
    /**
     * @inheritDoc
     */
    MountainSeriesDrawingProvider.prototype.draw = function (renderContext, renderPassData) {
        var _a;
        var pointSeries = renderPassData.pointSeries;
        var containsNaN = this.parentSeries.dataSeries.dataDistributionCalculator.containsNaN;
        this.args.Reset();
        this.args.forceShaderMethod = true;
        this.args.lineGaps = containsNaN
            ? this.parentSeries.drawNaNAs === WebGlRenderContext2D_1.ELineDrawMode.DiscontinuousLine
                ? this.webAssemblyContext.SCRTLineGapMode.DrawGaps
                : this.webAssemblyContext.SCRTLineGapMode.CloseGaps
            : this.webAssemblyContext.SCRTLineGapMode.Default;
        this.args.verticalChart = renderPassData.isVerticalChart;
        var _b = renderPassData.getyCoordinateCalculator(), visibleMin = _b.visibleMin, visibleMax = _b.visibleMax;
        this.args.zeroLineY = Math.max(Math.min(this.parentSeries.zeroLineY, visibleMax), visibleMin);
        this.args.isDigitalLine = this.parentSeries.isDigitalLine;
        var fillBrush = this.createBrush();
        if (fillBrush) {
            this.args.SetFillBrush(fillBrush);
        }
        var strokePen = (0, Pen2DCache_1.getScrtPenFromCache)(this.strokePenCache);
        if (strokePen) {
            this.args.SetLinesPen(strokePen);
        }
        // Paletting per point
        _super.prototype.applyStrokeFillPaletting.call(this, this.parentSeries.stroke, strokePen, this.parentSeries.fill, fillBrush, this.parentSeries.opacity, true, this.parentSeries.fillLinearGradient !== undefined, renderPassData);
        var paletteTexture = (_a = this.palettingState.paletteTextureCache) === null || _a === void 0 ? void 0 : _a.value;
        if (paletteTexture) {
            this.args.SetPalette(paletteTexture);
        }
        this.args.isSmoothColors = this.palettingState.gradientPaletting;
        var _c = this.parentSeries.dataSeries, fifoCapacity = _c.fifoCapacity, fifoSweeping = _c.fifoSweeping, fifoSweepingGap = _c.fifoSweepingGap;
        var fifoStartIndex = pointSeries.fifoStartIndex;
        var isCategoryAxis = renderPassData.xCoordinateCalculator.isCategoryCoordinateCalculator;
        var xValues = pointSeries.xValues;
        var xDrawValues = isCategoryAxis ? pointSeries.indexes : xValues;
        var yDrawValues = pointSeries.yValues;
        // const isSplineMountainSeries =
        //     this.parentSeries.type === ESeriesType.SplineMountainSeries && xValues.size() > 1;
        // if (isSplineMountainSeries) {
        //     const rs = this.parentSeries as any as ISpline;
        //     if (!this.parentSeries.isRunningAnimation) {
        //         rs.updateSplineValues();
        //     }
        //     xDrawValues = rs.xSplineValues;
        //     yDrawValues = rs.ySplineValues;
        // }
        var _d = this.getStartAndCount(
        //isSplineMountainSeries ? undefined : renderPassData,
        renderPassData, xDrawValues), startIndex = _d.startIndex, count = _d.count;
        this.args.count = count;
        this.args.startIndex = startIndex;
        if (fifoSweeping && fifoCapacity === this.parentSeries.dataSeries.count()) {
            this.args.count = fifoStartIndex;
        }
        var nativeContext = renderContext.getNativeContext();
        var viewRect = this.parentSeries.parentSurface.seriesViewRect;
        this.nativeDrawingProvider.DrawPointsVec(nativeContext, xDrawValues, yDrawValues, renderPassData.xCoordinateCalculator.nativeCalculator, renderPassData.yCoordinateCalculator.nativeCalculator, this.args);
        if (fifoSweeping && fifoCapacity === this.parentSeries.dataSeries.count()) {
            this.args.startIndex = Math.min(yDrawValues.size(), fifoStartIndex + fifoSweepingGap);
            this.args.count = Math.max(0, yDrawValues.size() - fifoStartIndex - fifoSweepingGap);
            if (this.args.count > 0) {
                this.nativeDrawingProvider.DrawPointsVec(nativeContext, xDrawValues, yDrawValues, renderPassData.xCoordinateCalculator.nativeCalculator, renderPassData.yCoordinateCalculator.nativeCalculator, this.args);
            }
        }
    };
    /**
     * @inheritDoc
     */
    MountainSeriesDrawingProvider.prototype.onDpiChanged = function (args) {
        _super.prototype.onDpiChanged.call(this, args);
        this.onSeriesPropertyChange(constants_1.PROPERTY.STROKE);
    };
    /**
     * @inheritDoc
     */
    MountainSeriesDrawingProvider.prototype.onSeriesPropertyChange = function (propertyName) {
        _super.prototype.onSeriesPropertyChange.call(this, propertyName);
        if (propertyName === constants_1.PROPERTY.STROKE ||
            propertyName === constants_1.PROPERTY.STROKE_DASH_ARRAY ||
            propertyName === constants_1.PROPERTY.STROKE_THICKNESS ||
            propertyName === constants_1.PROPERTY.OPACITY) {
            this.createPen();
        }
        if (propertyName === constants_1.PROPERTY.FILL ||
            propertyName === constants_1.PROPERTY.OPACITY ||
            propertyName === constants_1.PROPERTY.FILL_LINEAR_GRADIENT) {
            this.createBrush();
        }
    };
    /**
     * @inheritDoc
     */
    MountainSeriesDrawingProvider.prototype.onAttachSeries = function () {
        _super.prototype.onAttachSeries.call(this);
        this.createPen();
        this.createBrush();
    };
    MountainSeriesDrawingProvider.prototype.createBrush = function () {
        this.palettingState.requiresUpdate = true;
        var _a = this.parentSeries, fill = _a.fill, opacity = _a.opacity, fillLinearGradient = _a.fillLinearGradient, parentSurface = _a.parentSurface;
        var textureHeightRatio = (parentSurface === null || parentSurface === void 0 ? void 0 : parentSurface.isCopyCanvasSurface)
            ? parentSurface.domCanvas2D.height / SciChartSurfaceBase_1.SciChartSurfaceBase.domMasterCanvas.height
            : 1;
        var textureWidthRatio = (parentSurface === null || parentSurface === void 0 ? void 0 : parentSurface.isCopyCanvasSurface)
            ? parentSurface.domCanvas2D.width / SciChartSurfaceBase_1.SciChartSurfaceBase.domMasterCanvas.width
            : 1;
        return (0, BrushCache_1.createBrushInCache)(this.fillBrushCache, fill, opacity, textureHeightRatio, textureWidthRatio, fillLinearGradient);
    };
    MountainSeriesDrawingProvider.prototype.createPen = function () {
        var _a = this.parentSeries, stroke = _a.stroke, strokeThickness = _a.strokeThickness, opacity = _a.opacity, strokeDashArray = _a.strokeDashArray;
        this.palettingState.requiresUpdate = true;
        return (0, Pen2DCache_1.createPenInCache)(this.strokePenCache, stroke, strokeThickness, opacity, strokeDashArray);
    };
    return MountainSeriesDrawingProvider;
}(BaseSeriesDrawingProvider_1.BaseSeriesDrawingProvider));
exports.MountainSeriesDrawingProvider = MountainSeriesDrawingProvider;
