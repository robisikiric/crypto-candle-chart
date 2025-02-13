import { Rect } from "../../Core/Rect";
import { ELayoutManagerType } from "../../types/LayoutMangerType";
import { Size } from "../../types/Size";
import { ILayoutManagerOptions, LayoutManager } from "./LayoutManager";
import { SciChartVerticalGroup } from "./SciChartVerticalGroup";
import { SciChartHorizontalGroup } from "./SciChartHorizontalGroup";
import { Thickness } from "../../Core/Thickness";
/**
 * An {@link ILayoutManager} used by {@link SciChartVerticalGroup} to synchronise Layout accross mutltiple SciChartSurfaces in a group
 */
export declare class SynchronizedLayoutManager extends LayoutManager {
    type: ELayoutManagerType;
    readonly id: string;
    verticalGroup: SciChartVerticalGroup | undefined;
    private lastLeftOuterAreaSize;
    private lastRightOuterAreaSize;
    horizontalGroup: SciChartHorizontalGroup | undefined;
    private lastTopOuterAreaSize;
    private lastBottomOuterAreaSize;
    constructor(verticalGroup?: SciChartVerticalGroup, horizontalGroup?: SciChartHorizontalGroup, options?: ILayoutManagerOptions);
    layoutChart(viewportSize: Size, padding?: Thickness): Rect;
    trySynchronizeLayouts(): void;
    protected measureLeftOuterAxes(): void;
    protected measureRightOuterAxes(): void;
    protected measureTopOuterAxes(): void;
    protected measureBottomOuterAxes(): void;
}
