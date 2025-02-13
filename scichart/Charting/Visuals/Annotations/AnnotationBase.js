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
exports.AnnotationBase = exports.ECoordinateMode = exports.EDraggingGripPoint = void 0;
var classFactory_1 = require("../../../Builder/classFactory");
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
var EventHandler_1 = require("../../../Core/EventHandler");
var Guard_1 = require("../../../Core/Guard");
var Point_1 = require("../../../Core/Point");
var BaseType_1 = require("../../../types/BaseType");
var XyDirection_1 = require("../../../types/XyDirection");
var guid_1 = require("../../../utils/guid");
var translate_1 = require("../../../utils/translate");
var AxisCore_1 = require("../Axis/AxisCore");
var SciChartSurfaceBase_1 = require("../SciChartSurfaceBase");
var DpiHelper_1 = require("../TextureManager/DpiHelper");
var AnnotationClickEventArgs_1 = require("./AnnotationClickEventArgs");
var AnnotationDragDeltaEventArgs_1 = require("./AnnotationDragDeltaEventArgs");
var AnnotationHoverEventArgs_1 = require("./AnnotationHoverEventArgs");
var constants_1 = require("./constants");
var IAnnotation_1 = require("./IAnnotation");
/**
 * Defines possible parts of an annotation which could be interacted with a cursor to do dragging or resizing
 */
var EDraggingGripPoint;
(function (EDraggingGripPoint) {
    /** x1,y1 */
    EDraggingGripPoint["x1y1"] = "x1y1";
    /** x2,y1 */
    EDraggingGripPoint["x2y2"] = "x2y2";
    /** x1,y2 */
    EDraggingGripPoint["x2y1"] = "x2y1";
    /** x2,y2 */
    EDraggingGripPoint["x1y2"] = "x1y2";
    EDraggingGripPoint["Body"] = "Body";
})(EDraggingGripPoint = exports.EDraggingGripPoint || (exports.EDraggingGripPoint = {}));
/**
 * Defines the CoordinateMode for {@link AnnotationBase | Annotations} within SciChart's
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 */
var ECoordinateMode;
(function (ECoordinateMode) {
    /**
     * The {@link AnnotationBase.x1 | Annotation.x1}, {@link AnnotationBase.x2 | x2},
     * {@link AnnotationBase.y1 | y1}, {@link AnnotationBase.y2 | y2} coordinate is a data-value,
     * corresponding to the value on the {@link AxisBase2D | Axis} or in the
     * {@link IRenderableSeries.dataSeries | DataSeries}
     */
    ECoordinateMode["DataValue"] = "DataValue";
    /**
     * The {@link AnnotationBase.x1 | Annotation.x1}, {@link AnnotationBase.x2 | x2},
     * {@link AnnotationBase.y1 | y1}, {@link AnnotationBase.y2 | y2} coordinate is a pixel coordinate,
     * corresponding to the distance from the top-left of the
     * {@link SciChartSurface}
     */
    ECoordinateMode["Pixel"] = "Pixel";
    /**
     * The {@link AnnotationBase.x1 | Annotation.x1}, {@link AnnotationBase.x2 | x2},
     * {@link AnnotationBase.y1 | y1}, {@link AnnotationBase.y2 | y2} coordinate is relative,
     * where 0.0 corresponds to the left (or top) of the {@link SciChartSurface}
     * and 1.0 corresponds to the right (or bottom) of the {@link SciChartSurface}
     */
    ECoordinateMode["Relative"] = "Relative";
})(ECoordinateMode = exports.ECoordinateMode || (exports.ECoordinateMode = {}));
/**
 * Defines the base class to an Annotation - a type of marker, text label, line or custom UI overlay on a 2D Cartesian {@link SciChartSurface}
 */
var AnnotationBase = /** @class */ (function (_super) {
    __extends(AnnotationBase, _super);
    /**
     * Creates an instance of the Annotation
     * @param options optional parameters of type {@link IAnnotationBaseOptions} used to configure the annotation at construct time
     */
    function AnnotationBase(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        _this = _super.call(this) || this;
        _this.showWarning = true;
        _this.prevIsSelected = true;
        /** the annotation absolute coordinates */
        _this.annotationBorders = {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 0
        };
        _this.typeMap = new Map();
        _this.isHiddenProperty = false;
        _this.annotationsGripsStrokeProperty = SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.annotationsGripsBorderBrush;
        _this.annotationsGripsFillProperty = SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.annotationsGripsBackroundBrush;
        _this.annotationsGripsRadiusProperty = constants_1.ADORNER_GRIP_RADIUS;
        _this.selectionBoxStrokeProperty = SciChartSurfaceBase_1.SciChartSurfaceBase.DEFAULT_THEME.annotationSelectionStroke;
        _this.selectionBoxDeltaProperty = 1.5;
        _this.selectionBoxThicknessProperty = 6;
        _this.dragPointsProperty = [
            EDraggingGripPoint.Body,
            EDraggingGripPoint.x1y1,
            EDraggingGripPoint.x2y2,
            EDraggingGripPoint.x2y1,
            EDraggingGripPoint.x1y2
        ];
        _this.annotationLayerProperty = IAnnotation_1.EAnnotationLayer.AboveChart;
        _this.isEditableProperty = false;
        _this.xAxisIdProperty = AxisCore_1.AxisCore.DEFAULT_AXIS_ID;
        _this.yAxisIdProperty = AxisCore_1.AxisCore.DEFAULT_AXIS_ID;
        _this.xCoordinateModeProperty = ECoordinateMode.DataValue;
        _this.yCoordinateModeProperty = ECoordinateMode.DataValue;
        _this.isSelectedProperty = false;
        _this.isHoveredProperty = false;
        _this.resizeDirectionsProperty = XyDirection_1.EXyDirection.XyDirection;
        _this.id = (_a = options === null || options === void 0 ? void 0 : options.id) !== null && _a !== void 0 ? _a : (0, guid_1.generateGuid)();
        _this.dragStarted = new EventHandler_1.EventHandler();
        _this.dragEnded = new EventHandler_1.EventHandler();
        _this.dragDelta = new EventHandler_1.EventHandler();
        _this.selectedChanged = new EventHandler_1.EventHandler();
        _this.clicked = new EventHandler_1.EventHandler();
        _this.hovered = new EventHandler_1.EventHandler();
        _this.annotationLayerProperty = (_b = options === null || options === void 0 ? void 0 : options.annotationLayer) !== null && _b !== void 0 ? _b : _this.annotationLayerProperty;
        _this.resizeDirectionsProperty = (_c = options === null || options === void 0 ? void 0 : options.resizeDirections) !== null && _c !== void 0 ? _c : _this.resizeDirectionsProperty;
        _this.isEditableProperty = (_d = options === null || options === void 0 ? void 0 : options.isEditable) !== null && _d !== void 0 ? _d : _this.isEditableProperty;
        _this.isHiddenProperty = (_e = options === null || options === void 0 ? void 0 : options.isHidden) !== null && _e !== void 0 ? _e : _this.isHiddenProperty;
        _this.x1Property = (_f = options === null || options === void 0 ? void 0 : options.x1) !== null && _f !== void 0 ? _f : _this.x1Property;
        _this.y1Property = (_g = options === null || options === void 0 ? void 0 : options.y1) !== null && _g !== void 0 ? _g : _this.y1Property;
        _this.x2Property = (_h = options === null || options === void 0 ? void 0 : options.x2) !== null && _h !== void 0 ? _h : _this.x2Property;
        _this.y2Property = (_j = options === null || options === void 0 ? void 0 : options.y2) !== null && _j !== void 0 ? _j : _this.y2Property;
        _this.xAxisIdProperty = (_k = options === null || options === void 0 ? void 0 : options.xAxisId) !== null && _k !== void 0 ? _k : _this.xAxisIdProperty;
        _this.yAxisIdProperty = (_l = options === null || options === void 0 ? void 0 : options.yAxisId) !== null && _l !== void 0 ? _l : _this.yAxisIdProperty;
        _this.xCoordinateModeProperty = (_m = options === null || options === void 0 ? void 0 : options.xCoordinateMode) !== null && _m !== void 0 ? _m : _this.xCoordinateModeProperty;
        _this.yCoordinateModeProperty = (_o = options === null || options === void 0 ? void 0 : options.yCoordinateMode) !== null && _o !== void 0 ? _o : _this.yCoordinateModeProperty;
        _this.isSelectedProperty = (_p = options === null || options === void 0 ? void 0 : options.isSelected) !== null && _p !== void 0 ? _p : _this.isSelectedProperty;
        _this.opacityProperty = (_q = options === null || options === void 0 ? void 0 : options.opacity) !== null && _q !== void 0 ? _q : 1.0;
        _this.annotationsGripsStrokeProperty = (_r = options === null || options === void 0 ? void 0 : options.annotationsGripsStroke) !== null && _r !== void 0 ? _r : _this.annotationsGripsStrokeProperty;
        _this.annotationsGripsFillProperty = (_s = options === null || options === void 0 ? void 0 : options.annotationsGripsFill) !== null && _s !== void 0 ? _s : _this.annotationsGripsFillProperty;
        _this.annotationsGripsRadiusProperty = (_t = options === null || options === void 0 ? void 0 : options.annotationsGripsRadius) !== null && _t !== void 0 ? _t : _this.annotationsGripsRadius;
        _this.selectionBoxStroke = (_u = options === null || options === void 0 ? void 0 : options.selectionBoxStroke) !== null && _u !== void 0 ? _u : _this.selectionBoxStrokeProperty;
        _this.selectionBoxDelta = (_v = options === null || options === void 0 ? void 0 : options.selectionBoxDelta) !== null && _v !== void 0 ? _v : _this.selectionBoxDeltaProperty;
        _this.selectionBoxThickness = (_w = options === null || options === void 0 ? void 0 : options.selectionBoxThickness) !== null && _w !== void 0 ? _w : _this.selectionBoxThicknessProperty;
        _this.dragPointsProperty = (_x = options === null || options === void 0 ? void 0 : options.dragPoints) !== null && _x !== void 0 ? _x : _this.dragPointsProperty;
        if (options === null || options === void 0 ? void 0 : options.onDragStarted) {
            if (typeof options.onDragStarted === "string") {
                _this.typeMap.set("onDragStarted", options.onDragStarted);
                _this.dragStarted.subscribe((0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.onDragStarted));
            }
            else {
                _this.dragStarted.subscribe(options.onDragStarted);
            }
        }
        if (options === null || options === void 0 ? void 0 : options.onDragEnded) {
            if (typeof options.onDragEnded === "string") {
                _this.typeMap.set("onDragEnded", options.onDragEnded);
                _this.dragEnded.subscribe((0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.onDragEnded));
            }
            else {
                _this.dragEnded.subscribe(options.onDragEnded);
            }
        }
        if (options === null || options === void 0 ? void 0 : options.onDrag) {
            if (typeof options.onDrag === "string") {
                _this.typeMap.set("onDrag", options.onDrag);
                _this.dragDelta.subscribe((0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.onDrag));
            }
            else {
                _this.dragDelta.subscribe(options.onDrag);
            }
        }
        if (options === null || options === void 0 ? void 0 : options.onClick) {
            if (typeof options.onClick === "string") {
                _this.typeMap.set("onClick", options.onClick);
                _this.clicked.subscribe((0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.onClick));
            }
            else {
                _this.clicked.subscribe(options.onClick);
            }
        }
        if (options === null || options === void 0 ? void 0 : options.onHover) {
            if (typeof options.onHover === "string") {
                _this.typeMap.set("onHover", options.onHover);
                _this.hovered.subscribe((0, classFactory_1.getFunction)(BaseType_1.EBaseType.OptionFunction, options.onHover));
            }
            else {
                _this.hovered.subscribe(options.onHover);
            }
        }
        return _this;
    }
    Object.defineProperty(AnnotationBase.prototype, "annotationLayer", {
        /** @inheritDoc */
        get: function () {
            return this.annotationLayerProperty;
        },
        /** @inheritDoc */
        set: function (annotationCanvas) {
            if (this.annotationLayerProperty !== annotationCanvas) {
                this.annotationLayerProperty = annotationCanvas;
                this.notifyPropertyChanged(constants_1.PROPERTY.ANNOTATION_CANVAS);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "adornerDraggingPoint", {
        /**
         * Gets or sets current {@link EDraggingGripPoint}
         */
        get: function () {
            return this.adornerDraggingPointProperty;
        },
        /**
         * Gets or sets current {@link EDraggingGripPoint}
         */
        set: function (value) {
            var _a;
            if (this.adornerDraggingPointProperty !== value) {
                this.adornerDraggingPointProperty = value;
                if (value) {
                    (_a = this.dragStarted) === null || _a === void 0 ? void 0 : _a.raiseEvent();
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "parentSurface", {
        /** @inheritDoc */
        get: function () {
            return this.parentSurfaceProperty;
        },
        /** @inheritDoc */
        set: function (parentSurface) {
            if (this.parentSurfaceProperty !== parentSurface) {
                this.parentSurfaceProperty = parentSurface;
                this.notifyPropertyChanged(constants_1.PROPERTY.PARENT_SURFACE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "isEditable", {
        /** @inheritDoc */
        get: function () {
            return this.isEditableProperty;
        },
        /** @inheritDoc */
        set: function (isEditable) {
            if (this.isEditableProperty !== isEditable) {
                this.isEditableProperty = isEditable;
                this.notifyPropertyChanged(constants_1.PROPERTY.IS_EDITABLE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "isHidden", {
        /** @inheritDoc */
        get: function () {
            return this.isHiddenProperty;
        },
        /** @inheritDoc */
        set: function (isHidden) {
            if (this.isHiddenProperty !== isHidden) {
                this.isHiddenProperty = isHidden;
                this.notifyPropertyChanged(constants_1.PROPERTY.IS_HIDDEN);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "xCoordinateMode", {
        /** @inheritDoc */
        get: function () {
            return this.xCoordinateModeProperty;
        },
        /** @inheritDoc */
        set: function (xCoordinateMode) {
            if (this.xCoordinateModeProperty !== xCoordinateMode) {
                this.xCoordinateModeProperty = xCoordinateMode;
                this.notifyPropertyChanged(constants_1.PROPERTY.X_COORDINATE_MODE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "yCoordinateMode", {
        /** @inheritDoc */
        get: function () {
            return this.yCoordinateModeProperty;
        },
        /** @inheritDoc */
        set: function (yCoordinateMode) {
            if (this.yCoordinateModeProperty !== yCoordinateMode) {
                this.yCoordinateModeProperty = yCoordinateMode;
                this.notifyPropertyChanged(constants_1.PROPERTY.Y_COORDINATE_MODE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "x1", {
        /** @inheritDoc */
        get: function () {
            return this.x1Property;
        },
        /** @inheritDoc */
        set: function (x1) {
            if (this.x1Property !== x1) {
                this.x1Property = x1;
                this.notifyPropertyChanged(constants_1.PROPERTY.X1);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "x2", {
        /** @inheritDoc */
        get: function () {
            return this.x2Property;
        },
        /** @inheritDoc */
        set: function (x2) {
            if (this.x2Property !== x2) {
                this.x2Property = x2;
                this.notifyPropertyChanged(constants_1.PROPERTY.X2);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "y1", {
        /** @inheritDoc */
        get: function () {
            return this.y1Property;
        },
        /** @inheritDoc */
        set: function (y1) {
            if (this.y1Property !== y1) {
                this.y1Property = y1;
                this.notifyPropertyChanged(constants_1.PROPERTY.Y1);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "y2", {
        /** @inheritDoc */
        get: function () {
            return this.y2Property;
        },
        /** @inheritDoc */
        set: function (y2) {
            if (this.y2Property !== y2) {
                this.y2Property = y2;
                this.notifyPropertyChanged(constants_1.PROPERTY.Y2);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "xAxisId", {
        /** @inheritDoc */
        get: function () {
            return this.xAxisIdProperty;
        },
        /** @inheritDoc */
        set: function (xAxisId) {
            if (this.xAxisIdProperty !== xAxisId) {
                this.xAxisIdProperty = xAxisId;
                this.notifyPropertyChanged(constants_1.PROPERTY.XAXIS_ID);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "yAxisId", {
        /** @inheritDoc */
        get: function () {
            return this.yAxisIdProperty;
        },
        /** @inheritDoc */
        set: function (yAxisId) {
            if (this.yAxisIdProperty !== yAxisId) {
                this.yAxisIdProperty = yAxisId;
                this.notifyPropertyChanged(constants_1.PROPERTY.YAXIS_ID);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "isVerticalChart", {
        /** @inheritDoc */
        get: function () {
            var xAxis = this.parentSurface.getXAxisById(this.xAxisId);
            return xAxis === null || xAxis === void 0 ? void 0 : xAxis.isVerticalChart;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "resizeDirections", {
        /** @inheritDoc */
        get: function () {
            return this.resizeDirectionsProperty;
        },
        /** @inheritDoc */
        set: function (value) {
            if (this.resizeDirectionsProperty !== value) {
                this.resizeDirectionsProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.RESIZE_DIRECTIONS);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "isSelected", {
        /** @inheritDoc */
        get: function () {
            return this.isSelectedProperty;
        },
        /** @inheritDoc */
        set: function (value) {
            if (this.isSelectedProperty !== value) {
                this.isSelectedProperty = value;
                this.selectedChanged.raiseEvent(this.isSelectedProperty);
                this.notifyPropertyChanged(constants_1.PROPERTY.IS_SELECTED);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "isHovered", {
        /** @inheritDoc */
        get: function () {
            return this.isHoveredProperty;
        },
        /** @inheritDoc */
        set: function (value) {
            if (this.isHoveredProperty !== value) {
                this.isHoveredProperty = value;
                this.hovered.raiseEvent(new AnnotationHoverEventArgs_1.AnnotationHoverEventArgs({ sender: this, mouseArgs: undefined, isHovered: value }));
                this.notifyPropertyChanged(constants_1.PROPERTY.IS_HOVERED);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "annotationsGripsStroke", {
        /** @inheritDoc */
        get: function () {
            return this.annotationsGripsStrokeProperty;
        },
        /** @inheritDoc */
        set: function (color) {
            if (this.annotationsGripsStrokeProperty !== color) {
                this.annotationsGripsStrokeProperty = color;
                this.notifyPropertyChanged(constants_1.PROPERTY.ADORNER_STROKE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "annotationsGripsFill", {
        /** @inheritDoc */
        get: function () {
            return this.annotationsGripsFillProperty;
        },
        /** @inheritDoc */
        set: function (color) {
            if (this.annotationsGripsFillProperty !== color) {
                this.annotationsGripsFillProperty = color;
                this.notifyPropertyChanged(constants_1.PROPERTY.ADORNER_FILL);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "annotationsGripsRadius", {
        /** @inheritDoc */
        get: function () {
            return this.annotationsGripsRadiusProperty;
        },
        /** @inheritDoc */
        set: function (radius) {
            if (this.annotationsGripsRadiusProperty !== radius) {
                this.annotationsGripsRadiusProperty = radius;
                this.notifyPropertyChanged(constants_1.PROPERTY.ADORNER_RADIUS);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "selectionBoxStroke", {
        /** @inheritDoc */
        get: function () {
            return this.selectionBoxStrokeProperty;
        },
        /** @inheritDoc */
        set: function (color) {
            if (this.selectionBoxStrokeProperty !== color) {
                this.selectionBoxStrokeProperty = color;
                this.notifyPropertyChanged(constants_1.PROPERTY.SELECTION_STROKE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "selectionBoxDelta", {
        /** @inheritDoc */
        get: function () {
            return this.selectionBoxDeltaProperty;
        },
        /** @inheritDoc */
        set: function (delta) {
            if (this.selectionBoxDeltaProperty !== delta) {
                this.selectionBoxDeltaProperty = delta;
                this.notifyPropertyChanged(constants_1.PROPERTY.SELECTION_DELTA);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "selectionBoxThickness", {
        /** @inheritDoc */
        get: function () {
            return this.selectionBoxThicknessProperty;
        },
        /** @inheritDoc */
        set: function (delta) {
            if (this.selectionBoxThicknessProperty !== delta) {
                this.selectionBoxThicknessProperty = delta;
                this.notifyPropertyChanged(constants_1.PROPERTY.SELECTION_DELTA);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "isDraggingStarted", {
        get: function () {
            return !!this.adornerDraggingPoint;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "opacity", {
        /** @inheritDoc */
        get: function () {
            return this.opacityProperty;
        },
        /** @inheritDoc */
        set: function (opacity) {
            if (this.opacityProperty !== opacity) {
                this.opacityProperty = opacity;
                this.notifyPropertyChanged(constants_1.PROPERTY.OPACITY);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AnnotationBase.prototype, "svgAdornerRoot", {
        get: function () {
            return this.svgAdornerRootProperty;
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    AnnotationBase.prototype.onAttach = function (scs) {
        this.svgAdornerRootProperty = scs.domSvgAdornerLayer;
        // Override in derived classes to be notified of attached
        if (this.isSelected) {
            this.parentSurface.adornerLayer.selectedAnnotation = this;
        }
    };
    /** @inheritDoc */
    AnnotationBase.prototype.onDetach = function () {
        if (this.isSelected) {
            this.isSelected = false;
            this.parentSurface.adornerLayer.deselectAnnotation(this);
        }
        if (this.isHovered) {
            this.isHovered = false;
        }
        this.selectedChanged.unsubscribeAll();
        this.deleteAdorner();
        this.svgAdornerRootProperty = undefined;
    };
    Object.defineProperty(AnnotationBase.prototype, "dragPoints", {
        /** Get the dragging points that should be enabled for this annotation */
        get: function () {
            return this.dragPointsProperty;
        },
        /** Set the dragging points that should be enabled for this annotation */
        set: function (dragPoints) {
            this.dragPointsProperty = dragPoints;
            this.notifyPropertyChanged(constants_1.PROPERTY.DRAGPOINTS);
        },
        enumerable: false,
        configurable: true
    });
    /** Calculates if the annotation is hovered with the specified args*/
    AnnotationBase.prototype.checkIsWithinBounds = function (args) {
        var xyPoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(args.mousePoint, this.parentSurface.seriesViewRect, true);
        if (!xyPoint) {
            return false;
        }
        return this.checkIsClickedOnAnnotationInternal(xyPoint.x, xyPoint.y);
    };
    /** Sends hover/leave action to the annotation */
    AnnotationBase.prototype.hover = function (options) {
        var args = options.args, notifyPositionUpdate = options.notifyPositionUpdate, notifyOutEvent = options.notifyOutEvent;
        // check if the annotation is hovered or skip check if the result is provided
        var isHovered = options.isHovered !== undefined ? options.isHovered : this.checkIsWithinBounds(args);
        var wasHovered = this.isHovered;
        // change state if needed
        this.isHoveredProperty = isHovered;
        var isMouseEnterEvent = isHovered && !wasHovered;
        var isMouseLeaveEvent = wasHovered && !isHovered && notifyOutEvent;
        var isMouseUpdateEvent = isHovered && wasHovered && notifyPositionUpdate;
        if (isMouseEnterEvent || isMouseLeaveEvent || isMouseUpdateEvent) {
            this.hovered.raiseEvent(new AnnotationHoverEventArgs_1.AnnotationHoverEventArgs({ sender: this, mouseArgs: args, isHovered: isHovered }));
        }
        if (isHovered !== wasHovered) {
            this.notifyPropertyChanged(constants_1.PROPERTY.IS_HOVERED);
        }
    };
    /** Called internally. Send a click to the annotation if the point is in bounds, raising the clicked event and optionally selecting the annotation. */
    AnnotationBase.prototype.click = function (args, selectOnClick) {
        var xyPoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(args.mousePoint, this.parentSurface.seriesViewRect, true);
        if (!xyPoint) {
            return false;
        }
        if (this.checkIsClickedOnAnnotationInternal(xyPoint.x, xyPoint.y)) {
            var borders = this.getAdornerAnnotationBorders(true);
            var x = args.mousePoint.x / DpiHelper_1.DpiHelper.PIXEL_RATIO;
            var y = args.mousePoint.y / DpiHelper_1.DpiHelper.PIXEL_RATIO;
            var relativeCoords = new Point_1.Point(x - borders.x1, y - borders.y1);
            this.isSelected = selectOnClick;
            this.clicked.raiseEvent(new AnnotationClickEventArgs_1.AnnotationClickEventArgs(this, args, relativeCoords));
            return this.isSelected;
        }
        else {
            this.isSelected = false;
        }
        return this.isSelected;
    };
    /** Called internally. Select the annotation if the point is in bounds.  Does not raise the clicked event */
    AnnotationBase.prototype.clickToSelect = function (args) {
        var xyPoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(args.mousePoint, this.parentSurface.seriesViewRect, true);
        if (!xyPoint) {
            return false;
        }
        this.isSelected = this.checkIsClickedOnAnnotationInternal(xyPoint.x, xyPoint.y);
        return this.isSelected;
    };
    AnnotationBase.prototype.calcDragDistance = function (xyPoint) { };
    AnnotationBase.prototype.onDragStarted = function (args) {
        return false;
    };
    AnnotationBase.prototype.checkIsClickedOnAnnotation = function (x, y) {
        // We multiply by PIXEL_RATIO to get coordinates on the scaled canvas
        var xyPoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(new Point_1.Point(x * DpiHelper_1.DpiHelper.PIXEL_RATIO, y * DpiHelper_1.DpiHelper.PIXEL_RATIO), this.parentSurface.seriesViewRect, true);
        if (!xyPoint)
            return false;
        return this.checkIsClickedOnAnnotationInternal(xyPoint.x, xyPoint.y);
    };
    AnnotationBase.prototype.onDragAdorner = function (args) {
        var xyValues = this.getValuesFromCoordinates(args.mousePoint, true);
        if (xyValues) {
            this.calcDragDistance(xyValues);
        }
        this.dragDelta.raiseEvent(new AnnotationDragDeltaEventArgs_1.AnnotationDragDeltaEventArgs());
    };
    AnnotationBase.prototype.onDragEnded = function () {
        var _a;
        (_a = this.dragEnded) === null || _a === void 0 ? void 0 : _a.raiseEvent();
        this.adornerDraggingPoint = undefined;
        this.prevValue = undefined;
    };
    /**
     * @inheritDoc
     */
    AnnotationBase.prototype.onDpiChanged = function (args) { };
    /** Internal use. Captures the state of isHidden,x1,y1 and prevents invalidateParent being called on change to these properties */
    AnnotationBase.prototype.suspendInvalidate = function () {
        this.invalidateState = {
            isHidden: this.isHidden,
            x1: this.x1,
            y1: this.y1
        };
    };
    /** Internal use. If isHidden,x1,y1 have change since suspendInvalidate was called, call invalidateParent */
    AnnotationBase.prototype.resumeInvalidate = function () {
        if (!this.invalidateState)
            return;
        if (this.isHidden !== this.invalidateState.isHidden ||
            this.x1 !== this.invalidateState.x1 ||
            this.y1 !== this.invalidateState.y1) {
            if (this.invalidateParentCallback) {
                this.invalidateParentCallback();
            }
        }
        this.invalidateState = undefined;
    };
    AnnotationBase.prototype.toJSON = function () {
        var options = {
            id: this.id,
            annotationLayer: this.annotationLayer,
            isEditable: this.isEditable,
            isHidden: this.isHidden,
            isSelected: this.isSelected,
            onDrag: this.typeMap.get("onDrag"),
            onDragEnded: this.typeMap.get("onDragEnded"),
            onDragStarted: this.typeMap.get("onDragStarted"),
            onClick: this.typeMap.get("onClick"),
            onHover: this.typeMap.get("onHover"),
            opacity: this.opacity,
            resizeDirections: this.resizeDirections,
            x1: this.x1Property,
            x2: this.x2Property,
            y1: this.y1Property,
            y2: this.y2Property,
            xAxisId: this.xAxisId,
            yAxisId: this.yAxisId,
            xCoordinateMode: this.xCoordinateMode,
            yCoordinateMode: this.yCoordinateMode,
            annotationsGripsStroke: this.annotationsGripsStroke,
            annotationsGripsFill: this.annotationsGripsFill,
            annotationsGripsRadius: this.annotationsGripsRadius,
            selectionBoxStroke: this.selectionBoxStroke,
            selectionBoxDelta: this.selectionBoxDelta,
            selectionBoxThickness: this.selectionBoxThickness,
            dragPoints: this.dragPointsProperty
        };
        return { type: this.type, options: options };
    };
    /**
     * Returns annotationBorders
     * @param ordered flag to return x and y values in ascending order, where x1 <= x2 and y1 <= y2
     */
    AnnotationBase.prototype.getAnnotationBorders = function (ordered, applyDelta) {
        var _a, _b;
        if (ordered === void 0) { ordered = false; }
        if (applyDelta === void 0) { applyDelta = false; }
        if (!ordered && !applyDelta)
            return this.annotationBorders;
        var _c = this.annotationBorders, x1 = _c.x1, x2 = _c.x2, y1 = _c.y1, y2 = _c.y2;
        var delta = applyDelta ? this.selectionBoxDelta : 0;
        if (ordered) {
            if (x2 < x1) {
                _a = [x2 - delta, x1 + delta], x1 = _a[0], x2 = _a[1];
            }
            else {
                x1 -= delta;
                x2 += delta;
            }
            if (y2 < y1) {
                _b = [y2 - delta, y1 + delta], y1 = _b[0], y2 = _b[1];
            }
            else {
                y1 -= delta;
                y2 += delta;
            }
        }
        else {
            if (x2 < x1) {
                x1 += delta;
                x2 -= delta;
            }
            else {
                x1 -= delta;
                x2 += delta;
            }
            if (y2 < y1) {
                y1 += delta;
                y2 -= delta;
            }
            else {
                y1 -= delta;
                y2 += delta;
            }
        }
        return { x1: x1, x2: x2, y1: y1, y2: y2 };
    };
    /**
     * Returns annotation borders for the {@link AdornerLayer} which has the size of the whole canvas
     * @param ordered flag to return x and y values in ascending order
     */
    AnnotationBase.prototype.getAdornerAnnotationBorders = function (ordered, applyDelta) {
        if (ordered === void 0) { ordered = false; }
        if (applyDelta === void 0) { applyDelta = false; }
        var borders = this.getAnnotationBorders(ordered, applyDelta);
        var x1 = this.isSvgAnnotation ? borders.x1 * DpiHelper_1.DpiHelper.PIXEL_RATIO : borders.x1;
        var x2 = this.isSvgAnnotation ? borders.x2 * DpiHelper_1.DpiHelper.PIXEL_RATIO : borders.x2;
        var y1 = this.isSvgAnnotation ? borders.y1 * DpiHelper_1.DpiHelper.PIXEL_RATIO : borders.y1;
        var y2 = this.isSvgAnnotation ? borders.y2 * DpiHelper_1.DpiHelper.PIXEL_RATIO : borders.y2;
        var point1 = (0, translate_1.translateFromSeriesViewRectToCanvas)(new Point_1.Point(x1, y1), this.parentSurface.seriesViewRect, true);
        var point2 = (0, translate_1.translateFromSeriesViewRectToCanvas)(new Point_1.Point(x2, y2), this.parentSurface.seriesViewRect, true);
        return {
            x1: point1.x / DpiHelper_1.DpiHelper.PIXEL_RATIO,
            x2: point2.x / DpiHelper_1.DpiHelper.PIXEL_RATIO,
            y1: point1.y / DpiHelper_1.DpiHelper.PIXEL_RATIO,
            y2: point2.y / DpiHelper_1.DpiHelper.PIXEL_RATIO
        };
    };
    /** Get svg for the adorner grip handles for standard annotations */
    AnnotationBase.prototype.getAnnotationGripSvg = function (x, y) {
        return "<circle cx=\"".concat(x, "\" cy=\"").concat(y, "\" r=\"").concat(this.annotationsGripsRadius, "\" fill=\"").concat(this.annotationsGripsFill, "\" stroke=\"").concat(this.annotationsGripsStroke, "\"/>");
    };
    /** Override this to disable drag behaviour for certain dragging points */
    AnnotationBase.prototype.canDragPoint = function (dragPoint) {
        return this.dragPointsProperty.includes(dragPoint);
    };
    /**
     * Gets the svg string for the adorner for standard annotations.  Called by updateAdornerInner.
     * Coordinates passed in are the top left and bottom right of the bounding box.
     * To get the bounding coordinates in their original order call this.getAdornerAnnotationBorders(false, true);
     */
    AnnotationBase.prototype.svgStringAdornerTemplate = function (x1, y1, x2, y2) {
        return "<svg xmlns=\"http://www.w3.org/2000/svg\"></svg>";
    };
    /**
     * @summary Notifies subscribers of {@link AnnotationBase.propertyChanged} that a property has changed and the chart requires redrawing
     * @description SciChart provides fully reactive components, changing any property or changing data will cause the {@link AnnotationBase} to
     * redraw where necessary. This method notifies subscribers of the {@link AnnotationBase.propertyChanged} {@link EventHandler}
     * that a property has changed.
     * @param propertyName The name of the property which has changed
     */
    AnnotationBase.prototype.notifyPropertyChanged = function (propertyName) {
        if (this.invalidateParentCallback && !this.invalidateState) {
            this.invalidateParentCallback();
        }
    };
    /**
     * Converts a value (e.g. from {@link x1}, {@link x2}, {@link y1} or {@link y2}) into a pixel coordinate
     * @param value - the value to convert
     * @param calculator the {@link CoordinateCalculatorBase} which will do the transformation
     * @param coordinateMode the {@link ECoordinateMode} to apply
     * @returns the pixel coordinate
     */
    AnnotationBase.prototype.getCoordinate = function (value, calculator, coordinateMode) {
        Guard_1.Guard.notNull(coordinateMode, "coordinateMode");
        Guard_1.Guard.notNull(calculator, "calculator");
        if (value === undefined) {
            return undefined;
        }
        switch (coordinateMode) {
            case ECoordinateMode.Pixel: {
                // Value is 20.0 means pixel = 20.0
                return this.isSvgAnnotation ? value : value * DpiHelper_1.DpiHelper.PIXEL_RATIO;
            }
            case ECoordinateMode.DataValue: {
                // Value is 20.0 must be converted from data-value to coordinate using Axis api
                var absoluteCoordinate = value !== undefined && value !== null ? calculator.getCoordinate(value) : undefined;
                return this.isSvgAnnotation ? absoluteCoordinate / DpiHelper_1.DpiHelper.PIXEL_RATIO : absoluteCoordinate;
            }
            case ECoordinateMode.Relative: {
                // Value is 0.5 means 50% of the viewport size
                return this.isSvgAnnotation
                    ? (value * calculator.viewportDimension + calculator.offset) / DpiHelper_1.DpiHelper.PIXEL_RATIO
                    : value * calculator.viewportDimension + calculator.offset;
            }
            default: {
                throw new Error("AnnotationBase.getCoordinate with CoordinateMode.".concat(coordinateMode, " is not implemented"));
            }
        }
    };
    /**
     * Returns the pixel X1 coordinate
     * @param xCalc the X {@link CoordinateCalculatorBase} which will do the transformation
     * @param yCalc the Y {@link CoordinateCalculatorBase} which will do the transformation
     * @returns the pixel X1 coordinate
     */
    AnnotationBase.prototype.getX1Coordinate = function (xCalc, yCalc) {
        var _a, _b;
        return this.isVerticalChart
            ? this.getCoordinate((_a = this.y1) !== null && _a !== void 0 ? _a : 0, yCalc, this.yCoordinateMode)
            : this.getCoordinate((_b = this.x1) !== null && _b !== void 0 ? _b : 0, xCalc, this.xCoordinateMode);
    };
    /**
     * Returns the pixel X2 coordinate
     * @param xCalc the X {@link CoordinateCalculatorBase} which will do the transformation
     * @param yCalc the Y {@link CoordinateCalculatorBase} which will do the transformation
     * @returns the pixel X2 coordinate
     */
    AnnotationBase.prototype.getX2Coordinate = function (xCalc, yCalc) {
        var _a, _b;
        return this.isVerticalChart
            ? this.getCoordinate((_a = this.y2) !== null && _a !== void 0 ? _a : 0, yCalc, this.yCoordinateMode)
            : this.getCoordinate((_b = this.x2) !== null && _b !== void 0 ? _b : 0, xCalc, this.xCoordinateMode);
    };
    /**
     * Returns the pixel Y1 coordinate
     * @param xCalc the X {@link CoordinateCalculatorBase} which will do the transformation
     * @param yCalc the Y {@link CoordinateCalculatorBase} which will do the transformation
     * @returns the pixel Y1 coordinate
     */
    AnnotationBase.prototype.getY1Coordinate = function (xCalc, yCalc) {
        var _a, _b;
        return this.isVerticalChart
            ? this.getCoordinate((_a = this.x1) !== null && _a !== void 0 ? _a : 0, xCalc, this.xCoordinateMode)
            : this.getCoordinate((_b = this.y1) !== null && _b !== void 0 ? _b : 0, yCalc, this.yCoordinateMode);
    };
    /**
     * Returns the pixel Y2 coordinate
     * @param xCalc the X {@link CoordinateCalculatorBase} which will do the transformation
     * @param yCalc the Y {@link CoordinateCalculatorBase} which will do the transformation
     * @returns the pixel Y2 coordinate
     */
    AnnotationBase.prototype.getY2Coordinate = function (xCalc, yCalc) {
        var _a, _b;
        return this.isVerticalChart
            ? this.getCoordinate((_a = this.x2) !== null && _a !== void 0 ? _a : 0, xCalc, this.xCoordinateMode)
            : this.getCoordinate((_b = this.y2) !== null && _b !== void 0 ? _b : 0, yCalc, this.yCoordinateMode);
    };
    /**
     * Converts a pixel coordinate back to a value
     * @param value - coordinate or dataValue to convert
     * @param calculator the {@link CoordinateCalculatorBase} which will do the transformation
     * @param coordinateMode the {@link ECoordinateMode} to apply
     * @returns the data-value or value
     */
    AnnotationBase.prototype.getValue = function (value, calculator, coordinateMode) {
        switch (coordinateMode) {
            case ECoordinateMode.Pixel: {
                return this.isSvgAnnotation
                    ? calculator.getDataValue(value * DpiHelper_1.DpiHelper.PIXEL_RATIO)
                    : calculator.getDataValue(value);
            }
            case ECoordinateMode.DataValue: {
                return value;
            }
            // Case relative: 0.0 = left and 1.0 = right % on the viewport
            case ECoordinateMode.Relative: {
                return (calculator.visibleMax - calculator.visibleMin) * value + calculator.visibleMin;
            }
            default: {
                throw new Error("Not implemented");
            }
        }
    };
    AnnotationBase.prototype.checkIsClickedOnAnnotationInternal = function (x, y) {
        return false;
    };
    AnnotationBase.prototype.deleteAdorner = function () {
        if (!this.svgAdorner || !this.parentSurface || this.parentSurface.isDeleted)
            return;
        this.svgAdornerRoot.removeChild(this.svgAdorner);
        this.svgAdorner = undefined;
    };
    /**
     * Transforms an absolute coordinates point to the corresponding value point.
     * The value point has x and y converted accordingly to the the coordinate modes {@link xCoordinateMode} and {@link yCoordinateMode}
     * @param point
     * @param translateToSeriesViewRect defines if the coordinates should be projected from the Canvas to SeriesViewRect
     * @returns a point with coordinates  {@link ECoordinateMode}
     */
    AnnotationBase.prototype.getValuesFromCoordinates = function (point, translateToSeriesViewRect) {
        var viewRect = this.parentSurface.seriesViewRect;
        var translatedPoint = !translateToSeriesViewRect
            ? point
            : (0, translate_1.translateFromCanvasToSeriesViewRect)(point, viewRect, true);
        if (!translatedPoint) {
            return undefined;
        }
        var xAxis = this.parentSurface.getXAxisById(this.xAxisId);
        var xCoordCalc = xAxis.getCurrentCoordinateCalculator();
        var yAxis = this.parentSurface.getYAxisById(this.yAxisId);
        var yCoordCalc = yAxis.getCurrentCoordinateCalculator();
        var xValue = this.convertFromCoordinate(xAxis.isHorizontalAxis ? translatedPoint.x : translatedPoint.y, xCoordCalc, this.xCoordinateMode);
        var yValue = this.convertFromCoordinate(yAxis.isHorizontalAxis ? translatedPoint.x : translatedPoint.y, yCoordCalc, this.yCoordinateMode);
        return new Point_1.Point(xValue, yValue);
    };
    AnnotationBase.prototype.getXYCoordinatesFromValues = function (xyDataPoint) {
        var viewRect = this.parentSurface.seriesViewRect;
        var pointWithAbsoluteCoordinates = this.getAbsoluteCoordinates(xyDataPoint);
        var translatedPoint = (0, translate_1.translateFromSeriesViewRectToCanvas)(pointWithAbsoluteCoordinates, viewRect, true);
        if (!translatedPoint) {
            return undefined;
        }
        return new Point_1.Point(translatedPoint.x, translatedPoint.y);
    };
    /**
     * Converts an absolute coordinate to a value which could be in form of DataValue, Pixel, or Relative coordinate
     * @param value - an absolute coordinate to convert
     * @param calculator the {@link CoordinateCalculatorBase} which will do the transformation
     * @param coordinateMode the expected {@link ECoordinateMode} of the converted point
     * @returns the data-value, pixel, or relative value accordingly to the coordinateMode
     */
    AnnotationBase.prototype.convertFromCoordinate = function (value, calculator, coordinateMode) {
        switch (coordinateMode) {
            case ECoordinateMode.Pixel: {
                return value / DpiHelper_1.DpiHelper.PIXEL_RATIO;
            }
            case ECoordinateMode.DataValue: {
                return value !== undefined && value !== null ? calculator.getDataValue(value) : undefined;
            }
            case ECoordinateMode.Relative: {
                return (value - calculator.offset) / calculator.viewportDimension;
            }
            default: {
                throw new Error("Not implemented");
            }
        }
    };
    /**
     *  Calculates coordinates in pixels of the specified Point.
     *  Uses the {@link xCoordinateMode} (or {@link yCoordinateMode} for vertical chart)
     * @param point
     */
    AnnotationBase.prototype.getAbsoluteCoordinates = function (point) {
        var xCalc = this.parentSurface.getXAxisById(this.xAxisId).getCurrentCoordinateCalculator();
        var yCalc = this.parentSurface.getYAxisById(this.yAxisId).getCurrentCoordinateCalculator();
        var coord1 = this.getCoordinate(point.x, xCalc, this.xCoordinateMode);
        var coord2 = this.getCoordinate(point.y, yCalc, this.yCoordinateMode);
        return this.isVerticalChart ? new Point_1.Point(coord2, coord1) : new Point_1.Point(coord1, coord2);
    };
    /**
     *  Calculates coordinates in pixels of the specified Point.
     *  Uses the {@link xCoordinateMode} (or {@link yCoordinateMode} for vertical chart)
     * @param value
     */
    AnnotationBase.prototype.getAbsoluteHorizontalCoordinate = function (value) {
        var xCalc = this.parentSurface.getXAxisById(this.xAxisId).getCurrentCoordinateCalculator();
        var yCalc = this.parentSurface.getYAxisById(this.yAxisId).getCurrentCoordinateCalculator();
        return this.isVerticalChart
            ? this.getCoordinate(value, yCalc, this.yCoordinateMode)
            : this.getCoordinate(value, xCalc, this.xCoordinateMode);
    };
    /**
     *  Calculates coordinate in pixels of the specified value in the vertical dimension.
     *  Uses the {@link yCoordinateMode} (or {@link xCoordinateMode} for vertical chart)
     * @param value
     */
    AnnotationBase.prototype.getAbsoluteVerticalCoordinate = function (value) {
        var xCalc = this.parentSurface.getXAxisById(this.xAxisId).getCurrentCoordinateCalculator();
        var yCalc = this.parentSurface.getYAxisById(this.yAxisId).getCurrentCoordinateCalculator();
        return this.isVerticalChart
            ? this.getCoordinate(value, xCalc, this.xCoordinateMode)
            : this.getCoordinate(value, yCalc, this.yCoordinateMode);
    };
    /**
     * Sets annotationBorders
     * For renderContext annotations it is scaled and for SVG annotations it is not
     * For example if we have a macbook with retina display and canvas.width = 1600px, canvas.height = 1200px,
     * canvas.style.width = 800px, canvas.style.height = 600px
     * If we have {@link BoxAnnotation} (renderContext) which takes 50% width and height, located in the left-top corner
     * it should have annotationBorders as follows x1 = 0, x2 = 800, y1 = 0, y2 = 600
     * But if we have {@link CustomAnnotation} (SVG) which takes 50% width and height, located in the left-top corner
     * it should have annotationBorders as follows x1 = 0, x2 = 400, y1 = 0, y2 = 300
     * @protected
     */
    AnnotationBase.prototype.setAnnotationBorders = function (x1, x2, y1, y2) {
        this.annotationBorders = {
            x1: x1,
            x2: x2,
            y1: y1,
            y2: y2
        };
    };
    return AnnotationBase;
}(DeletableEntity_1.DeletableEntity));
exports.AnnotationBase = AnnotationBase;
