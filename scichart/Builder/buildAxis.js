"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildAxes = void 0;
var CategoryAxis_1 = require("../Charting/Visuals/Axis/CategoryAxis");
var DateTimeNumericAxis_1 = require("../Charting/Visuals/Axis/DateTimeNumericAxis");
var DateLabelProvider_1 = require("../Charting/Visuals/Axis/LabelProvider/DateLabelProvider");
var LogarithmicLabelProvider_1 = require("../Charting/Visuals/Axis/LabelProvider/LogarithmicLabelProvider");
var NumericLabelProvider_1 = require("../Charting/Visuals/Axis/LabelProvider/NumericLabelProvider");
var PieLabelProvider_1 = require("../Charting/Visuals/Axis/LabelProvider/PieLabelProvider");
var SmartDateLabelProvider_1 = require("../Charting/Visuals/Axis/LabelProvider/SmartDateLabelProvider");
var TextLabelProvider_1 = require("../Charting/Visuals/Axis/LabelProvider/TextLabelProvider");
var LogarithmicAxis_1 = require("../Charting/Visuals/Axis/LogarithmicAxis");
var NumericAxis_1 = require("../Charting/Visuals/Axis/NumericAxis");
var AxisType_1 = require("../types/AxisType");
var BaseType_1 = require("../types/BaseType");
var LabelProviderType_1 = require("../types/LabelProviderType");
var chartBuilder_1 = require("./chartBuilder");
var classFactory_1 = require("./classFactory");
// register LabelProviders
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LabelProvider, LabelProviderType_1.ELabelProviderType.Numeric, function (options) { return new NumericLabelProvider_1.NumericLabelProvider(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LabelProvider, LabelProviderType_1.ELabelProviderType.Date, function (options) { return new DateLabelProvider_1.DateLabelProvider(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LabelProvider, LabelProviderType_1.ELabelProviderType.Logarithmic, function (options) { return new LogarithmicLabelProvider_1.LogarithmicLabelProvider(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LabelProvider, LabelProviderType_1.ELabelProviderType.SmartDate, function (options) { return new SmartDateLabelProvider_1.SmartDateLabelProvider(); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LabelProvider, LabelProviderType_1.ELabelProviderType.Text, function (options) { return new TextLabelProvider_1.TextLabelProvider(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LabelProvider, LabelProviderType_1.ELabelProviderType.Pie, function (options) { return new PieLabelProvider_1.PieLabelProvider(options); }, true);
/**
 * Build one or more axes from a definition that can be pure data.
 * @param wasmContext A {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart | SciChart 3D WebAssembly Context}
 * @param definition One or an array of {@link TAxisDefinition}
 * @returns An array of {@link AxisBase2D}.
 */
var buildAxes = function (wasmContext, definition) {
    if (typeof definition === "string") {
        definition = JSON.parse(definition, chartBuilder_1.chartReviver);
    }
    var axes = [];
    if (Array.isArray(definition)) {
        for (var _i = 0, definition_1 = definition; _i < definition_1.length; _i++) {
            var axis = definition_1[_i];
            axes.push(buildAxis(wasmContext, axis));
        }
    }
    else {
        axes.push(buildAxis(wasmContext, definition));
    }
    return axes;
};
exports.buildAxes = buildAxes;
var buildAxis = function (wasmContext, definition) {
    var axis;
    switch (definition.type) {
        case AxisType_1.EAxisType.CategoryAxis:
            axis = new CategoryAxis_1.CategoryAxis(wasmContext, definition.options);
            break;
        case AxisType_1.EAxisType.NumericAxis:
            axis = new NumericAxis_1.NumericAxis(wasmContext, definition.options);
            break;
        case AxisType_1.EAxisType.LogarithmicAxis:
            axis = new LogarithmicAxis_1.LogarithmicAxis(wasmContext, definition.options);
            break;
        case AxisType_1.EAxisType.DateTimeNumericAxis:
            axis = new DateTimeNumericAxis_1.DateTimeNumericAxis(wasmContext, definition.options);
            break;
        default:
            axis = new NumericAxis_1.NumericAxis(wasmContext, {});
            break;
    }
    return axis;
};
