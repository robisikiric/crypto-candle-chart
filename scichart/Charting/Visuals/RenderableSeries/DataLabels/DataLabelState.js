"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataLabelState = void 0;
var NumberRange_1 = require("../../../../Core/NumberRange");
var parseColor_1 = require("../../../../utils/parseColor");
var DpiHelper_1 = require("../../TextureManager/DpiHelper");
var DataLabelState = /** @class */ (function () {
    function DataLabelState(renderContext, renderPassData, style, color, yValues, parentSeries) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.dataLabels = [];
        this.indexProperty = 0;
        this.xCoordCache = undefined;
        this.yCoordCache = undefined;
        var pointSeries = renderPassData.pointSeries;
        var isCategoryAxis = renderPassData.xCoordinateCalculator.isCategoryCoordinateCalculator;
        this.style = DpiHelper_1.DpiHelper.adjustTextStyle(style);
        this.color = (0, parseColor_1.parseColorToUIntArgb)(color);
        this.xValues = isCategoryAxis ? pointSeries.indexes : pointSeries.xValues;
        this.yValues = yValues;
        this.parentSeries = parentSeries;
        this.renderPassData = renderPassData;
        this.yFinalValues = (_a = this.parentSeries.dataSeries) === null || _a === void 0 ? void 0 : _a.yFinalAnimationValues;
        this.isXFlipped = (renderPassData.isVerticalChart
            ? this.renderPassData.yCoordinateCalculator
            : this.renderPassData.xCoordinateCalculator).hasFlippedCoordinates;
        this.isYFlipped = (renderPassData.isVerticalChart
            ? this.renderPassData.xCoordinateCalculator
            : this.renderPassData.yCoordinateCalculator).hasFlippedCoordinates;
        if (!renderPassData.indexRange) {
            var indicesRange = this.parentSeries.getIndicesRange(new NumberRange_1.NumberRange(renderPassData.xCoordinateCalculator.visibleMin, renderPassData.xCoordinateCalculator.visibleMax), isCategoryAxis);
            this.indexStart = indicesRange.min;
            this.indexEnd = indicesRange.max;
            this.pointCount = renderPassData.indexRange.diff + 1;
            if (this.pointCount > 1) {
                this.pointGap = renderPassData.isVerticalChart
                    ? Math.abs(this.yCoord(this.indexStart) - this.yCoord(this.indexEnd)) / this.pointCount
                    : Math.abs(this.xCoord(this.indexStart) - this.xCoord(this.indexEnd)) / this.pointCount;
            }
            else
                this.pointGap = Infinity; // Single point
        }
        else {
            this.indexStart = pointSeries.resampled ? 0 : renderPassData.indexRange.min;
            this.pointCount = pointSeries.resampled ? pointSeries.count : renderPassData.indexRange.diff + 1;
            this.indexEnd = pointSeries.resampled ? pointSeries.count - 1 : renderPassData.indexRange.max;
            if (this.pointCount > 1) {
                this.pointGap = renderPassData.isVerticalChart
                    ? Math.abs(this.yCoord(this.indexStart) - this.yCoord(this.indexEnd)) / this.pointCount
                    : Math.abs(this.xCoord(this.indexStart) - this.xCoord(this.indexEnd)) / this.pointCount;
            }
            else
                this.pointGap = Infinity; // Single point
        }
        this.index = this.indexStart;
        this.font = renderContext.getFont(this.style);
        this.xPadding = ((_c = (_b = this.style.padding) === null || _b === void 0 ? void 0 : _b.left) !== null && _c !== void 0 ? _c : 0) + ((_e = (_d = this.style.padding) === null || _d === void 0 ? void 0 : _d.right) !== null && _e !== void 0 ? _e : 0);
        this.yPadding = ((_g = (_f = this.style.padding) === null || _f === void 0 ? void 0 : _f.top) !== null && _g !== void 0 ? _g : 0) + ((_j = (_h = this.style.padding) === null || _h === void 0 ? void 0 : _h.bottom) !== null && _j !== void 0 ? _j : 0);
        this.fifoSweeping = parentSeries.dataSeries.fifoSweeping;
    }
    Object.defineProperty(DataLabelState.prototype, "index", {
        get: function () {
            return this.indexProperty;
        },
        set: function (value) {
            this.xCoordCache = undefined;
            this.yCoordCache = undefined;
            this.indexProperty = value;
        },
        enumerable: false,
        configurable: true
    });
    DataLabelState.prototype.xVal = function (index) {
        var i = index !== null && index !== void 0 ? index : this.indexProperty;
        if (!this.isXFlipped) {
            i = this.indexEnd - (i - this.indexStart);
        }
        return this.parentSeries.dataSeries.getNativeValue(this.xValues, i);
    };
    DataLabelState.prototype.yVal = function (index) {
        var i = index !== null && index !== void 0 ? index : this.indexProperty;
        if (!this.isXFlipped) {
            i = this.indexEnd - (i - this.indexStart);
        }
        return this.parentSeries.dataSeries.getNativeValue(this.yValues, i);
    };
    DataLabelState.prototype.yValAfterAnimation = function (index) {
        if (!this.yFinalValues)
            return this.yVal(index);
        var i = index !== null && index !== void 0 ? index : this.indexProperty;
        if (!this.isXFlipped) {
            i = this.indexEnd - (i - this.indexStart);
        }
        return this.yFinalValues.get(i);
    };
    DataLabelState.prototype.xCoord = function (index) {
        if (this.renderPassData.isVerticalChart)
            return this.yCoordInternal(index);
        else
            return this.xCoordInternal(index);
    };
    DataLabelState.prototype.yCoord = function (index) {
        if (this.renderPassData.isVerticalChart)
            return this.xCoordInternal(index);
        else
            return this.yCoordInternal(index);
    };
    DataLabelState.prototype.hasNext = function (index) {
        var i = index !== null && index !== void 0 ? index : this.indexProperty;
        if (!this.isXFlipped)
            return i > 0;
        else
            return i < this.indexEnd;
    };
    Object.defineProperty(DataLabelState.prototype, "lastLabel", {
        get: function () {
            if (this.dataLabels.length > 0) {
                return this.dataLabels[this.dataLabels.length - 1];
            }
            else {
                return undefined;
            }
        },
        enumerable: false,
        configurable: true
    });
    DataLabelState.prototype.getMetaData = function () {
        var index = this.renderPassData.pointSeries.indexes.get(this.index);
        return this.parentSeries.dataSeries.getMetadataAt(index, this.fifoSweeping);
    };
    Object.defineProperty(DataLabelState.prototype, "isVerticalChart", {
        get: function () {
            return this.renderPassData.isVerticalChart;
        },
        enumerable: false,
        configurable: true
    });
    DataLabelState.prototype.xCoordInternal = function (index) {
        if (index !== undefined)
            return this.renderPassData.xCoordinateCalculator.getCoordinate(this.xVal(index));
        else {
            if (this.xCoordCache !== undefined)
                return this.xCoordCache;
            else
                this.xCoordCache = this.renderPassData.xCoordinateCalculator.getCoordinate(this.xVal());
            return this.xCoordCache;
        }
    };
    DataLabelState.prototype.yCoordInternal = function (index) {
        if (index !== undefined)
            return this.renderPassData.yCoordinateCalculator.getCoordinate(this.yVal(index));
        else {
            if (this.yCoordCache !== undefined)
                return this.yCoordCache;
            else
                this.yCoordCache = this.renderPassData.yCoordinateCalculator.getCoordinate(this.yVal());
            return this.yCoordCache;
        }
    };
    return DataLabelState;
}());
exports.DataLabelState = DataLabelState;
