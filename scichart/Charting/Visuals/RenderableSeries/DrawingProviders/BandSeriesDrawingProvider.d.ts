import { SCRTDoubleVector, TSciChart } from "../../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { IPointSeries } from "../../../Model/PointSeries/IPointSeries";
import { RenderPassData } from "../../../Services/RenderPassData";
import { TDpiChangedEventArgs } from "../../TextureManager/DpiHelper";
import { BaseBandRenderableSeries } from "../BaseBandRenderableSeries";
import { BaseSeriesDrawingProvider } from "./BaseSeriesDrawingProvider";
/**
 * Used internally - a drawing provider performs drawing for a {@link BaseBandRenderableSeries} using
 * our WebAssembly WebGL rendering engine
 */
export declare class BandSeriesDrawingProvider extends BaseSeriesDrawingProvider<BaseBandRenderableSeries> {
    private nativeDrawingProvider;
    private linesPenCache;
    private strokePenY1Cache;
    private fillBrushCache;
    private fillBrushY1Cache;
    private y1Selector;
    private args;
    /**
     * Creates an instance of the {@link BandSeriesDrawingProvider}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link BaseBandRenderableSeries} which this drawing provider is attached to
     */
    constructor(webAssemblyContext: TSciChart, parentSeries: BaseBandRenderableSeries, ySelector?: (ps: IPointSeries) => SCRTDoubleVector, y1Selector?: (ps: IPointSeries) => SCRTDoubleVector);
    /**
     * @inheritDoc
     */
    onAttachSeries(): void;
    /**
     * @inheritDoc
     */
    onDetachSeries(): void;
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
}
