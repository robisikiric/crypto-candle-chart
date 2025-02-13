import { ISelectedPointOptions } from "../Charting/Model/DataPointSelectionPaletteProvider";
import { INonUniformHeatmapSeriesOptions } from "../Charting/Model/NonUniformHeatmapDataSeries";
import { IUniformHeatmapSeriesOptions } from "../Charting/Model/UniformHeatmapDataSeries";
import { IXyTextDataSeriesOptions } from "../Charting/Model/XyTextDataSeries";
import { IPointMarkerOptions } from "../Charting/Visuals/PointMarkers/BasePointMarker";
import { ISpritePointMarkerOptions } from "../Charting/Visuals/PointMarkers/SpritePointMarker";
import { IFadeAnimationOptions } from "../Charting/Visuals/RenderableSeries/Animations/FadeAnimation";
import { IScaleAnimationOptions } from "../Charting/Visuals/RenderableSeries/Animations/ScaleAnimation";
import { IBaseAnimationOptions } from "../Charting/Visuals/RenderableSeries/Animations/SeriesAnimation";
import { ISweepAnimationOptions } from "../Charting/Visuals/RenderableSeries/Animations/SweepAnimation";
import { IWaveAnimationOptions } from "../Charting/Visuals/RenderableSeries/Animations/WaveAnimation";
import { IHeatmapRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/BaseHeatmapRenderableSeries";
import { IBaseStackedCollectionOptions } from "../Charting/Visuals/RenderableSeries/BaseStackedCollection";
import { IBandSeriesDataLabelProviderOptions } from "../Charting/Visuals/RenderableSeries/DataLabels/BandSeriesDataLabelProvider";
import { IBaseDataLabelProviderOptions } from "../Charting/Visuals/RenderableSeries/DataLabels/BaseDataLabelProvider";
import { IBubbleSeriesDataLabelProviderOptions } from "../Charting/Visuals/RenderableSeries/DataLabels/BubbleSeriesDataLabelProvider";
import { IColumnSeriesDataLabelProviderOptions } from "../Charting/Visuals/RenderableSeries/DataLabels/ColumnSeriesDataLabelProvider";
import { IContoursDataLabelProviderOptions } from "../Charting/Visuals/RenderableSeries/DataLabels/ContoursDataLabelProvider";
import { IDataLabelProviderOptions } from "../Charting/Visuals/RenderableSeries/DataLabels/DataLabelProvider";
import { IHeatmapDataLabelProviderOptions } from "../Charting/Visuals/RenderableSeries/DataLabels/HeatMapDataLabelProvider";
import { ILineSeriesDataLabelProviderOptions } from "../Charting/Visuals/RenderableSeries/DataLabels/LineSeriesDataLabelProvider";
import { IBandRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/FastBandRenderableSeries";
import { IBubbleRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/FastBubbleRenderableSeries";
import { ICandlestickRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/FastCandlestickRenderableSeries";
import { IColumnRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/FastColumnRenderableSeries";
import { IFastErrorBarsRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/FastErrorBarsRenderableSeries";
import { IImpulseRenderableSeries } from "../Charting/Visuals/RenderableSeries/FastImpulseRenderableSeries";
import { IFastLineRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/FastLineRenderableSeries";
import { IMountainRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/FastMountainRenderableSeries";
import { IOhlcRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/FastOhlcRenderableSeries";
import { IGlowEffectOptions } from "../Charting/Visuals/RenderableSeries/GlowEffect";
import { IBaseRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/IBaseRenderableSeriesOptions";
import { IRenderableSeries } from "../Charting/Visuals/RenderableSeries/IRenderableSeries";
import { INonUniformHeatmapRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/NonUniformHeatmapRenderableSeries";
import { IShadowEffectOptions } from "../Charting/Visuals/RenderableSeries/ShadowEffect";
import { ISplineBandRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/SplineBandRenderableSeries";
import { ISplineLineRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/SplineLineRenderableSeries";
import { ISplineMountainRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/SplineMountainRenderableSeries";
import { ISmoothStackedMountainRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/SmoothStackedMountainRenderableSeries";
import { IStackedColumnCollectionOptions } from "../Charting/Visuals/RenderableSeries/StackedColumnCollection";
import { IStackedColumnRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/StackedColumnRenderableSeries";
import { IStackedMountainRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/StackedMountainRenderableSeries";
import { IContoursRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/UniformContoursRenderableSeries";
import { IXyScatterRenderableSeriesOptions } from "../Charting/Visuals/RenderableSeries/XyScatterRenderableSeries";
import { GradientParams } from "../Core/GradientParams";
import { EAnimationType } from "../types/AnimationType";
import { EDataLabelProviderType } from "../types/DataLabelProviderType";
import { EPaletteProviderType } from "../types/PaletteProviderType";
import { EPointMarkerType } from "../types/PointMarkerType";
import { ESeriesType } from "../types/SeriesType";
import { EShaderEffectType } from "../types/ShaderEffectType";
import { TSciChart } from "../types/TSciChart";
import { THlcSeriesData, TOhlcSeriesData, TSharedDataDefinition, TXySeriesData, TXyTextSeriesData, TXyySeriesData, TXyzSeriesData } from "./buildDataSeries";
/** Definition of a pointmarker, comprising a {@link EPointMarkerType} and the relevant options */
export declare type TPointMarkerDefinition = {
    type: EPointMarkerType.Cross;
    options?: IPointMarkerOptions;
} | {
    type: EPointMarkerType.Ellipse;
    options?: IPointMarkerOptions;
} | {
    type: EPointMarkerType.Sprite;
    options?: ISpritePointMarkerOptions;
} | {
    type: EPointMarkerType.Square;
    options?: IPointMarkerOptions;
} | {
    type: EPointMarkerType.Triangle;
    options?: IPointMarkerOptions;
} | {
    type: EPointMarkerType.X;
    options?: IPointMarkerOptions;
} | {
    type: EPointMarkerType.Custom;
    customType?: string;
    options?: IPointMarkerOptions;
};
/** Definition of a shader effect, comprising a {@link EShaderEffectType} and the relevant options */
export declare type TEffectDefinition = {
    type: EShaderEffectType.Glow;
    options?: IGlowEffectOptions;
} | {
    type: EShaderEffectType.Shadow;
    options?: IShadowEffectOptions;
};
/** Definition of a palette provider, comprising a {@link EPaletteProviderType} and the relevant options */
export declare type TPaletteProviderDefinition = {
    type: EPaletteProviderType.Gradient;
    options: GradientParams;
} | {
    type: EPaletteProviderType.DataPointSelection;
    options: ISelectedPointOptions;
} | {
    type: EPaletteProviderType.Custom;
    customType: string;
    options?: any;
};
/** Definition of an animation, comprising a {@link EAnimationType} and the relevant options */
export declare type TAnimationDefinition = {
    type: EAnimationType.Fade;
    options?: IFadeAnimationOptions;
} | {
    type: EAnimationType.Scale;
    options?: IScaleAnimationOptions;
} | {
    type: EAnimationType.Sweep;
    options?: ISweepAnimationOptions;
} | {
    type: EAnimationType.Wave;
    options?: IWaveAnimationOptions;
} | {
    type: EAnimationType.Custom;
    customType?: string;
    options?: IBaseAnimationOptions;
};
export declare type TDataLabelProviderDefinition = {
    type: EDataLabelProviderType.Default;
    options?: IDataLabelProviderOptions;
} | {
    type: EDataLabelProviderType.Line;
    options?: ILineSeriesDataLabelProviderOptions;
} | {
    type: EDataLabelProviderType.Column;
    options?: IColumnSeriesDataLabelProviderOptions;
} | {
    type: EDataLabelProviderType.Text;
    options?: IBaseDataLabelProviderOptions;
} | {
    type: EDataLabelProviderType.Heatmap;
    options?: IHeatmapDataLabelProviderOptions;
} | {
    type: EDataLabelProviderType.Contours;
    options?: IContoursDataLabelProviderOptions;
} | {
    type: EDataLabelProviderType.Band;
    options?: IBandSeriesDataLabelProviderOptions;
} | {
    type: EDataLabelProviderType.Bubble;
    options?: IBubbleSeriesDataLabelProviderOptions;
} | {
    type: EDataLabelProviderType.NonUniformHeatmap;
    options?: IHeatmapDataLabelProviderOptions;
} | {
    type: EDataLabelProviderType.StackedCollection;
    options?: IBaseStackedCollectionOptions;
} | {
    type: EDataLabelProviderType.Custom;
    customType: string;
    options?: IBaseDataLabelProviderOptions;
};
/**
 * Definition of a renderable series, comprising a {@link ESeriesType}, the relevant options,
 * and an optional data object whose type depends on the series type
 */
export declare type TSeriesDefinition = {
    type: ESeriesType.BandSeries;
    options?: IBandRenderableSeriesOptions;
    xyyData?: TXyySeriesData;
} | {
    type: ESeriesType.BubbleSeries;
    options?: IBubbleRenderableSeriesOptions;
    xyzData?: TXyzSeriesData;
} | {
    type: ESeriesType.ColumnSeries;
    options?: IColumnRenderableSeriesOptions;
    xyData?: TXySeriesData;
} | {
    type: ESeriesType.ImpulseSeries;
    options?: IImpulseRenderableSeries;
    xyData?: TXySeriesData;
} | {
    type: ESeriesType.CandlestickSeries;
    options?: ICandlestickRenderableSeriesOptions;
    ohlcData?: TOhlcSeriesData;
} | {
    type: ESeriesType.LineSeries;
    options?: IFastLineRenderableSeriesOptions;
    xyData?: TXySeriesData;
} | {
    type: ESeriesType.MountainSeries;
    options?: IMountainRenderableSeriesOptions;
    xyData?: TXySeriesData;
} | {
    type: ESeriesType.ErrorBarsSeries;
    options?: IFastErrorBarsRenderableSeriesOptions;
    hlcData?: THlcSeriesData;
} | {
    type: ESeriesType.OhlcSeries;
    options?: IOhlcRenderableSeriesOptions;
    ohlcData?: TOhlcSeriesData;
} | {
    type: ESeriesType.ScatterSeries;
    options?: IXyScatterRenderableSeriesOptions;
    xyData?: TXySeriesData;
} | {
    type: ESeriesType.TextSeries;
    options?: IXyTextDataSeriesOptions;
    xyTextData?: TXyTextSeriesData;
} | {
    type: ESeriesType.SplineBandSeries;
    options?: ISplineBandRenderableSeriesOptions;
    xyyData?: TXyySeriesData;
} | {
    type: ESeriesType.SplineLineSeries;
    options?: ISplineLineRenderableSeriesOptions;
    xyData?: TXySeriesData;
} | {
    type: ESeriesType.SplineMountainSeries;
    options?: ISplineMountainRenderableSeriesOptions;
    xyData?: TXySeriesData;
} | {
    type: ESeriesType.SmoothStackedMountainSeries;
    options?: ISmoothStackedMountainRenderableSeriesOptions;
    xyData?: TXySeriesData;
} | {
    type: ESeriesType.UniformHeatmapSeries;
    options?: IHeatmapRenderableSeriesOptions;
    heatmapData?: IUniformHeatmapSeriesOptions;
} | {
    type: ESeriesType.NonUniformHeatmapSeries;
    options?: INonUniformHeatmapRenderableSeriesOptions;
    heatmapData?: INonUniformHeatmapSeriesOptions;
} | {
    type: ESeriesType.UniformContoursSeries;
    options?: IContoursRenderableSeriesOptions;
    heatmapData?: IUniformHeatmapSeriesOptions;
} | {
    type: ESeriesType.StackedColumnSeries;
    options?: IStackedColumnRenderableSeriesOptions;
    xyData?: TXySeriesData;
} | {
    type: ESeriesType.StackedMountainSeries;
    options?: IStackedMountainRenderableSeriesOptions;
    xyData?: TXySeriesData;
} | {
    type: ESeriesType.StackedColumnCollection;
    options?: IStackedColumnCollectionOptions;
    series?: TSeriesDefinition[];
} | {
    type: ESeriesType.StackedMountainCollection;
    options?: IBaseStackedCollectionOptions;
    series?: TSeriesDefinition[];
} | {
    type: ESeriesType.Custom;
    customType?: string;
    options?: IBaseRenderableSeriesOptions;
};
/**
 * Build one or more renderable series from a definition that can be pure data.
 * @param wasmContext A {@link TSciChart | SciChart 2D WebAssembly Context} or {@link TSciChart | SciChart 3D WebAssembly Context}
 * @param definition One or an array of {@link TSeriesDefinition}
 * @param sharedData Optional {@link TSharedDataDefinition} to define shared data which can be referenced by the renderable series
 * @returns An array of {@link IRenderableSeries}.
 */
export declare const buildSeries: (wasmContext: TSciChart, definition: TSeriesDefinition | TSeriesDefinition[], sharedData?: TSharedDataDefinition) => IRenderableSeries[];
