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
exports.getOHLCYRange = exports.OhlcDataSeries = void 0;
var Deleter_1 = require("../../Core/Deleter");
var Guard_1 = require("../../Core/Guard");
var NumberRange_1 = require("../../Core/NumberRange");
var NumberArray_1 = require("../../types/NumberArray");
var SearchMode_1 = require("../../types/SearchMode");
var YRangeMode_1 = require("../../types/YRangeMode");
var appendDoubleVectorFromJsArray_1 = require("../../utils/ccall/appendDoubleVectorFromJsArray");
var copyVector_1 = require("../../utils/copyVector");
var BaseDataSeries_1 = require("./BaseDataSeries");
var IDataSeries_1 = require("./IDataSeries");
/**
 * OhlcDataSeries is a DataSeries for holding Open, High, Low, Close data in SciChart's
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Stock Charts}
 * @remarks
 * The OhlcDataSeries is primarily used with the {@link FastCandlestickRenderableSeries | JavaScript Candlestick Chart}
 * but can also be used with our {@link FastOhlcRenderableSeries | JavaScript Ohlc Chart},
 * used for drawing {@link https://www.scichart.com/javascript-chart-features | JavaScript Stock Charts} and Candlestick or OHLC charts.
 *
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseDataSeries} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries} to find out what 2D JavaScript Chart types are available.
 */
var OhlcDataSeries = /** @class */ (function (_super) {
    __extends(OhlcDataSeries, _super);
    /**
     * Creates an instance of {@link OhlcDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options the {@link IOhlcDataSeriesOptions} which can be passed to configure the DataSeries at construct time
     */
    function OhlcDataSeries(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        /** @inheritDoc */
        _this.type = IDataSeries_1.EDataSeriesType.Ohlc;
        _this.openValues = _this.doubleVectorProvider.getDoubleVector(webAssemblyContext);
        _this.highValues = _this.doubleVectorProvider.getDoubleVector(webAssemblyContext);
        _this.lowValues = _this.doubleVectorProvider.getDoubleVector(webAssemblyContext);
        if (options === null || options === void 0 ? void 0 : options.xValues) {
            _this.appendRange(options.xValues, options.openValues, options.highValues, options.lowValues, options.closeValues, options.metadata);
            if ((options === null || options === void 0 ? void 0 : options.fifoCapacity) && (options === null || options === void 0 ? void 0 : options.fifoStartIndex)) {
                _this.xValues.notifyAppend(options === null || options === void 0 ? void 0 : options.fifoStartIndex);
                _this.yValues.notifyAppend(options === null || options === void 0 ? void 0 : options.fifoStartIndex);
                _this.openValues.notifyAppend(options === null || options === void 0 ? void 0 : options.fifoStartIndex);
                _this.highValues.notifyAppend(options === null || options === void 0 ? void 0 : options.fifoStartIndex);
                _this.lowValues.notifyAppend(options === null || options === void 0 ? void 0 : options.fifoStartIndex);
            }
        }
        return _this;
    }
    /**
     * Gets a native / WebAssembly vector of Open-values in the DataSeries
     */
    OhlcDataSeries.prototype.getNativeOpenValues = function () {
        return this.openValues;
    };
    /**
     * Gets a native / WebAssembly vector of High-values in the DataSeries
     */
    OhlcDataSeries.prototype.getNativeHighValues = function () {
        return this.highValues;
    };
    /**
     * Gets a native / WebAssembly vector of Low-values in the DataSeries
     */
    OhlcDataSeries.prototype.getNativeLowValues = function () {
        return this.lowValues;
    };
    /**
     * Gets a native / WebAssembly vector of Close-values in the DataSeries
     */
    OhlcDataSeries.prototype.getNativeCloseValues = function () {
        return this.getNativeYValues();
    };
    /**
     * Appends a single X (Date), Open, High, Low, Close point to the DataSeries
     * @remarks
     * For best performance on drawing large datasets, use the {@link appendRange} method
     * X-value is a Date, encoded as a Unix Timestamp.
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param x X-value is a Date, encoded as a Unix Timestamp.
     * @param open The Open value for this OHLC bar
     * @param high The High value for this OHLC bar
     * @param low The Low value for this OHLC bar
     * @param close The Close value for this OHLC bar
     * @param metadata The point metadata
     */
    OhlcDataSeries.prototype.append = function (x, open, high, low, close, metadata) {
        if (!this.getIsDeleted()) {
            var nativeX = this.getNativeXValues();
            this.dataDistributionCalculator.onAppend(this.isSorted, this.containsNaN, nativeX, [x], [close]);
            // Push metadata should be done before push x values
            this.appendMetadata(metadata);
            nativeX.push_back(x);
            this.getNativeOpenValues().push_back(open);
            this.getNativeHighValues().push_back(high);
            this.getNativeLowValues().push_back(low);
            this.getNativeCloseValues().push_back(close);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Append, null, 1);
        }
    };
    /**
     * Appends arrays of X (Date), Open, High, Low, Close point to the DataSeries
     * @remarks
     * This method is considerably higher performance than {@link append} which appends a single point
     * X-value is a Date, encoded as a Unix Timestamp.
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param xValues X-values are Dates, encoded as a Unix Timestamp.
     * @param openValues The Open values for this OHLC bar
     * @param highValues The High values for this OHLC bar
     * @param lowValues The Low values for this OHLC bar
     * @param closeValues The Close value sfor this OHLC bar
     * @param metadata The array of point metadata
     */
    OhlcDataSeries.prototype.appendRange = function (xValues, openValues, highValues, lowValues, closeValues, metadata) {
        if (!this.getIsDeleted()) {
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(xValues) || (0, NumberArray_1.isTypedArray)(xValues), "xValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(openValues) || (0, NumberArray_1.isTypedArray)(openValues), "openValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(highValues) || (0, NumberArray_1.isTypedArray)(highValues), "highValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(lowValues) || (0, NumberArray_1.isTypedArray)(lowValues), "lowValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(closeValues) || (0, NumberArray_1.isTypedArray)(closeValues), "closeValues must be an array of numbers");
            Guard_1.Guard.arraysSameLengthArr([
                { arg: xValues, name: "xValues" },
                { arg: openValues, name: "openValues" },
                { arg: highValues, name: "highValues" },
                { arg: lowValues, name: "lowValues" },
                { arg: closeValues, name: "closeValues" }
            ]);
            if (metadata) {
                Guard_1.Guard.isTrue(Array.isArray(metadata), "metadata must be an array of IPointMetadata");
                Guard_1.Guard.arraysSameLength(xValues, "xValues", metadata, "metadata");
            }
            var nativeX = this.getNativeXValues();
            var nativeOpen = this.getNativeOpenValues();
            var nativeHigh = this.getNativeHighValues();
            var nativeLow = this.getNativeLowValues();
            var nativeClose = this.getNativeCloseValues();
            this.dataDistributionCalculator.onAppend(this.isSorted, this.containsNaN, nativeX, xValues, closeValues);
            // Push metadata should be done before push x values
            this.appendMetadataRange(metadata, xValues.length);
            // New implementation passing array from JS
            this.doubleVectorProvider.appendArray(this.webAssemblyContext, nativeX, xValues);
            this.doubleVectorProvider.appendArray(this.webAssemblyContext, nativeOpen, openValues);
            this.doubleVectorProvider.appendArray(this.webAssemblyContext, nativeHigh, highValues);
            this.doubleVectorProvider.appendArray(this.webAssemblyContext, nativeLow, lowValues);
            this.doubleVectorProvider.appendArray(this.webAssemblyContext, nativeClose, closeValues);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Append, null, xValues.length);
        }
    };
    /**
     * Updates a single Open, High, Low, Close value by X-index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param open The new Open value
     * @param high The new High value
     * @param low The new Low value
     * @param close The new Close value
     * @param metadata The point metadata
     */
    OhlcDataSeries.prototype.update = function (index, open, high, low, close, metadata) {
        if (!this.getIsDeleted()) {
            this.validateIndex(index);
            this.dataDistributionCalculator.onUpdate(this.isSorted, this.containsNaN, undefined, undefined, [close], index);
            this.getNativeOpenValues().set(index, open);
            this.getNativeHighValues().set(index, high);
            this.getNativeLowValues().set(index, low);
            this.getNativeCloseValues().set(index, close);
            this.setMetadataAt(index, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Update, index, 1);
        }
    };
    /**
     * Updates a single X, Open, High, Low, Close value by X-index. Might also need to set isSorted = false
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param x The new X value
     * @param open The new Open value
     * @param high The new High value
     * @param low The new Low value
     * @param close The new Close value
     * @param metadata The point metadata
     */
    OhlcDataSeries.prototype.updateXohlc = function (index, x, open, high, low, close, metadata) {
        if (!this.getIsDeleted()) {
            this.validateIndex(index);
            var nativeX = this.getNativeXValues();
            this.dataDistributionCalculator.onUpdate(this.isSorted, this.containsNaN, nativeX, [x], [close], index);
            nativeX.set(index, x);
            this.getNativeOpenValues().set(index, open);
            this.getNativeHighValues().set(index, high);
            this.getNativeLowValues().set(index, low);
            this.getNativeCloseValues().set(index, close);
            this.setMetadataAt(index, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Update, index, 1);
        }
    };
    /**
     * Inserts a single Date, Open, High, Low, Close value at the X-index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param x the X-value (date) encoded as a Unix Timestamp
     * @param open The Open value
     * @param high The High value
     * @param low The Low value
     * @param close The Close value
     * @param metadata The point metadata
     */
    OhlcDataSeries.prototype.insert = function (startIndex, x, open, high, low, close, metadata) {
        if (!this.getIsDeleted()) {
            this.validateIndex(startIndex, "Start index is out of range");
            this.throwIfFifo("insert");
            var nativeX = this.getNativeXValues();
            this.dataDistributionCalculator.onInsert(this.isSorted, this.containsNaN, nativeX, [x], [close], startIndex);
            nativeX.insertAt(startIndex, x);
            this.getNativeOpenValues().insertAt(startIndex, open);
            this.getNativeHighValues().insertAt(startIndex, high);
            this.getNativeLowValues().insertAt(startIndex, low);
            this.getNativeCloseValues().insertAt(startIndex, close);
            this.insertMetadata(startIndex, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Insert, startIndex, 1);
        }
    };
    /**
     * Inserts a range of Date, Open, High, Low, Close value at the X-index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param xValues the X-values (dates) encoded as a Unix Timestamp
     * @param openValues The Open values
     * @param highValues The High values
     * @param lowValues The Low values
     * @param closeValues The Close values
     * @param metadata The array of point metadata
     */
    OhlcDataSeries.prototype.insertRange = function (startIndex, xValues, openValues, highValues, lowValues, closeValues, metadata) {
        if (!this.getIsDeleted()) {
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(xValues) || (0, NumberArray_1.isTypedArray)(xValues), "xValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(openValues) || (0, NumberArray_1.isTypedArray)(openValues), "openValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(highValues) || (0, NumberArray_1.isTypedArray)(highValues), "highValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(lowValues) || (0, NumberArray_1.isTypedArray)(lowValues), "lowValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(closeValues) || (0, NumberArray_1.isTypedArray)(closeValues), "closeValues must be an array of numbers");
            this.validateIndex(startIndex, "Start index is out of range");
            this.throwIfFifo("insertRange");
            Guard_1.Guard.arraysSameLengthArr([
                { arg: xValues, name: "xValues" },
                { arg: openValues, name: "openValues" },
                { arg: highValues, name: "highValues" },
                { arg: lowValues, name: "lowValues" },
                { arg: closeValues, name: "closeValues" }
            ]);
            if (metadata) {
                Guard_1.Guard.isTrue(Array.isArray(metadata), "metadata must be an array of IPointMetadata");
                Guard_1.Guard.arraysSameLength(xValues, "xValues", metadata, "metadata");
            }
            var nativeX = this.getNativeXValues();
            this.dataDistributionCalculator.onInsert(this.isSorted, this.containsNaN, nativeX, xValues, closeValues, startIndex);
            (0, appendDoubleVectorFromJsArray_1.insertDoubleVectorFromJsArray)(this.webAssemblyContext, xValues, nativeX, startIndex);
            (0, appendDoubleVectorFromJsArray_1.insertDoubleVectorFromJsArray)(this.webAssemblyContext, openValues, this.getNativeOpenValues(), startIndex);
            (0, appendDoubleVectorFromJsArray_1.insertDoubleVectorFromJsArray)(this.webAssemblyContext, highValues, this.getNativeHighValues(), startIndex);
            (0, appendDoubleVectorFromJsArray_1.insertDoubleVectorFromJsArray)(this.webAssemblyContext, lowValues, this.getNativeLowValues(), startIndex);
            (0, appendDoubleVectorFromJsArray_1.insertDoubleVectorFromJsArray)(this.webAssemblyContext, closeValues, this.getNativeCloseValues(), startIndex);
            this.insertMetadataRange(startIndex, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Insert, startIndex, xValues.length);
        }
    };
    /**
     * Removes a Date,Open,High,Low,Close value at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to remove at
     */
    OhlcDataSeries.prototype.removeAt = function (index) {
        if (!this.getIsDeleted()) {
            this.validateIndex(index);
            this.throwIfFifo("removeAt");
            this.getNativeXValues().removeAt(index);
            this.getNativeOpenValues().removeAt(index);
            this.getNativeHighValues().removeAt(index);
            this.getNativeLowValues().removeAt(index);
            this.getNativeCloseValues().removeAt(index);
            this.removeMetadataAt(index);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Remove, index, 1);
        }
    };
    /**
     * Removes a range of Date,Open,High,Low,Close values at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the start index to remove at
     * @param count the number of points to remove
     */
    OhlcDataSeries.prototype.removeRange = function (startIndex, count) {
        if (!this.getIsDeleted()) {
            this.validateIndex(startIndex, "Start index is out of range");
            this.throwIfFifo("removeRange");
            this.getNativeXValues().removeRange(startIndex, count);
            this.getNativeOpenValues().removeRange(startIndex, count);
            this.getNativeHighValues().removeRange(startIndex, count);
            this.getNativeLowValues().removeRange(startIndex, count);
            this.getNativeCloseValues().removeRange(startIndex, count);
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
    OhlcDataSeries.prototype.clear = function () {
        if (!this.getIsDeleted()) {
            _super.prototype.clear.call(this);
            this.getNativeXValues().clear();
            this.getNativeOpenValues().clear();
            this.getNativeHighValues().clear();
            this.getNativeLowValues().clear();
            this.getNativeCloseValues().clear();
            this.setMetadata(undefined);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Clear, null, null);
        }
    };
    /** @inheritDoc */
    OhlcDataSeries.prototype.delete = function () {
        this.openValues = (0, Deleter_1.deleteSafe)(this.openValues);
        this.highValues = (0, Deleter_1.deleteSafe)(this.highValues);
        this.lowValues = (0, Deleter_1.deleteSafe)(this.lowValues);
        this.openInitialAnimationValues = (0, Deleter_1.deleteSafe)(this.openInitialAnimationValues);
        this.highInitialAnimationValues = (0, Deleter_1.deleteSafe)(this.highInitialAnimationValues);
        this.lowInitialAnimationValues = (0, Deleter_1.deleteSafe)(this.lowInitialAnimationValues);
        this.openFinalAnimationValues = (0, Deleter_1.deleteSafe)(this.openFinalAnimationValues);
        this.highFinalAnimationValues = (0, Deleter_1.deleteSafe)(this.highFinalAnimationValues);
        this.lowFinalAnimationValues = (0, Deleter_1.deleteSafe)(this.lowFinalAnimationValues);
        _super.prototype.delete.call(this);
    };
    /** @inheritDoc */
    OhlcDataSeries.prototype.getWindowedYRange = function (xRange, getPositiveRange, isXCategoryAxis, dataSeriesValueType, yRangeMode) {
        if (isXCategoryAxis === void 0) { isXCategoryAxis = false; }
        if (dataSeriesValueType === void 0) { dataSeriesValueType = IDataSeries_1.EDataSeriesValueType.Default; }
        if (yRangeMode === void 0) { yRangeMode = YRangeMode_1.EYRangeMode.Visible; }
        var _a = this.getOHLCValues(dataSeriesValueType), openValues = _a.openValues, closeValues = _a.closeValues, highValues = _a.highValues, lowValues = _a.lowValues;
        if (this.count() === 1) {
            var min = Math.min(openValues.get(0), lowValues.get(0));
            var max = Math.max(closeValues.get(0), highValues.get(0));
            return new NumberRange_1.NumberRange(min, max);
        }
        var indicesRange = isXCategoryAxis
            ? xRange
            : this.getIndicesRange(xRange, false, yRangeMode === YRangeMode_1.EYRangeMode.Visible ? SearchMode_1.ESearchMode.RoundUp : SearchMode_1.ESearchMode.RoundDown, yRangeMode === YRangeMode_1.EYRangeMode.Visible ? SearchMode_1.ESearchMode.RoundDown : SearchMode_1.ESearchMode.RoundUp);
        return getOHLCYRange(indicesRange, openValues, highValues, lowValues, closeValues);
    };
    /** @inheritDoc */
    OhlcDataSeries.prototype.createAnimationVectors = function () {
        _super.prototype.createAnimationVectors.call(this);
        this.openInitialAnimationValues = this.doubleVectorProvider.getDoubleVector(this.webAssemblyContext);
        this.highInitialAnimationValues = this.doubleVectorProvider.getDoubleVector(this.webAssemblyContext);
        this.lowInitialAnimationValues = this.doubleVectorProvider.getDoubleVector(this.webAssemblyContext);
        this.openFinalAnimationValues = this.doubleVectorProvider.getDoubleVector(this.webAssemblyContext);
        this.highFinalAnimationValues = this.doubleVectorProvider.getDoubleVector(this.webAssemblyContext);
        this.lowFinalAnimationValues = this.doubleVectorProvider.getDoubleVector(this.webAssemblyContext);
    };
    /** @inheritDoc */
    OhlcDataSeries.prototype.setInitialAnimationVectors = function (dataSeries) {
        _super.prototype.setInitialAnimationVectors.call(this, dataSeries);
        if (!dataSeries) {
            this.openInitialAnimationValues.resize(0, 0);
            this.highInitialAnimationValues.resize(0, 0);
            this.lowInitialAnimationValues.resize(0, 0);
            return;
        }
        (0, copyVector_1.copyDoubleVector)(dataSeries.getNativeOpenValues(), this.openInitialAnimationValues, this.webAssemblyContext);
        (0, copyVector_1.copyDoubleVector)(dataSeries.getNativeHighValues(), this.highInitialAnimationValues, this.webAssemblyContext);
        (0, copyVector_1.copyDoubleVector)(dataSeries.getNativeLowValues(), this.lowInitialAnimationValues, this.webAssemblyContext);
    };
    /** @inheritDoc */
    OhlcDataSeries.prototype.setFinalAnimationVectors = function (dataSeries) {
        _super.prototype.setFinalAnimationVectors.call(this, dataSeries);
        if (!dataSeries) {
            this.openFinalAnimationValues.resize(0, 0);
            this.highFinalAnimationValues.resize(0, 0);
            this.lowFinalAnimationValues.resize(0, 0);
            return;
        }
        (0, copyVector_1.copyDoubleVector)(dataSeries.getNativeOpenValues(), this.openFinalAnimationValues, this.webAssemblyContext);
        (0, copyVector_1.copyDoubleVector)(dataSeries.getNativeHighValues(), this.highFinalAnimationValues, this.webAssemblyContext);
        (0, copyVector_1.copyDoubleVector)(dataSeries.getNativeLowValues(), this.lowFinalAnimationValues, this.webAssemblyContext);
    };
    /** @inheritDoc */
    OhlcDataSeries.prototype.validateAnimationVectors = function () {
        var size = this.xInitialAnimationValues.size();
        if (size !== this.yInitialAnimationValues.size() ||
            size !== this.openInitialAnimationValues.size() ||
            size !== this.highInitialAnimationValues.size() ||
            size !== this.lowInitialAnimationValues.size() ||
            size !== this.xFinalAnimationValues.size() ||
            size !== this.yFinalAnimationValues.size() ||
            size !== this.openFinalAnimationValues.size() ||
            size !== this.highFinalAnimationValues.size() ||
            size !== this.lowFinalAnimationValues.size()) {
            throw Error("initialAnimationValues and finalAnimationValues must have the same length");
        }
    };
    /** @inheritDoc */
    OhlcDataSeries.prototype.updateAnimationProperties = function (progress, animation) {
        _super.prototype.updateAnimationProperties.call(this, progress, animation);
        if (animation.isOnStartAnimation) {
            animation.calculateAnimationValues(this.webAssemblyContext, this.openFinalAnimationValues, this.getNativeOpenValues(), progress);
            animation.calculateAnimationValues(this.webAssemblyContext, this.highFinalAnimationValues, this.getNativeHighValues(), progress);
            animation.calculateAnimationValues(this.webAssemblyContext, this.lowFinalAnimationValues, this.getNativeLowValues(), progress);
        }
        else if (animation.isDataSeriesAnimation) {
            animation.calculateDataSeriesAnimationValues(this.webAssemblyContext, this.openInitialAnimationValues, this.openFinalAnimationValues, this.getNativeOpenValues(), progress);
            animation.calculateDataSeriesAnimationValues(this.webAssemblyContext, this.highInitialAnimationValues, this.highFinalAnimationValues, this.getNativeHighValues(), progress);
            animation.calculateDataSeriesAnimationValues(this.webAssemblyContext, this.lowInitialAnimationValues, this.lowFinalAnimationValues, this.getNativeLowValues(), progress);
        }
    };
    /** @inheritDoc */
    OhlcDataSeries.prototype.getOptions = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.getOptions.call(this, excludeData);
        if (!excludeData) {
            var dataSize = this.count();
            var xValues = new Array(dataSize);
            var openValues = new Array(dataSize);
            var highValues = new Array(dataSize);
            var lowValues = new Array(dataSize);
            var closeValues = new Array(dataSize);
            if (this.fifoCapacity && this.fifoSweeping) {
                for (var i = 0; i < dataSize; i++) {
                    xValues[i] = this.xValues.getRaw(i);
                    openValues[i] = this.openValues.getRaw(i);
                    closeValues[i] = this.yValues.getRaw(i);
                    highValues[i] = this.highValues.getRaw(i);
                    lowValues[i] = this.lowValues.getRaw(i);
                }
            }
            else {
                for (var i = 0; i < dataSize; i++) {
                    xValues[i] = this.xValues.get(i);
                    openValues[i] = this.openValues.get(i);
                    closeValues[i] = this.yValues.get(i);
                    highValues[i] = this.highValues.get(i);
                    lowValues[i] = this.lowValues.get(i);
                }
            }
            var options = {
                xValues: xValues,
                openValues: openValues,
                highValues: highValues,
                lowValues: lowValues,
                closeValues: closeValues
            };
            Object.assign(json, options);
        }
        return json;
    };
    OhlcDataSeries.prototype.reserve = function (size) {
        _super.prototype.reserve.call(this, size);
        this.openValues.reserve(size);
        this.highValues.reserve(size);
        this.lowValues.reserve(size);
    };
    OhlcDataSeries.prototype.getOHLCValues = function (dataSeriesValueType) {
        var openValues;
        var highValues;
        var lowValues;
        var closeValues;
        switch (dataSeriesValueType) {
            case IDataSeries_1.EDataSeriesValueType.FinalAnimationValues:
                openValues = this.openFinalAnimationValues;
                highValues = this.highFinalAnimationValues;
                lowValues = this.lowFinalAnimationValues;
                closeValues = this.yFinalAnimationValues;
                break;
            case IDataSeries_1.EDataSeriesValueType.InitialAnimationValues:
                openValues = this.openInitialAnimationValues;
                highValues = this.highInitialAnimationValues;
                lowValues = this.lowInitialAnimationValues;
                closeValues = this.yInitialAnimationValues;
                break;
            default:
                openValues = this.openValues;
                highValues = this.highValues;
                lowValues = this.lowValues;
                closeValues = this.yValues;
        }
        return { openValues: openValues, highValues: highValues, lowValues: lowValues, closeValues: closeValues };
    };
    return OhlcDataSeries;
}(BaseDataSeries_1.BaseDataSeries));
exports.OhlcDataSeries = OhlcDataSeries;
function getOHLCYRange(indicesRange, openValues, highValues, lowValues, closeValues) {
    var yMin = Number.MAX_VALUE;
    var yMax = Number.MIN_VALUE;
    var iMin = Math.max(indicesRange.min, 0);
    var iMax = Math.min(indicesRange.max, openValues.size() - 1);
    if (iMax < iMin) {
        return undefined;
    }
    for (var i = iMin; i <= iMax; i++) {
        var highVal = highValues.get(i);
        var lowVal = lowValues.get(i);
        if (lowVal < yMin) {
            yMin = lowVal;
        }
        if (highVal > yMax) {
            yMax = highVal;
        }
    }
    return new NumberRange_1.NumberRange(yMin, yMax);
}
exports.getOHLCYRange = getOHLCYRange;
