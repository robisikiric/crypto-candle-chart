import { BaseDataSeries } from "../BaseDataSeries";
import { HlcFilterBase, IHlcFilterOptions } from "./HlcFilterBase";
import { TfilterFunction } from "./XyCustomFilter";
/**
 * Options for the {@link HlcCustomFilter}
 */
export interface IHlcCustomFilterOptions extends IHlcFilterOptions {
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
export declare class HlcCustomFilter extends HlcFilterBase {
    get closefilterFunction(): (index: number, y: number) => number;
    set closefilterFunction(ff: (index: number, y: number) => number);
    get highfilterFunction(): (index: number, y: number) => number;
    set highfilterFunction(ff: (index: number, y: number) => number);
    get lowfilterFunction(): (index: number, y: number) => number;
    set lowfilterFunction(ff: (index: number, y: number) => number);
    constructor(originalSeries: BaseDataSeries, options?: IHlcCustomFilterOptions);
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
