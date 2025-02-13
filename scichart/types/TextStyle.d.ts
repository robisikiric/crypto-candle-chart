import { Thickness } from "../Core/Thickness";
import { EMultiLineAlignment } from "./TextPosition";
/**
 * Defines the anchor point of a text
 */
export declare enum ETextAlignment {
    Center = "Center",
    Left = "Left",
    Right = "Right"
}
/**
 * Defines a side where the chart title should be placed
 */
export declare enum ETitlePosition {
    Top = "Top",
    Bottom = "Bottom",
    Right = "Right",
    Left = "Left"
}
/**
 * Defines common properties of text to render
 */
export declare type TTextStyleBase = {
    fontSize?: number;
    fontFamily?: string;
    color?: string;
    /**
     * Line spacing to use if text is wrapped.
     * This is a multiple of the line height and defaults to 1.1
     */
    lineSpacing?: number;
    padding?: Thickness;
};
/**
 * Defines properties of text rendered via Native Text API
 */
export declare type TNativeTextStyle = TTextStyleBase & {
    useNativeText: true;
};
/**
 * Defines properties of text rendered as a texture
 */
export declare type TTextureTextStyle = TTextStyleBase & {
    useNativeText?: false;
    fontWeight?: string;
    fontStyle?: string;
};
/**
 * Defines text style which allows to switch between Native / Non-native text rendering
 */
export declare type TCommonTextStyle = TNativeTextStyle | TTextureTextStyle;
export declare type TAdvancedTextProperties = {
    /** Horizontal text alignment for multiline text. */
    multilineAlignment?: EMultiLineAlignment;
    /** Text rotation in degrees. */
    rotation?: number;
};
/**
 * Defines text style with advanced options
 */
export declare type TAdvancedTextStyle = TCommonTextStyle & TAdvancedTextProperties;
/**
 * Defines text style and positioning options used for Chart Title rendering
 */
export declare type TChartTitleStyle = TAdvancedTextStyle & {
    /**
     * Defines a side where the title should be placed.
     * @remarks
     * {@link ETitlePosition.left} rotates the text clockwise by 90 degrees,
     *  while {@link ETitlePosition.Right} rotates the text counterclockwise by 90 degrees
     */
    position?: ETitlePosition;
    /**
     * Defines an anchor of the title relative to text
     * @remarks
     * the alignment directions are rotated accordingly to {@link TChartTitleStyle.position}
     */
    alignment?: ETextAlignment;
    /**
     * Defines whether title should be inside or outside of the series drawing area
     */
    placeWithinChart?: boolean;
};
/** @ignore */
export declare const getIsHorizontalPlacement: (position: ETitlePosition) => boolean;
/** @ignore */
export declare const handleInvalidChartTitlePosition: (invalidValue: never) => never;
/** @ignore */
export declare const handleInvalidTextAlignment: (invalidValue: never) => never;
/** @ignore */
export declare const areEqualTextureTextStyles: (style1: TTextureTextStyle, style2: TTextureTextStyle) => boolean;
/** @ignore */
export declare const areEqualNativeTextStyles: (style1: TNativeTextStyle, style2: TNativeTextStyle) => boolean;
/** @ignore */
export declare const areEqualSimpleTextStyles: (style1: TCommonTextStyle, style2: TCommonTextStyle) => boolean;
/** @ignore */
export declare const areEqualTextStyles: (style1: TAdvancedTextStyle, style2: TAdvancedTextStyle) => boolean;
/** @ignore */
export declare const adjustTextStyle: (textStyle: TCommonTextStyle) => TCommonTextStyle;
