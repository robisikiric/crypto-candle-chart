import { SCRTDoubleVector, TSciChart } from "../../../../types/TSciChart";
import { ELineDrawMode, WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { IPointSeries } from "../../../Model/PointSeries/IPointSeries";
import { RenderPassData } from "../../../Services/RenderPassData";
import { TDpiChangedEventArgs } from "../../TextureManager/DpiHelper";
import { BaseLineRenderableSeries, ELineType } from "../BaseLineRenderableSeries";
import { BaseSeriesDrawingProvider } from "./BaseSeriesDrawingProvider";
export interface ILineSeriesDrawingProviderProperties {
    stroke?: string;
    strokeThickness?: number;
    opacity?: number;
    strokeDashArray?: number[];
    isDigitalLine: boolean;
    drawNaNAs: ELineDrawMode;
    lineType: ELineType;
    containsNaN: boolean;
}
/**
 * Used internally - a drawing provider performs drawing for a {@link FastLineRenderableSeries} using
 * our WebAssembly WebGL rendering engine
 */
export declare class LineSeriesDrawingProvider extends BaseSeriesDrawingProvider<BaseLineRenderableSeries> {
    private linesPenCache;
    private nativeDrawingProvider;
    private args;
    /**
     * Creates an instance of the {@link LineSeriesDrawingProvider}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link FastLineRenderableSeries} which this drawing provider is attached to
     */
    constructor(webAssemblyContext: TSciChart, parentSeries: BaseLineRenderableSeries, ySelector?: (ps: IPointSeries) => SCRTDoubleVector, xSelector?: (ps: IPointSeries) => SCRTDoubleVector);
    /**
     * @inheritDoc
     */
    onDpiChanged(args: TDpiChangedEventArgs): void;
    /**
     * @inheritDoc
     */
    onSeriesPropertyChange(propertyName: string): void;
    /** A mapping function to get the pen properties from the parent series */
    getProperties(parentSeries: BaseLineRenderableSeries): ILineSeriesDrawingProviderProperties;
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
    draw(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    /**
     * @inheritDoc
     */
    delete(): void;
    private drawLines;
}
