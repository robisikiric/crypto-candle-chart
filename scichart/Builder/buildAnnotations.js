"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAnnotations = void 0;
var AxisMarkerAnnotation_1 = require("../Charting/Visuals/Annotations/AxisMarkerAnnotation");
var BoxAnnotation_1 = require("../Charting/Visuals/Annotations/BoxAnnotation");
var CustomAnnotation_1 = require("../Charting/Visuals/Annotations/CustomAnnotation");
var HorizontalLineAnnotation_1 = require("../Charting/Visuals/Annotations/HorizontalLineAnnotation");
var IAnnotation_1 = require("../Charting/Visuals/Annotations/IAnnotation");
var LineAnnotation_1 = require("../Charting/Visuals/Annotations/LineAnnotation");
var NativeTextAnnotation_1 = require("../Charting/Visuals/Annotations/NativeTextAnnotation");
var TextAnnotation_1 = require("../Charting/Visuals/Annotations/TextAnnotation");
var VerticalLineAnnotation_1 = require("../Charting/Visuals/Annotations/VerticalLineAnnotation");
var BaseType_1 = require("../types/BaseType");
var chartBuilder_1 = require("./chartBuilder");
var classFactory_1 = require("./classFactory");
// register annotations
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Annotation, IAnnotation_1.EAnnotationType.RenderContextAxisMarkerAnnotation, function (options) { return new AxisMarkerAnnotation_1.AxisMarkerAnnotation(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Annotation, IAnnotation_1.EAnnotationType.RenderContextBoxAnnotation, function (options) { return new BoxAnnotation_1.BoxAnnotation(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Annotation, IAnnotation_1.EAnnotationType.RenderContextHorizontalLineAnnotation, function (options) { return new HorizontalLineAnnotation_1.HorizontalLineAnnotation(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Annotation, IAnnotation_1.EAnnotationType.RenderContextLineAnnotation, function (options) { return new LineAnnotation_1.LineAnnotation(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Annotation, IAnnotation_1.EAnnotationType.RenderContextVerticalLineAnnotation, function (options) { return new VerticalLineAnnotation_1.VerticalLineAnnotation(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Annotation, IAnnotation_1.EAnnotationType.SVGTextAnnotation, function (options) { return new TextAnnotation_1.TextAnnotation(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Annotation, IAnnotation_1.EAnnotationType.SVGCustomAnnotation, function (options) { return new CustomAnnotation_1.CustomAnnotation(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Annotation, IAnnotation_1.EAnnotationType.RenderContextNativeTextAnnotation, function (options) { return new NativeTextAnnotation_1.NativeTextAnnotation(options); }, true);
/**
 * Build one or more annotations from a definition that can be pure data.
 * @param definition One or an array of {@link TAnnotationDefinition}
 * @returns An array of annotations
 */
var buildAnnotations = function (definition) {
    if (typeof definition === "string") {
        definition = JSON.parse(definition, chartBuilder_1.chartReviver);
    }
    var annotations = [];
    if (Array.isArray(definition)) {
        for (var _i = 0, definition_1 = definition; _i < definition_1.length; _i++) {
            var annotation = definition_1[_i];
            annotations.push((0, classFactory_1.createType)(BaseType_1.EBaseType.Annotation, annotation.type, null, annotation.options));
        }
    }
    else {
        annotations.push((0, classFactory_1.createType)(BaseType_1.EBaseType.Annotation, definition.type, null, definition.options));
    }
    return annotations;
};
exports.buildAnnotations = buildAnnotations;
