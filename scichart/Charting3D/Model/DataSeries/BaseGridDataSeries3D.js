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
exports.BaseGridDataSeries3D = void 0;
var NumberRange_1 = require("../../../Core/NumberRange");
var BaseDataSeries3D_1 = require("./BaseDataSeries3D");
/**
 * @summary The base class for a Grid (two-dimensional array) DataSeries in SciChart's
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @description
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries3D | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * The Grid DataSeries type is used for 3D Charts that have a uniform grid of values, for example {@link SurfaceMeshRenderableSeries3D},
 * which draws a 3D surface-plot or mesh chart with contours.
 * @remarks See derived type {@link UniformGridDataSeries3D} for a concrete implementation
 */
var BaseGridDataSeries3D = /** @class */ (function (_super) {
    __extends(BaseGridDataSeries3D, _super);
    /**
     * Creates an instance of the {@link BaseGridDataSeries3D}
     * @param webAssemblyContext the {@link TSciChart3D | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options optional parameters of type {@link IBaseGridDataSeries3DOptions} to configure the series
     */
    function BaseGridDataSeries3D(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        // Copy yValues
        _this.setYValues(options === null || options === void 0 ? void 0 : options.yValues);
        return _this;
    }
    Object.defineProperty(BaseGridDataSeries3D.prototype, "yRange", {
        /**
         * Gets the total extends of the GridDataSeries3D in the y-range
         */
        get: function () {
            if (!this.yRangeCached) {
                var max = -Number.MAX_VALUE;
                var min = Number.MAX_VALUE;
                for (var z = 0; z < this.zSizeProperty; z++) {
                    for (var x = 0; x < this.xSizeProperty; x++) {
                        var current = this.yValuesProperty[z][x];
                        max = Math.max(current, max);
                        min = Math.min(current, min);
                    }
                }
                this.yRangeCached = new NumberRange_1.NumberRange(min, max);
            }
            return this.yRangeCached;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseGridDataSeries3D.prototype, "zSize", {
        /**
         * The zSize is the HEIGHT or number of rows of the 2-dimensional array,
         * e.g. [[1, 2][3, 4][5, 6]] has a height of 3
         */
        get: function () {
            return this.zSizeProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseGridDataSeries3D.prototype, "xSize", {
        /**
         * The xSize is the WIDTH or number of elements in each or of the 2-dimensional array,
         * e.g. [[1, 2][3, 4][5, 6]] has a xSize of 2
         */
        get: function () {
            return this.xSizeProperty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets a 2D array of YValues. Input is in the format YValues[z][x]
     * where z is 0 to zSize and X is 0 to xSize
     * Note that setting the YValues involves a clone. Once the array has been set you cannot manipulate
     * the input array and expect changes on the chart.
     * @param zValues
     */
    BaseGridDataSeries3D.prototype.setYValues = function (YValues) {
        if (!YValues || !YValues[0]) {
            this.yValuesProperty = undefined;
            this.xSizeProperty = 0;
            this.zSizeProperty = 0;
            return;
        }
        var firstRowLength = YValues[0].length;
        YValues.forEach(function (zRow) {
            if (!zRow) {
                throw new Error("Each row in YValues must be defined. See how to declare a 2D array in Javascript here https://stackoverflow.com/a/966234/303612");
            }
            if (zRow.length !== firstRowLength) {
                throw new Error("Each row in YValues must be the same length, so that the overall 2D array is square");
            }
        });
        var w = YValues[0].length;
        var h = YValues.length;
        this.xSizeProperty = w;
        this.zSizeProperty = h;
        this.yValuesProperty = YValues;
        this.notifyDataChanged();
    };
    /**
     * Gets the Y-Values array as a two dimensional array. Output is in the format YValues[z][x]
     * where z is 0 to zSize and X is 0 to xSize.
     */
    BaseGridDataSeries3D.prototype.getYValues = function () {
        return this.yValuesProperty;
    };
    /**
     * Gets the YValue at the specific Z,X index where Z must be within 0-zSize and X must be within 0-xSize
     * @param zIndex the z-index from 0 to zSize
     * @param xIndex the x-index from 0 to xSize
     */
    BaseGridDataSeries3D.prototype.getYValue = function (zIndex, xIndex) {
        try {
            return this.yValuesProperty[zIndex][xIndex];
        }
        catch (_a) {
            console.log("error at get z,x ".concat(zIndex, ", ").concat(xIndex));
            return 0;
        }
    };
    /**
     * Sets the YValue at the specific Z,X index where Z must be within 0-zSize and X must be within 0-xSize
     * @param zIndex the z-index from 0 to zSize
     * @param xIndex the x-index from 0 to xSize
     * @param YValue the new Height-value
     */
    BaseGridDataSeries3D.prototype.setYValue = function (zIndex, xIndex, yValue) {
        this.yValuesProperty[zIndex][xIndex] = yValue;
        this.notifyDataChanged();
    };
    /**
     * @inheritDoc
     */
    BaseGridDataSeries3D.prototype.notifyDataChanged = function () {
        _super.prototype.notifyDataChanged.call(this);
        // setting to undefined requires recreation of this on next call to .getYRange()
        this.yRangeCached = undefined;
    };
    return BaseGridDataSeries3D;
}(BaseDataSeries3D_1.BaseDataSeries3D));
exports.BaseGridDataSeries3D = BaseGridDataSeries3D;
