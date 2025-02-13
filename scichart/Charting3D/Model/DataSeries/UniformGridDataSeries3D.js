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
exports.UniformGridDataSeries3D = void 0;
var NumberRange_1 = require("../../../Core/NumberRange");
var BaseDataSeries3D_1 = require("./BaseDataSeries3D");
var BaseGridDataSeries3D_1 = require("./BaseGridDataSeries3D");
/**
 * @summary The {@link UniformGridDataSeries3D} wraps a 2D array of numbers which become the Y-values (heights) in various
 * {@link BaseRenderableSeries3D} in SciChart's High Performance
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}.
 * @description
 * The {@link SurfaceMeshRenderableSeries3D} requires a 2D array of numbers to map to Y-values (heights).
 *
 * The {@link xStart}, {@link xStep} properties define the extents of the data in the X-direction, and {@link yStart}, {@link yStep}
 * define the extents of the data in the Y-direction.
 *
 * Y-values may be updated via manipulating the array returned by {@link getYValues}, or by setting a new array to {@link setYValues}. When
 * manpulating data directly, be sure to call {@link notifyDataChanged} to inform SciChart to redraw.
 */
var UniformGridDataSeries3D = /** @class */ (function (_super) {
    __extends(UniformGridDataSeries3D, _super);
    /**
     * Creates an instance of a {@link UniformGridDataSeries3D}
     * @param webAssemblyContext the {@link TSciChart3D | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options optional parameters of type {@link IUniformGridDataSeries3DOptions} to configure the series
     */
    function UniformGridDataSeries3D(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        _this.type = BaseDataSeries3D_1.EDataSeriesType3D.UniformGrid3D;
        _this.xStartProperty = (options === null || options === void 0 ? void 0 : options.xStart) || 0;
        _this.xStepProperty = (options === null || options === void 0 ? void 0 : options.xStep) || 1;
        _this.zStartProperty = (options === null || options === void 0 ? void 0 : options.zStart) || 0;
        _this.zStepProperty = (options === null || options === void 0 ? void 0 : options.zStep) || 1;
        return _this;
    }
    Object.defineProperty(UniformGridDataSeries3D.prototype, "xStart", {
        /**
         * xStart defines the Start point on the {@link AxisBase3D | XAxis} where this grid or mesh will be drawn
         */
        get: function () {
            return this.xStartProperty;
        },
        /**
         * xStart defines the Start point on the {@link AxisBase3D | XAxis} where this grid or mesh will be drawn
         */
        set: function (xStart) {
            this.xStartProperty = xStart;
            this.notifyDataChanged();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniformGridDataSeries3D.prototype, "xStep", {
        /**
         * xStep defines Step on the {@link AxisBase3D | XAxis} for each cell in the grid or mesh
         */
        get: function () {
            return this.xStepProperty;
        },
        /**
         * xStep defines Step on the {@link AxisBase3D | XAxis} for each cell in the grid or mesh
         */
        set: function (xStep) {
            this.xStepProperty = xStep;
            this.notifyDataChanged();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniformGridDataSeries3D.prototype, "zStart", {
        /**
         * zStart defines the Start point on the {@link AxisBase3D | ZAxis} where this grid or mesh will be drawn
         */
        get: function () {
            return this.zStartProperty;
        },
        /**
         * zStart defines the Start point on the {@link AxisBase3D | ZAxis} where this grid or mesh will be drawn
         */
        set: function (zStart) {
            this.zStartProperty = zStart;
            this.notifyDataChanged();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniformGridDataSeries3D.prototype, "zStep", {
        /**
         * zStep defines Step on the {@link AxisBase3D | ZAxis} for each cell in the grid or mesh
         */
        get: function () {
            return this.zStepProperty;
        },
        /**
         * zStep defines Step on the {@link AxisBase3D | ZAxis} for each cell in the grid or mesh
         */
        set: function (zStep) {
            this.zStepProperty = zStep;
            this.notifyDataChanged();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniformGridDataSeries3D.prototype, "xRange", {
        /**
         * @inheritDoc
         */
        get: function () {
            return new NumberRange_1.NumberRange(this.xStart, this.xStart + this.xStep * (this.xSize - 1));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniformGridDataSeries3D.prototype, "zRange", {
        /**
         * @inheritDoc
         */
        get: function () {
            return new NumberRange_1.NumberRange(this.zStart, this.zStart + this.zStep * (this.zSize - 1));
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    UniformGridDataSeries3D.prototype.getX = function (xIndex) {
        return this.xStart + xIndex * this.xStep;
    };
    /**
     * @inheritDoc
     */
    UniformGridDataSeries3D.prototype.getZ = function (zIndex) {
        return this.zStart + zIndex * this.zStep;
    };
    return UniformGridDataSeries3D;
}(BaseGridDataSeries3D_1.BaseGridDataSeries3D));
exports.UniformGridDataSeries3D = UniformGridDataSeries3D;
