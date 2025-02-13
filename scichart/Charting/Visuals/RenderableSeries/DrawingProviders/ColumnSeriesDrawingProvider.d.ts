import { GradientParams } from "../../../../Core/GradientParams";
import { SCRTDoubleVector, TSciChart } from "../../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { IPointSeries } from "../../../Model/PointSeries/IPointSeries";
import { RenderPassData } from "../../../Services/RenderPassData";
import { TDpiChangedEventArgs } from "../../TextureManager/DpiHelper";
import { FastColumnRenderableSeries } from "../FastColumnRenderableSeries";
import { BaseSeriesDrawingProvider } from "./BaseSeriesDrawingProvider";
interface IColumnSeriesDrawingProviderProperties {
    stroke?: string;
    strokeThickness?: number;
    fill?: string;
    opacity?: number;
    fillLinearGradient?: GradientParams;
}
/**
 * Used internally - a drawing provider performs drawing for a {@link FastColumnRenderableSeries} using
 * our WebAssembly WebGL rendering engine
 */
export declare class ColumnSeriesDrawingProvider extends BaseSeriesDrawingProvider<FastColumnRenderableSeries> {
    private nativeDrawingProvider;
    private strokePenCache;
    private strokePenFillColoredCache;
    private fillBrushCache;
    private args;
    /**
     * Creates an instance of the {@link ColumnSeriesDrawingProvider}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link FastColumnRenderableSeries} which this drawing provider is attached to
     */
    constructor(webAssemblyContext: TSciChart, parentSeries: FastColumnRenderableSeries, ySelector?: (ps: IPointSeries) => SCRTDoubleVector, xSelector?: (ps: IPointSeries) => SCRTDoubleVector);
    /**
     * @inheritDoc
     */
    delete(): void;
    getProperties(parentSeries: FastColumnRenderableSeries): IColumnSeriesDrawingProviderProperties;
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
    private createBrush;
}
export {};
