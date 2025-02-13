import { ESeriesType } from "../../../types/SeriesType";
import { TSciChart } from "../../../types/TSciChart";
import { ResamplingParams } from "../../Numerics/Resamplers/ResamplingParams";
import { BaseRenderableSeries } from "./BaseRenderableSeries";
import { ITextDataLabelProviderOptions } from "./DataLabels/TextDataLabelProvider";
import { IHitTestProvider } from "./HitTest/IHitTestProvider";
import { IBaseRenderableSeriesOptions } from "./IBaseRenderableSeriesOptions";
export interface ITextRenderableSeriesOptions extends IBaseRenderableSeriesOptions {
    /**
     * Options to pass to the DataLabelProvider. Set a style with font and size to enable per-point text for this series.
     */
    dataLabels?: ITextDataLabelProviderOptions;
}
export declare class FastTextRenderableSeries extends BaseRenderableSeries {
    type: ESeriesType;
    constructor(webAssemblyContext: TSciChart, options?: ITextRenderableSeriesOptions);
    /** @inheritDoc */
    needsResampling(rp: ResamplingParams): boolean;
    protected newHitTestProvider(): IHitTestProvider;
}
