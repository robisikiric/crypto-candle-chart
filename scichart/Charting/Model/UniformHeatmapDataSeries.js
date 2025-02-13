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
exports.UniformHeatmapDataSeries = void 0;
var NumberRange_1 = require("../../Core/NumberRange");
var BaseHeatmapDataSeries_1 = require("./BaseHeatmapDataSeries");
var IDataSeries_1 = require("./IDataSeries");
var UniformHeatmapDataSeries = /** @class */ (function (_super) {
    __extends(UniformHeatmapDataSeries, _super);
    /**
     * Creates an instance of {@link UniformHeatmapDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options the {@link IUniformHeatmapSeriesOptions} which must be passed to configure the series
     */
    function UniformHeatmapDataSeries(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        /**
         * @inheritDoc
         */
        _this.type = IDataSeries_1.EDataSeriesType.HeatmapUniform;
        _this.xStartProperty = options.xStart;
        _this.xStepProperty = options.xStep;
        _this.yStartProperty = options.yStart;
        _this.yStepProperty = options.yStep;
        _this.xRangeProperty = new NumberRange_1.NumberRange(_this.xStart, _this.getXValue(_this.arrayWidth));
        _this.yRangeProperty = new NumberRange_1.NumberRange(_this.yStart, _this.getYValue(_this.arrayHeight));
        return _this;
    }
    Object.defineProperty(UniformHeatmapDataSeries.prototype, "xStart", {
        /**
         * xStart defines the Start point on the {@link AxisBase2D| XAxis} where this heatmap will be drawn
         */
        get: function () {
            return this.xStartProperty;
        },
        /**
         * xStart defines the Start point on the {@link AxisBase2D| XAxis} where this heatmap will be drawn
         */
        set: function (value) {
            this.xStartProperty = value;
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Update);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniformHeatmapDataSeries.prototype, "xStep", {
        /**
         * xStep defines Step on the {@link AxisBase2D| XAxis} for each cell in the heatmap
         */
        get: function () {
            return this.xStepProperty;
        },
        /**
         * xStep defines Step on the {@link AxisBase2D| XAxis} for each cell in the heatmap
         */
        set: function (value) {
            this.xStepProperty = value;
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Update);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniformHeatmapDataSeries.prototype, "yStart", {
        /**
         * yStart defines the Start point on the {@link AxisBase2D| YAxis} where this heatmap will be drawn
         */
        get: function () {
            return this.yStartProperty;
        },
        /**
         * yStart defines the Start point on the {@link AxisBase2D| YAxis} where this heatmap will be drawn
         */
        set: function (value) {
            this.yStartProperty = value;
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Update);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UniformHeatmapDataSeries.prototype, "yStep", {
        /**
         * yStep defines Step on the {@link AxisBase2D| YAxis} for each cell in the heatmap
         */
        get: function () {
            return this.yStepProperty;
        },
        /**
         * yStep defines Step on the {@link AxisBase2D| YAxis} for each cell in the heatmap
         */
        set: function (value) {
            this.yStepProperty = value;
            this.notifyDataChanged(IDataSeries_1.EDataChangeType.Update);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the X-value at the specified index. This will be computed from constructor parameters xStep and xStart
     * @param xIndex
     */
    UniformHeatmapDataSeries.prototype.getXValue = function (xIndex) {
        var offset = this.xStep * xIndex;
        return this.xStart + offset;
    };
    /**
     * Gets the Y-value at the specified index. This will be computed from constructor parameters yStep and yxStart
     * @param xIndex
     */
    UniformHeatmapDataSeries.prototype.getYValue = function (yIndex) {
        var offset = this.yStep * yIndex;
        return this.yStart + offset;
    };
    /**
     * @inheritDoc
     */
    UniformHeatmapDataSeries.prototype.notifyDataChanged = function (updateType, data) {
        this.xRangeProperty = new NumberRange_1.NumberRange(this.xStart, this.getXValue(this.arrayWidth));
        this.yRangeProperty = new NumberRange_1.NumberRange(this.yStart, this.getYValue(this.arrayHeight));
        _super.prototype.notifyDataChanged.call(this, updateType, data);
    };
    UniformHeatmapDataSeries.prototype.getOptions = function (excludeData) {
        var baseOptions = _super.prototype.getOptions.call(this, excludeData);
        var options = {
            xStart: this.xStart,
            xStep: this.xStep,
            yStart: this.yStart,
            yStep: this.yStep
        };
        return Object.assign(baseOptions, options);
    };
    /**
     * @inheritDoc
     */
    UniformHeatmapDataSeries.prototype.getXRange = function () {
        return this.xRangeProperty;
    };
    /**
     * @inheritDoc
     */
    UniformHeatmapDataSeries.prototype.getYRange = function () {
        return this.yRangeProperty;
    };
    return UniformHeatmapDataSeries;
}(BaseHeatmapDataSeries_1.BaseHeatmapDataSeries));
exports.UniformHeatmapDataSeries = UniformHeatmapDataSeries;
