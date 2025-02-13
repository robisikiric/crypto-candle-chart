/**
 * Enumeration constants to define {@link AxisBase2D.alignment}
 */
export declare enum EAxisAlignment {
    Right = "Right",
    Left = "Left",
    Top = "Top",
    Bottom = "Bottom"
}
export declare const getIsHorizontal: (alignment: EAxisAlignment) => boolean;
export declare const getIsVertical: (alignment: EAxisAlignment) => boolean;
export declare const handleInvalidAxisAlignment: (alignment: never) => never;
