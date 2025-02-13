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
exports.LineAnnotation = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var Guard_1 = require("../../../Core/Guard");
var Point_1 = require("../../../Core/Point");
var LabelPlacement_1 = require("../../../types/LabelPlacement");
var XyDirection_1 = require("../../../types/XyDirection");
var pointUtil_1 = require("../../../utils/pointUtil");
var Pen2DCache_1 = require("../../Drawing/Pen2DCache");
var drawLabel_1 = require("../Helpers/drawLabel");
var DpiHelper_1 = require("../TextureManager/DpiHelper");
var AnnotationBase_1 = require("./AnnotationBase");
var annotationHelpers_1 = require("./annotationHelpers");
var constants_1 = require("./constants");
var IAnnotation_1 = require("./IAnnotation");
var RenderContextAnnotationBase_1 = require("./RenderContextAnnotationBase");
/**
 * @summary The {@link LineAnnotation} provides an {@link AnnotationBase | Annotation} which draws a line at
 * specific x1x2 y1y2 over the {@link SciChartSurface}
 * @description
 * To add a {@link LineAnnotation} to a {@link SciChartSurface}, use the following code:
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const lineAnnotation = new LineAnnotation( { x1: 1, x2: 2, y1: 3, y2: 4, fill: "#FF000077", stroke: "#FF0000"});
 * sciChartSurface.annotations.add(lineAnnotation);
 * ```
 * @remarks Uses the fast WebGL/WebAssembly {@link WebGL2RenderingContext} for rendering
 */
var LineAnnotation = /** @class */ (function (_super) {
    __extends(LineAnnotation, _super);
    /**
     * Create an instance of a LineAnnotation
     * @param options Optional parameters of type {@link ILineAnnotationOptions} which configure the annotation upon construction
     */
    function LineAnnotation(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.type = IAnnotation_1.EAnnotationType.RenderContextLineAnnotation;
        _this.axisFontSizeProperty = 14;
        _this.axisFontFamilyProperty = "Arial";
        _this.strokeThicknessProperty = 1;
        _this.strokeDashArrayProperty = [];
        _this.strokeProperty = "#FFFFFF";
        _this.showLabelProperty = false;
        _this.axisLabelStrokeProperty = "#ffffff";
        _this.axisLabelFillProperty = "#b36200";
        _this.labelPlacementProperty = LabelPlacement_1.ELabelPlacement.Auto;
        _this.labelValueProperty = "";
        _this.stroke = (_a = options === null || options === void 0 ? void 0 : options.stroke) !== null && _a !== void 0 ? _a : _this.strokeProperty;
        _this.strokeThickness = (_b = options === null || options === void 0 ? void 0 : options.strokeThickness) !== null && _b !== void 0 ? _b : _this.strokeThicknessProperty;
        _this.strokeDashArray = (_c = options === null || options === void 0 ? void 0 : options.strokeDashArray) !== null && _c !== void 0 ? _c : _this.strokeDashArrayProperty;
        _this.showLabelProperty = (_d = options === null || options === void 0 ? void 0 : options.showLabel) !== null && _d !== void 0 ? _d : _this.showLabelProperty;
        _this.axisLabelStrokeProperty = (_e = options === null || options === void 0 ? void 0 : options.axisLabelStroke) !== null && _e !== void 0 ? _e : _this.axisLabelStrokeProperty;
        _this.axisLabelFillProperty = (_f = options === null || options === void 0 ? void 0 : options.axisLabelFill) !== null && _f !== void 0 ? _f : _this.axisLabelFillProperty;
        _this.axisFontSizeProperty = (_g = options === null || options === void 0 ? void 0 : options.axisFontSize) !== null && _g !== void 0 ? _g : _this.axisFontSizeProperty;
        _this.axisFontFamilyProperty = (_h = options === null || options === void 0 ? void 0 : options.axisFontFamily) !== null && _h !== void 0 ? _h : _this.axisFontFamilyProperty;
        _this.labelPlacementProperty = (_j = options === null || options === void 0 ? void 0 : options.labelPlacement) !== null && _j !== void 0 ? _j : _this.labelPlacementProperty;
        _this.labelValueProperty = (_k = options === null || options === void 0 ? void 0 : options.labelValue) !== null && _k !== void 0 ? _k : _this.labelValueProperty;
        return _this;
    }
    Object.defineProperty(LineAnnotation.prototype, "stroke", {
        /**
         * Gets the stroke for the {@link LineAnnotation}
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        get: function () {
            return this.strokeProperty;
        },
        /**
         * Sets the stroke for the {@link LineAnnotation}
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        set: function (htmlColorCode) {
            this.strokeProperty = htmlColorCode;
            this.notifyPropertyChanged(constants_1.PROPERTY.STROKE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LineAnnotation.prototype, "strokeThickness", {
        /**
         * Gets the strokeThickness for the {@link LineAnnotation}
         */
        get: function () {
            return this.strokeThicknessProperty;
        },
        /**
         * Sets the strokeThickness for the {@link LineAnnotation}
         */
        set: function (value) {
            this.strokeThicknessProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.STROKE_THICKNESS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LineAnnotation.prototype, "strokeDashArray", {
        /**
         * Gets the strokeDashArray for the {@link LineAnnotation}
         */
        get: function () {
            return this.strokeDashArrayProperty;
        },
        /**
         * Sets the strokeDashArray for the {@link LineAnnotation}
         */
        set: function (value) {
            this.strokeDashArrayProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.STROKE_DASH_ARRAY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LineAnnotation.prototype, "showLabel", {
        /**
         * Gets the showLabel for the {@link LineAnnotation}
         */
        get: function () {
            return this.showLabelProperty;
        },
        /**
         * Sets the showLabel for the {@link LineAnnotation}
         */
        set: function (value) {
            this.showLabelProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.SHOW_LABEL);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LineAnnotation.prototype, "axisLabelStroke", {
        /**
         * Gets the axisLabelStroke for the {@link LineAnnotation}
         */
        get: function () {
            return this.axisLabelStrokeProperty;
        },
        /**
         * Sets the axisLabelStroke for the {@link LineAnnotation}
         */
        set: function (value) {
            this.axisLabelStrokeProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.AXIS_LABELS_STROKE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LineAnnotation.prototype, "axisLabelFill", {
        /**
         * Gets the axisLabelFill for the {@link LineAnnotation}
         */
        get: function () {
            return this.axisLabelFillProperty;
        },
        /**
         * Sets the axisLabelFill for the {@link LineAnnotation}
         */
        set: function (value) {
            this.axisLabelFillProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.AXIS_LABELS_FILL);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LineAnnotation.prototype, "axisFontSize", {
        /**
         * Gets the axisFontSize for the {@link LineAnnotation}
         */
        get: function () {
            return this.axisFontSizeProperty;
        },
        /**
         * Sets the axisFontSize for the {@link LineAnnotation}
         */
        set: function (value) {
            this.axisFontSizeProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.AXIS_FONT_SIZE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LineAnnotation.prototype, "axisFontFamily", {
        /**
         * Gets the axisFontSize for the {@link LineAnnotation}
         */
        get: function () {
            return this.axisFontFamilyProperty;
        },
        /**
         * Sets the axisFontSize for the {@link LineAnnotation}
         */
        set: function (value) {
            this.axisFontFamilyProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.AXIS_FONT_FAMILY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LineAnnotation.prototype, "labelPlacement", {
        /**
         * Gets the labelPlacement for the {@link LineAnnotation}
         */
        get: function () {
            return this.labelPlacementProperty;
        },
        /**
         * Sets the labelPlacement for the {@link LineAnnotation}
         */
        set: function (value) {
            this.labelPlacementProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.LABEL_PLACEMENT);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LineAnnotation.prototype, "labelValue", {
        /**
         * Gets the labelValue for the {@link LineAnnotation}
         */
        get: function () {
            return this.labelValueProperty;
        },
        /**
         * Sets the labelValue for the {@link LineAnnotation}
         */
        set: function (value) {
            this.labelValueProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.LABEL_VALUE);
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    LineAnnotation.prototype.delete = function () {
        this.strokePenCache = (0, Deleter_1.deleteSafe)(this.strokePenCache);
    };
    /** @inheritDoc */
    LineAnnotation.prototype.onAttach = function (scs) {
        _super.prototype.onAttach.call(this, scs);
        if (!this.strokePenCache) {
            this.strokePenCache = new Pen2DCache_1.Pen2DCache(scs.webAssemblyContext2D);
        }
        (0, Pen2DCache_1.createPenInCache)(this.strokePenCache, this.stroke, this.strokeThickness, this.opacity, this.strokeDashArray);
    };
    /** @inheritDoc */
    LineAnnotation.prototype.drawWithContext = function (renderContext, xCalc, yCalc, viewRect) {
        var _this = this;
        Guard_1.Guard.notNull(renderContext, "renderContext");
        Guard_1.Guard.notNull(xCalc, "xCalc");
        Guard_1.Guard.notNull(yCalc, "yCalc");
        var strokePen = this.stroke && this.strokeThickness ? (0, Pen2DCache_1.getWebGlPenFromCache)(this.strokePenCache) : undefined;
        var borderX1 = this.getX1Coordinate(xCalc, yCalc);
        var borderX2 = this.getX2Coordinate(xCalc, yCalc);
        var borderY1 = this.getY1Coordinate(xCalc, yCalc);
        var borderY2 = this.getY2Coordinate(xCalc, yCalc);
        this.setAnnotationBorders(borderX1, borderX2, borderY1, borderY2);
        if (strokePen) {
            renderContext.drawLine(borderX1, borderY1, borderX2, borderY2, strokePen, viewRect);
        }
        // This code is a bit silly, but I'm leaving it just in case anyone is currently relying on it.
        // It will get sorted in the big annotation refactor
        if (this.showLabel) {
            var axes = [];
            var verticalAxes = [];
            var coord_1;
            // Axis labels are shown only for lines perpendicular to axis
            if (borderX1 === borderX2) {
                axes = this.parentSurface.xAxes.asArray().filter(function (el) { return !el.isVerticalChart; });
                verticalAxes = this.parentSurface.yAxes.asArray().filter(function (el) { return el.isVerticalChart; });
                coord_1 = borderX1;
            }
            else if (borderY1 === borderY2) {
                axes = this.parentSurface.yAxes.asArray().filter(function (el) { return !el.isVerticalChart; });
                verticalAxes = this.parentSurface.xAxes.asArray().filter(function (el) { return el.isVerticalChart; });
                coord_1 = borderY1;
            }
            if (axes.length > 0 || verticalAxes.length > 0)
                axes.forEach(function (el) {
                    if (!el.isStackedAxis || (el.offset < coord_1 && el.offset + el.getAxisSize() > coord_1)) {
                        (0, drawLabel_1.drawModifiersAxisLabel)(el, renderContext, coord_1, _this.axisLabelFill, _this.axisLabelStroke);
                    }
                });
            __spreadArray(__spreadArray([], axes, true), verticalAxes, true);
        }
        this.updateAdornerInner();
    };
    LineAnnotation.prototype.onDragStarted = function (args) {
        _super.prototype.onDragStarted.call(this, args);
        var x1 = this.x1;
        var x2 = this.type === IAnnotation_1.EAnnotationType.RenderContextHorizontalLineAnnotation ||
            this.type === IAnnotation_1.EAnnotationType.RenderContextVerticalLineAnnotation
            ? this.x1
            : this.x2;
        var y1 = this.y1;
        var y2 = this.type === IAnnotation_1.EAnnotationType.RenderContextHorizontalLineAnnotation ||
            this.type === IAnnotation_1.EAnnotationType.RenderContextVerticalLineAnnotation
            ? this.y1
            : this.y2;
        var xyCoord1 = this.getXYCoordinatesFromValues(new Point_1.Point(x1, y1));
        var xyCoord2 = this.getXYCoordinatesFromValues(new Point_1.Point(x2, y2));
        var xyCoordBody = new Point_1.Point(args.mousePoint.x, args.mousePoint.y);
        if (xyCoord1 && this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x1y1)) {
            var dist = (0, pointUtil_1.calcDistance)(xyCoord1.x, xyCoord1.y, args.mousePoint.x, args.mousePoint.y);
            if (dist < this.annotationsGripsRadius * DpiHelper_1.DpiHelper.PIXEL_RATIO) {
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.x1y1;
                return true;
            }
        }
        if (xyCoord2 && this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x2y2)) {
            var dist = (0, pointUtil_1.calcDistance)(xyCoord2.x, xyCoord2.y, args.mousePoint.x, args.mousePoint.y);
            if (dist < this.annotationsGripsRadius * DpiHelper_1.DpiHelper.PIXEL_RATIO) {
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.x2y2;
                return true;
            }
        }
        if (xyCoordBody && this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.Body)) {
            if (this.clickToSelect(args)) {
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.Body;
                return true;
            }
        }
        return false;
    };
    LineAnnotation.prototype.calcDragDistance = function (xyValues) {
        if (!this.prevValue) {
            this.prevValue = xyValues;
            return;
        }
        var isVerticalChart = this.parentSurface.getYAxisById(this.yAxisId).isVerticalChart;
        if (this.adornerDraggingPoint === AnnotationBase_1.EDraggingGripPoint.Body) {
            if (this.type === IAnnotation_1.EAnnotationType.RenderContextHorizontalLineAnnotation) {
                if (isVerticalChart) {
                    this.x1 = this.x1 - (this.prevValue.x - xyValues.x);
                }
                else {
                    this.y1 = this.y1 - (this.prevValue.y - xyValues.y);
                }
            }
            else if (this.type === IAnnotation_1.EAnnotationType.RenderContextVerticalLineAnnotation) {
                if (isVerticalChart) {
                    this.y1 = this.y1 - (this.prevValue.y - xyValues.y);
                }
                else {
                    this.x1 = this.x1 - (this.prevValue.x - xyValues.x);
                }
            }
            else if (this.type === IAnnotation_1.EAnnotationType.RenderContextLineAnnotation) {
                this.x1 = this.x1 - (this.prevValue.x - xyValues.x);
                this.x2 = this.x2 - (this.prevValue.x - xyValues.x);
                this.y1 = this.y1 - (this.prevValue.y - xyValues.y);
                this.y2 = this.y2 - (this.prevValue.y - xyValues.y);
            }
        }
        else if (this.adornerDraggingPoint === AnnotationBase_1.EDraggingGripPoint.x1y1) {
            if (this.resizeDirections === XyDirection_1.EXyDirection.XDirection) {
                this.x1 -= this.prevValue.x - xyValues.x;
            }
            else if (this.resizeDirections === XyDirection_1.EXyDirection.YDirection) {
                this.y1 -= this.prevValue.y - xyValues.y;
            }
            else {
                this.x1 -= this.prevValue.x - xyValues.x;
                this.y1 -= this.prevValue.y - xyValues.y;
            }
        }
        else if (this.adornerDraggingPoint === AnnotationBase_1.EDraggingGripPoint.x2y2) {
            if (this.resizeDirections === XyDirection_1.EXyDirection.XDirection) {
                this.x2 -= this.prevValue.x - xyValues.x;
            }
            else if (this.resizeDirections === XyDirection_1.EXyDirection.YDirection) {
                this.y2 -= this.prevValue.y - xyValues.y;
            }
            else {
                this.x2 -= this.prevValue.x - xyValues.x;
                this.y2 -= this.prevValue.y - xyValues.y;
            }
        }
        this.prevValue = xyValues;
    };
    /**
     * @instance
     */
    LineAnnotation.prototype.onDpiChanged = function (args) {
        _super.prototype.onDpiChanged.call(this, args);
        this.notifyPropertyChanged(constants_1.PROPERTY.STROKE);
    };
    LineAnnotation.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            axisFontFamily: this.axisFontFamily,
            axisFontSize: this.axisFontSize,
            axisLabelFill: this.axisLabelFill,
            axisLabelStroke: this.axisLabelStroke,
            labelPlacement: this.labelPlacement,
            labelValue: this.labelValue,
            showLabel: this.showLabel,
            stroke: this.stroke,
            strokeDashArray: this.strokeDashArray,
            strokeThickness: this.strokeThickness
        };
        Object.assign(json.options, options);
        return json;
    };
    LineAnnotation.prototype.checkIsClickedOnAnnotationInternal = function (x, y) {
        var _a = this.getAnnotationBorders(), x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
        var distanceFromLine = (0, pointUtil_1.calcDistanceFromLineSegment)(x, y, x1, y1, x2, y2);
        return distanceFromLine <= constants_1.DISTANCE_TO_LINE * DpiHelper_1.DpiHelper.PIXEL_RATIO;
    };
    LineAnnotation.prototype.notifyPropertyChanged = function (propertyName) {
        _super.prototype.notifyPropertyChanged.call(this, propertyName);
        var strokePenRelatedProperties = [
            constants_1.PROPERTY.STROKE,
            constants_1.PROPERTY.STROKE_THICKNESS,
            constants_1.PROPERTY.STROKE_DASH_ARRAY,
            constants_1.PROPERTY.OPACITY
        ];
        if (strokePenRelatedProperties.includes(propertyName) && this.strokePenCache) {
            (0, Pen2DCache_1.createPenInCache)(this.strokePenCache, this.stroke, this.strokeThickness, this.opacity, this.strokeDashArray);
        }
    };
    LineAnnotation.prototype.updateAdornerInner = function () {
        this.deleteAdorner();
        if (this.isSelected) {
            var _a = this.getAdornerAnnotationBorders(), x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
            var svgString = this.svgStringAdornerTemplate(x1, y1, x2, y2);
            this.svgAdorner = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgAdornerRoot);
        }
    };
    LineAnnotation.prototype.svgStringAdornerTemplate = function (x1, y1, x2, y2) {
        var colorLine = this.selectionBoxStroke;
        return "<svg xmlns=\"http://www.w3.org/2000/svg\">\n    <line x1=\"".concat(x1, "\" y1=\"").concat(y1, "\" x2=\"").concat(x2, "\" y2=\"").concat(y2, "\" stroke=\"").concat(colorLine, "\" stroke-width=\"6\" />\n    ").concat(this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x1y1) ? this.getAnnotationGripSvg(x1, y1) : "", "\n    ").concat(this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x2y2) ? this.getAnnotationGripSvg(x2, y2) : "", "\n    </svg>");
    };
    return LineAnnotation;
}(RenderContextAnnotationBase_1.RenderContextAnnotationBase));
exports.LineAnnotation = LineAnnotation;
