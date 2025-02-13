import { DeletableEntity } from "../../../Core/DeletableEntity";
import { IDeletable } from "../../../Core/IDeletable";
import { Rect } from "../../../Core/Rect";
import { IntVector, ResamplingMode, SCRTDoubleResamplerMergeIndicesParams, SCRTDoubleVector, TSciChart } from "../../../types/TSciChart";
import { TSeriesRenderPassInfo } from "../../Services/RenderPassInfo";
import { AxisBase2D } from "../../Visuals/Axis/AxisBase2D";
import { IRenderableSeries } from "../../Visuals/RenderableSeries/IRenderableSeries";
import { EResamplingMode } from "./ResamplingMode";
import { ResamplingParams } from "./ResamplingParams";
/**
 * Helper class for functions which optimise drawing
 */
export declare class ExtremeResamplerHelper extends DeletableEntity implements IDeletable {
    /**
     * Used internally
     * @param xAxis
     * @param rs
     * @param seriesViewRect
     */
    static resampleSeries(xAxis: AxisBase2D, rs: IRenderableSeries, seriesViewRect: Rect): TSeriesRenderPassInfo;
    static calculateResamplingHash(rs: IRenderableSeries, rp: ResamplingParams): number;
    readonly nativeMergeIndexParams: SCRTDoubleResamplerMergeIndicesParams;
    private wasmContext;
    private readonly nativeResampler;
    private readonly xInput;
    private readonly nativeArgs;
    private readonly output;
    private isDeleted;
    constructor(wasmContext: TSciChart);
    /**
     * Calls native RequiresReduction method to calculate if resampling is needed
     * @param rp The resampling params
     * @param xOriginalValues XValues
     * @param fillBasicNativeArgs Update nativeArgs if True
     * @param updateResamplingMode Update {@link ResamplingArgs.Resampling} property if True
     */
    needsResampling(rp: ResamplingParams, xOriginalValues: SCRTDoubleVector, fillBasicNativeArgs?: boolean, updateResamplingMode?: boolean): boolean;
    /**
     * This method calls does resampling by calling the native resampling methods.
     * It does similar things as WPF AvxExtremeResamplerDoubleDouble.ResampleInternal() method
     * The needsResampling() method must be called before, this is done in {@link SciChartRenderer.resampleSeries}
     * @param wasmContext The WebAssembly context
     * @param rp The resampling parameters
     * @param xOriginalValues The original not resampled X values
     * @param yOriginalValues The original not resampled Y values
     * @param indexesOut The indices output
     * @param xResampledValuesOut The resampled X values output
     * @param yResampledValuesOut The resampled Y values output
     * @param fillBasicNativeArgs If set to True resets and fill nativeArgs with basic properties,
     * you can set it to False if {@link needsResampling()} was called before this method
     * @returns indicesVector The resampled vector of indices
     */
    resampleIntoPointSeries(wasmContext: TSciChart, rp: ResamplingParams, xOriginalValues: SCRTDoubleVector, yOriginalValues: SCRTDoubleVector, indexesOut: IntVector, indexesResampledOut: SCRTDoubleVector, xResampledValuesOut: SCRTDoubleVector, yResampledValuesOut: SCRTDoubleVector, fillBasicNativeArgs?: boolean): {
        OutputSplitIndex: number;
    };
    mergeIndexes(indices: IntVector, size1: number, size2: number, mergedIndicesOut: IntVector): number;
    copyValuesByIndexes(indices: IntVector, xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, y1Values: SCRTDoubleVector, count: number, isCategoryAxis: boolean, isFifoSweeping: boolean, indicesOut: SCRTDoubleVector, xValuesOut: SCRTDoubleVector, yValuesOut: SCRTDoubleVector, y1ValuesOut: SCRTDoubleVector, y1Offset?: number): void;
    /** @inheritDoc */
    delete(): void;
    getNativeResamplingMode(resamplingMode: EResamplingMode): ResamplingMode;
    /**
     * Fills basic native args needed for {@link needsResampling()} and {@link resampleIntoPointSeries} methods
     */
    resetAndFillBasicNativeArgs(rp: ResamplingParams, xOriginalValues: SCRTDoubleVector): void;
    private debugParameters;
    private debugRect;
    private debugResamplingDataEnum;
    private debugResamplingModeEnum;
    private getDataDistribution;
}
