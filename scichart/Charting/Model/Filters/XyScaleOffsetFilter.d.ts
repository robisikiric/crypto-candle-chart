import { EDataFilterType } from "../../../types/DataFilterType";
import { BaseDataSeries } from "../BaseDataSeries";
import { XyCustomFilter } from "./XyCustomFilter";
import { EDataSeriesField, IXyFilterOptions } from "./XyFilterBase";
/**
 * Options for the {@link XyScaleOffsetFilter}
 */
export interface IXyScaleOffsetFilterOptions extends IXyFilterOptions {
    scale?: number;
    offset?: number;
}
/**
 * An XyDataSeries that is the result of applying a linear transformation (scale and offset)
 * to the y values of the original series
 */
export declare class XyScaleOffsetFilter extends XyCustomFilter {
    private scaleProperty;
    private offsetProperty;
    constructor(originalSeries: BaseDataSeries, options?: IXyScaleOffsetFilterOptions);
    /** Gets or sets the scale for the transformation */
    get scale(): number;
    /** Gets or sets the scale for the transformation */
    set scale(value: number);
    /** Gets or sets the offset for the transformation */
    get offset(): number;
    /** Gets or sets the offset for the transformation */
    set offset(value: number);
    toJSON(excludeData?: boolean): {
        filter: {
            type: EDataFilterType;
            options: {
                field: EDataSeriesField;
                scale: number;
                offset: number;
            };
        };
        type: import("../IDataSeries").EDataSeriesType;
        options: import("../../..").TSeriesDataDefinition;
    };
    protected filterFunctionProperty(index: number, y: number): number;
}
