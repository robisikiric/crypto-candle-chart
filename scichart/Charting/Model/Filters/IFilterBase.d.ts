import { IDeletable } from "../../../Core/IDeletable";
import { IDataSeries } from "../IDataSeries";
/**
 * Defines the interface to a DataSeries in SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseDataSeries} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries} to find out what 2D JavaScript Chart types are available.
 */
export interface IFilterBase extends IDeletable {
    /**
     * The {@link IDataSeries} to be filtered
     */
    readonly originalSeries: IDataSeries;
    /**
     * Removes reference to the original {@link IDataSeries} and prevents them from being deleted as an effect of the filter deletion.
     * @remarks
     * Makes the filter unusable, but allows deleting it separately from the original data series.
     */
    detachFromOriginalSeries(): void;
}
