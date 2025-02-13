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
exports.LineSeriesDrawingProvider = void 0;
var Deleter_1 = require("../../../../Core/Deleter");
var Pen2DCache_1 = require("../../../Drawing/Pen2DCache");
var WebGlRenderContext2D_1 = require("../../../Drawing/WebGlRenderContext2D");
var BaseLineRenderableSeries_1 = require("../BaseLineRenderableSeries");
var constants_1 = require("../constants");
var BaseSeriesDrawingProvider_1 = require("./BaseSeriesDrawingProvider");
/**
 * Used internally - a drawing provider performs drawing for a {@link FastLineRenderableSeries} using
 * our WebAssembly WebGL rendering engine
 */
var LineSeriesDrawingProvider = /** @class */ (function (_super) {
    __extends(LineSeriesDrawingProvider, _super);
    /**
     * Creates an instance of the {@link LineSeriesDrawingProvider}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link FastLineRenderableSeries} which this drawing provider is attached to
     */
    function LineSeriesDrawingProvider(webAssemblyContext, parentSeries, ySelector, xSelector) {
        var _this = _super.call(this, webAssemblyContext, parentSeries, ySelector, xSelector) || this;
        _this.linesPenCache = new Pen2DCache_1.Pen2DCache(webAssemblyContext);
        _this.args = new webAssemblyContext.SCRTLineDrawingParams();
        return _this;
    }
    /**
     * @inheritDoc
     */
    LineSeriesDrawingProvider.prototype.onDpiChanged = function (args) {
        _super.prototype.onDpiChanged.call(this, args);
        this.onSeriesPropertyChange(constants_1.PROPERTY.STROKE);
    };
    /**
     * @inheritDoc
     */
    LineSeriesDrawingProvider.prototype.onSeriesPropertyChange = function (propertyName) {
        _super.prototype.onSeriesPropertyChange.call(this, propertyName);
        if (propertyName === constants_1.PROPERTY.PALETTE_PROVIDER) {
            this.linesPenCache.invalidateCache();
        }
        if (propertyName === constants_1.PROPERTY.STROKE ||
            propertyName === constants_1.PROPERTY.STROKE_THICKNESS ||
            propertyName === constants_1.PROPERTY.PALETTE_PROVIDER ||
            propertyName === constants_1.PROPERTY.OPACITY ||
            propertyName === constants_1.PROPERTY.STROKE_DASH_ARRAY) {
            this.palettingState.requiresUpdate = true;
            var _a = this.getProperties(this.parentSeries), stroke = _a.stroke, strokeThickness = _a.strokeThickness, opacity = _a.opacity, strokeDashArray = _a.strokeDashArray;
            if (stroke) {
                (0, Pen2DCache_1.createPenInCache)(this.linesPenCache, stroke, strokeThickness, opacity !== null && opacity !== void 0 ? opacity : 1, strokeDashArray);
            }
        }
    };
    /** A mapping function to get the pen properties from the parent series */
    LineSeriesDrawingProvider.prototype.getProperties = function (parentSeries) {
        var stroke = parentSeries.stroke, strokeThickness = parentSeries.strokeThickness, opacity = parentSeries.opacity, strokeDashArray = parentSeries.strokeDashArray, isDigitalLine = parentSeries.isDigitalLine, drawNaNAs = parentSeries.drawNaNAs, lineType = parentSeries.lineType;
        return {
            stroke: stroke,
            strokeThickness: strokeThickness,
            opacity: opacity,
            strokeDashArray: strokeDashArray,
            isDigitalLine: isDigitalLine,
            drawNaNAs: drawNaNAs,
            lineType: lineType,
            containsNaN: undefined
        };
    };
    /**
     * @inheritDoc
     */
    LineSeriesDrawingProvider.prototype.onAttachSeries = function () {
        _super.prototype.onAttachSeries.call(this);
        this.nativeDrawingProvider = new this.webAssemblyContext.SCRTLineSeriesDrawingProvider();
        var _a = this.getProperties(this.parentSeries), stroke = _a.stroke, strokeThickness = _a.strokeThickness, opacity = _a.opacity, strokeDashArray = _a.strokeDashArray;
        if (stroke) {
            (0, Pen2DCache_1.createPenInCache)(this.linesPenCache, stroke, strokeThickness, opacity !== null && opacity !== void 0 ? opacity : 1, strokeDashArray);
        }
    };
    /**
     * @inheritDoc
     */
    LineSeriesDrawingProvider.prototype.onDetachSeries = function () {
        _super.prototype.onDetachSeries.call(this);
        this.nativeDrawingProvider = (0, Deleter_1.deleteSafe)(this.nativeDrawingProvider);
    };
    /**
     * @inheritDoc
     */
    LineSeriesDrawingProvider.prototype.draw = function (renderContext, renderPassData) {
        var _a;
        var _b = this.getProperties(this.parentSeries), stroke = _b.stroke, isDigitalLine = _b.isDigitalLine, lineType = _b.lineType, drawNaNAs = _b.drawNaNAs, containsNaNOverride = _b.containsNaN;
        var linesPen = (0, Pen2DCache_1.getScrtPenFromCache)(this.linesPenCache);
        if (!linesPen || !stroke) {
            return;
        }
        var pointSeries = renderPassData.pointSeries;
        var containsNaN = this.parentSeries.dataSeries.dataDistributionCalculator.containsNaN;
        containsNaN = containsNaNOverride !== null && containsNaNOverride !== void 0 ? containsNaNOverride : containsNaN;
        this.args.Reset();
        this.args.SetLinesPen(linesPen);
        this.args.isDigitalLine = isDigitalLine || lineType !== BaseLineRenderableSeries_1.ELineType.Normal;
        this.args.drawDigitalVertical = lineType !== BaseLineRenderableSeries_1.ELineType.DigitalNoEdge;
        this.args.digitalYX = lineType === BaseLineRenderableSeries_1.ELineType.DigitalYX;
        this.args.forceShaderMethod = true;
        this.args.containsNaN = containsNaN;
        this.args.forceClamp = !this.args.isDigitalLine;
        this.args.lineGaps = containsNaN
            ? drawNaNAs === WebGlRenderContext2D_1.ELineDrawMode.DiscontinuousLine
                ? this.webAssemblyContext.SCRTLineGapMode.DrawGaps
                : this.webAssemblyContext.SCRTLineGapMode.CloseGaps
            : this.webAssemblyContext.SCRTLineGapMode.Default;
        this.args.verticalChart = renderPassData.isVerticalChart;
        var isCategoryAxis = renderPassData.xCoordinateCalculator.isCategoryCoordinateCalculator;
        var _c = this.parentSeries.dataSeries, fifoCapacity = _c.fifoCapacity, fifoSweeping = _c.fifoSweeping, fifoSweepingGap = _c.fifoSweepingGap;
        var fifoStartIndex = pointSeries.fifoStartIndex;
        var xValues = this.xSelector(pointSeries);
        var xDrawValues = isCategoryAxis ? pointSeries.indexes : xValues;
        var yDrawValues = this.ySelector(pointSeries);
        // const isSplineLineSeries = this.parentSeries.type === ESeriesType.SplineLineSeries && xValues.size() > 1;
        // if (isSplineLineSeries) {
        //     const spline = this.parentSeries as any as ISpline;
        //     // If animation is running we animate between two interpolated vectors and do not want to update spline
        //     if (!this.parentSeries.isRunningAnimation) {
        //         spline.updateSplineValues();
        //     }
        //     xDrawValues = spline.xSplineValues;
        //     yDrawValues = spline.ySplineValues;
        // }
        var _d = this.getStartAndCount(
        //isSplineLineSeries ? undefined : renderPassData,
        renderPassData, xDrawValues), startIndex = _d.startIndex, count = _d.count;
        this.args.count = count;
        this.args.startIndex = startIndex;
        //logDoubleVector(xDrawValues, "xValues");
        //logDoubleVector(yDrawValues, "yValues");
        //console.log(renderPassData.indexRange, yDrawValues.size(), this.args.count);
        if (fifoSweeping && fifoCapacity === this.parentSeries.dataSeries.count()) {
            this.args.count = fifoStartIndex;
        }
        // Stroke paletting per point
        this.applyStrokePaletting(linesPen, renderPassData);
        if (this.palettingState.palettedColors) {
            this.args.SetPalettedColors(this.palettingState.palettedColors);
            this.args.paletteStart = (_a = this.palettingState.paletteStartIndex) !== null && _a !== void 0 ? _a : 0;
        }
        var nativeContext = renderContext.getNativeContext();
        this.drawLines(renderContext, nativeContext, xDrawValues, yDrawValues, renderPassData.xCoordinateCalculator.nativeCalculator, renderPassData.yCoordinateCalculator.nativeCalculator, this.args, this.parentSeries.parentSurface.seriesViewRect);
        if (fifoSweeping && fifoCapacity === this.parentSeries.dataSeries.count()) {
            this.args.startIndex = Math.min(yDrawValues.size(), fifoStartIndex + fifoSweepingGap);
            this.args.count = Math.max(0, yDrawValues.size() - fifoStartIndex - fifoSweepingGap);
            // const last = this.args.startIndex + this.args.count - 1;
            // console.log(2, this.args.startIndex, this.args.count, last, xDrawValues.size());
            // console.log(xDrawValues.get(last - 2), xDrawValues.get(last - 1), xDrawValues.get(last));
            if (this.args.count > 0) {
                this.drawLines(renderContext, nativeContext, xDrawValues, yDrawValues, renderPassData.xCoordinateCalculator.nativeCalculator, renderPassData.yCoordinateCalculator.nativeCalculator, this.args, this.parentSeries.parentSurface.seriesViewRect);
            }
        }
    };
    /**
     * @inheritDoc
     */
    LineSeriesDrawingProvider.prototype.delete = function () {
        this.linesPenCache = (0, Deleter_1.deleteSafe)(this.linesPenCache);
        this.nativeDrawingProvider = (0, Deleter_1.deleteSafe)(this.nativeDrawingProvider);
        this.args = (0, Deleter_1.deleteSafe)(this.args);
        _super.prototype.delete.call(this);
    };
    LineSeriesDrawingProvider.prototype.drawLines = function (renderContext, nativeContext, xValues, yValues, xCoordCalc, yCoordCalc, args, viewRect) {
        this.nativeDrawingProvider.DrawLinesVec(nativeContext, xValues, yValues, xCoordCalc, yCoordCalc, args);
    };
    return LineSeriesDrawingProvider;
}(BaseSeriesDrawingProvider_1.BaseSeriesDrawingProvider));
exports.LineSeriesDrawingProvider = LineSeriesDrawingProvider;
