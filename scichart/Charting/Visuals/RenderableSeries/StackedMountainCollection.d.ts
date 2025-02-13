import { NumberRange } from "../../../Core/NumberRange";
import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../../../types/TSciChart";
import { WebGlRenderContext2D } from "../../Drawing/WebGlRenderContext2D";
import { RenderPassData } from "../../Services/RenderPassData";
import { SciChartSurface } from "../SciChartSurface";
import { BaseStackedCollection, IBaseStackedCollectionOptions } from "./BaseStackedCollection";
import { StackedMountainRenderableSeries } from "./StackedMountainRenderableSeries";
/**
 * @summary A {@link StackedMountainCollection} allows grouping multiple {@link StackedMountainRenderableSeries}
 * to create a JavaScript Stacked Mountain chart, or 100% Stacked Mountain chart
 * @description
 * Multiple {@link StackedMountainRenderableSeries} are required to create a stacked mountain chart type in SciChart.
 * These are grouped with a {@link StackedMountainCollection}, which implements {@link IRenderableSeries} and may be added
 * directly to a {@link SciChartSurface.renderableSeries} collection.
 *
 * Code sample below:
 * ```ts
 * const stackedMountain0 = new StackedMountainRenderableSeries(wasmContext);
 * // .. configure mountain 1, including set dataSeries
 * const stackedMountain1 = new StackedMountainRenderableSeries(wasmContext);
 * // .. configure mountain 2, including set dataSeries
 * const stackedMountain2 = new StackedMountainRenderableSeries(wasmContext);
 * // .. configure mountain 3, including set dataSeries
 * const stackedMountainCollection = new StackedMountainCollection(wasmContext);
 * stackedMountainCollection.add(stackedMountain0, stackedMountain1, stackedMountain2);
 *
 * sciChartSurface.renderableSeries.add(stackedMountainCollection);
 * ````
 * @remarks This type implements {@link IRenderableSeries} but it is not a renderable series, instead it wraps multiple
 * {@link StackedMountainRenderableSeries} to create a stacked mountain chart
 */
export declare class StackedMountainCollection extends BaseStackedCollection<StackedMountainRenderableSeries> {
    readonly type = ESeriesType.StackedMountainCollection;
    /**
     * Creates an instance of the {@link StackedMountainCollection}
     * @param webAssemblyContext The {@link TSciChart | SciChart WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IBaseStackedCollectionOptions} to configure the series
     */
    constructor(webAssemblyContext: TSciChart, options?: IBaseStackedCollectionOptions);
    /** @inheritDoc */
    updateAccumulatedVectors(): void;
    /** @inheritDoc */
    draw(renderContext: WebGlRenderContext2D, renderPassData: RenderPassData): void;
    /** @inheritDoc */
    getXRange(): NumberRange;
    /** @inheritDoc */
    onAttach(scs: SciChartSurface): void;
    /** @inheritDoc */
    onDetach(): void;
    /** @inheritDoc */
    notifyPropertyChanged(propertyName: string): void;
    /** @inheritDoc */
    hasDataSeriesValues(): boolean;
    private detachChildSeries;
    private attachChildSeries;
    private checkXValuesCorrect;
    /**
     * @param numberOfElements - number of element expected is used for performance to reserve memory
     */
    private clearAccumulatedVectors;
    private getLastVisibleSeries;
}
