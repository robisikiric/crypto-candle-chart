import { Rect } from "../../Core/Rect";
import { WebGlRenderContext2D } from "../Drawing/WebGlRenderContext2D";
import { SciChartSurface } from "../Visuals/SciChartSurface";
/**
 * A class used internally in SciChart to perform layout, arrangement, data-preparation and rendering on the Cartesian 2D {@link SciChartSurface}
 */
export declare class SciChartRenderer {
    isInvalidated: boolean;
    protected sciChartSurface: SciChartSurface;
    protected previousTime: number;
    protected prevRect: Rect;
    /**
     * Creates an instance of the SciChartRenderer
     * @param sciChartSurface The {@link SciChartSurface} that we are rendering
     */
    constructor(sciChartSurface: SciChartSurface);
    /**
     * Render loop for the current {@SciChartSurface}
     * @param renderContext the {@WebGLRenderContext2D} used for drawing
     */
    render(renderContext: WebGlRenderContext2D): void;
    private drawRenderContextAnnotations;
    private drawSvgAnnotations;
    private validate;
    protected resizeAnnotationRootElements(seriesViewRect: Rect): void;
    private getAxisDictionaries;
    private prepareAxesRenderData;
    private prepareSeriesRenderData;
    private drawAxes;
    private drawSeries;
    private drawDebugAxes;
    private tryPerformAutoRangeOn;
    private onParentSurfaceRendered;
    private updateWatermark;
    private getViewportSvgRect;
    private scheduleTitleDraw;
    private measureTitle;
    private layoutTitle;
    private getChartViewRect;
    private getAbsoluteLayer;
    private drawDebugSurfaceRect;
}
