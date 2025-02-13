"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaletteFactory = void 0;
var PaletteProviderType_1 = require("../../types/PaletteProviderType");
var colorUtil_1 = require("../../utils/colorUtil");
var parseColor_1 = require("../../utils/parseColor");
var IPaletteProvider_1 = require("./IPaletteProvider");
/**
 * The PaletteFactory allows easy creation of palettes for some chart types
 */
var PaletteFactory = /** @class */ (function () {
    function PaletteFactory() {
    }
    /**
     * Creates a multi purpose Gradient Palette for line series, scatter, bubble or column and mountain series returning
     * an {@link IPaletteProvider} implementation which
     * colors data-points of charts depending on the x-index of the data according to the Gradient Brush passed in
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * @param gradientBrush the {@link GradientParams} containing information about the Gradient Brush
     * @param options the {@link IGradientPaletteOptions} containing additional options to turn stroke, fill or pointmarker sections on or off, and opacity per option
     */
    PaletteFactory.createGradient = function (webAssemblyContext, gradientBrush, options) {
        // TODO (Andrew): Adjust createGradient to modify the output based on start/end point of gradient brush
        var xFactor = gradientBrush.endPoint.x - gradientBrush.startPoint.x;
        var yFactor = gradientBrush.endPoint.y - gradientBrush.startPoint.y;
        var colorData = PaletteFactory.createColorMap(webAssemblyContext, gradientBrush.gradientStops.slice(0));
        var renderSeries;
        var doFunc = function (xValue, yValue, index, opacity) {
            if (opacity === void 0) { opacity = 1; }
            var count = renderSeries.getDataSeriesValuesCount();
            var lerpFactor = index / (count - 1);
            var mapIndex = webAssemblyContext.NumberUtil.Constrain(Math.round(lerpFactor * (colorData.length - 1)), 0, colorData.length - 1);
            var result = colorData[mapIndex];
            // console.log("GradientPalette called!");
            // console.log(`mapIndex is ${mapIndex}, colorData.length is ${colorData.length}`);
            // console.log(`count is ${count}, lerp is ${lerpFactor}. result is ${result}`);
            return (0, colorUtil_1.uintArgbColorMultiplyOpacity)(result, opacity);
        };
        var hasStroke = options === undefined || (options === null || options === void 0 ? void 0 : options.enableStroke) === true;
        var hasFill = (options === null || options === void 0 ? void 0 : options.enableFill) === true;
        var hasMarker = (options === null || options === void 0 ? void 0 : options.enablePointMarkers) === true;
        var palette = {
            strokePaletteMode: IPaletteProvider_1.EStrokePaletteMode.GRADIENT,
            fillPaletteMode: IPaletteProvider_1.EFillPaletteMode.GRADIENT,
            onAttached: function (parentSeries) {
                renderSeries = parentSeries;
            },
            onDetached: function () { },
            overrideStrokeArgb: function (xValue, yValue, index) {
                var _a;
                return hasStroke ? doFunc(xValue, yValue, index, (_a = options === null || options === void 0 ? void 0 : options.strokeOpacity) !== null && _a !== void 0 ? _a : 1) : undefined;
            },
            overrideFillArgb: function (xValue, yValue, index, opacity, metadata) {
                var _a;
                return hasFill ? doFunc(xValue, yValue, index, (_a = options === null || options === void 0 ? void 0 : options.fillOpacity) !== null && _a !== void 0 ? _a : 1) : undefined;
            },
            overridePointMarkerArgb: function (xValue, yValue, index, opacity, metadata) {
                var _a;
                var markerOpacity = (_a = options === null || options === void 0 ? void 0 : options.pointMarkerOpacity) !== null && _a !== void 0 ? _a : 1;
                return hasMarker
                    ? {
                        fill: doFunc(xValue, yValue, index, markerOpacity),
                        stroke: doFunc(xValue, yValue, index, markerOpacity)
                    }
                    : undefined;
            },
            toJSON: function () {
                return { type: PaletteProviderType_1.EPaletteProviderType.Gradient, options: gradientBrush };
            }
        };
        return palette;
    };
    PaletteFactory.createYGradient = function (webAssemblyContext, gradientBrush, yRange, options) {
        var colorData = PaletteFactory.createColorMap(webAssemblyContext, gradientBrush.gradientStops.slice(0));
        var renderSeries;
        var doFunc = function (yValue, opacity) {
            if (opacity === void 0) { opacity = 1; }
            var lerpFactor = (yValue - yRange.min) / yRange.diff;
            var mapIndex = webAssemblyContext.NumberUtil.Constrain(Math.round(lerpFactor * (colorData.length - 1)), 0, colorData.length - 1);
            var result = colorData[mapIndex];
            return (0, colorUtil_1.uintArgbColorMultiplyOpacity)(result, opacity);
        };
        var hasStroke = options === undefined || (options === null || options === void 0 ? void 0 : options.enableStroke) === true;
        var hasFill = (options === null || options === void 0 ? void 0 : options.enableFill) === true;
        var hasMarker = (options === null || options === void 0 ? void 0 : options.enablePointMarkers) === true;
        var palette = {
            strokePaletteMode: IPaletteProvider_1.EStrokePaletteMode.GRADIENT,
            fillPaletteMode: IPaletteProvider_1.EFillPaletteMode.GRADIENT,
            onAttached: function (parentSeries) {
                renderSeries = parentSeries;
            },
            onDetached: function () { },
            overrideStrokeArgb: function (xValue, yValue, index) {
                var _a;
                return hasStroke ? doFunc(yValue, (_a = options === null || options === void 0 ? void 0 : options.strokeOpacity) !== null && _a !== void 0 ? _a : 1) : undefined;
            },
            overrideFillArgb: function (xValue, yValue, index, opacity, metadata) {
                var _a;
                return hasFill ? doFunc(yValue, (_a = options === null || options === void 0 ? void 0 : options.strokeOpacity) !== null && _a !== void 0 ? _a : 1) : undefined;
            },
            overridePointMarkerArgb: function (xValue, yValue, index, opacity, metadata) {
                var _a;
                var markerOpacity = (_a = options === null || options === void 0 ? void 0 : options.pointMarkerOpacity) !== null && _a !== void 0 ? _a : 1;
                return hasMarker
                    ? {
                        fill: doFunc(yValue, markerOpacity),
                        stroke: doFunc(yValue, markerOpacity)
                    }
                    : undefined;
            },
            toJSON: function () {
                return { type: PaletteProviderType_1.EPaletteProviderType.Gradient, options: gradientBrush };
            }
        };
        return palette;
    };
    PaletteFactory.createColorMap = function (webAssemblyContext, gradientStops) {
        var colorMap = [];
        var count = gradientStops.length;
        var first = gradientStops[0].offset;
        var last = gradientStops[gradientStops.length - 1].offset;
        var diff = last - first;
        var change = diff / (PaletteFactory.precision - 1);
        var prevColor = (0, parseColor_1.parseColorToUIntArgb)(gradientStops[0].color);
        var prevOffset = gradientStops[0].offset;
        var nextColor = prevColor;
        var nextOffset = prevOffset;
        if (count > 1) {
            nextColor = (0, parseColor_1.parseColorToUIntArgb)(gradientStops[1].color);
            nextOffset = gradientStops[1].offset;
        }
        diff = nextOffset - prevOffset;
        // console.log(`prev: ${prevColor}, ${toHex(prevColor)} @ ${prevOffset}`);
        // console.log(`next: ${nextColor}, ${toHex(nextColor)} @ ${nextOffset}`);
        var offsetInd = 0;
        for (var i = 0; i < PaletteFactory.precision; ++i) {
            var offset = first + i * change;
            // console.log(`offset: ${offset}`);
            if (offset >= nextOffset) {
                offsetInd++;
                prevOffset = nextOffset;
                prevColor = nextColor;
                if (offsetInd + 1 < count) {
                    nextColor = (0, parseColor_1.parseColorToUIntArgb)(gradientStops[offsetInd + 1].color);
                    nextOffset = gradientStops[offsetInd + 1].offset;
                }
                diff = nextOffset - prevOffset;
            }
            var color = 0;
            if (prevColor === nextColor || diff <= 0.00000000001) {
                color = nextColor;
            }
            else {
                var coef = (offset - prevOffset) / diff;
                // console.log(`prev: ${prevColor}, ${toHex(prevColor)} @ ${prevOffset}`);
                // console.log(`next: ${nextColor}, ${toHex(nextColor)} @ ${nextOffset}`);
                // console.log(`coef: ${coef}`);
                color = webAssemblyContext.NumberUtil.LinearInterpolateI(prevColor, nextColor, coef);
            }
            colorMap.push(color);
        }
        return colorMap;
    };
    PaletteFactory.precision = 500;
    return PaletteFactory;
}());
exports.PaletteFactory = PaletteFactory;
