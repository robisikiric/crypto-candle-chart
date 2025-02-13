"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ESvgClippingMode = void 0;
/**
 * Enumeration constants for SciChartSurface SVG Clipping mode, used for SVG annotations
 */
var ESvgClippingMode;
(function (ESvgClippingMode) {
    /**
     * Clips to the series view rect
     */
    ESvgClippingMode["SeriesViewRect"] = "SeriesViewRect";
    /**
     * Clips to the whole sub-chart rect or to the chart rect if not applicable
     */
    ESvgClippingMode["SubChart"] = "SubChart";
    /**
     * Clips to the whole chart rect. In case of sub-charts it allows floating SVG annotations over adjacent sub-charts
     */
    ESvgClippingMode["Chart"] = "Chart";
})(ESvgClippingMode = exports.ESvgClippingMode || (exports.ESvgClippingMode = {}));
