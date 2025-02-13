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
exports.BoxAnnotation = void 0;
var app_1 = require("../../../constants/app");
var Deleter_1 = require("../../../Core/Deleter");
var Guard_1 = require("../../../Core/Guard");
var Point_1 = require("../../../Core/Point");
var Rect_1 = require("../../../Core/Rect");
var XyDirection_1 = require("../../../types/XyDirection");
var pointUtil_1 = require("../../../utils/pointUtil");
var translate_1 = require("../../../utils/translate");
var BrushCache_1 = require("../../Drawing/BrushCache");
var Pen2DCache_1 = require("../../Drawing/Pen2DCache");
var DpiHelper_1 = require("../TextureManager/DpiHelper");
var AnnotationBase_1 = require("./AnnotationBase");
var annotationHelpers_1 = require("./annotationHelpers");
var constants_1 = require("./constants");
var IAnnotation_1 = require("./IAnnotation");
var RenderContextAnnotationBase_1 = require("./RenderContextAnnotationBase");
/**
 * @summary The {@link BoxAnnotation} provides an {@link AnnotationBase | Annotation} which draws a rectangle or box over the {@link SciChartSurface}
 * @description
 * To add a {@link BoxAnnotation} to a {@link SciChartSurface}, use the following code:
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const boxAnnotation = new BoxAnnotation( { x1: 1, x2: 2, y1: 3, y2: 4, fill: "#FF000077", stroke: "#FF0000"});
 * sciChartSurface.annotations.add(boxAnnotation);
 * ```
 * @remarks Uses the fast WebGL/WebAssembly {@link WebGL2RenderingContext} for rendering
 */
var BoxAnnotation = /** @class */ (function (_super) {
    __extends(BoxAnnotation, _super);
    /**
     * Create an instance of a BoxAnnotation
     * @param options Optional parameters of type {@link IBoxAnnotationOptions} which configure the annotation upon construction
     */
    function BoxAnnotation(options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.type = IAnnotation_1.EAnnotationType.RenderContextBoxAnnotation;
        _this.strokeThicknessProperty = 1;
        _this.stroke = (_a = options === null || options === void 0 ? void 0 : options.stroke) !== null && _a !== void 0 ? _a : "#ffffff";
        _this.strokeThickness = (_b = options === null || options === void 0 ? void 0 : options.strokeThickness) !== null && _b !== void 0 ? _b : 1;
        _this.fill = (_c = options === null || options === void 0 ? void 0 : options.fill) !== null && _c !== void 0 ? _c : "#777777";
        return _this;
    }
    Object.defineProperty(BoxAnnotation.prototype, "stroke", {
        /**
         * Gets stroke for the outline of the {@link BoxAnnotation}
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        get: function () {
            return this.strokeProperty;
        },
        /**
         * Sets the stroke for the outline of the {@link BoxAnnotation}
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        set: function (htmlColorCode) {
            this.strokeProperty = htmlColorCode;
            this.notifyPropertyChanged(constants_1.PROPERTY.STROKE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoxAnnotation.prototype, "strokeThickness", {
        /**
         * Gets the strokeThickness for the outline of the {@link BoxAnnotation}
         */
        get: function () {
            return this.strokeThicknessProperty;
        },
        /**
         * Sets the strokeThickness for the outline of the {@link BoxAnnotation}
         */
        set: function (value) {
            this.strokeThicknessProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.STROKE_THICKNESS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BoxAnnotation.prototype, "fill", {
        /**
         * Gets the fill for the {@link BoxAnnotation}
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        get: function () {
            return this.fillProperty;
        },
        /**
         * Sets the fill for the {@link BoxAnnotation}
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        set: function (htmlColorCode) {
            this.fillProperty = htmlColorCode;
            this.notifyPropertyChanged(constants_1.PROPERTY.FILL);
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    BoxAnnotation.prototype.delete = function () {
        this.strokePenCache = (0, Deleter_1.deleteSafe)(this.strokePenCache);
        this.fillBrushCache = (0, Deleter_1.deleteSafe)(this.fillBrushCache);
        this.nativeDrawingProvider = (0, Deleter_1.deleteSafe)(this.nativeDrawingProvider);
    };
    /** @inheritDoc */
    BoxAnnotation.prototype.drawWithContext = function (renderContext, xCalc, yCalc, viewRect) {
        Guard_1.Guard.notNull(renderContext, "renderContext");
        Guard_1.Guard.notNull(xCalc, "xCalc");
        Guard_1.Guard.notNull(yCalc, "yCalc");
        var strokePen = this.stroke && this.strokeThickness ? (0, Pen2DCache_1.getWebGlPenFromCache)(this.strokePenCache) : undefined;
        strokePen === null || strokePen === void 0 ? void 0 : strokePen.setOpacity(this.opacity);
        var fillBrush = this.fill ? (0, BrushCache_1.getWebGlBrushFromCache)(this.fillBrushCache) : undefined;
        fillBrush === null || fillBrush === void 0 ? void 0 : fillBrush.setOpacity(this.opacity);
        var x1 = this.getX1Coordinate(xCalc, yCalc);
        var x2 = this.getX2Coordinate(xCalc, yCalc);
        var y1 = this.getY1Coordinate(xCalc, yCalc);
        var y2 = this.getY2Coordinate(xCalc, yCalc);
        this.setAnnotationBorders(x1, x2, y1, y2);
        var rect = Rect_1.Rect.createWithPoints(new Point_1.Point(x1, y1), new Point_1.Point(x2, y2));
        // Temporary HAX! drawRect is rubbish with large strokeThickness, whereas the columnDrawingProvider does a nice
        // outlined rectangle, but the code is ugly.  In 2.3 we will improve the native drawRect to do the outline properly.
        if (!app_1.IS_TEST_ENV) {
            if (this.strokeThickness > 3) {
                this.drawWithProvider(renderContext, strokePen.scrtPen, fillBrush.scrtBrush, xCalc, yCalc, rect, viewRect);
            }
            else {
                renderContext.drawRect(rect, viewRect, strokePen, fillBrush);
            }
        }
        this.updateAdornerInner();
    };
    /** @inheritDoc */
    BoxAnnotation.prototype.onAttach = function (scs) {
        _super.prototype.onAttach.call(this, scs);
        this.nativeDrawingProvider = new scs.webAssemblyContext2D.SCRTColumnSeriesDrawingProvider();
        if (!this.strokePenCache) {
            this.strokePenCache = new Pen2DCache_1.Pen2DCache(scs.webAssemblyContext2D);
        }
        (0, Pen2DCache_1.createPenInCache)(this.strokePenCache, this.stroke, this.strokeThickness, this.opacity);
        if (!this.fillBrushCache) {
            this.fillBrushCache = new BrushCache_1.BrushCache(scs.webAssemblyContext2D);
        }
        (0, BrushCache_1.createBrushInCache)(this.fillBrushCache, this.fill, this.opacity);
    };
    BoxAnnotation.prototype.onDragStarted = function (args) {
        _super.prototype.onDragStarted.call(this, args);
        var _a = this.getAnnotationBorders(false, true), x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
        var _b = annotationHelpers_1.annotationHelpers.calcNewApex(x1, y1, x2, y2, this.isVerticalChart), x1y1 = _b.x1y1, x2y1 = _b.x2y1, x1y2 = _b.x1y2, x2y2 = _b.x2y2;
        var xyMousePoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(new Point_1.Point(args.mousePoint.x, args.mousePoint.y), this.parentSurface.seriesViewRect, true);
        if (x1y1 && this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x1y1)) {
            var dist = (0, pointUtil_1.calcDistance)(x1y1.x, x1y1.y, xyMousePoint.x, xyMousePoint.y);
            if (dist < this.annotationsGripsRadius * DpiHelper_1.DpiHelper.PIXEL_RATIO) {
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.x1y1;
                return true;
            }
        }
        if (x2y1 && this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x2y1)) {
            var dist = (0, pointUtil_1.calcDistance)(x2y1.x, x2y1.y, xyMousePoint.x, xyMousePoint.y);
            if (dist < this.annotationsGripsRadius * DpiHelper_1.DpiHelper.PIXEL_RATIO) {
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.x2y1;
                return true;
            }
        }
        if (x1y2 && this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x1y2)) {
            var dist = (0, pointUtil_1.calcDistance)(x1y2.x, x1y2.y, xyMousePoint.x, xyMousePoint.y);
            if (dist < this.annotationsGripsRadius * DpiHelper_1.DpiHelper.PIXEL_RATIO) {
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.x1y2;
                return true;
            }
        }
        if (x2y2 && this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x2y2)) {
            var dist = (0, pointUtil_1.calcDistance)(x2y2.x, x2y2.y, xyMousePoint.x, xyMousePoint.y);
            if (dist < this.annotationsGripsRadius * DpiHelper_1.DpiHelper.PIXEL_RATIO) {
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.x2y2;
                return true;
            }
        }
        if (xyMousePoint && this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.Body)) {
            if (this.clickToSelect(args)) {
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.Body;
                return true;
            }
        }
        return false;
    };
    BoxAnnotation.prototype.calcDragDistance = function (xyValues) {
        if (!this.prevValue) {
            this.prevValue = xyValues;
            return;
        }
        if (this.adornerDraggingPoint === AnnotationBase_1.EDraggingGripPoint.Body) {
            this.x1 = this.x1 - (this.prevValue.x - xyValues.x);
            this.x2 = this.x2 - (this.prevValue.x - xyValues.x);
            this.y1 = this.y1 - (this.prevValue.y - xyValues.y);
            this.y2 = this.y2 - (this.prevValue.y - xyValues.y);
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
        else if (this.adornerDraggingPoint === AnnotationBase_1.EDraggingGripPoint.x2y1) {
            if (this.resizeDirections === XyDirection_1.EXyDirection.XDirection) {
                this.x2 -= this.prevValue.x - xyValues.x;
            }
            else if (this.resizeDirections === XyDirection_1.EXyDirection.YDirection) {
                this.y1 -= this.prevValue.y - xyValues.y;
            }
            else {
                this.x2 -= this.prevValue.x - xyValues.x;
                this.y1 -= this.prevValue.y - xyValues.y;
            }
        }
        else if (this.adornerDraggingPoint === AnnotationBase_1.EDraggingGripPoint.x1y2) {
            if (this.resizeDirections === XyDirection_1.EXyDirection.XDirection) {
                this.x1 -= this.prevValue.x - xyValues.x;
            }
            else if (this.resizeDirections === XyDirection_1.EXyDirection.YDirection) {
                this.y2 -= this.prevValue.y - xyValues.y;
            }
            else {
                this.x1 -= this.prevValue.x - xyValues.x;
                this.y2 -= this.prevValue.y - xyValues.y;
            }
        }
        this.prevValue = xyValues;
    };
    BoxAnnotation.prototype.onDpiChanged = function (args) {
        _super.prototype.onDpiChanged.call(this, args);
        this.notifyPropertyChanged(constants_1.PROPERTY.STROKE);
    };
    BoxAnnotation.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            fill: this.fill,
            stroke: this.stroke,
            strokeThickness: this.strokeThickness
        };
        Object.assign(json.options, options);
        return json;
    };
    BoxAnnotation.prototype.checkIsClickedOnAnnotationInternal = function (x, y) {
        var _a = this.getAnnotationBorders(true), x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
        return (0, pointUtil_1.testIsInBounds)(x, y, x1, y2, x2, y1);
    };
    BoxAnnotation.prototype.notifyPropertyChanged = function (propertyName) {
        _super.prototype.notifyPropertyChanged.call(this, propertyName);
        var strokePenRelatedProperties = [
            constants_1.PROPERTY.STROKE,
            constants_1.PROPERTY.STROKE_THICKNESS,
            constants_1.PROPERTY.STROKE_DASH_ARRAY,
            constants_1.PROPERTY.OPACITY
        ];
        if (this.strokePenCache && strokePenRelatedProperties.includes(propertyName)) {
            (0, Pen2DCache_1.createPenInCache)(this.strokePenCache, this.stroke, this.strokeThickness, this.opacity);
        }
        var fillBrushRelatedProperties = [constants_1.PROPERTY.FILL, constants_1.PROPERTY.OPACITY];
        if (this.fillBrushCache && fillBrushRelatedProperties.includes(propertyName)) {
            (0, BrushCache_1.createBrushInCache)(this.fillBrushCache, this.fill, this.opacity);
        }
    };
    BoxAnnotation.prototype.updateAdornerInner = function () {
        this.deleteAdorner();
        if (this.isSelected) {
            var _a = this.getAdornerAnnotationBorders(true, true), x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
            var svgString = this.svgStringAdornerTemplate(x1, y1, x2, y2);
            this.svgAdorner = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgAdornerRoot);
        }
    };
    BoxAnnotation.prototype.svgStringAdornerTemplate = function (x1, y1, x2, y2) {
        var colorLine = this.selectionBoxStroke;
        var width = x2 - x1;
        var height = y2 - y1;
        var svg = "<svg xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"".concat(x1, "\" y=\"").concat(y1, "\" width=\"").concat(width, "\" height=\"").concat(height, "\" stroke=\"").concat(colorLine, "\" stroke-width=\"").concat(this.selectionBoxThickness, "px\" fill=\"none\" />\n        ");
        var grips = this.getAdornerAnnotationBorders(false, true);
        if (this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x1y1)) {
            svg += this.getAnnotationGripSvg(grips.x1, grips.y1);
        }
        if (this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x2y2)) {
            svg += this.getAnnotationGripSvg(grips.x2, grips.y2);
        }
        if (this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x2y1)) {
            svg += this.getAnnotationGripSvg(grips.x2, grips.y1);
        }
        if (this.canDragPoint(AnnotationBase_1.EDraggingGripPoint.x1y2)) {
            svg += this.getAnnotationGripSvg(grips.x1, grips.y2);
        }
        svg += "</svg>";
        return svg;
    };
    BoxAnnotation.prototype.drawWithProvider = function (renderContext, linesPen, fillBrush, xCalc, yCalc, rect, viewRect) {
        var webAssemblyContext = this.parentSurface.webAssemblyContext2D;
        var args = new webAssemblyContext.SCRTColumnDrawingParams();
        args.forceShaderMethod = true;
        args.verticalChart = this.isVerticalChart;
        args.zeroLineY = this.isVerticalChart ? yCalc.getDataValue(rect.left) : yCalc.getDataValue(rect.bottom);
        args.columnWidth = this.isVerticalChart ? rect.height : rect.width;
        // ISSUE: If the strokeThickness property is not provided,
        // the fill will be disappeared with large zoom (when the column width will be small or zero)
        // if (args.columnWidth === 0 && this.strokeThickness === 0) {
        //     strokePenCache = this.strokePenFillColoredCache;
        // }
        if (linesPen) {
            args.SetLinesPen(linesPen);
        }
        if (fillBrush) {
            args.SetFillBrush(fillBrush);
        }
        args.viewportWidth = viewRect.width;
        args.viewportHeight = viewRect.height;
        var xMid = this.isVerticalChart ? (rect.top + rect.bottom) / 2 : (rect.left + rect.right) / 2;
        var xVal = xCalc.getDataValue(xMid);
        var xValues = new webAssemblyContext.SCRTDoubleVector();
        xValues.push_back(xVal);
        var yVal = this.isVerticalChart ? yCalc.getDataValue(rect.right) : yCalc.getDataValue(rect.top);
        var yValues = new webAssemblyContext.SCRTDoubleVector();
        yValues.push_back(yVal);
        args.count = yValues.size();
        var nativeContext = renderContext.getNativeContext();
        nativeContext.PushMatrix();
        nativeContext.PushState();
        nativeContext.Translate(viewRect.x, viewRect.y);
        nativeContext.SetClipRect(viewRect.x, viewRect.y, viewRect.width, viewRect.height);
        this.nativeDrawingProvider.DrawPointsVec(nativeContext, xValues, yValues, xCalc.nativeCalculator, yCalc.nativeCalculator, args);
        nativeContext.PopMatrix();
        nativeContext.PopState();
        xValues.delete();
        yValues.delete();
        args.delete();
    };
    return BoxAnnotation;
}(RenderContextAnnotationBase_1.RenderContextAnnotationBase));
exports.BoxAnnotation = BoxAnnotation;
