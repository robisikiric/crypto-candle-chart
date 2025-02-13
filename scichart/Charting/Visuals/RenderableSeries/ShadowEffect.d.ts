import { Point } from "../../../Core/Point";
import { EShaderEffectType } from "../../../types/ShaderEffectType";
import { TSciChart } from "../../../types/TSciChart";
import { ShaderEffect } from "./ShaderEffect";
export interface IShadowEffectOptions {
    range?: number;
    brightness?: number;
    offset?: Point;
}
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
export declare class ShadowEffect extends ShaderEffect {
    readonly type = EShaderEffectType.Shadow;
    /**
     * Creates an instance of the {@link ShadowEffect}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IShaderEffectOptions} to configure the effect
     */
    constructor(webAssemblyContext: TSciChart, options?: IShadowEffectOptions);
}
