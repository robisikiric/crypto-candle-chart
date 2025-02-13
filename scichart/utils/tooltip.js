"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTooltipPositionProperties = exports.getUpdatedPoints = exports.getEndPoint = exports.getStartPoint = exports.getTotalSpacing = exports.getTotalSize = exports.checkHasOverlap = exports.spreadTooltips = exports.EShift = exports.ECoord = exports.ESize = void 0;
var ESize;
(function (ESize) {
    ESize["width"] = "width";
    ESize["height"] = "height";
})(ESize = exports.ESize || (exports.ESize = {}));
var ECoord;
(function (ECoord) {
    ECoord["xCoord"] = "xCoord";
    ECoord["yCoord"] = "yCoord";
})(ECoord = exports.ECoord || (exports.ECoord = {}));
var EShift;
(function (EShift) {
    EShift["xCoordShift"] = "xCoordShift";
    EShift["yCoordShift"] = "yCoordShift";
})(EShift = exports.EShift || (exports.EShift = {}));
/** @ignore */
var spreadTooltips = function (tooltipArray, pixelRatio, positionProperties, spacing, seriesViewRect) {
    var shiftMap = new Map();
    var length = tooltipArray.length;
    var totalSize = (0, exports.getTotalSize)(tooltipArray, positionProperties.sizePropertyName);
    var totalSpacing = (0, exports.getTotalSpacing)(tooltipArray, spacing);
    var totalBoxModel = totalSize + totalSpacing;
    var firstTooltip = tooltipArray[0];
    var lastTooltip = tooltipArray[length - 1];
    var startPoint = (0, exports.getStartPoint)(firstTooltip[positionProperties.coordPropertyName], firstTooltip[positionProperties.shiftPropertyName], pixelRatio);
    var endPoint = (0, exports.getEndPoint)(lastTooltip[positionProperties.coordPropertyName], lastTooltip[positionProperties.shiftPropertyName], pixelRatio, lastTooltip[positionProperties.sizePropertyName]);
    var updatedPoints = (0, exports.getUpdatedPoints)(startPoint, endPoint, totalBoxModel, seriesViewRect[positionProperties.sizePropertyName]);
    startPoint = updatedPoints.start;
    endPoint = updatedPoints.end;
    var currentPadding = (endPoint - startPoint - totalSize) / (tooltipArray.length - 1);
    tooltipArray.reduce(function (tooltipTopCoord, tooltip) {
        shiftMap.set(tooltip.index, (tooltipTopCoord - tooltip[positionProperties.coordPropertyName]) / pixelRatio);
        return tooltipTopCoord + tooltip[positionProperties.sizePropertyName] + currentPadding;
    }, startPoint);
    return shiftMap;
};
exports.spreadTooltips = spreadTooltips;
/** @ignore */
var checkHasOverlap = function (tooltipArray, spacing, pixelRatio, positionProperties) {
    var length = tooltipArray.length;
    for (var i = 0; i < length - 1; i++) {
        var currentTooltip = tooltipArray[i];
        var currentTooltipEndPoint = currentTooltip[positionProperties.coordPropertyName] +
            currentTooltip[positionProperties.sizePropertyName] +
            currentTooltip[positionProperties.shiftPropertyName] * pixelRatio;
        var nextTooltip = tooltipArray[i + 1];
        var nextTooltipStartPoint = nextTooltip[positionProperties.coordPropertyName] +
            nextTooltip[positionProperties.shiftPropertyName] * pixelRatio;
        var diff = nextTooltipStartPoint - currentTooltipEndPoint;
        if (diff < spacing)
            return true;
    }
    return false;
};
exports.checkHasOverlap = checkHasOverlap;
/** @ignore */
var getTotalSize = function (tooltipArray, sizePropertyName) {
    return tooltipArray.reduce(function (acc, tooltip) {
        var size = tooltip[sizePropertyName];
        return typeof size === "number" ? acc + size : acc;
    }, 0);
};
exports.getTotalSize = getTotalSize;
/** @ignore */
var getTotalSpacing = function (tooltipArray, spacing) {
    return (tooltipArray.length - 1) * spacing;
};
exports.getTotalSpacing = getTotalSpacing;
/** @ignore */
var getStartPoint = function (coord, shift, pixelRatio) { return coord + shift * pixelRatio; };
exports.getStartPoint = getStartPoint;
/** @ignore */
var getEndPoint = function (coord, shift, pixelRatio, size) {
    return coord + shift * pixelRatio + size;
};
exports.getEndPoint = getEndPoint;
/** @ignore */
var getUpdatedPoints = function (startPoint, endPoint, totalBoxModel, size) {
    var additionalWidth = totalBoxModel - (endPoint - startPoint);
    var additionalWidthHalf = additionalWidth / 2;
    var availableWidthFromStart = startPoint;
    var availableWidthFromEnd = size - endPoint;
    var start = startPoint - additionalWidthHalf;
    var end = endPoint + additionalWidthHalf;
    if (availableWidthFromStart < additionalWidthHalf) {
        start = 0;
        end = endPoint + (additionalWidth - availableWidthFromStart);
    }
    if (availableWidthFromEnd < additionalWidthHalf) {
        start = startPoint - (additionalWidth - availableWidthFromEnd);
        end = size;
    }
    return {
        start: start,
        end: end
    };
};
exports.getUpdatedPoints = getUpdatedPoints;
/** @ignore */
var getTooltipPositionProperties = function (isVerticalChart) {
    if (isVerticalChart) {
        return {
            sizePropertyName: ESize.width,
            coordPropertyName: ECoord.xCoord,
            shiftPropertyName: EShift.xCoordShift
        };
    }
    else {
        return {
            sizePropertyName: ESize.height,
            coordPropertyName: ECoord.yCoord,
            shiftPropertyName: EShift.yCoordShift
        };
    }
};
exports.getTooltipPositionProperties = getTooltipPositionProperties;
