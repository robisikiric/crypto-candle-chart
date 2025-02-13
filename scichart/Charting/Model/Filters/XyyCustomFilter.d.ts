import { BaseDataSeries } from "../BaseDataSeries";
import { TfilterFunction } from "./XyCustomFilter";
import { IXyyFilterOptions, XyyFilterBase } from "./XyyFilterBase";
/**
 * Options for the {@link XyyCustomFilter}
 */
export interface IXyyCustomFilterOptions extends IXyyFilterOptions {
    /**
     * The function to apply to each y value in the original series
     */
    filterFunction?: TfilterFunction;
    /**
     * The function to apply to each y1 value in the original series.
     * If this is not set, the filterFunction will be applied to both.
     */
    y1filterFunction?: TfilterFunction;
}
export declare class XyyCustomFilter extends XyyFilterBase {
    constructor(originalSeries: BaseDataSeries, options?: IXyyCustomFilterOptions);
    get filterFunction(): (index: number, y: number) => number;
    set filterFunction(ff: (index: number, y: number) => number);
    protected filterFunctionProperty(index: number, y: number): number;
    get y1filterFunction(): (index: number, y1: number) => number;
    set y1yfilterFunction(ff: (index: number, y1: number) => number);
    protected y1filterFunctionProperty(index: number, y1: number): number;
    protected filterOnAppend(count: number): void;
    protected filterOnUpdate(index: number): void;
    protected filterOnInsert(startIndex: number, count: number): void;
    protected filterOnRemove(startIndex: number, count: number): void;
    protected filterAll(): void;
    private filter;
}
