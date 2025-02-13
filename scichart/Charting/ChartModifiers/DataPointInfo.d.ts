import { IDataSeries } from "../Model/IDataSeries";
import { IPointMetadata } from "../Model/IPointMetadata";
import { IRenderableSeries } from "../Visuals/RenderableSeries/IRenderableSeries";
export declare class DataPointInfo {
    private readonly renderableSeriesProperty;
    private readonly indexProperty;
    private metadataProperty;
    constructor(renderableSeries: IRenderableSeries, metadata: IPointMetadata, index: number);
    get metadata(): IPointMetadata;
    set metadata(metadata: IPointMetadata);
    get index(): number;
    get xValue(): number;
    get yValue(): number;
    get renderableSeries(): IRenderableSeries;
    get dataSeries(): IDataSeries;
    get seriesName(): string;
}
