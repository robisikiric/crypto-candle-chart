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
exports.VerticalSliceModifier = void 0;
var RolloverModifier_1 = require("./RolloverModifier");
var translate_1 = require("../../utils/translate");
var Point_1 = require("../../Core/Point");
var MousePosition_1 = require("../../types/MousePosition");
var RolloverModifierRenderableSeriesProps_1 = require("../Visuals/RenderableSeries/RolloverModifier/RolloverModifierRenderableSeriesProps");
var AnnotationBase_1 = require("../Visuals/Annotations/AnnotationBase");
var SeriesType_1 = require("../../types/SeriesType");
var constants_1 = require("./constants");
var ChartModifierType_1 = require("../../types/ChartModifierType");
var VerticalSliceModifier = /** @class */ (function (_super) {
    __extends(VerticalSliceModifier, _super);
    function VerticalSliceModifier(options) {
        var _this = this;
        var _a, _b, _c;
        _this = _super.call(this, options) || this;
        _this.xCoordinateModeProperty = AnnotationBase_1.ECoordinateMode.Pixel;
        _this.isDraggableProperty = false;
        _this.rmrsProps = new Map();
        _this.rmrsProps1 = new Map();
        // @ts-ignore
        _this.type = ChartModifierType_1.EChart2DModifierType.VerticalSlice;
        _this.x1Property = (_a = options.x1) !== null && _a !== void 0 ? _a : 0;
        _this.mousePosition = MousePosition_1.EMousePosition.SeriesArea;
        _this.xCoordinateModeProperty = (_b = options.xCoordinateMode) !== null && _b !== void 0 ? _b : _this.xCoordinateModeProperty;
        _this.isDraggableProperty = (_c = options.isDraggable) !== null && _c !== void 0 ? _c : _this.isDraggableProperty;
        _this.lineSelectionColorProperty = options.lineSelectionColor;
        _this.rolloverLineAnnotation.isEditable = _this.isDraggableProperty;
        _this.rolloverLineAnnotation.selectionBoxStroke = _this.lineSelectionColor;
        return _this;
    }
    Object.defineProperty(VerticalSliceModifier.prototype, "x1", {
        // properties - only update if changed
        /** @inheritDoc */
        get: function () {
            return this.x1Property;
        },
        /** @inheritDoc */
        set: function (value) {
            if (value !== this.x1Property) {
                this.x1Property = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.X1);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VerticalSliceModifier.prototype, "xCoordinateMode", {
        /** @inheritDoc */
        get: function () {
            return this.xCoordinateModeProperty;
        },
        /** @inheritDoc */
        set: function (value) {
            if (value !== this.xCoordinateModeProperty) {
                this.xCoordinateModeProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.X_COORDINATE_MODE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VerticalSliceModifier.prototype, "verticalLine", {
        /** @inheritDoc */
        get: function () {
            // read only
            return this.rolloverLineAnnotation;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VerticalSliceModifier.prototype, "isDraggable", {
        /** @inheritDoc */
        get: function () {
            return this.isDraggableProperty;
        },
        /** @inheritDoc */
        set: function (value) {
            if (value != this.isDraggableProperty) {
                this.isDraggableProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.IS_DRAGGABLE);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VerticalSliceModifier.prototype, "lineSelectionColor", {
        /** @inheritDoc */
        get: function () {
            return this.lineSelectionColorProperty;
        },
        /** @inheritDoc */
        set: function (value) {
            if (value !== this.lineSelectionColorProperty) {
                this.lineSelectionColorProperty = value;
                this.notifyPropertyChanged(constants_1.PROPERTY.LINE_SELECTION_COLOR);
            }
        },
        enumerable: false,
        configurable: true
    });
    VerticalSliceModifier.prototype.modifierMouseMove = function (args) {
        //this.lastPoint = args.mousePoint;
        if (this.rolloverLineAnnotation.isDraggingStarted) {
            this.mousePoint = new Point_1.Point(args.mousePoint.x, args.mousePoint.y);
            var x = this.isVerticalChart() ? args.mousePoint.y : args.mousePoint.x;
            var xAxis = this.parentSurface.getXAxisById(this.xAxisId);
            var coordCalc = xAxis.getCurrentCoordinateCalculator();
            if (this.xCoordinateMode === AnnotationBase_1.ECoordinateMode.Pixel) {
                this.x1 = Math.min(Math.max(xAxis.viewRect.left, (0, translate_1.translateToNotScaled)(x)), xAxis.viewRect.right);
            }
            else if (this.xCoordinateMode === AnnotationBase_1.ECoordinateMode.Relative) {
                var newX = (x - (this.isVerticalChart() ? xAxis.viewRect.top : xAxis.viewRect.left)) /
                    coordCalc.viewportDimension;
                this.x1 = Math.min(Math.max(0, newX), 1);
            }
            else {
                // DataValue
                var xt = this.isVerticalChart()
                    ? (0, translate_1.translateFromCanvasToSeriesViewRectY)(x, this.parentSurface.seriesViewRect)
                    : (0, translate_1.translateFromCanvasToSeriesViewRectX)(x, this.parentSurface.seriesViewRect);
                var newX = coordCalc.getDataValue(xt);
                if (!isNaN(newX)) {
                    this.x1 = newX;
                }
            }
            // Consider optional snap to dataPoint here
            this.update();
        }
    };
    /**
     * @inheritDoc
     */
    VerticalSliceModifier.prototype.modifierMouseLeave = function (args) {
        // do nothing, keep showing modifier
    };
    VerticalSliceModifier.prototype.toJSON = function () {
        var json = _super.prototype.toJSON.call(this);
        var options = {
            x1: this.x1,
            xCoordinateMode: this.xCoordinateMode,
            isDraggable: this.isDraggable,
            lineSelectionColor: this.lineSelectionColor
        };
        Object.assign(json.options, options);
        return json;
    };
    VerticalSliceModifier.prototype.getRolloverProps = function (rs) {
        return this.rmrsProps.get(rs);
    };
    VerticalSliceModifier.prototype.getRolloverProps1 = function (rs) {
        return this.rmrsProps.get(rs);
    };
    VerticalSliceModifier.prototype.removeSeriesAnnotationsFromParentSurface = function (rs) {
        _super.prototype.removeSeriesAnnotationsFromParentSurface.call(this, rs); // will remove annotation
        // clean up the dictionary
        this.rmrsProps.get(rs).delete();
        this.rmrsProps.delete(rs);
        if (rs.type === SeriesType_1.ESeriesType.BandSeries) {
            this.rmrsProps1.get(rs).delete();
            this.rmrsProps1.delete(rs);
        }
    };
    /**
     * @param rs
     */
    VerticalSliceModifier.prototype.addSeriesAnnotationsToParentSurface = function (rs) {
        var props = new RolloverModifierRenderableSeriesProps_1.RolloverModifierRenderableSeriesProps(rs, false); // true for second in band
        RolloverModifierRenderableSeriesProps_1.RolloverModifierRenderableSeriesProps.copy(rs.rolloverModifierProps, props);
        this.rmrsProps.set(rs, props);
        if (rs.type === SeriesType_1.ESeriesType.BandSeries) {
            var props1 = new RolloverModifierRenderableSeriesProps_1.RolloverModifierRenderableSeriesProps(rs, false); // true for second in band
            RolloverModifierRenderableSeriesProps_1.RolloverModifierRenderableSeriesProps.copy(rs.rolloverModifierProps1, props1);
            this.rmrsProps1.set(rs, props1);
        }
        _super.prototype.addSeriesAnnotationsToParentSurface.call(this, rs);
    };
    VerticalSliceModifier.prototype.createLine = function (options) {
        var line = _super.prototype.createLine.call(this, options);
        line.annotationsGripsRadius = 0;
        // @ts-ignore
        //line.updateAdornerInner = () => {};
        return line;
    };
    VerticalSliceModifier.prototype.update = function () {
        this.calculateXPosition();
        this.updateLine();
        this.updateSeriesAnnotations();
        Array.from(this.rmrsProps.values()).forEach(function (rmrsp) {
            if (!rmrsp.renderableSeries.isVisible || !rmrsp.showRollover) {
                rmrsp.tooltip.isHidden = true;
                rmrsp.marker.isHidden = true;
            }
        });
        if (this.tooltipLegendTemplate) {
            this.legendAnnotation.seriesInfos = this.getSeriesInfos();
        }
    };
    /** @inheritDoc */
    VerticalSliceModifier.prototype.notifyPropertyChanged = function (propertyName) {
        _super.prototype.notifyPropertyChanged.call(this, propertyName);
        // take action when property programmatically changed
        switch (propertyName) {
            case constants_1.PROPERTY.X1: {
                this.calculateXPosition();
                break;
            }
            case constants_1.PROPERTY.X_COORDINATE_MODE: {
                this.calculateXPosition();
                break;
            }
            case constants_1.PROPERTY.IS_DRAGGABLE: {
                this.rolloverLineAnnotation.isEditable = this.isDraggableProperty;
                break;
            }
        }
    };
    VerticalSliceModifier.prototype.calculateXPosition = function () {
        // will need to recalculate mousepoint.x
        var xAxis = this.parentSurface.getXAxisById(this.xAxisId);
        var isVertical = this.isVerticalChart();
        if (xAxis) {
            var xCalc = xAxis.getCurrentCoordinateCalculator();
            // @ts-ignore
            var x1v = this.rolloverLineAnnotation.getCoordinate(this.x1Property, xCalc, this.xCoordinateModeProperty);
            if (this.xCoordinateMode === AnnotationBase_1.ECoordinateMode.Relative ||
                this.xCoordinateMode === AnnotationBase_1.ECoordinateMode.DataValue) {
                x1v = x1v + (isVertical ? xAxis.viewRect.top : xAxis.viewRect.left);
            }
            // pick a y value in the view area
            var y1v = isVertical
                ? this.parentSurface.seriesViewRect.width / 2
                : this.parentSurface.seriesViewRect.height / 2;
            this.mousePoint = isVertical ? new Point_1.Point(y1v, x1v) : new Point_1.Point(x1v, y1v);
        }
    };
    return VerticalSliceModifier;
}(RolloverModifier_1.RolloverModifier));
exports.VerticalSliceModifier = VerticalSliceModifier;
