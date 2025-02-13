import { TSciChart } from "../../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { IPointMetadata } from "../../../Model/IPointMetadata";
import { RenderPassData } from "../../../Services/RenderPassData";
import { FastBubbleRenderableSeries } from "../FastBubbleRenderableSeries";
import { IRenderableSeries } from "../IRenderableSeries";
import { BaseSeriesDrawingProvider } from "./BaseSeriesDrawingProvider";
/**
 * Used internally - a drawing provider performs drawing for a {@link FastBubbleRenderableSeries} using
 * our WebAssembly WebGL rendering engine
 */
export declare class BubbleSeriesDrawingProvider extends BaseSeriesDrawingProvider<FastBubbleRenderableSeries> {
    private nativeDrawingProvider;
    private args;
    /**
     * Creates an instance of the {@link BubbleSeriesDrawingProvider}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link FastBubbleRenderableSeries} which this drawing provider is attached to
     */
    constructor(webAssemblyContext: TSciChart, parentSeries: FastBubbleRenderableSeries);
    /**
     * @inheritDoc
     */
    onSeriesPropertyChange(propertyName: string): void;
    /**
     * @inheritDoc
     */
    draw(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    /**
     * @inheritDoc
     */
    delete(): void;
    protected overridePaletteProviderColors(rs: IRenderableSeries, xValue: number, yValue: number, index: number, opacity?: number, metadata?: IPointMetadata): {
        stroke: number;
        fill: number;
    };
    protected isGradientFillPaletting(rs: IRenderableSeries): boolean;
    private drawPoints;
}
