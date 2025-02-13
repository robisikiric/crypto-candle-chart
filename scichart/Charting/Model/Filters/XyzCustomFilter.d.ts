import { BaseDataSeries } from "../BaseDataSeries";
import { TfilterFunction } from "./XyCustomFilter";
import { IXyzFilterOptions, XyzFilterBase } from "./XyzFilterBase";
/**
 * Options for the {@link XyzCustomFilter}
 */
export interface IXyzCustomFilterOptions extends IXyzFilterOptions {
    /**
     * The function to apply to each y value in the original series
     */
    filterFunction?: TfilterFunction;
    /**
     * The function to apply to each z value in the original series
     * If this is not set, the filterFunction will be applied to both.
     */
    zfilterFunction?: TfilterFunction;
}
export declare class XyzCustomFilter extends XyzFilterBase {
    constructor(originalSeries: BaseDataSeries, options?: IXyzCustomFilterOptions);
    get filterFunction(): TfilterFunction;
    set filterFunction(ff: TfilterFunction);
    protected filterFunctionProperty(index: number, y: number): number;
    get zfilterFunction(): TfilterFunction;
    set zfilterFunction(ff: TfilterFunction);
    protected zfilterFunctionProperty(index: number, y: number): number;
    protected filterOnAppend(count: number): void;
    protected filterOnUpdate(index: number): void;
    protected filterOnInsert(startIndex: number, count: number): void;
    protected filterOnRemove(startIndex: number, count: number): void;
    protected filterAll(): void;
    private filter;
}
