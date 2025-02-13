"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ELabelAlignment = void 0;
/**
 * Enumeration constants to define 2D text label horizontal alignment for vertical axes
 */
var ELabelAlignment;
(function (ELabelAlignment) {
    /**
     * Aligned to minimise the space between the label and axis, ie right for left axis and left for right axis (opposite if inner axis)
     */
    ELabelAlignment["Auto"] = "Auto";
    /**
     * Left Aligned
     */
    ELabelAlignment["Left"] = "Left";
    /**
     * Right Aligned
     */
    ELabelAlignment["Right"] = "Right";
    /**
     * Center Aligned
     */
    ELabelAlignment["Center"] = "Center";
})(ELabelAlignment = exports.ELabelAlignment || (exports.ELabelAlignment = {}));
