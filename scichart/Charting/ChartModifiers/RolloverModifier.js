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
exports.updateRolloverModifierProps = exports.calcTooltipPositions = exports.calcTooltipProps = exports.RolloverModifier = exports.TOOLTIP_SPACING = void 0;
var classFactory_1 = require("../../Builder/classFactory");
var BaseType_1 = require("../../types/BaseType");
var ChartModifierType_1 = require("../../types/ChartModifierType");
var MousePosition_1 = require("../../types/MousePosition");
var SeriesType_1 = require("../../types/SeriesType");
var tooltip_1 = require("../../utils/tooltip");
var translate_1 = require("../../utils/translate");
var IThemeProvider_1 = require("../Themes/IThemeProvider");
var AnnotationBase_1 = require("../Visuals/Annotations/AnnotationBase");
var LineAnnotation_1 = require("../Visuals/Annotations/LineAnnotation");
var RolloverLegendSvgAnnotation_1 = require("../Visuals/Annotations/RolloverLegendSvgAnnotation");
var RolloverMarkerSvgAnnotation_1 = require("../Visuals/Annotations/RolloverMarkerSvgAnnotation");
var RolloverTooltipSvgAnnotation_1 = require("../Visuals/Annotations/RolloverTooltipSvgAnnotation");
var SciChartSurfaceBase_1 = require("../Visuals/SciChartSurfaceBase");
var DpiHelper_1 = require("../Visuals/TextureManager/DpiHelper");
var ChartModifierBase2D_1 = require("./ChartModifierBase2D");
var constants_1 = require("./constants");
/** @ignore */
exports.TOOLTIP_SPACING = 4;
/**
 * The RolloverModifier provides tooltip and cursor behavior on a 2D {@link SciChartSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the RolloverModifier to a {@link SciChartSurface} and add tooltip behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new RolloverModifier());
 * ```
 */
var RolloverModifier = /** @class */ (function (_super) {
    __extends(RolloverModifier, _super);
    /**
     * Creates an instance of the RolloverModifier
     * @param options Optional parameters {@link IRolloverModifierOptions} used to configure the modifier
     */
    function RolloverModifier(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        _this = _super.call(this, options) || this;
        _this.type = ChartModifierType_1.EChart2DModifierType.Rollover;
        /**
         * Gets or sets the legend X offset
         */
        _this.tooltipLegendOffsetX = 0;
        /**
         * Gets or sets the legend Y offset
         */
        _this.tooltipLegendOffsetY = 0;
        /**
         * Gets or sets the snapToDataPoint flag. If True the {@link RolloverModifier} line snaps to
         * the nearest data-point of the first visible renderable series
         */
        _this.snapToDataPoint = false;
        /**
         * If this is set greater than the default of zero, the toolip will only show values for points in this radius, rather than all points on the vertical line
         */
        _this.hitTestRadius = 0;
        _this.showRolloverLineProperty = true;
        _this.showTooltipProperty = true;
        _this.absoluteXCoord = 0;
        _this.mousePosition = MousePosition_1.EMousePosition.OutOfCanvas;
        _this.allowTooltipOverlappingProperty = false;
        _this.includedSeriesMap = new Map();
        _this.hitTestRenderableSeries = _this.hitTestRenderableSeries.bind(_this);
        _this.placementDivIdProperty = (_a = options === null || options === void 0 ? void 0 : options.placementDivId) !== null && _a !== void 0 ? _a : _this.placementDivIdProperty;
        _this.rolloverLineAnnotation = _this.createLine(options);
        if (options === null || options === void 0 ? void 0 : options.tooltipLegendTemplate) {
            if (typeof options.tooltipLegendTemplate === "string") {
                _this.typeMap.set("tooltipLegendTemplate", options.tooltipLegendTemplate);
                options.tooltipLegendTemplate = (0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.tooltipLegendTemplate);
            }
        }
        _this.tooltipLegendTemplate =
            (_b = options === null || options === void 0 ? void 0 : options.tooltipLegendTemplate) !== null && _b !== void 0 ? _b : _this.tooltipLegendTemplate;
        _this.tooltipLegendOffsetX = (_c = options === null || options === void 0 ? void 0 : options.tooltipLegendOffsetX) !== null && _c !== void 0 ? _c : _this.tooltipLegendOffsetX;
        _this.tooltipLegendOffsetY = (_d = options === null || options === void 0 ? void 0 : options.tooltipLegendOffsetY) !== null && _d !== void 0 ? _d : _this.tooltipLegendOffsetY;
        if (options === null || options === void 0 ? void 0 : options.tooltipDataTemplate) {
            if (typeof options.tooltipDataTemplate === "string") {
                _this.typeMap.set("tooltipDataTemplate", options.tooltipDataTemplate);
                options.tooltipDataTemplate = (0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.tooltipDataTemplate);
            }
        }
        _this.tooltipDataTemplateProperty =
            (_e = options === null || options === void 0 ? void 0 : options.tooltipDataTemplate) !== null && _e !== void 0 ? _e : _this.tooltipDataTemplateProperty;
        _this.showRolloverLineProperty = (_f = options === null || options === void 0 ? void 0 : options.showRolloverLine) !== null && _f !== void 0 ? _f : _this.showRolloverLineProperty;
        _this.showTooltipProperty = (_g = options === null || options === void 0 ? void 0 : options.showTooltip) !== null && _g !== void 0 ? _g : _this.showTooltipProperty;
        _this.legendAnnotation = new RolloverLegendSvgAnnotation_1.RolloverLegendSvgAnnotation({
            tooltipLegendTemplate: _this.tooltipLegendTemplate,
            tooltipLegendOffsetX: _this.tooltipLegendOffsetX,
            tooltipLegendOffsetY: _this.tooltipLegendOffsetY,
            xAxisId: _this.xAxisId,
            yAxisId: _this.yAxisId
        });
        _this.allowTooltipOverlappingProperty = (_h = options === null || options === void 0 ? void 0 : options.allowTooltipOverlapping) !== null && _h !== void 0 ? _h : _this.allowTooltipOverlappingProperty;
        _this.snapToDataPoint = (_j = options === null || options === void 0 ? void 0 : options.snapToDataPoint) !== null && _j !== void 0 ? _j : _this.snapToDataPoint;
        _this.hitTestRadius = (_k = options === null || options === void 0 ? void 0 : options.hitTestRadius) !== null && _k !== void 0 ? _k : _this.hitTestRadius;
        return _this;
    }
    RolloverModifier.prototype.createLine = function (options) {
        var _a, _b, _c;
        return new LineAnnotation_1.LineAnnotation({
            xCoordinateMode: AnnotationBase_1.ECoordinateMode.Pixel,
            yCoordinateMode: AnnotationBase_1.ECoordinateMode.Pixel,
            strokeDashArray: options === null || options === void 0 ? void 0 : options.rolloverLineStrokeDashArray,
            strokeThickness: (_a = options === null || options === void 0 ? void 0 : options.rolloverLineStrokeThickness) !== null && _a !== void 0 ? _a : 2,
            stroke: (_b = options === null || options === void 0 ? void 0 : options.rolloverLineStroke) !== null && _b !== void 0 ? _b : SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.cursorLineBrush,
            xAxisId: this.xAxisId,
            yAxisId: this.yAxisId,
            showLabel: (_c = options === null || options === void 0 ? void 0 : options.showAxisLabel) !== null && _c !== void 0 ? _c : false
        });
    };
    /**
     * @inheritDoc
     */
    RolloverModifier.prototype.applyTheme = function (themeProvider) {
        if (this.parentSurface) {
            var previousThemeProvider = this.parentSurface.previousThemeProvider;
            if (this.rolloverLineAnnotation.stroke === previousThemeProvider.cursorLineBrush) {
                this.rolloverLineAnnotation.stroke = themeProvider.cursorLineBrush;
            }
        }
    };
    Object.defineProperty(RolloverModifier.prototype, "rolloverLineStroke", {
        /** Gets or Sets the color of the vertical rollover line as an html color code */
        get: function () {
            return this.rolloverLineAnnotation.stroke;
        },
        /** Gets or Sets the color of the vertical rollover line as an html color code */
        set: function (rolloverLineStroke) {
            this.rolloverLineAnnotation.stroke = rolloverLineStroke;
            this.notifyPropertyChanged(constants_1.PROPERTY.STROKE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RolloverModifier.prototype, "rolloverLineStrokeThickness", {
        /** Gets or Sets the thickness of the vertical rollover line */
        get: function () {
            return this.rolloverLineAnnotation.strokeThickness;
        },
        /** Gets or Sets the thickness of the vertical rollover line */
        set: function (rolloverLineStrokeThickness) {
            this.rolloverLineAnnotation.strokeThickness = rolloverLineStrokeThickness;
            this.notifyPropertyChanged(constants_1.PROPERTY.STROKE_THICKNESS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RolloverModifier.prototype, "rolloverLineStrokeDashArray", {
        /** Gets or Sets the dash array of the vertical rollover line */
        get: function () {
            return this.rolloverLineAnnotation.strokeDashArray;
        },
        /** Gets or Sets the dash array of the vertical rollover line */
        set: function (rolloverLineStrokeDashArray) {
            this.rolloverLineAnnotation.strokeDashArray = rolloverLineStrokeDashArray;
            this.notifyPropertyChanged(constants_1.PROPERTY.STROKE_DASH_ARRAY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RolloverModifier.prototype, "showRolloverLine", {
        /** Gets or Sets whether to show the vertical rollover line. Default true */
        get: function () {
            return this.showRolloverLineProperty;
        },
        /** Gets or Sets whether to show the vertical rollover line. Default true */
        set: function (showRolloverLine) {
            this.showRolloverLineProperty = showRolloverLine;
            this.notifyPropertyChanged(constants_1.PROPERTY.SHOW_ROLLOVER_LINE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RolloverModifier.prototype, "tooltipDataTemplate", {
        /** Gets or Sets the tooltipDataTemplate, which allows you to customize content for the tooltip */
        get: function () {
            return this.tooltipDataTemplateProperty;
        },
        /** Gets or Sets the tooltipDataTemplate, which allows you to customize content for the tooltip */
        set: function (value) {
            this.tooltipDataTemplateProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.TOOLTIP_DATA_TEMPLATE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RolloverModifier.prototype, "showTooltip", {
        /** Gets or Sets whether to show the tooltip. Default true */
        get: function () {
            return this.showTooltipProperty;
        },
        /** Gets or Sets whether to show the tooltip. Default true */
        set: function (value) {
            this.showTooltipProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.SHOW_TOOLTIP);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RolloverModifier.prototype, "allowTooltipOverlapping", {
        /** Gets or Sets if tooltips for multiple series are allowed to overlap.  Default false  */
        get: function () {
            return this.allowTooltipOverlappingProperty;
        },
        /** Gets or Sets if tooltips for multiple series are allowed to overlap.  Default false  */
        set: function (value) {
            this.allowTooltipOverlappingProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.ALLOW_TOOLTIP_OVERLAPPING);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    RolloverModifier.prototype.onAttach = function () {
        var _this = this;
        _super.prototype.onAttach.call(this);
        this.addLineAnnotationToSurface();
        this.parentSurface.modifierAnnotations.add(this.legendAnnotation);
        this.getIncludedRenderableSeries().forEach(function (rs) { return _this.addSeriesAnnotationsToParentSurface(rs); });
    };
    RolloverModifier.prototype.addLineAnnotationToSurface = function () {
        this.parentSurface.modifierAnnotations.add(this.rolloverLineAnnotation);
    };
    /**
     * @inheritDoc
     */
    RolloverModifier.prototype.onDetach = function () {
        var _this = this;
        _super.prototype.onDetach.call(this);
        this.parentSurface.modifierAnnotations.remove(this.rolloverLineAnnotation, true);
        this.parentSurface.modifierAnnotations.remove(this.legendAnnotation);
        this.getIncludedRenderableSeries().forEach(function (rs) { return _this.removeSeriesAnnotationsFromParentSurface(rs); });
    };
    /**
     * @inheritDoc
     */
    RolloverModifier.prototype.onAttachSeries = function (rs) {
        _super.prototype.onAttachSeries.call(this, rs);
        var index = this.parentSurface.renderableSeries.size() - 1;
        this.addSeriesAnnotationsToParentSurface(rs);
        this.legendAnnotation.seriesInfos = this.getSeriesInfos();
    };
    /**
     * @inheritDoc
     */
    RolloverModifier.prototype.onDetachSeries = function (rs) {
        _super.prototype.onDetachSeries.call(this, rs);
        this.removeSeriesAnnotationsFromParentSurface(rs);
    };
    /**
     * @inheritDoc
     */
    RolloverModifier.prototype.modifierMouseMove = function (args) {
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
    RolloverModifier.prototype.modifierMouseLeave = function (args) {
        _super.prototype.modifierMouseLeave.call(this, args);
        this.mousePosition = MousePosition_1.EMousePosition.OutOfCanvas;
        this.update();
    };
    /**
     * @inheritDoc
     */
    RolloverModifier.prototype.onParentSurfaceRendered = function () {
        this.update();
    };
    /**
     * @inheritDoc
     */
    RolloverModifier.prototype.includeSeries = function (series, isIncluded) {
        var _a;
        var valueChanged = (this.includedSeriesMap.get(series) === undefined && !isIncluded) ||
            (this.includedSeriesMap.get(series) === true && !isIncluded) ||
            (this.includedSeriesMap.get(series) === false && isIncluded);
        if (valueChanged) {
            this.includedSeriesMap.set(series, isIncluded);
            if (this.isAttached) {
                if (isIncluded === true) {
                    this.addSeriesAnnotationsToParentSurface(series);
                }
                if (isIncluded === false) {
                    this.removeSeriesAnnotationsFromParentSurface(series);
                }
                if (this.parentSurface) {
                    this.legendAnnotation.seriesInfos = this.getSeriesInfos();
                }
                (_a = this.parentSurface) === null || _a === void 0 ? void 0 : _a.invalidateElement();
            }
        }
    };
    /**
     * @inheritDoc
     */
    RolloverModifier.prototype.getIncludedRenderableSeries = function () {
        var _this = this;
        var regularSeries = this.parentSurface.renderableSeries
            .asArray()
            .filter(function (rs) {
            return !rs.isStacked &&
                rs.isVisible &&
                rs.rolloverModifierProps.showRollover &&
                _this.testIsIncludedSeries(rs);
        });
        var stackedSeries = this.parentSurface.renderableSeries.asArray().filter(function (rs) { return rs.isStacked; });
        var result = regularSeries;
        stackedSeries.forEach(function (rs) {
            rs.getVisibleSeries().forEach(function (childRs) {
                if (childRs.rolloverModifierProps.showRollover && _this.testIsIncludedSeries(childRs)) {
                    result.push(childRs);
                }
            });
        });
        return result;
    };
    /**
     * Override hitTestRenderableSeries and add a custom logic
     * @param rs
     * @param mousePoint
     */
    RolloverModifier.prototype.hitTestRenderableSeries = function (rs, mousePoint) {
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
    RolloverModifier.prototype.getMousePosition = function () {
        return this.mousePosition;
    };
    /** @inheritDoc */
    RolloverModifier.prototype.toJSON = function () {
        var _a, _b;
        var json = _super.prototype.toJSON.call(this);
        var options = {
            snapToDataPoint: this.snapToDataPoint,
            placementDivId: this.placementDivId,
            hitTestRadius: this.hitTestRadius,
            allowTooltipOverlapping: this.allowTooltipOverlapping,
            rolloverLineStrokeDashArray: this.rolloverLineStrokeDashArray,
            rolloverLineStroke: this.rolloverLineStroke,
            rolloverLineStrokeThickness: this.rolloverLineStrokeThickness,
            showRolloverLine: this.showRolloverLine,
            showTooltip: this.showTooltip,
            showAxisLabel: (_b = (_a = this.rolloverLineAnnotation) === null || _a === void 0 ? void 0 : _a.showLabel) !== null && _b !== void 0 ? _b : false,
            tooltipDataTemplate: this.typeMap.get("tooltipDataTemplate"),
            tooltipLegendOffsetX: this.tooltipLegendOffsetX,
            tooltipLegendOffsetY: this.tooltipLegendOffsetY,
            tooltipLegendTemplate: this.typeMap.get("tooltipLegendTemplate")
        };
        Object.assign(json.options, options);
        return json;
    };
    /**
     * Called internally to adjust the positions of tooltips if there are overlaps, or if it is a vertical chart
     * @param tooltipArray
     * @param allowTooltipOverlapping
     * @param spacing
     * @param seriesViewRect
     * @param pixelRatio
     * @param isVerticalChart
     * @returns TTooltipProps[]
     */
    RolloverModifier.prototype.CalculateTooltipPositions = function (tooltipArray, allowTooltipOverlapping, spacing, seriesViewRect, pixelRatio, isVerticalChart) {
        if (isVerticalChart === void 0) { isVerticalChart = false; }
        return (0, exports.calcTooltipPositions)(tooltipArray, allowTooltipOverlapping, spacing, seriesViewRect, pixelRatio, isVerticalChart);
    };
    /** @inheritDoc */
    RolloverModifier.prototype.notifyPropertyChanged = function (propertyName) {
        _super.prototype.notifyPropertyChanged.call(this, propertyName);
        if (propertyName === constants_1.PROPERTY.X_AXIS_ID) {
            this.rolloverLineAnnotation.xAxisId = this.xAxisId;
            this.legendAnnotation.xAxisId = this.xAxisId;
        }
        if (propertyName === constants_1.PROPERTY.Y_AXIS_ID) {
            this.rolloverLineAnnotation.yAxisId = this.yAxisId;
            this.legendAnnotation.yAxisId = this.yAxisId;
        }
    };
    RolloverModifier.prototype.isVerticalChart = function () {
        var _a, _b;
        var xAxis = ((_a = this.parentSurface) === null || _a === void 0 ? void 0 : _a.getXAxisById(this.xAxisId)) || ((_b = this.parentSurface) === null || _b === void 0 ? void 0 : _b.xAxes.get(0));
        if (xAxis) {
            return xAxis.isVerticalChart;
        }
        return false;
    };
    RolloverModifier.prototype.removeSeriesAnnotationsFromParentSurface = function (rs) {
        var _this = this;
        if (!this.parentSurface)
            return;
        if (rs.isStacked) {
            var stackedSeries = rs;
            stackedSeries.asArray().forEach(function (childRs) {
                _this.parentSurface.modifierAnnotations.remove(_this.getRolloverProps(childRs).marker);
                _this.parentSurface.modifierAnnotations.remove(_this.getRolloverProps(childRs).tooltip);
                _this.getRolloverProps(childRs).delete();
            });
        }
        else {
            this.parentSurface.modifierAnnotations.remove(this.getRolloverProps(rs).marker);
            this.parentSurface.modifierAnnotations.remove(this.getRolloverProps(rs).tooltip);
            this.getRolloverProps(rs).delete();
            if (rs.type === SeriesType_1.ESeriesType.BandSeries) {
                this.parentSurface.modifierAnnotations.remove(this.getRolloverProps1(rs).marker);
                this.parentSurface.modifierAnnotations.remove(this.getRolloverProps1(rs).tooltip);
                this.getRolloverProps1(rs).delete();
            }
        }
    };
    /**
     * @param rs
     */
    RolloverModifier.prototype.addSeriesAnnotationsToParentSurface = function (rs) {
        if (!this.parentSurface ||
            rs.type === SeriesType_1.ESeriesType.StackedMountainCollection ||
            rs.type === SeriesType_1.ESeriesType.StackedColumnCollection) {
            return;
        }
        this.getRolloverProps(rs).rolloverModifier = this;
        createAnnotations(rs, this.getRolloverProps(rs), this.getRolloverProps1(rs), this.placementDivIdProperty);
        var marker = this.getRolloverProps(rs).marker;
        if (!this.parentSurface.modifierAnnotations.contains(marker)) {
            this.parentSurface.modifierAnnotations.add(this.getRolloverProps(rs).marker);
            this.parentSurface.modifierAnnotations.add(this.getRolloverProps(rs).tooltip);
            if (rs.type === SeriesType_1.ESeriesType.BandSeries) {
                this.getRolloverProps1(rs).rolloverModifier = this;
                this.parentSurface.modifierAnnotations.add(this.getRolloverProps1(rs).marker);
                this.parentSurface.modifierAnnotations.add(this.getRolloverProps1(rs).tooltip);
            }
        }
    };
    RolloverModifier.prototype.getRolloverProps = function (rs) {
        return rs.rolloverModifierProps;
    };
    RolloverModifier.prototype.getRolloverProps1 = function (rs) {
        return rs.rolloverModifierProps1;
    };
    RolloverModifier.prototype.update = function () {
        this.updateLine();
        this.updateSeriesAnnotations();
        if (this.tooltipLegendTemplate) {
            this.legendAnnotation.seriesInfos = this.getSeriesInfos();
        }
    };
    RolloverModifier.prototype.updateLine = function () {
        if (this.mousePosition !== MousePosition_1.EMousePosition.SeriesArea) {
            this.rolloverLineAnnotation.isHidden = true;
            return;
        }
        if (!this.showRolloverLineProperty) {
            this.rolloverLineAnnotation.isHidden = true;
            return;
        }
        if (this.snapToDataPoint) {
            var firstSeries = this.getIncludedRenderableSeries()[0];
            if (firstSeries) {
                var hitTestInfo = this.hitTestRenderableSeries(firstSeries, this.mousePoint);
                if (hitTestInfo && hitTestInfo.isWithinDataBounds) {
                    this.rolloverLineAnnotation.isHidden = false;
                    var x = (0, translate_1.translateToNotScaled)(hitTestInfo.xCoord);
                    this.rolloverLineAnnotation.x1 = x;
                    this.rolloverLineAnnotation.x2 = x;
                    this.rolloverLineAnnotation.y1 = 0;
                    this.rolloverLineAnnotation.y2 = this.isVerticalChart()
                        ? (0, translate_1.translateToNotScaled)(this.parentSurface.seriesViewRect.right)
                        : (0, translate_1.translateToNotScaled)(this.parentSurface.seriesViewRect.bottom);
                }
                else {
                    this.rolloverLineAnnotation.isHidden = true;
                }
            }
            else {
                this.rolloverLineAnnotation.isHidden = true;
            }
        }
        else {
            this.rolloverLineAnnotation.isHidden = false;
            var translatedMousePoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(this.mousePoint, this.parentSurface.seriesViewRect);
            if (translatedMousePoint) {
                var x = (0, translate_1.translateToNotScaled)(translatedMousePoint.x);
                var y = (0, translate_1.translateToNotScaled)(translatedMousePoint.y);
                if (this.isVerticalChart()) {
                    this.rolloverLineAnnotation.x1 = y;
                    this.rolloverLineAnnotation.x2 = y;
                    this.rolloverLineAnnotation.y1 = 0;
                    this.rolloverLineAnnotation.y2 = (0, translate_1.translateToNotScaled)(this.parentSurface.seriesViewRect.right);
                }
                else {
                    this.rolloverLineAnnotation.x1 = x;
                    this.rolloverLineAnnotation.x2 = x;
                    this.rolloverLineAnnotation.y1 = 0;
                    this.rolloverLineAnnotation.y2 = (0, translate_1.translateToNotScaled)(this.parentSurface.seriesViewRect.bottom);
                }
            }
        }
    };
    /**
     * @description Update Markers and Tooltips
     */
    RolloverModifier.prototype.updateSeriesAnnotations = function () {
        var _this = this;
        var rsList = this.getIncludedRenderableSeries();
        rsList.forEach(function (rs) {
            var props = _this.getRolloverProps(rs);
            if (!props.marker) {
                _this.addSeriesAnnotationsToParentSurface(rs);
            }
            props.marker.suspendInvalidate();
            props.tooltip.suspendInvalidate();
            props.marker.isHidden = true;
            props.tooltip.isHidden = true;
            props.tooltip.x1 = undefined;
            props.tooltip.y1 = undefined;
            // TODO should be more general than looking at series type
            if (rs.type === SeriesType_1.ESeriesType.BandSeries) {
                props.marker.suspendInvalidate();
                props.tooltip.suspendInvalidate();
                props.marker.isHidden = true;
                props.tooltip.isHidden = true;
                props.tooltip.x1 = undefined;
                props.tooltip.y1 = undefined;
            }
        });
        if (this.mousePosition !== MousePosition_1.EMousePosition.SeriesArea) {
            rsList.forEach(function (rs) {
                var props = _this.getRolloverProps(rs);
                props.marker.resumeInvalidate();
                props.tooltip.resumeInvalidate();
                if (rs.type === SeriesType_1.ESeriesType.BandSeries) {
                    // leave for now
                    _this.getRolloverProps1(rs).marker.resumeInvalidate();
                    _this.getRolloverProps1(rs).tooltip.resumeInvalidate();
                }
            });
            return;
        }
        var tooltipArray = [];
        var height = this.isVerticalChart()
            ? this.parentSurface.seriesViewRect.width
            : this.parentSurface.seriesViewRect.height;
        rsList.forEach(function (rs, index) {
            var hitTestInfo = _this.hitTestRenderableSeries(rs, _this.mousePoint);
            if (hitTestInfo) {
                if ((rs.type !== SeriesType_1.ESeriesType.StackedColumnSeries && _this.hitTestRadius === 0) || hitTestInfo.isHit) {
                    var isVisible = 0 <= hitTestInfo.yCoord && hitTestInfo.yCoord <= height;
                    if (isVisible) {
                        _this.absoluteXCoord = _this.isVerticalChart() ? hitTestInfo.yCoord : hitTestInfo.xCoord;
                        var absoluteYCoord = _this.isVerticalChart() ? hitTestInfo.xCoord : hitTestInfo.yCoord;
                        var tooltipProps = (0, exports.calcTooltipProps)(index, rs, _this.getRolloverProps(rs), _this.parentSurface.seriesViewRect, hitTestInfo.xValue, hitTestInfo.yValue, _this.absoluteXCoord, absoluteYCoord, hitTestInfo, DpiHelper_1.DpiHelper.PIXEL_RATIO, false, _this.isVerticalChart());
                        if (tooltipProps)
                            tooltipArray.push(tooltipProps);
                    }
                }
                if (rs.type === SeriesType_1.ESeriesType.BandSeries) {
                    var isVisibleY1 = 0 <= hitTestInfo.y1Coord && hitTestInfo.y1Coord <= height;
                    if (isVisibleY1) {
                        var absoluteXCoord = _this.isVerticalChart() ? hitTestInfo.y1Coord : hitTestInfo.xCoord;
                        var absoluteYCoord = _this.isVerticalChart() ? hitTestInfo.xCoord : hitTestInfo.y1Coord;
                        var tooltipY1Props = (0, exports.calcTooltipProps)(index, rs, _this.getRolloverProps1(rs), _this.parentSurface.seriesViewRect, hitTestInfo.xValue, hitTestInfo.y1Value, absoluteXCoord, absoluteYCoord, hitTestInfo, DpiHelper_1.DpiHelper.PIXEL_RATIO, true, _this.isVerticalChart());
                        if (tooltipY1Props)
                            tooltipArray.push(tooltipY1Props);
                    }
                }
            }
        });
        var orderedTooltipArray;
        if (this.isVerticalChart()) {
            orderedTooltipArray = tooltipArray.sort(function (a, b) { return (a.xCoord > b.xCoord ? 1 : b.xCoord > a.xCoord ? -1 : 0); });
        }
        else {
            orderedTooltipArray = tooltipArray.sort(function (a, b) { return (a.yCoord > b.yCoord ? 1 : b.yCoord > a.yCoord ? -1 : 0); });
        }
        var tooltipPositions = this.CalculateTooltipPositions(orderedTooltipArray, this.allowTooltipOverlapping, exports.TOOLTIP_SPACING * DpiHelper_1.DpiHelper.PIXEL_RATIO, this.parentSurface.seriesViewRect, DpiHelper_1.DpiHelper.PIXEL_RATIO, this.isVerticalChart());
        tooltipPositions.forEach(function (el) {
            var rs = rsList[el.index];
            var showTooltip = _this.showTooltip && el.seriesInfo.isHit;
            var showMarker = el.seriesInfo.isHit;
            if (el.isY1) {
                (0, exports.updateRolloverModifierProps)(_this.getRolloverProps1(rs), rs, el, showTooltip, showMarker, _this.placementDivId);
            }
            else {
                (0, exports.updateRolloverModifierProps)(_this.getRolloverProps(rs), rs, el, showTooltip, showMarker, _this.placementDivId);
            }
        });
        rsList.forEach(function (rs) {
            _this.getRolloverProps(rs).marker.resumeInvalidate();
            _this.getRolloverProps(rs).tooltip.resumeInvalidate();
            if (rs.type === SeriesType_1.ESeriesType.BandSeries) {
                _this.getRolloverProps1(rs).marker.resumeInvalidate();
                _this.getRolloverProps1(rs).tooltip.resumeInvalidate();
            }
        });
    };
    /**
     * Test if the series is included or excluded, by default it is included
     * @param series
     * @private
     */
    RolloverModifier.prototype.testIsIncludedSeries = function (series) {
        return this.includedSeriesMap.get(series) !== false;
    };
    RolloverModifier.prototype.getSeriesInfos = function () {
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
    Object.defineProperty(RolloverModifier.prototype, "placementDivId", {
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
            var _this = this;
            var _a;
            if (this.placementDivIdProperty !== value) {
                this.placementDivIdProperty = value;
                (_a = this.parentSurface) === null || _a === void 0 ? void 0 : _a.renderableSeries.asArray().forEach(function (rs) {
                    _this.getRolloverProps(rs).tooltip.placementDivId = _this.placementDivIdProperty;
                    _this.getRolloverProps1(rs).tooltip.placementDivId = _this.placementDivIdProperty;
                });
            }
        },
        enumerable: false,
        configurable: true
    });
    return RolloverModifier;
}(ChartModifierBase2D_1.ChartModifierBase2D));
exports.RolloverModifier = RolloverModifier;
/**
 * @ignore
 * @description Used internally, calculates tooltip props
 * @param index
 * @param rs
 * @param rolloverProps
 * @param seriesViewRect
 * @param xValue
 * @param yValue
 * @param absoluteXCoord
 * @param absoluteYCoord
 * @param hitTestInfo
 * @param pixelRatio
 * @param isY1
 */
var calcTooltipProps = function (index, rs, rolloverProps, seriesViewRect, xValue, yValue, absoluteXCoord, absoluteYCoord, hitTestInfo, pixelRatio, isY1, isVerticalChart) {
    if (isY1 === void 0) { isY1 = false; }
    if (isVerticalChart === void 0) { isVerticalChart = false; }
    // This check is done in calling code
    // const visibleRange = rs.yAxis.visibleRange;
    // const isVisible = visibleRange.min <= yValue && yValue <= visibleRange.max);
    // if (isVisible) {
    var seriesInfo = rs.getSeriesInfo(hitTestInfo);
    var width = rolloverProps.tooltip.width;
    var scaledWidth = width * pixelRatio;
    var height = rolloverProps.tooltip.height;
    var scaledHeight = height * pixelRatio;
    var distTop = absoluteYCoord;
    var distBottom = seriesViewRect.height - absoluteYCoord;
    var defaultVerticalShift = 5 * pixelRatio;
    var xCoordShift = seriesViewRect.width - absoluteXCoord < scaledWidth ? -width : 5;
    var yCoordShift = isVerticalChart ? defaultVerticalShift : -height / 2;
    if (isVerticalChart) {
        if (distBottom < scaledHeight + defaultVerticalShift) {
            yCoordShift = ((scaledHeight + defaultVerticalShift) / pixelRatio) * -1;
        }
    }
    else {
        if (distTop < scaledHeight / 2) {
            yCoordShift = -distTop / pixelRatio;
        }
        else if (distBottom < scaledHeight / 2) {
            yCoordShift = -(scaledHeight - distBottom) / pixelRatio;
        }
    }
    var newRecord = {
        index: index,
        isY1: isY1,
        xValue: xValue,
        yValue: yValue,
        xCoord: absoluteXCoord,
        yCoord: absoluteYCoord,
        hitTestPointValues: hitTestInfo.hitTestPointValues,
        isCategoryAxis: hitTestInfo.isCategoryAxis,
        xCoordShift: xCoordShift,
        yCoordShift: yCoordShift,
        height: scaledHeight,
        width: scaledWidth,
        seriesInfo: seriesInfo
    };
    return newRecord;
    // }
    // return undefined;
};
exports.calcTooltipProps = calcTooltipProps;
/**
 * @ignore
 * @description Used internally, calculates tooltip positions to avoid overlapping
 * @param tooltipArray
 * @param allowTooltipOverlapping
 * @param spacing
 * @param seriesViewRect
 * @param pixelRatio
 * @param isVerticalChart
 */
var calcTooltipPositions = function (tooltipArray, allowTooltipOverlapping, spacing, seriesViewRect, pixelRatio, isVerticalChart) {
    if (isVerticalChart === void 0) { isVerticalChart = false; }
    var positionProperties = (0, tooltip_1.getTooltipPositionProperties)(isVerticalChart);
    // centering for vertical charts
    if (isVerticalChart) {
        tooltipArray.forEach(function (tooltip) {
            var halfWidth = tooltip.width / 2 / pixelRatio;
            if (tooltip.xCoord > halfWidth) {
                tooltip[positionProperties.shiftPropertyName] = -(tooltip.width / 2) / pixelRatio;
            }
        });
    }
    var hasOverlap = (0, tooltip_1.checkHasOverlap)(tooltipArray, spacing, pixelRatio, positionProperties);
    var length = tooltipArray.length;
    if (!allowTooltipOverlapping && length >= 2 && hasOverlap) {
        var spreadMap_1 = (0, tooltip_1.spreadTooltips)(tooltipArray, pixelRatio, positionProperties, spacing, seriesViewRect);
        tooltipArray.forEach(function (tooltip) {
            tooltip[positionProperties.shiftPropertyName] = spreadMap_1.get(tooltip.index);
        });
    }
    return tooltipArray;
};
exports.calcTooltipPositions = calcTooltipPositions;
/**
 * @ignore
 * @description Creates MarkerAnnotation and TooltipAnnotation and assigns to rolloverSeries properties
 * @param rs RenderableSeries
 */
var createAnnotations = function (rs, rolloverModifierProps, rolloverModifierProps1, placementDivId) {
    var _a, _b, _c, _d;
    if (!rolloverModifierProps.marker) {
        rolloverModifierProps.marker = new RolloverMarkerSvgAnnotation_1.RolloverMarkerSvgAnnotation(rolloverModifierProps);
        rolloverModifierProps.marker.xAxisId = rs.xAxisId;
        rolloverModifierProps.marker.yAxisId = rs.yAxisId;
    }
    if (!rolloverModifierProps.tooltip) {
        rolloverModifierProps.tooltipTitle = (_b = (_a = rolloverModifierProps.tooltipTitle) !== null && _a !== void 0 ? _a : rs.getDataSeriesName()) !== null && _b !== void 0 ? _b : "";
        rolloverModifierProps.tooltipColor = rolloverModifierProps.tooltipColor;
        rolloverModifierProps.shadowColor = rs.parentSurface.themeProvider.shadowEffectColor;
        rolloverModifierProps.tooltip = new RolloverTooltipSvgAnnotation_1.RolloverTooltipSvgAnnotation(rolloverModifierProps, {
            seriesType: rs.type,
            placementDivId: placementDivId
        });
        rolloverModifierProps.tooltip.xAxisId = rs.xAxisId;
        rolloverModifierProps.tooltip.yAxisId = rs.yAxisId;
    }
    if (rs.type === SeriesType_1.ESeriesType.BandSeries) {
        var bandRs = rs;
        if (!rolloverModifierProps1.marker) {
            rolloverModifierProps1.marker = new RolloverMarkerSvgAnnotation_1.RolloverMarkerSvgAnnotation(rolloverModifierProps1);
            rolloverModifierProps1.marker.xAxisId = bandRs.xAxisId;
            rolloverModifierProps1.marker.yAxisId = bandRs.yAxisId;
        }
        if (!rolloverModifierProps1.tooltip) {
            rolloverModifierProps1.tooltipTitle =
                (_d = (_c = rolloverModifierProps1.tooltipTitle) !== null && _c !== void 0 ? _c : bandRs.getDataSeriesName()) !== null && _d !== void 0 ? _d : "";
            rolloverModifierProps1.tooltipColor = rolloverModifierProps1.tooltipColor;
            rolloverModifierProps1.tooltip = new RolloverTooltipSvgAnnotation_1.RolloverTooltipSvgAnnotation(rolloverModifierProps1, {
                placementDivId: placementDivId
            });
            rolloverModifierProps1.tooltip.xAxisId = bandRs.xAxisId;
            rolloverModifierProps1.tooltip.yAxisId = bandRs.yAxisId;
        }
    }
};
/** @ignore */
var updateRolloverModifierProps = function (rolloverRSProps, rs, tooltipProps, showTooltip, showMarker, placementDivId) {
    rolloverRSProps.tooltip.seriesInfo = tooltipProps.seriesInfo;
    if (tooltipProps.isY1) {
        rolloverRSProps.tooltip.seriesInfo.isFirstSeries = false;
    }
    if (showMarker) {
        rolloverRSProps.marker.isHidden = false;
        rolloverRSProps.marker.x1 = tooltipProps.xValue;
        rolloverRSProps.marker.y1 = tooltipProps.yValue;
        if (rolloverRSProps.markerColor.startsWith(IThemeProvider_1.AUTO_COLOR)) {
            rolloverRSProps.markerColor = tooltipProps.isY1 ? rs.strokeY1 : rs.stroke;
        }
    }
    // Update tooltips
    if (showTooltip) {
        rolloverRSProps.tooltip.isHidden = false;
        rolloverRSProps.tooltip.x1 = tooltipProps.xValue;
        rolloverRSProps.tooltip.y1 = tooltipProps.yValue;
        rolloverRSProps.tooltip.xCoordShift = tooltipProps.xCoordShift;
        rolloverRSProps.tooltip.yCoordShift = tooltipProps.yCoordShift;
        if (rolloverRSProps.tooltipColor.startsWith(IThemeProvider_1.AUTO_COLOR)) {
            rolloverRSProps.tooltipColor = tooltipProps.isY1 ? rs.strokeY1 : rs.stroke;
        }
    }
    else {
        if (placementDivId) {
            rolloverRSProps.tooltip.delete();
        }
    }
};
exports.updateRolloverModifierProps = updateRolloverModifierProps;
