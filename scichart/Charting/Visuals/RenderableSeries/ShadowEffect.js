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
exports.ShadowEffect = void 0;
var Point_1 = require("../../../Core/Point");
var ShaderEffectType_1 = require("../../../types/ShaderEffectType");
var ShaderEffect_1 = require("./ShaderEffect");
/**
 * Defines a drop-shadow shader effect that may be applied to a {@link BaseRenderableSeries | RenderableSeries}
 * @remarks
 * To apply a Shadow effect to a chart series, use the following code:
 * ```ts
 * const effect = new ShadowEffect(wasmContext, {
 *   range: 1,
 *   brightness: 100,
 *   offset: new Point(10, 10)
 * });
 * const lineSeries = new FastLineRenderableSeries(wasmContext, { stroke, effect });
 * ```
 * Note that effects implement {@link IDeletable} and must be manually deleted to free webassembly / native memory
 */
var ShadowEffect = /** @class */ (function (_super) {
    __extends(ShadowEffect, _super);
    /**
     * Creates an instance of the {@link ShadowEffect}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IShaderEffectOptions} to configure the effect
     */
    function ShadowEffect(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, new webAssemblyContext.SCRTShadowEffect(), {
            offset: (options === null || options === void 0 ? void 0 : options.offset) || new Point_1.Point(10, 10),
            range: (options === null || options === void 0 ? void 0 : options.range) || 1,
            color: options
                ? "rgba(".concat((options === null || options === void 0 ? void 0 : options.brightness) || 68, ",").concat((options === null || options === void 0 ? void 0 : options.brightness) || 68, ",").concat((options === null || options === void 0 ? void 0 : options.brightness) || 68, ",1)")
                : "#444444"
        }) || this;
        _this.type = ShaderEffectType_1.EShaderEffectType.Shadow;
        return _this;
    }
    return ShadowEffect;
}(ShaderEffect_1.ShaderEffect));
exports.ShadowEffect = ShadowEffect;
