import { ELabelProviderType } from "../../../../types/LabelProviderType";
import { TextureManager } from "../../TextureManager/TextureManager";
import { TTextStyle } from "../AxisCore";
import { TCachedLabelStyle } from "./LabelCache";
import { ILabel2DOptions, LabelProviderBase2D } from "./LabelProviderBase2D";
export interface ITextLabelOptions extends ILabel2DOptions {
    /**
     * The label text to use.  If you pass an object like {1:"one", 2:"two", 3:"three"} then labels will be chosen based on the tick value.
     * eg ticks 3,1 will result in "three", "one".
     * If you pass an array like ["one", "two", "three"] then for a category axis it will use the labels in the order given, regardless of data value.
     * If you know that your x data will be a fixed set in a fixed order, then passing an array of labels is simpler.
     * To manually specify multiple lines, pass an array for the label eg ["One line",["Two","Lines"],["Three","more","lines"]]
     */
    labels?: Record<number, string | string[]>;
    /**
     * Wrap text longer than this number of characters.  Will only wrap whole words.
     */
    maxLength?: number;
}
export declare class TextLabelProvider extends LabelProviderBase2D {
    readonly type = ELabelProviderType.Text;
    private labelsProperty;
    private maxLengthProperty;
    constructor(options?: ITextLabelOptions);
    /**
     * The label text to use.  If not set by options this will be an empty array.
     * When adding/updating labels, you should replace the whole array or object if you want to trigger chart updates.
     * If you pass an object like {1:"one", 2:"two", 3:"three"} then labels will be chosen based on the tick value.
     * eg ticks 3,1 will result in "three", "one".
     * If you pass an array like ["one", "two", "three"] then for a category axis it will use the labels in the order given, regardless of data value.
     * If you know that your x data will be a fixed set in a fixed order, then passing an array of labels is simpler.
     * To manually specify multiple lines, pass an array for the label eg ["One line",["Two","Lines"],["Three","more","lines"]]
     */
    get labels(): Record<number, string | string[]>;
    /**
     * The label text to use.  If not set by options this will be an empty array.
     * When adding/updating labels, you should replace the whole array or object if you want to trigger chart updates.
     * If you pass an object like {1:"one", 2:"two", 3:"three"} then labels will be chosen based on the tick value.
     * eg ticks 3,1 will result in "three", "one".
     * If you pass an array like ["one", "two", "three"] then for a category axis it will use the labels in the order given, regardless of data value.
     * If you know that your x data will be a fixed set in a fixed order, then passing an array of labels is simpler.
     * To manually specify multiple lines, pass an array for the label eg ["One line",["Two","Lines"],["Three","more","lines"]]
     */
    set labels(labels: Record<number, string | string[]>);
    /**
     * Wrap text longer than this number of characters.  Will only wrap whole words.
     */
    get maxLength(): number;
    set maxLength(value: number);
    onBeginAxisDraw(): void;
    getLabelWidth(ctx: CanvasRenderingContext2D, labelText: string, labelStyle?: TTextStyle): number;
    getLabelTexture(labelText: string, textureManager: TextureManager, labelStyle: TTextStyle): import("../../TextureManager/TextureManager").TTextureObject;
    /**
     * Wraps the label text and returns it as a string with newlines
     */
    wrapText(text: string | string[]): string;
    toJSON(): {
        type: string;
        options: Required<Omit<import("./LabelProvider").ILabelOptions, never>>;
    };
    protected getCachedStyle(): TCachedLabelStyle;
}
/**
 * Convert a string into an array of lines by splitting on spaces and wrapping to a maximum number of characters
 */
export declare const wrapText: (text: string, maxLength: number) => string[];
