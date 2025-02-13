import { TSciChart } from "../../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { RenderPassData } from "../../../Services/RenderPassData";
import { TDpiChangedEventArgs } from "../../TextureManager/DpiHelper";
import { BaseOhlcRenderableSeries } from "../BaseOhlcRenderableSeries";
import { BaseSeriesDrawingProvider } from "./BaseSeriesDrawingProvider";
export declare enum EOhlcDrawingMode {
    Candles = "Candles",
    Ohlc = "Ohlc"
}
/**
 * Used internally - a drawing provider performs drawing for a {@link FastOhlcRenderableSeries} using
 * our WebAssembly WebGL rendering engine
 */
export declare class OhlcSeriesDrawingProvider extends BaseSeriesDrawingProvider<BaseOhlcRenderableSeries> {
    private nativeDrawingProvider;
    private strokeUpPenCache;
    private strokeDownPenCache;
    private brushUpCache;
    private brushDownCache;
    private drawingMode;
    private args;
    /**
     * Creates an instance of the {@link OhlcSeriesDrawingProvider}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link FastOhlcRenderableSeries} which this drawing provider is attached to
     * @param drawingMode the drawing mode {@link EOhlcDrawingMode}
     */
    constructor(webAssemblyContext: TSciChart, parentSeries: BaseOhlcRenderableSeries, drawingMode: EOhlcDrawingMode);
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
    draw(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    /**
     * @inheritDoc
     */
    delete(): void;
}
