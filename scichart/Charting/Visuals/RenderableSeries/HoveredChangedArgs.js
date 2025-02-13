"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HoveredChangedArgs = void 0;
/**
 * Arguments passed into the callback for {@link SeriesSelectionModifier.hoverChanged} event
 */
var HoveredChangedArgs = /** @class */ (function () {
    /**
     * Creates an instance of SelectionChangedArgs -
     * arguments passed into the callback for {@link SeriesSelectionModifier.selectionChanged} event
     * @param source
     * @param hoveredSeries
     * @param allSeries
     */
    function HoveredChangedArgs(source, hoveredSeries, allSeries, hitTestInfo) {
        this.source = source;
        this.hoveredSeries = hoveredSeries;
        this.allSeries = allSeries;
        this.hitTestInfo = hitTestInfo;
    }
    return HoveredChangedArgs;
}());
exports.HoveredChangedArgs = HoveredChangedArgs;
