"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartBuilder = exports.ensureRegistrations = exports.configureChart = exports.buildChart = exports.chartReviver = void 0;
var NumberRange_1 = require("../Core/NumberRange");
var Thickness_1 = require("../Core/Thickness");
var SciChartSurfaceType_1 = require("../types/SciChartSurfaceType");
var buildAnnotations_1 = require("./buildAnnotations");
var buildAxis_1 = require("./buildAxis");
var buildDataSeries_1 = require("./buildDataSeries");
var buildModifiers_1 = require("./buildModifiers");
var buildSeries_1 = require("./buildSeries");
var buildSurface_1 = require("./buildSurface");
// import { chartReviver } from "./chartReviver";
var classFactory_1 = require("./classFactory");
/**
 * The reviver function needed when parsing definitions to JSON
 */
function chartReviver(key, value) {
    switch (key) {
        case "visibleRange":
        case "visibleRangeLimit":
        case "visibleRangeSizeLimit":
        case "growBy":
            return new NumberRange_1.NumberRange(value.min, value.max);
        case "padding":
            var t = value;
            return new Thickness_1.Thickness(t.top, t.right, t.bottom, t.left);
        default:
            // handle NaN serialization/deserialization since NaN is stringified as "null"
            return value === null ? NaN : value;
    }
}
exports.chartReviver = chartReviver;
/**
 * Builds an entire chart from a definition that can be pure data.
 * @param divElementId The Div Element ID where the {@link SciChartSurface} will reside
 * @param definition a {@link TSurfaceDefinition } or a string which will be parsed to it.
 * @returns
 */
var buildChart = function (divElementId, definition) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (typeof definition === "string") {
                    definition = JSON.parse(definition, chartReviver);
                }
                if (!definition) {
                    definition = {};
                }
                if (!("type" in definition)) return [3 /*break*/, 6];
                if (!(definition.type === SciChartSurfaceType_1.ESciChartSurfaceType.Default2D)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, buildSurface_1.build2DChart)(divElementId, definition.options)];
            case 1: return [2 /*return*/, _a.sent()];
            case 2:
                if (!(definition.type === SciChartSurfaceType_1.ESciChartSurfaceType.Pie2D)) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, buildSurface_1.buildPieChart)(divElementId, definition.options)];
            case 3: return [2 /*return*/, _a.sent()];
            case 4: 
            // @ts-ignore
            throw new Error("Surface type: ".concat(definition.type, " is not yet supported by the builder api"));
            case 5: return [3 /*break*/, 8];
            case 6: return [4 /*yield*/, (0, buildSurface_1.build2DChart)(divElementId, definition)];
            case 7: return [2 /*return*/, _a.sent()];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.buildChart = buildChart;
/**
 * Configures an existing surface using a definition.
 * This is useful if you need to use the wasmContext in methods or classes you use in your definition
 * @param sciChartSurface
 * @param wasmContext The webassemply context.  Pass undefined for a pie surface.
 * @param definition
 */
var configureChart = function (sciChartSurface, wasmContext, definition) {
    if (typeof definition === "string") {
        definition = JSON.parse(definition, chartReviver);
    }
    if (!definition) {
        definition = {};
    }
    if ("type" in definition) {
        if (definition.type === SciChartSurfaceType_1.ESciChartSurfaceType.Default2D) {
            // TODO check the definition type matches the surface
            (0, buildSurface_1.configure2DSurface)(definition.options, sciChartSurface, wasmContext);
        }
        else if (definition.type === SciChartSurfaceType_1.ESciChartSurfaceType.Pie2D) {
            //return await buildPieChart(divElementId, definition.options);
        }
        else {
            // @ts-ignore
            throw new Error("Surface type: ".concat(definition.type, " is not yet supported by the builder api"));
        }
    }
    else {
        (0, buildSurface_1.configure2DSurface)(definition, sciChartSurface, wasmContext);
    }
};
exports.configureChart = configureChart;
/**
 * This is just something to call to ensure that all the registrations are run before a surface is created
 */
var ensureRegistrations = function () { };
exports.ensureRegistrations = ensureRegistrations;
exports.chartBuilder = {
    /** @inheritdoc */
    buildChart: exports.buildChart,
    /** @inheritdoc */
    chartReviver: chartReviver,
    /** @inheritdoc */
    build2DChart: buildSurface_1.build2DChart,
    /** @inheritdoc */
    buildPieChart: buildSurface_1.buildPieChart,
    /** @inheritdoc */
    configureChart: exports.configureChart,
    /** @inheritdoc */
    buildSeries: buildSeries_1.buildSeries,
    /** @inheritdoc */
    buildDataSeries: buildDataSeries_1.buildDataSeries,
    /** @inheritdoc */
    buildModifiers: buildModifiers_1.buildModifiers,
    /** @inheritdoc */
    buildAxes: buildAxis_1.buildAxes,
    /** @inheritdoc */
    buildAnnotations: buildAnnotations_1.buildAnnotations,
    /** @inheritdoc */
    registerType: classFactory_1.registerType,
    /** @inheritdoc */
    registerWasmType: classFactory_1.registerWasmType,
    /** @inheritdoc */
    registerFunction: classFactory_1.registerFunction
};
