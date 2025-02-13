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
exports.AxisMarkerAnnotation = void 0;
var Guard_1 = require("../../../Core/Guard");
var Point_1 = require("../../../Core/Point");
var pointUtil_1 = require("../../../utils/pointUtil");
var translate_1 = require("../../../utils/translate");
var drawLabel_1 = require("../Helpers/drawLabel");
var DpiHelper_1 = require("../TextureManager/DpiHelper");
var AnnotationBase_1 = require("./AnnotationBase");
var annotationHelpers_1 = require("./annotationHelpers");
var constants_1 = require("./constants");
var IAnnotation_1 = require("./IAnnotation");
var RenderContextAnnotationBase_1 = require("./RenderContextAnnotationBase");
/**
 * @summary The {@link AxisMarkerAnnotation} provides an {@link AnnotationBase | Annotation} which draws a marker at
 * specified value on the axis over the {@link SciChartSurface}
 * @description
 * To add a {@link AxisMarkerAnnotation} to a {@link SciChartSurface}, use the following code:
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * const AxisMarkerAnnotation = new AxisMarkerAnnotation( { y1: 3, backgroundColor: "#FF000077", color: "#FF0000"});
 * sciChartSurface.annotations.add(AxisMarkerAnnotation);
 * ```
 * @remarks Uses the fast WebGL/WebAssembly {@link WebGL2RenderingContext} for rendering
 */
var AxisMarkerAnnotation = /** @class */ (function (_super) {
    __extends(AxisMarkerAnnotation, _super);
    /**
     * Create an instance of a AxisMarkerAnnotation
     * @param options Optional parameters of type {@link IAxisMarkerAnnotationOptions} which configure the annotation upon construction
     */
    function AxisMarkerAnnotation(options) {
        var _this = this;
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        _this = _super.call(this, options) || this;
        /** @inheritDoc */
        _this.type = IAnnotation_1.EAnnotationType.RenderContextAxisMarkerAnnotation;
        _this.fontSizeProperty = 14;
        _this.fontFamilyProperty = "Arial";
        _this.fontWeightProperty = "Normal";
        _this.fontStyleProperty = "Normal";
        _this.colorProperty = "#FFFFFF";
        _this.backgroundColorProperty = "#b36200";
        _this.fontSizeProperty = (_a = options === null || options === void 0 ? void 0 : options.fontSize) !== null && _a !== void 0 ? _a : _this.fontSizeProperty;
        _this.fontFamilyProperty = (_b = options === null || options === void 0 ? void 0 : options.fontFamily) !== null && _b !== void 0 ? _b : _this.fontFamilyProperty;
        _this.fontWeightProperty = (_c = options === null || options === void 0 ? void 0 : options.fontWeight) !== null && _c !== void 0 ? _c : _this.fontWeightProperty;
        _this.fontStyleProperty = (_d = options === null || options === void 0 ? void 0 : options.fontStyle) !== null && _d !== void 0 ? _d : _this.fontStyleProperty;
        _this.colorProperty = (_e = options === null || options === void 0 ? void 0 : options.color) !== null && _e !== void 0 ? _e : _this.colorProperty;
        _this.paddingProperty = (_f = options === null || options === void 0 ? void 0 : options.padding) !== null && _f !== void 0 ? _f : _this.paddingProperty;
        _this.backgroundColorProperty = (_g = options === null || options === void 0 ? void 0 : options.backgroundColor) !== null && _g !== void 0 ? _g : _this.backgroundColorProperty;
        _this.formattedValueProperty = (_h = options === null || options === void 0 ? void 0 : options.formattedValue) !== null && _h !== void 0 ? _h : _this.formattedValueProperty;
        _this.imageProperty = (_j = options === null || options === void 0 ? void 0 : options.image) !== null && _j !== void 0 ? _j : _this.imageProperty;
        _this.imageWidthProperty = (_k = options === null || options === void 0 ? void 0 : options.imageWidth) !== null && _k !== void 0 ? _k : _this.imageWidthProperty;
        _this.imageHeightProperty = (_l = options === null || options === void 0 ? void 0 : options.imageHeight) !== null && _l !== void 0 ? _l : _this.imageHeightProperty;
        if (options === null || options === void 0 ? void 0 : options.x1) {
            _this.x1 = options.x1;
        }
        if (options === null || options === void 0 ? void 0 : options.x2) {
            _this.x2 = options.x2;
        }
        if (options === null || options === void 0 ? void 0 : options.y2) {
            _this.y2 = options.y2;
        }
        return _this;
    }
    /** @inheritDoc */
    AxisMarkerAnnotation.prototype.delete = function () { };
    Object.defineProperty(AxisMarkerAnnotation.prototype, "y2", {
        /**
         * y2 property is not supported for AxisMarkerAnnotation
         */
        get: function () {
            throw Error("y2 property is not supported for AxisMarkerAnnotation");
        },
        /**
         * y2 property is not supported for AxisMarkerAnnotation
         */
        set: function (y2) {
            throw Error("y2 property is not supported for AxisMarkerAnnotation");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisMarkerAnnotation.prototype, "x2", {
        /**
         * x2 property is not supported for AxisMarkerAnnotation
         */
        get: function () {
            throw Error("x2 property is not supported for AxisMarkerAnnotation");
        },
        /**
         * x2 property is not supported for AxisMarkerAnnotation
         */
        set: function (x2) {
            throw Error("x2 property is not supported for AxisMarkerAnnotation");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisMarkerAnnotation.prototype, "backgroundColor", {
        /**
         * Gets the color of the background of the {@link AxisMarkerAnnotation} as an HTML Color code
         */
        get: function () {
            return this.backgroundColorProperty;
        },
        /**
         * Sets the color of the background of the {@link AxisMarkerAnnotation} as an HTML Color code
         */
        set: function (value) {
            this.backgroundColorProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.BACKGROUND_COLOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisMarkerAnnotation.prototype, "color", {
        /**
         * Gets the color of the {@link AxisMarkerAnnotation} as an HTML Color code
         */
        get: function () {
            return this.colorProperty;
        },
        /**
         * Sets the color of the {@link AxisMarkerAnnotation} as an HTML Color code
         */
        set: function (value) {
            this.colorProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.COLOR);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisMarkerAnnotation.prototype, "fontSize", {
        /**
         * Gets the fontSize of the {@link AxisMarkerAnnotation}
         */
        get: function () {
            return this.fontSizeProperty;
        },
        /**
         * Sets the fontSize of the {@link AxisMarkerAnnotation}
         */
        set: function (value) {
            this.fontSizeProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.FONT_SIZE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisMarkerAnnotation.prototype, "fontFamily", {
        /**
         * Gets the fontFamily of the {@link AxisMarkerAnnotation}
         */
        get: function () {
            return this.fontFamilyProperty;
        },
        /**
         * Sets the fontFamily of the {@link AxisMarkerAnnotation}
         */
        set: function (value) {
            this.fontFamilyProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.FONT_FAMILY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisMarkerAnnotation.prototype, "fontWeight", {
        /**
         * Gets the fontWeight of the {@link AxisMarkerAnnotation}
         */
        get: function () {
            return this.fontWeightProperty;
        },
        /**
         * Sets the fontWeight of the {@link AxisMarkerAnnotation}
         */
        set: function (value) {
            this.fontWeightProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.FONT_WEIGHT);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisMarkerAnnotation.prototype, "fontStyle", {
        /**
         * Gets the fontStyle of the {@link AxisMarkerAnnotation}
         */
        get: function () {
            return this.fontStyleProperty;
        },
        /**
         * Sets the fontStyle of the {@link AxisMarkerAnnotation}
         */
        set: function (value) {
            this.fontStyleProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.FONT_STYLE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisMarkerAnnotation.prototype, "padding", {
        /**
         * Gets the padding of the {@link AxisMarkerAnnotation}
         */
        get: function () {
            return this.paddingProperty;
        },
        /**
         * Sets the padding of the {@link AxisMarkerAnnotation}
         */
        set: function (value) {
            this.paddingProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.PADDING);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisMarkerAnnotation.prototype, "formattedValue", {
        /**
         * Gets the formattedValue of the {@link AxisMarkerAnnotation}
         */
        get: function () {
            return this.formattedValueProperty;
        },
        /**
         * Sets the formattedValue of the {@link AxisMarkerAnnotation}
         */
        set: function (value) {
            this.formattedValueProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.FORMATTED_VALUE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisMarkerAnnotation.prototype, "image", {
        /**
         * Gets or sets the image to draw as an annotation {@link HTMLImageElement}
         */
        get: function () {
            return this.imageProperty;
        },
        /**
         * Gets or sets the image to draw as an annotation {@link HTMLImageElement}
         */
        set: function (image) {
            this.imageProperty = image;
            this.notifyPropertyChanged(constants_1.PROPERTY.IMAGE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisMarkerAnnotation.prototype, "imageWidth", {
        /**
         * Gets or sets the image width
         */
        get: function () {
            return this.imageWidthProperty;
        },
        /**
         * Gets or sets the image width
         */
        set: function (value) {
            this.imageWidthProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.IMAGE_WIDTH);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AxisMarkerAnnotation.prototype, "imageHeight", {
        /**
         * Gets or sets the image height
         */
        get: function () {
            return this.imageHeightProperty;
        },
        /**
         * Gets or sets the image height
         */
        set: function (value) {
            this.imageHeightProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.IMAGE_HEIGHT);
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    AxisMarkerAnnotation.prototype.drawWithContext = function (renderContext, xCalc, yCalc, viewRect) {
        Guard_1.Guard.notNull(renderContext, "renderContext");
        Guard_1.Guard.notNull(xCalc, "xCalc");
        Guard_1.Guard.notNull(yCalc, "yCalc");
        var x1Coord = this.getX1Coordinate(xCalc, yCalc);
        var y1Coord = this.getY1Coordinate(xCalc, yCalc);
        var isNil = function (obj) { return obj === undefined || obj === null; };
        var isX1CoordinateUndefined = isNil(this.x1);
        var markerDataValue = isX1CoordinateUndefined ? this.y1 : this.x1;
        Guard_1.Guard.argumentIsRealNumber(markerDataValue, "x1 or y1");
        var xAxisId = this.xAxisId;
        var xAxis = this.parentSurface.getXAxisById(xAxisId);
        var yAxisId = this.yAxisId;
        var yAxis = this.parentSurface.getYAxisById(yAxisId);
        var axisWithMarker = isX1CoordinateUndefined ? yAxis : xAxis;
        if (!axisWithMarker || axisWithMarker.isVisible === false)
            return;
        var coordinateMode = isX1CoordinateUndefined ? this.yCoordinateMode : this.xCoordinateMode;
        var coordinateCalculator = isX1CoordinateUndefined ? yCalc : xCalc;
        var annotationAbsoluteCoord = this.getCoordinate(markerDataValue, coordinateCalculator, coordinateMode);
        var isAxisLabelInVisibleRange = axisWithMarker.isHorizontalAxis
            ? annotationAbsoluteCoord >= 0 &&
                annotationAbsoluteCoord <= axisWithMarker.parentSurface.seriesViewRect.width
            : annotationAbsoluteCoord >= 0 &&
                annotationAbsoluteCoord <= axisWithMarker.parentSurface.seriesViewRect.height;
        if (isAxisLabelInVisibleRange) {
            var textStyle = {
                fontFamily: this.fontFamilyProperty,
                fontSize: this.fontSizeProperty * DpiHelper_1.DpiHelper.PIXEL_RATIO,
                fontStyle: this.fontStyleProperty,
                color: this.colorProperty
            };
            var res = (0, drawLabel_1.drawAxisMarkerAnnotation)(axisWithMarker, renderContext, this.formattedValueProperty, annotationAbsoluteCoord, x1Coord, y1Coord, textStyle, this.backgroundColorProperty, this.opacity, this.image, this.imageWidth, this.imageHeight);
            var point1 = (0, translate_1.translateFromCanvasToSeriesViewRect)(new Point_1.Point(res.xPosition, res.yPosition), viewRect, true);
            var point2 = (0, translate_1.translateFromCanvasToSeriesViewRect)(new Point_1.Point(res.xPosition + res.textureWidth, res.yPosition + res.textureHeight), viewRect, true);
            this.setAnnotationBorders(point1.x, point2.x, point1.y, point2.y);
            this.updateAdornerInner();
        }
        else {
            this.deleteAdorner();
        }
    };
    AxisMarkerAnnotation.prototype.onDragStarted = function (args) {
        _super.prototype.onDragStarted.call(this, args);
        var _a = this.calculateAdornerCenter(), x = _a.x, y = _a.y;
        var xyMousePoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(new Point_1.Point(args.mousePoint.x, args.mousePoint.y), this.parentSurface.seriesViewRect, true);
        var xyAdorner = (0, translate_1.translateFromCanvasToSeriesViewRect)(new Point_1.Point(x * DpiHelper_1.DpiHelper.PIXEL_RATIO, y * DpiHelper_1.DpiHelper.PIXEL_RATIO), this.parentSurface.seriesViewRect, true);
        if (xyMousePoint) {
            if (xyAdorner) {
                var dist = (0, pointUtil_1.calcDistance)(xyAdorner.x, xyAdorner.y, xyMousePoint.x, xyMousePoint.y);
                if (dist < this.annotationsGripsRadius * DpiHelper_1.DpiHelper.PIXEL_RATIO) {
                    this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.x1y1;
                    return true;
                }
            }
            if (this.clickToSelect(args)) {
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.Body;
                return true;
            }
        }
        return false;
    };
    AxisMarkerAnnotation.prototype.calcDragDistance = function (xyValues) {
        if (!this.prevValue) {
            this.prevValue = xyValues;
            return;
        }
        if (this.x1 !== undefined) {
            this.x1 -= this.prevValue.x - xyValues.x;
        }
        else if (this.y1 !== undefined) {
            this.y1 -= this.prevValue.y - xyValues.y;
        }
        this.prevValue = xyValues;
    };
    AxisMarkerAnnotation.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            backgroundColor: this.backgroundColor,
            color: this.color,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            fontStyle: this.fontStyle,
            fontWeight: this.fontWeight,
            formattedValue: this.formattedValue,
            padding: this.padding
        };
        Object.assign(json.options, options);
        return json;
    };
    AxisMarkerAnnotation.prototype.checkIsClickedOnAnnotationInternal = function (x, y) {
        var _a = this.getAnnotationBorders(true), x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
        return (0, pointUtil_1.testIsInBounds)(x, y, x1, y2, x2, y1);
    };
    AxisMarkerAnnotation.prototype.updateAdornerInner = function () {
        this.deleteAdorner();
        if (this.isSelected) {
            var _a = this.getAdornerAnnotationBorders(true, true), x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
            var svgString = this.svgStringAdornerTemplate(x1, y1, x2, y2);
            this.svgAdorner = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgAdornerRoot);
        }
    };
    AxisMarkerAnnotation.prototype.svgStringAdornerTemplate = function (x1, y1, x2, y2) {
        var colorLine = this.selectionBoxStroke;
        var _a = this.calculateAdornerCenter(), x = _a.x, y = _a.y;
        var width = x2 - x1;
        var height = y2 - y1;
        return "<svg xmlns=\"http://www.w3.org/2000/svg\">\n        <rect x=\"".concat(x1, "\" y=\"").concat(y1, "\" width=\"").concat(width, "\" height=\"").concat(height, "\" stroke=\"").concat(colorLine, "\" stroke-width=\"").concat(this.selectionBoxThickness, "px\" fill=\"none\" />\n        ").concat(this.getAnnotationGripSvg(x, y), "\n        </svg>");
    };
    /**
     * Calculates the adorner center relative to the canvas,
     * The coordinates are not scaled
     * @private
     */
    AxisMarkerAnnotation.prototype.calculateAdornerCenter = function () {
        var _a = this.getAdornerAnnotationBorders(), x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
        var x = Math.abs((x1 + x2) / 2);
        var y = Math.abs((y1 + y2) / 2);
        return { x: x, y: y };
    };
    return AxisMarkerAnnotation;
}(RenderContextAnnotationBase_1.RenderContextAnnotationBase));
exports.AxisMarkerAnnotation = AxisMarkerAnnotation;
