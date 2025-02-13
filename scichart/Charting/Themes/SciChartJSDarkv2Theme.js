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
exports.SciChartJSDarkv2Theme = void 0;
var ThemeProviderType_1 = require("../../types/ThemeProviderType");
var SciChartJSDarkTheme_1 = require("./SciChartJSDarkTheme");
/**
 * An implementation of {@link ThemeProvider} which provides an improved dark theme
 * @decription Applied to a 2D {@link SciChartSurface}, or a 3D {@link SciChart3DSurface}, the ThemeProvider may be
 * applied using the {@link SciChartSurface.applyTheme | applyTheme} method, where it is passed down to child components
 * so that all children of the chart get the same theme.
 *
 * For example:
 * ```ts
 * // Applying a theme when creating a chart
 * const { sciChartSurface, wasmContext } = SciChartSurface.create("div-id", { theme: new SciChartJSDarkv2Theme() });
 * // Apply a theme after chart creation
 * sciChartSurface.applyTheme(new SciChartJSDarkv2Theme());
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
var SciChartJSDarkv2Theme = /** @class */ (function (_super) {
    __extends(SciChartJSDarkv2Theme, _super);
    function SciChartJSDarkv2Theme() {
        var _this = _super.call(this) || this;
        /** @inheritDoc */
        _this.type = ThemeProviderType_1.EThemeProviderType.DarkV2;
        _this.sciChartBackground = "radial-gradient(circle, #3C3C3FFF 0%, #1C1C1EFF 100%)";
        _this.loadingAnimationBackground = "radial-gradient(circle, #3C3C3FFF 0%, #1C1C1EFF 100%)";
        _this.axisBandsFill = "#20212333";
        _this.majorGridLineBrush = "#AAAAAA37";
        _this.minorGridLineBrush = "#77777719";
        _this.strokePalette = ["#F48420", "#AE408E", "#209FD9", "#264B93"];
        _this.fillPalette = ["#F4842077", "#AE408E77", "#209FD977", "#264B9377"];
        _this.isLightBackground = false;
        return _this;
    }
    return SciChartJSDarkv2Theme;
}(SciChartJSDarkTheme_1.SciChartJSDarkTheme));
exports.SciChartJSDarkv2Theme = SciChartJSDarkv2Theme;
