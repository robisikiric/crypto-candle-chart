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
exports.configure2DSurface = exports.buildPieChart = exports.build2DChart = void 0;
var BottomAlignedInnerAxisLayoutStrategy_1 = require("../Charting/LayoutManager/BottomAlignedInnerAxisLayoutStrategy");
var BottomAlignedOuterAxisLayoutStrategy_1 = require("../Charting/LayoutManager/BottomAlignedOuterAxisLayoutStrategy");
var BottomAlignedOuterHorizontallyStackedAxisLayoutStrategy_1 = require("../Charting/LayoutManager/BottomAlignedOuterHorizontallyStackedAxisLayoutStrategy");
var CentralAxesLayoutManager_1 = require("../Charting/LayoutManager/CentralAxesLayoutManager");
var LayoutManager_1 = require("../Charting/LayoutManager/LayoutManager");
var LeftAlignedInnerAxisLayoutStrategy_1 = require("../Charting/LayoutManager/LeftAlignedInnerAxisLayoutStrategy");
var LeftAlignedOuterAxisLayoutStrategy_1 = require("../Charting/LayoutManager/LeftAlignedOuterAxisLayoutStrategy");
var LeftAlignedOuterVerticallyStackedAxisLayoutStrategy_1 = require("../Charting/LayoutManager/LeftAlignedOuterVerticallyStackedAxisLayoutStrategy");
var RightAlignedInnerAxisLayoutStrategy_1 = require("../Charting/LayoutManager/RightAlignedInnerAxisLayoutStrategy");
var RightAlignedOuterAxisLayoutStrategy_1 = require("../Charting/LayoutManager/RightAlignedOuterAxisLayoutStrategy");
var RightAlignedOuterVerticallyStackedAxisLayoutStrategy_1 = require("../Charting/LayoutManager/RightAlignedOuterVerticallyStackedAxisLayoutStrategy");
var TopAlignedInnerAxisLayoutStrategy_1 = require("../Charting/LayoutManager/TopAlignedInnerAxisLayoutStrategy");
var TopAlignedOuterAxisLayoutStrategy_1 = require("../Charting/LayoutManager/TopAlignedOuterAxisLayoutStrategy");
var TopAlignedOuterHorizontallyStackedAxisLayoutStrategy_1 = require("../Charting/LayoutManager/TopAlignedOuterHorizontallyStackedAxisLayoutStrategy");
var SciChartJsNavyTheme_1 = require("../Charting/Themes/SciChartJsNavyTheme");
var SciChartJSDarkTheme_1 = require("../Charting/Themes/SciChartJSDarkTheme");
var SciChartJSDarkv2Theme_1 = require("../Charting/Themes/SciChartJSDarkv2Theme");
var SciChartJSLightTheme_1 = require("../Charting/Themes/SciChartJSLightTheme");
var NumericAxis_1 = require("../Charting/Visuals/Axis/NumericAxis");
var loader_1 = require("../Charting/Visuals/loader");
var PieSegment_1 = require("../Charting/Visuals/SciChartPieSurface/PieSegment/PieSegment");
var SciChartPieSurface_1 = require("../Charting/Visuals/SciChartPieSurface/SciChartPieSurface");
var SciChartSurface_1 = require("../Charting/Visuals/SciChartSurface");
var BaseType_1 = require("../types/BaseType");
var LayoutMangerType_1 = require("../types/LayoutMangerType");
var LayoutStrategyType_1 = require("../types/LayoutStrategyType");
var buildAnnotations_1 = require("./buildAnnotations");
var buildAxis_1 = require("./buildAxis");
var buildModifiers_1 = require("./buildModifiers");
var buildSeries_1 = require("./buildSeries");
var chartBuilder_1 = require("./chartBuilder");
var classFactory_1 = require("./classFactory");
var ThemeProviderType_1 = require("../types/ThemeProviderType");
var perfomance_1 = require("../utils/perfomance");
// register themes
(0, classFactory_1.registerType)(BaseType_1.EBaseType.ThemeProvider, ThemeProviderType_1.EThemeProviderType.Light, function () { return new SciChartJSLightTheme_1.SciChartJSLightTheme(); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.ThemeProvider, ThemeProviderType_1.EThemeProviderType.DarkV2, function () { return new SciChartJSDarkv2Theme_1.SciChartJSDarkv2Theme(); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.ThemeProvider, ThemeProviderType_1.EThemeProviderType.Dark, function () { return new SciChartJSDarkTheme_1.SciChartJSDarkTheme(); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.ThemeProvider, ThemeProviderType_1.EThemeProviderType.Navy, function () { return new SciChartJsNavyTheme_1.SciChartJsNavyTheme(); }, true);
// register Layout managers
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LayoutManager, LayoutMangerType_1.ELayoutManagerType.Default, function (options) { return new LayoutManager_1.LayoutManager(options); }, true);
// TODO builder api support for VerticalGroup and synced layoutmanagers
// registerType(EBaseType.LayoutManager, ELayoutManagerType.Synchronised, (options?: any) => new SynchronizedLayoutManager(options), true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LayoutManager, LayoutMangerType_1.ELayoutManagerType.CentralAxes, function (options) { return new CentralAxesLayoutManager_1.CentralAxesLayoutManager(options); }, true);
// register Layout Strategies
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LayoutStrategy, LayoutStrategyType_1.ELayoutStrategyType.BottomInner, function (options) { return new BottomAlignedInnerAxisLayoutStrategy_1.BottomAlignedInnerAxisLayoutStrategy(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LayoutStrategy, LayoutStrategyType_1.ELayoutStrategyType.BottomOuter, function (options) { return new BottomAlignedOuterAxisLayoutStrategy_1.BottomAlignedOuterAxisLayoutStrategy(); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LayoutStrategy, LayoutStrategyType_1.ELayoutStrategyType.BottomStacked, function (options) { return new BottomAlignedOuterHorizontallyStackedAxisLayoutStrategy_1.BottomAlignedOuterHorizontallyStackedAxisLayoutStrategy(); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LayoutStrategy, LayoutStrategyType_1.ELayoutStrategyType.LeftInner, function (options) { return new LeftAlignedInnerAxisLayoutStrategy_1.LeftAlignedInnerAxisLayoutStrategy(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LayoutStrategy, LayoutStrategyType_1.ELayoutStrategyType.LeftOuter, function (options) { return new LeftAlignedOuterAxisLayoutStrategy_1.LeftAlignedOuterAxisLayoutStrategy(); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LayoutStrategy, LayoutStrategyType_1.ELayoutStrategyType.LeftStacked, function (options) { return new LeftAlignedOuterVerticallyStackedAxisLayoutStrategy_1.LeftAlignedOuterVerticallyStackedAxisLayoutStrategy(); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LayoutStrategy, LayoutStrategyType_1.ELayoutStrategyType.RightInner, function (options) { return new RightAlignedInnerAxisLayoutStrategy_1.RightAlignedInnerAxisLayoutStrategy(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LayoutStrategy, LayoutStrategyType_1.ELayoutStrategyType.RightOuter, function (options) { return new RightAlignedOuterAxisLayoutStrategy_1.RightAlignedOuterAxisLayoutStrategy(); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LayoutStrategy, LayoutStrategyType_1.ELayoutStrategyType.RightStacked, function (options) { return new RightAlignedOuterVerticallyStackedAxisLayoutStrategy_1.RightAlignedOuterVerticallyStackedAxisLayoutStrategy(); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LayoutStrategy, LayoutStrategyType_1.ELayoutStrategyType.TopInner, function (options) { return new TopAlignedInnerAxisLayoutStrategy_1.TopAlignedInnerAxisLayoutStrategy(options); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LayoutStrategy, LayoutStrategyType_1.ELayoutStrategyType.TopOuter, function (options) { return new TopAlignedOuterAxisLayoutStrategy_1.TopAlignedOuterAxisLayoutStrategy(); }, true);
(0, classFactory_1.registerType)(BaseType_1.EBaseType.LayoutStrategy, LayoutStrategyType_1.ELayoutStrategyType.TopStacked, function (options) { return new TopAlignedOuterHorizontallyStackedAxisLayoutStrategy_1.TopAlignedOuterHorizontallyStackedAxisLayoutStrategy(); }, true);
// register loaders
(0, classFactory_1.registerType)(BaseType_1.EBaseType.Loader, "Default", function () { return new loader_1.DefaultSciChartLoader(); }, true);
/**
 * Construct a chart with {@link SciChartSurface} using a {@link ISciChart2DDefinition} which can be pure data.
 * @remarks This method is async and must be awaited
 * @param divElementId The Div Element ID where the {@link SciChartSurface} will reside
 * @param definition the {@link ISciChart2DDefinition}
 */
var build2DChart = function (divElementId, definition) { return __awaiter(void 0, void 0, void 0, function () {
    var wasmChart, wasmContext, sciChartSurface, mark;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (typeof definition === "string") {
                    definition = JSON.parse(definition, chartBuilder_1.chartReviver);
                }
                if (!(definition === null || definition === void 0 ? void 0 : definition.createSingle)) return [3 /*break*/, 2];
                return [4 /*yield*/, SciChartSurface_1.SciChartSurface.createSingle(divElementId, definition === null || definition === void 0 ? void 0 : definition.surface)];
            case 1:
                wasmChart = _b.sent();
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, SciChartSurface_1.SciChartSurface.create(divElementId, definition === null || definition === void 0 ? void 0 : definition.surface)];
            case 3:
                wasmChart = _b.sent();
                _b.label = 4;
            case 4:
                wasmContext = wasmChart.wasmContext, sciChartSurface = wasmChart.sciChartSurface;
                mark = perfomance_1.PerformanceDebugHelper.mark(perfomance_1.EPerformanceMarkType.SetupStart, { contextId: sciChartSurface.id });
                configure2DSurface(definition, sciChartSurface, wasmContext);
                if (!definition.onCreated) return [3 /*break*/, 6];
                if (typeof definition.onCreated === "string") {
                    sciChartSurface.onCreatedName = definition.onCreated;
                    definition.onCreated = (0, classFactory_1.getFunction)(BaseType_1.EBaseType.OnCreateFunction, definition.onCreated);
                }
                return [4 /*yield*/, definition.onCreated(sciChartSurface)];
            case 5:
                _b.sent();
                _b.label = 6;
            case 6:
                // TODO consider if this makes sense:
                // if suspended, allows to execute onCreated before doing actual rendering
                // if (definition.surface?.createSuspended ?? SciChartDefaults.createSuspended) {
                //     sciChartSurface.resume();
                // }
                perfomance_1.PerformanceDebugHelper.mark(perfomance_1.EPerformanceMarkType.SetupEnd, {
                    contextId: sciChartSurface.id,
                    relatedId: (_a = mark === null || mark === void 0 ? void 0 : mark.detail) === null || _a === void 0 ? void 0 : _a.relatedId
                });
                return [2 /*return*/, { wasmContext: wasmContext, sciChartSurface: sciChartSurface }];
        }
    });
}); };
exports.build2DChart = build2DChart;
/**
 * Construct a chart with {@link SciChartPieSurface} using a {@link ISciChartPieDefinition} which can be pure data.
 * @remarks This method is async and must be awaited
 * @param divElementId The Div Element ID where the {@link SciChartPieSurface} will reside
 * @param definition the {@link ISciChartPieDefinition}
 */
var buildPieChart = function (divElementId, definition) { return __awaiter(void 0, void 0, void 0, function () {
    var scps, _i, _a, segmentOption, segment;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (typeof definition === "string") {
                    definition = JSON.parse(definition, chartBuilder_1.chartReviver);
                }
                return [4 /*yield*/, SciChartPieSurface_1.SciChartPieSurface.create(divElementId, definition === null || definition === void 0 ? void 0 : definition.surface)];
            case 1:
                scps = _b.sent();
                if (definition === null || definition === void 0 ? void 0 : definition.segments) {
                    for (_i = 0, _a = definition === null || definition === void 0 ? void 0 : definition.segments; _i < _a.length; _i++) {
                        segmentOption = _a[_i];
                        segment = new PieSegment_1.PieSegment(segmentOption);
                        scps.pieSegments.add(segment);
                    }
                }
                if (definition.onCreated) {
                    if (typeof definition.onCreated === "string") {
                        scps.onCreatedName = definition.onCreated;
                        // @ts-ignore
                        definition.onCreated = (0, classFactory_1.getFunction)(BaseType_1.EBaseType.OnCreateFunction, definition.onCreated);
                    }
                    // @ts-ignore
                    definition.onCreated(scps);
                }
                return [2 /*return*/, scps];
        }
    });
}); };
exports.buildPieChart = buildPieChart;
function configure2DSurface(definition, sciChartSurface, wasmContext) {
    var _a, _b, _c, _d, _e;
    if (definition.xAxes) {
        (_a = sciChartSurface.xAxes).add.apply(_a, (0, buildAxis_1.buildAxes)(wasmContext, definition.xAxes));
    }
    if (sciChartSurface.xAxes.size() === 0 && !definition.subCharts) {
        sciChartSurface.xAxes.add(new NumericAxis_1.NumericAxis(wasmContext));
    }
    if (definition.yAxes) {
        (_b = sciChartSurface.yAxes).add.apply(_b, (0, buildAxis_1.buildAxes)(wasmContext, definition.yAxes));
    }
    if (sciChartSurface.yAxes.size() === 0 && !definition.subCharts) {
        sciChartSurface.yAxes.add(new NumericAxis_1.NumericAxis(wasmContext));
    }
    if (definition.series) {
        (_c = sciChartSurface.renderableSeries).add.apply(_c, (0, buildSeries_1.buildSeries)(wasmContext, definition.series, definition.sharedData));
    }
    if (definition.modifiers) {
        (_d = sciChartSurface.chartModifiers).add.apply(_d, (0, buildModifiers_1.buildModifiers)(definition.modifiers));
    }
    if (definition.annotations) {
        (_e = sciChartSurface.annotations).add.apply(_e, (0, buildAnnotations_1.buildAnnotations)(definition.annotations));
    }
    if (definition.subCharts && !sciChartSurface.isSubSurface) {
        for (var _i = 0, _f = definition.subCharts; _i < _f.length; _i++) {
            var subChartDefinition = _f[_i];
            var subSurface = sciChartSurface.addSubChart(subChartDefinition.surface);
            configure2DSurface(subChartDefinition, subSurface, wasmContext);
        }
    }
}
exports.configure2DSurface = configure2DSurface;
