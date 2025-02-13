import { EDataFilterType } from "../../../types/DataFilterType";
import { BaseDataSeries } from "../BaseDataSeries";
import { EDataSeriesType } from "../IDataSeries";
import { HlcCustomFilter } from "./HlcCustomFilter";
import { IHlcFilterOptions } from "./HlcFilterBase";
export interface IHlcScaleOffsetFilterOptions extends IHlcFilterOptions {
    scale?: number;
    offset?: number;
}
export declare class HlcScaleOffsetFilter extends HlcCustomFilter {
    private scaleProperty;
    private offsetProperty;
    get scale(): number;
    set scale(value: number);
    get offset(): number;
    set offset(value: number);
    constructor(originalSeries: BaseDataSeries, options?: IHlcScaleOffsetFilterOptions);
    toJSON(excludeData?: boolean): {
        filter: {
            type: EDataFilterType;
            options: {
                scale: number;
                offset: number;
            };
        };
        type: EDataSeriesType;
        options: import("../../..").TSeriesDataDefinition;
    };
    protected defaultFunction(index: number, y: number): number;
}
