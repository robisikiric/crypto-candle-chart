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
exports.UniformHeatmapDrawingProvider = void 0;
var app_1 = require("../../../../constants/app");
var Deleter_1 = require("../../../../Core/Deleter");
var Guard_1 = require("../../../../Core/Guard");
var TextureCache_1 = require("../../../Drawing/TextureCache");
var CanvasTexture_1 = require("../../TextureManager/CanvasTexture");
var BaseHeatmapRenderableSeries_1 = require("../BaseHeatmapRenderableSeries");
var constants_1 = require("../constants");
var BaseSeriesDrawingProvider_1 = require("./BaseSeriesDrawingProvider");
/**
 * Used internally - a drawing provider performs drawing for a {@link UniformHeatmapRenderableSeries} using
 * our WebAssembly WebGL rendering engine
 */
var UniformHeatmapDrawingProvider = /** @class */ (function (_super) {
    __extends(UniformHeatmapDrawingProvider, _super);
    /**
     * Creates an instance of the {@link UniformHeatmapDrawingProvider}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link UniformHeatmapRenderableSeries} which this drawing provider is attached to
     */
    function UniformHeatmapDrawingProvider(webAssemblyContext, parentSeries) {
        var _this = _super.call(this, webAssemblyContext, parentSeries) || this;
        _this.heatTextureCache = new TextureCache_1.TextureCache(webAssemblyContext);
        _this.recreatePalette();
        _this.onSeriesPropertyChange(constants_1.PROPERTY.DATA_SERIES);
        _this.onSeriesPropertyChange(constants_1.PROPERTY.COLOR_MAP);
        return _this;
    }
    /**
     * @inheritDoc
     */
    UniformHeatmapDrawingProvider.prototype.delete = function () {
        this.paletteTexture = (0, Deleter_1.deleteSafe)(this.paletteTexture);
        this.heatTextureCache = (0, Deleter_1.deleteSafe)(this.heatTextureCache);
        _super.prototype.delete.call(this);
    };
    /**
     * @inheritDoc
     */
    UniformHeatmapDrawingProvider.prototype.onSeriesPropertyChange = function (propertyName) {
        var recreatePalette = propertyName === constants_1.PROPERTY.COLOR_MAP ||
            propertyName.includes(BaseHeatmapRenderableSeries_1.COLOR_MAP_PREFIX) ||
            propertyName === constants_1.PROPERTY.OPACITY;
        var recreateHeat = propertyName === constants_1.PROPERTY.DATA_SERIES || propertyName === constants_1.PROPERTY.USE_LINEAR_TEXTURE_FILTERING;
        if (recreatePalette) {
            this.recreatePalette();
        }
        if (recreateHeat) {
            var dataSeries = this.parentSeries.dataSeries;
            var heatmapDataSeries = this.parentSeries;
            var useInterpolation = heatmapDataSeries.useLinearTextureFiltering;
            if (dataSeries) {
                // create heat texture at same size as the dataSeries array
                var heatTexture = this.heatTextureCache.create(dataSeries.arrayWidth, dataSeries.arrayHeight, this.webAssemblyContext.eTSRTextureFormat.TSR_TEXTUREFORMAT_R32F);
                // Set whether to use interpolation for the Heatmap or not
                this.webAssemblyContext.SCRTSetTextureLinearSamplerEnabled(heatTexture, useInterpolation);
            }
        }
    };
    UniformHeatmapDrawingProvider.prototype.seriesHasDataChanges = function () {
        this.onSeriesPropertyChange(constants_1.PROPERTY.DATA_SERIES);
    };
    /**
     * @inheritDoc
     */
    UniformHeatmapDrawingProvider.prototype.draw = function (renderContext, renderPassData) {
        // DEBUG CODE: REMOVE AFTER PALETTING ISSUE FIXED
        // console.log("Drawing heatmap!");
        // if (this.paletteTexture) {
        //     renderContext.getNativeContext().DrawTexture(this.paletteTexture.getTexture(), 0, 0, 256, 10);
        // }
        // END DEBUG CODE
        var _a;
        var isVerticalChart = renderPassData.isVerticalChart;
        // TODO: refactor inverted logic with hasFlippedCoordinates!!!
        // The logic is inverted here :)
        var hasFlippedXCoordinates = !renderPassData.xCoordinateCalculator.hasFlippedCoordinates;
        var hasFlippedYCoordinates = renderPassData.yCoordinateCalculator.hasFlippedCoordinates;
        var heatTexture = (_a = this.heatTextureCache) === null || _a === void 0 ? void 0 : _a.value;
        if (heatTexture) {
            var dataSeries = this.parentSeries.dataSeries;
            var zValuesVector = dataSeries.getNormalizedVector(this.parentSeries.colorMap, this.parentSeries.fillValuesOutOfRange);
            this.packedFloatParams = this.webAssemblyContext.SCRTFillTextureFloat32(heatTexture, dataSeries.arrayWidth, dataSeries.arrayHeight, zValuesVector);
            this.packedFloatParams.x = 0;
            this.packedFloatParams.y = 1;
            // DEBUG CODE: REMOVE AFTER DEVELOPMENT COMPLETE
            // renderContext.getNativeContext().DrawTexture(heatTexture, 10, 100, 256, 256);
            // renderContext.getNativeContext().DrawTexture(this.paletteTexture.getTexture(), 310, 100, 256, 256);
            // END DEBUG CODE
            var xRange = dataSeries.xRange;
            var yRange = dataSeries.yRange;
            var xMin = renderPassData.xCoordinateCalculator.getCoordinate(xRange.min);
            var yMin = renderPassData.yCoordinateCalculator.getCoordinate(yRange.min);
            var xMax = renderPassData.xCoordinateCalculator.getCoordinate(xRange.max);
            var yMax = renderPassData.yCoordinateCalculator.getCoordinate(yRange.max);
            var nativeContext = renderContext.getNativeContext();
            var viewRect = this.parentSeries.parentSurface.seriesViewRect;
            var textureWidth = Math.abs(xMin - xMax);
            if (isVerticalChart) {
                nativeContext.PushMatrix();
                nativeContext.PushState();
                nativeContext.Rotate(-90);
                var xTrans = hasFlippedXCoordinates ? -xMin : -textureWidth - xMin;
                nativeContext.Translate(xTrans, 0);
                var x = hasFlippedXCoordinates ? 0 : textureWidth;
                var width = hasFlippedXCoordinates ? textureWidth : 0;
                var y = yMin;
                var height = yMax;
                this.drawHeatmap(nativeContext, x, y, width, height);
                // Maybe to use nativeContext.Scale(-1, 1);???
                nativeContext.PopMatrix();
                nativeContext.PopState();
            }
            else {
                this.drawHeatmap(nativeContext, xMin, yMin, xMax, yMax);
            }
        }
    };
    UniformHeatmapDrawingProvider.prototype.createPaletteTexture = function (width, height, gradientStops, globalOpacity, hasNaNs) {
        if (app_1.IS_TEST_ENV) {
            return undefined;
        }
        Guard_1.Guard.isTrue(width > 0, "width must be greater than 0");
        Guard_1.Guard.isTrue(height > 0, "height must be greater than 0");
        Guard_1.Guard.notNull(gradientStops, "gradientStops");
        var canvasTexture = new CanvasTexture_1.CanvasTexture(this.webAssemblyContext, width, height);
        canvasTexture.clear();
        var ctx = canvasTexture.getContext();
        // Add transparent line for NaNs
        if (hasNaNs) {
            ctx.fillStyle = "#ffffff00";
            ctx.fillRect(0, 0, 1, height);
        }
        // BEGIN: Drawing gradient rectangle on canvas2D
        var x1 = 0;
        var y1 = 0;
        var x2 = width;
        var y2 = 0;
        var gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradientStops.forEach(function (el) {
            gradient.addColorStop(el.offset, el.color);
        });
        ctx.fillStyle = gradient;
        ctx.globalAlpha = globalOpacity;
        var xStartForGradient = hasNaNs ? 1 : 0;
        ctx.fillRect(xStartForGradient, 0, width, height);
        // END: Drawing gradient rectangle on canvas2D
        canvasTexture.copyTexture();
        return canvasTexture;
    };
    UniformHeatmapDrawingProvider.prototype.recreatePalette = function () {
        var _a, _b;
        // TODO comsoder using generic solution for memoization
        var hasNaNs = (_a = this.parentSeries.dataSeries) === null || _a === void 0 ? void 0 : _a.hasNaNs;
        // check if palette texture should be recreated
        if (this.hasNaNs === hasNaNs &&
            this.opacity === this.parentSeries.opacity &&
            this.gradientStops === ((_b = this.parentSeries.colorMap) === null || _b === void 0 ? void 0 : _b.gradientStops)) {
            return;
        }
        this.paletteTexture = (0, Deleter_1.deleteSafe)(this.paletteTexture);
        if (this.parentSeries.colorMap && this.parentSeries.colorMap.gradientStops) {
            this.hasNaNs = hasNaNs;
            this.opacity = this.parentSeries.opacity;
            this.gradientStops = this.parentSeries.colorMap.gradientStops;
            // console.log("Creating palette texture");
            // create palette texture at size 256x1
            this.paletteTexture = this.createPaletteTexture(256, 1, this.parentSeries.colorMap.gradientStops, this.parentSeries.opacity, hasNaNs);
        }
    };
    UniformHeatmapDrawingProvider.prototype.drawHeatmap = function (nativeContext, x, y, width, height) {
        // Draw the heatmap at the specified locations
        // TODO: figure out what todo with this TSRVector4
        var v4 = this.packedFloatParams;
        var contourParams = new this.webAssemblyContext.SCRTContourParams();
        var heatTexture = this.heatTextureCache.value;
        this.recreatePalette();
        // nativeContext.DrawHeatmapRect(this.paletteTexture.getTexture(), heatTexture, x, y, width, height, v4);
        nativeContext.DrawHeatmapRectWithContours(this.paletteTexture.getTexture(), // this.paletteTexture.getTexture
        heatTexture, x, y, width, height, v4, contourParams);
        contourParams.delete();
        v4.delete();
    };
    return UniformHeatmapDrawingProvider;
}(BaseSeriesDrawingProvider_1.BaseSeriesDrawingProvider));
exports.UniformHeatmapDrawingProvider = UniformHeatmapDrawingProvider;
