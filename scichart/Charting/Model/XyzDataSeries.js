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
exports.XyzDataSeries = void 0;
var Deleter_1 = require("../../Core/Deleter");
var Guard_1 = require("../../Core/Guard");
var NumberArray_1 = require("../../types/NumberArray");
var appendDoubleVectorFromJsArray_1 = require("../../utils/ccall/appendDoubleVectorFromJsArray");
var copyVector_1 = require("../../utils/copyVector");
var BaseDataSeries_1 = require("./BaseDataSeries");
var IDataSeries_1 = require("./IDataSeries");
/**
 * XyzDataSeries is a DataSeries for holding X, Y, Z data in SciChart's 2D
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * The {@link XyzDataSeries} is primarily used with our {@link FastBubbleRenderableSeries | JavaScript Bubble Chart},
 * which draws a variable-sized bubble or shape at each X,Y value
 *
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseDataSeries} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries} to find out what 2D JavaScript Chart types are available.
 */
var XyzDataSeries = /** @class */ (function (_super) {
    __extends(XyzDataSeries, _super);
    /**
     * Creates an instance of {@link XyzDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options the {@link IXyzDataSeriesOptions} which can be passed to configure the DataSeries at construct time
     */
    function XyzDataSeries(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        /** @inheritDoc */
        _this.type = IDataSeries_1.EDataSeriesType.Xyz;
        _this.zValues = _this.doubleVectorProvider.getDoubleVector(webAssemblyContext);
        if (options === null || options === void 0 ? void 0 : options.xValues) {
            Guard_1.Guard.notNull(options.yValues, "options.yValues");
            Guard_1.Guard.notNull(options.zValues, "options.zValues");
            _this.appendRange(options.xValues, options.yValues, options.zValues, options.metadata);
            if ((options === null || options === void 0 ? void 0 : options.fifoCapacity) && (options === null || options === void 0 ? void 0 : options.fifoStartIndex)) {
                _this.xValues.notifyAppend(options === null || options === void 0 ? void 0 : options.fifoStartIndex);
                _this.yValues.notifyAppend(options === null || options === void 0 ? void 0 : options.fifoStartIndex);
                _this.zValues.notifyAppend(options === null || options === void 0 ? void 0 : options.fifoStartIndex);
            }
        }
        return _this;
    }
    /**
     * Gets a native / WebAssembly vector of Z-values in the DataSeries
     */
    XyzDataSeries.prototype.getNativeZValues = function () {
        return this.zValues;
    };
    /**
     * Appends a single X, Y, Z point to the DataSeries
     * @remarks
     * For best performance on drawing large datasets, use the {@link appendRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param x The X-value
     * @param y The Y-value
     * @param z The Z-value
     * @param metadata The point metadata
     */
    XyzDataSeries.prototype.append = function (x, y, z, metadata) {
        if (!this.getIsDeleted()) {
            var nativeX = this.getNativeXValues();
            this.dataDistributionCalculator.onAppend(this.isSorted, this.containsNaN, nativeX, [x], [y]);
            // Push metadata should be done before push x values
            this.appendMetadata(metadata);
            nativeX.push_back(x);
            this.getNativeYValues().push_back(y);
            this.getNativeZValues().push_back(z);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Append, null, 1);
        }
    };
    /**
     * Appends a range of X, Y, Z points to the DataSeries
     * @remarks
     * This method is considerably higher performance than {@link append} which appends a single point
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param xValues The X-values
     * @param yValues The Y-values
     * @param zValues The Z-values
     * @param metadata The array of point metadata
     */
    XyzDataSeries.prototype.appendRange = function (xValues, yValues, zValues, metadata) {
        if (!this.getIsDeleted()) {
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(xValues) || (0, NumberArray_1.isTypedArray)(xValues), "xValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(yValues) || (0, NumberArray_1.isTypedArray)(yValues), "yValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(zValues) || (0, NumberArray_1.isTypedArray)(zValues), "zValues must be an array of numbers");
            Guard_1.Guard.arraysSameLengthArr([
                { arg: xValues, name: "xValues" },
                { arg: yValues, name: "yValues" },
                { arg: zValues, name: "zValues" }
            ]);
            if (metadata) {
                Guard_1.Guard.isTrue(Array.isArray(metadata), "metadata must be an array of IPointMetadata");
                Guard_1.Guard.arraysSameLength(xValues, "xValues", metadata, "metadata");
            }
            var nativeX = this.getNativeXValues();
            var nativeY = this.getNativeYValues();
            var nativeZ = this.getNativeZValues();
            this.dataDistributionCalculator.onAppend(this.isSorted, this.containsNaN, nativeX, xValues, yValues);
            // Push metadata should be done before push x values
            this.appendMetadataRange(metadata, xValues.length);
            this.doubleVectorProvider.appendArray(this.webAssemblyContext, nativeX, xValues);
            this.doubleVectorProvider.appendArray(this.webAssemblyContext, nativeY, yValues);
            this.doubleVectorProvider.appendArray(this.webAssemblyContext, nativeZ, zValues);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Append, null, xValues.length);
        }
    };
    /**
     * Updates a single Y, Z-value by X-index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param y The new Y value
     * @param z The new Z value
     * @param metadata The point metadata
     */
    XyzDataSeries.prototype.update = function (index, y, z, metadata) {
        if (!this.getIsDeleted()) {
            this.validateIndex(index);
            this.dataDistributionCalculator.onUpdate(this.isSorted, this.containsNaN, undefined, undefined, [y], index);
            this.getNativeYValues().set(index, y);
            this.getNativeZValues().set(index, z);
            this.setMetadataAt(index, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Update, index, 1);
        }
    };
    /**
     * Updates a single X, Y, Z-value by X-index. Might also need to set isSorted = false
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param x The new X value
     * @param y The new Y value
     * @param z The new Z value
     * @param metadata The point metadata
     */
    XyzDataSeries.prototype.updateXyz = function (index, x, y, z, metadata) {
        if (!this.getIsDeleted()) {
            this.validateIndex(index);
            var nativeX = this.getNativeXValues();
            this.dataDistributionCalculator.onUpdate(this.isSorted, this.containsNaN, nativeX, [x], [y], index);
            nativeX.set(index, x);
            this.getNativeYValues().set(index, y);
            this.getNativeZValues().set(index, z);
            this.setMetadataAt(index, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Update, index, 1);
        }
    };
    /**
     * Inserts a single X,Y,Z value at the start index
     * @remarks
     * For best performance on drawing large datasets, use the {@link insertRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param x the Xvalue
     * @param y the YValue
     * @param z the ZValue
     * @param metadata The point metadata
     */
    XyzDataSeries.prototype.insert = function (startIndex, x, y, z, metadata) {
        if (!this.getIsDeleted()) {
            this.validateIndex(startIndex, "Start index is out of range");
            this.throwIfFifo("insert");
            var nativeX = this.getNativeXValues();
            var nativeY = this.getNativeYValues();
            var nativeZ = this.getNativeZValues();
            this.dataDistributionCalculator.onInsert(this.isSorted, this.containsNaN, nativeX, [x], [y], startIndex);
            nativeX.insertAt(startIndex, x);
            nativeY.insertAt(startIndex, y);
            nativeZ.insertAt(startIndex, z);
            this.insertMetadata(startIndex, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Insert, startIndex, 1);
        }
    };
    /**
     * Inserts a range of X,Y,Z values at the startIndex
     * @remarks
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param xValues the XValues
     * @param yValues the YValues
     * @param zValues the ZValues
     * @param metadata The array of point metadata
     */
    XyzDataSeries.prototype.insertRange = function (startIndex, xValues, yValues, zValues, metadata) {
        if (!this.getIsDeleted()) {
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(xValues) || (0, NumberArray_1.isTypedArray)(xValues), "xValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(yValues) || (0, NumberArray_1.isTypedArray)(yValues), "yValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(zValues) || (0, NumberArray_1.isTypedArray)(zValues), "zValues must be an array of numbers");
            this.validateIndex(startIndex, "Start index is out of range");
            this.throwIfFifo("insertRange");
            Guard_1.Guard.arraysSameLengthArr([
                { arg: xValues, name: "xValues" },
                { arg: yValues, name: "yValues" },
                { arg: zValues, name: "zValues" }
            ]);
            if (metadata) {
                Guard_1.Guard.isTrue(Array.isArray(metadata), "metadata must be an array of IPointMetadata");
                Guard_1.Guard.arraysSameLength(xValues, "xValues", metadata, "metadata");
            }
            var nativeX = this.getNativeXValues();
            this.dataDistributionCalculator.onInsert(this.isSorted, this.containsNaN, nativeX, xValues, yValues, startIndex);
            (0, appendDoubleVectorFromJsArray_1.insertDoubleVectorFromJsArray)(this.webAssemblyContext, xValues, nativeX, startIndex);
            (0, appendDoubleVectorFromJsArray_1.insertDoubleVectorFromJsArray)(this.webAssemblyContext, yValues, this.getNativeYValues(), startIndex);
            (0, appendDoubleVectorFromJsArray_1.insertDoubleVectorFromJsArray)(this.webAssemblyContext, zValues, this.getNativeZValues(), startIndex);
            this.insertMetadataRange(startIndex, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Insert, startIndex, xValues.length);
        }
    };
    /**
     * Removes a single X,Y,Z value at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to remove at
     */
    XyzDataSeries.prototype.removeAt = function (index) {
        if (!this.getIsDeleted()) {
            this.validateIndex(index);
            this.throwIfFifo("removeAt");
            this.getNativeXValues().removeAt(index);
            this.getNativeYValues().removeAt(index);
            this.getNativeZValues().removeAt(index);
            this.removeMetadataAt(index);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Remove, index, 1);
        }
    };
    /**
     * Removes a range of X,Y,Z values at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the start index to remove at
     * @param count the number of points to remove
     */
    XyzDataSeries.prototype.removeRange = function (startIndex, count) {
        if (!this.getIsDeleted()) {
            this.validateIndex(startIndex, "Start index is out of range");
            this.throwIfFifo("removeRange");
            this.getNativeXValues().removeRange(startIndex, count);
            this.getNativeYValues().removeRange(startIndex, count);
            this.getNativeZValues().removeRange(startIndex, count);
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
    XyzDataSeries.prototype.clear = function () {
        if (!this.getIsDeleted()) {
            _super.prototype.clear.call(this);
            this.getNativeXValues().clear();
            this.getNativeYValues().clear();
            this.getNativeZValues().clear();
            this.setMetadata(undefined);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Clear, null, null);
        }
    };
    /** @inheritDoc */
    XyzDataSeries.prototype.delete = function () {
        this.zValues = (0, Deleter_1.deleteSafe)(this.zValues);
        this.zInitialAnimationValues = (0, Deleter_1.deleteSafe)(this.zInitialAnimationValues);
        this.zFinalAnimationValues = (0, Deleter_1.deleteSafe)(this.zFinalAnimationValues);
        _super.prototype.delete.call(this);
    };
    /** @inheritDoc */
    XyzDataSeries.prototype.createAnimationVectors = function () {
        _super.prototype.createAnimationVectors.call(this);
        this.zInitialAnimationValues = this.doubleVectorProvider.getDoubleVector(this.webAssemblyContext);
        this.zFinalAnimationValues = this.doubleVectorProvider.getDoubleVector(this.webAssemblyContext);
    };
    /** @inheritDoc */
    XyzDataSeries.prototype.setInitialAnimationVectors = function (dataSeries) {
        _super.prototype.setInitialAnimationVectors.call(this, dataSeries);
        if (!dataSeries) {
            this.zInitialAnimationValues.resize(0, 0);
            return;
        }
        (0, copyVector_1.copyDoubleVector)(dataSeries.getNativeZValues(), this.zInitialAnimationValues, this.webAssemblyContext);
    };
    /** @inheritDoc */
    XyzDataSeries.prototype.setFinalAnimationVectors = function (dataSeries) {
        _super.prototype.setFinalAnimationVectors.call(this, dataSeries);
        if (!dataSeries) {
            this.zFinalAnimationValues.resize(0, 0);
            return;
        }
        (0, copyVector_1.copyDoubleVector)(dataSeries.getNativeZValues(), this.zFinalAnimationValues, this.webAssemblyContext);
    };
    /** @inheritDoc */
    XyzDataSeries.prototype.validateAnimationVectors = function () {
        _super.prototype.validateAnimationVectors.call(this);
        var size = this.xInitialAnimationValues.size();
        if (size !== this.zInitialAnimationValues.size() || size !== this.zFinalAnimationValues.size()) {
            throw Error("initialAnimationValues and finalAnimationValues must have the same length");
        }
    };
    /** @inheritDoc */
    XyzDataSeries.prototype.updateAnimationProperties = function (progress, animation) {
        _super.prototype.updateAnimationProperties.call(this, progress, animation);
        if (animation.isOnStartAnimation) {
            animation.calculateAnimationValues(this.webAssemblyContext, this.zFinalAnimationValues, this.getNativeZValues(), progress, true);
        }
        else if (animation.isDataSeriesAnimation) {
            animation.calculateDataSeriesAnimationValues(this.webAssemblyContext, this.zInitialAnimationValues, this.zFinalAnimationValues, this.getNativeZValues(), progress);
        }
    };
    /** @inheritDoc */
    XyzDataSeries.prototype.getOptions = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.getOptions.call(this, excludeData);
        if (!excludeData) {
            var dataSize = this.count();
            var xValues = new Array(dataSize);
            var yValues = new Array(dataSize);
            var zValues = new Array(dataSize);
            if (this.fifoCapacity && this.fifoSweeping) {
                for (var i = 0; i < dataSize; i++) {
                    xValues[i] = this.xValues.getRaw(i);
                    yValues[i] = this.yValues.getRaw(i);
                    zValues[i] = this.zValues.getRaw(i);
                }
            }
            else {
                for (var i = 0; i < dataSize; i++) {
                    xValues[i] = this.xValues.get(i);
                    yValues[i] = this.yValues.get(i);
                    zValues[i] = this.zValues.get(i);
                }
            }
            var options = {
                xValues: xValues,
                yValues: yValues,
                zValues: zValues
            };
            Object.assign(json, options);
        }
        return json;
    };
    XyzDataSeries.prototype.reserve = function (size) {
        _super.prototype.reserve.call(this, size);
        this.zValues.reserve(size);
    };
    XyzDataSeries.prototype.getYZValues = function (dataSeriesValueType) {
        var yValues;
        var zValues;
        switch (dataSeriesValueType) {
            case IDataSeries_1.EDataSeriesValueType.FinalAnimationValues:
                yValues = this.yFinalAnimationValues;
                zValues = this.zFinalAnimationValues;
                break;
            case IDataSeries_1.EDataSeriesValueType.InitialAnimationValues:
                yValues = this.yInitialAnimationValues;
                zValues = this.zInitialAnimationValues;
                break;
            default:
                yValues = this.yValues;
                zValues = this.zValues;
        }
        return { yValues: yValues, zValues: zValues };
    };
    return XyzDataSeries;
}(BaseDataSeries_1.BaseDataSeries));
exports.XyzDataSeries = XyzDataSeries;
