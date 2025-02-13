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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxisCore = void 0;
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
var Deleter_1 = require("../../../Core/Deleter");
var EventHandler_1 = require("../../../Core/EventHandler");
var Guard_1 = require("../../../Core/Guard");
var NumberRange_1 = require("../../../Core/NumberRange");
var Thickness_1 = require("../../../Core/Thickness");
var AutoRange_1 = require("../../../types/AutoRange");
var LabelAlignment_1 = require("../../../types/LabelAlignment");
var isRealNumber_1 = require("../../../utils/isRealNumber");
var SciChartSurfaceBase_1 = require("../SciChartSurfaceBase");
var DpiHelper_1 = require("../TextureManager/DpiHelper");
var constants_1 = require("./constants");
var VisibleRangeChangedArgs_1 = require("./VisibleRangeChangedArgs");
/**
 * The base class for Axis within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}.
 * @description
 * AxisCore is a base class for both 2D & 3D Axis types in SciChart. Concrete types include:
 *
 *  - {@link NumericAxis}: a Numeric 2D value-axis
 *  - {@link CategoryAxis}: A category 2D axis used for stock chart applications
 *  - {@link NumericAxis3D}: A numeric 3D value-axis
 *
 *  Set axis on the {@link SciChartSurface.xAxes} or {@link SciChartSurface.yAxes} collections in 2D Charts.
 *  Set axis on the {@link SciChart3DSurface.xAxis}, {@link SciChart3DSurface.yAxis} or {@link SciChart3DSurface.zAxis} collections in 3D Charts.
 */
var AxisCore = /** @class */ (function (_super) {
    __extends(AxisCore, _super);
    /**
     * Creates an instance of an {@link AxisCore}
     * @param options Optional parameters of type {@link IAxisCoreOptions} used to define properties at instantiation time
     */
    function AxisCore(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        _this = _super.call(this) || this;
        /**
         * An {@link EventHandler} which fires a callback when the {@link AxisCore.visibleRange} property changes.
         * @desc
         */
        _this.visibleRangeChanged = new EventHandler_1.EventHandler();
        /** A flag to indicate if measure has been called this frame.  Properties updated after measure must trigger a redraw */
        _this.isMeasured = false;
        /** If the diff of the visibleRange is 0, this growby fraction will be applied */
        _this.ZeroRangeGrowBy = 0.01;
        /**
         * Internal backing property for {@link AxisCore.id}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.idProperty = AxisCore.DEFAULT_AXIS_ID;
        /**
         * Internal backing property for {@link AxisCore.isAxis}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.isXAxisProperty = true;
        /**
         * Internal backing property for {@link AxisCore.minorsPerMajor}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.minorsPerMajorProperty = 5;
        /**
         * Internal backing property for {@link AxisCore.drawMajorGridLines}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.drawMajorGridLinesProperty = true;
        /**
         * Internal backing property for {@link AxisCore.drawMinorGridLines}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.drawMinorGridLinesProperty = true;
        /**
         * Internal backing property for {@link AxisCore.drawMajorTickLines}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.drawMajorTickLinesProperty = true;
        /**
         * Internal backing property for {@link AxisCore.drawMinorTickLines}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.drawMinorTickLinesProperty = true;
        /**
         * Internal backing property for {@link AxisCore.drawMajorBands}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.drawMajorBandsProperty = true;
        /**
         * Internal backing property for {@link AxisCore.drawLabels}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.drawLabelsProperty = true;
        /**
         * Internal backing property for {@link AxisCore.flippedCoordinates}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.flippedCoordinatesProperty = false;
        /**
         * Internal backing property for {@link AxisCore.tickTextBrush}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.tickTextBrushProperty = SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.tickTextBrush;
        /**
         * Internal backing property for {@link AxisCore.axisBandsFill}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.axisBandsFillProperty = SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.axisBandsFill;
        /**
         * Internal backing property for {@link AxisCore.autoRange}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.autoRangeProperty = AutoRange_1.EAutoRange.Once;
        /**
         * Internal backing property for {@link AxisCore.majorTickLineStyle}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.majorTickLineStyleProperty = {
            tickSize: 5,
            strokeThickness: 1,
            color: SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.majorGridLineBrush
        };
        /**
         * Internal backing property for {@link AxisCore.minorTickLineStyle}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.minorTickLineStyleProperty = {
            tickSize: 3,
            strokeThickness: 1,
            color: SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.minorGridLineBrush
        };
        /**
         * Internal backing property for {@link AxisCore.majorGridLineStyle}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.majorGridLineStyleProperty = {
            strokeThickness: 1,
            color: SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.majorGridLineBrush,
            strokeDashArray: undefined
        };
        /**
         * Internal backing property for {@link AxisCore.minorGridLineStyle}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.minorGridLineStyleProperty = {
            strokeThickness: 1,
            color: SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.minorGridLineBrush,
            strokeDashArray: undefined
        };
        /**
         * Internal backing property for {@link AxisCore.axisTitleStyle}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.axisTitleStyleProperty = {
            fontSize: 24,
            fontFamily: "Arial",
            color: SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.axisTitleColor,
            fontStyle: "normal",
            fontWeight: "normal",
            padding: Thickness_1.Thickness.fromNumber(6),
            alignment: LabelAlignment_1.ELabelAlignment.Center
        };
        /**
         * Internal backing property for {@link AxisCore.isVisible}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.isVisibleProperty = true;
        /**
         * Internal backing property for {@link AxisCore.autoTicks}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.autoTicksProperty = true;
        /**
         * Internal backing property for {@link AxisCore.maxAutoTicks}. To fire {@link AxisCore.invalidateParentCallback}, set the public property
         */
        _this.maxAutoTicksProperty = 10;
        _this.defaultVisibleRange = new NumberRange_1.NumberRange(0, 10);
        _this.allowFastMathProperty = false;
        /**
         * If false, autoRange Once will run on this axis.  Set true when there is any change to the visibleRange.
         */
        _this.hasVisibleRangeSet = false;
        _this.visibleRange = NumberRange_1.NumberRange.hydrate(options === null || options === void 0 ? void 0 : options.visibleRange) || _this.defaultVisibleRange;
        if (!(options === null || options === void 0 ? void 0 : options.visibleRange)) {
            _this.hasVisibleRangeSet = false;
        }
        _this.id = (_a = options === null || options === void 0 ? void 0 : options.id) !== null && _a !== void 0 ? _a : _this.id;
        _this.growBy = (_b = NumberRange_1.NumberRange.hydrate(options === null || options === void 0 ? void 0 : options.growBy)) !== null && _b !== void 0 ? _b : _this.growBy;
        _this.autoRange = (_c = options === null || options === void 0 ? void 0 : options.autoRange) !== null && _c !== void 0 ? _c : _this.autoRange;
        _this.isVisible = (_d = options === null || options === void 0 ? void 0 : options.isVisible) !== null && _d !== void 0 ? _d : _this.isVisible;
        _this.axisTitle = (_e = options === null || options === void 0 ? void 0 : options.axisTitle) !== null && _e !== void 0 ? _e : _this.axisTitle;
        _this.axisTitleStyle = options === null || options === void 0 ? void 0 : options.axisTitleStyle;
        _this.allowFastMath = (_f = options === null || options === void 0 ? void 0 : options.allowFastMath) !== null && _f !== void 0 ? _f : _this.allowFastMathProperty;
        _this.autoTicksProperty = (_g = options === null || options === void 0 ? void 0 : options.autoTicks) !== null && _g !== void 0 ? _g : _this.autoTicksProperty;
        _this.maxAutoTicksProperty = (_h = options === null || options === void 0 ? void 0 : options.maxAutoTicks) !== null && _h !== void 0 ? _h : _this.maxAutoTicksProperty;
        _this.minorsPerMajorProperty = (_j = options === null || options === void 0 ? void 0 : options.minorsPerMajor) !== null && _j !== void 0 ? _j : _this.minorsPerMajorProperty;
        _this.majorDeltaProperty = (_k = options === null || options === void 0 ? void 0 : options.majorDelta) !== null && _k !== void 0 ? _k : _this.majorDeltaProperty;
        _this.minorDeltaProperty = (_l = options === null || options === void 0 ? void 0 : options.minorDelta) !== null && _l !== void 0 ? _l : _this.minorDeltaProperty;
        _this.drawLabelsProperty = (_m = options === null || options === void 0 ? void 0 : options.drawLabels) !== null && _m !== void 0 ? _m : _this.drawLabelsProperty;
        _this.drawMajorTickLinesProperty = (_o = options === null || options === void 0 ? void 0 : options.drawMajorTickLines) !== null && _o !== void 0 ? _o : _this.drawMajorTickLinesProperty;
        _this.drawMinorTickLinesProperty = (_p = options === null || options === void 0 ? void 0 : options.drawMinorTickLines) !== null && _p !== void 0 ? _p : _this.drawMinorTickLinesProperty;
        _this.drawMinorGridLinesProperty = (_q = options === null || options === void 0 ? void 0 : options.drawMinorGridLines) !== null && _q !== void 0 ? _q : _this.drawMinorGridLinesProperty;
        _this.drawMajorGridLinesProperty = (_r = options === null || options === void 0 ? void 0 : options.drawMajorGridLines) !== null && _r !== void 0 ? _r : _this.drawMajorGridLinesProperty;
        _this.majorGridLineStyle = options === null || options === void 0 ? void 0 : options.majorGridLineStyle;
        _this.minorGridLineStyle = options === null || options === void 0 ? void 0 : options.minorGridLineStyle;
        _this.majorTickLineStyle = options === null || options === void 0 ? void 0 : options.majorTickLineStyle;
        _this.minorTickLineStyle = options === null || options === void 0 ? void 0 : options.minorTickLineStyle;
        _this.drawMajorBandsProperty = (_s = options === null || options === void 0 ? void 0 : options.drawMajorBands) !== null && _s !== void 0 ? _s : _this.drawMajorBandsProperty;
        _this.axisBandsFillProperty = (_t = options === null || options === void 0 ? void 0 : options.axisBandsFill) !== null && _t !== void 0 ? _t : _this.axisBandsFillProperty;
        _this.flippedCoordinatesProperty = (_u = options === null || options === void 0 ? void 0 : options.flippedCoordinates) !== null && _u !== void 0 ? _u : _this.flippedCoordinatesProperty;
        _this.getCurrentCoordinateCalculator = _this.getCurrentCoordinateCalculator.bind(_this);
        return _this;
    }
    Object.defineProperty(AxisCore.prototype, "isCategoryAxis", {
        /**
         * Gets if the Axis is Category
         */
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "isXAxis", {
        /**
         * SET INTERNALLY. Gets whether this axis is an XAxis or not
         * @remarks
         * See {@link AxisBase2D.axisAlignment} if you want to set a 2D Axis alignment to the left, right, top or bottom
         */
        get: function () {
            return this.isXAxisProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "allowFastMath", {
        /**
         * When true, 32-bit faster paths for coordinate calculation maths are used. This improves performance in
         * edge-cases where every CPU cycle counts.
         */
        get: function () {
            return this.allowFastMathProperty;
        },
        /**
         * When true, 32-bit faster paths for coordinate calculation maths are used. This improves performance in
         * edge-cases where every CPU cycle counts.
         */
        set: function (allowFastMath) {
            this.allowFastMathProperty = allowFastMath;
            this.notifyPropertyChanged(constants_1.PROPERTY.ALLOW_FAST_MATH);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * When true, the axis has a valid {@link AxisCore.visibleRange} which can be drawn
     * @remarks
     * {@link AxisCore.visibleRange} undefined, or NAN, or infinite, or {@link AxisCore.visibleRange} min greater than max
     * will result in this property being false.
     */
    AxisCore.prototype.hasValidVisibleRange = function () {
        if (this.visibleRange === undefined) {
            return false;
        }
        var rangeIsZero = this.visibleRange.diff === 0;
        return !rangeIsZero && (0, isRealNumber_1.isRealNumber)(this.visibleRange.max) && (0, isRealNumber_1.isRealNumber)(this.visibleRange.min);
    };
    /**
     * When true, the axis has the default {@link AxisCore.visibleRange}.
     * @remarks
     * This property is used internally when autoranging. If the range is default and {@link AxisCore.autoRange} is {@link EAutoRange.Once}
     * then the axis will autorange once.
     */
    AxisCore.prototype.hasDefaultVisibleRange = function () {
        return !this.hasVisibleRangeSet;
    };
    Object.defineProperty(AxisCore.prototype, "id", {
        /**
         * Gets or sets the unique Axis Id
         * @description
         * By default all axis in SciChart have Id={@link AxisCore.DEFAULT_AXIS_ID}. Also, all {@link BaseRenderableSeries | RenderableSeries}
         * have an xAxisId and yAxisId property set to {@link AxisCore.DEFAULT_AXIS_ID}. {@link AnnotationBase | Annotations} also have an xAxisId and
         * yAxisId also set to {@link AxisCore.DEFAULT_AXIS_ID}. Some {@link ChartModifierBase | Chart Modifiers} have an x,yAxisId property to filter
         * their operations to an axis.
         *
         * In multi-axis scenarios you will need to set the xAxisId/yAxisId properties of series, annotations, modifiers to match that of the axis
         * you want them to be registered on.
         */
        get: function () {
            return this.idProperty;
        },
        /**
         * Gets or sets the unique Axis Id
         * @description
         * By default all axis in SciChart have Id={@link AxisCore.DEFAULT_AXIS_ID}. Also, all {@link BaseRenderableSeries | RenderableSeries}
         * have an xAxisId and yAxisId property set to {@link AxisCore.DEFAULT_AXIS_ID}. {@link AnnotationBase | Annotations} also have an xAxisId and
         * yAxisId also set to {@link AxisCore.DEFAULT_AXIS_ID}. Some {@link ChartModifierBase | Chart Modifiers} have an x,yAxisId property to filter
         * their operations to an axis.
         *
         * In multi-axis scenarios you will need to set the xAxisId/yAxisId properties of series, annotations, modifiers to match that of the axis
         * you want them to be registered on.
         */
        set: function (id) {
            this.idProperty = id;
            this.notifyPropertyChanged(constants_1.PROPERTY.ID);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "isVisible", {
        /**
         * When true, the axis is visible. Default value is also true for the axis
         * @remarks
         * An invisible axis can be used to scale series to the viewport. For example:
         *
         *  - have a chart with two-YAxis
         *  - have one series on the first axis and another series on the second axis
         *  - set second {@link AxisCore.isVisible} = false, and {@link AxisCore.autoRange} = {@link EAutoRange.Always}
         *
         *  This will scale the series on the second axis to the viewport, on an invisible, auto-ranged axis
         */
        get: function () {
            return this.isVisibleProperty;
        },
        /**
         * When true, the axis is visible. Default value is also true for the axis
         * @remarks
         * An invisible axis can be used to scale series to the viewport. For example:
         *
         *  - have a chart with two-YAxis
         *  - have one series on the first axis and another series on the second axis
         *  - set second {@link AxisCore.isVisible} = false, and {@link AxisCore.autoRange} = {@link EAutoRange.Always}
         *
         *  This will scale the series on the second axis to the viewport, on an invisible, auto-ranged axis
         */
        set: function (isVisible) {
            this.isVisibleProperty = isVisible;
            this.notifyPropertyChanged(constants_1.PROPERTY.IS_VISIBLE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "growBy", {
        /**
         * Gets or sets the GrowBy: a padding factor on the axis
         * @description
         * Growby factor is a padding factor set on the axis. For example if you want to have a constant padding above and below the axis,
         * the following code will result in a 10% (min) and 20% (max) padding outside of the datarange.
         * ```ts
         * axis.growBy = new NumberRange(0.1, 0.2);
         * ```
         */
        get: function () {
            return this.growByProperty;
        },
        /**
         * Gets or sets the GrowBy: a padding factor on the axis
         * @description
         * Growby factor is a padding factor set on the axis. For example if you want to have a constant padding above and below the axis,
         * the following code will result in a 10% (min) and 20% (max) padding outside of the datarange.
         * ```ts
         * axis.growBy = new NumberRange(0.1, 0.2);
         * ```
         */
        set: function (growBy) {
            this.growByProperty = growBy;
            this.notifyPropertyChanged(constants_1.PROPERTY.GROW_BY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "visibleRange", {
        /**
         * The VisibleRange is the range of the Axis (min to max).
         * @description
         * For example, if you have data-values from 0 to 100 in your {@link XyDataSeries | DataSeries}, but you only want to show
         * values from 15-25 on the axis, then set the visibleRange as follows:
         * ```ts
         * axis.visibleRange = new NumberRange(15, 25);
         * ```
         * @remarks
         * The visibleRange is a data-value for {@link NumericAxis}, {@link NumericAxis3D} but refers to an **index** to the data
         * for {@link CategoryAxis} types.
         */
        get: function () {
            return this.visibleRangeProperty;
        },
        /**
         * The VisibleRange is the range of the Axis (min to max).
         * @description
         * For example, if you have data-values from 0 to 100 in your {@link XyDataSeries | DataSeries}, but you only want to show
         * values from 15-25 on the axis, then set the visibleRange as follows:
         * ```ts
         * axis.visibleRange = new NumberRange(15, 25);
         * ```
         * @remarks
         * The visibleRange is a data-value for {@link NumericAxis}, {@link NumericAxis3D} but refers to an **index** to the data
         * for {@link CategoryAxis} types.
         *
         * If you override this setter, make sure you add
         * this.hasVisibleRangeSet = true;
         */
        set: function (visibleRange) {
            var _a;
            this.hasVisibleRangeSet = true;
            if (!((_a = this.visibleRangeProperty) === null || _a === void 0 ? void 0 : _a.equals(visibleRange))) {
                this.visibleRangeProperty = visibleRange;
                this.clearCoordCalcCache();
                this.visibleRangeChanged.raiseEvent(new VisibleRangeChangedArgs_1.VisibleRangeChangedArgs(visibleRange));
                this.notifyPropertyChanged(constants_1.PROPERTY.VISIBLE_RANGE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "animatedVisibleRange", {
        get: function () {
            if (!this.visibleRangeAnimationToken) {
                return this.visibleRange;
            }
            var animation = this.visibleRangeAnimationToken;
            return animation.to;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "majorDelta", {
        /**
         * The MajorDelta is the spacing between major gridlines and axis labels.
         * @remarks
         * This is internally computed via the {@link AxisCore.deltaCalculator | Delta Calculator}, however it can be explicitly set here
         * in which case you should also set {@link AxisCore.minorDelta} and {@link AxisCore.autoTicks} = false.
         *
         * It is also possible to override and create custom implementations of the {@link DeltaCalculator} for full control over axis gridline
         * spacing.
         */
        get: function () {
            return this.majorDeltaProperty;
        },
        /**
         * The MajorDelta is the spacing between major gridlines and axis labels.
         * @remarks
         * This is internally computed via the {@link AxisCore.deltaCalculator | Delta Calculator}, however it can be explicitly set here
         * in which case you should also set {@link AxisCore.minorDelta} and {@link AxisCore.autoTicks} = false.
         *
         * It is also possible to override and create custom implementations of the {@link DeltaCalculator} for full control over axis gridline
         * spacing.
         */
        set: function (majorDelta) {
            this.majorDeltaProperty = majorDelta;
            this.notifyPropertyChanged(constants_1.PROPERTY.MAJOR_DELTA);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "minorDelta", {
        /**
         * The MinorDelta is the spacing between minor gridlines.
         * @remarks
         * This is internally computed via the {@link AxisCore.deltaCalculator | Delta Calculator}, however it can be explicitly set here
         * in which case you should also set {@link AxisCore.majorDelta} and {@link AxisCore.autoTicks} = false.
         *
         * It is also possible to override and create custom implementations of the {@link DeltaCalculator} for full control over axis gridline
         * spacing.
         */
        get: function () {
            return this.minorDeltaProperty;
        },
        /**
         * The MinorDelta is the spacing between minor gridlines.
         * @remarks
         * This is internally computed via the {@link AxisCore.deltaCalculator | Delta Calculator}, however it can be explicitly set here
         * in which case you should also set {@link AxisCore.majorDelta} and {@link AxisCore.autoTicks} = false.
         *
         * It is also possible to override and create custom implementations of the {@link DeltaCalculator} for full control over axis gridline
         * spacing.
         */
        set: function (minorDelta) {
            this.minorDeltaProperty = minorDelta;
            this.notifyPropertyChanged(constants_1.PROPERTY.MINOR_DELTA);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "minorsPerMajor", {
        /**
         * When {@link AxisCore.autoTicks} is true, minorsPerMajor is a hint of how many minor gridlines should be drawn between each major gridline
         */
        get: function () {
            return this.minorsPerMajorProperty;
        },
        /**
         * When {@link AxisCore.autoTicks} is true, minorsPerMajor is a hint of how many minor gridlines should be drawn between each major gridline
         */
        set: function (minorDelta) {
            this.minorsPerMajorProperty = minorDelta;
            this.notifyPropertyChanged(constants_1.PROPERTY.MINORS_PER_MAJOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "textFormatting", {
        // TODO: These need to be implemented or removed
        get: function () {
            return this.textFormattingProperty;
        },
        set: function (textFormatting) {
            this.textFormattingProperty = textFormatting;
            this.notifyPropertyChanged(constants_1.PROPERTY.TEXT_FORMATTING);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "cursorTextFormatting", {
        get: function () {
            return this.cursorTextFormattingProperty;
        },
        set: function (cursorTextFormatting) {
            this.cursorTextFormattingProperty = cursorTextFormatting;
            this.notifyPropertyChanged(constants_1.PROPERTY.CURSOR_TEXT_FORMATTING);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "drawMajorGridLines", {
        /**
         * When true, major gridlines (lines inside the chart viewport area) are drawn, else they are not drawn
         * @description
         * SciChart makes a distinction between axis Gridlines (drawn inside the chart) and axis ticks (small marks drawn outside the chart).
         *
         * Also, an Axis draws its own gridlines, for example a YAxis, which is vertical in a 2D Chart, draws gridlines horizontally at y-spacings.
         *
         * Similarly, an XAxis, which is horizontal in a 2D chart, draws gridlines vertically at X-spacings.
         * @remarks
         * See also {@link AxisCore.majorGridLineStyle} to style the major gridlines
         */
        get: function () {
            return this.drawMajorGridLinesProperty;
        },
        /**
         * When true, major gridlines (lines inside the chart viewport area) are drawn, else they are not drawn
         * @description
         * SciChart makes a distinction between axis Gridlines (drawn inside the chart) and axis ticks (small marks drawn outside the chart).
         *
         * Also, an Axis draws its own gridlines, for example a YAxis, which is vertical in a 2D Chart, draws gridlines horizontally at y-spacings.
         *
         * Similarly, an XAxis, which is horizontal in a 2D chart, draws gridlines vertically at X-spacings.
         * @remarks
         * See also {@link AxisCore.majorGridLineStyle} to style the major gridlines
         */
        set: function (drawMajorGridLines) {
            this.drawMajorGridLinesProperty = drawMajorGridLines;
            this.notifyPropertyChanged(constants_1.PROPERTY.DRAW_MAJOR_GRID_LINES);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "drawMinorGridLines", {
        /**
         * When true, minor gridlines (lines inside the chart viewport area) are drawn, else they are not drawn
         * @description
         * SciChart makes a distinction between axis Gridlines (drawn inside the chart) and axis ticks (small marks drawn outside the chart).
         *
         * Also, an Axis draws its own gridlines, for example a YAxis, which is vertical in a 2D Chart, draws gridlines horizontally at y-spacings.
         *
         * Similarly, an XAxis, which is horizontal in a 2D chart, draws gridlines vertically at X-spacings.
         * @remarks
         * See also {@link AxisCore.minorGridLineStyle} to style the minor gridlines
         */
        get: function () {
            return this.drawMinorGridLinesProperty;
        },
        /**
         * When true, minor gridlines (lines inside the chart viewport area) are drawn, else they are not drawn
         * @description
         * SciChart makes a distinction between axis Gridlines (drawn inside the chart) and axis ticks (small marks drawn outside the chart).
         *
         * Also, an Axis draws its own gridlines, for example a YAxis, which is vertical in a 2D Chart, draws gridlines horizontally at y-spacings.
         *
         * Similarly, an XAxis, which is horizontal in a 2D chart, draws gridlines vertically at X-spacings.
         * @remarks
         * See also {@link AxisCore.minorGridLineStyle} to style the minor gridlines
         */
        set: function (drawMinorGridLines) {
            this.drawMinorGridLinesProperty = drawMinorGridLines;
            this.notifyPropertyChanged(constants_1.PROPERTY.DRAW_MINOR_GRID_LINES);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "drawMajorTickLines", {
        /**
         * When true, major gridlines (small lines outside the chart viewport area) are drawn, else they are not drawn
         * @description
         * SciChart makes a distinction between axis Gridlines (drawn inside the chart) and axis ticks (small marks drawn outside the chart).
         *
         * Also, an Axis draws its own ticklines, for example a YAxis, which is vertical in a 2D Chart, draws ticklines horizontally at y-spacings.
         *
         * Similarly, an XAxis, which is horizontal in a 2D chart, draws ticklines vertically at X-spacings.
         * @remarks
         * See also {@link AxisCore.majorTickLineStyle} to style the major tick lines
         */
        get: function () {
            return this.drawMajorTickLinesProperty;
        },
        /**
         * When true, major gridlines (small lines outside the chart viewport area) are drawn, else they are not drawn
         * @description
         * SciChart makes a distinction between axis Gridlines (drawn inside the chart) and axis ticks (small marks drawn outside the chart).
         *
         * Also, an Axis draws its own ticklines, for example a YAxis, which is vertical in a 2D Chart, draws ticklines horizontally at y-spacings.
         *
         * Similarly, an XAxis, which is horizontal in a 2D chart, draws ticklines vertically at X-spacings.
         * @remarks
         * See also {@link AxisCore.majorTickLineStyle} to style the major tick lines
         */
        set: function (drawMajorTickLines) {
            this.drawMajorTickLinesProperty = drawMajorTickLines;
            this.notifyPropertyChanged(constants_1.PROPERTY.DRAW_MAJOR_TICK_LINES);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "drawMinorTickLines", {
        /**
         * When true, minor gridlines (small lines outside the chart viewport area) are drawn, else they are not drawn
         * @description
         * SciChart makes a distinction between axis Gridlines (drawn inside the chart) and axis ticks (small marks drawn outside the chart).
         *
         * Also, an Axis draws its own ticklines, for example a YAxis, which is vertical in a 2D Chart, draws ticklines horizontally at y-spacings.
         *
         * Similarly, an XAxis, which is horizontal in a 2D chart, draws ticklines vertically at X-spacings.
         * @remarks
         * See also {@link AxisCore.minorTickLineStyle} to style the minor tick lines
         */
        get: function () {
            return this.drawMinorTickLinesProperty;
        },
        /**
         * When true, minor gridlines (small lines outside the chart viewport area) are drawn, else they are not drawn
         * @description
         * SciChart makes a distinction between axis Gridlines (drawn inside the chart) and axis ticks (small marks drawn outside the chart).
         *
         * Also, an Axis draws its own ticklines, for example a YAxis, which is vertical in a 2D Chart, draws ticklines horizontally at y-spacings.
         *
         * Similarly, an XAxis, which is horizontal in a 2D chart, draws ticklines vertically at X-spacings.
         * @remarks
         * See also {@link AxisCore.minorTickLineStyle} to style the minor tick lines
         */
        set: function (drawMinorTickLines) {
            this.drawMinorTickLinesProperty = drawMinorTickLines;
            this.notifyPropertyChanged(constants_1.PROPERTY.DRAW_MINOR_TICK_LINES);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "drawMajorBands", {
        /**
         * When true, draws bands, a solid color fill between alternative major gridlines, else they are not drawn
         * @remarks
         * See also the {@link AxisCore.axisBandsFill} property to style this element
         */
        get: function () {
            return this.drawMajorBandsProperty;
        },
        /**
         * When true, draws bands, a solid color fill between alternative major gridlines, else they are not drawn
         * @remarks
         * See also the {@link AxisCore.axisBandsFill} property to style this element
         */
        set: function (drawMajorBands) {
            this.drawMajorBandsProperty = drawMajorBands;
            this.notifyPropertyChanged(constants_1.PROPERTY.DRAW_MAJOR_BANDS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "drawLabels", {
        // TODO: We need a way to set Font family, style and color for axis labels and add @remarks here like other properties
        /**
         * When true, draws labels on the axis, else they are not drawn
         */
        get: function () {
            return this.drawLabelsProperty;
        },
        // TODO: We need a way to set Font family, style and color for axis labels and add @remarks here like other properties
        /**
         * When true, draws labels on the axis, else they are not drawn
         */
        set: function (drawLabels) {
            this.drawLabelsProperty = drawLabels;
            this.notifyPropertyChanged(constants_1.PROPERTY.DRAW_LABELS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "flippedCoordinates", {
        /**
         * When true, axis coordinates are flipped, e.g. a {@link NumericAxis} with {@link AxisCore.visibleRange | VisibleRange}
         * 0..10 will render from 10 to 0
         */
        get: function () {
            return this.flippedCoordinatesProperty;
        },
        /**
         * When true, axis coordinates are flipped, e.g. a {@link NumericAxis} with {@link AxisCore.visibleRange | VisibleRange}
         * 0..10 will render from 10 to 0
         */
        set: function (flippedCoordinates) {
            if (this.flippedCoordinatesProperty !== flippedCoordinates) {
                this.flippedCoordinatesProperty = flippedCoordinates;
                this.clearCoordCalcCache();
                this.notifyPropertyChanged(constants_1.PROPERTY.FLIPPED_COORDINATES);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "axisBandsFill", {
        /**
         * Gets or sets the Axis Bands fill as an HTML Color code
         * @remarks See {@link AxisCore.drawMajorBands} to switch band drawing on and off
         */
        get: function () {
            return this.axisBandsFillProperty;
        },
        /**
         * Gets or sets the Axis Bands fill as an HTML Color code
         * @remarks See {@link AxisCore.drawMajorBands} to switch band drawing on and off
         */
        set: function (axisBandsFill) {
            this.axisBandsFillProperty = axisBandsFill;
            this.notifyPropertyChanged(constants_1.PROPERTY.AXIS_BANDS_FILL);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "autoRange", {
        /**
         * gets or sets the Auto-Ranging behaviour on the axis. See {@link EAutoRange} for a list of values. The default value is
         * {@link EAutoRange.Once}
         */
        get: function () {
            return this.autoRangeProperty;
        },
        /**
         * gets or sets the Auto-Ranging behaviour on the axis. See {@link EAutoRange} for a list of values. The default value is
         * {@link EAutoRange.Once}
         */
        set: function (autoRange) {
            this.autoRangeProperty = autoRange;
            this.notifyPropertyChanged(constants_1.PROPERTY.AUTO_RANGE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "majorTickLineStyle", {
        /**
         * @summary Gets or sets the Major Tick lines style
         * @remarks See {@link TTickLineStyle} for the type which contains style options
         */
        get: function () {
            return this.majorTickLineStyleProperty;
        },
        /**
         * @summary Gets or sets the Major Tick lines style
         * @remarks See {@link TTickLineStyle} for the type which contains style options
         */
        set: function (majorTickLineStyle) {
            this.majorTickLineStyleProperty = __assign(__assign({}, this.majorTickLineStyle), majorTickLineStyle);
            this.notifyPropertyChanged(constants_1.PROPERTY.MAJOR_TICK_LINE_STYLE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "minorTickLineStyle", {
        /**
         * @summary Gets or sets the Minor Tick lines style
         * @remarks See {@link TTickLineStyle} for the type which contains style options
         */
        get: function () {
            return this.minorTickLineStyleProperty;
        },
        /**
         * @summary Gets or sets the Minor Tick lines style
         * @remarks See {@link TTickLineStyle} for the type which contains style options
         */
        set: function (minorTickLineStyle) {
            this.minorTickLineStyleProperty = __assign(__assign({}, this.minorTickLineStyle), minorTickLineStyle);
            this.notifyPropertyChanged(constants_1.PROPERTY.MINOR_TICK_LINE_STYLE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "majorGridLineStyle", {
        /**
         * @summary Gets or sets the Major gridlines style
         * @remarks See {@link TGridLineStyle} for the type which contains style options
         */
        get: function () {
            return this.majorGridLineStyleProperty;
        },
        /**
         * @summary Gets or sets the Major gridlines style
         * @remarks See {@link TGridLineStyle} for the type which contains style options
         */
        set: function (majorGridLineStyle) {
            this.majorGridLineStyleProperty = __assign(__assign({}, this.majorGridLineStyle), majorGridLineStyle);
            this.notifyPropertyChanged(constants_1.PROPERTY.MAJOR_GRID_LINE_STYLE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "minorGridLineStyle", {
        /**
         * @summary Gets or sets the Minor gridlines style
         * @remarks See {@link TGridLineStyle} for the type which contains style options
         */
        get: function () {
            return this.minorGridLineStyleProperty;
        },
        /**
         * @summary Gets or sets the Minor gridlines style
         * @remarks See {@link TGridLineStyle} for the type which contains style options
         */
        set: function (minorGridLineStyle) {
            this.minorGridLineStyleProperty = __assign(__assign({}, this.minorGridLineStyle), minorGridLineStyle);
            this.notifyPropertyChanged(constants_1.PROPERTY.MINOR_GRID_LINE_STYLE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "dpiAdjustedAxisTitleStyle", {
        /**
         * Gets the {@link axisTitleStyle} adjusted for current DPI / Browser zoom level
         */
        get: function () {
            return DpiHelper_1.DpiHelper.adjustTextStyle(this.axisTitleStyleProperty);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "axisTitleStyle", {
        /**
         * @summary Gets or sets the Axis Title style
         * @remarks See {@link TAxisTitleStyle} for the type which contains style options
         */
        get: function () {
            return this.axisTitleStyleProperty;
        },
        /**
         * @summary Gets or sets the Axis Title style
         * @remarks See {@link TAxisTitleStyle} for the type which contains style options
         */
        set: function (textStyle) {
            this.axisTitleStyleProperty = __assign(__assign({}, this.axisTitleStyle), textStyle);
            this.notifyPropertyChanged(constants_1.PROPERTY.TEXT_STYLE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "axisTitle", {
        /**
         * Gets or sets the Axis title string
         * Use an array to create a multiLine title
         */
        get: function () {
            return this.axisTitleProperty;
        },
        /**
         * Gets or sets the Axis title string
         * Use an array to create a multiLine title
         */
        set: function (axisTitle) {
            this.axisTitleProperty = axisTitle;
            this.notifyPropertyChanged(constants_1.PROPERTY.AXIS_TITLE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "tickProvider", {
        /**
         * Gets or sets a {@link TickProvider} - a class which calculates ticks (interval between major and minor gridlines, ticks and labels)
         */
        get: function () {
            return this.tickProviderProperty;
        },
        /**
         * Gets or sets a {@link TickProvider} - a class which calculates ticks (interval between major and minor gridlines, ticks and labels)
         * @param tickProvider
         */
        set: function (tickProvider) {
            var _a;
            (_a = this.tickProviderProperty) === null || _a === void 0 ? void 0 : _a.detachedFromAxis();
            this.tickProviderProperty = tickProvider;
            this.notifyPropertyChanged(constants_1.PROPERTY.TICK_PROVIDER);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "labelProvider", {
        /**
         * Gets or sets a {@link LabelProvider} - a class which is responsible for formatting axis labels and cursor labels from numeric values
         */
        get: function () {
            return this.labelProviderProperty;
        },
        /**
         * Gets or sets a {@link LabelProvider} - a class which is responsible for formatting axis labels and cursor labels from numeric values
         */
        set: function (labelProvider) {
            var _a;
            (_a = this.labelProviderProperty) === null || _a === void 0 ? void 0 : _a.detachedFromAxis();
            this.labelProviderProperty = labelProvider;
            this.notifyPropertyChanged(constants_1.PROPERTY.LABEL_PROVIDER);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "deltaCalculator", {
        /**
         * Gets or sets a {@link DeltaCalculator} - a class which is responsible for calculating the Major and Minor delta,
         * which are used for gridline spacing
         */
        get: function () {
            return this.deltaCalculatorProperty;
        },
        /**
         * Gets or sets a {@link DeltaCalculator} - a class which is responsible for calculating the Major and Minor delta,
         * which are used for gridline spacing
         */
        set: function (deltaCalculator) {
            var _a;
            (_a = this.deltaCalculator) === null || _a === void 0 ? void 0 : _a.detachedFromAxis();
            this.deltaCalculatorProperty = deltaCalculator;
            this.notifyPropertyChanged(constants_1.PROPERTY.DELTA_CALCULATOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "tickCoordinatesProvider", {
        /**
         * Gets or sets a {@link TickCoordinatesProvider} - a class which is responsible for converting tick values to pixel coordinates
         */
        get: function () {
            return this.tickCoordinatesProviderProperty;
        },
        /**
         * Gets or sets a {@link TickCoordinatesProvider} - a class which is responsible for converting tick values to pixel coordinates
         */
        set: function (tickCoordinatesProvider) {
            var _a;
            (_a = this.tickCoordinatesProviderProperty) === null || _a === void 0 ? void 0 : _a.detachedFromAxis();
            this.tickCoordinatesProviderProperty = tickCoordinatesProvider;
            this.notifyPropertyChanged(constants_1.PROPERTY.TICK_COORDINATES_CALCULATOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "maxAutoTicks", {
        /**
         * Gets or sets the max-auto-ticks. A hint which limits the number of major gridlines and labels (aka major ticks) on the axis
         * at any one time. This value is a hint, and actual value of ticks may be lower than this
         */
        get: function () {
            return this.maxAutoTicksProperty;
        },
        /**
         * Gets or sets the max-auto-ticks. A hint which limits the number of major gridlines and labels (aka major ticks) on the axis
         * at any one time. This value is a hint, and actual value of ticks may be lower than this
         */
        set: function (value) {
            this.maxAutoTicksProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.MAX_AUTO_TICKS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "autoTicks", {
        /**
         * A boolean flag, when true, the axis will automatically calculate its Major and Minor delta.
         * When false, the user can specify or set these properties for overriding axis gridline spacing
         */
        get: function () {
            return this.autoTicksProperty;
        },
        /**
         * A boolean flag, when true, the axis will automatically calculate its Major and Minor delta.
         * When false, the user can specify or set these properties for overriding axis gridline spacing
         */
        set: function (value) {
            this.autoTicksProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.AUTO_TICKS);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Gets the current {@link CoordinateCalculatorBase} instance. Recreates the coordinate-calculator if it does not match the axis values
     * The coordinate-calculator allows you to transform between pixel and data coordinates (and vice versa)
     */
    AxisCore.prototype.getCurrentCoordinateCalculator = function () {
        if (this.coordCalcCache && this.coordCalcCache.viewportDimension !== this.getAxisSize()) {
            this.clearCoordCalcCache();
        }
        if (!this.coordCalcCache) {
            this.coordCalcCache = this.getCurrentCoordinateCalculatorInternal();
        }
        return this.coordCalcCache;
    };
    /** Force the recreation of the coordinate calculator the next time it is requested
     * Required if the dataSeries has changed on a category axis
     */
    AxisCore.prototype.clearCoordCalcCache = function () {
        this.coordCalcCache = (0, Deleter_1.deleteSafe)(this.coordCalcCache);
    };
    /**
     * @inheritDoc
     */
    AxisCore.prototype.delete = function () {
        this.deltaCalculator = undefined;
        this.tickProvider = undefined;
        this.tickCoordinatesProvider = undefined;
        this.labelProviderProperty = (0, Deleter_1.deleteSafe)(this.labelProvider);
        this.coordCalcCache = (0, Deleter_1.deleteSafe)(this.coordCalcCache);
    };
    /**
     * Tests whether the range passed in is valid
     * @param range The range
     */
    AxisCore.prototype.isValidRange = function (range) {
        var isInvalid = !range || !range.isDefined() || range.min > range.max;
        return !isInvalid;
    };
    Object.defineProperty(AxisCore.prototype, "isVerticalChart", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisCore.prototype, "isHorizontalAxis", {
        get: function () {
            return this.isXAxis;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * SET INTERNALLY. Sets whether this axis is an XAxis or not
     * @remarks
     * See {@link AxisBase2D.axisAlignment} if you want to set a 2D Axis alignment to the left, right, top or bottom
     */
    AxisCore.prototype.setIsXAxis = function (isXAxis) {
        this.isXAxisProperty = isXAxis;
        this.notifyPropertyChanged(constants_1.PROPERTY.IS_XAXIS);
    };
    AxisCore.prototype.coerceZeroVisibleRange = function (range) {
        Guard_1.Guard.notNull(range, "range");
        if (range.isZero()) {
            if (range.min === 0) {
                return new NumberRange_1.NumberRange(-1, 1);
            }
            else {
                return range.growBy(new NumberRange_1.NumberRange(this.ZeroRangeGrowBy, this.ZeroRangeGrowBy));
            }
        }
        return range;
    };
    /**
     * Notifies listeners to {@link AxisCore.invalidateParentCallback} that a property has changed and the parent chart needs to be redrawn.
     * @remarks Override this in derived classes if you want to notified of a specific property change
     * @param propertyName The property name which has changed.
     */
    AxisCore.prototype.notifyPropertyChanged = function (propertyName) {
        var _a, _b, _c, _d;
        if (propertyName === constants_1.PROPERTY.DELTA_CALCULATOR) {
            (_a = this.deltaCalculator) === null || _a === void 0 ? void 0 : _a.attachedToAxis(this);
        }
        if (propertyName === constants_1.PROPERTY.TICK_PROVIDER) {
            (_b = this.tickProvider) === null || _b === void 0 ? void 0 : _b.attachedToAxis(this);
        }
        if (propertyName === constants_1.PROPERTY.LABEL_PROVIDER) {
            (_c = this.labelProvider) === null || _c === void 0 ? void 0 : _c.attachedToAxis(this);
        }
        if (propertyName === constants_1.PROPERTY.TICK_COORDINATES_CALCULATOR) {
            (_d = this.tickCoordinatesProvider) === null || _d === void 0 ? void 0 : _d.attachedToAxis(this);
        }
        if (this.isMeasured && this.invalidateParentCallback) {
            this.invalidateParentCallback();
        }
    };
    AxisCore.prototype.getMaxAutoTicks = function () {
        return Math.max(1, this.maxAutoTicks);
    };
    /**
     * The Default {@link AxisCore.id}
     * @description
     * By default all axis in SciChart have Id={@link AxisCore.DEFAULT_AXIS_ID}. Also, all {@link BaseRenderableSeries | RenderableSeries}
     * have an xAxisId and yAxisId property set to {@link AxisCore.DEFAULT_AXIS_ID}. {@link AnnotationBase | Annotations} also have an xAxisId and
     * yAxisId also set to {@link AxisCore.DEFAULT_AXIS_ID}. Some {@link ChartModifierBase | Chart Modifiers} have an x,yAxisId property to filter
     * their operations to an axis.
     *
     * In multi-axis scenarios you will need to set the xAxisId/yAxisId properties of series, annotations, modifiers to match that of the axis
     * you want them to be registered on.
     */
    AxisCore.DEFAULT_AXIS_ID = "DefaultAxisId";
    return AxisCore;
}(DeletableEntity_1.DeletableEntity));
exports.AxisCore = AxisCore;
