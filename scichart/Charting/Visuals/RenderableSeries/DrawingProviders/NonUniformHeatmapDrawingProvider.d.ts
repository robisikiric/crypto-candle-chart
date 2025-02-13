import { TSciChart } from "../../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { RenderPassData } from "../../../Services/RenderPassData";
import { NonUniformHeatmapRenderableSeries } from "../NonUniformHeatmapRenderableSeries";
import { BaseSeriesDrawingProvider } from "./BaseSeriesDrawingProvider";
/**
 * Used internally - a drawing provider performs drawing for a {@link NonUniformHeatmapRenderableSeries} using
 * our WebAssembly WebGL rendering engine
 */
export declare class NonUniformHeatmapDrawingProvider extends BaseSeriesDrawingProvider<NonUniformHeatmapRenderableSeries> {
    private heatTextureCache;
    private colorDataVector;
    private colorGradientScale;
    private getMemoizedHeatmapTexture;
    /**
     * Creates an instance of the {@link UniformHeatmapDrawingProvider}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link UniformHeatmapRenderableSeries} which this drawing provider is attached to
     */
    constructor(webAssemblyContext: TSciChart, parentSeries: NonUniformHeatmapRenderableSeries);
    /**
     * @inheritDoc
     */
    delete(): void;
    /**
     * @inheritDoc
     */
    onSeriesPropertyChange(propertyName: string): void;
    /**
     * @inheritDoc
     */
    draw(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    private drawHeatmapInTypescript;
    private calculateHeatmapTexture;
}
