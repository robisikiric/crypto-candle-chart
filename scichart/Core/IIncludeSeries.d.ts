import { IRenderableSeries } from "../Charting/Visuals/RenderableSeries/IRenderableSeries";
/**
 * A class which implements {@link IIncludeSeries} should allow to include/exclude {@link IRenderableSeries}
 * @Remarks
 * It should be used to exclude some {@link IRenderableSeries} from {@link IChartModifierBase}
 */
export interface IIncludeSeries {
    /**
     * Mark if the Series should be included or excluded, for instance for {@link IChartModifierBase}
     */
    includeSeries(series: IRenderableSeries, isIncluded: boolean): void;
    /**
     * Returns the list of included {@link IRenderableSeries} without excluded elements
     */
    getIncludedRenderableSeries(): IRenderableSeries[];
}
