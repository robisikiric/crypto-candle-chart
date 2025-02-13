"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildModifiers = void 0;
var CursorModifier_1 = require("../Charting/ChartModifiers/CursorModifier");
var DataPointSelectionModifier_1 = require("../Charting/ChartModifiers/DataPointSelectionModifier");
var LegendModifier_1 = require("../Charting/ChartModifiers/LegendModifier");
var MouseWheelZoomModifier_1 = require("../Charting/ChartModifiers/MouseWheelZoomModifier");
var OverviewRangeSelectionModifier_1 = require("../Charting/ChartModifiers/OverviewRangeSelectionModifier");
var PinchZoomModifier_1 = require("../Charting/ChartModifiers/PinchZoomModifier");
var RolloverModifier_1 = require("../Charting/ChartModifiers/RolloverModifier");
var VerticalSliceModifier_1 = require("../Charting/ChartModifiers/VerticalSliceModifier");
var RubberBandXyZoomModifier_1 = require("../Charting/ChartModifiers/RubberBandXyZoomModifier");
var SeriesSelectionModifier_1 = require("../Charting/ChartModifiers/SeriesSelectionModifier");
var XAxisDragModifier_1 = require("../Charting/ChartModifiers/XAxisDragModifier");
var YAxisDragModifier_1 = require("../Charting/ChartModifiers/YAxisDragModifier");
var ZoomExtentsModifier_1 = require("../Charting/ChartModifiers/ZoomExtentsModifier");
var ZoomPanModifier_1 = require("../Charting/ChartModifiers/ZoomPanModifier");
var BaseType_1 = require("../types/BaseType");
var ChartModifierType_1 = require("../types/ChartModifierType");
var chartBuilder_1 = require("./chartBuilder");
var classFactory_1 = require("./classFactory");
var AnnotationHoverModifier_1 = require("../Charting/ChartModifiers/AnnotationHoverModifier");
// register modifiers
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Chart2DModifier, ChartModifierType_1.EChart2DModifierType.Cursor, function (options) { return new CursorModifier_1.CursorModifier(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Chart2DModifier, ChartModifierType_1.EChart2DModifierType.DataPointSelection, function (options) { return new DataPointSelectionModifier_1.DataPointSelectionModifier(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Chart2DModifier, ChartModifierType_1.EChart2DModifierType.MouseWheelZoom, function (options) { return new MouseWheelZoomModifier_1.MouseWheelZoomModifier(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Chart2DModifier, ChartModifierType_1.EChart2DModifierType.PinchZoom, function (options) { return new PinchZoomModifier_1.PinchZoomModifier(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Chart2DModifier, ChartModifierType_1.EChart2DModifierType.Rollover, function (options) { return new RolloverModifier_1.RolloverModifier(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Chart2DModifier, ChartModifierType_1.EChart2DModifierType.VerticalSlice, function (options) { return new VerticalSliceModifier_1.VerticalSliceModifier(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Chart2DModifier, ChartModifierType_1.EChart2DModifierType.RubberBandXYZoom, function (options) { return new RubberBandXyZoomModifier_1.RubberBandXyZoomModifier(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Chart2DModifier, ChartModifierType_1.EChart2DModifierType.SeriesSelection, function (options) { return new SeriesSelectionModifier_1.SeriesSelectionModifier(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Chart2DModifier, ChartModifierType_1.EChart2DModifierType.AnnotationHover, function (options) { return new AnnotationHoverModifier_1.AnnotationHoverModifier(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Chart2DModifier, ChartModifierType_1.EChart2DModifierType.XAxisDrag, function (options) { return new XAxisDragModifier_1.XAxisDragModifier(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Chart2DModifier, ChartModifierType_1.EChart2DModifierType.YAxisDrag, function (options) { return new YAxisDragModifier_1.YAxisDragModifier(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Chart2DModifier, ChartModifierType_1.EChart2DModifierType.ZoomExtents, function (options) { return new ZoomExtentsModifier_1.ZoomExtentsModifier(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Chart2DModifier, ChartModifierType_1.EChart2DModifierType.ZoomPan, function (options) { return new ZoomPanModifier_1.ZoomPanModifier(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Chart2DModifier, ChartModifierType_1.EChart2DModifierType.OverviewRangeSelection, function (options) { return new OverviewRangeSelectionModifier_1.OverviewRangeSelectionModifier(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Chart2DModifier, ChartModifierType_1.EChart2DModifierType.Legend, function (options) { return new LegendModifier_1.LegendModifier(options); }, true);
/**
 * Build one or more chart modifiers from a definition that can be pure data.
 * @param definition One or an array of {@link TModifierDefinition}
 * @returns An array of modifiers
 */
var buildModifiers = function (definition) {
    if (typeof definition === "string") {
        definition = JSON.parse(definition, chartBuilder_1.chartReviver);
    }
    var modifiers = [];
    if (Array.isArray(definition)) {
        for (var _i = 0, definition_1 = definition; _i < definition_1.length; _i++) {
            var modifier = definition_1[_i];
            modifiers.push(buildModifier(modifier));
        }
    }
    else {
        modifiers.push(buildModifier(definition));
    }
    return modifiers;
};
exports.buildModifiers = buildModifiers;
var buildModifier = function (definition) {
    if (definition.type === ChartModifierType_1.EChart2DModifierType.Custom) {
        return (0, classFactory_1.createType)(BaseType_1.EBaseType.Chart2DModifier, definition.customType, null, definition.options);
    }
    else {
        return (0, classFactory_1.createType)(BaseType_1.EBaseType.Chart2DModifier, definition.type, null, definition.options);
    }
};
