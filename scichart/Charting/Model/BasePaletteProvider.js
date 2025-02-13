"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePaletteProvider = void 0;
/**
 * The base class for PaletteProvider that allows you to perform per-point paletting or coloring of series or data-points
 * in SciChart's {@link https://www.scichart.com/javascript-chart-features | High Performance Realtime JavaScript Charts}
 * @remarks
 * See derived type {@link IStrokePaletteProvider} for coloring line series or strokes.
 * See derived type {@link IFillPaletteProvider} for coloring fills or areas.
 */
var BasePaletteProvider = /** @class */ (function () {
    function BasePaletteProvider() {
    }
    BasePaletteProvider.prototype.onAttached = function (parentSeries) {
        // Nothing to do in base class
    };
    BasePaletteProvider.prototype.onDetached = function () {
        // Nothing to do in base class
    };
    return BasePaletteProvider;
}());
exports.BasePaletteProvider = BasePaletteProvider;
