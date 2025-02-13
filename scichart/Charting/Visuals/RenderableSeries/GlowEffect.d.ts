import { EShaderEffectType } from "../../../types/ShaderEffectType";
import { TSciChart } from "../../../types/TSciChart";
import { ShaderEffect } from "./ShaderEffect";
export interface IGlowEffectOptions {
    intensity?: number;
    range?: number;
}
/**
 * Defines a glow shader effect that may be applied to a {@link BaseRenderableSeries | RenderableSeries}
 * @remarks
 * To apply a Glow effect to a chart series, use the following code:
 * ```ts
 * const effect = new GlowEffect(wasmContext, {
 *   range: 1,
 *   intensity: 1
 * });
 * const lineSeries = new FastLineRenderableSeries(wasmContext, { stroke, effect });
 * ```
 * Note that effects implement {@link IDeletable} and must be manually deleted to free webassembly / native memory
 */
export declare class GlowEffect extends ShaderEffect {
    readonly type = EShaderEffectType.Glow;
    /**
     * Creates an instance of the {@link GlowEffect}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IShaderEffectOptions} to configure the effect
     */
    constructor(webAssemblyContext: TSciChart, options?: IGlowEffectOptions);
}
