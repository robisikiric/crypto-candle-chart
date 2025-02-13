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
exports.RolloverMarkerSvgAnnotation = void 0;
var MousePosition_1 = require("../../../types/MousePosition");
var annotationHelpers_1 = require("./annotationHelpers");
var IAnnotation_1 = require("./IAnnotation");
var SvgAnnotationBase_1 = require("./SvgAnnotationBase");
var RolloverMarkerSvgAnnotation = /** @class */ (function (_super) {
    __extends(RolloverMarkerSvgAnnotation, _super);
    function RolloverMarkerSvgAnnotation(renderableSeriesProps) {
        var _this = _super.call(this) || this;
        /** @inheritDoc */
        _this.type = IAnnotation_1.EAnnotationType.SVG;
        _this.tooltipProps = renderableSeriesProps;
        _this.isHiddenProperty = true;
        _this.x1 = 0;
        _this.y1 = 0;
        _this.xCoordShift = -4;
        _this.yCoordShift = -4;
        return _this;
    }
    /** @inheritDoc */
    RolloverMarkerSvgAnnotation.prototype.update = function (xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans) {
        var currentMousePosition = this.tooltipProps.rolloverModifier.getMousePosition();
        if (this.previousMousePosition === currentMousePosition && currentMousePosition !== MousePosition_1.EMousePosition.SeriesArea) {
            return;
        }
        this.previousMousePosition = this.tooltipProps.rolloverModifier.getMousePosition();
        _super.prototype.update.call(this, xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans);
    };
    /** @inheritDoc */
    RolloverMarkerSvgAnnotation.prototype.create = function (xCalc, yCalc, xCoordSvgTrans, yCoordSvgTrans) {
        var _a = this.tooltipProps, tooltipColor = _a.tooltipColor, markerColor = _a.markerColor;
        var color = markerColor !== null && markerColor !== void 0 ? markerColor : tooltipColor;
        if (this.svg && this.currentColor !== color) {
            this.clear();
        }
        if (!this.svg) {
            this.currentColor === color;
            var svgString = tooltipSvgTemplate(color);
            var svgNode = annotationHelpers_1.annotationHelpers.createSvg(svgString, this.svgRoot, this.nextSibling);
            this.setSvg(svgNode);
        }
    };
    return RolloverMarkerSvgAnnotation;
}(SvgAnnotationBase_1.SvgAnnotationBase));
exports.RolloverMarkerSvgAnnotation = RolloverMarkerSvgAnnotation;
/**
 * @ignore
 */
var tooltipSvgTemplate = function (fillColor) {
    return "<svg width=\"8\" height=\"8\"><circle cx=\"50%\" cy=\"50%\" r=\"4\" fill=\"".concat(fillColor, "\"/></svg>");
};
