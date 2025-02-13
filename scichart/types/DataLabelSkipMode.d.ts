/**
 * Specifies Data Label Skip Modes as applied to {@DataLabelProvider.skipMode}
 */
export declare enum EDataLabelSkipMode {
    /**
     * Show all data labels
     */
    ShowAll = "ShowAll",
    /**
     * Skip N=skipNumber labels if the current overlaps the previous
     */
    SkipIfOverlapPrevious = "SkipIfOverlapPrevious",
    /**
     * Skip N=skipNumber labels if the current overlaps the next
     */
    SkipIfOverlapNext = "SkipIfOverlapNext",
    /**
     * Skip N=skipNumber labels if the current has the same value as the previous
     */
    SkipIfSame = "SkipIfSame"
}
