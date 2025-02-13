import { BaseDataSeries } from "../BaseDataSeries";
import { IOhlcFilterOptions, OhlcFilterBase } from "./OhlcFilterBase";
import { TfilterFunction } from "./XyCustomFilter";
/**
 * Options for the {@link XyzCustomFilter}
 */
export interface IOhlcCustomFilterOptions extends IOhlcFilterOptions {
    /**
     * The function to apply to each open value in the original series
     * If this is not set, the filterFunction will be applied.
     */
    openfilterFunction?: TfilterFunction;
    /**
     * The function to apply to each high value in the original series
     * If this is not set, the filterFunction will be applied.
     */
    highfilterFunction?: TfilterFunction;
    /**
     * The function to apply to each low value in the original series
     * If this is not set, the filterFunction will be applied.
     */
    lowfilterFunction?: TfilterFunction;
    /**
     * The function to apply to each close value in the original series,
     * And to the other values if they do not have specific functions set
     */
    closefilterFunction?: TfilterFunction;
}
export declare class OhlcCustomFilter extends OhlcFilterBase {
    get closefilterFunction(): (index: number, y: number) => number;
    set closefilterFunction(ff: (index: number, y: number) => number);
    get openfilterFunction(): (index: number, y: number) => number;
    set openfilterFunction(ff: (index: number, y: number) => number);
    get highfilterFunction(): (index: number, y: number) => number;
    set highfilterFunction(ff: (index: number, y: number) => number);
    get lowfilterFunction(): (index: number, y: number) => number;
    set lowfilterFunction(ff: (index: number, y: number) => number);
    constructor(originalSeries: BaseDataSeries, options?: IOhlcCustomFilterOptions);
    protected openfilterFunctionProperty(index: number, y: number): number;
    protected highfilterFunctionProperty(index: number, y: number): number;
    protected lowfilterFunctionProperty(index: number, y: number): number;
    protected closefilterFunctionProperty(index: number, y: number): number;
    protected filterOnAppend(count: number): void;
    protected filterOnUpdate(index: number): void;
    protected filterOnInsert(startIndex: number, count: number): void;
    protected filterOnRemove(startIndex: number, count: number): void;
    protected filterAll(): void;
    private filter;
}
