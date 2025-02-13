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
exports.BubbleSeriesDrawingProvider = void 0;
var Deleter_1 = require("../../../../Core/Deleter");
var DpiHelper_1 = require("../../TextureManager/DpiHelper");
var BaseSeriesDrawingProvider_1 = require("./BaseSeriesDrawingProvider");
/**
 * Used internally - a drawing provider performs drawing for a {@link FastBubbleRenderableSeries} using
 * our WebAssembly WebGL rendering engine
 */
var BubbleSeriesDrawingProvider = /** @class */ (function (_super) {
    __extends(BubbleSeriesDrawingProvider, _super);
    /**
     * Creates an instance of the {@link BubbleSeriesDrawingProvider}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link FastBubbleRenderableSeries} which this drawing provider is attached to
     */
    function BubbleSeriesDrawingProvider(webAssemblyContext, parentSeries) {
        var _this = _super.call(this, webAssemblyContext, parentSeries) || this;
        _this.nativeDrawingProvider = new _this.webAssemblyContext.SCRTBubbleSeriesDrawingProvider();
        _this.args = new _this.webAssemblyContext.SCRTPointDrawingParams();
        return _this;
    }
    /**
     * @inheritDoc
     */
    BubbleSeriesDrawingProvider.prototype.onSeriesPropertyChange = function (propertyName) {
        // Deliberately empty
    };
    /**
     * @inheritDoc
     */
    BubbleSeriesDrawingProvider.prototype.draw = function (renderContext, renderPassData) {
        var _a;
        var pointMarker = this.parentSeries.pointMarker;
        if (pointMarker === undefined) {
            return;
        }
        var spriteTexture = pointMarker.getSprite();
        var pointSeries = renderPassData.pointSeries;
        var isCategoryAxis = renderPassData.xCoordinateCalculator.isCategoryCoordinateCalculator;
        this.args.Reset();
        var xValues = pointSeries.xValues;
        var yValues = pointSeries.yValues;
        var zValues = pointSeries.zValues;
        var _b = this.getStartAndCount(renderPassData, xValues), startIndex = _b.startIndex, count = _b.count;
        this.args.count = count;
        this.args.startIndex = startIndex;
        var _c = this.parentSeries.dataSeries, fifoCapacity = _c.fifoCapacity, fifoSweeping = _c.fifoSweeping, fifoSweepingGap = _c.fifoSweepingGap;
        var fifoStartIndex = pointSeries.fifoStartIndex;
        if (fifoSweeping && fifoCapacity === this.parentSeries.dataSeries.count()) {
            this.args.count = fifoStartIndex;
        }
        this.args.verticalChart = renderPassData.isVerticalChart;
        this.args.forceShaderMethod = true;
        this.args.SetSpriteTexture(spriteTexture.getTexture());
        // Paletting per point
        _super.prototype.applyStrokeFillPaletting.call(this, this.parentSeries.stroke, undefined, undefined, undefined, this.parentSeries.opacity);
        this.args.SetPalettedColors(this.palettingState.palettedColors);
        this.args.paletteStart = (_a = this.palettingState.paletteStartIndex) !== null && _a !== void 0 ? _a : 0;
        this.args.zMultiplier = this.parentSeries.zMultiplier * DpiHelper_1.DpiHelper.PIXEL_RATIO;
        var xDrawValues = isCategoryAxis ? pointSeries.indexes : xValues;
        var nativeContext = renderContext.getNativeContext();
        this.drawPoints(nativeContext, xDrawValues, yValues, zValues, renderPassData.xCoordinateCalculator.nativeCalculator, renderPassData.yCoordinateCalculator.nativeCalculator, this.args, this.parentSeries.parentSurface.seriesViewRect);
        if (fifoSweeping && fifoCapacity === this.parentSeries.dataSeries.count()) {
            this.args.startIndex = Math.min(yValues.size(), fifoStartIndex + fifoSweepingGap);
            this.args.count = Math.max(0, yValues.size() - fifoStartIndex - fifoSweepingGap);
            if (this.args.count > 0) {
                this.drawPoints(nativeContext, xDrawValues, yValues, zValues, renderPassData.xCoordinateCalculator.nativeCalculator, renderPassData.yCoordinateCalculator.nativeCalculator, this.args, this.parentSeries.parentSurface.seriesViewRect);
            }
        }
    };
    /**
     * @inheritDoc
     */
    BubbleSeriesDrawingProvider.prototype.delete = function () {
        this.nativeDrawingProvider = (0, Deleter_1.deleteSafe)(this.nativeDrawingProvider);
        this.args = (0, Deleter_1.deleteSafe)(this.args);
        _super.prototype.delete.call(this);
    };
    BubbleSeriesDrawingProvider.prototype.overridePaletteProviderColors = function (rs, xValue, yValue, index, opacity, metadata) {
        if (rs.hasPointMarkerPaletteProvider()) {
            var pointMarkerPaletteProvider = rs.paletteProvider;
            var colors = pointMarkerPaletteProvider.overridePointMarkerArgb(xValue, yValue, index, opacity, metadata);
            if (colors)
                return colors;
        }
        return { stroke: undefined, fill: undefined };
    };
    BubbleSeriesDrawingProvider.prototype.isGradientFillPaletting = function (rs) {
        return false;
    };
    BubbleSeriesDrawingProvider.prototype.drawPoints = function (nativeContext, xValues, yValues, zValues, xCoordCalc, yCoordCalc, args, viewRect) {
        this.nativeDrawingProvider.DrawPointsVec(nativeContext, xValues, yValues, zValues, xCoordCalc, yCoordCalc, args);
    };
    return BubbleSeriesDrawingProvider;
}(BaseSeriesDrawingProvider_1.BaseSeriesDrawingProvider));
exports.BubbleSeriesDrawingProvider = BubbleSeriesDrawingProvider;
