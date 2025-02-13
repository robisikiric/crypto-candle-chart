import { EDataFilterType } from "../../../types/DataFilterType";
import { BaseDataSeries } from "../BaseDataSeries";
import { XyzCustomFilter } from "./XyzCustomFilter";
import { IXyzFilterOptions } from "./XyzFilterBase";
export interface IXyzScaleOffsetFilterOptions extends IXyzFilterOptions {
    scale?: number;
    offset?: number;
}
export declare class XyzScaleOffsetFilter extends XyzCustomFilter {
    private scaleProperty;
    private offsetProperty;
    get scale(): number;
    set scale(value: number);
    get offset(): number;
    set offset(value: number);
    constructor(originalSeries: BaseDataSeries, options?: IXyzScaleOffsetFilterOptions);
    toJSON(excludeData?: boolean): {
        filter: {
            type: EDataFilterType;
            options: {
                yfield: import("./XyFilterBase").EDataSeriesField;
                zfield: import("./XyFilterBase").EDataSeriesField;
                scale: number;
                offset: number;
            };
        };
        type: import("../IDataSeries").EDataSeriesType;
        options: import("../../..").TSeriesDataDefinition;
    };
    protected filterFunctionProperty(index: number, y: number): number;
}
