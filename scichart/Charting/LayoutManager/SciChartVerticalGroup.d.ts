import { Thickness } from "../../Core/Thickness";
import { SciChartSurface } from "../Visuals/SciChartSurface";
export declare class SciChartVerticalGroup {
    groupRightSize: number;
    groupLeftSize: number;
    private layoutManagers;
    private leftOuterLayoutSizes;
    private rightOuterLayoutSizes;
    addSurfaceToGroup(sciChartSurface: SciChartSurface): void;
    removeSurface(sciChartSurface: SciChartSurface): void;
    calculateMaxTitleSize(): Thickness;
    synchronizeAxisSizes(): void;
    onLeftSizeChanged(key: string, value: number): void;
    onRightSizeChanged(key: string, value: number): void;
}
