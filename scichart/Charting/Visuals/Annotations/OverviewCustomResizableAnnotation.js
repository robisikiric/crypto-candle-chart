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
exports.OverviewCustomResizableAnnotation = void 0;
var Point_1 = require("../../../Core/Point");
var XyDirection_1 = require("../../../types/XyDirection");
var pointUtil_1 = require("../../../utils/pointUtil");
var translate_1 = require("../../../utils/translate");
var DpiHelper_1 = require("../TextureManager/DpiHelper");
var AnnotationBase_1 = require("./AnnotationBase");
var annotationHelpers_1 = require("./annotationHelpers");
var constants_1 = require("./constants");
var CustomAnnotation_1 = require("./CustomAnnotation");
/**
 * A OverviewCustomResizableAnnotation presents SVG information over the chart at specific {@link X1}, {@link Y1}, {@link X2}, {@link Y2} coordinates.
 * @remarks The annotation can be moved or resized up to the limits set by minWidth/minHeight properties and axis visible range
 */
var OverviewCustomResizableAnnotation = /** @class */ (function (_super) {
    __extends(OverviewCustomResizableAnnotation, _super);
    function OverviewCustomResizableAnnotation(options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, options) || this;
        _this.minWidthProperty = 10;
        _this.minHeightProperty = 10;
        _this.adornerSvgStringTemplateProperty =
            (_a = options === null || options === void 0 ? void 0 : options.adornerSvgStringTemplate) !== null && _a !== void 0 ? _a : _this.adornerSvgStringTemplateProperty;
        _this.minWidthProperty = (_b = options === null || options === void 0 ? void 0 : options.minWidth) !== null && _b !== void 0 ? _b : _this.minWidthProperty;
        _this.minHeightProperty = (_c = options === null || options === void 0 ? void 0 : options.minHeight) !== null && _c !== void 0 ? _c : _this.minHeightProperty;
        return _this;
    }
    Object.defineProperty(OverviewCustomResizableAnnotation.prototype, "minWidth", {
        /**
         * Gets or sets the minimum width of the annotation
         */
        get: function () {
            return this.minWidthProperty;
        },
        /**
         * Gets or sets the minimum width of the annotation
         */
        set: function (value) {
            this.minWidthProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.MINIMUM_WIDTH);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverviewCustomResizableAnnotation.prototype, "minHeight", {
        /**
         * Gets or sets the minimum width of the annotation
         */
        get: function () {
            return this.minHeightProperty;
        },
        /**
         * Gets or sets the minimum width of the annotation
         */
        set: function (value) {
            this.minHeightProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.MINIMUM_HEIGHT);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OverviewCustomResizableAnnotation.prototype, "adornerSvgStringTemplate", {
        /**
         * Gets or sets the SVG template of the annotation adorner
         */
        get: function () {
            return this.adornerSvgStringTemplateProperty;
        },
        /**
         * Gets or sets the SVG template of the annotation adorner
         */
        set: function (value) {
            this.adornerSvgStringTemplateProperty = value;
            this.notifyPropertyChanged(constants_1.PROPERTY.ADORNER_TEMPLATE);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Updates the annotation position and size while maintaining limits set by minWidth and minHeight
     * @param coordinates an object with the coordinates - {x1, x2, y1, y2}
     */
    OverviewCustomResizableAnnotation.prototype.setCoordinates = function (coordinates) {
        // Overview Annotation should be resized only if attached
        // since the new coordinates are validated accordingly to the size limits
        if (!this.parentSurface) {
            return;
        }
        var _a = coordinates.x1, expectedX1 = _a === void 0 ? this.x1 : _a, _b = coordinates.x2, expectedX2 = _b === void 0 ? this.x2 : _b, _c = coordinates.y1, expectedY1 = _c === void 0 ? this.y1 : _c, _d = coordinates.y2, expectedY2 = _d === void 0 ? this.y2 : _d;
        var expectedAbsoluteX1Y1Point = this.getAbsoluteCoordinates(new Point_1.Point(expectedX1, expectedY1));
        var expectedAbsoluteX2Y2Point = this.getAbsoluteCoordinates(new Point_1.Point(expectedX2, expectedY2));
        var xAxis = this.parentSurface.getXAxisById(this.xAxisId);
        var xCalc = xAxis.getCurrentCoordinateCalculator();
        var yAxis = this.parentSurface.getYAxisById(this.yAxisId);
        var yCalc = yAxis.getCurrentCoordinateCalculator();
        var horizontalCalc = xAxis.isHorizontalAxis ? xCalc : yCalc;
        var verticalCalc = yAxis.isHorizontalAxis ? xCalc : yCalc;
        var rightEdgeCoordValue = horizontalCalc.hasFlippedCoordinates ? expectedX1 : expectedX2;
        var leftEdgeCoordValue = horizontalCalc.hasFlippedCoordinates ? expectedX2 : expectedX1;
        var topEdgeCoordValue = verticalCalc.hasFlippedCoordinates ? expectedX1 : expectedX2;
        var bottomEdgeCoordValue = verticalCalc.hasFlippedCoordinates ? expectedX2 : expectedX1;
        var topRightPoint = this.isVerticalChart
            ? new Point_1.Point(topEdgeCoordValue, rightEdgeCoordValue)
            : new Point_1.Point(rightEdgeCoordValue, topEdgeCoordValue);
        var bottomLeftPoint = this.isVerticalChart
            ? new Point_1.Point(bottomEdgeCoordValue, leftEdgeCoordValue)
            : new Point_1.Point(leftEdgeCoordValue, bottomEdgeCoordValue);
        // adjust coordinates if they don't fit size limits
        if (xAxis.isHorizontalAxis) {
            if (expectedX1 - this.x1 >= this.x2 - expectedX2) {
                // the annotation is being moved to the right
                this.x2 = expectedX2 !== null && expectedX2 !== void 0 ? expectedX2 : this.x2;
                if (xCalc.hasFlippedCoordinates) {
                    this.adjustLeftSideToLimits(expectedAbsoluteX2Y2Point.x, topRightPoint, xCalc);
                }
                else {
                    this.adjustRightSideToLimits(expectedAbsoluteX2Y2Point.x, bottomLeftPoint, xCalc);
                }
            }
            else {
                // the annotation is being moved to the left
                this.x1 = expectedX1 !== null && expectedX1 !== void 0 ? expectedX1 : this.x1;
                if (xCalc.hasFlippedCoordinates) {
                    this.adjustRightSideToLimits(expectedAbsoluteX1Y1Point.x, bottomLeftPoint, xCalc);
                }
                else {
                    this.adjustLeftSideToLimits(expectedAbsoluteX1Y1Point.x, topRightPoint, xCalc);
                }
            }
        }
        else {
            if (expectedX1 - this.x1 >= this.x2 - expectedX2) {
                // the annotation is being moved to the top
                this.x2 = expectedX2 !== null && expectedX2 !== void 0 ? expectedX2 : this.x2;
                if (xCalc.hasFlippedCoordinates) {
                    this.adjustTopSideToLimits(expectedAbsoluteX2Y2Point.y, topRightPoint, xCalc);
                }
                else {
                    this.adjustBottomSideToLimits(expectedAbsoluteX2Y2Point.y, bottomLeftPoint, xCalc);
                }
            }
            else {
                // the annotation is being moved to the bottom
                this.x1 = expectedX1 !== null && expectedX1 !== void 0 ? expectedX1 : this.x1;
                if (xCalc.hasFlippedCoordinates) {
                    this.adjustBottomSideToLimits(expectedAbsoluteX1Y1Point.y, bottomLeftPoint, xCalc);
                }
                else {
                    this.adjustTopSideToLimits(expectedAbsoluteX1Y1Point.y, topRightPoint, xCalc);
                }
            }
        }
    };
    /**
     * Calculates current dragging point. Defines logic of grip points placement
     * @param args {@link ModifierMouseArgs}
     */
    OverviewCustomResizableAnnotation.prototype.onDragStarted = function (args) {
        var _a;
        // handles default browser dragging behavior when canvas was selected with Ctrl + A
        args.nativeEvent.preventDefault();
        (_a = this.dragStarted) === null || _a === void 0 ? void 0 : _a.raiseEvent();
        var _b = this.getAnnotationBorders(true), x1 = _b.x1, x2 = _b.x2, y1 = _b.y1, y2 = _b.y2;
        var xyMousePoint = (0, translate_1.translateFromCanvasToSeriesViewRect)(new Point_1.Point(args.mousePoint.x, args.mousePoint.y), this.parentSurface.seriesViewRect, true);
        if (!xyMousePoint) {
            return false;
        }
        var xMousePoint = (0, translate_1.translateToNotScaled)(xyMousePoint.x);
        var yMousePoint = (0, translate_1.translateToNotScaled)(xyMousePoint.y);
        var isResizableHorizontally = this.isVerticalChart
            ? this.resizeDirections !== XyDirection_1.EXyDirection.XDirection
            : this.resizeDirections !== XyDirection_1.EXyDirection.YDirection;
        var isResizableVertically = this.isVerticalChart
            ? this.resizeDirections !== XyDirection_1.EXyDirection.YDirection
            : this.resizeDirections !== XyDirection_1.EXyDirection.XDirection;
        if (isResizableHorizontally) {
            // Left
            if ((0, pointUtil_1.testIsInBounds)(xMousePoint, yMousePoint, x1 - constants_1.ADORNER_GRIP_RADIUS, y2, x1 + constants_1.ADORNER_GRIP_RADIUS, y1)) {
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.x1y1;
                return true;
            }
            else if ((0, pointUtil_1.testIsInBounds)(xMousePoint, yMousePoint, x2 - constants_1.ADORNER_GRIP_RADIUS, y2, x2 + constants_1.ADORNER_GRIP_RADIUS, y1)) {
                // Right
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.x2y2;
                return true;
            }
        }
        // Top
        if (isResizableVertically) {
            if ((0, pointUtil_1.testIsInBounds)(xMousePoint, yMousePoint, x1, y1 + constants_1.ADORNER_GRIP_RADIUS, x2, y1 - constants_1.ADORNER_GRIP_RADIUS)) {
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.x2y1;
                return true;
            }
            else if ((0, pointUtil_1.testIsInBounds)(xMousePoint, yMousePoint, x1, y2 + constants_1.ADORNER_GRIP_RADIUS, x2, y2 - constants_1.ADORNER_GRIP_RADIUS)) {
                // Bottom
                this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.x1y2;
                return true;
            }
        }
        if (this.clickToSelect(args)) {
            this.adornerDraggingPoint = AnnotationBase_1.EDraggingGripPoint.Body;
            return true;
        }
        return false;
    };
    /**
     * Updates the annotation position, with the {@link CoordinateCalculatorBase | Coordinate Calculators} passed in
     * @param xCalc The XAxis {@link CoordinateCalculatorBase | CoordinateCalculator} applied to this annotation
     * @param yCalc The YAxis {@link CoordinateCalculatorBase | CoordinateCalculator} applied to this annotation
     * @param xCoordSvgTrans X-coordinate translation which is needed to use SVG canvas having the whole chart size
     * @param yCoordSvgTrans Y-coordinate translation which is needed to use SVG canvas having the whole chart size
     */
    OverviewCustomResizableAnnotation.prototype.update = function (xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans) {
        // create svg if there is none
        this.create(xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans);
        this.svg.style.display = this.isHidden ? "none" : "block";
        this.svg.style.opacity = this.opacity.toString();
        var x1Coord = this.getX1Coordinate(xCalc, yCalc);
        var y1Coord = this.getY1Coordinate(xCalc, yCalc);
        var x2Coord = this.getX2Coordinate(xCalc, yCalc);
        var y2Coord = this.getY2Coordinate(xCalc, yCalc);
        this.setAnnotationBorders(x1Coord, x2Coord, y1Coord, y2Coord);
        if (isNaN(x1Coord) ||
            isNaN(y1Coord) ||
            !isFinite(x1Coord) ||
            !isFinite(y1Coord) ||
            isNaN(x2Coord) ||
            isNaN(y2Coord) ||
            !isFinite(x2Coord) ||
            !isFinite(y2Coord)) {
            this.svg.style.display = "none";
        }
        else {
            // calculate and adjust size accordingly to coordinates
            var width = Math.abs(x2Coord - x1Coord);
            var height = Math.abs(y2Coord - y1Coord);
            var svgXCoord = (x1Coord < x2Coord ? x1Coord : x2Coord) + xCoordSvgTrans;
            var svgYCoord = (y1Coord < y2Coord ? y1Coord : y2Coord) + yCoordSvgTrans;
            this.setSvgAttribute("x", svgXCoord);
            this.setSvgAttribute("y", svgYCoord);
            this.setSvgAttribute("width", width);
            this.setSvgAttribute("height", height);
            this.svgDOMRect = this.svg.getBoundingClientRect();
        }
        this.updateAdornerInner();
    };
    /**
     * Handles the dragging event. Updates the coordinates after dragging or resizing
     * @param xyValues {@link Point}
     */
    OverviewCustomResizableAnnotation.prototype.calcDragDistance = function (xyValues) {
        var xAxis = this.parentSurface.getXAxisById(this.xAxisId);
        var xCalc = xAxis.getCurrentCoordinateCalculator();
        var yAxis = this.parentSurface.getYAxisById(this.yAxisId);
        var yCalc = yAxis.getCurrentCoordinateCalculator();
        var horizontalCalc = xAxis.isHorizontalAxis ? xCalc : yCalc;
        var verticalCalc = yAxis.isHorizontalAxis ? xCalc : yCalc;
        var x1Coord = this.getX1Coordinate(xCalc, yCalc);
        var y1Coord = this.getY1Coordinate(xCalc, yCalc);
        var x2Coord = this.getX2Coordinate(xCalc, yCalc);
        var y2Coord = this.getY2Coordinate(xCalc, yCalc);
        var isResizableHorizontally = this.isVerticalChart
            ? this.resizeDirections !== XyDirection_1.EXyDirection.XDirection
            : this.resizeDirections !== XyDirection_1.EXyDirection.YDirection;
        var isResizableVertically = this.isVerticalChart
            ? this.resizeDirections !== XyDirection_1.EXyDirection.YDirection
            : this.resizeDirections !== XyDirection_1.EXyDirection.XDirection;
        switch (this.adornerDraggingPoint) {
            case AnnotationBase_1.EDraggingGripPoint.Body: {
                if (!this.prevValue) {
                    this.prevValue = xyValues;
                    return;
                }
                // expected coordinates
                var x1 = this.x1 - (this.prevValue.x - xyValues.x);
                var x2 = this.x2 - (this.prevValue.x - xyValues.x);
                var y1 = this.y1 - (this.prevValue.y - xyValues.y);
                var y2 = this.y2 - (this.prevValue.y - xyValues.y);
                // make sure annotation doesn't overflow the visible range
                if (this.resizeDirections !== XyDirection_1.EXyDirection.YDirection) {
                    if (x1 < xAxis.visibleRange.min) {
                        var diff = this.x1 - xAxis.visibleRange.min;
                        this.x1 = xAxis.visibleRange.min;
                        this.x2 = this.x2 - diff;
                    }
                    else if (x2 > xAxis.visibleRange.max) {
                        var diff = xAxis.visibleRange.max - this.x2;
                        this.x1 = this.x1 + diff;
                        this.x2 = xAxis.visibleRange.max;
                    }
                    else {
                        this.x1 = x1;
                        this.x2 = x2;
                    }
                }
                if (this.resizeDirections !== XyDirection_1.EXyDirection.XDirection) {
                    if (y2 > yAxis.visibleRange.max) {
                        var diff = this.y2 - yAxis.visibleRange.max;
                        this.y2 = yAxis.visibleRange.max;
                        this.y1 = this.y1 + diff;
                    }
                    else if (y1 < yAxis.visibleRange.min) {
                        var diff = this.y1 - yAxis.visibleRange.min;
                        this.y2 = this.y2 - diff;
                        this.y1 = yAxis.visibleRange.min;
                    }
                    else {
                        this.y1 = y1;
                        this.y2 = y2;
                    }
                }
                this.prevValue = xyValues;
                break;
            }
            // left grab point
            case AnnotationBase_1.EDraggingGripPoint.x1y1: {
                if (isResizableHorizontally) {
                    if (horizontalCalc.hasFlippedCoordinates) {
                        this.adjustLeftSideToLimits(x2Coord, xyValues, horizontalCalc);
                    }
                    else {
                        this.adjustLeftSideToLimits(x1Coord, xyValues, horizontalCalc);
                    }
                }
                break;
            }
            // Right grab point
            case AnnotationBase_1.EDraggingGripPoint.x2y2: {
                if (isResizableHorizontally) {
                    if (horizontalCalc.hasFlippedCoordinates) {
                        this.adjustRightSideToLimits(x1Coord, xyValues, horizontalCalc);
                    }
                    else {
                        this.adjustRightSideToLimits(x2Coord, xyValues, horizontalCalc);
                    }
                }
                break;
            }
            // Top grab point
            case AnnotationBase_1.EDraggingGripPoint.x2y1: {
                if (isResizableVertically) {
                    if (verticalCalc.hasFlippedCoordinates) {
                        this.adjustTopSideToLimits(y2Coord, xyValues, verticalCalc);
                    }
                    else {
                        this.adjustTopSideToLimits(y1Coord, xyValues, verticalCalc);
                    }
                }
                break;
            }
            // Bottom grab point
            case AnnotationBase_1.EDraggingGripPoint.x1y2: {
                if (isResizableVertically) {
                    if (verticalCalc.hasFlippedCoordinates) {
                        this.adjustBottomSideToLimits(y1Coord, xyValues, verticalCalc);
                    }
                    else {
                        this.adjustBottomSideToLimits(y2Coord, xyValues, verticalCalc);
                    }
                }
                break;
            }
            default:
                throw new Error("Unexpected adornerDraggingPoint value ".concat(this.adornerDraggingPoint));
        }
    };
    /**
     * @inheritDoc
     */
    OverviewCustomResizableAnnotation.prototype.create = function (xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans) {
        if (this.svg) {
            return;
        }
        this.setSvg(annotationHelpers_1.annotationHelpers.createSvg(this.svgString, this.svgRoot, this.nextSibling));
        // @ts-ignore
        var svgRect = this.svg.getBBox();
        var x1Coord = this.getX1Coordinate(xCalc, yCalc);
        var y1Coord = this.getY1Coordinate(xCalc, yCalc);
        // set default x2 and y2 values defined by the SVG size if custom ones are not set
        if (this.isVerticalChart) {
            if (this.x2 === undefined) {
                this.x2 = this.getValue(x1Coord + svgRect.width, xCalc, AnnotationBase_1.ECoordinateMode.Pixel);
            }
            if (this.y2 === undefined) {
                this.y2 = this.getValue(y1Coord + svgRect.height, yCalc, AnnotationBase_1.ECoordinateMode.Pixel);
            }
        }
        else {
            if (this.x2 === undefined) {
                this.x2 = this.getValue(y1Coord + svgRect.height, xCalc, AnnotationBase_1.ECoordinateMode.Pixel);
            }
            if (this.y2 === undefined) {
                this.y2 = this.getValue(x1Coord + svgRect.width, yCalc, AnnotationBase_1.ECoordinateMode.Pixel);
            }
        }
        var x2Coord = this.getX2Coordinate(xCalc, yCalc);
        var y2Coord = this.getY2Coordinate(xCalc, yCalc);
        // adjust svg to size limits
        var actualWidth = Math.abs(x2Coord - x1Coord);
        var actualHeight = Math.abs(y2Coord - y1Coord);
        if (this.isVerticalChart) {
            if (actualWidth < this.minWidth) {
                var horizontalCoordinateCalc = this.isVerticalChart ? yCalc : xCalc;
                this.y2 = this.getValue(x1Coord + this.minWidth, horizontalCoordinateCalc, AnnotationBase_1.ECoordinateMode.Pixel);
            }
            if (actualHeight < this.minHeight) {
                var verticalCoordinateCalc = this.isVerticalChart ? xCalc : yCalc;
                this.x2 = this.getValue(y1Coord + this.minHeight, verticalCoordinateCalc, AnnotationBase_1.ECoordinateMode.Pixel);
            }
        }
        else {
            if (actualWidth < this.minWidth) {
                var horizontalCoordinateCalc = this.isVerticalChart ? yCalc : xCalc;
                this.x2 = this.getValue(x1Coord + this.minWidth, horizontalCoordinateCalc, AnnotationBase_1.ECoordinateMode.Pixel);
            }
            if (actualHeight < this.minHeight) {
                var verticalCoordinateCalc = this.isVerticalChart ? xCalc : yCalc;
                this.y2 = this.getValue(y1Coord + this.minHeight, verticalCoordinateCalc, AnnotationBase_1.ECoordinateMode.Pixel);
            }
        }
    };
    /**
     * Creates or updates an adorner for the annotation
     */
    OverviewCustomResizableAnnotation.prototype.updateAdornerInner = function () {
        this.deleteAdorner();
        if (this.adornerSvgStringTemplate) {
            var _a = this.getAdornerAnnotationBorders(true), x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
            var svgString = this.adornerSvgStringTemplate(x1, y1, x2, y2);
            this.svgAdorner = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgAdornerRoot);
        }
    };
    OverviewCustomResizableAnnotation.prototype.checkIsClickedOnAnnotationInternal = function (x, y) {
        var _a = this.getAnnotationBorders(true), x1 = _a.x1, x2 = _a.x2, y1 = _a.y1, y2 = _a.y2;
        var xMousePoint = (0, translate_1.translateToNotScaled)(x);
        var yMousePoint = (0, translate_1.translateToNotScaled)(y);
        if ((0, pointUtil_1.testIsInBounds)(xMousePoint, yMousePoint, x1, y2, x2, y1)) {
            return true;
        }
        var isResizableHorizontally = this.isVerticalChart
            ? this.resizeDirections !== XyDirection_1.EXyDirection.XDirection
            : this.resizeDirections !== XyDirection_1.EXyDirection.YDirection;
        var isResizableVertically = this.isVerticalChart
            ? this.resizeDirections !== XyDirection_1.EXyDirection.YDirection
            : this.resizeDirections !== XyDirection_1.EXyDirection.XDirection;
        if (isResizableHorizontally) {
            // Left
            if ((0, pointUtil_1.testIsInBounds)(xMousePoint, yMousePoint, x1 - constants_1.ADORNER_GRIP_RADIUS, y2, x1 + constants_1.ADORNER_GRIP_RADIUS, y1)) {
                return true;
            }
            else if ((0, pointUtil_1.testIsInBounds)(xMousePoint, yMousePoint, x2 - constants_1.ADORNER_GRIP_RADIUS, y2, x2 + constants_1.ADORNER_GRIP_RADIUS, y1)) {
                // Right
                return true;
            }
        }
        // Top
        if (isResizableVertically) {
            if ((0, pointUtil_1.testIsInBounds)(xMousePoint, yMousePoint, x1, y1 + constants_1.ADORNER_GRIP_RADIUS, x2, y1 - constants_1.ADORNER_GRIP_RADIUS)) {
                return true;
            }
            else if ((0, pointUtil_1.testIsInBounds)(xMousePoint, yMousePoint, x1, y2 + constants_1.ADORNER_GRIP_RADIUS, x2, y2 - constants_1.ADORNER_GRIP_RADIUS)) {
                // Bottom
                return true;
            }
        }
        return false;
    };
    OverviewCustomResizableAnnotation.prototype.adjustLeftSideToLimits = function (x2Coord, expectedLeftPoint, horizontalCalc) {
        var expectedLeftCoord = this.getAbsoluteHorizontalCoordinate(this.isVerticalChart ? expectedLeftPoint.y : expectedLeftPoint.x);
        var expectedAbsoluteX1Coord = adjustToViewport(expectedLeftCoord, horizontalCalc);
        var satisfiesMinWidth = x2Coord - expectedAbsoluteX1Coord >= this.minWidth;
        var adjustedCoordinate = satisfiesMinWidth ? expectedAbsoluteX1Coord : x2Coord - this.minWidth;
        var adjustedCoordinateValue = this.convertFromCoordinate(adjustedCoordinate * DpiHelper_1.DpiHelper.PIXEL_RATIO, horizontalCalc, this.isVerticalChart ? this.yCoordinateMode : this.xCoordinateMode);
        if (this.isVerticalChart) {
            if (horizontalCalc.hasFlippedCoordinates) {
                this.y1 = adjustedCoordinateValue;
            }
            else {
                this.y2 = adjustedCoordinateValue;
            }
        }
        else {
            if (horizontalCalc.hasFlippedCoordinates) {
                this.x1 = adjustedCoordinateValue;
            }
            else {
                this.x2 = adjustedCoordinateValue;
            }
        }
    };
    OverviewCustomResizableAnnotation.prototype.adjustRightSideToLimits = function (x1Coord, expectedRightPoint, horizontalCalc) {
        var expectedRightCoord = this.getAbsoluteHorizontalCoordinate(this.isVerticalChart ? expectedRightPoint.y : expectedRightPoint.x);
        var expectedAbsoluteX2Coord = adjustToViewport(expectedRightCoord, horizontalCalc);
        var satisfiesMinWidth = expectedAbsoluteX2Coord - x1Coord >= this.minWidth;
        var adjustedCoordinate = satisfiesMinWidth ? expectedAbsoluteX2Coord : x1Coord + this.minWidth;
        var adjustedCoordinateValue = this.convertFromCoordinate(adjustedCoordinate * DpiHelper_1.DpiHelper.PIXEL_RATIO, horizontalCalc, this.isVerticalChart ? this.yCoordinateMode : this.xCoordinateMode);
        if (this.isVerticalChart) {
            if (horizontalCalc.hasFlippedCoordinates) {
                this.y2 = adjustedCoordinateValue;
            }
            else {
                this.y1 = adjustedCoordinateValue;
            }
        }
        else {
            if (horizontalCalc.hasFlippedCoordinates) {
                this.x2 = adjustedCoordinateValue;
            }
            else {
                this.x1 = adjustedCoordinateValue;
            }
        }
    };
    OverviewCustomResizableAnnotation.prototype.adjustTopSideToLimits = function (y2Coord, expectedTopPoint, verticalCalc) {
        var expectedTopCoord = this.getAbsoluteVerticalCoordinate(this.isVerticalChart ? expectedTopPoint.x : expectedTopPoint.y);
        var expectedY1AbsoluteCoord = adjustToViewport(expectedTopCoord, verticalCalc);
        var satisfiesMinHeight = y2Coord - expectedY1AbsoluteCoord >= this.minHeight;
        var adjustedCoordinate = satisfiesMinHeight ? expectedY1AbsoluteCoord : y2Coord - this.minHeight;
        var adjustedCoordinateValue = this.convertFromCoordinate(adjustedCoordinate * DpiHelper_1.DpiHelper.PIXEL_RATIO, verticalCalc, this.isVerticalChart ? this.xCoordinateMode : this.yCoordinateMode);
        if (this.isVerticalChart) {
            if (verticalCalc.hasFlippedCoordinates) {
                this.x1 = adjustedCoordinateValue;
            }
            else {
                this.x2 = adjustedCoordinateValue;
            }
        }
        else {
            if (verticalCalc.hasFlippedCoordinates) {
                this.y1 = adjustedCoordinateValue;
            }
            else {
                this.y2 = adjustedCoordinateValue;
            }
        }
    };
    OverviewCustomResizableAnnotation.prototype.adjustBottomSideToLimits = function (y1Coord, expectedBottomPoint, verticalCalc) {
        var expectedBottomCoord = this.getAbsoluteVerticalCoordinate(this.isVerticalChart ? expectedBottomPoint.x : expectedBottomPoint.y);
        var expectedY2AbsoluteCoord = adjustToViewport(expectedBottomCoord, verticalCalc);
        var satisfiesMinHeight = expectedY2AbsoluteCoord - y1Coord >= this.minHeight;
        var adjustedCoordinate = satisfiesMinHeight ? expectedY2AbsoluteCoord : y1Coord + this.minHeight;
        var adjustedCoordinateValue = this.convertFromCoordinate(adjustedCoordinate * DpiHelper_1.DpiHelper.PIXEL_RATIO, verticalCalc, this.isVerticalChart ? this.xCoordinateMode : this.yCoordinateMode);
        if (this.isVerticalChart) {
            if (verticalCalc.hasFlippedCoordinates) {
                this.x2 = adjustedCoordinateValue;
            }
            else {
                this.x1 = adjustedCoordinateValue;
            }
        }
        else {
            if (verticalCalc.hasFlippedCoordinates) {
                this.y2 = adjustedCoordinateValue;
            }
            else {
                this.y1 = adjustedCoordinateValue;
            }
        }
    };
    return OverviewCustomResizableAnnotation;
}(CustomAnnotation_1.CustomAnnotation));
exports.OverviewCustomResizableAnnotation = OverviewCustomResizableAnnotation;
/** @ignore */
var adjustToViewport = function (coordinate, calc) {
    if (coordinate <= 0) {
        return 0;
    }
    if (coordinate >= calc.viewportDimension / DpiHelper_1.DpiHelper.PIXEL_RATIO) {
        return calc.viewportDimension / DpiHelper_1.DpiHelper.PIXEL_RATIO;
    }
    return coordinate;
};
