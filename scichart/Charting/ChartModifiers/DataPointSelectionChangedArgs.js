"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataPointSelectionChangedArgs = void 0;
/**
 * Arguments passed into the callback for {@link DataPointSelectionModifier.selectionChanged} event
 */
var DataPointSelectionChangedArgs = /** @class */ (function () {
    /**
     * Creates an instance of DataPointSelectionChangedArgs -
     * arguments passed into the callback for {@link DataPointSelectionModifier.selectionChanged} event
     * @param source
     * @param selectedDataPoints
     */
    function DataPointSelectionChangedArgs(source, selectedDataPoints) {
        this.source = source;
        this.selectedDataPoints = selectedDataPoints;
    }
    return DataPointSelectionChangedArgs;
}());
exports.DataPointSelectionChangedArgs = DataPointSelectionChangedArgs;
