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
exports.SciChartJSLightTheme = void 0;
var ThemeProviderType_1 = require("../../types/ThemeProviderType");
var IThemeProvider_1 = require("./IThemeProvider");
/**
 * An implementation of {@link ThemeProvider} which provides a light theme
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
var SciChartJSLightTheme = /** @class */ (function (_super) {
    __extends(SciChartJSLightTheme, _super);
    function SciChartJSLightTheme() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** @inheritDoc */
        _this.strokePalette = ["#F48420", "#AE408E", "#30BC9A", "#209FD9", "#264B93"];
        /** @inheritDoc */
        _this.fillPalette = ["#F4842077", "#AE408E77", "#30BC9A77", "#209FD977", "#264B9377"];
        /** @inheritDoc */
        _this.type = ThemeProviderType_1.EThemeProviderType.Light;
        /** @inheritDoc */
        _this.sciChartBackground = "#F9F9F9FF";
        /** @inheritDoc */
        _this.loadingAnimationBackground = "#F9F9F9FF";
        /** @inheritDoc */
        _this.loadingAnimationForeground = "#777777FF";
        /** @inheritDoc */
        _this.gridBorderBrush = "#33333399";
        /** @inheritDoc */
        _this.axisBandsFill = "#AAAAAA09";
        /** @inheritDoc */
        _this.axisBorder = "#00000000";
        /** @inheritDoc */
        _this.tickTextBrush = "#333333FF";
        /** @inheritDoc */
        _this.majorGridLineBrush = "#CFCFCFFF";
        /** @inheritDoc */
        _this.minorGridLineBrush = "#CFCFCF77";
        /** @inheritDoc */
        _this.gridBackgroundBrush = "#05333377";
        /** @inheritDoc */
        _this.rolloverLineBrush = "#33333333";
        /** @inheritDoc */
        _this.cursorLineBrush = "#33333355";
        /** @inheritDoc */
        _this.rubberBandFillBrush = "#33333333";
        /** @inheritDoc */
        _this.rubberBandStrokeBrush = "#33333377";
        /** @inheritDoc */
        _this.legendBackgroundBrush = "#33333333";
        /** @inheritDoc */
        _this.labelBackgroundBrush = "#D0D0D0BB";
        /** @inheritDoc */
        _this.labelBorderBrush = "#33333377";
        /** @inheritDoc */
        _this.labelForegroundBrush = "#555555FF";
        /** @inheritDoc */
        _this.textAnnotationForeground = "#000000FF";
        /** @inheritDoc */
        _this.textAnnotationBackground = "#FFFFFFFF";
        /** @inheritDoc */
        _this.annotationsGripsBorderBrush = "#232323FF";
        /** @inheritDoc */
        _this.annotationsGripsBackroundBrush = "#FFFFFF33";
        /** @inheritDoc */
        _this.annotationSelectionStroke = "#f00e0e66";
        /** @inheritDoc */
        _this.overviewFillBrush = "#33333322";
        /** @inheritDoc */
        _this.scrollbarBackgroundBrush = "#33333322";
        /** @inheritDoc */
        _this.scrollbarBorderBrush = "#12121255";
        /** @inheritDoc */
        _this.scrollbarGripsBackgroundBrush = "#FFFFFF66";
        /** @inheritDoc */
        _this.scrollbarViewportBackgroundBrush = "#FFFFFF44";
        /** @inheritDoc */
        _this.scrollbarViewportBorderBrush = "#12121255";
        /** @inheritDoc */
        _this.upWickColor = "#52CC54FF";
        /** @inheritDoc */
        _this.downWickColor = "#E26565FF";
        /** @inheritDoc */
        _this.upBodyBrush = "#52CC54A0";
        /** @inheritDoc */
        _this.downBodyBrush = "#E26565D0";
        /** @inheritDoc */
        _this.upBandSeriesLineColor = "#52CC54FF";
        /** @inheritDoc */
        _this.downBandSeriesLineColor = "#E26565FF";
        /** @inheritDoc */
        _this.upBandSeriesFillColor = "#52CC5490";
        /** @inheritDoc */
        _this.downBandSeriesFillColor = "#E26565A0";
        /** @inheritDoc */
        _this.mountainAreaBrush = "#76B7E2B4";
        /** @inheritDoc */
        _this.mountainLineColor = "#777777FF";
        /** @inheritDoc */
        _this.lineSeriesColor = "#777777FF";
        /** @inheritDoc */
        _this.columnLineColor = "#777777FF";
        /** @inheritDoc */
        _this.columnFillBrush = "#777777FF";
        /** @inheritDoc */
        _this.impulseFillBrush = "#777777FF";
        /** @inheritDoc */
        _this.defaultColorMapBrush = [
            { offset: 0, color: "DARKBLUE" },
            { offset: 0.5, color: "CORNFLOWERBLUE" },
            { offset: 1, color: "#FF22AAFF" }
        ];
        /** @inheritDoc */
        _this.axisTitleColor = "#777777FF";
        /** @inheritDoc */
        _this.chartTitleColor = "#777777FF";
        /** @inheritDoc */
        _this.shadowEffectColor = "#A0AABAFA";
        /** @inheritDoc */
        _this.planeBorderColor = "#EEEEEEFF";
        /** @inheritDoc */
        _this.axisPlaneBackgroundFill = "TRANSPARENT";
        /** @inheritDoc */
        _this.axis3DBandsFill = "#33333333";
        /** @inheritDoc */
        _this.isLightBackground = true;
        return _this;
    }
    return SciChartJSLightTheme;
}(IThemeProvider_1.ThemeProvider));
exports.SciChartJSLightTheme = SciChartJSLightTheme;
