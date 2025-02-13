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
exports.NonUniformHeatmapDataSeries = void 0;
var Deleter_1 = require("../../Core/Deleter");
var Guard_1 = require("../../Core/Guard");
var NumberRange_1 = require("../../Core/NumberRange");
var TSciChart_1 = require("../../types/TSciChart");
var appendDoubleVectorFromJsArray_1 = require("../../utils/ccall/appendDoubleVectorFromJsArray");
var BaseDataSeries_1 = require("./BaseDataSeries");
var BaseHeatmapDataSeries_1 = require("./BaseHeatmapDataSeries");
var IDataSeries_1 = require("./IDataSeries");
var NonUniformHeatmapDataSeries = /** @class */ (function (_super) {
    __extends(NonUniformHeatmapDataSeries, _super);
    /**
     * Creates an instance of {@link UniformHeatmapDataSeries}
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options the {@link IUniformHeatmapSeriesOptions} which must be passed to configure the series
     */
    function NonUniformHeatmapDataSeries(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        /**
         * @inheritDoc
         */
        _this.type = IDataSeries_1.EDataSeriesType.HeatmapNonUniform;
        Guard_1.Guard.notNull(options.xCellOffsets, "options.xCellOffsets");
        Guard_1.Guard.notNull(options.yCellOffsets, "options.yCellOffsets");
        // check whether offsets are passed as mappers or arrays;
        // arrays are saved once, while mappers are used for calculation of the offsets each time we change
        if (!Array.isArray(options.xCellOffsets)) {
            _this.xCellOffsetsGeneratorFunction = options.xCellOffsets;
        }
        else if (options.xCellOffsets.length < _this.arrayWidth + 1) {
            throw new Error("xCellOffsets array should not be smaller than zValues width!");
        }
        else {
            _this.xCellOffsetsProperty = options.xCellOffsets;
        }
        if (!Array.isArray(options.yCellOffsets)) {
            _this.yCellOffsetsGeneratorFunction = options.yCellOffsets;
        }
        else if (options.yCellOffsets.length < _this.arrayHeight + 1) {
            throw new Error("yCellOffsets array should not be smaller than zValues height!");
        }
        else {
            _this.yCellOffsetsProperty = options.yCellOffsets;
        }
        _this.nativeXOffsetsProperty = new _this.webAssemblyContext.SCRTDoubleVector();
        _this.nativeYOffsetsProperty = new _this.webAssemblyContext.SCRTDoubleVector();
        // notify about offsets being parsed
        if (_this.getZValues()) {
            _this.notifyDataChanged(IDataSeries_1.EDataChangeType.Append);
        }
        return _this;
    }
    Object.defineProperty(NonUniformHeatmapDataSeries.prototype, "xCellSizes", {
        /**
         * Gets or sets cell X sizes on {@link NonUniformHeatmapDataSeries} for each cell in the heatmap.
         * Can be an array of numbers or a mapping function {@link TCellSizeMapper}
         */
        get: function () {
            if (!this.xCellSizesProperty) {
                this.xCellSizesProperty = this.calculateCellSizes(this.xCellOffsetsProperty);
            }
            return this.xCellSizesProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NonUniformHeatmapDataSeries.prototype, "yCellSizes", {
        /**
         * Gets or sets cell Y sizes on {@link NonUniformHeatmapDataSeries} for each cell in the heatmap.
         * Can be an array of numbers or a mapping function {@link TCellSizeMapper}
         */
        get: function () {
            if (!this.yCellSizesProperty) {
                this.yCellSizesProperty = this.calculateCellSizes(this.yCellOffsetsProperty);
            }
            return this.yCellSizesProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NonUniformHeatmapDataSeries.prototype, "xCellOffsets", {
        /**
         * Gets X cell offsets on {@link NonUniformHeatmapDataSeries} for each cell in the heatmap.
         */
        get: function () {
            return this.xCellOffsetsProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NonUniformHeatmapDataSeries.prototype, "yCellOffsets", {
        /**
         * Gets Y cell offsets on {@link NonUniformHeatmapDataSeries} for each cell in the heatmap.
         */
        get: function () {
            return this.yCellOffsetsProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NonUniformHeatmapDataSeries.prototype, "nativeXCellOffsets", {
        /**
         * Gets X cell offsets as native vector on {@link NonUniformHeatmapDataSeries} for each cell in the heatmap.
         */
        get: function () {
            if (!this.nativeXOffsetsProperty) {
                this.nativeXOffsetsProperty = new TSciChart_1.SCRTDoubleVector();
                (0, appendDoubleVectorFromJsArray_1.appendDoubleVectorFromJsArray)(this.webAssemblyContext, this.nativeXOffsetsProperty, this.xCellOffsets);
            }
            return this.nativeXOffsetsProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NonUniformHeatmapDataSeries.prototype, "nativeYCellOffsets", {
        /**
         * Gets X cell offsets as native vector on {@link NonUniformHeatmapDataSeries} for each cell in the heatmap.
         */
        get: function () {
            if (!this.nativeYOffsetsProperty) {
                this.nativeYOffsetsProperty = new TSciChart_1.SCRTDoubleVector();
                (0, appendDoubleVectorFromJsArray_1.appendDoubleVectorFromJsArray)(this.webAssemblyContext, this.nativeYOffsetsProperty, this.yCellOffsets);
            }
            return this.nativeYOffsetsProperty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the X-value at the specified index. This will be computed from constructor parameters xCellOffsets and xStart
     * @param xIndex
     */
    NonUniformHeatmapDataSeries.prototype.getXValue = function (xIndex) {
        var offset = this.xCellOffsetsProperty[xIndex];
        return offset;
    };
    /**
     * Gets the Y-value at the specified index. This will be computed from constructor parameters yCellOffsets and yxStart
     * @param xIndex
     */
    NonUniformHeatmapDataSeries.prototype.getYValue = function (yIndex) {
        var offset = this.yCellOffsetsProperty[yIndex];
        return offset;
    };
    /**
     * @inheritDoc
     */
    NonUniformHeatmapDataSeries.prototype.notifyDataChanged = function (updateType, data) {
        // skip the initial call from base constructor
        if ((!this.xCellOffsets && !this.xCellOffsetsGeneratorFunction) ||
            (!this.yCellOffsets && !this.yCellOffsetsGeneratorFunction)) {
            return;
        }
        if (updateType === IDataSeries_1.EDataChangeType.Append) {
            // set offsets when zValues changes
            if (this.xCellOffsetsGeneratorFunction) {
                this.xCellOffsetsProperty = this.mapCellSizes(this.arrayWidth, this.xCellOffsetsGeneratorFunction);
                this.xCellSizesProperty = this.calculateCellSizes(this.xCellOffsetsProperty);
            }
            if (this.yCellOffsetsGeneratorFunction) {
                this.yCellOffsetsProperty = this.mapCellSizes(this.arrayHeight, this.yCellOffsetsGeneratorFunction);
                this.yCellSizesProperty = this.calculateCellSizes(this.yCellOffsetsProperty);
            }
            this.nativeXOffsetsProperty.clear();
            this.nativeYOffsetsProperty.clear();
            (0, appendDoubleVectorFromJsArray_1.appendDoubleVectorFromJsArray)(this.webAssemblyContext, this.nativeXOffsetsProperty, this.xCellOffsetsProperty);
            (0, appendDoubleVectorFromJsArray_1.appendDoubleVectorFromJsArray)(this.webAssemblyContext, this.nativeYOffsetsProperty, this.yCellOffsetsProperty);
        }
        this.xRangeProperty = new NumberRange_1.NumberRange(this.getXValue(0), this.getXValue(this.arrayWidth));
        this.yRangeProperty = new NumberRange_1.NumberRange(this.getYValue(0), this.getYValue(this.arrayHeight));
        _super.prototype.notifyDataChanged.call(this, updateType, data);
    };
    /**
     * @inheritDoc
     */
    NonUniformHeatmapDataSeries.prototype.getXRange = function () {
        return this.xRangeProperty;
    };
    /**
     * @inheritDoc
     */
    NonUniformHeatmapDataSeries.prototype.getYRange = function () {
        return this.yRangeProperty;
    };
    NonUniformHeatmapDataSeries.prototype.getXIndicesRange = function (visibleRange, isCategoryData, downSearchMode, upSearchMode) {
        return (0, BaseDataSeries_1.getIndicesRange)(this.webAssemblyContext, this.nativeXCellOffsets, visibleRange, true);
    };
    NonUniformHeatmapDataSeries.prototype.getYIndicesRange = function (visibleRange, isCategoryData, downSearchMode, upSearchMode) {
        return (0, BaseDataSeries_1.getIndicesRange)(this.webAssemblyContext, this.nativeYCellOffsets, visibleRange, true);
    };
    NonUniformHeatmapDataSeries.prototype.delete = function () {
        _super.prototype.delete.call(this);
        this.nativeXOffsetsProperty = (0, Deleter_1.deleteSafe)(this.nativeXOffsetsProperty);
        this.nativeYOffsetsProperty = (0, Deleter_1.deleteSafe)(this.nativeYOffsetsProperty);
    };
    NonUniformHeatmapDataSeries.prototype.getOptions = function (excludeData) {
        var baseOptions = _super.prototype.getOptions.call(this, excludeData);
        var options = {
            xCellOffsets: this.xCellOffsetsProperty,
            yCellOffsets: this.yCellOffsetsProperty
        };
        return Object.assign(baseOptions, options);
    };
    /**
     * @param cellOffsets
     * @returns an array with cell sizes to heatmap size ratios
     */
    NonUniformHeatmapDataSeries.prototype.mapCellSizes = function (zValuesDimensionSize, mapping) {
        var cellSizes = [];
        var offsetsCount = zValuesDimensionSize + 1;
        for (var i = 0; i < offsetsCount; ++i) {
            cellSizes.push(mapping(i));
        }
        return cellSizes;
    };
    /**
     * @param cellOffsets
     * @returns an array with cell sizes to heatmap size ratios
     */
    NonUniformHeatmapDataSeries.prototype.calculateCellSizes = function (cellOffsets) {
        if (!cellOffsets || cellOffsets.length === 0) {
            return [];
        }
        var count = cellOffsets.length;
        var heatmapRange = cellOffsets[count - 1] - cellOffsets[0];
        var cellSizeRatios = [];
        for (var i = 0; i < count - 1; ++i) {
            var diff = cellOffsets[i + 1] - cellOffsets[i];
            cellSizeRatios.push(diff / heatmapRange);
        }
        return cellSizeRatios;
    };
    return NonUniformHeatmapDataSeries;
}(BaseHeatmapDataSeries_1.BaseHeatmapDataSeries));
exports.NonUniformHeatmapDataSeries = NonUniformHeatmapDataSeries;
