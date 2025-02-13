"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertSearchMode = exports.ESearchMode = void 0;
/**
 * Enumeration constants to define search mode
 */
var ESearchMode;
(function (ESearchMode) {
    /**
     * Specifies exact search. If the index is not found, -1 is returned
     */
    ESearchMode["Exact"] = "Exact";
    /**
     * Specifies the nearest index. This will round up or down if the search is in-between x-values
     */
    ESearchMode["Nearest"] = "Nearest";
    /**
     * Rounds down to the nearest index
     */
    ESearchMode["RoundDown"] = "RoundDown";
    /**
     * Rounds up to the nearest index
     */
    ESearchMode["RoundUp"] = "RoundUp";
})(ESearchMode = exports.ESearchMode || (exports.ESearchMode = {}));
/**
 * Converts ESearchMode (typescript friendly Enum) to SCRTFindIndexSearchMode which is required by the webassembly engine
 * @param wasmContext
 * @param mode
 */
var convertSearchMode = function (wasmContext, mode) {
    switch (mode) {
        case ESearchMode.Exact:
            return wasmContext.SCRTFindIndexSearchMode.Exact;
        case ESearchMode.Nearest:
            return wasmContext.SCRTFindIndexSearchMode.Nearest;
        case ESearchMode.RoundDown:
            return wasmContext.SCRTFindIndexSearchMode.RoundDown;
        case ESearchMode.RoundUp:
            return wasmContext.SCRTFindIndexSearchMode.RoundUp;
    }
};
exports.convertSearchMode = convertSearchMode;
