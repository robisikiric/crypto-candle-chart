import { IRenderableSeries } from "./IRenderableSeries";
export declare class SeriesVisibleChangedArgs {
    readonly isVisible: boolean;
    readonly sourceSeries: IRenderableSeries;
    constructor(sourceSeries: IRenderableSeries, visible: boolean);
}
