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
exports.SciChartJsNavyTheme = void 0;
var ThemeProviderType_1 = require("../../types/ThemeProviderType");
var IThemeProvider_1 = require("./IThemeProvider");
var SciChartJSDarkv2Theme_1 = require("./SciChartJSDarkv2Theme");
var SciChartJsNavyTheme = /** @class */ (function (_super) {
    __extends(SciChartJsNavyTheme, _super);
    function SciChartJsNavyTheme() {
        var _this = _super.call(this) || this;
        _this.type = ThemeProviderType_1.EThemeProviderType.Navy;
        _this.background1 = "#22365B";
        _this.background2 = "#17243d";
        _this.loadingBackground1 = "#21253D";
        _this.loadingBackground2 = "#09090F";
        _this.sciChartBackground = "radial-gradient(circle, ".concat(_this.background1, " 0%, ").concat(_this.background2, " 100%)");
        _this.loadingAnimationBackground = "radial-gradient(circle, ".concat(_this.loadingBackground1, " 0%, ").concat(_this.loadingBackground2, " 100%)");
        _this.loadingAnimationForeground = "#2A2F4C";
        _this.axisBandsFill = "#52469503";
        _this.majorGridLineBrush = "#191C6D77";
        _this.minorGridLineBrush = "#2B2D7077";
        _this.tickTextBrush = "#8398ba";
        _this.strokePalette = ["#274b92", "#47bde6", "#ae418d", "#e97064", "#68bcae", "#634e96"];
        _this.fillPalette = ["#274b9288", "#47bde688", "#ae418d88", "#e9706488", "#68bcae88", "#634e9688"];
        _this.lineSeriesColor = IThemeProvider_1.AUTO_COLOR;
        _this.planeBorderColor = "#191C6D77";
        _this.axisPlaneBackgroundFill = "TRANSPARENT";
        _this.axis3DBandsFill = "#52469503";
        _this.isLightBackground = false;
        return _this;
    }
    return SciChartJsNavyTheme;
}(SciChartJSDarkv2Theme_1.SciChartJSDarkv2Theme));
exports.SciChartJsNavyTheme = SciChartJsNavyTheme;
