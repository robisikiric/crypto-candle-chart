import { Thickness } from "../../Core/Thickness";
import { SciChartSurface } from "../Visuals/SciChartSurface";
export declare class SciChartHorizontalGroup {
    groupTopSize: number;
    groupBottomSize: number;
    private layoutManagers;
    private topOuterLayoutSizes;
    private bottomOuterLayoutSizes;
    addSurfaceToGroup(sciChartSurface: SciChartSurface): void;
    removeSurface(sciChartSurface: SciChartSurface): void;
    calculateMaxTitleSize(): Thickness;
    synchronizeAxisSizes(): void;
    onTopSizeChanged(key: string, value: number): void;
    onBottomSizeChanged(key: string, value: number): void;
}
