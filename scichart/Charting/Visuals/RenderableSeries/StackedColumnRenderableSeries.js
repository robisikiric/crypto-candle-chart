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
exports.StackedColumnRenderableSeries = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var SeriesType_1 = require("../../../types/SeriesType");
var BrushCache_1 = require("../../Drawing/BrushCache");
var Pen2DCache_1 = require("../../Drawing/Pen2DCache");
var IThemeProvider_1 = require("../../Themes/IThemeProvider");
var SciChartSurfaceBase_1 = require("../SciChartSurfaceBase");
var BaseStackedRenderableSeries_1 = require("./BaseStackedRenderableSeries");
var constants_1 = require("./constants");
var StackedColumnSeriesHitTestProvider_1 = require("./HitTest/StackedColumnSeriesHitTestProvider");
var StackedColumnSeriesDataLabelProvider_1 = require("./DataLabels/StackedColumnSeriesDataLabelProvider");
/**
 * @summary The {@link StackedColumnRenderableSeries} allows creating JavaScript Stacked Column charts, and 100% Stacked Column Charts
 * @description
 * Multiple {@link StackedColumnRenderableSeries} are required to create a stacked column chart type in SciChart.
 * These are grouped with a {@link StackedColumnCollection}, which implements {@link IRenderableSeries} and may be added
 * directly to a {@link SciChartSurface.renderableSeries} collection.
 *
 * Code sample below for stacking above and below (vertical stacking)
 * ```ts
 * const stackedColumn0 = new StackedColumnRenderableSeries(wasmContext);
 * stackedColumn0.stackedGroupId = "group one"; // Same group ID means stack vertically
 * const stackedColumn1 = new StackedColumnRenderableSeries(wasmContext);
 * stackedColumn1.stackedGroupId = "group one"; // Same group ID means stack vertically
 * const stackedColumn2 = new StackedColumnRenderableSeries(wasmContext);
 * stackedColumn2.stackedGroupId = "group one"; // Same group ID means stack vertically
 * const stackedColumnCollection = new StackedColumnCollection(wasmContext);
 * stackedColumnCollection.add(stackedColumn0, stackedColumn1, stackedColumn2);
 *
 * sciChartSurface.renderableSeries.add(stackedColumnCollection);
 * ````
 *
 *  Code sample below for stacking side by side (horizontal stacking)
 * ```ts
 * const stackedColumn0 = new StackedColumnRenderableSeries(wasmContext);
 * stackedColumn0.stackedGroupId = "group one"; // Different group ID means stack horizontally
 * const stackedColumn1 = new StackedColumnRenderableSeries(wasmContext);
 * stackedColumn1.stackedGroupId = "group two"; // Different group ID means stack horizontally
 * const stackedColumn2 = new StackedColumnRenderableSeries(wasmContext);
 * stackedColumn2.stackedGroupId = "group three"; // Different group ID means stack horizontally
 * const stackedColumnCollection = new StackedColumnCollection(wasmContext);
 * stackedColumnCollection.add(stackedColumn0, stackedColumn1, stackedColumn2);
    
 * sciChartSurface.renderableSeries.add(stackedColumnCollection);
 * ````
 * @remarks
 * Do not add the {@link StackedColumnRenderableSeries} directly to {@link SciChartSurface.renderableSeries} array, instead,
 * use a {@link StackedColumnCollection} to group / stack the columns.
 */
var StackedColumnRenderableSeries = /** @class */ (function (_super) {
    __extends(StackedColumnRenderableSeries, _super);
    /**
     * Creates an instance of the {@link StackedColumnRenderableSeries}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IStackedColumnRenderableSeriesOptions} to configure the series
     */
    function StackedColumnRenderableSeries(webAssemblyContext, options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g;
        _this = _super.call(this, webAssemblyContext, options) || this;
        _this.type = SeriesType_1.ESeriesType.StackedColumnSeries;
        _this.fillProperty = "#7e8486";
        _this.spacingProperty = 0;
        _this.stackedGroupIdProperty = "default";
        _this.getGroupIndex = _this.getGroupIndex.bind(_this);
        _this.getGroupsCount = _this.getGroupsCount.bind(_this);
        _this.getColumnWidth = _this.getColumnWidth.bind(_this);
        _this.fillBrushCache = new BrushCache_1.BrushCache(webAssemblyContext);
        _this.strokePenCache = new Pen2DCache_1.Pen2DCache(webAssemblyContext);
        _this.isOneHundredPercent = (_b = (_a = _this.parentCollection) === null || _a === void 0 ? void 0 : _a.isOneHundredPercent) !== null && _b !== void 0 ? _b : false;
        _this.fill = (_c = options === null || options === void 0 ? void 0 : options.fill) !== null && _c !== void 0 ? _c : _this.fillProperty;
        _this.stroke = (_d = options === null || options === void 0 ? void 0 : options.stroke) !== null && _d !== void 0 ? _d : SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.mountainLineColor;
        _this.strokeThickness = (_e = options === null || options === void 0 ? void 0 : options.strokeThickness) !== null && _e !== void 0 ? _e : 1;
        _this.spacingProperty = (_f = options === null || options === void 0 ? void 0 : options.spacing) !== null && _f !== void 0 ? _f : _this.spacingProperty;
        _this.stackedGroupIdProperty = (_g = options === null || options === void 0 ? void 0 : options.stackedGroupId) !== null && _g !== void 0 ? _g : _this.stackedGroupIdProperty;
        if (!_this.dataLabelProviderProperty) {
            _this.dataLabelProviderProperty = new StackedColumnSeriesDataLabelProvider_1.StackedColumnSeriesDataLabelProvider(options === null || options === void 0 ? void 0 : options.dataLabels);
            _this.dataLabelProviderProperty.onAttach(_this.webAssemblyContext, _this);
        }
        return _this;
    }
    // PUBLIC
    /**
     * @inheritDoc
     */
    StackedColumnRenderableSeries.prototype.delete = function () {
        this.strokePenCache = (0, Deleter_1.deleteSafe)(this.strokePenCache);
        this.fillBrushCache = (0, Deleter_1.deleteSafe)(this.fillBrushCache);
        _super.prototype.delete.call(this);
    };
    /**
     * Called internally when the {@link StackedColumnRenderableSeries} is attached to a parent {@link StackedColumnCollection}
     * @param parentCollection the parent {@link BaseStackedCollection}
     * @param getParentSurfaceFn function to get the parent {@link SciChartSurface}
     * @param notifyPropertyChangedFn function to notify property has changed
     * @param getColumnWidthFn function to get the column width
     */
    StackedColumnRenderableSeries.prototype.onAttachToParentCollection = function (parentCollection, getParentSurfaceFn, notifyPropertyChangedFn, getColumnWidthFn) {
        if (this.parentCollection) {
            throw new Error("Invalid operation in StackedColumnRenderableSeries.onAttachToParentCollection, this series has been already attached to collection. Please detach it from the collection before attaching to another");
        }
        this.parentCollection = parentCollection;
        this.getParentSurfaceFn = getParentSurfaceFn;
        this.notifyParentPropertyChangedFn = notifyPropertyChangedFn;
        //this.invalidateParentCallback = () => parentCollection.invalidateParentCallback();
        this.getColumnWidthFn = getColumnWidthFn;
        var _a = this, stroke = _a.stroke, strokeThickness = _a.strokeThickness, fill = _a.fill, opacity = _a.opacity;
        (0, Pen2DCache_1.createPenInCache)(this.strokePenCache, stroke, strokeThickness, opacity);
        (0, BrushCache_1.createBrushInCache)(this.fillBrushCache, fill, opacity);
    };
    /**
     * Gets the fill brush of the column as an HTML color code
     */
    StackedColumnRenderableSeries.prototype.getFillBrush = function () {
        return (0, BrushCache_1.getScrtBrushFromCache)(this.fillBrushCache);
    };
    /**
     * Gets the stroke of the column as an HTML color code
     */
    StackedColumnRenderableSeries.prototype.getStrokePen = function () {
        var _a = this, stroke = _a.stroke, strokeThickness = _a.strokeThickness, opacity = _a.opacity;
        return (0, Pen2DCache_1.createPenInCache)(this.strokePenCache, stroke, strokeThickness, opacity);
    };
    StackedColumnRenderableSeries.prototype.getGroupIndex = function () {
        return this.groupIndex;
    };
    StackedColumnRenderableSeries.prototype.setGroupIndex = function (value) {
        this.groupIndex = value;
    };
    StackedColumnRenderableSeries.prototype.getGroupsCount = function () {
        return this.groupsCount;
    };
    StackedColumnRenderableSeries.prototype.setGroupsCount = function (value) {
        this.groupsCount = value;
    };
    /**
     * Called internally - gets the column width in pixels
     * @param xCoordinateCalculator The current XAxis {@link CoordinateCalculatorBase}
     */
    StackedColumnRenderableSeries.prototype.getColumnWidth = function (xCoordinateCalculator) {
        return this.getColumnWidthFn(xCoordinateCalculator);
    };
    /**
     * @inheritDoc
     */
    StackedColumnRenderableSeries.prototype.onDpiChanged = function (args) {
        // TODO uncomment when point markers and drawingProviders props are supported
        // super.onDpiChanged(args);
        this.notifyPropertyChanged(constants_1.PROPERTY.STROKE);
    };
    /**
     * @inheritDoc
     */
    StackedColumnRenderableSeries.prototype.notifyPropertyChanged = function (propertyName) {
        _super.prototype.notifyPropertyChanged.call(this, propertyName);
        if (propertyName === constants_1.PROPERTY.STROKE ||
            propertyName === constants_1.PROPERTY.STROKE_THICKNESS ||
            propertyName === constants_1.PROPERTY.OPACITY) {
            (0, Pen2DCache_1.createPenInCache)(this.strokePenCache, this.stroke, this.strokeThickness, this.opacity);
        }
        if (propertyName === constants_1.PROPERTY.FILL || propertyName === constants_1.PROPERTY.OPACITY) {
            (0, BrushCache_1.createBrushInCache)(this.fillBrushCache, this.fill, this.opacity);
        }
    };
    Object.defineProperty(StackedColumnRenderableSeries.prototype, "fill", {
        // PROPERTIES
        /**
         * Gets or sets the Fill of the column chart as an HTML color code
         */
        get: function () {
            return (0, IThemeProvider_1.stripAutoColor)(this.fillProperty);
        },
        /**
         * Gets or sets the Fill of the column chart as an HTML color code
         */
        set: function (fill) {
            this.fillProperty = fill;
            this.notifyPropertyChanged(constants_1.PROPERTY.FILL);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StackedColumnRenderableSeries.prototype, "drawingProviders", {
        /**
         * drawingProviders property is not supported for StackedColumnRenderableSeries
         * instead set on the {@link StackedColumnCollection}
         */
        get: function () {
            return [];
        },
        /**
         * drawingProviders property is not supported for StackedColumnRenderableSeries,
         * instead set on the {@link StackedColumnCollection}
         */
        set: function (value) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StackedColumnRenderableSeries.prototype, "effect", {
        /**
         * effect property is not supported for StackedColumnRenderableSeries,
         * instead set on the {@link StackedColumnCollection}
         */
        get: function () {
            return undefined;
        },
        /**
         * effect property is not supported for StackedColumnRenderableSeries,
         * instead set on the {@link StackedColumnCollection}
         */
        set: function (effect) { },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StackedColumnRenderableSeries.prototype, "spacing", {
        // public get zeroLineY(): number {
        //     return this.zeroLineYProperty;
        // }
        // public set zeroLineY(zeroLineY: number) {
        //     this.zeroLineYProperty = zeroLineY;
        //     this.notifyPropertyChanged(PROPERTY.ZERO_LINE_Y);
        // }
        get: function () {
            return this.spacingProperty;
        },
        set: function (value) {
            this.spacingProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.SPACING);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(StackedColumnRenderableSeries.prototype, "stackedGroupId", {
        /**
         * Gets or sets the Stacked Group ID
         * @description
         * The Stacked Group Id is used to group {@link StackedColumnRenderableSeries} inside a {@link StackedColumnCollection}
         * into vertical or horizontal stacked groups.
         *
         * For a normal stacked column chart (stacks vertically), set {@link StackedColumnRenderableSeries.stackedGroupId} inside a
         * {@link StackedColumnCollection} to the SAME value
         *
         * For a column chart (stacked side by side), set {@link StackedColumnRenderableSeries.stackedGroupId} inside a
         * {@link StackedColumnCollection} to DIFFERENT values
         */
        get: function () {
            return this.stackedGroupIdProperty;
        },
        /**
         * Gets or sets the Stacked Group ID
         * @description
         * The Stacked Group Id is used to group {@link StackedColumnRenderableSeries} inside a {@link StackedColumnCollection}
         * into vertical or horizontal stacked groups.
         *
         * For a normal stacked column chart (stacks vertically), set {@link StackedColumnRenderableSeries.stackedGroupId} inside a
         * {@link StackedColumnCollection} to the SAME value
         *
         * For a column chart (stacked side by side), set {@link StackedColumnRenderableSeries.stackedGroupId} inside a
         * {@link StackedColumnCollection} to DIFFERENT values
         */
        set: function (value) {
            this.stackedGroupIdProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.STACKED_GROUP_ID);
        },
        enumerable: false,
        configurable: true
    });
    // PROPERTIES END
    StackedColumnRenderableSeries.prototype.toJSON = function (excludeData) {
        if (excludeData === void 0) { excludeData = false; }
        var json = _super.prototype.toJSON.call(this, excludeData);
        var options = {
            fill: this.fill,
            stroke: this.stroke,
            strokeThickness: this.strokeThickness,
            spacing: this.spacing,
            stackedGroupId: this.stackedGroupId
        };
        Object.assign(json.options, options);
        return json;
    };
    /** @inheritDoc */
    StackedColumnRenderableSeries.prototype.resolveAutoColors = function (index, maxSeries, theme) {
        _super.prototype.resolveAutoColors.call(this, index, maxSeries, theme);
        if (this.fillProperty.startsWith(IThemeProvider_1.AUTO_COLOR)) {
            var color = theme.getFillColor(index, maxSeries, this.webAssemblyContext);
            this.fill = IThemeProvider_1.AUTO_COLOR + this.adjustAutoColor("fill", color);
        }
    };
    // PROTECTED
    /** @inheritDoc */
    StackedColumnRenderableSeries.prototype.newHitTestProvider = function () {
        return new StackedColumnSeriesHitTestProvider_1.StackedColumnSeriesHitTestProvider(this, this.webAssemblyContext);
    };
    return StackedColumnRenderableSeries;
}(BaseStackedRenderableSeries_1.BaseStackedRenderableSeries));
exports.StackedColumnRenderableSeries = StackedColumnRenderableSeries;
