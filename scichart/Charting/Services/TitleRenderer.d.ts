import { DeletableEntity } from "../../Core/DeletableEntity";
import { ICacheable } from "../../Core/ICacheable";
import { IDeletable } from "../../Core/IDeletable";
import { Rect } from "../../Core/Rect";
import { Thickness } from "../../Core/Thickness";
import { ETextAlignment, ETitlePosition, TChartTitleStyle } from "../../types/TextStyle";
import { WebGlRenderContext2D } from "../Drawing/WebGlRenderContext2D";
import { TAxisTitleStyle } from "../Visuals/Axis/AxisCore";
import { TSciChart } from "../Visuals/SciChartSurface";
import { INotifyOnDpiChanged, TDpiChangedEventArgs } from "../Visuals/TextureManager/DpiHelper";
import { TextureManager, TTextureObject } from "../Visuals/TextureManager/TextureManager";
export interface ITitleRenderer extends IDeletable, ICacheable, INotifyOnDpiChanged {
    viewRect: Rect;
    measure(...params: any[]): void;
    draw(...params: any[]): void;
    layout(viewRectOrigin: Rect): void;
}
export interface IChartTitleRenderer extends ITitleRenderer {
    titleOffset: Thickness;
    measure(title: string | string[], originalTextStyle: Required<TChartTitleStyle>, renderContext: WebGlRenderContext2D): void;
}
export declare class TitleRendererBase<TextStyleType extends TAxisTitleStyle | TChartTitleStyle> extends DeletableEntity implements ITitleRenderer {
    /**
     * Defines a bounding {@link Rect} containing the title text
     */
    get viewRect(): Rect;
    drawDebug: boolean;
    useCache: boolean;
    /**
     * Current title
     */
    protected text: string | string[];
    protected viewRectProperty: Rect;
    protected webAssemblyContext: TSciChart;
    protected textureManager: TextureManager;
    /**
     * Adjusted text style for the title
     */
    protected textStyle: TextStyleType;
    /**
     * Current not adjusted text style for the title
     */
    protected originalTextStyle: TextStyleType;
    /**
     * The height taken by the text with normal(horizontal) orientation including padding
     */
    protected textHeight: number;
    /**
     * The width taken by the text with normal(horizontal) orientation including padding
     */
    protected textWidth: number;
    /**
     * The height taken by the text considering current orientation including padding
     */
    protected desiredHeightProperty: number;
    /**
     * The width taken by the text considering current orientation including padding
     */
    protected desiredWidthProperty: number;
    /**
     * The text texture  corresponding to current title and text style.
     * @remarks The texture is created if {@link textStyle.useNativeText} is set to false
     */
    protected texture: TTextureObject;
    /** The line spacing for native text calculated during measure */
    protected nativeLineSpacing: number;
    protected nativeTextShiftX: number;
    protected nativeTextShiftY: number;
    protected useNativeTextProperty: boolean;
    protected titlePosition: ETitlePosition;
    constructor(webAssemblyContext: TSciChart);
    measure(...params: any[]): void;
    layout(originRect: Rect): void;
    draw(...params: any[]): void;
    delete(): void;
    resetCache(): void;
    invalidateCache(): void;
    onDpiChanged(args: TDpiChangedEventArgs): void;
    /**
     * Performs rendering of the title
     */
    protected drawInternal(renderContext: WebGlRenderContext2D, useNativeText: boolean, titlePosition: ETitlePosition): void;
    protected drawWithNativeText(renderContext: WebGlRenderContext2D, position: ETitlePosition): void;
    protected drawWithTexture(renderContext: WebGlRenderContext2D, titlePosition: ETitlePosition): void;
    /**
     * Calculates width and hight of the title text
     */
    protected getTextSize(title: string | string[], textStyle: TChartTitleStyle, renderContext: WebGlRenderContext2D): void;
    protected getTitleTexture(): TTextureObject;
    /**
     * Calculates the {@link TitleRenderer.viewRect}
     */
    protected getViewRect(title: string | string[], originRect: Rect, titlePosition: ETitlePosition, alignment: ETextAlignment): Rect;
    protected drawTitleDebugViewRect(renderContext: WebGlRenderContext2D): void;
    /**
     * Calculates the offset of title text alignment defined by {@link TChartTitleStyle.alignment} or {@link TTextStyle.alignment}
     */
    private getAlignmentAdjustmentDelta;
}
export declare const getAdjustedRotation: (rotation: number, position: ETitlePosition) => number;
