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
exports.OhlcSeriesDrawingProvider = exports.EOhlcDrawingMode = void 0;
var Deleter_1 = require("../../../../Core/Deleter");
var BrushCache_1 = require("../../../Drawing/BrushCache");
var Pen2DCache_1 = require("../../../Drawing/Pen2DCache");
var constants_1 = require("../constants");
var BaseSeriesDrawingProvider_1 = require("./BaseSeriesDrawingProvider");
var EOhlcDrawingMode;
(function (EOhlcDrawingMode) {
    EOhlcDrawingMode["Candles"] = "Candles";
    EOhlcDrawingMode["Ohlc"] = "Ohlc";
})(EOhlcDrawingMode = exports.EOhlcDrawingMode || (exports.EOhlcDrawingMode = {}));
/**
 * Used internally - a drawing provider performs drawing for a {@link FastOhlcRenderableSeries} using
 * our WebAssembly WebGL rendering engine
 */
var OhlcSeriesDrawingProvider = /** @class */ (function (_super) {
    __extends(OhlcSeriesDrawingProvider, _super);
    /**
     * Creates an instance of the {@link OhlcSeriesDrawingProvider}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link FastOhlcRenderableSeries} which this drawing provider is attached to
     * @param drawingMode the drawing mode {@link EOhlcDrawingMode}
     */
    function OhlcSeriesDrawingProvider(webAssemblyContext, parentSeries, drawingMode) {
        var _this = _super.call(this, webAssemblyContext, parentSeries) || this;
        _this.drawingMode = drawingMode;
        _this.nativeDrawingProvider = new _this.webAssemblyContext.SCRTCandlestickSeriesDrawingProvider();
        _this.args = new _this.webAssemblyContext.SCRTOhlcDrawingParams();
        var strokeThickness = parentSeries.strokeThickness, strokeUp = parentSeries.strokeUp, strokeDown = parentSeries.strokeDown, opacity = parentSeries.opacity;
        var candlestickSeries = parentSeries;
        _this.strokeUpPenCache = new Pen2DCache_1.Pen2DCache(webAssemblyContext);
        _this.strokeDownPenCache = new Pen2DCache_1.Pen2DCache(webAssemblyContext);
        _this.brushUpCache = new BrushCache_1.BrushCache(webAssemblyContext);
        _this.brushDownCache = new BrushCache_1.BrushCache(webAssemblyContext);
        (0, Pen2DCache_1.createPenInCache)(_this.strokeUpPenCache, strokeUp, strokeThickness, opacity);
        (0, Pen2DCache_1.createPenInCache)(_this.strokeDownPenCache, strokeDown, strokeThickness, opacity);
        if (candlestickSeries.brushUp) {
            (0, BrushCache_1.createBrushInCache)(_this.brushUpCache, candlestickSeries.brushUp, opacity);
        }
        if (candlestickSeries.brushDown) {
            (0, BrushCache_1.createBrushInCache)(_this.brushDownCache, candlestickSeries.brushDown, opacity);
        }
        return _this;
    }
    /**
     * @inheritDoc
     */
    OhlcSeriesDrawingProvider.prototype.onDpiChanged = function (args) {
        _super.prototype.onDpiChanged.call(this, args);
        this.onSeriesPropertyChange(constants_1.PROPERTY.STROKE_UP);
        this.onSeriesPropertyChange(constants_1.PROPERTY.STROKE_DOWN);
    };
    /**
     * @inheritDoc
     */
    OhlcSeriesDrawingProvider.prototype.onSeriesPropertyChange = function (propertyName) {
        _super.prototype.onSeriesPropertyChange.call(this, propertyName);
        var _a = this.parentSeries, strokeThickness = _a.strokeThickness, strokeUp = _a.strokeUp, strokeDown = _a.strokeDown, opacity = _a.opacity;
        if (propertyName === constants_1.PROPERTY.STROKE_UP ||
            propertyName === constants_1.PROPERTY.STROKE_THICKNESS ||
            propertyName === constants_1.PROPERTY.OPACITY) {
            (0, Pen2DCache_1.createPenInCache)(this.strokeUpPenCache, strokeUp, strokeThickness, opacity);
        }
        if (propertyName === constants_1.PROPERTY.STROKE_DOWN ||
            propertyName === constants_1.PROPERTY.STROKE_THICKNESS ||
            propertyName === constants_1.PROPERTY.OPACITY) {
            (0, Pen2DCache_1.createPenInCache)(this.strokeDownPenCache, strokeDown, strokeThickness, opacity);
        }
        var candlestickSeries = this.parentSeries;
        if (propertyName === constants_1.PROPERTY.BRUSH_DOWN || propertyName === constants_1.PROPERTY.OPACITY) {
            (0, BrushCache_1.createBrushInCache)(this.brushDownCache, candlestickSeries === null || candlestickSeries === void 0 ? void 0 : candlestickSeries.brushDown, opacity);
        }
        if (propertyName === constants_1.PROPERTY.BRUSH_UP || propertyName === constants_1.PROPERTY.OPACITY) {
            (0, BrushCache_1.createBrushInCache)(this.brushUpCache, candlestickSeries === null || candlestickSeries === void 0 ? void 0 : candlestickSeries.brushUp, opacity);
        }
    };
    /**
     * @inheritDoc
     */
    OhlcSeriesDrawingProvider.prototype.draw = function (renderContext, renderPassData) {
        var pointSeries = renderPassData.pointSeries;
        this.args.Reset();
        // Candles only requires brush up, down
        if (this.drawingMode === EOhlcDrawingMode.Candles) {
            var brushUp = (0, BrushCache_1.getScrtBrushFromCache)(this.brushUpCache);
            var brushDown = (0, BrushCache_1.getScrtBrushFromCache)(this.brushDownCache);
            if (!brushUp || !brushDown) {
                return;
            }
            this.args.SetBrushes(brushUp, brushDown);
        }
        var strokeUpPen = (0, Pen2DCache_1.getScrtPenFromCache)(this.strokeUpPenCache);
        var strokeDownPen = (0, Pen2DCache_1.getScrtPenFromCache)(this.strokeDownPenCache);
        // OHLC and Candle both require stroke up, down
        if (!strokeUpPen || !strokeDownPen) {
            return;
        }
        this.args.SetPens(strokeUpPen, strokeDownPen);
        // Paletting per point
        var neutralColor = "#ffffffff";
        _super.prototype.applyStrokeFillPaletting.call(this, neutralColor, undefined, neutralColor, undefined, this.parentSeries.opacity);
        this.args.SetPalettedColors(this.palettingState.palettedColors);
        this.args.forceShaderMethod = true;
        this.args.verticalChart = renderPassData.isVerticalChart;
        this.args.candleWidth = this.parentSeries.getDataPointWidth(renderPassData.xCoordinateCalculator, this.parentSeries.dataPointWidth, this.parentSeries.dataPointWidthMode);
        this.args.drawAsOhlc = this.drawingMode === EOhlcDrawingMode.Ohlc;
        var nativeContext = renderContext.getNativeContext();
        var viewRect = this.parentSeries.parentSurface.seriesViewRect;
        var dataSeries = this.parentSeries.dataSeries;
        var isCategoryAxis = renderPassData.xCoordinateCalculator.isCategoryCoordinateCalculator;
        var xValues = pointSeries.xValues;
        var openValues = pointSeries.openValues;
        var highValues = pointSeries.highValues;
        var lowValues = pointSeries.lowValues;
        var closeValues = pointSeries.closeValues;
        var _a = this.getStartAndCount(renderPassData, xValues), startIndex = _a.startIndex, count = _a.count;
        this.args.count = count;
        this.args.startIndex = startIndex;
        var _b = this.parentSeries.dataSeries, fifoCapacity = _b.fifoCapacity, fifoSweeping = _b.fifoSweeping, fifoSweepingGap = _b.fifoSweepingGap;
        var fifoStartIndex = pointSeries.fifoStartIndex;
        if (fifoSweeping && fifoCapacity === this.parentSeries.dataSeries.count()) {
            this.args.count = fifoStartIndex;
        }
        // let sx = "";
        // let sy = "";
        // for (let i = 0; i < closeValues.size(); i++) {
        //     sx += pointSeries.indexes.get(i) + ",";
        //     sy += closeValues.get(i).toFixed(2) + ",";
        // }
        // console.log(sx);
        // console.log(sy);
        var xDrawValues = isCategoryAxis ? pointSeries.indexes : xValues;
        this.args.SetValues(xDrawValues, openValues, highValues, lowValues, closeValues);
        this.nativeDrawingProvider.DrawPointsVec(nativeContext, renderPassData.xCoordinateCalculator.nativeCalculator, renderPassData.yCoordinateCalculator.nativeCalculator, this.args);
        if (fifoSweeping && fifoCapacity === this.parentSeries.dataSeries.count()) {
            this.args.startIndex = Math.min(closeValues.size(), fifoStartIndex + fifoSweepingGap);
            this.args.count = Math.max(0, closeValues.size() - fifoStartIndex - fifoSweepingGap);
            if (this.args.count > 0) {
                this.nativeDrawingProvider.DrawPointsVec(nativeContext, renderPassData.xCoordinateCalculator.nativeCalculator, renderPassData.yCoordinateCalculator.nativeCalculator, this.args);
            }
        }
    };
    /**
     * @inheritDoc
     */
    OhlcSeriesDrawingProvider.prototype.delete = function () {
        this.strokeDownPenCache = (0, Deleter_1.deleteSafe)(this.strokeDownPenCache);
        this.strokeUpPenCache = (0, Deleter_1.deleteSafe)(this.strokeUpPenCache);
        this.brushUpCache = (0, Deleter_1.deleteSafe)(this.brushUpCache);
        this.brushDownCache = (0, Deleter_1.deleteSafe)(this.brushDownCache);
        this.nativeDrawingProvider = (0, Deleter_1.deleteSafe)(this.nativeDrawingProvider);
        this.args = (0, Deleter_1.deleteSafe)(this.args);
        _super.prototype.delete.call(this);
    };
    return OhlcSeriesDrawingProvider;
}(BaseSeriesDrawingProvider_1.BaseSeriesDrawingProvider));
exports.OhlcSeriesDrawingProvider = OhlcSeriesDrawingProvider;
