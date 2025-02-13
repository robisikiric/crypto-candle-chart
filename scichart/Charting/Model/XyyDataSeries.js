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
exports.getYyYRange = exports.XyyDataSeries = void 0;
var Deleter_1 = require("../../Core/Deleter");
var Guard_1 = require("../../Core/Guard");
var NumberRange_1 = require("../../Core/NumberRange");
var NumberArray_1 = require("../../types/NumberArray");
var SearchMode_1 = require("../../types/SearchMode");
var YRangeMode_1 = require("../../types/YRangeMode");
var appendDoubleVectorFromJsArray_1 = require("../../utils/ccall/appendDoubleVectorFromJsArray");
var copyVector_1 = require("../../utils/copyVector");
var isRealNumber_1 = require("../../utils/isRealNumber");
var BaseDataSeries_1 = require("./BaseDataSeries");
var IDataSeries_1 = require("./IDataSeries");
/**
 * XyyDataSeries is a DataSeries for holding X, Y1, Y2 data in SciChart's 2D
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * The XyyDataSeries is primarily used with our {@link FastBandRenderableSeries | JavaScript Band Chart},
 * which draws a High-Low fill between two lines, where the fill changes color depending on whether line Y2 > Y1
 *
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseDataSeries} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries} to find out what 2D JavaScript Chart types are available.
 */
var XyyDataSeries = /** @class */ (function (_super) {
    __extends(XyyDataSeries, _super);
    /**
     * Creates an instance of {@link XyyDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options the {@link IXyyDataSeriesOptions} which can be passed to configure the DataSeries at construct time
     */
    function XyyDataSeries(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        /** @inheritDoc */
        _this.type = IDataSeries_1.EDataSeriesType.Xyy;
        _this.y1Values = _this.doubleVectorProvider.getDoubleVector(webAssemblyContext);
        if (options === null || options === void 0 ? void 0 : options.xValues) {
            Guard_1.Guard.notNull(options.yValues, "options.yValues");
            Guard_1.Guard.notNull(options.y1Values, "options.y1Values");
            _this.appendRange(options.xValues, options.yValues, options.y1Values, options.metadata);
            if ((options === null || options === void 0 ? void 0 : options.fifoCapacity) && (options === null || options === void 0 ? void 0 : options.fifoStartIndex)) {
                _this.xValues.notifyAppend(options === null || options === void 0 ? void 0 : options.fifoStartIndex);
                _this.yValues.notifyAppend(options === null || options === void 0 ? void 0 : options.fifoStartIndex);
                _this.y1Values.notifyAppend(options === null || options === void 0 ? void 0 : options.fifoStartIndex);
            }
        }
        return _this;
    }
    /**
     * Gets a native / WebAssembly vector of Y2-values in the DataSeries
     */
    XyyDataSeries.prototype.getNativeY1Values = function () {
        return this.y1Values;
    };
    /**
     * Appends a single X, Y, Y1 point to the DataSeries
     * @remarks
     * For best performance on drawing large datasets, use the {@link appendRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param x The X-value
     * @param y The Y1-value
     * @param y1 The Y2-value
     * @param metadata The point metadata
     */
    XyyDataSeries.prototype.append = function (x, y, y1, metadata) {
        if (!this.getIsDeleted()) {
            var nativeX = this.getNativeXValues();
            this.dataDistributionCalculator.onAppend(this.isSorted, this.containsNaN, nativeX, [x], [y]);
            // Push metadata should be done before push x values
            this.appendMetadata(metadata);
            nativeX.push_back(x);
            this.getNativeYValues().push_back(y);
            this.getNativeY1Values().push_back(y1);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Append, null, 1);
        }
    };
    /**
     * Appends a range of X, Y, Y1 points to the DataSeries
     * @remarks
     * This method is considerably higher performance than {@link append} which appends a single point
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param xValues The X-values
     * @param yValues The Y-values
     * @param y1Values The Y1-values
     * @param metadata The array of point metadata
     */
    XyyDataSeries.prototype.appendRange = function (xValues, yValues, y1Values, metadata) {
        if (!this.getIsDeleted()) {
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(xValues) || (0, NumberArray_1.isTypedArray)(xValues), "xValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(yValues) || (0, NumberArray_1.isTypedArray)(yValues), "yValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(y1Values) || (0, NumberArray_1.isTypedArray)(y1Values), "y1Values must be an array of numbers");
            Guard_1.Guard.arraysSameLengthArr([
                { arg: xValues, name: "xValues" },
                { arg: yValues, name: "yValues" },
                { arg: y1Values, name: "y1Values" }
            ]);
            if (metadata) {
                Guard_1.Guard.isTrue(Array.isArray(metadata), "metadata must be an array of IPointMetadata");
                Guard_1.Guard.arraysSameLength(xValues, "xValues", metadata, "metadata");
            }
            var nativeX = this.getNativeXValues();
            var nativeY = this.getNativeYValues();
            var nativeY1 = this.getNativeY1Values();
            this.dataDistributionCalculator.onAppend(this.isSorted, this.containsNaN, nativeX, xValues, yValues);
            // Push metadata should be done before push x values
            this.appendMetadataRange(metadata, xValues.length);
            // Old implementation with copying each element
            // for (let i = 0; i < xValues.length; i++) {
            //     nativeX.push_back(xValues[i]);
            //     nativeY.push_back(yValues[i]);
            //     nativeY1.push_back(y1Values[i]);
            // }
            // New implementation passing array from JS
            this.doubleVectorProvider.appendArray(this.webAssemblyContext, nativeX, xValues);
            this.doubleVectorProvider.appendArray(this.webAssemblyContext, nativeY, yValues);
            this.doubleVectorProvider.appendArray(this.webAssemblyContext, nativeY1, y1Values);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Append, null, xValues.length);
        }
    };
    /**
     * Updates a single Y, Y1-value by X-index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param y The new Y value
     * @param y1 The new Y1 value
     * @param metadata The point metadata
     */
    XyyDataSeries.prototype.update = function (index, y, y1, metadata) {
        if (!this.getIsDeleted()) {
            this.validateIndex(index);
            this.dataDistributionCalculator.onUpdate(this.isSorted, this.containsNaN, undefined, undefined, [y], index);
            this.getNativeYValues().set(index, y);
            this.getNativeY1Values().set(index, y1);
            this.setMetadataAt(index, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Update, index, 1);
        }
    };
    /**
     * Updates a single X, Y, Y1-value by X-index. Might also need to set isSorted = false
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param x The new X value
     * @param y The new Y value
     * @param y1 The new Y1 value
     * @param metadata The point metadata
     */
    XyyDataSeries.prototype.updateXyy1 = function (index, x, y, y1, metadata) {
        if (!this.getIsDeleted()) {
            this.validateIndex(index);
            var nativeX = this.getNativeXValues();
            this.dataDistributionCalculator.onUpdate(this.isSorted, this.containsNaN, nativeX, [x], [y], index);
            nativeX.set(index, x);
            this.getNativeYValues().set(index, y);
            this.getNativeY1Values().set(index, y1);
            this.setMetadataAt(index, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Update, index, 1);
        }
    };
    /**
     * Inserts a single X,Y1,Y2 value at the start index
     * @remarks
     * For best performance on drawing large datasets, use the {@link insertRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param x the Xvalue
     * @param y the Y1Value
     * @param y1 the Y2Value
     * @param metadata The point metadata
     */
    XyyDataSeries.prototype.insert = function (startIndex, x, y, y1, metadata) {
        if (!this.getIsDeleted()) {
            this.validateIndex(startIndex, "Start index is out of range");
            this.throwIfFifo("insert");
            var nativeX = this.getNativeXValues();
            var nativeY = this.getNativeYValues();
            var nativeY1 = this.getNativeY1Values();
            this.dataDistributionCalculator.onInsert(this.isSorted, this.containsNaN, nativeX, [x], [y], startIndex);
            nativeX.insertAt(startIndex, x);
            nativeY.insertAt(startIndex, y);
            nativeY1.insertAt(startIndex, y1);
            this.insertMetadata(startIndex, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Insert, startIndex, 1);
        }
    };
    /**
     * Inserts a ragne of X,Y1,Y2 values at the startIndex
     * @remarks
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param xValues the XValues
     * @param yValues the YValues
     * @param y1Values the Y1Values
     * @param metadata The array of point metadata
     */
    XyyDataSeries.prototype.insertRange = function (startIndex, xValues, yValues, y1Values, metadata) {
        if (!this.getIsDeleted()) {
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(xValues) || (0, NumberArray_1.isTypedArray)(xValues), "xValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(yValues) || (0, NumberArray_1.isTypedArray)(yValues), "yValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(y1Values) || (0, NumberArray_1.isTypedArray)(y1Values), "y1Values must be an array of numbers");
            this.validateIndex(startIndex, "Start index is out of range");
            this.throwIfFifo("insertRange");
            Guard_1.Guard.arraysSameLengthArr([
                { arg: xValues, name: "xValues" },
                { arg: yValues, name: "yValues" },
                { arg: y1Values, name: "y1Values" }
            ]);
            if (metadata) {
                Guard_1.Guard.isTrue(Array.isArray(metadata), "metadata must be an array of IPointMetadata");
                Guard_1.Guard.arraysSameLength(xValues, "xValues", metadata, "metadata");
            }
            var nativeX = this.getNativeXValues();
            this.dataDistributionCalculator.onInsert(this.isSorted, this.containsNaN, nativeX, xValues, yValues, startIndex);
            (0, appendDoubleVectorFromJsArray_1.insertDoubleVectorFromJsArray)(this.webAssemblyContext, xValues, nativeX, startIndex);
            (0, appendDoubleVectorFromJsArray_1.insertDoubleVectorFromJsArray)(this.webAssemblyContext, yValues, this.getNativeYValues(), startIndex);
            (0, appendDoubleVectorFromJsArray_1.insertDoubleVectorFromJsArray)(this.webAssemblyContext, y1Values, this.getNativeY1Values(), startIndex);
            this.insertMetadataRange(startIndex, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Insert, startIndex, xValues.length);
        }
    };
    /**
     * Removes a single X,Y1,Y2 value at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to remove at
     */
    XyyDataSeries.prototype.removeAt = function (index) {
        if (!this.getIsDeleted()) {
            this.validateIndex(index);
            this.throwIfFifo("removeAt");
            this.getNativeXValues().removeAt(index);
            this.getNativeYValues().removeAt(index);
            this.getNativeY1Values().removeAt(index);
            this.removeMetadataAt(index);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Remove, index, 1);
        }
    };
    /**
     * Removes a range of X,Y1,Y2 values at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the start index to remove at
     * @param count the number of points to remove
     */
    XyyDataSeries.prototype.removeRange = function (startIndex, count) {
        if (!this.getIsDeleted()) {
            this.validateIndex(startIndex, "Start index is out of range");
            this.throwIfFifo("removeRange");
            this.getNativeXValues().removeRange(startIndex, count);
            this.getNativeYValues().removeRange(startIndex, count);
            this.getNativeY1Values().removeRange(startIndex, count);
            this.removeMetadataRange(startIndex, count);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Remove, startIndex, count);
        }
    };
    /**
     * Clears the entire DataSeries.
     * @remarks
     * Note this does not free memory, WebAssembly/Native memory is released by calling {@link delete}, after which the
     * DataSeries is no longer usable.
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     */
    XyyDataSeries.prototype.clear = function () {
        if (!this.getIsDeleted()) {
            _super.prototype.clear.call(this);
            this.getNativeXValues().clear();
            this.getNativeYValues().clear();
            this.getNativeY1Values().clear();
            this.setMetadata(undefined);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Clear, null, null);
        }
    };
    /** @inheritDoc */
    XyyDataSeries.prototype.getWindowedYRange = function (xRange, getPositiveRange, isXCategoryAxis, dataSeriesValueType, yRangeMode) {
        if (isXCategoryAxis === void 0) { isXCategoryAxis = false; }
        if (dataSeriesValueType === void 0) { dataSeriesValueType = IDataSeries_1.EDataSeriesValueType.Default; }
        if (yRangeMode === void 0) { yRangeMode = YRangeMode_1.EYRangeMode.Visible; }
        var _a = this.getYY1Values(dataSeriesValueType), yValues = _a.yValues, y1Values = _a.y1Values;
        // TODO: getPositiveRange
        // if one point
        if (this.count() === 1) {
            var min = Math.min(yValues.get(0), y1Values.get(0));
            var max = Math.max(yValues.get(0), y1Values.get(0));
            return new NumberRange_1.NumberRange(min, max);
        }
        var indicesRange = isXCategoryAxis
            ? xRange
            : this.getIndicesRange(xRange, false, yRangeMode === YRangeMode_1.EYRangeMode.Visible ? SearchMode_1.ESearchMode.RoundUp : SearchMode_1.ESearchMode.RoundDown, yRangeMode === YRangeMode_1.EYRangeMode.Visible ? SearchMode_1.ESearchMode.RoundDown : SearchMode_1.ESearchMode.RoundUp);
        return getYyYRange(this.webAssemblyContext, indicesRange, yValues, y1Values);
    };
    /** @inheritDoc */
    XyyDataSeries.prototype.delete = function () {
        this.y1Values = (0, Deleter_1.deleteSafe)(this.y1Values);
        this.y1InitialAnimationValues = (0, Deleter_1.deleteSafe)(this.y1InitialAnimationValues);
        this.y1FinalAnimationValues = (0, Deleter_1.deleteSafe)(this.y1FinalAnimationValues);
        _super.prototype.delete.call(this);
    };
    XyyDataSeries.prototype.createAnimationVectors = function () {
        _super.prototype.createAnimationVectors.call(this);
        this.y1InitialAnimationValues = this.doubleVectorProvider.getDoubleVector(this.webAssemblyContext);
        this.y1FinalAnimationValues = this.doubleVectorProvider.getDoubleVector(this.webAssemblyContext);
    };
    /** @inheritDoc */
    XyyDataSeries.prototype.setInitialAnimationVectors = function (dataSeries) {
        _super.prototype.setInitialAnimationVectors.call(this, dataSeries);
        if (!dataSeries) {
            this.y1InitialAnimationValues.resize(0, 0);
            return;
        }
        (0, copyVector_1.copyDoubleVector)(dataSeries.getNativeY1Values(), this.y1InitialAnimationValues, this.webAssemblyContext);
    };
    /** @inheritDoc */
    XyyDataSeries.prototype.setFinalAnimationVectors = function (dataSeries) {
        _super.prototype.setFinalAnimationVectors.call(this, dataSeries);
        if (!dataSeries) {
            this.y1FinalAnimationValues.resize(0, 0);
            return;
        }
        (0, copyVector_1.copyDoubleVector)(dataSeries.getNativeY1Values(), this.y1FinalAnimationValues, this.webAssemblyContext);
    };
    /** @inheritDoc */
    XyyDataSeries.prototype.validateAnimationVectors = function () {
        _super.prototype.validateAnimationVectors.call(this);
        var size = this.xInitialAnimationValues.size();
        if (size !== this.y1InitialAnimationValues.size() || size !== this.y1FinalAnimationValues.size()) {
            throw Error("initialAnimationValues and finalAnimationValues must have the same length");
        }
    };
    /** @inheritDoc */
    XyyDataSeries.prototype.updateAnimationProperties = function (progress, animation) {
        _super.prototype.updateAnimationProperties.call(this, progress, animation);
        if (animation.isOnStartAnimation) {
            animation.calculateAnimationValues(this.webAssemblyContext, this.y1FinalAnimationValues, this.getNativeY1Values(), progress);
        }
        else if (animation.isDataSeriesAnimation) {
            animation.calculateDataSeriesAnimationValues(this.webAssemblyContext, this.y1InitialAnimationValues, this.y1FinalAnimationValues, this.getNativeY1Values(), progress);
        }
    };
    /** @inheritDoc */
    XyyDataSeries.prototype.getOptions = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.getOptions.call(this, excludeData);
        if (!excludeData) {
            var dataSize = this.count();
            var xValues = new Array(dataSize);
            var yValues = new Array(dataSize);
            var y1Values = new Array(dataSize);
            if (this.fifoCapacity && this.fifoSweeping) {
                for (var i = 0; i < dataSize; i++) {
                    xValues[i] = this.xValues.getRaw(i);
                    yValues[i] = this.yValues.getRaw(i);
                    y1Values[i] = this.y1Values.getRaw(i);
                }
            }
            else {
                for (var i = 0; i < dataSize; i++) {
                    xValues[i] = this.xValues.get(i);
                    yValues[i] = this.yValues.get(i);
                    y1Values[i] = this.y1Values.get(i);
                }
            }
            var options = {
                xValues: xValues,
                yValues: yValues,
                y1Values: y1Values
            };
            Object.assign(json, options);
        }
        return json;
    };
    XyyDataSeries.prototype.reserve = function (size) {
        _super.prototype.reserve.call(this, size);
        this.y1Values.reserve(size);
    };
    XyyDataSeries.prototype.getYY1Values = function (dataSeriesValueType) {
        var yValues;
        var y1Values;
        switch (dataSeriesValueType) {
            case IDataSeries_1.EDataSeriesValueType.FinalAnimationValues:
                yValues = this.yFinalAnimationValues;
                y1Values = this.y1FinalAnimationValues;
                break;
            case IDataSeries_1.EDataSeriesValueType.InitialAnimationValues:
                yValues = this.yInitialAnimationValues;
                y1Values = this.y1InitialAnimationValues;
                break;
            default:
                yValues = this.yValues;
                y1Values = this.y1Values;
        }
        return { yValues: yValues, y1Values: y1Values };
    };
    return XyyDataSeries;
}(BaseDataSeries_1.BaseDataSeries));
exports.XyyDataSeries = XyyDataSeries;
function getYyYRange(webAssemblyContext, indicesRange, yValues, y1Values) {
    var iMin = Math.max(Math.floor(indicesRange.min), 0);
    var iMax = Math.min(Math.ceil(indicesRange.max), yValues.size() - 1);
    if (iMax < iMin) {
        return undefined;
    }
    var minMax;
    var minMaxy1;
    try {
        minMax = webAssemblyContext.NumberUtil.MinMaxWithIndex(yValues, iMin, iMax - iMin + 1);
        if (!(0, isRealNumber_1.isRealNumber)(minMax.minD) || !(0, isRealNumber_1.isRealNumber)(minMax.maxD)) {
            return undefined;
        }
        minMaxy1 = webAssemblyContext.NumberUtil.MinMaxWithIndex(y1Values, iMin, iMax - iMin + 1);
        if (!(0, isRealNumber_1.isRealNumber)(minMaxy1.minD) || !(0, isRealNumber_1.isRealNumber)(minMaxy1.maxD)) {
            return undefined;
        }
        return new NumberRange_1.NumberRange(Math.min(minMax.minD, minMaxy1.minD), Math.max(minMax.maxD, minMaxy1.maxD));
    }
    finally {
        (0, Deleter_1.deleteSafe)(minMax);
        (0, Deleter_1.deleteSafe)(minMaxy1);
    }
}
exports.getYyYRange = getYyYRange;
