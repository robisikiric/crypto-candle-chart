import { AxisBase2D } from "../Charting/Visuals/Axis/AxisBase2D";
/**
 * A class which implements {@link IIncludeXAxis} should allow to include/exclude {@link AxisBase2D | Axis} from {@link IChartModifierBase}
 */
export interface IIncludeXAxis {
    /**
     * Mark if the XAxis should be included or excluded, for instance for {@link IChartModifierBase}
     */
    includeXAxis(axis: AxisBase2D, isIncluded: boolean): void;
    /**
     * Returns the list of included {@link AxisBase2D | Axis} for this {@link IChartModifierBase}
     */
    getIncludedXAxis(): AxisBase2D[];
    /**
     * Resets to include all axes
     */
    includeAllAxes(): void;
}
