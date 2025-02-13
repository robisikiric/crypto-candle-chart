"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EDataLabelSkipMode = void 0;
/**
 * Specifies Data Label Skip Modes as applied to {@DataLabelProvider.skipMode}
 */
var EDataLabelSkipMode;
(function (EDataLabelSkipMode) {
    /**
     * Show all data labels
     */
    EDataLabelSkipMode["ShowAll"] = "ShowAll";
    /**
     * Skip N=skipNumber labels if the current overlaps the previous
     */
    EDataLabelSkipMode["SkipIfOverlapPrevious"] = "SkipIfOverlapPrevious";
    /**
     * Skip N=skipNumber labels if the current overlaps the next
     */
    EDataLabelSkipMode["SkipIfOverlapNext"] = "SkipIfOverlapNext";
    /**
     * Skip N=skipNumber labels if the current has the same value as the previous
     */
    EDataLabelSkipMode["SkipIfSame"] = "SkipIfSame";
})(EDataLabelSkipMode = exports.EDataLabelSkipMode || (exports.EDataLabelSkipMode = {}));
