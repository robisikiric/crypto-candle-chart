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
exports.XyTextDataSeries = void 0;
var Guard_1 = require("../../Core/Guard");
var NumberArray_1 = require("../../types/NumberArray");
var array_1 = require("../../utils/array");
var appendDoubleVectorFromJsArray_1 = require("../../utils/ccall/appendDoubleVectorFromJsArray");
var BaseDataSeries_1 = require("./BaseDataSeries");
var IDataSeries_1 = require("./IDataSeries");
var XyTextDataSeries = /** @class */ (function (_super) {
    __extends(XyTextDataSeries, _super);
    /**
     * Creates an instance of {@link XyDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 WebAssembly rendering engine
     * @param options the {@link IXyDataSeriesOptions} which can be passed to configure the DataSeries at construct time
     */
    function XyTextDataSeries(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        /**
         * @inheritDoc
         */
        _this.type = IDataSeries_1.EDataSeriesType.XyText;
        _this.textValuesProperty = [];
        if (options === null || options === void 0 ? void 0 : options.xValues) {
            Guard_1.Guard.notNull(options.yValues, "options.yValues");
            _this.appendRange(options.xValues, options.yValues, options.textValues, options.metadata);
        }
        return _this;
    }
    Object.defineProperty(XyTextDataSeries.prototype, "textValues", {
        /** The text values for this series.  Manipulate using append, insert, update etc on the XyTextDataSeries  */
        get: function () {
            return this.textValuesProperty;
        },
        enumerable: false,
        configurable: true
    });
    /** Get the text value at an index, unwrapping the fifo buffer if fifoCapacity is set */
    XyTextDataSeries.prototype.getTextValue = function (index) {
        if (!this.fifoCapacity)
            return this.textValuesProperty[index];
        if (!this.fifoSweeping) {
            var fifoIndex = (this.xValues.getStartIndex() + index) % this.fifoCapacity;
            return this.textValuesProperty[fifoIndex];
        }
        else {
            if (this.fifoCapacity - index < this.fifoSweepingGap) {
                return "";
            }
            return this.textValuesProperty[index];
        }
    };
    /**
     * Appends a single X, Y, Text point to the DataSeries
     * @remarks
     * For best performance on drawing large datasets, use the {@link appendRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param x The X-value
     * @param y The Y-value
     * @param text The text-value
     * @param metadata The point metadata
     */
    XyTextDataSeries.prototype.append = function (x, y, text, metadata) {
        if (!this.getIsDeleted()) {
            var nativeX = this.getNativeXValues();
            this.dataDistributionCalculator.onAppend(this.isSorted, this.containsNaN, nativeX, [x], [y]);
            // Push metadata should be done before push x values
            this.appendMetadata(metadata);
            // Fifo text also before values as startIndex gets updated by nativeX push
            if (this.fifoCapacity && this.count() === this.fifoCapacity) {
                this.textValuesProperty[this.xValues.getStartIndex()] = text;
            }
            else {
                this.textValuesProperty.push(text);
            }
            nativeX.push_back(x);
            this.getNativeYValues().push_back(y);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Append, null, 1);
        }
    };
    /**
     * Appends a range of X, Y, Text points to the DataSeries
     * @remarks
     * This method is considerably higher performance than {@link append} which appends a single point
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param xValues The X-values
     * @param yValues The Y-values
     * @param textValues The text values
     * @param metadata The array of point metadata
     */
    XyTextDataSeries.prototype.appendRange = function (xValues, yValues, textValues, metadata) {
        var _a;
        if (!this.getIsDeleted()) {
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
            if (this.fifoCapacity) {
                (0, array_1.appendRangeFifo)(textValues, this.textValuesProperty, this.fifoCapacity, this.xValues.getStartIndex());
            }
            else {
                (_a = this.textValuesProperty).push.apply(_a, textValues);
            }
            // New implementation passing array from JS
            // TODO: create indexValues from c++
            this.doubleVectorProvider.appendArray(this.webAssemblyContext, nativeX, xValues);
            this.doubleVectorProvider.appendArray(this.webAssemblyContext, nativeY, yValues);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Append, null, xValues.length);
        }
    };
    /**
     * Updates a single Y-value by X-index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to update
     * @param y The new Y value
     * @param text The new text value
     * @param metadata The point metadata
     */
    XyTextDataSeries.prototype.update = function (index, y, text, metadata) {
        if (!this.getIsDeleted()) {
            this.validateIndex(index);
            this.dataDistributionCalculator.onUpdate(this.isSorted, this.containsNaN, undefined, undefined, [y], index);
            this.getNativeYValues().set(index, y);
            this.textValuesProperty[index] = text;
            this.setMetadataAt(index, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Update, index, 1);
        }
    };
    /**
     * Updates a single X, Y, Text value, by X-index. Might also need to set isSorted = false
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index The index to update
     * @param x The new X value
     * @param y The new Y value
     * @param text The new text value
     * @param metadata The point metadata
     */
    XyTextDataSeries.prototype.updateXyText = function (index, x, y, text, metadata) {
        if (!this.getIsDeleted()) {
            this.validateIndex(index);
            var nativeX = this.getNativeXValues();
            this.dataDistributionCalculator.onUpdate(this.isSorted, this.containsNaN, nativeX, [x], [y], index);
            nativeX.set(index, x);
            this.getNativeYValues().set(index, y);
            this.textValuesProperty[index] = text;
            this.setMetadataAt(index, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Update, index, 1);
        }
    };
    /**
     * @summary Inserts a single X,Y,Text value at the start index
     * @remarks
     * For best performance on drawing large datasets, use the {@link insertRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param startIndex the index to insert at
     * @param x the X value
     * @param y the Y value
     * @param text The new text value
     * @param metadata The point metadata
     */
    XyTextDataSeries.prototype.insert = function (startIndex, x, y, text, metadata) {
        if (!this.getIsDeleted()) {
            this.validateIndex(startIndex, "Start index is out of range");
            this.throwIfFifo("insert");
            var nativeX = this.getNativeXValues();
            var nativeY = this.getNativeYValues();
            this.dataDistributionCalculator.onInsert(this.isSorted, this.containsNaN, nativeX, [x], [y], startIndex);
            nativeX.insertAt(startIndex, x);
            nativeY.insertAt(startIndex, y);
            this.textValuesProperty.splice(startIndex, 0, text);
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
     * @param textValues The text values
     * @param metadata The array of point metadata
     */
    XyTextDataSeries.prototype.insertRange = function (startIndex, xValues, yValues, textValues, metadata) {
        var _a;
        if (!this.getIsDeleted()) {
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(xValues) || (0, NumberArray_1.isTypedArray)(xValues), "xValues must be an array of numbers");
            Guard_1.Guard.isTrue((0, NumberArray_1.isNumberArray)(yValues) || (0, NumberArray_1.isTypedArray)(yValues), "yValues must be an array of numbers");
            this.validateIndex(startIndex, "Start index is out of range");
            this.throwIfFifo("insertRange");
            Guard_1.Guard.arraysSameLength(xValues, "xValues", yValues, "yValues");
            if (metadata) {
                Guard_1.Guard.isTrue(Array.isArray(metadata), "metadata must be an array of IPointMetadata");
                Guard_1.Guard.arraysSameLength(xValues, "xValues", metadata, "metadata");
            }
            var nativeX = this.getNativeXValues();
            this.dataDistributionCalculator.onInsert(this.isSorted, this.containsNaN, nativeX, xValues, yValues, startIndex);
            (0, appendDoubleVectorFromJsArray_1.insertDoubleVectorFromJsArray)(this.webAssemblyContext, xValues, this.getNativeXValues(), startIndex);
            (0, appendDoubleVectorFromJsArray_1.insertDoubleVectorFromJsArray)(this.webAssemblyContext, yValues, this.getNativeYValues(), startIndex);
            (_a = this.textValuesProperty).splice.apply(_a, __spreadArray([startIndex, 0], textValues, false));
            this.insertMetadataRange(startIndex, metadata);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Insert, startIndex, xValues.length);
        }
    };
    /**
     * Removes an X,Y value at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChartSurface}
     * @param index the index to remove at
     */
    XyTextDataSeries.prototype.removeAt = function (index) {
        if (!this.getIsDeleted()) {
            this.validateIndex(index);
            this.throwIfFifo("removeAt");
            this.getNativeXValues().removeAt(index);
            this.getNativeYValues().removeAt(index);
            this.textValuesProperty.splice(index, 1);
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
    XyTextDataSeries.prototype.removeRange = function (startIndex, count) {
        if (!this.getIsDeleted()) {
            this.validateIndex(startIndex, "Start index is out of range");
            this.throwIfFifo("removeRange");
            this.getNativeXValues().removeRange(startIndex, count);
            this.getNativeYValues().removeRange(startIndex, count);
            this.textValuesProperty.splice(startIndex, count);
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
    XyTextDataSeries.prototype.clear = function () {
        if (!this.getIsDeleted()) {
            _super.prototype.clear.call(this);
            this.getNativeXValues().clear();
            this.getNativeYValues().clear();
            this.textValuesProperty = [];
            this.setMetadata(undefined);
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Clear, null, null);
        }
    };
    XyTextDataSeries.prototype.getOptions = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.getOptions.call(this);
        if (!excludeData) {
            var dataSize = this.count();
            var xValues = new Array(dataSize);
            var yValues = new Array(dataSize);
            for (var i = 0; i < dataSize; i++) {
                xValues[i] = this.xValues.get(i);
                yValues[i] = this.yValues.get(i);
            }
            var options = {
                xValues: xValues,
                yValues: yValues,
                textValues: this.textValuesProperty
            };
            Object.assign(json, options);
        }
        return json;
    };
    return XyTextDataSeries;
}(BaseDataSeries_1.BaseDataSeries));
exports.XyTextDataSeries = XyTextDataSeries;
