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
exports.XyzDataSeries3D = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var Guard_1 = require("../../../Core/Guard");
var NumberRange_1 = require("../../../Core/NumberRange");
var BaseDataSeries3D_1 = require("./BaseDataSeries3D");
/**
 * {@link XyzDataSeries3D} is a DataSeries for holding X, Y, Z data in SciChart's
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks
 * The {@link XyzDataSeries3D} is primarily used with our {@link ScatterRenderableSeries3D | JavaScript Scatter & Bubble Chart},
 * which draws a variable-sized bubble or shape at each X,Y,Z value
 *
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries3D | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseDataSeries3D} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries3D} to find out what 3D JavaScript Chart types are available.
 */
var XyzDataSeries3D = /** @class */ (function (_super) {
    __extends(XyzDataSeries3D, _super);
    /**
     * Creates an instance of {@link XyzDataSeries3D}
     * @param webAssemblyContext the {@link TSciChart3D | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options the {@link IXyzDataSeries3DOptions} which can be passed to configure the DataSeries at construct time
     */
    function XyzDataSeries3D(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        _this.type = BaseDataSeries3D_1.EDataSeriesType3D.Xyz3D;
        _this.xValues = new webAssemblyContext.SCRTDoubleVector();
        _this.yValues = new webAssemblyContext.SCRTDoubleVector();
        _this.zValues = new webAssemblyContext.SCRTDoubleVector();
        _this.metadata = [];
        if ((options === null || options === void 0 ? void 0 : options.xValues) && (options === null || options === void 0 ? void 0 : options.yValues) && (options === null || options === void 0 ? void 0 : options.zValues)) {
            _this.appendRange(options.xValues, options.yValues, options.zValues, options === null || options === void 0 ? void 0 : options.metadata);
        }
        return _this;
    }
    /**
     * Gets a native / WebAssembly vector of X-values in the DataSeries
     */
    XyzDataSeries3D.prototype.getNativeXValues = function () {
        return this.xValues;
    };
    /**
     * Gets a native / WebAssembly vector of Y-values in the DataSeries
     */
    XyzDataSeries3D.prototype.getNativeYValues = function () {
        return this.yValues;
    };
    /**
     * Gets a native / WebAssembly vector of Z-values in the DataSeries
     */
    XyzDataSeries3D.prototype.getNativeZValues = function () {
        return this.zValues;
    };
    /**
     * Gets a native / WebAssembly vector of {@link IPointMetadata3D | Metadata values} in the DataSeries
     */
    XyzDataSeries3D.prototype.getMetadataValues = function () {
        return this.metadata;
    };
    Object.defineProperty(XyzDataSeries3D.prototype, "xRange", {
        /**
         * @inheritDoc
         */
        get: function () {
            var nativeRange = this.webAssemblyContext.NumberUtil.MinMax(this.xValues);
            var tsRange = new NumberRange_1.NumberRange(nativeRange.minD, nativeRange.maxD);
            nativeRange.delete();
            return tsRange;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(XyzDataSeries3D.prototype, "yRange", {
        /**
         * @inheritDoc
         */
        get: function () {
            var nativeRange = this.webAssemblyContext.NumberUtil.MinMax(this.yValues);
            var tsRange = new NumberRange_1.NumberRange(nativeRange.minD, nativeRange.maxD);
            nativeRange.delete();
            return tsRange;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(XyzDataSeries3D.prototype, "zRange", {
        /**
         * @inheritDoc
         */
        get: function () {
            var nativeRange = this.webAssemblyContext.NumberUtil.MinMax(this.zValues);
            var tsRange = new NumberRange_1.NumberRange(nativeRange.minD, nativeRange.maxD);
            nativeRange.delete();
            return tsRange;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Appends a single X, Y, Z point to the {@link XyzDataSeries3D}
     * @remarks
     * For best performance on drawing large datasets, use the {@link appendRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChart3DSurface}
     * @param x The X-value
     * @param y The Y-value
     * @param z The Z-value
     * @param metadata An optional {@link IPointMetadata3D} value
     */
    XyzDataSeries3D.prototype.append = function (x, y, z, metadata) {
        if (!this.getIsDeleted()) {
            this.xValues.push_back(x);
            this.yValues.push_back(y);
            this.zValues.push_back(z);
            this.metadata.push(metadata); // its ok to push undefined here as its not a sparse array
            this.notifyDataChanged();
        }
    };
    /**
     * Appends a range of X, Y, Z points to the {@link XyzDataSeries3D}
     * @remarks
     * This method is considerably higher performance than {@link append} which appends a single point
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChart3DSurface}
     * @param xValues The X-values
     * @param yValues The Y-values
     * @param zValues The Z-values
     * @param metadatas Optional {@link IPointMetadata3D} values
     */
    XyzDataSeries3D.prototype.appendRange = function (xValues, yValues, zValues, metadatas) {
        if (!this.getIsDeleted()) {
            Guard_1.Guard.arraysSameLength(xValues, "xValues", yValues, "yValues");
            Guard_1.Guard.arraysSameLength(yValues, "yValues", zValues, "zValues");
            var nativeX = this.xValues;
            var nativeY = this.yValues;
            var nativeZ = this.zValues;
            for (var i = 0; i < xValues.length; i++) {
                nativeX.push_back(xValues[i]);
                nativeY.push_back(yValues[i]);
                nativeZ.push_back(zValues[i]);
                if (metadatas) {
                    var metadata = metadatas[i];
                    this.metadata.push(metadata);
                }
                else {
                    this.metadata.push(undefined); // its ok to push undefined here as its not a sparse array
                }
            }
            this.notifyDataChanged();
        }
    };
    /**
     * Updates a single X, Y, Z-value by index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChart3DSurface}
     * @param index the index to update
     * @param x The new X value
     * @param y The new Y value
     * @param z The new Z value
     */
    XyzDataSeries3D.prototype.update = function (index, x, y, z, metadata) {
        if (!this.getIsDeleted()) {
            this.xValues.set(index, x);
            this.yValues.set(index, y);
            this.zValues.set(index, z);
            this.metadata[index] = metadata;
            this.notifyDataChanged();
        }
    };
    /**
     * Inserts a single X,Y,Z value at the start index
     * @remarks
     * For best performance on drawing large datasets, use the {@link insertRange} method
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChart3DSurface}
     * @param startIndex the index to insert at
     * @param x the Xvalue
     * @param y the YValue
     * @param z the ZValue
     * @param metadata Optional metadata value
     */
    XyzDataSeries3D.prototype.insert = function (startIndex, x, y, z, metadata) {
        if (!this.getIsDeleted()) {
            if (startIndex < 0 || startIndex >= this.count()) {
                throw new Error("Start index is out of range");
            }
            this.xValues.insertAt(startIndex, x);
            this.yValues.insertAt(startIndex, y);
            this.zValues.insertAt(startIndex, z);
            this.metadata.splice(startIndex, 0, metadata);
            this.notifyDataChanged();
        }
    };
    /**
     * Inserts a range of X,Y,Z values at the startIndex
     * @remarks
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChart3DSurface}
     * @param startIndex the index to insert at
     * @param xValues the XValues
     * @param yValues the YValues
     * @param zValues the ZValues
     * @param metadatas Optional metadata values to insert
     */
    XyzDataSeries3D.prototype.insertRange = function (startIndex, xValues, yValues, zValues, metadatas) {
        if (!this.getIsDeleted()) {
            Guard_1.Guard.arraysSameLength(xValues, "xValues", yValues, "yValues");
            Guard_1.Guard.arraysSameLength(zValues, "zValues", yValues, "yValues");
            if (startIndex < 0 || startIndex >= this.count()) {
                throw new Error("Start index is out of range");
            }
            var rangeLength = xValues.length;
            for (var i = 0; i < rangeLength; i++, startIndex++) {
                this.xValues.insertAt(startIndex, xValues[i]);
                this.yValues.insertAt(startIndex, yValues[i]);
                this.zValues.insertAt(startIndex, zValues[i]);
                this.metadata.splice(startIndex, 0, metadatas ? metadatas[i] : undefined);
            }
            this.notifyDataChanged();
        }
    };
    /**
     * Removes a single X,Y,Z value at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChart3DSurface}
     * @param index the index to remove at
     */
    XyzDataSeries3D.prototype.removeAt = function (index) {
        if (!this.getIsDeleted()) {
            if (index < 0 || index >= this.count()) {
                throw new Error("index is out of range");
            }
            this.xValues.removeAt(index);
            this.yValues.removeAt(index);
            this.zValues.removeAt(index);
            this.metadata.splice(index, 1);
            this.notifyDataChanged();
        }
    };
    /**
     * Removes a range of X,Y,Z values at the specified index
     * @remarks Any changes of the DataSeries will trigger a redraw on the parent {@link SciChart3DSurface}
     * @param startIndex the start index to remove at
     * @param count the number of points to remove
     */
    XyzDataSeries3D.prototype.removeRange = function (startIndex, count) {
        if (!this.getIsDeleted()) {
            if (startIndex < 0 || startIndex + count > this.count()) {
                throw new Error("index is out of range");
            }
            this.xValues.removeRange(startIndex, count);
            this.yValues.removeRange(startIndex, count);
            this.zValues.removeRange(startIndex, count);
            this.metadata.splice(startIndex, count);
            this.notifyDataChanged();
        }
    };
    /**
     * Clears the entire DataSeries.
     * @remarks
     * Note this does not free memory, WebAssembly/Native memory is released by calling {@link delete}, after which the
     * DataSeries is no longer usable.
     *
     * Any changes of the DataSeries will trigger a redraw on the parent {@link SciChart3DSurface}
     */
    XyzDataSeries3D.prototype.clear = function () {
        if (!this.getIsDeleted()) {
            this.xValues.clear();
            this.yValues.clear();
            this.zValues.clear();
            this.metadata = [];
            this.notifyDataChanged();
        }
    };
    /**
     * @inheritDoc
     */
    XyzDataSeries3D.prototype.delete = function () {
        this.xValues = (0, Deleter_1.deleteSafe)(this.xValues);
        this.yValues = (0, Deleter_1.deleteSafe)(this.yValues);
        this.zValues = (0, Deleter_1.deleteSafe)(this.zValues);
        this.metadata = [];
        _super.prototype.delete.call(this);
    };
    /**
     * Gets the count of data-points in the DataSeries
     */
    XyzDataSeries3D.prototype.count = function () {
        if (this.xValues) {
            return this.xValues.size();
        }
        return 0;
    };
    return XyzDataSeries3D;
}(BaseDataSeries3D_1.BaseDataSeries3D));
exports.XyzDataSeries3D = XyzDataSeries3D;
