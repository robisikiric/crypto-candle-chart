import { TGradientStop } from "../../types/TGradientStop";
import { EThemeProviderType } from "../../types/ThemeProviderType";
import { TSciChart } from "../../types/TSciChart";
export declare const AUTO_COLOR = "auto";
/**
 * @summary The ThemeProvider has properties to define a theme within SciChart's 2D & 3D Charts
 * @decription Applied to a 2D {@link SciChartSurface}, or a 3D {@link SciChart3DSurface}, the ThemeProvider may be
 * applied using the {@link SciChartSurface.applyTheme | applyTheme} method, where it is passed down to child components
 * so that all children of the chart get the same theme.
 *
 * For example:
 * ```ts
 * // Applying a built-in dark theme
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.applyTheme(new SciChartJSDarkTheme());
 * // Or light theme
 * sciChartSurface.applyTheme(new SciChartJSLightTheme());
 *
 * // Applying a custom theme
 * export class MyCustomTheme implements IThemeProvider {
 *    // todo: implement IThemeProvider interface and apply properties
 * }
 *
 * sciChartSurface.applyTheme(new MyCustomTheme());
 * ```
 */
export interface IThemeProvider {
    /**
     * An array of color codes (or GradientStops if you want to control the gaps between colors) which will be used to provide stroke colors.
     */
    strokePalette?: string[] | TGradientStop[];
    /**
     * An array of color codes (or GradientStops if you want to control the gaps between colors) which will be used to provide fill colors.
     */
    fillPalette?: string[] | TGradientStop[];
    /**
     * Tells SciChart if the theme has a light or dark background (used for calculating contrasting elements)
     */
    isLightBackground?: boolean;
    /**
     * The Background color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    sciChartBackground: string;
    /**
     * The background color of the loading animation dots,
     * which can also be customized by overriding the {@link loader}
     */
    loadingAnimationBackground: string;
    /**
     * The foreground color of the loading animation dots,
     * which can also be customized by overriding the {@link loader}
     */
    loadingAnimationForeground: string;
    /**
     * The Grid border brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    gridBorderBrush: string;
    /**
     * The Axis Bands fill brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    axisBandsFill: string;
    /**
     * The default 2D Chart Axis Border Color color applied as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    axisBorder: string;
    /**
     * The Tick Text brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    tickTextBrush: string;
    /**
     * The Major Gridlines brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    majorGridLineBrush: string;
    /**
     * The Minor Gridlines brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    minorGridLineBrush: string;
    /**
     * The Grid area background brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    gridBackgroundBrush: string;
    /**
     * The {@link RolloverModifier} line brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    rolloverLineBrush: string;
    /**
     * The Cursor Line brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    cursorLineBrush: string;
    /**
     * The {@link RubberBandXyZoomModifier} recticule fill brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    rubberBandFillBrush: string;
    /**
     * The {@link RubberBandXyZoomModifier} recticule stroke brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    rubberBandStrokeBrush: string;
    /**
     * The {@link SciChartLegend} background brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    legendBackgroundBrush: string;
    /**
     * The {@link AxisCore | Axis} label background brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    labelBackgroundBrush: string;
    /**
     * The {@link AxisCore | Axis} label border brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    labelBorderBrush: string;
    /**
     * The {@link AxisCore | Axis} label foreground font color brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    labelForegroundBrush: string;
    /**
     * The TextAnnotation font color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    textAnnotationForeground: string;
    /**
     * The TextAnnotation background color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    textAnnotationBackground: string;
    /**
     * The {@link AnnotationBase} grips border color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    annotationsGripsBorderBrush: string;
    /**
     * The {@link AnnotationBase} grips background color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    annotationsGripsBackroundBrush: string;
    /** The {@link AnnotationBase}  selection box stroke color as an HTML color code */
    annotationSelectionStroke?: string;
    overviewFillBrush: string;
    scrollbarBackgroundBrush: string;
    scrollbarBorderBrush: string;
    scrollbarGripsBackgroundBrush: string;
    scrollbarViewportBackgroundBrush: string;
    scrollbarViewportBorderBrush: string;
    /**
     * The default {@link FastCandlestickRenderableSeries} up-wick color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    upWickColor: string;
    /**
     * The default {@link FastCandlestickRenderableSeries} down-wick color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    downWickColor: string;
    /**
     * The default {@link FastCandlestickRenderableSeries} up body color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    upBodyBrush: string;
    /**
     * The default {@link FastCandlestickRenderableSeries} down body color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    downBodyBrush: string;
    /**
     * The default {@link FastBandRenderableSeries} up line color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    upBandSeriesLineColor: string;
    /**
     * The default {@link FastBandRenderableSeries} down line color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    downBandSeriesLineColor: string;
    /**
     * The default {@link FastBandRenderableSeries} up band fill color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    upBandSeriesFillColor: string;
    /**
     * The default {@link FastBandRenderableSeries} down band fill color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    downBandSeriesFillColor: string;
    /**
     * The default {@link FastMountainRenderableSeries} mountain fill brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    mountainAreaBrush: string;
    /**
     * The default {@link FastMountainRenderableSeries} mountain line brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    mountainLineColor: string;
    /**
     * The default {@link FastLineRenderableSeries} line stroke brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    lineSeriesColor: string;
    /**
     * The default {@link FastColumnRenderableSeries} stroke brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    columnLineColor: string;
    /**
     * The default {@link FastColumnRenderableSeries} fill brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    columnFillBrush: string;
    /**
     * The default {@link FastImpulseRenderableSeries} fill brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    impulseFillBrush?: string;
    /**
     * The default {@link UniformHeatmapRenderableSeries} color-map gradient stops
     */
    defaultColorMapBrush: TGradientStop[];
    /**
     * The default Axis Title color applied as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    axisTitleColor: string;
    /**
     * The default Chart Title color applied as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    chartTitleColor: string;
    /**
     * The default shadow effect color applied to drop-shadows
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    shadowEffectColor: string;
    /**
     * The default 3D Chart Axis Plane border color applied as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    planeBorderColor: string;
    /**
     * The default 3D Chart Axis Plane background color applied as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    axisPlaneBackgroundFill: string;
    /**
     * The default 3D Chart Axis Bands fill color applied as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    axis3DBandsFill: string;
    /**
     * get a color from the strokePalette, either directly (if max is less than strokePalette length) or by interpolation
     * @param index
     * @param max
     * @param wasmContext
     */
    getStrokeColor?(index: number, max: number, wasmContext: TSciChart): string;
    /**
     * get a color from the fillPalette, either directly (if max is less than fillPalette length) or by interpolation
     * @param index
     * @param max
     * @param wasmContext
     */
    getFillColor?(index: number, max: number, wasmContext: TSciChart): string;
}
/**
 * IThemePartial contains the same fields as IThemeProvider, but all optional, so can provide partial themes to customise an existing theme
 */
export interface IThemePartial {
    /**
     * An array of color codes (or GradientStops if you want to control the gaps between colors) which will be used to provide stroke colors.
     */
    strokePalette?: string[] | TGradientStop[];
    /**
     * An array of color codes (or GradientStops if you want to control the gaps between colors) which will be used to provide fill colors.
     */
    fillPalette?: string[] | TGradientStop[];
    /**
     * The Background color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    sciChartBackground?: string;
    /**
     * The background color of the loading animation dots,
     * which can also be customized by overriding the {@link loader}
     */
    loadingAnimationBackground?: string;
    /**
     * The foreground color of the loading animation dots,
     * which can also be customized by overriding the {@link loader}
     */
    loadingAnimationForeground?: string;
    /**
     * The Grid border brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    gridBorderBrush?: string;
    /**
     * The Axis Bands fill brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    axisBandsFill?: string;
    /**
     * The Tick Text brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    tickTextBrush?: string;
    /**
     * The Major Gridlines brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    majorGridLineBrush?: string;
    /**
     * The Minor Gridlines brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    minorGridLineBrush?: string;
    /**
     * The Grid area background brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    gridBackgroundBrush?: string;
    /**
     * The {@link RolloverModifier} line brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    rolloverLineBrush?: string;
    /**
     * The Cursor Line brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    cursorLineBrush?: string;
    /**
     * The {@link RubberBandXyZoomModifier} recticule fill brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    rubberBandFillBrush?: string;
    /**
     * The {@link RubberBandXyZoomModifier} recticule stroke brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    rubberBandStrokeBrush?: string;
    /**
     * The {@link SciChartLegend} background brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    legendBackgroundBrush?: string;
    /**
     * The {@link AxisCore | Axis} label background brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    labelBackgroundBrush?: string;
    /**
     * The {@link AxisCore | Axis} label border brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    labelBorderBrush?: string;
    /**
     * The {@link AxisCore | Axis} label foreground font color brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    labelForegroundBrush?: string;
    /**
     * The TextAnnotation font color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    textAnnotationForeground?: string;
    /**
     * The TextAnnotation background color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    textAnnotationBackground?: string;
    /**
     * The {@link AnnotationBase} grips border color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    annotationsGripsBorderBrush?: string;
    /**
     * The {@link AnnotationBase} grips background color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    annotationsGripsBackroundBrush?: string;
    /** The {@link AnnotationBase}  selection box stroke color as an HTML color code */
    annotationSelectionStroke?: string;
    overviewFillBrush?: string;
    scrollbarBackgroundBrush?: string;
    scrollbarBorderBrush?: string;
    scrollbarGripsBackgroundBrush?: string;
    scrollbarViewportBackgroundBrush?: string;
    scrollbarViewportBorderBrush?: string;
    /**
     * The default {@link FastCandlestickRenderableSeries} up-wick color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    upWickColor?: string;
    /**
     * The default {@link FastCandlestickRenderableSeries} down-wick color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    downWickColor?: string;
    /**
     * The default {@link FastCandlestickRenderableSeries} up body color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    upBodyBrush?: string;
    /**
     * The default {@link FastCandlestickRenderableSeries} down body color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    downBodyBrush?: string;
    /**
     * The default {@link FastBandRenderableSeries} up line color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    upBandSeriesLineColor?: string;
    /**
     * The default {@link FastBandRenderableSeries} down line color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    downBandSeriesLineColor?: string;
    /**
     * The default {@link FastBandRenderableSeries} up band fill color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    upBandSeriesFillColor?: string;
    /**
     * The default {@link FastBandRenderableSeries} down band fill color as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    downBandSeriesFillColor?: string;
    /**
     * The default {@link FastMountainRenderableSeries} mountain fill brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    mountainAreaBrush?: string;
    /**
     * The default {@link FastMountainRenderableSeries} mountain line brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    mountainLineColor?: string;
    /**
     * The default {@link FastLineRenderableSeries} line stroke brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    lineSeriesColor?: string;
    /**
     * The default {@link FastColumnRenderableSeries} stroke brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    columnLineColor?: string;
    /**
     * The default {@link FastColumnRenderableSeries} fill brush as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    columnFillBrush?: string;
    /**
     * The default {@link UniformHeatmapRenderableSeries} color-map gradient stops
     */
    defaultColorMapBrush?: TGradientStop[];
    /**
     * The default Axis Title color applied as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    axisTitleColor?: string;
    /**
     * The default Chart Title color applied as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    chartTitleColor?: string;
    /**
     * The default shadow effect color applied to drop-shadows
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    shadowEffectColor?: string;
    /**
     * The default 3D Chart Axis Plane border color applied as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    planeBorderColor?: string;
    /**
     * The default 3D Chart Axis Plane background color applied as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    axisPlaneBackgroundFill?: string;
    /**
     * The default 3D Chart Axis Bands fill color applied as an HTML color code
     * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
     */
    axis3DBandsFill?: string;
}
export declare abstract class ThemeProvider implements IThemeProvider {
    abstract type: EThemeProviderType | string;
    abstract sciChartBackground: string;
    abstract loadingAnimationBackground: string;
    abstract loadingAnimationForeground: string;
    abstract gridBorderBrush: string;
    abstract axisBandsFill: string;
    abstract axisBorder: string;
    abstract tickTextBrush: string;
    abstract majorGridLineBrush: string;
    abstract minorGridLineBrush: string;
    abstract gridBackgroundBrush: string;
    abstract rolloverLineBrush: string;
    abstract cursorLineBrush: string;
    abstract rubberBandFillBrush: string;
    abstract rubberBandStrokeBrush: string;
    abstract legendBackgroundBrush: string;
    abstract labelBackgroundBrush: string;
    abstract labelBorderBrush: string;
    abstract labelForegroundBrush: string;
    abstract textAnnotationForeground: string;
    abstract textAnnotationBackground: string;
    abstract annotationsGripsBorderBrush: string;
    abstract annotationsGripsBackroundBrush: string;
    annotationSelectionStroke?: string;
    abstract overviewFillBrush: string;
    abstract scrollbarBackgroundBrush: string;
    abstract scrollbarBorderBrush: string;
    abstract scrollbarGripsBackgroundBrush: string;
    abstract scrollbarViewportBackgroundBrush: string;
    abstract scrollbarViewportBorderBrush: string;
    abstract upWickColor: string;
    abstract downWickColor: string;
    abstract upBodyBrush: string;
    abstract downBodyBrush: string;
    abstract upBandSeriesLineColor: string;
    abstract downBandSeriesLineColor: string;
    abstract upBandSeriesFillColor: string;
    abstract downBandSeriesFillColor: string;
    abstract mountainAreaBrush: string;
    abstract mountainLineColor: string;
    abstract lineSeriesColor: string;
    abstract columnLineColor: string;
    abstract columnFillBrush: string;
    abstract impulseFillBrush: string;
    abstract defaultColorMapBrush: TGradientStop[];
    abstract axisTitleColor: string;
    abstract chartTitleColor: string;
    abstract shadowEffectColor: string;
    abstract planeBorderColor: string;
    abstract axisPlaneBackgroundFill: string;
    abstract axis3DBandsFill: string;
    strokePalette: string[] | TGradientStop[];
    fillPalette: string[] | TGradientStop[];
    abstract isLightBackground: boolean;
    protected overrides: IThemePartial;
    private strokeGradient;
    private fillGradient;
    getStrokeColor(index: number, max: number, wasmContext: TSciChart): string;
    getFillColor(index: number, max: number, wasmContext: TSciChart): string;
    applyOverrides(overrides: IThemePartial): void;
    toJSON(): {
        /**
         * An array of color codes (or GradientStops if you want to control the gaps between colors) which will be used to provide stroke colors.
         */
        strokePalette?: string[] | TGradientStop[];
        /**
         * An array of color codes (or GradientStops if you want to control the gaps between colors) which will be used to provide fill colors.
         */
        fillPalette?: string[] | TGradientStop[];
        /**
         * The Background color as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        sciChartBackground?: string;
        /**
         * The background color of the loading animation dots,
         * which can also be customized by overriding the {@link loader}
         */
        loadingAnimationBackground?: string;
        /**
         * The foreground color of the loading animation dots,
         * which can also be customized by overriding the {@link loader}
         */
        loadingAnimationForeground?: string;
        /**
         * The Grid border brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        gridBorderBrush?: string;
        /**
         * The Axis Bands fill brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        axisBandsFill?: string;
        /**
         * The Tick Text brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        tickTextBrush?: string;
        /**
         * The Major Gridlines brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        majorGridLineBrush?: string;
        /**
         * The Minor Gridlines brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        minorGridLineBrush?: string;
        /**
         * The Grid area background brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        gridBackgroundBrush?: string;
        /**
         * The {@link RolloverModifier} line brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        rolloverLineBrush?: string;
        /**
         * The Cursor Line brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        cursorLineBrush?: string;
        /**
         * The {@link RubberBandXyZoomModifier} recticule fill brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        rubberBandFillBrush?: string;
        /**
         * The {@link RubberBandXyZoomModifier} recticule stroke brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        rubberBandStrokeBrush?: string;
        /**
         * The {@link SciChartLegend} background brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        legendBackgroundBrush?: string;
        /**
         * The {@link AxisCore | Axis} label background brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        labelBackgroundBrush?: string;
        /**
         * The {@link AxisCore | Axis} label border brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        labelBorderBrush?: string;
        /**
         * The {@link AxisCore | Axis} label foreground font color brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        labelForegroundBrush?: string;
        /**
         * The TextAnnotation font color as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        textAnnotationForeground?: string;
        /**
         * The TextAnnotation background color as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        textAnnotationBackground?: string;
        /**
         * The {@link AnnotationBase} grips border color as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        annotationsGripsBorderBrush?: string;
        /**
         * The {@link AnnotationBase} grips background color as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        annotationsGripsBackroundBrush?: string;
        /** The {@link AnnotationBase}  selection box stroke color as an HTML color code */
        annotationSelectionStroke?: string;
        overviewFillBrush?: string;
        scrollbarBackgroundBrush?: string;
        scrollbarBorderBrush?: string;
        scrollbarGripsBackgroundBrush?: string;
        scrollbarViewportBackgroundBrush?: string;
        scrollbarViewportBorderBrush?: string;
        /**
         * The default {@link FastCandlestickRenderableSeries} up-wick color as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        upWickColor?: string;
        /**
         * The default {@link FastCandlestickRenderableSeries} down-wick color as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        downWickColor?: string;
        /**
         * The default {@link FastCandlestickRenderableSeries} up body color as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        upBodyBrush?: string;
        /**
         * The default {@link FastCandlestickRenderableSeries} down body color as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        downBodyBrush?: string;
        /**
         * The default {@link FastBandRenderableSeries} up line color as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        upBandSeriesLineColor?: string;
        /**
         * The default {@link FastBandRenderableSeries} down line color as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        downBandSeriesLineColor?: string;
        /**
         * The default {@link FastBandRenderableSeries} up band fill color as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        upBandSeriesFillColor?: string;
        /**
         * The default {@link FastBandRenderableSeries} down band fill color as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        downBandSeriesFillColor?: string;
        /**
         * The default {@link FastMountainRenderableSeries} mountain fill brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        mountainAreaBrush?: string;
        /**
         * The default {@link FastMountainRenderableSeries} mountain line brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        mountainLineColor?: string;
        /**
         * The default {@link FastLineRenderableSeries} line stroke brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        lineSeriesColor?: string;
        /**
         * The default {@link FastColumnRenderableSeries} stroke brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        columnLineColor?: string;
        /**
         * The default {@link FastColumnRenderableSeries} fill brush as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        columnFillBrush?: string;
        /**
         * The default {@link UniformHeatmapRenderableSeries} color-map gradient stops
         */
        defaultColorMapBrush?: TGradientStop[];
        /**
         * The default Axis Title color applied as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        axisTitleColor?: string;
        /**
         * The default Chart Title color applied as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        chartTitleColor?: string;
        /**
         * The default shadow effect color applied to drop-shadows
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        shadowEffectColor?: string;
        /**
         * The default 3D Chart Axis Plane border color applied as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        planeBorderColor?: string;
        /**
         * The default 3D Chart Axis Plane background color applied as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        axisPlaneBackgroundFill?: string;
        /**
         * The default 3D Chart Axis Bands fill color applied as an HTML color code
         * @remarks Acceptable values include RGB format e.g. ```#FF0000```, RGBA format e.g. ```#FF000077`` and RGBA format e.g. ```rgba(255,0,0,0.5)```
         */
        axis3DBandsFill?: string;
        type: string;
    };
    private getPaletteColor;
    private toColor;
}
export declare const stripAutoColor: (val: string) => string;
