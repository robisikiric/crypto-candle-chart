import { AxisBase2D } from "../Charting/Visuals/Axis/AxisBase2D";
/**
 * A class which implements {@link IIncludeAxis} should allow to include/exclude {@link AxisBase2D | Axis} from {@link IChartModifierBase}
 */
export interface IIncludeAxis {
    /**
     * Mark if the Axis should be included or excluded, for instance for {@link IChartModifierBase}
     */
    includeAxis(axis: AxisBase2D, isIncluded: boolean): void;
    /**
     * Returns the list of included {@link AxisBase2D | Axis} for this {@link IChartModifierBase}
     */
    getIncludedAxis(): AxisBase2D[];
}
