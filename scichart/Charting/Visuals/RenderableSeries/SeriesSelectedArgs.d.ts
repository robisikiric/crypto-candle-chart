import { IRenderableSeries } from "./IRenderableSeries";
export declare class SeriesSelectedArgs {
    readonly isSelected: boolean;
    readonly sourceSeries: IRenderableSeries;
    constructor(sourceSeries: IRenderableSeries, selected: boolean);
}
