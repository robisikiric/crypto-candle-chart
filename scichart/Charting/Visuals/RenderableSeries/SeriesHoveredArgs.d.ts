import { IRenderableSeries } from "./IRenderableSeries";
export declare class SeriesHoveredArgs {
    readonly hovered: boolean;
    readonly sourceSeries: IRenderableSeries;
    constructor(sourceSeries: IRenderableSeries, hovered: boolean);
}
