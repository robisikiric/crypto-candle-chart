import { BaseDataSeries } from "../BaseDataSeries";
import { IXyFilterOptions, XyFilterBase } from "./XyFilterBase";
export declare type TfilterFunction = (index: number, y: number) => number;
/**
 * Options for the {@link XyCustomFilter}
 */
export interface IXyCustomFilterOptions extends IXyFilterOptions {
    /**
     * The function to apply to each point in the original series
     */
    filterFunction?: TfilterFunction;
}
/**
 * An XyDataSeries where an arbitrary function is applied to each y value on the original series.
 * eg const filterAboveZero = new XyCustomFilter(originalSeries);
 * filterAboveZero.filterFunction = (index: number, y: number) => y > 0 ? y : NaN;
 * If you want to be able to refer to the original series, use a normal function, rather than an arrow function,
 * so that 'this' will refer to the filter.
 * eg const addPreviousFilter = new XyCustomFilter(originalSeries);
 * addPreviousFilter.filterFunction = function(index: number, y: number) {
 *      const prev = this.getOriginalYValues().get(index);
 *      return prev + y;
 * };
 */
export declare class XyCustomFilter extends XyFilterBase {
    constructor(originalSeries: BaseDataSeries, options?: IXyCustomFilterOptions);
    /** Gets or sets the filter function to be used by this filter */
    get filterFunction(): TfilterFunction;
    /** Gets or sets the filter function to be used by this filter */
    set filterFunction(ff: TfilterFunction);
    protected filterFunctionProperty(index: number, y: number): number;
    protected filterOnAppend(count: number): void;
    protected filterOnUpdate(index: number): void;
    protected filterOnInsert(startIndex: number, count: number): void;
    protected filterOnRemove(startIndex: number, count: number): void;
    protected filterAll(): void;
    private filter;
}
