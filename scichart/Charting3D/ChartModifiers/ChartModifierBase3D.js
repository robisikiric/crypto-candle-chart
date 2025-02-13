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
exports.ChartModifierBase3D = void 0;
var ChartModifierBase_1 = require("../../Charting/ChartModifiers/ChartModifierBase");
/**
 * Defines a base class to a ChartModifier3D - a class which provides Zoom, Pan, Tooltip or interaction behavior
 * to SciChart - High Performance Realtime {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 */
var ChartModifierBase3D = /** @class */ (function (_super) {
    __extends(ChartModifierBase3D, _super);
    /**
     * Creates an instance of a {@link ChartModifierBase3D}
     * @param options Optional parameters of type {@link IChartModifierBase3DOptions} used to configure the modifier
     */
    function ChartModifierBase3D(options) {
        var _this = _super.call(this, options) || this;
        // used to track if registered types were used for function properties, so they can be serialized
        _this.typeMap = new Map();
        return _this;
    }
    Object.defineProperty(ChartModifierBase3D.prototype, "modifierType", {
        /**
         * @inheritDoc
         */
        get: function () {
            return ChartModifierBase_1.EModifierType.Chart3DModifier;
        },
        enumerable: false,
        configurable: true
    });
    ChartModifierBase3D.prototype.toJSON = function () {
        var options = {
            id: this.id,
            executeOn: this.executeOn
        };
        return { type: this.type, options: options };
    };
    return ChartModifierBase3D;
}(ChartModifierBase_1.ChartModifierBase));
exports.ChartModifierBase3D = ChartModifierBase3D;
