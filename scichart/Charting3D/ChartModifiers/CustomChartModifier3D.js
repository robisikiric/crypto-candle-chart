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
exports.CustomChartModifier3D = void 0;
var ChartModifierType_1 = require("../../types/ChartModifierType");
var ChartModifierBase3D_1 = require("./ChartModifierBase3D");
/**
 * Base class for custom Chart Modifiers (allows custom zooming, panning, interaction behaviour) on 2D Charts
 */
var CustomChartModifier3D = /** @class */ (function (_super) {
    __extends(CustomChartModifier3D, _super);
    /**
     * @inheritDoc
     * @param options
     */
    function CustomChartModifier3D(options) {
        var _this = _super.call(this, options) || this;
        /**
         * @inheritDoc
         */
        _this.type = ChartModifierType_1.EChart3DModifierType.Custom;
        return _this;
    }
    return CustomChartModifier3D;
}(ChartModifierBase3D_1.ChartModifierBase3D));
exports.CustomChartModifier3D = CustomChartModifier3D;
