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
exports.adjustTooltipPosition = exports.calcTooltipSize = exports.CursorModifier = void 0;
var classFactory_1 = require("../../Builder/classFactory");
var Deleter_1 = require("../../Core/Deleter");
var BaseType_1 = require("../../types/BaseType");
var ChartModifierType_1 = require("../../types/ChartModifierType");
var MousePosition_1 = require("../../types/MousePosition");
var parseColor_1 = require("../../utils/parseColor");
var translate_1 = require("../../utils/translate");
var IDataSeries_1 = require("../Model/IDataSeries");
var AnnotationBase_1 = require("../Visuals/Annotations/AnnotationBase");
var CursorTooltipSvgAnnotation_1 = require("../Visuals/Annotations/CursorTooltipSvgAnnotation");
var LineAnnotation_1 = require("../Visuals/Annotations/LineAnnotation");
var SciChartSurfaceBase_1 = require("../Visuals/SciChartSurfaceBase");
var ChartModifierBase2D_1 = require("./ChartModifierBase2D");
var constants_1 = require("./constants");
/**
 * The CursorModifier provides tooltip and cursor behavior on a 2D {@link SciChartSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the CursorModifier to a {@link SciChartSurface} and add tooltip behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new CursorModifier());
 * ```
 */
var CursorModifier = /** @class */ (function (_super) {
    __extends(CursorModifier, _super);
    /**
     * Creates an instance of the CursorModifier
     *
     * If number of renderable series is more then 10 and showTooltip enabled consider passing {@link TCursorTooltipDataTemplate} or {@link TCursorTooltipSvgTemplate} to reduce the output for the tooltip
     *
     * @param options Optional parameters {@link ICursorModifierOptions} used to configure the modifier
     */
    function CursorModifier(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y;
        _this = _super.call(this, options) || this;
        _this.type = ChartModifierType_1.EChart2DModifierType.Cursor;
        /**
         * Get or set a function which generates the svg for the entire tooltip. Note that the repositioning of the tooltip to keep it within the chart is normally done in this function.
         * To retain this functionality in your own template function, include the following:
         * ```ts
         *   // valuesWithLabels is the result of the tooltipDataTemplate function, which is the text content of the tooltip as an array of strings
         *   const { width, height } = calcTooltipSize(valuesWithLabels);
         *   // this calculates and sets svgAnnotation.xCoordShift and svgAnnotation.yCoordShift.  Do not set x1 or y1 at this point.
         *   adjustTooltipPosition(width, height, svgAnnotation);
         * ```
         */
        _this.tooltipSvgTemplate = defaultTooltipTemplate;
        /**
         * Gets or sets the crosshair line strokethickness
         */
        _this.crosshairStrokeThickness = 2;
        /**
         * Gets or sets the crosshair line dash array
         */
        _this.crosshairStrokeDashArray = [];
        /**
         * Gets or sets the tooltip container background color as an HTML Color code
         */
        _this.tooltipContainerBackground = "#228B22";
        /**
         * Gets or sets the tooltip text color as an HTML Color code
         */
        _this.tooltipTextStroke = "#fff";
        /**
         * Gets or sets whether we should display the tooltip. Default is false
         */
        _this.showTooltip = false;
        /**
         * Gets or sets both axis label text color as an HTML Color code
         */
        _this.axisLabelStroke = "#fff";
        /**
         * Gets or sets both axis label fill as an HTML Color code.
         */
        _this.axisLabelFill = "#228B22";
        /**
         * Gets or sets the xAxis label text color as an HTML Color code
         */
        _this.xAxisLabelStroke = undefined;
        /**
         * Gets or sets the xAxis label fill as an HTML Color code.
         */
        _this.xAxisLabelFill = undefined;
        /**
         * Gets or sets the xAxis label text color as an HTML Color code
         */
        _this.yAxisLabelStroke = undefined;
        /**
         * Gets or sets the yAxis label fill as an HTML Color code.
         */
        _this.yAxisLabelFill = undefined;
        /**
         * Gets or sets the legend X offset
         */
        _this.tooltipLegendOffsetX = 0;
        /**
         * Gets or sets the legend Y offset
         */
        _this.tooltipLegendOffsetY = 0;
        /**
         * If this is set greater than the default of zero, the toolip will only show values for points in this radius, rather than all points on the vertical line
         */
        _this.hitTestRadius = 0;
        _this.mousePosition = MousePosition_1.EMousePosition.OutOfCanvas;
        _this.crosshairStrokeProperty = SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.cursorLineBrush;
        _this.tooltipShadowProperty = SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.shadowEffectColor;
        _this.includedSeriesMap = new Map();
        _this.showXLineProperty = true;
        _this.showYLineProperty = true;
        _this.showAxisLabelsProperty = true;
        if (options === null || options === void 0 ? void 0 : options.tooltipSvgTemplate) {
            if (typeof options.tooltipSvgTemplate === "string") {
                _this.typeMap.set("tooltipSvgTemplate", options.tooltipSvgTemplate);
                // @ts-ignore
                options.tooltipSvgTemplate = (0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.tooltipSvgTemplate);
            }
        }
        _this.tooltipSvgTemplate = (_a = options === null || options === void 0 ? void 0 : options.tooltipSvgTemplate) !== null && _a !== void 0 ? _a : _this.tooltipSvgTemplate;
        _this.crosshairStrokeThickness = (_b = options === null || options === void 0 ? void 0 : options.crosshairStrokeThickness) !== null && _b !== void 0 ? _b : _this.crosshairStrokeThickness;
        _this.crosshairStrokeDashArray = (_c = options === null || options === void 0 ? void 0 : options.crosshairStrokeDashArray) !== null && _c !== void 0 ? _c : _this.crosshairStrokeDashArray;
        _this.crosshairStroke = (_d = options === null || options === void 0 ? void 0 : options.crosshairStroke) !== null && _d !== void 0 ? _d : _this.crosshairStroke;
        _this.tooltipContainerBackground = (_e = options === null || options === void 0 ? void 0 : options.tooltipContainerBackground) !== null && _e !== void 0 ? _e : _this.tooltipContainerBackground;
        _this.tooltipTextStroke = (_f = options === null || options === void 0 ? void 0 : options.tooltipTextStroke) !== null && _f !== void 0 ? _f : _this.tooltipTextStroke;
        _this.tooltipShadow = (_g = options === null || options === void 0 ? void 0 : options.tooltipShadow) !== null && _g !== void 0 ? _g : _this.tooltipShadowProperty;
        _this.showTooltip = (_h = options === null || options === void 0 ? void 0 : options.showTooltip) !== null && _h !== void 0 ? _h : _this.showTooltip;
        _this.showAxisLabels = (_j = options === null || options === void 0 ? void 0 : options.showAxisLabels) !== null && _j !== void 0 ? _j : _this.showAxisLabels;
        _this.axisLabelFill = (_k = options === null || options === void 0 ? void 0 : options.axisLabelFill) !== null && _k !== void 0 ? _k : _this.axisLabelFill;
        _this.axisLabelStroke = (_l = options === null || options === void 0 ? void 0 : options.axisLabelStroke) !== null && _l !== void 0 ? _l : _this.axisLabelStroke;
        _this.xAxisLabelStroke = (_m = options === null || options === void 0 ? void 0 : options.xAxisLabelStroke) !== null && _m !== void 0 ? _m : _this.xAxisLabelStroke;
        _this.xAxisLabelFill = (_o = options === null || options === void 0 ? void 0 : options.xAxisLabelFill) !== null && _o !== void 0 ? _o : _this.xAxisLabelFill;
        _this.yAxisLabelStroke = (_p = options === null || options === void 0 ? void 0 : options.yAxisLabelStroke) !== null && _p !== void 0 ? _p : _this.yAxisLabelStroke;
        _this.yAxisLabelFill = (_q = options === null || options === void 0 ? void 0 : options.yAxisLabelFill) !== null && _q !== void 0 ? _q : _this.yAxisLabelFill;
        _this.placementDivIdProperty = (_r = options === null || options === void 0 ? void 0 : options.placementDivId) !== null && _r !== void 0 ? _r : _this.placementDivIdProperty;
        if (options === null || options === void 0 ? void 0 : options.tooltipLegendTemplate) {
            if (typeof options.tooltipLegendTemplate === "string") {
                _this.typeMap.set("tooltipLegendTemplate", options.tooltipLegendTemplate);
                // @ts-ignore
                options.tooltipLegendTemplate = (0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.tooltipLegendTemplate);
            }
        }
        _this.tooltipLegendTemplate =
            (_s = options === null || options === void 0 ? void 0 : options.tooltipLegendTemplate) !== null && _s !== void 0 ? _s : _this.tooltipLegendTemplate;
        _this.tooltipLegendOffsetX = (_t = options === null || options === void 0 ? void 0 : options.tooltipLegendOffsetX) !== null && _t !== void 0 ? _t : _this.tooltipLegendOffsetX;
        _this.tooltipLegendOffsetY = (_u = options === null || options === void 0 ? void 0 : options.tooltipLegendOffsetY) !== null && _u !== void 0 ? _u : _this.tooltipLegendOffsetY;
        if (options === null || options === void 0 ? void 0 : options.tooltipDataTemplate) {
            if (typeof options.tooltipDataTemplate === "string") {
                _this.typeMap.set("tooltipDataTemplate", options.tooltipDataTemplate);
                // @ts-ignore
                options.tooltipDataTemplate = (0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.tooltipDataTemplate);
            }
        }
        _this.tooltipDataTemplateProperty =
            (_v = options === null || options === void 0 ? void 0 : options.tooltipDataTemplate) !== null && _v !== void 0 ? _v : _this.tooltipDataTemplateProperty;
        _this.showXLine = (_w = options === null || options === void 0 ? void 0 : options.showXLine) !== null && _w !== void 0 ? _w : _this.showXLine;
        _this.showYLine = (_x = options === null || options === void 0 ? void 0 : options.showYLine) !== null && _x !== void 0 ? _x : _this.showYLine;
        _this.hitTestRadius = (_y = options === null || options === void 0 ? void 0 : options.hitTestRadius) !== null && _y !== void 0 ? _y : _this.hitTestRadius;
        return _this;
    }
    /**
     * @inheritDoc
     */
    CursorModifier.prototype.applyTheme = function (themeProvider) {
        if (!this.testPropertyChanged(constants_1.PROPERTY.CROSSHAIR_STROKE)) {
            this.crosshairStroke = themeProvider.cursorLineBrush;
        }
        if (!this.testPropertyChanged(constants_1.PROPERTY.TOOLTIP_SHADOW)) {
            this.tooltipShadow = themeProvider.shadowEffectColor;
        }
    };
    /**
     * @inheritDoc
     */
    CursorModifier.prototype.onAttach = function () {
        var _a;
        _super.prototype.onAttach.call(this);
        var xAxisLabelFill = this.xAxisLabelFill ? this.xAxisLabelFill : this.axisLabelFill;
        var yAxisLabelFill = this.yAxisLabelFill ? this.yAxisLabelFill : this.axisLabelFill;
        var xAxisLabelStroke = this.xAxisLabelStroke ? this.xAxisLabelStroke : this.axisLabelStroke;
        var yAxisLabelStroke = this.yAxisLabelStroke ? this.yAxisLabelStroke : this.axisLabelStroke;
        if (this.showXLine) {
            this.xLineAnnotation = this.newLineAnnotation(xAxisLabelFill, xAxisLabelStroke);
            this.parentSurface.modifierAnnotations.add(this.xLineAnnotation);
        }
        if (this.showYLine) {
            this.yLineAnnotation = this.newLineAnnotation(yAxisLabelFill, yAxisLabelStroke);
            this.parentSurface.modifierAnnotations.add(this.yLineAnnotation);
        }
        this.tooltipAnnotation = new CursorTooltipSvgAnnotation_1.CursorTooltipSvgAnnotation({
            cursorModifier: this,
            xCoordinateMode: AnnotationBase_1.ECoordinateMode.Pixel,
            yCoordinateMode: AnnotationBase_1.ECoordinateMode.Pixel,
            tooltipSvgTemplate: (_a = this.tooltipSvgTemplate) !== null && _a !== void 0 ? _a : defaultTooltipTemplate,
            containerBackground: this.tooltipContainerBackground,
            textStroke: this.tooltipTextStroke,
            tooltipLegendTemplate: this.tooltipLegendTemplate,
            tooltipLegendOffsetX: this.tooltipLegendOffsetX,
            tooltipLegendOffsetY: this.tooltipLegendOffsetY,
            xAxisId: this.xAxisId,
            yAxisId: this.yAxisId,
            placementDivId: this.placementDivId
        });
        this.parentSurface.modifierAnnotations.add(this.tooltipAnnotation);
    };
    /**
     * @inheritDoc
     */
    CursorModifier.prototype.onDetach = function () {
        _super.prototype.onDetach.call(this);
        if (this.xLineAnnotation) {
            this.parentSurface.modifierAnnotations.remove(this.xLineAnnotation, true);
        }
        if (this.yLineAnnotation) {
            this.parentSurface.modifierAnnotations.remove(this.yLineAnnotation, true);
        }
        this.parentSurface.modifierAnnotations.remove(this.tooltipAnnotation, true);
    };
    /**
     * @inheritDoc
     */
    CursorModifier.prototype.onAttachSeries = function (rs) {
        this.tooltipAnnotation.seriesInfos = this.getSeriesInfos();
    };
    /**
     * @inheritDoc
     */
    CursorModifier.prototype.onDetachSeries = function (rs) {
        this.tooltipAnnotation.seriesInfos = this.getSeriesInfos();
    };
    /**
     * @inheritDoc
     */
    CursorModifier.prototype.modifierMouseMove = function (args) {
        // If this is on a subchart, only respond to events from the active subchart
        if (this.parentSurface.isSubSurface && !args.isActiveSubChartEvent)
            return;
        this.activePointerEvents.set(args.pointerId, args);
        _super.prototype.modifierMouseMove.call(this, args);
        var translatedMousePoint;
        if (!this.mousePoint) {
            this.mousePosition = MousePosition_1.EMousePosition.OutOfCanvas;
        }
        else {
            translatedMousePoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(this.mousePoint, this.parentSurface.seriesViewRect);
            if (!translatedMousePoint) {
                this.mousePosition = MousePosition_1.EMousePosition.AxisArea;
            }
            else {
                this.mousePosition = MousePosition_1.EMousePosition.SeriesArea;
            }
        }
        var isActionAllowed = this.getIsActionAllowed(args);
        if (isActionAllowed) {
            this.update();
        }
    };
    /**
     * @inheritDoc
     */
    CursorModifier.prototype.modifierMouseLeave = function (args) {
        _super.prototype.modifierMouseLeave.call(this, args);
        this.mousePosition = MousePosition_1.EMousePosition.OutOfCanvas;
        this.update();
    };
    /**
     * @inheritDoc
     */
    CursorModifier.prototype.onParentSurfaceRendered = function () {
        this.update();
    };
    Object.defineProperty(CursorModifier.prototype, "crosshairStroke", {
        /**
         * Gets or sets the crosshair line Stroke color as an HTML Color code
         */
        get: function () {
            return this.crosshairStrokeProperty;
        },
        /**
         * Gets or sets the crosshair line Stroke color as an HTML Color code
         */
        set: function (value) {
            if (this.crosshairStrokeProperty !== value) {
                this.crosshairStrokeProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.CROSSHAIR_STROKE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CursorModifier.prototype, "tooltipShadow", {
        /**
         * Gets or sets the tooltip shadow color as an HTML Color code
         */
        get: function () {
            return this.tooltipShadowProperty;
        },
        /**
         * Gets or sets the tooltip shadow color as an HTML Color code
         */
        set: function (value) {
            if (this.tooltipShadowProperty !== value) {
                this.tooltipShadowProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.TOOLTIP_SHADOW);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CursorModifier.prototype, "showXLine", {
        /**
         *  Gets or sets whether we should display the X Line. Default is true
         */
        get: function () {
            return this.showXLineProperty;
        },
        /**
         *  Gets or sets whether we should display the X Line. Default is true
         */
        set: function (value) {
            if (this.showXLineProperty !== value) {
                this.showXLineProperty = value;
                if (this.showXLineProperty && !this.xLineAnnotation) {
                    var xAxisLabelFill = this.xAxisLabelFill ? this.xAxisLabelFill : this.axisLabelFill;
                    var xAxisLabelStroke = this.xAxisLabelStroke ? this.xAxisLabelStroke : this.axisLabelStroke;
                    this.xLineAnnotation = this.newLineAnnotation(xAxisLabelFill, xAxisLabelStroke);
                    this.parentSurface.modifierAnnotations.add(this.xLineAnnotation);
                }
                else if (!this.showXLineProperty && this.xLineAnnotation) {
                    this.parentSurface.modifierAnnotations.remove(this.xLineAnnotation);
                    this.xLineAnnotation = (0, Deleter_1.deleteSafe)(this.xLineAnnotation);
                }
                this.notifyPropertyChanged(constants_1.PROPERTY.X_LINE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CursorModifier.prototype, "showYLine", {
        /**
         *  Gets or sets whether we should display the Y Line. Default is true
         */
        get: function () {
            return this.showYLineProperty;
        },
        /**
         *  Gets or sets whether we should display the Y Line. Default is true
         */
        set: function (value) {
            if (this.showYLineProperty !== value) {
                this.showYLineProperty = value;
                if (this.showYLineProperty && !this.yLineAnnotation) {
                    var yAxisLabelFill = this.yAxisLabelFill ? this.yAxisLabelFill : this.axisLabelFill;
                    var yAxisLabelStroke = this.yAxisLabelStroke ? this.yAxisLabelStroke : this.axisLabelStroke;
                    this.yLineAnnotation = this.newLineAnnotation(yAxisLabelFill, yAxisLabelStroke);
                    this.parentSurface.modifierAnnotations.add(this.yLineAnnotation);
                }
                else if (!this.showYLineProperty && this.yLineAnnotation) {
                    this.parentSurface.modifierAnnotations.remove(this.yLineAnnotation);
                    this.yLineAnnotation = (0, Deleter_1.deleteSafe)(this.yLineAnnotation);
                }
                this.notifyPropertyChanged(constants_1.PROPERTY.Y_LINE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CursorModifier.prototype, "showAxisLabels", {
        /**
         *  Gets or sets whether we should display the Axis Labels. Default is true
         */
        get: function () {
            return this.showAxisLabelsProperty;
        },
        /**
         *  Gets or sets whether we should display the Axis Labels. Default is true
         */
        set: function (value) {
            if (this.showAxisLabelsProperty !== value) {
                this.showAxisLabelsProperty = value;
                if (this.xLineAnnotation) {
                    this.xLineAnnotation.showLabel = this.showAxisLabelsProperty;
                }
                if (this.yLineAnnotation) {
                    this.yLineAnnotation.showLabel = this.showAxisLabelsProperty;
                }
                this.notifyPropertyChanged(constants_1.PROPERTY.AXIS_LABELS);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CursorModifier.prototype, "placementDivId", {
        /**
         * Gets or sets the parent div element reference or id for the Tooltip
         */
        get: function () {
            return this.placementDivIdProperty;
        },
        /**
         * Gets or sets the parent div element reference or id for the Tooltip
         */
        set: function (value) {
            if (this.placementDivIdProperty !== value) {
                this.placementDivIdProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.PLACEMENT_DIV_ID);
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    CursorModifier.prototype.includeSeries = function (series, isIncluded) {
        this.includedSeriesMap.set(series, isIncluded);
        if (this.isAttached) {
            this.tooltipAnnotation.seriesInfos = this.getSeriesInfos();
        }
    };
    /**
     * @inheritDoc
     */
    CursorModifier.prototype.getIncludedRenderableSeries = function () {
        var _this = this;
        var regularSeries = this.parentSurface.renderableSeries
            .asArray()
            .filter(function (rs) { return !rs.isStacked && rs.isVisible && _this.testIsIncludedSeries(rs); });
        var stackedSeries = this.parentSurface.renderableSeries.asArray().filter(function (el) { return el.isStacked; });
        var allSeries = regularSeries;
        stackedSeries.forEach(function (rs) {
            rs.getVisibleSeries().forEach(function (childRs) {
                if (_this.testIsIncludedSeries(childRs)) {
                    allSeries.push(childRs);
                }
            });
        });
        return allSeries;
    };
    Object.defineProperty(CursorModifier.prototype, "tooltipDataTemplate", {
        /**
         * Gets or sets the tooltipDataTemplate, which allows to customize content for the tooltip
         */
        get: function () {
            return this.tooltipDataTemplateProperty;
        },
        set: function (value) {
            this.tooltipDataTemplateProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.TOOLTIP_DATA_TEMPLATE);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Override hitTestRenderableSeries and add a custom logic here
     * @param rs
     * @param mousePoint
     */
    CursorModifier.prototype.hitTestRenderableSeries = function (rs, mousePoint) {
        if (!mousePoint) {
            return undefined;
        }
        if (this.hitTestRadius <= 0) {
            return rs.hitTestProvider.hitTestXSlice(mousePoint.x, mousePoint.y);
        }
        else {
            return rs.hitTestProvider.hitTestDataPoint(mousePoint.x, mousePoint.y, this.hitTestRadius);
        }
    };
    /**
     * Returns current mouse position
     */
    CursorModifier.prototype.getMousePosition = function () {
        return this.mousePosition;
    };
    /** @inheritDoc */
    CursorModifier.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            axisLabelFill: this.axisLabelFill,
            axisLabelStroke: this.axisLabelStroke,
            xAxisLabelFill: this.xAxisLabelFill,
            xAxisLabelStroke: this.xAxisLabelStroke,
            yAxisLabelFill: this.yAxisLabelFill,
            yAxisLabelStroke: this.yAxisLabelStroke,
            crosshairStroke: this.crosshairStroke,
            crosshairStrokeDashArray: this.crosshairStrokeDashArray,
            crosshairStrokeThickness: this.crosshairStrokeThickness,
            hitTestRadius: this.hitTestRadius,
            placementDivId: this.placementDivId,
            showAxisLabels: this.showAxisLabels,
            showTooltip: this.showTooltip,
            showXLine: this.showXLine,
            showYLine: this.showYLine,
            tooltipContainerBackground: this.tooltipContainerBackground,
            tooltipDataTemplate: this.typeMap.get("tooltipDataTemplate"),
            tooltipLegendOffsetX: this.tooltipLegendOffsetX,
            tooltipLegendOffsetY: this.tooltipLegendOffsetY,
            tooltipLegendTemplate: this.typeMap.get("tooltipLegendTemplate"),
            tooltipSvgTemplate: this.typeMap.get("tooltipSvgTemplate"),
            tooltipTextStroke: this.tooltipTextStroke,
            tooltipShadow: this.tooltipShadow
        };
        Object.assign(json.options, options);
        return json;
    };
    CursorModifier.prototype.notifyPropertyChanged = function (propertyName) {
        _super.prototype.notifyPropertyChanged.call(this, propertyName);
        if (propertyName === constants_1.PROPERTY.X_AXIS_ID) {
            this.tooltipAnnotation.xAxisId = this.xAxisId;
            if (this.xLineAnnotation) {
                this.xLineAnnotation.xAxisId = this.xAxisId;
            }
            if (this.yLineAnnotation) {
                this.yLineAnnotation.xAxisId = this.xAxisId;
            }
        }
        if (propertyName === constants_1.PROPERTY.Y_AXIS_ID) {
            this.tooltipAnnotation.yAxisId = this.yAxisId;
            if (this.xLineAnnotation) {
                this.xLineAnnotation.yAxisId = this.yAxisId;
            }
            if (this.yLineAnnotation) {
                this.yLineAnnotation.yAxisId = this.yAxisId;
            }
        }
    };
    CursorModifier.prototype.getSeriesInfos = function () {
        var _this = this;
        return this.getIncludedRenderableSeries()
            .map(function (rs) {
            var hitTestInfo = _this.hitTestRenderableSeries(rs, _this.mousePoint);
            if (!hitTestInfo) {
                return undefined;
            }
            return rs.getSeriesInfo(hitTestInfo);
        })
            .filter(function (rs) { return rs !== undefined; });
    };
    CursorModifier.prototype.update = function () {
        if (this.mousePosition !== MousePosition_1.EMousePosition.SeriesArea) {
            if (this.xLineAnnotation) {
                this.xLineAnnotation.isHidden = true;
            }
            if (this.yLineAnnotation) {
                this.yLineAnnotation.isHidden = true;
            }
            this.tooltipAnnotation.isHidden = true;
            this.tooltipAnnotation.seriesInfos = [];
            if (this.placementDivId) {
                this.tooltipAnnotation.delete();
            }
            return;
        }
        var translatedMousePoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(this.mousePoint, this.parentSurface.seriesViewRect);
        if (this.xLineAnnotation) {
            this.xLineAnnotation.isHidden = false;
        }
        if (this.yLineAnnotation) {
            this.yLineAnnotation.isHidden = false;
        }
        if (this.showTooltip) {
            this.tooltipAnnotation.isHidden = false;
        }
        if (translatedMousePoint) {
            var x = (0, translate_1.translateToNotScaled)(translatedMousePoint.x);
            var y = (0, translate_1.translateToNotScaled)(translatedMousePoint.y);
            if (this.xLineAnnotation) {
                this.xLineAnnotation.y1 = 0;
            }
            if (this.yLineAnnotation) {
                this.yLineAnnotation.x1 = 0;
            }
            if (this.isVerticalChart()) {
                if (this.xLineAnnotation) {
                    this.xLineAnnotation.y2 = (0, translate_1.translateToNotScaled)(this.parentSurface.seriesViewRect.right);
                    this.xLineAnnotation.x1 = y;
                    this.xLineAnnotation.x2 = y;
                }
                if (this.yLineAnnotation) {
                    this.yLineAnnotation.x2 = (0, translate_1.translateToNotScaled)(this.parentSurface.seriesViewRect.bottom);
                    this.yLineAnnotation.y1 = x;
                    this.yLineAnnotation.y2 = x;
                }
            }
            else {
                if (this.xLineAnnotation) {
                    this.xLineAnnotation.y2 = (0, translate_1.translateToNotScaled)(this.parentSurface.seriesViewRect.bottom);
                    this.xLineAnnotation.x1 = x;
                    this.xLineAnnotation.x2 = x;
                }
                if (this.yLineAnnotation) {
                    this.yLineAnnotation.x2 = (0, translate_1.translateToNotScaled)(this.parentSurface.seriesViewRect.right);
                    this.yLineAnnotation.y1 = y;
                    this.yLineAnnotation.y2 = y;
                }
            }
            if (this.showTooltip) {
                this.tooltipAnnotation.x1 = x;
                this.tooltipAnnotation.y1 = y;
            }
            if (this.showTooltip || this.tooltipLegendTemplate) {
                this.tooltipAnnotation.seriesInfos = this.getSeriesInfos();
            }
        }
    };
    CursorModifier.prototype.newLineAnnotation = function (axisLabelFill, axisLabelStroke) {
        return new LineAnnotation_1.LineAnnotation({
            xCoordinateMode: AnnotationBase_1.ECoordinateMode.Pixel,
            yCoordinateMode: AnnotationBase_1.ECoordinateMode.Pixel,
            strokeThickness: this.crosshairStrokeThickness,
            strokeDashArray: this.crosshairStrokeDashArray,
            stroke: this.crosshairStroke,
            isHidden: true,
            showLabel: this.showAxisLabels,
            axisLabelFill: axisLabelFill,
            axisLabelStroke: axisLabelStroke,
            xAxisId: this.xAxisId,
            yAxisId: this.yAxisId
        });
    };
    /**
     * Test if the series is included or excluded, by default it is included
     * @param series
     * @private
     */
    CursorModifier.prototype.testIsIncludedSeries = function (series) {
        return this.includedSeriesMap.get(series) !== false;
    };
    CursorModifier.prototype.isVerticalChart = function () {
        var _a, _b;
        var xAxis = ((_a = this.parentSurface) === null || _a === void 0 ? void 0 : _a.getXAxisById(this.xAxisId)) || ((_b = this.parentSurface) === null || _b === void 0 ? void 0 : _b.xAxes.get(0));
        if (xAxis) {
            return xAxis.isVerticalChart;
        }
        return false;
    };
    return CursorModifier;
}(ChartModifierBase2D_1.ChartModifierBase2D));
exports.CursorModifier = CursorModifier;
/** @ignore */
var defaultTooltipDataTemplate = function (seriesInfos, tooltipTitle) {
    var valuesWithLabels = [];
    if (tooltipTitle) {
        valuesWithLabels.push(tooltipTitle);
    }
    seriesInfos.forEach(function (si, index) {
        if (si.isHit) {
            if (si.seriesName) {
                valuesWithLabels.push(si.seriesName);
            }
            else if (seriesInfos.length > 1) {
                valuesWithLabels.push("Series #".concat(index + 1));
            }
            if (si.dataSeriesType === IDataSeries_1.EDataSeriesType.Ohlc) {
                var ohlcSeriesInfo = si;
                valuesWithLabels.push("X: ".concat(ohlcSeriesInfo.formattedXValue));
                valuesWithLabels.push("Open: ".concat(ohlcSeriesInfo.formattedOpenValue));
                valuesWithLabels.push("Highest: ".concat(ohlcSeriesInfo.formattedHighValue));
                valuesWithLabels.push("Lowest: ".concat(ohlcSeriesInfo.formattedLowValue));
                valuesWithLabels.push("Close: ".concat(ohlcSeriesInfo.formattedCloseValue));
            }
            else if (si.dataSeriesType === IDataSeries_1.EDataSeriesType.Xyy) {
                // Band Series
                var xyySeriesInfo = si;
                valuesWithLabels.push("X: ".concat(xyySeriesInfo.formattedXValue));
                valuesWithLabels.push("Y: ".concat(xyySeriesInfo.formattedYValue));
                valuesWithLabels.push("Y1: ".concat(xyySeriesInfo.formattedY1Value));
            }
            else if (si.dataSeriesType === IDataSeries_1.EDataSeriesType.Xyz) {
                // Bubble Series
                var xyzSeriesInfo = si;
                valuesWithLabels.push("X: ".concat(xyzSeriesInfo.formattedXValue));
                valuesWithLabels.push("Y: ".concat(xyzSeriesInfo.formattedYValue));
                valuesWithLabels.push("Z: ".concat(xyzSeriesInfo.formattedZValue));
            }
            else if ([IDataSeries_1.EDataSeriesType.HeatmapUniform, IDataSeries_1.EDataSeriesType.HeatmapNonUniform].includes(si.dataSeriesType)) {
                // Heatmap Series
                var heatmapSeriesInfo = si;
                valuesWithLabels.push("X: ".concat(heatmapSeriesInfo.formattedXValue));
                valuesWithLabels.push("Y: ".concat(heatmapSeriesInfo.formattedYValue));
                if (heatmapSeriesInfo.zValue !== null && heatmapSeriesInfo.zValue !== undefined) {
                    valuesWithLabels.push("Z: ".concat(heatmapSeriesInfo.formattedZValue));
                }
            }
            else {
                var xySeriesInfo = si;
                valuesWithLabels.push("X: ".concat(xySeriesInfo.formattedXValue, " Y: ").concat(xySeriesInfo.formattedYValue));
            }
        }
    });
    return valuesWithLabels;
};
/** @ignore */
var defaultTooltipTemplate = function (seriesInfos, svgAnnotation) {
    var _a;
    var id = "id_".concat(Date.now());
    var tooltipDataTemplate = (_a = svgAnnotation.cursorModifier.tooltipDataTemplate) !== null && _a !== void 0 ? _a : defaultTooltipDataTemplate;
    var valuesWithLabels = tooltipDataTemplate(seriesInfos, svgAnnotation.title);
    if (valuesWithLabels.length === 0) {
        return "<svg></svg>";
    }
    // tooltip size
    var _b = (0, exports.calcTooltipSize)(valuesWithLabels, 13), width = _b.width, height = _b.height;
    // adjust position
    (0, exports.adjustTooltipPosition)(width, height, svgAnnotation);
    var valuesBlock = "";
    valuesWithLabels.forEach(function (val, index) {
        valuesBlock += "<tspan x=\"8\" dy=\"1.2em\">".concat(val, "</tspan>");
    });
    var rectHeight = "95%";
    if (svgAnnotation.yCoordShift < 0) {
        // Fix the issue where the rect would be too small if the height was enormous
        var maxHeight = (0, translate_1.translateToNotScaled)(svgAnnotation.parentSurface.seriesViewRect.height) - svgAnnotation.y1;
        if (height > maxHeight) {
            rectHeight = (height - 5).toFixed(0);
        }
    }
    var tooltipFill = svgAnnotation.containerBackground;
    var tooltipStroke = svgAnnotation.textStroke;
    var shadowColor = svgAnnotation.cursorModifier.tooltipShadow;
    var blur = "<feGaussianBlur result=\"blurOut\" in=\"offOut\" stdDeviation=\"3\" />";
    if (shadowColor !== undefined) {
        var shadowRGBA = (0, parseColor_1.parseColorToTArgb)(shadowColor);
        blur = "<feColorMatrix result=\"matrixOut\" in=\"offOut\" type=\"matrix\"\n        values=\"0 0 0 0 ".concat(shadowRGBA.red / 255, "\n                0 0 0 0 ").concat(shadowRGBA.green / 255, "\n                0 0 0 0 ").concat(shadowRGBA.blue / 255, "\n                0 0 0 ").concat(shadowRGBA.opacity / 255, " 0\" />\n        <feGaussianBlur result=\"blurOut\" in=\"matrixOut\" stdDeviation=\"3\" />");
    }
    return "<svg class=\"scichart__cursor-tooltip\" width=\"".concat(width, "\" height=\"").concat(height, "\">\n        <defs>\n            <filter id=\"").concat(id, "\" x=\"0\" y=\"0\" width=\"200%\" height=\"200%\">\n                <feOffset result=\"offOut\" in=\"SourceAlpha\" dx=\"3\" dy=\"3\" />\n                ").concat(blur, "\n                <feBlend in=\"SourceGraphic\" in2=\"blurOut\" mode=\"normal\" />\n            </filter>\n        </defs>\n        <rect rx=\"4\" ry=\"4\" width=\"95%\" height=\"").concat(rectHeight, "\" fill=\"").concat(tooltipFill, "\" filter=\"url(#").concat(id, ")\" />\n        <svg width=\"100%\">\n            <text x=\"8\" y=\"3\" font-size=\"13\" font-family=\"Verdana\" dy=\"0\" fill=\"").concat(tooltipStroke, "\">").concat(valuesBlock, "</text>\n        </svg>\n    </svg>");
};
/** Calculate the width and height of the tooltip based on the content array */
var calcTooltipSize = function (valuesWithLabels, fontSize) {
    if (fontSize === void 0) { fontSize = 13; }
    var textLength = valuesWithLabels.reduce(function (prev, cur) { return (cur.length > prev ? cur.length : prev); }, 0);
    var width = textLength * 8 + 20;
    var height = fontSize * 1.2 * valuesWithLabels.length + 16;
    return { width: width, height: height };
};
exports.calcTooltipSize = calcTooltipSize;
/** Relocate the tooltip so that it is always within the seriesViewRect */
var adjustTooltipPosition = function (width, height, svgAnnotation) {
    var seriesViewRect = svgAnnotation.parentSurface.seriesViewRect;
    var xCoord = svgAnnotation.x1;
    var yCoord = svgAnnotation.y1;
    var xCoordShift = (0, translate_1.translateToNotScaled)(seriesViewRect.width) - xCoord < width ? -width : 5;
    var yCoordShift = (0, translate_1.translateToNotScaled)(seriesViewRect.height) - yCoord < height ? -height : 5;
    svgAnnotation.xCoordShift = xCoordShift;
    svgAnnotation.yCoordShift = yCoordShift;
};
exports.adjustTooltipPosition = adjustTooltipPosition;
