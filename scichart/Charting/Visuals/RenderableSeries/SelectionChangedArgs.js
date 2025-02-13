"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionChangedArgs = void 0;
/**
 * Arguments passed into the callback for {@link SeriesSelectionModifier.selectionChanged} event
 */
var SelectionChangedArgs = /** @class */ (function () {
    /**
     * Creates an instance of SelectionChangedArgs -
     * arguments passed into the callback for {@link SeriesSelectionModifier.selectionChanged} event
     * @param source
     * @param selectedSeries
     * @param allSeries
     */
    function SelectionChangedArgs(source, selectedSeries, allSeries, hitTestInfo) {
        this.source = source;
        this.selectedSeries = selectedSeries;
        this.allSeries = allSeries;
        this.hitTestInfo = hitTestInfo;
    }
    return SelectionChangedArgs;
}());
exports.SelectionChangedArgs = SelectionChangedArgs;
