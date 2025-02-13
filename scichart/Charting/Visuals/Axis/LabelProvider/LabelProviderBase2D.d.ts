import { ICacheable } from "../../../../Core/ICacheable";
import { TSRTexture } from "../../../../types/TSciChart";
import { TextureManager, TTextureObject } from "../../TextureManager/TextureManager";
import { TTextStyle } from "../AxisCore";
import { TCachedLabelStyle } from "./LabelCache";
import { ILabelOptions, LabelProvider } from "./LabelProvider";
export declare class LabelInfo {
    tick: number;
    text: string;
    bitmapTexture: TSRTexture;
    textWidth: number;
    textHeight: number;
    textureHeight: number;
    textureWidth: number;
    lastUsed: number;
    constructor(tick: number, text: string, bitmapTexture: TSRTexture, textureHeight: number, textureWidth: number);
}
export interface ILabel2DOptions extends ILabelOptions {
    rotation?: number;
    /**
     * @deprecated This functionality has been removed. useNativeText: true provides much greater performance benefit.
     */
    asyncLabels?: boolean;
    /**
     * Whether to use cached labels from other axes that have the same style.
     * You may need to set this false if you are overriding getLabelTexture or getLabelTextureAsync without setting a unique style.
     */
    useSharedCache?: boolean;
    /**
     * Experimental - set true to use native text for axes.  Not all text features currently supported
     */
    useNativeText?: boolean;
    /**
     * Line spacing to use if text is wrapped.
     * For normal labels this is a multiple of the text height and defaults to 1.1
     * For native text it is a number of pixels and defaults to 2
     */
    lineSpacing?: number;
}
/**
 * The {@link LabelProviderBase2D} provides base functionality for 2D label providers, including caching of label textures
 */
export declare abstract class LabelProviderBase2D extends LabelProvider implements ICacheable {
    useCache: boolean;
    /** Whether to use cached labels from other axes that have the same style.
     * You may need to set this false if you are overriding getLabelTexture without setting a unique style.
     * Can be set globally using SciChartDefaults.  Currently default false.
     */
    useSharedCache: boolean;
    /**
     * @deprecated This functionality has been removed. useNativeText: true provides much greater performance benefit.
     */
    asyncLabels: boolean;
    /**
     * Experimental - set true to use native text for axes.  Not all text features currently supported
     */
    useNativeText: boolean;
    protected tickToText: Map<number, string>;
    /** Set this true if the format function could return different results for the same input (eg SmartDateLabelprovider) */
    textVariesForSameTick: boolean;
    /**
     * This is the id for the text style used by this axis, as stored in the label cache. Cached labels are accessed by text and styleId.
     * If you have useSharedCache = true and are overriding getLabelTexture or getLabelTextureAsync and do not ensure the style is unique,
     * you might not get the labels you expect.
     * You can either set useSharedCache = false, set this to some unique value, or override getCachedStyle
     */
    protected styleId: string;
    private rotationProperty;
    private lineSpacingProperty;
    constructor(options?: ILabel2DOptions);
    get rotation(): number;
    set rotation(value: number);
    /**
     * Line spacing to use if text is wrapped, as a multiple of the text height.  Defaults to 1.1
     */
    get lineSpacing(): number;
    /**
     * Line spacing to use if text is wrapped, as a multiple of the text height.  Defaults to 1.1
     */
    set lineSpacing(value: number);
    /**
     * Returns an array of label strings for an array of major tick numeric values
     * @param majorTicks The major tick numeric values
     */
    getLabels(majorTicks: number[]): string[];
    /**
     * Called during axis layout to get the height of the label
     * @param ctx the CanvasRenderingContext2D which can be used to perform text measurment
     * @param labelText the text of the label
     * @param labelStyle the style of the label
     * @returns the label height in pixels
     */
    getLabelHeight(ctx: CanvasRenderingContext2D, labelText: string, labelStyle: TTextStyle): number;
    /**
     * Called during axis layout to get the width of the label
     * @param ctx the CanvasRenderingContext2D which can be used to perform text measurment
     * @param labelText the text of the label
     * @param labelStyle the style of the label
     * @returns the label width in pixels
     */
    getLabelWidth(ctx: CanvasRenderingContext2D, labelText: string, labelStyle?: TTextStyle): number;
    /**
     * Called during axis layout to get the maximum height of labels on a horizontal axis.
     * Normally this calls getLabelHeight for each label and returns the largest.
     * @param majorTickLabels an array of text labels
     * @param ctx the CanvasRenderingContext2D which can be used to perform text measurment
     * @param labelStyle the style of the labels
     * @returns the maximum label height in pixels
     */
    getMaxLabelHeightForHorizontalAxis(majorTickLabels: string[], ctx: CanvasRenderingContext2D, labelStyle: TTextStyle): number;
    /**
     * Called during axis layout to get the maximum width of labels on a vertical axis.
     * Normally this calls getLabelWidth for each label and returns the largest.
     * @param majorTickLabels an array of text labels
     * @param ctx the CanvasRenderingContext2D which can be used to perform text measurment
     * @param labelStyle the style of the labels
     * @returns the maximum label width in pixels
     */
    getMaxLabelWidthForVerticalAxis(majorTickLabels: string[], ctx: CanvasRenderingContext2D, labelStyle: TTextStyle): number;
    /**
     * Get a texture for the given label text. By default the textures are created first and then the resulting sizes are used by the layout functions
     * @param labelText The required text
     * @param textureManager A textureManager instance which contains methods for creating textures
     * @param labelStyle The style for the text
     * @returns A TTextureObject containing the bitmapTexture and the size
     */
    getCachedLabelTexture(labelText: string, textureManager: TextureManager, labelStyle: TTextStyle): TTextureObject;
    /**
     * @deprecated AsyncLabels have been removed. useNativeText: true provides much greater performance benefit.
     * If using texture labels override getLabelTexture instead
     */
    getLabelTextureAsync(labelText: string, textureManager: TextureManager, labelStyle: TTextStyle): Promise<TTextureObject>;
    /**
     * Create a texture for the given label text. This method is called if useNativeText is false.
     * If overriding this method with useSharedCache = true, consider setting it false for this LabelProvider,
     * otherwise other axes using the same style and text may see your custom texture. Alternatively you can override getCachedStyle or set styleId directly
     */
    getLabelTexture(labelText: string, textureManager: TextureManager, labelStyle: TTextStyle): TTextureObject;
    getNativeLabelInfo(labelText: string): LabelInfo;
    invalidateCache(): void;
    resetCache(): void;
    delete(): void;
    toJSON(): {
        type: string;
        options: Required<Omit<ILabelOptions, never>>;
    };
    protected getLabelSizesNative(labels: string[], textStyle: TTextStyle): void;
    protected providerId: string;
    protected pruneTickTextCache(): void;
    /**
     * This method creates the text style to be stored in the label cache.
     * When useSharedCache = true, the label cache will generate a new styleId if this style does not match any existing style.
     * Cached labels are accessed by text and styleId.
     * If you are overriding getLabelTexture or getLabelTextureAsync and do not ensure the style is unique, you might not get the labels you expect.
     * You can either set useSharedCache = false, override this and set the extras field in {@link TCachedLabelStyle}, or set styleId directly
     */
    protected getCachedStyle(): TCachedLabelStyle;
    protected clearCache(): void;
    protected invalidateParent(): void;
}
