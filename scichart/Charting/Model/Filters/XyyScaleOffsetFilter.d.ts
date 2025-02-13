import { EDataFilterType } from "../../../types/DataFilterType";
import { BaseDataSeries } from "../BaseDataSeries";
import { XyyCustomFilter } from "./XyyCustomFilter";
import { IXyyFilterOptions } from "./XyyFilterBase";
export interface IXyyScaleOffsetFilterOptions extends IXyyFilterOptions {
    scale?: number;
    offset?: number;
}
export declare class XyyScaleOffsetFilter extends XyyCustomFilter {
    private scaleProperty;
    private offsetProperty;
    get scale(): number;
    set scale(value: number);
    get offset(): number;
    set offset(value: number);
    constructor(originalSeries: BaseDataSeries, options?: IXyyScaleOffsetFilterOptions);
    toJSON(excludeData?: boolean): {
        filter: {
            type: EDataFilterType;
            options: {
                yfield: import("./XyFilterBase").EDataSeriesField;
                y1field: import("./XyFilterBase").EDataSeriesField;
                scale: number;
                offset: number;
            };
        };
        type: import("../IDataSeries").EDataSeriesType;
        options: import("../../..").TSeriesDataDefinition;
    };
    protected filterFunctionProperty(index: number, y: number): number;
}
