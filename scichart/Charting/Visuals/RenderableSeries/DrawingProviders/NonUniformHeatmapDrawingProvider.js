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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NonUniformHeatmapDrawingProvider = void 0;
var Deleter_1 = require("../../../../Core/Deleter");
var NumberRange_1 = require("../../../../Core/NumberRange");
var Rect_1 = require("../../../../Core/Rect");
var memoize_1 = require("../../../../utils/memoize");
var TextureCache_1 = require("../../../Drawing/TextureCache");
var BaseHeatmapRenderableSeries_1 = require("../BaseHeatmapRenderableSeries");
var constants_1 = require("../constants");
var BaseSeriesDrawingProvider_1 = require("./BaseSeriesDrawingProvider");
var HeatmapHelpers_1 = require("./HeatmapHelpers");
// TODO figure out if other value is needed
var precision = 100;
/**
 * Used internally - a drawing provider performs drawing for a {@link NonUniformHeatmapRenderableSeries} using
 * our WebAssembly WebGL rendering engine
 */
var NonUniformHeatmapDrawingProvider = /** @class */ (function (_super) {
    __extends(NonUniformHeatmapDrawingProvider, _super);
    /**
     * Creates an instance of the {@link UniformHeatmapDrawingProvider}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link UniformHeatmapRenderableSeries} which this drawing provider is attached to
     */
    function NonUniformHeatmapDrawingProvider(webAssemblyContext, parentSeries) {
        var _this = _super.call(this, webAssemblyContext, parentSeries) || this;
        _this.heatTextureCache = new TextureCache_1.TextureCache(webAssemblyContext);
        _this.colorDataVector = new webAssemblyContext.UIntVector();
        _this.onSeriesPropertyChange(constants_1.PROPERTY.DATA_SERIES);
        _this.onSeriesPropertyChange(constants_1.PROPERTY.COLOR_MAP);
        return _this;
    }
    /**
     * @inheritDoc
     */
    NonUniformHeatmapDrawingProvider.prototype.delete = function () {
        this.colorDataVector = (0, Deleter_1.deleteSafe)(this.colorDataVector);
        this.heatTextureCache = (0, Deleter_1.deleteSafe)(this.heatTextureCache);
        _super.prototype.delete.call(this);
    };
    /**
     * @inheritDoc
     */
    NonUniformHeatmapDrawingProvider.prototype.onSeriesPropertyChange = function (propertyName) {
        var recreateGradientColorScale = 
        // TODO this handles data updating using setZValue, consider invalidating colorData cache instead
        propertyName === constants_1.PROPERTY.DATA_SERIES ||
            propertyName === constants_1.PROPERTY.COLOR_MAP ||
            propertyName.includes(BaseHeatmapRenderableSeries_1.COLOR_MAP_PREFIX) ||
            propertyName === constants_1.PROPERTY.OPACITY;
        if (recreateGradientColorScale) {
            // TODO check case when colormap is passed via setter
            this.colorGradientScale = (0, HeatmapHelpers_1.createColorMap)(this.parentSeries.colorMap.gradientStops, precision);
        }
    };
    /**
     * @inheritDoc
     */
    NonUniformHeatmapDrawingProvider.prototype.draw = function (renderContext, renderPassData) {
        var isVerticalChart = renderPassData.isVerticalChart;
        var dataSeries = this.parentSeries.dataSeries;
        var seriesViewRect = this.parentSeries.parentSurface.seriesViewRect;
        var colorMap = this.parentSeries.colorMap;
        var colorGradientScale = this.colorGradientScale;
        var zValues = dataSeries.getZValues();
        var xIndexRange = dataSeries.getXIndicesRange(new NumberRange_1.NumberRange(renderPassData.xCoordinateCalculator.visibleMin, renderPassData.xCoordinateCalculator.visibleMax), false);
        var yIndexRange = dataSeries.getYIndicesRange(new NumberRange_1.NumberRange(renderPassData.yCoordinateCalculator.visibleMin, renderPassData.yCoordinateCalculator.visibleMax), false);
        var xMinValue = dataSeries.getXValue(xIndexRange.min);
        var xMaxValue = dataSeries.getXValue(xIndexRange.max);
        var yMinValue = dataSeries.getYValue(yIndexRange.min);
        var yMaxValue = dataSeries.getYValue(yIndexRange.max);
        var isXFlipped = !renderPassData.xCoordinateCalculator.hasFlippedCoordinates;
        var isYFlipped = renderPassData.yCoordinateCalculator.hasFlippedCoordinates;
        var heatmapStartX = renderPassData.xCoordinateCalculator.getCoordinate(isXFlipped ? xMaxValue : xMinValue);
        var heatmapEndX = renderPassData.xCoordinateCalculator.getCoordinate(isXFlipped ? xMinValue : xMaxValue);
        var heatmapStartY = renderPassData.yCoordinateCalculator.getCoordinate(!isYFlipped ? yMaxValue : yMinValue);
        var heatmapEndY = renderPassData.yCoordinateCalculator.getCoordinate(!isYFlipped ? yMinValue : yMaxValue);
        // clipped size
        var heatmapWidth = Math.ceil(Math.abs(heatmapStartX - heatmapEndX));
        var heatmapHeight = Math.ceil(Math.abs(heatmapStartY - heatmapEndY));
        var isOverflow = heatmapWidth <= 0 || heatmapHeight <= 0;
        var isOutViewport = heatmapStartX > (isVerticalChart ? seriesViewRect.height : seriesViewRect.width) ||
            heatmapStartY > (isVerticalChart ? seriesViewRect.width : seriesViewRect.height) ||
            heatmapEndX < 0 ||
            heatmapEndY < 0;
        if (!isOutViewport && !isOverflow) {
            var horCellRange = xIndexRange;
            var vertCellRange = yIndexRange;
            var horStartInd = isXFlipped ? horCellRange.max - 1 : horCellRange.min;
            var vertStartInd = isYFlipped ? vertCellRange.min : vertCellRange.max - 1;
            var horInc = isXFlipped ? -1 : 1;
            var vertInc = isYFlipped ? 1 : -1;
            if (isVerticalChart) {
                horStartInd = !isXFlipped ? horCellRange.max - 1 : horCellRange.min;
                horInc = !isXFlipped ? -1 : 1;
            }
            var horCellCount = horCellRange.diff;
            var vertCellCount = vertCellRange.diff;
            var nativeContext = renderContext.getNativeContext();
            this.drawHeatmapInTypescript(nativeContext, dataSeries.xCellOffsets, dataSeries.yCellOffsets, zValues, renderPassData.xCoordinateCalculator, renderPassData.yCoordinateCalculator, {
                horCellCount: horCellCount,
                vertCellCount: vertCellCount,
                arrayWidth: dataSeries.arrayWidth,
                arrayHeight: dataSeries.arrayHeight,
                opacity: this.parentSeries.opacity,
                colorGradientScale: colorGradientScale,
                colorMin: colorMap.minimum,
                colorMax: colorMap.maximum,
                horStartInd: horStartInd,
                vertStartInd: vertStartInd,
                horInc: horInc,
                vertInc: vertInc,
                isVerticalChart: isVerticalChart,
                heatmapStartX: heatmapStartX,
                heatmapStartY: heatmapStartY,
                heatmapWidth: heatmapWidth,
                heatmapHeight: heatmapHeight,
                // TS specific
                xCellSizes: dataSeries.xCellSizes,
                yCellSizes: dataSeries.yCellSizes,
                seriesViewRect: seriesViewRect
            });
            // Draft code for porting to the native drawing provider
            // const nativeZValues = new this.webAssemblyContext.SCRTDoubleVector();
            // const flattenedZValues = ([] as number[]).concat.apply([], zValues);
            // appendDoubleVectorFromJsArray(this.webAssemblyContext, nativeZValues, flattenedZValues);
            // this.drawHeatmapNative(
            //     nativeContext,
            //     nativeXOffsets,
            //     nativeYOffsets,
            //     nativeZValues,
            //     renderPassData.xCoordinateCalculator,
            //     renderPassData.yCoordinateCalculator,
            //     {
            //         _horCellCount,
            //         _vertCellCount,
            //         arrayWidth: dataSeries.arrayWidth,
            //         arrayHeight: dataSeries.arrayHeight,
            //         _horCellOffsets,
            //         _vertCellOffsets,
            //         opacity: this.parentSeries.opacity,
            //         colorGradientScale,
            //         colorMin: colorMap.minimum,
            //         colorMax: colorMap.maximum,
            //         _horStartInd,
            //         _vertStartInd,
            //         _horInc,
            //         _vertInc,
            //         isVerticalChart,
            //     }
            // );
        }
    };
    NonUniformHeatmapDrawingProvider.prototype.drawHeatmapInTypescript = function (nativeContext, xSpacings, ySpacings, zValues, xCalc, yCalc, params) {
        // create color data from zValues
        // create texture and fill it with pixel color data based on spacings
        var horStartInd = params.horStartInd, horInc = params.horInc, vertStartInd = params.vertStartInd, vertInc = params.vertInc, horCellCount = params.horCellCount, vertCellCount = params.vertCellCount, heatmapStartX = params.heatmapStartX, heatmapStartY = params.heatmapStartY, heatmapWidth = params.heatmapWidth, heatmapHeight = params.heatmapHeight, opacity = params.opacity, colorGradientScale = params.colorGradientScale, colorMin = params.colorMin, colorMax = params.colorMax, isVerticalChart = params.isVerticalChart, arrayWidth = params.arrayWidth, arrayHeight = params.arrayHeight, xCellSizes = params.xCellSizes, yCellSizes = params.yCellSizes, seriesViewRect = params.seriesViewRect;
        var seriesXRangeMin = xSpacings[0];
        var seriesXRangeMax = xSpacings[xSpacings.length - 1];
        var seriesYRangeMin = ySpacings[0];
        var seriesYRangeMax = ySpacings[ySpacings.length - 1];
        var xMinValue = Math.max(seriesXRangeMin, xCalc.visibleMin);
        var xMaxValue = Math.min(seriesXRangeMax, xCalc.visibleMax);
        var yMinValue = Math.max(seriesYRangeMin, yCalc.visibleMin);
        var yMaxValue = Math.min(seriesYRangeMax, yCalc.visibleMax);
        var hasFlippedX = !xCalc.hasFlippedCoordinates;
        var hasFlippedY = yCalc.hasFlippedCoordinates;
        var xMinCoordinate = xCalc.getCoordinate(hasFlippedX ? xMaxValue : xMinValue);
        var xMaxCoordinate = xCalc.getCoordinate(hasFlippedX ? xMinValue : xMaxValue);
        var yMinCoordinate = yCalc.getCoordinate(hasFlippedY ? yMaxValue : yMinValue);
        var yMaxCoordinate = yCalc.getCoordinate(hasFlippedY ? yMinValue : yMaxValue);
        var visibleTextureWidth = Math.ceil(Math.abs(xMinCoordinate - xMaxCoordinate));
        var visibleTextureHeight = Math.ceil(Math.abs(yMinCoordinate - yMaxCoordinate));
        var heatmapRect = new Rect_1.Rect(heatmapStartX, heatmapStartY, heatmapWidth, heatmapHeight);
        // calculates cell offsets in pixels from cell sizes
        var _a = (0, HeatmapHelpers_1.calculateOffsets)(heatmapRect, isVerticalChart, xCellSizes, yCellSizes, horStartInd, horCellCount, horInc, vertStartInd, vertCellCount, vertInc, seriesViewRect), horCellOffsets = _a.horCellOffsets, vertCellOffsets = _a.vertCellOffsets;
        var texture = this.calculateHeatmapTexture({
            xStartInd: horStartInd,
            textureWidth: visibleTextureWidth,
            xInc: horInc,
            yStartInd: vertStartInd,
            textureHeight: visibleTextureHeight,
            yInc: vertInc,
            zValues: zValues,
            webAssemblyContext: this.webAssemblyContext,
            colorMap: colorGradientScale,
            opacity: opacity,
            horCellCount: horCellCount,
            vertCellCount: vertCellCount,
            horCellOffsets: horCellOffsets,
            vertCellOffsets: vertCellOffsets,
            colorMin: colorMin,
            colorMax: colorMax,
            arrayWidth: arrayWidth,
            arrayHeight: arrayHeight,
            fillValuesOutOfRange: this.parentSeries.fillValuesOutOfRange,
            useInterpolation: this.parentSeries.useLinearTextureFiltering
        });
        if (isVerticalChart) {
            nativeContext.PushMatrix();
            nativeContext.PushState();
            nativeContext.Rotate(-90);
            var xTrans = hasFlippedX ? -xMinCoordinate : -visibleTextureWidth - xMinCoordinate;
            nativeContext.Translate(xTrans, 0);
            var x = hasFlippedX ? 0 : visibleTextureWidth;
            var width = hasFlippedX ? visibleTextureWidth : 0;
            var y = yMinCoordinate;
            var height = yMaxCoordinate;
            nativeContext.DrawTexture(texture, x - visibleTextureWidth, y - visibleTextureHeight, visibleTextureWidth, visibleTextureHeight);
            // Uniform Heatmap approach
            // nativeContext.DrawTexture(texture, x, y, width, height);
            nativeContext.PopMatrix();
            nativeContext.PopState();
            return;
        }
        // TODO figure out why yMaxCoordinate is used here
        nativeContext.DrawTexture(texture, xMinCoordinate, yMaxCoordinate, visibleTextureWidth, visibleTextureHeight);
    };
    // TODO probably this is overcomplicated
    NonUniformHeatmapDrawingProvider.prototype.calculateHeatmapTexture = function (colorDataParams) {
        if (!this.getMemoizedHeatmapTexture) {
            // checks if arguments have changed by value/reference equality for each argument
            // except horizontal and vertical offsets, where arrays are compared per value
            var customCompare = function (_a, _b) {
                var _c = _a, _d = _c[0], currentHorCellOffsets = _d.horCellOffsets, currVertCellOffsets = _d.vertCellOffsets, restCurrArgs = __rest(_d, ["horCellOffsets", "vertCellOffsets"]);
                var _e = _b[0], prevHorCellOffsets = _e.horCellOffsets, prevVertCellOffsets = _e.vertCellOffsets, restPrevArgs = __rest(_e, ["horCellOffsets", "vertCellOffsets"]);
                return (areArraysEqual(Object.values(restCurrArgs), Object.values(restPrevArgs)) &&
                    areArraysEqual(currentHorCellOffsets, prevHorCellOffsets) &&
                    areArraysEqual(currVertCellOffsets, prevVertCellOffsets));
            };
            this.getMemoizedHeatmapTexture = (0, memoize_1.memoize)(HeatmapHelpers_1.calculateHeatmapTexture, customCompare);
        }
        var areArraysEqual = function (arr1, arr2) {
            return !arr1.some(function (value, index) { return value !== arr2[index]; });
        };
        return this.getMemoizedHeatmapTexture(colorDataParams, this.colorDataVector, this.heatTextureCache, precision);
    };
    return NonUniformHeatmapDrawingProvider;
}(BaseSeriesDrawingProvider_1.BaseSeriesDrawingProvider));
exports.NonUniformHeatmapDrawingProvider = NonUniformHeatmapDrawingProvider;
