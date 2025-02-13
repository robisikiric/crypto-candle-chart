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
exports.XyDataSeries = void 0;
var Guard_1 = require("../../Core/Guard");
var NumberArray_1 = require("../../types/NumberArray");
var appendDoubleVectorFromJsArray_1 = require("../../utils/ccall/appendDoubleVectorFromJsArray");
var perfomance_1 = require("../../utils/perfomance");
var BaseDataSeries_1 = require("./BaseDataSeries");
var IDataSeries_1 = require("./IDataSeries");
/**
 * @summary XyDataSeries is a DataSeries for holding X, Y data in SciChart's 2D
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @description
 * The XyDataSeries is primarily used with our {@link FastLineRenderableSeries | JavaScript Line Chart},
 * but can also be used by the {@link XyScatterRenderableSeries | JavaScript Scatter Chart} or
 * {@link FastMountainRenderableSeries | JavaScript Mountain/Area Chart} and {@link FastMountainRenderableSeries | JavaScript Column Chart}.
 *
 * To instantiate an {@link XyDataSeries}, use the following code:
 * ```ts
 * const xyDataSeries = new XyDataSeries(wasmContext);
 * xyDataSeries.append(1, 2); // Append a single x,y point
 * xyDataSeries.appendRange([3, 4], [3, 4]); // Append multiple x,y points (faster)
 * xyDataSeries.insert(0, 9, 10); // Insert a point at index 0
 * xyDataSeries.update(0, 11, 12); // Update a point at index 0
 * xyDataSeries.removeAt(0); // Remove a point at index 0
 * xyDataSeries.clear(); // Clear the dataseries
 * xyDataSeries.delete(); // Delete the dataseries and native (WebAssembly) memory
 * ```
 * @remarks
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseDataSeries} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries} to find out what 2D JavaScript Chart types are available.
 */
var XyDataSeries = /** @class */ (function (_super) {
    __extends(XyDataSeries, _super);
    /**
     * Creates an instance of {@link XyDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 WebAssembly rendering engine
     * @param options the {@link IXyDataSeriesOptions} which can be passed to configure the DataSeries at construct time
     */
    function XyDataSeries(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        /**
         * @inheritDoc
         */
        _this.type = IDataSeries_1.EDataSeriesType.Xy;
        if (options === null || options === void 0 ? void 0 : options.xValues) {
            Guard_1.Guard.notNull(options.yValues, "options.yValues");
            _this.appendRange(options.xValues, options.yValues, options.metadata);
            if ((options === null || options === void 0 ? void 0 : options.fifoCapacity) && (options === null || options === void 0 ? void 0 : options.fifoStartIndex)) {
                _this.xValues.notifyAppend(options === null || options === void 0 ? void 0 : options.fifoStartIndex);
                _this.yValues.notifyAppend(options === null || options === void 0 ? void 0 : options.fifoStartIndex);
            }
        }
        return _this;
    }
    /**
     * Appends a single X, Y point to the DataSeries
     * @remarks
     * For best performance on drawing large datasets, use the {@link appendRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param x The X-value
     * @param y The Y-value
     * @param metadata The point metadata
     */
    XyDataSeries.prototype.append = function (x, y, metadata) {
        if (!this.getIsDeleted()) {
            var nativeX = this.getNativeXValues();
            this.dataDistributionCalculator.onAppend(this.isSorted, this.containsNaN, nativeX, [x], [y]);
            // Push metadata should be done before push x values
            this.appendMetadata(metadata);
            nativeX.push_back(x);
            this.getNativeYValues().push_back(y);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Append, null, 1);
        }
    };
    /**
     * Appends a range of X, Y points to the DataSeries
     * @remarks
     * This method is considerably higher performance than {@link append} which appends a single point
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param xValues The X-values
     * @param yValues The Y-values
     * @param metadata The array of point metadata
     */
    XyDataSeries.prototype.appendRange = function (xValues, yValues, metadata) {
        var _a;
        if (!this.getIsDeleted()) {
            var startMark = perfomance_1.PerformanceDebugHelper.mark(perfomance_1.EPerformanceMarkType.DataUpdateStart, { contextId: this.id });
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(xValues) || (0, NumberArray_1.isTypedArray)(xValues), "xValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(yValues) || (0, NumberArray_1.isTypedArray)(yValues), "yValues must be an array of numbers");
            Guard_1.Guard.arraysSameLength(xValues, "xValues", yValues, "yValues");
            if (metadata) {
                Guard_1.Guard.isTrue(Array.isArray(metadata), "metadata must be an array of IPointMetadata");
                Guard_1.Guard.arraysSameLength(xValues, "xValues", metadata, "metadata");
            }
            var nativeX = this.getNativeXValues();
            var nativeY = this.getNativeYValues();
            this.dataDistributionCalculator.onAppend(this.isSorted, this.containsNaN, nativeX, xValues, yValues);
            // Push metadata should be done before push x values
            this.appendMetadataRange(metadata, xValues.length);
            // New implementation passing array from JS
            // TODO: create indexValues from c++
            this.doubleVectorProvider.appendArray(this.webAssemblyContext, nativeX, xValues);
            this.doubleVectorProvider.appendArray(this.webAssemblyContext, nativeY, yValues);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Append, null, xValues.length);
            perfomance_1.PerformanceDebugHelper.mark(perfomance_1.EPerformanceMarkType.DataUpdateEnd, {
                relatedId: (_a = startMark === null || startMark === void 0 ? void 0 : startMark.detail) === null || _a === void 0 ? void 0 : _a.relatedId,
                contextId: this.id
            });
        }
    };
    /**
     * Updates a single Y-value by X-index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param y The new Y value
     * @param metadata The point metadata
     */
    XyDataSeries.prototype.update = function (index, y, metadata) {
        if (!this.getIsDeleted()) {
            this.validateIndex(index);
            this.dataDistributionCalculator.onUpdate(this.isSorted, this.containsNaN, undefined, undefined, [y], index);
            this.getNativeYValues().set(index, y);
            this.setMetadataAt(index, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Update, index, 1);
        }
    };
    /**
     * Updates a single X, Y-value by X-index. Might also need to set isSorted = false
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index The index to update
     * @param x The new X value
     * @param y The new Y value
     * @param metadata The point metadata
     */
    XyDataSeries.prototype.updateXy = function (index, x, y, metadata) {
        if (!this.getIsDeleted()) {
            this.validateIndex(index);
            var nativeX = this.getNativeXValues();
            this.dataDistributionCalculator.onUpdate(this.isSorted, this.containsNaN, nativeX, [x], [y], index);
            nativeX.set(index, x);
            this.getNativeYValues().set(index, y);
            this.setMetadataAt(index, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Update, index, 1);
        }
    };
    /**
     * @summary Inserts a single X,Y value at the start index
     * @remarks
     * For best performance on drawing large datasets, use the {@link insertRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param x the X value
     * @param y the Y value
     * @param metadata The point metadata
     */
    XyDataSeries.prototype.insert = function (startIndex, x, y, metadata) {
        if (!this.getIsDeleted()) {
            this.validateIndex(startIndex, "Start index is out of range");
            this.throwIfFifo("insert");
            var nativeX = this.getNativeXValues();
            var nativeY = this.getNativeYValues();
            this.dataDistributionCalculator.onInsert(this.isSorted, this.containsNaN, nativeX, [x], [y], startIndex);
            nativeX.insertAt(startIndex, x);
            nativeY.insertAt(startIndex, y);
            this.insertMetadata(startIndex, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Insert, startIndex, 1);
        }
    };
    /**
     * @summary Inserts a range of X,Y values at the startIndex
     * @remarks
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param xValues the XValues
     * @param yValues the YValues
     * @param metadata The array of point metadata
     */
    XyDataSeries.prototype.insertRange = function (startIndex, xValues, yValues, metadata) {
        if (!this.getIsDeleted()) {
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(xValues) || (0, NumberArray_1.isTypedArray)(xValues), "xValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(yValues) || (0, NumberArray_1.isTypedArray)(yValues), "yValues must be an array of numbers");
            this.validateIndex(startIndex, "Start index is out of range");
            Guard_1.Guard.arraysSameLength(xValues, "xValues", yValues, "yValues");
            this.throwIfFifo("insertRange");
            if (metadata) {
                Guard_1.Guard.isTrue(Array.isArray(metadata), "metadata must be an array of IPointMetadata");
                Guard_1.Guard.arraysSameLength(xValues, "xValues", metadata, "metadata");
            }
            var nativeX = this.getNativeXValues();
            this.dataDistributionCalculator.onInsert(this.isSorted, this.containsNaN, nativeX, xValues, yValues, startIndex);
            (0, appendDoubleVectorFromJsArray_1.insertDoubleVectorFromJsArray)(this.webAssemblyContext, xValues, this.getNativeXValues(), startIndex);
            (0, appendDoubleVectorFromJsArray_1.insertDoubleVectorFromJsArray)(this.webAssemblyContext, yValues, this.getNativeYValues(), startIndex);
            this.insertMetadataRange(startIndex, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Insert, startIndex, xValues.length);
        }
    };
    /**
     * Removes an X,Y value at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to remove at
     */
    XyDataSeries.prototype.removeAt = function (index) {
        if (!this.getIsDeleted()) {
            this.validateIndex(index);
            this.throwIfFifo("removeAt");
            this.getNativeXValues().removeAt(index);
            this.getNativeYValues().removeAt(index);
            this.removeMetadataAt(index);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Remove, index, 1);
        }
    };
    /**
     * @summary Removes a range of X,Y values at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the start index to remove at
     * @param count the number of points to remove
     */
    XyDataSeries.prototype.removeRange = function (startIndex, count) {
        if (!this.getIsDeleted()) {
            this.validateIndex(startIndex, "Start index is out of range");
            this.throwIfFifo("removeRange");
            this.getNativeXValues().removeRange(startIndex, count);
            this.getNativeYValues().removeRange(startIndex, count);
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
    XyDataSeries.prototype.clear = function () {
        if (!this.getIsDeleted()) {
            _super.prototype.clear.call(this);
            this.getNativeXValues().clear();
            this.getNativeYValues().clear();
            this.setMetadata(undefined);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Clear, null, null);
        }
    };
    XyDataSeries.prototype.getOptions = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.getOptions.call(this, excludeData);
        if (!excludeData) {
            var dataSize = this.count();
            var xValues = new Array(dataSize);
            var yValues = new Array(dataSize);
            if (this.fifoCapacity && this.fifoSweeping) {
                for (var i = 0; i < dataSize; i++) {
                    xValues[i] = this.xValues.getRaw(i);
                    yValues[i] = this.yValues.getRaw(i);
                }
            }
            else {
                for (var i = 0; i < dataSize; i++) {
                    xValues[i] = this.xValues.get(i);
                    yValues[i] = this.yValues.get(i);
                }
            }
            var options = {
                xValues: xValues,
                yValues: yValues
            };
            Object.assign(json, options);
        }
        return json;
    };
    return XyDataSeries;
}(BaseDataSeries_1.BaseDataSeries));
exports.XyDataSeries = XyDataSeries;
