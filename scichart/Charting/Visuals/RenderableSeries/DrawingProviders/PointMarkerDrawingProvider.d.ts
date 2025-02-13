import { SCRTDoubleVector, TSciChart } from "../../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../../Drawing/WebGlRenderContext2D";
import { IPointMetadata } from "../../../Model/IPointMetadata";
import { IPointSeries } from "../../../Model/PointSeries/IPointSeries";
import { RenderPassData } from "../../../Services/RenderPassData";
import { IPointMarker } from "../../PointMarkers/IPointMarker";
import { IRenderableSeries } from "../IRenderableSeries";
import { ISpline } from "../ISpline";
import { BaseSeriesDrawingProvider } from "./BaseSeriesDrawingProvider";
/**
 * Used internally - a drawing provider performs drawing for a {@link IRenderableSeries | Renderable Series} which draw a
 * point-marker using our WebAssembly WebGL rendering engine
 */
export declare class PointMarkerDrawingProvider extends BaseSeriesDrawingProvider<IRenderableSeries> {
    private nativeDrawingProvider;
    private ySplineValuesSelector;
    private xAnimationPointMarkerValues;
    private yAnimationPointMarkerValues;
    private args;
    /**
     * Creates an instance of the {@link PointMarkerDrawingProvider}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries the parent {@link IRenderableSeries} which this drawing provider is attached to
     * @param ySelector an optional Y-selector for choosing which y-values to use for drawing points
     * @param ySplineSelector an optional selector for choosing which y-animation values to use for drawing points
     */
    constructor(webAssemblyContext: TSciChart, parentSeries: IRenderableSeries, ySelector?: (ps: IPointSeries) => SCRTDoubleVector, ySplineSelector?: (rs: ISpline) => SCRTDoubleVector, xSelector?: (ps: IPointSeries) => SCRTDoubleVector);
    /**
     * @inheritDoc
     */
    onSeriesPropertyChange(propertyName: string): void;
    getProperties(parentSeries: IRenderableSeries): {
        pointMarker?: IPointMarker;
    };
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
    private pointMarkerXYValuesFromSpline;
}
