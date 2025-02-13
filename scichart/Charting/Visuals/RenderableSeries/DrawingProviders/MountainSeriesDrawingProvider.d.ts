import { TSciChart } from "../../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { RenderPassData } from "../../../Services/RenderPassData";
import { TDpiChangedEventArgs } from "../../TextureManager/DpiHelper";
import { BaseMountainRenderableSeries } from "../BaseMountainRenderableSeries";
import { BaseSeriesDrawingProvider } from "./BaseSeriesDrawingProvider";
/**
 * Used internally - a drawing provider performs drawing for a {@link BaseMountainRenderableSeries} using
 * our WebAssembly WebGL rendering engine
 */
export declare class MountainSeriesDrawingProvider extends BaseSeriesDrawingProvider<BaseMountainRenderableSeries> {
    private nativeDrawingProvider;
    private strokePenCache;
    private fillBrushCache;
    private args;
    /**
     * Creates an instance of the {@link MountainSeriesDrawingProvider}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link BaseMountainRenderableSeries} which this drawing provider is attached to
     */
    constructor(webAssemblyContext: TSciChart, parentSeries: BaseMountainRenderableSeries);
    /**
     * @inheritDoc
     */
    delete(): void;
    /**
     * @inheritDoc
     */
    draw(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    /**
     * @inheritDoc
     */
    onDpiChanged(args: TDpiChangedEventArgs): void;
    /**
     * @inheritDoc
     */
    onSeriesPropertyChange(propertyName: string): void;
    /**
     * @inheritDoc
     */
    onAttachSeries(): void;
    private createBrush;
    private createPen;
}
