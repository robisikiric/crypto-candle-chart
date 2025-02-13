import { NumberRange } from "../../../Core/NumberRange";
import { Rect } from "../../../Core/Rect";
import { AxisBase2D } from "../../Visuals/Axis/AxisBase2D";
import { IRenderableSeries } from "../../Visuals/RenderableSeries/IRenderableSeries";
import { EResamplingMode } from "./ResamplingMode";
export interface IResamplingParamsCloneOptions {
    zeroLineY?: number;
    precision?: number;
    xVisibleRange?: NumberRange;
    indicesRange?: NumberRange;
    viewportSize?: number;
    isCategoryAxis?: boolean;
    isXAxisAutoRanged?: boolean;
    resamplingMode?: EResamplingMode;
    renderableSeriesHash?: number;
    enableExperimentalResampling?: boolean;
    dataHasNaN?: boolean;
    dataIsFifo?: boolean;
    fifoCapacity?: number;
    fifoStartIndex?: number;
    dataEvenlySpaced?: boolean;
}
export declare class ResamplingParams {
    zeroLineY: number;
    precision: number;
    xVisibleRange: NumberRange;
    indexesRange: NumberRange;
    viewportSize: number;
    isCategoryAxis: boolean;
    isXAxisAutoRanged: boolean;
    resamplingMode: EResamplingMode;
    hash: number;
    enableExperimentalResampling: boolean;
    dataHasNaN: boolean;
    fifoCapacity: number;
    fifoStartIndex: number;
    dataEvenlySpaced: boolean;
    dataIsFifo: boolean;
    resampleRequired: boolean;
    constructor(seriesViewRect: Rect, rs: IRenderableSeries, xAxis: AxisBase2D);
    clone(options?: IResamplingParamsCloneOptions): ResamplingParams;
}
