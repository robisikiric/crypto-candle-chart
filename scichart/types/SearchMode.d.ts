import { TSciChart } from "./TSciChart";
/**
 * Enumeration constants to define search mode
 */
export declare enum ESearchMode {
    /**
     * Specifies exact search. If the index is not found, -1 is returned
     */
    Exact = "Exact",
    /**
     * Specifies the nearest index. This will round up or down if the search is in-between x-values
     */
    Nearest = "Nearest",
    /**
     * Rounds down to the nearest index
     */
    RoundDown = "RoundDown",
    /**
     * Rounds up to the nearest index
     */
    RoundUp = "RoundUp"
}
/**
 * Converts ESearchMode (typescript friendly Enum) to SCRTFindIndexSearchMode which is required by the webassembly engine
 * @param wasmContext
 * @param mode
 */
export declare const convertSearchMode: (wasmContext: TSciChart, mode: ESearchMode) => import("./TSciChart").SCRTFindIndexSearchMode;
