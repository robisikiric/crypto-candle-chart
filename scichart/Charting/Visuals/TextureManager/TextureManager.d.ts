import { DeletableEntity } from "../../../Core/DeletableEntity";
import { IDeletable } from "../../../Core/IDeletable";
import { EAxisAlignment } from "../../../types/AxisAlignment";
import { TSciChart, TSRTexture } from "../../../types/TSciChart";
import { TTextStyle } from "../Axis/AxisCore";
/** @ignore */
export declare type TTextureObject = {
    bitmapTexture: TSRTexture;
    textureWidth: number;
    textureHeight: number;
};
export declare class TextureManager extends DeletableEntity implements IDeletable {
    private webAssemblyContext;
    private canvas;
    private ctx;
    constructor(webAssemblyContext: TSciChart);
    createSimpleTextTexture(text: string, textStyle: TTextStyle, backgroundColor?: string, displayVertically?: boolean, displayMirrored?: boolean, opacity?: number): TTextureObject;
    /**
     * Create a text texture supporting multiline and arbitrary rotation
     * @param text
     * @param textStyle
     * @param rotation
     * @param lineSpacing Expressed as a fraction of the font size. Default 1.1
     * @param backgroundColor
     * @param opacity
     * @returns
     */
    createTextTextureNative(text: string[], textStyle: TTextStyle, rotation?: number, lineSpacing?: number, backgroundColor?: string, opacity?: number): TTextureObject;
    /**
     * Create a text texture supporting multiline and arbitrary rotation
     * @param text
     * @param textStyle
     * @param rotation
     * @param lineSpacing Expressed as a fraction of the font size. Default 1.1
     * @param backgroundColor
     * @param opacity
     * @returns
     */
    createTextTexture(text: string[], textStyle: TTextStyle, rotation?: number, lineSpacing?: number, backgroundColor?: string, opacity?: number): TTextureObject;
    createAxisMarkerTexture(axisAlignment: EAxisAlignment, text: string, fontStyle: string, fontWeight: string, fontSizePx: number, fontFamily: string, color: string, padding?: number, backgroundColor?: string, opacity?: number): TTextureObject;
    /**
     * Creates {@link TSRTexture} from image
     * @param image The image
     * @param imageWidth The image width, not premultiplied value
     * @param imageHeight The image height, not premultiplied value
     */
    createTextureFromImage(image: HTMLImageElement, imageWidth: number, imageHeight: number): TTextureObject;
    getTextureContext(width: number, height: number): CanvasRenderingContext2D;
    createTextureFromCtxBuffer(textureWidth: number, textureHeight: number): TTextureObject;
    createTextureFromImageData(imageData: ImageData, textureWidth: number, textureHeight: number): TTextureObject;
    delete(): void;
    private createTextureFromCtx;
}
export declare const measureTextHeight: (fontSizePx: number) => number;
export declare const measureTextWidth: (ctx: CanvasRenderingContext2D, text: string) => number;
