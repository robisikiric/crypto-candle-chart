"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EAutoRange = void 0;
/**
 * List of values for Autorange behaviour on Axis in SciChart
 */
var EAutoRange;
(function (EAutoRange) {
    /**
     * (Default mode) AutoRange once on startup, after that, the user must specify {@link AxisCore.visibleRange}
     * or call {@link SciChartSurface.zoomExtents}
     */
    EAutoRange["Once"] = "Once";
    /**
     * Autorange Always when the data changes
     */
    EAutoRange["Always"] = "Always";
    /**
     * Never autorange (full manual mode)
     */
    EAutoRange["Never"] = "Never";
})(EAutoRange = exports.EAutoRange || (exports.EAutoRange = {}));
