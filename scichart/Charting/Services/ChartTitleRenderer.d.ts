import { Rect } from "../../Core/Rect";
import { Thickness } from "../../Core/Thickness";
import { TChartTitleStyle } from "../../types/TextStyle";
import { WebGlRenderContext2D } from "../Drawing/WebGlRenderContext2D";
import { IChartTitleRenderer, TitleRendererBase } from "./TitleRenderer";
/**
 * Draws a chart title
 */
export declare class ChartTitleRenderer extends TitleRendererBase<TChartTitleStyle> implements IChartTitleRenderer {
    protected titleOffsetProperty: Thickness;
    /**
     * Defines a padding reserved for space taken by a title
     */
    get titleOffset(): Thickness;
    /**
     * Calculates {@link ChartTitleRenderer.titleOffset}
     */
    measure(title: string | string[], originalTextStyle: Required<TChartTitleStyle>, renderContext: WebGlRenderContext2D): void;
    /**
     * Calculates {@link ChartTitleRenderer.viewRect} of the title
     * @param chartViewRect - the container area which is used as an origin for title layout calculation
     */
    layout(chartViewRect: Rect): void;
    /**
     * Performs rendering of the title
     */
    draw(renderContext: WebGlRenderContext2D): void;
    protected getTitleTexture(): import("../Visuals/TextureManager/TextureManager").TTextureObject;
    /**
     * Calculates the {@link ChartTitleRenderer.titleOffset}
     */
    protected getTitleOffset(title: string | string[], textStyle: TChartTitleStyle): Thickness;
}
