import { Rect } from "../../../Core/Rect";
import { EAxisAlignment } from "../../../types/AxisAlignment";
import { WebGlRenderContext2D } from "../../Drawing/WebGlRenderContext2D";
import { TitleRendererBase } from "../../Services/TitleRenderer";
import { SciChartSurface } from "../SciChartSurface";
import { TAxisTitleStyle } from "./AxisCore";
/**
 * Draws an axis title using our WebGL Rendering engine
 */
export declare class AxisTitleRenderer extends TitleRendererBase<TAxisTitleStyle> {
    lineSpacing: number;
    /** For internal use */
    parentSurface: SciChartSurface;
    private previousText;
    private previousLineSpacing;
    private previousNativeTextMode;
    private previousAxisAlignment;
    measure(text: string | string[], textStyle: TAxisTitleStyle, axisAlignment: EAxisAlignment): void;
    get useNativeText(): boolean;
    set useNativeText(value: boolean);
    get desiredHeight(): number;
    set desiredHeight(value: number);
    get desiredWidth(): number;
    set desiredWidth(value: number);
    layout(rect: Rect): void;
    protected getTitleTexture(): import("../TextureManager/TextureManager").TTextureObject;
    draw(renderContext: WebGlRenderContext2D): void;
    delete(): void;
}
