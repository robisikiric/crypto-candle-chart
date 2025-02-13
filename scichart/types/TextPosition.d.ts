import { TSciChart, eTSRTextAlignMode } from "./TSciChart";
export declare enum EHorizontalTextPosition {
    Left = "Left",
    Center = "Center",
    Right = "Right"
}
export declare enum EVerticalTextPosition {
    Above = "Above",
    Center = "Center",
    Below = "Below"
}
export declare enum EMultiLineAlignment {
    Left = "Left",
    Right = "Right",
    Center = "Center"
}
export declare const convertMultiLineAlignment: (multiLineAlignment: EMultiLineAlignment, webAssemblyContext: TSciChart) => eTSRTextAlignMode;
