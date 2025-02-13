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
exports.AnnotationHoverModifier = void 0;
var IAnnotation_1 = require("../../Charting/Visuals/Annotations/IAnnotation");
var ChartModifierType_1 = require("../../types/ChartModifierType");
var PointerEventsMediatorModifier_1 = require("./PointerEventsMediatorModifier");
/**
 * Enables hover detection on annotations.
 * Accepts {@link IAnnotationHoverModifierOptions}
 */
var AnnotationHoverModifier = /** @class */ (function (_super) {
    __extends(AnnotationHoverModifier, _super);
    function AnnotationHoverModifier(options) {
        var _this = _super.call(this, options) || this;
        _this.type = ChartModifierType_1.EChart2DModifierType.AnnotationHover;
        _this.enableHoverProperty = true;
        return _this;
    }
    AnnotationHoverModifier.prototype.getAllTargets = function () {
        var visibleAnnotations = this.parentSurface.annotations.asArray().filter(function (annotation) { return !annotation.isHidden; });
        var svgAnnotations = visibleAnnotations.filter(function (annotation) { return annotation.isSvgAnnotation; });
        var renderContextAnnotations = visibleAnnotations.filter(function (annotation) { return !annotation.isSvgAnnotation; });
        var svgBackgroundAnnotations = svgAnnotations.filter(function (annotation) { return annotation.annotationLayer === IAnnotation_1.EAnnotationLayer.Background; });
        var svgForegroundAnnotations = svgAnnotations.filter(function (annotation) { return annotation.annotationLayer === IAnnotation_1.EAnnotationLayer.AboveChart; });
        var renderContextBackgroundAnnotations = renderContextAnnotations.filter(function (annotation) { return annotation.annotationLayer === IAnnotation_1.EAnnotationLayer.Background; });
        var renderContextAnnotationsBelowChart = renderContextAnnotations.filter(function (annotation) { return annotation.annotationLayer === IAnnotation_1.EAnnotationLayer.BelowChart; });
        var renderContextAnnotationsAboveChart = renderContextAnnotations.filter(function (annotation) { return annotation.annotationLayer === IAnnotation_1.EAnnotationLayer.AboveChart; });
        return __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], svgBackgroundAnnotations, true), renderContextBackgroundAnnotations, true), renderContextAnnotationsBelowChart, true), renderContextAnnotationsAboveChart, true), svgForegroundAnnotations, true);
    };
    return AnnotationHoverModifier;
}(PointerEventsMediatorModifier_1.PointerEventsMediatorModifier));
exports.AnnotationHoverModifier = AnnotationHoverModifier;
