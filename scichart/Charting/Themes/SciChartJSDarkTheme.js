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
exports.SciChartJSDarkTheme = void 0;
var ThemeProviderType_1 = require("../../types/ThemeProviderType");
var IThemeProvider_1 = require("./IThemeProvider");
/**
 * An implementation of {@link ThemeProvider} which provides a dark theme
 * @decription Applied to a 2D {@link SciChartSurface}, or a 3D {@link SciChart3DSurface}, the ThemeProvider may be
 * applied using the {@link SciChartSurface.applyTheme | applyTheme} method, where it is passed down to child components
 * so that all children of the chart get the same theme.
 *
 * For example:
 * ```ts
 * // Applying a theme when creating a chart
 * const { sciChartSurface, wasmContext } = SciChartSurface.create("div-id", { theme: new SciChartJSDarkTheme() });
 * // Apply a theme after chart creation
 * sciChartSurface.applyTheme(new SciChartJSDarkTheme());
 *
 * // Applying a custom theme
 * export class MyCustomTheme implements IThemeProvider {
 *    // todo: implement IThemeProvider interface and apply properties
 * }
 *
 * sciChartSurface.applyTheme(new MyCustomTheme()); // Or apply in SciChartSurface.create()
 *
 * // Overriding just some members of a theme
 * const myOverriddenTheme = {...new SciChartJSLightTheme(), sciChartBackground: "white" };
 * ciChartSurface.applyTheme(myOverriddenTheme); // Or apply in SciChartSurface.create()
 * ```
 */
var SciChartJSDarkTheme = /** @class */ (function (_super) {
    __extends(SciChartJSDarkTheme, _super);
    function SciChartJSDarkTheme() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @inheritDoc */
        _this.type = ThemeProviderType_1.EThemeProviderType.Dark;
        /** @inheritDoc */
        _this.sciChartBackground = "#1C1C1EFF";
        /** @inheritDoc */
        _this.loadingAnimationBackground = "#1C1C1EFF";
        /** @inheritDoc */
        _this.loadingAnimationForeground = "#AAA";
        /** @inheritDoc */
        _this.gridBorderBrush = "#5A5B5BFF";
        /** @inheritDoc */
        _this.axisBandsFill = "#202123E1";
        /** @inheritDoc */
        _this.axisBorder = "#00000000";
        /** @inheritDoc */
        _this.tickTextBrush = "#A6A7ACFF";
        /** @inheritDoc */
        _this.majorGridLineBrush = "#323539FF";
        /** @inheritDoc */
        _this.minorGridLineBrush = "#232426FF";
        /** @inheritDoc */
        _this.gridBackgroundBrush = "TRANSPARENT";
        /** @inheritDoc */
        _this.rolloverLineBrush = "#42b64933";
        /** @inheritDoc */
        _this.cursorLineBrush = "#228B22FF";
        /** @inheritDoc */
        _this.rubberBandFillBrush = "#42b64933";
        /** @inheritDoc */
        _this.rubberBandStrokeBrush = "#42b64977";
        /** @inheritDoc */
        _this.legendBackgroundBrush = "#1D2C35FF";
        /** @inheritDoc */
        _this.labelBackgroundBrush = "#42b649AA";
        /** @inheritDoc */
        _this.labelBorderBrush = "#42b649FF";
        /** @inheritDoc */
        _this.labelForegroundBrush = "#EEEEEEFF";
        /** @inheritDoc */
        _this.textAnnotationForeground = "#EEEEEEFF";
        /** @inheritDoc */
        _this.textAnnotationBackground = "#42b649AA";
        /** @inheritDoc */
        _this.annotationsGripsBorderBrush = "#CDCDCD99";
        /** @inheritDoc */
        _this.annotationsGripsBackroundBrush = "#CDCDCD22";
        /** @inheritDoc */
        _this.annotationSelectionStroke = "#f00e0e66";
        /** @inheritDoc */
        _this.overviewFillBrush = "#262728BB";
        /** @inheritDoc */
        _this.scrollbarBackgroundBrush = "#262728FF";
        /** @inheritDoc */
        _this.scrollbarBorderBrush = "#121212FF";
        /** @inheritDoc */
        _this.scrollbarGripsBackgroundBrush = "#535353FF";
        /** @inheritDoc */
        _this.scrollbarViewportBackgroundBrush = "#222222FF";
        /** @inheritDoc */
        _this.scrollbarViewportBorderBrush = "#232323FF";
        /** @inheritDoc */
        _this.upWickColor = "#50ff50FF";
        /** @inheritDoc */
        _this.downWickColor = "#ff5050FF";
        /** @inheritDoc */
        _this.upBodyBrush = "#50ff50B2";
        /** @inheritDoc */
        _this.downBodyBrush = "#ff5050B2";
        /** @inheritDoc */
        _this.upBandSeriesLineColor = "#279B27FF";
        /** @inheritDoc */
        _this.downBandSeriesLineColor = "#FF1919FF";
        /** @inheritDoc */
        _this.upBandSeriesFillColor = "#279B2733";
        /** @inheritDoc */
        _this.downBandSeriesFillColor = "#FF191933";
        /** @inheritDoc */
        _this.mountainAreaBrush = "#4083B777";
        /** @inheritDoc */
        _this.mountainLineColor = "#C6E6FFFF";
        /** @inheritDoc */
        _this.lineSeriesColor = "#C6E6FFFF";
        /** @inheritDoc */
        _this.columnLineColor = "#FFFFFFFF";
        /** @inheritDoc */
        _this.columnFillBrush = "#FFFFFFFF";
        /** @inheritDoc */
        _this.impulseFillBrush = "#FFFFFFFF";
        /** @inheritDoc */
        _this.defaultColorMapBrush = [
            { offset: 0, color: "DARKBLUE" },
            { offset: 0.5, color: "CORNFLOWERBLUE" },
            { offset: 1, color: "#FF22AAFF" }
        ];
        /** @inheritDoc */
        _this.axisTitleColor = "#C8C7C3FF";
        /** @inheritDoc */
        _this.chartTitleColor = "#C8C7C3FF";
        /** @inheritDoc */
        _this.shadowEffectColor = "#000000FF";
        /** @inheritDoc */
        _this.planeBorderColor = "#333333FF";
        /** @inheritDoc */
        _this.axisPlaneBackgroundFill = "TRANSPARENT";
        /** @inheritDoc */
        _this.axis3DBandsFill = "#202123E1";
        /** @inheritDoc */
        _this.isLightBackground = false;
        return _this;
    }
    return SciChartJSDarkTheme;
}(IThemeProvider_1.ThemeProvider));
exports.SciChartJSDarkTheme = SciChartJSDarkTheme;
