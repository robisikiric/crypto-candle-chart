"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateHeatmapTexture = exports.calculateCellCoordinates = exports.calculateOffsets = exports.createColorMap = exports.getCellColor = exports.getColor = exports.getColorDataForTexture = void 0;
var colorUtil_1 = require("../../../../utils/colorUtil");
var parseColor_1 = require("../../../../utils/parseColor");
var getColorDataForTexture = function (params, _colorData, precision) {
    var xStartInd = params.xStartInd, textureWidth = params.textureWidth, xInc = params.xInc, yStartInd = params.yStartInd, textureHeight = params.textureHeight, yInc = params.yInc, zValues = params.zValues, webAssemblyContext = params.webAssemblyContext, colorMap = params.colorMap, opacity = params.opacity, horCellCount = params.horCellCount, vertCellCount = params.vertCellCount, horCellOffsets = params.horCellOffsets, vertCellOffsets = params.vertCellOffsets, colorMin = params.colorMin, colorMax = params.colorMax, arrayWidth = params.arrayWidth, arrayHeight = params.arrayHeight, fillValuesOutOfRange = params.fillValuesOutOfRange;
    // const _colorData = new webAssemblyContext.UIntVector();
    _colorData.resize(textureWidth * textureHeight, 0);
    // const _colorData = Array.from(Array(textureWidth * textureHeight));
    var yOffsetInd = 0;
    var yCellEnd = vertCellOffsets[yOffsetInd];
    var cachedColors = new Array(horCellCount);
    var hasCachedColors = false;
    var xCellIndex = xStartInd;
    var yCellIndex = yStartInd;
    var color;
    for (var y = 0; y < textureHeight; y++) {
        var xOffsetInd = 0;
        var xCellEnd = horCellOffsets[xOffsetInd];
        if (y > yCellEnd) {
            // New cell - need to refill the cache
            hasCachedColors = false;
            // Get the end coord of the next cell and a color for it
            yOffsetInd++;
            yCellEnd = vertCellOffsets[yOffsetInd];
            // If yCellEnd falls inside a pixel, reiterate and get the next color
            var yDiff = y - yCellEnd;
            if (yDiff > Number.EPSILON && Math.floor(yCellEnd) + 1 === y) {
                y--;
                continue;
            }
        }
        if (hasCachedColors) {
            // Get color cached on previous iteration
            color = cachedColors[xOffsetInd];
        }
        else {
            xCellIndex = xStartInd + xOffsetInd * xInc;
            yCellIndex = yStartInd + yOffsetInd * yInc;
            color = (0, exports.getColor)(yCellIndex, xCellIndex, colorMap, opacity, zValues, webAssemblyContext, colorMin, colorMax, arrayWidth, arrayHeight, fillValuesOutOfRange, precision);
            // New cell - refill the cache
            cachedColors[xOffsetInd] = color;
        }
        for (var x = 0; x < textureWidth; x++) {
            if (x > xCellEnd) {
                // Get the end coord of the next cell and a color for it
                xOffsetInd++;
                xCellEnd = horCellOffsets[xOffsetInd];
                // If xCellEnd falls inside a pixel, reiterate and get the next color
                var xDiff = x - xCellEnd;
                if (xDiff > Number.EPSILON && Math.floor(xCellEnd) + 1 === x) {
                    x--;
                    continue;
                }
                if (hasCachedColors) {
                    // Get color cached on previous iteration
                    color = cachedColors[xOffsetInd];
                }
                else {
                    xCellIndex = xStartInd + xOffsetInd * xInc;
                    color = (0, exports.getColor)(yCellIndex, xCellIndex, colorMap, opacity, zValues, webAssemblyContext, colorMin, colorMax, arrayWidth, arrayHeight, fillValuesOutOfRange, precision);
                    cachedColors[xOffsetInd] = color;
                }
            }
            // Fill a texture pixel
            // _colorData[y * textureWidth + x] = color;
            _colorData.set(y * textureWidth + x, color);
        }
        hasCachedColors = true;
    }
    return _colorData;
};
exports.getColorDataForTexture = getColorDataForTexture;
var getColor = function (yIndex, xIndex, colorPalette, opacity, 
// zValues: SCRTDoubleVector,
zValues, webAssemblyContext, colorMin, colorMax, arrayWidth, arrayHeight, fillValuesOutOfRange, precision) {
    // TODO is this check needed?
    if (yIndex >= arrayHeight || xIndex >= arrayWidth) {
        // transparent
        return 0;
    }
    // const zValue = zValues.get(yIndex * arrayWidth + xIndex);
    var zValue = zValues[yIndex][xIndex];
    var cellColor = (0, exports.getCellColor)(zValue, colorPalette, colorMin, colorMax, fillValuesOutOfRange, webAssemblyContext, precision);
    return (0, colorUtil_1.uintArgbColorMultiplyOpacity)(cellColor, opacity);
};
exports.getColor = getColor;
/** @ignore */
var getCellColor = function (value, _colorMap, colorMin, colorMax, fillValuesOutOfRange, webAssemblyContext, precision) {
    if (isNaN(value)) {
        // transparent
        return 0;
    }
    // comment from the original C# code
    // TODO move this to DataSeries.GetZAsDoubles(min, max) to avoid it here
    if (fillValuesOutOfRange) {
        // Clip to ColorMap.Min, Max
        value = value < colorMin ? colorMin : value;
        value = value > colorMax ? colorMax : value;
    }
    else if (value < colorMin || value > colorMax) {
        // transparent
        return 0;
    }
    var _scaleFactor = (precision - 1) / Math.abs(colorMax - colorMin);
    var colorMapValue = (value - colorMin) * _scaleFactor;
    // Round to the nearest integer
    var colorIndex = Math.floor(colorMapValue + Math.sign(value) * 0.5);
    colorIndex = webAssemblyContext.NumberUtil.Constrain(colorIndex, 0, _colorMap.length - 1);
    return _colorMap[colorIndex];
};
exports.getCellColor = getCellColor;
// TODO configure precision
var createColorMap = function (originalGradientStops, precision) {
    var colorMap = Array.from(Array(precision));
    // clone and sort gradient stops
    var gradientStops = __spreadArray([], originalGradientStops, true);
    gradientStops.sort(function (gradientStop, nextGradientStop) {
        if (gradientStop.offset < nextGradientStop.offset) {
            return -1;
        }
        else if (gradientStop.offset > nextGradientStop.offset) {
            return 1;
        }
        else {
            return 0;
        }
    });
    var count = gradientStops.length;
    var first = gradientStops[0].offset;
    var last = gradientStops[gradientStops.length - 1].offset;
    var diff = last - first;
    var change = diff / (precision - 1);
    // let prevColor = ApplyOpacity(gradientStops[0].color, _opacity);
    var prevColor = gradientStops[0].color;
    var prevOffset = gradientStops[0].offset;
    var nextColor = prevColor;
    var nextOffset = prevOffset;
    if (count > 1) {
        // nextColor = ApplyOpacity(gradientStops[1].color, _opacity);
        nextColor = gradientStops[1].color;
        nextOffset = gradientStops[1].offset;
    }
    diff = nextOffset - prevOffset;
    var offsetInd = 0;
    for (var i = 0; i < precision; ++i) {
        var offset = first + i * change;
        if (offset >= nextOffset) {
            offsetInd++;
            prevOffset = nextOffset;
            prevColor = nextColor;
            if (offsetInd + 1 < count) {
                // nextColor = ApplyOpacity(gradientStops[offsetInd + 1].color, _opacity);
                nextColor = gradientStops[offsetInd + 1].color;
                nextOffset = gradientStops[offsetInd + 1].offset;
            }
            diff = nextOffset - prevOffset;
        }
        var color = void 0;
        if (prevColor === nextColor || diff <= Number.EPSILON) {
            color = Number.parseInt((0, parseColor_1.parseColorToHexStringArgb)(nextColor), 16);
        }
        else {
            var coef = (offset - prevOffset) / diff;
            color = getInterpolatedColor(prevColor, nextColor, coef);
        }
        colorMap[i] = color;
    }
    return colorMap;
};
exports.createColorMap = createColorMap;
var getInterpolatedColor = function (htmlColor1, htmlColor2, coef) {
    var color1 = (0, parseColor_1.parseColorToTArgb)(htmlColor1);
    var color2 = (0, parseColor_1.parseColorToTArgb)(htmlColor2);
    var a1 = color1.opacity;
    var a2 = color2.opacity;
    var r1 = color1.red;
    var r2 = color2.red;
    var g1 = color1.green;
    var g2 = color2.green;
    var b1 = color1.blue;
    var b2 = color2.blue;
    var r = r1 + Math.floor((r2 - r1) * coef);
    var g = g1 + Math.floor((g2 - g1) * coef);
    var b = b1 + Math.floor((b2 - b1) * coef);
    var a = a1 + Math.floor((a2 - a1) * coef);
    return Number.parseInt("0x" + (0, parseColor_1.toHex)(a) + (0, parseColor_1.toHex)(r) + (0, parseColor_1.toHex)(g) + (0, parseColor_1.toHex)(b), 16);
    // return (a << 24) | (r << 16) | (g << 8) | b;
};
var calculateOffsets = function (heatmapRect, isVerticalChart, xCellSizes, yCellSizes, horStartInd, horCellCount, horInc, vertStartInd, vertCellCount, vertInc, seriesViewRect) {
    // TODO can be optimized - no need to recalculate these offsets at every redraw
    // TODO can be optimized for large heatmaps - skip cells that
    // falls within a single pixel & count them for the iteration in ComputeColorMap()
    // Find heatmap cells positions
    var offsetX = heatmapRect.left < 0 ? -heatmapRect.left : 0;
    var offsetY = heatmapRect.top < 0 ? -heatmapRect.top : 0;
    if (isVerticalChart) {
        // consider that heatmap texture is rotated
        offsetX = heatmapRect.right > seriesViewRect.bottom ? heatmapRect.right - seriesViewRect.bottom : 0;
    }
    // Horizontal offsets == X offsets on texture, vertical offsets == Y offsets on texture
    var horCellOffsets = (0, exports.calculateCellCoordinates)(xCellSizes, heatmapRect.width, horStartInd, horCellCount, horInc, -offsetX);
    var vertCellOffsets = (0, exports.calculateCellCoordinates)(yCellSizes, heatmapRect.height, vertStartInd, vertCellCount, vertInc, -offsetY);
    return { horCellOffsets: horCellOffsets, vertCellOffsets: vertCellOffsets };
};
exports.calculateOffsets = calculateOffsets;
/**
 * Calculates absolute coordinates of the heatmap cells
 * @param inputArr relative cell sizes
 * @param dimension texture size
 * @param startInd
 * @param count
 * @param inc
 * @param offset
 * @returns
 */
var calculateCellCoordinates = function (inputArr, dimension, startInd, count, inc, offset) {
    // Find a stretch coef
    var sum = 0;
    var ind = startInd;
    for (var i = 0; i < count; i++, ind += inc) {
        sum += inputArr[ind];
    }
    var coef = 1 / sum;
    var offsets = new Array(count);
    var length = offset;
    for (var i = 0; i < count - 1; i++) {
        var index = i * inc + startInd;
        var cellSize = inputArr[index] * coef * dimension;
        length = length + cellSize;
        offsets[i] = length;
    }
    offsets[count - 1] = dimension + offset;
    return offsets;
};
exports.calculateCellCoordinates = calculateCellCoordinates;
var calculateHeatmapTexture = function (colorDataParams, intVector, heatTextureCache, precision) {
    var textureWidth = colorDataParams.textureWidth, textureHeight = colorDataParams.textureHeight, webAssemblyContext = colorDataParams.webAssemblyContext, useInterpolation = colorDataParams.useInterpolation;
    // calculate colors from zValues
    // per pixel colors
    var colorArray = (0, exports.getColorDataForTexture)(colorDataParams, intVector, precision);
    // create and fill texture
    var texture = heatTextureCache.create(textureWidth, textureHeight, webAssemblyContext.eTSRTextureFormat.TSR_TEXTUREFORMAT_A8B8G8R8);
    webAssemblyContext.SCRTSetTextureLinearSamplerEnabled(texture, useInterpolation);
    webAssemblyContext.SCRTFillTextureAbgr(texture, textureWidth, textureHeight, colorArray);
    return texture;
};
exports.calculateHeatmapTexture = calculateHeatmapTexture;
