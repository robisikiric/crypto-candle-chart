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
exports.UniformContoursDrawingProvider = void 0;
var app_1 = require("../../../../constants/app");
var Deleter_1 = require("../../../../Core/Deleter");
var Guard_1 = require("../../../../Core/Guard");
var parseColor_1 = require("../../../../utils/parseColor");
var TextureCache_1 = require("../../../Drawing/TextureCache");
var NativeObject_1 = require("../../Helpers/NativeObject");
var CanvasTexture_1 = require("../../TextureManager/CanvasTexture");
var BaseHeatmapRenderableSeries_1 = require("../BaseHeatmapRenderableSeries");
var constants_1 = require("../constants");
var BaseSeriesDrawingProvider_1 = require("./BaseSeriesDrawingProvider");
/**
 * Used internally - a drawing provider performs drawing for a {@link UniformContoursDrawingProvider} using
 * our WebAssembly WebGL rendering engine
 */
var UniformContoursDrawingProvider = /** @class */ (function (_super) {
    __extends(UniformContoursDrawingProvider, _super);
    /**
     * Creates an instance of the {@link UniformContoursRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link UniformContoursDrawingProvider} which this drawing provider is attached to
     */
    function UniformContoursDrawingProvider(webAssemblyContext, parentSeries) {
        var _this = _super.call(this, webAssemblyContext, parentSeries) || this;
        _this.heightsTextureCache = new TextureCache_1.TextureCache(webAssemblyContext);
        _this.onSeriesPropertyChange(constants_1.PROPERTY.DATA_SERIES);
        _this.onSeriesPropertyChange(constants_1.PROPERTY.COLOR_MAP);
        return _this;
    }
    /**
     * @inheritDoc
     */
    UniformContoursDrawingProvider.prototype.delete = function () {
        this.heightsTextureCache = (0, Deleter_1.deleteSafe)(this.heightsTextureCache);
        this.heightData = (0, Deleter_1.deleteSafe)(this.heightData);
        this.paletteTexture = (0, Deleter_1.deleteSafe)(this.paletteTexture);
        _super.prototype.delete.call(this);
    };
    /**
     * @inheritDoc
     */
    UniformContoursDrawingProvider.prototype.onSeriesPropertyChange = function (propertyName) {
        var recreatePalette = propertyName === constants_1.PROPERTY.COLOR_MAP || propertyName.includes(BaseHeatmapRenderableSeries_1.COLOR_MAP_PREFIX);
        var recreateHeightmap = propertyName === constants_1.PROPERTY.DATA_SERIES;
        if (recreatePalette) {
            // DrawHeatmapRectWithContours("Delete/recreating paletteTexture");
            this.paletteTexture = (0, Deleter_1.deleteSafe)(this.paletteTexture);
            if (this.parentSeries.colorMap && this.parentSeries.colorMap.gradientStops) {
                // create palette texture at size 256x1
                this.paletteTexture = this.createPaletteTexture(256, 1, this.parentSeries.colorMap.gradientStops);
            }
            else {
                this.paletteTexture = this.createPaletteTexture(256, 1, undefined);
            }
        }
        if (recreateHeightmap) {
            // console.log("Delete/recreating heightmap texture");
            var dataSeries = this.parentSeries.dataSeries;
            if (dataSeries) {
                // create heightmap texture at same size as the dataSeries array
                var heightsTexture = this.heightsTextureCache.create(dataSeries.arrayWidth, dataSeries.arrayHeight, this.webAssemblyContext.eTSRTextureFormat.TSR_TEXTUREFORMAT_R32F);
                // Set whether to use interpolation for the Heatmap or not
                this.webAssemblyContext.SCRTSetTextureLinearSamplerEnabled(heightsTexture, true);
            }
        }
    };
    /**
     * @inheritDoc
     */
    UniformContoursDrawingProvider.prototype.draw = function (renderContext, renderPassData) {
        var _this = this;
        var _a, _b;
        var heightsTexture = (_a = this.heightsTextureCache) === null || _a === void 0 ? void 0 : _a.value;
        if (heightsTexture) {
            var dataSeries = this.parentSeries.dataSeries;
            this.webAssemblyContext.SCRTFillTextureFloat32(heightsTexture, dataSeries.arrayWidth, dataSeries.arrayHeight, dataSeries.getNormalizedVector((_b = this.parentSeries.colorMap) !== null && _b !== void 0 ? _b : this.getDefaultColorMap(dataSeries)));
            // DEBUG CODE: REMOVE AFTER DEVELOPMENT COMPLETE
            // renderContext.getNativeContext().DrawTexture(this.heightsTexture, 10, 100, 256, 256);
            // renderContext.getNativeContext().DrawTexture(this.paletteTexture.getTexture(), 310, 100, 256, 256);
            // END DEBUG CODE
            var cParams_1 = this.parentSeries.getContourDrawingParams();
            var isVerticalChart = renderPassData.isVerticalChart;
            var x_1 = renderPassData.xCoordinateCalculator.getCoordinate(cParams_1.xMin);
            var y_1 = renderPassData.yCoordinateCalculator.getCoordinate(cParams_1.yMin);
            var width_1 = renderPassData.xCoordinateCalculator.getCoordinate(cParams_1.xMax);
            var height_1 = renderPassData.yCoordinateCalculator.getCoordinate(cParams_1.yMax);
            var textureWidth = Math.abs(x_1 - width_1);
            var drawContours = function () {
                if (_this.parentSeries.minorsPerMajor > 0) {
                    _this.drawContours(renderContext, x_1, y_1, width_1, height_1, cParams_1.zMin, cParams_1.zMax, cParams_1.minorStepZ, cParams_1.minorLineStyle);
                }
                _this.drawContours(renderContext, x_1, y_1, width_1, height_1, cParams_1.zMin, cParams_1.zMax, cParams_1.majorStepZ, cParams_1.majorLineStyle);
            };
            if (isVerticalChart) {
                var nativeContext = renderContext.getNativeContext();
                var hasFlippedXCoordinates = renderPassData.xCoordinateCalculator.hasFlippedCoordinates;
                nativeContext.PushMatrix();
                nativeContext.PushState();
                nativeContext.Rotate(-90);
                var xTrans = hasFlippedXCoordinates ? -textureWidth - x_1 : -x_1;
                nativeContext.Translate(xTrans, 0);
                x_1 = hasFlippedXCoordinates ? textureWidth : 0;
                width_1 = hasFlippedXCoordinates ? 0 : textureWidth;
                drawContours();
                nativeContext.PopMatrix();
                nativeContext.PopState();
            }
            else {
                drawContours();
            }
        }
    };
    UniformContoursDrawingProvider.prototype.drawContours = function (renderContext, x, y, width, height, zMin, zMax, zStep, lineStyle) {
        // Compute params for contours
        var floatParams = (0, NativeObject_1.getVector4)(this.webAssemblyContext, 0, 1, 0, 0);
        var contourParams = new this.webAssemblyContext.SCRTContourParams();
        var offset = Math.abs(zMin) < app_1.EPSILON ? 0.5 : 0.01;
        var strokeColor = (0, parseColor_1.parseColorToTArgb)(lineStyle.color);
        contourParams.SetColorVector(strokeColor.red / 255, strokeColor.green / 255, strokeColor.blue / 255, strokeColor.opacity / 255);
        contourParams.SetParamsAVector(lineStyle.strokeThickness, zStep / 2, // FOR SHADY should this be 1.0 / cParams.majorStepZ ? seems to have no effect
        offset, 0);
        contourParams.SetParamsBVector(zMin, zMax, 0, 0);
        // Draw major contour lines
        var nativeContext = renderContext.getNativeContext();
        // console.log(`viewRect: ${viewRect.x}, ${viewRect.y}, ${viewRect.width}, ${viewRect.height}`);
        // console.log(`contours bounds: ${startX}, ${startY}, ${endX}, ${endY}`);
        var heightsTexture = this.heightsTextureCache.value;
        nativeContext.DrawHeatmapRectWithContours(null, heightsTexture, x, y, width, height, floatParams, contourParams);
        contourParams === null || contourParams === void 0 ? void 0 : contourParams.delete();
    };
    UniformContoursDrawingProvider.prototype.computeHeightMap = function (textureHeight, textureWidth, zValues, isVerticalChart, xFlipped, yFlipped) {
        var _a;
        var arraySize = textureHeight * textureWidth;
        if (((_a = this.heightData) === null || _a === void 0 ? void 0 : _a.size()) !== arraySize) {
            // console.log("Resizing heightmap texture to " + arraySize);
            this.heightData = (0, Deleter_1.deleteSafe)(this.heightData);
            this.heightData = new this.webAssemblyContext.FloatVector();
            this.heightData.resize(arraySize, 0);
        }
        for (var y = 0; y < textureHeight; y++) {
            for (var x = 0; x < textureWidth; x++) {
                var zValue = !isVerticalChart
                    ? zValues[!yFlipped ? textureHeight - 1 - y : y][xFlipped ? textureWidth - x - 1 : x]
                    : zValues[!yFlipped ? textureWidth - 1 - x : x][xFlipped ? textureHeight - y - 1 : y];
                // Todo: Set into a javascript array then bulk set the array on heightData
                this.heightData.set(y * textureWidth + x, isNaN(zValue) ? -1.0 : zValue);
            }
        }
        return this.heightData;
    };
    UniformContoursDrawingProvider.prototype.createPaletteTexture = function (width, height, gradientStops) {
        if (app_1.IS_TEST_ENV) {
            return undefined;
        }
        Guard_1.Guard.isTrue(width > 0, "width must be greater than 0");
        Guard_1.Guard.isTrue(height > 0, "height must be greater than 0");
        var canvasTexture = new CanvasTexture_1.CanvasTexture(this.webAssemblyContext, width, height);
        canvasTexture.clear();
        var ctx = canvasTexture.getContext();
        // BEGIN: Drawing gradient rectangle on canvas2D
        var x1 = 0;
        var y1 = 0;
        var x2 = width;
        var y2 = 0;
        if (gradientStops) {
            var gradient_1 = ctx.createLinearGradient(x1, y1, x2, y2);
            gradientStops.forEach(function (el) {
                gradient_1.addColorStop(el.offset, el.color);
            });
            ctx.fillStyle = gradient_1;
        }
        else {
            ctx.fillStyle = "black";
        }
        ctx.fillRect(0, 0, width, height);
        // END: Drawing gradient rectangle on canvas2D
        canvasTexture.copyTexture();
        return canvasTexture;
    };
    UniformContoursDrawingProvider.prototype.getDefaultColorMap = function (dataSeries) {
        var zRange = dataSeries.zRange;
        return { minimum: zRange.min, maximum: zRange.max };
    };
    return UniformContoursDrawingProvider;
}(BaseSeriesDrawingProvider_1.BaseSeriesDrawingProvider));
exports.UniformContoursDrawingProvider = UniformContoursDrawingProvider;
