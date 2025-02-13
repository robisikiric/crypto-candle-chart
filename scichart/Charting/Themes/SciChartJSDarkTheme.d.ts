import { EThemeProviderType } from "../../types/ThemeProviderType";
import { ThemeProvider } from "./IThemeProvider";
/**
 * An implementation of {@link ThemeProvider} which provides a dark theme
 * @decription Applied to a 2D {@link SciChartSurface}, or a 3D {@link SciChart3DSurface}, the ThemeProvider may be
 * applied using the {@link SciChartSurface.applyTheme | applyTheme} method, where it is passed down to child components
 * so that all children of the chart get the same theme.
 *
 * For example:
 * ```ts
 * // Applying a theme when creating a chart
 * const { sciChartSurface, wasmContext } = SciChartSurface.create("div-id", { theme: new SciChartJSDarkTheme() });
 * // Apply a theme after chart creation
 * sciChartSurface.applyTheme(new SciChartJSDarkTheme());
 *
 * // Applying a custom theme
 * export class MyCustomTheme implements IThemeProvider {
 *    // todo: implement IThemeProvider interface and apply properties
 * }
 *
 * sciChartSurface.applyTheme(new MyCustomTheme()); // Or apply in SciChartSurface.create()
 *
 * // Overriding just some members of a theme
 * const myOverriddenTheme = {...new SciChartJSLightTheme(), sciChartBackground: "white" };
 * ciChartSurface.applyTheme(myOverriddenTheme); // Or apply in SciChartSurface.create()
 * ```
 */
export declare class SciChartJSDarkTheme extends ThemeProvider {
    /** @inheritDoc */
    type: EThemeProviderType;
    /** @inheritDoc */
    sciChartBackground: string;
    /** @inheritDoc */
    loadingAnimationBackground: string;
    /** @inheritDoc */
    loadingAnimationForeground: string;
    /** @inheritDoc */
    gridBorderBrush: string;
    /** @inheritDoc */
    axisBandsFill: string;
    /** @inheritDoc */
    axisBorder: string;
    /** @inheritDoc */
    tickTextBrush: string;
    /** @inheritDoc */
    majorGridLineBrush: string;
    /** @inheritDoc */
    minorGridLineBrush: string;
    /** @inheritDoc */
    gridBackgroundBrush: string;
    /** @inheritDoc */
    rolloverLineBrush: string;
    /** @inheritDoc */
    cursorLineBrush: string;
    /** @inheritDoc */
    rubberBandFillBrush: string;
    /** @inheritDoc */
    rubberBandStrokeBrush: string;
    /** @inheritDoc */
    legendBackgroundBrush: string;
    /** @inheritDoc */
    labelBackgroundBrush: string;
    /** @inheritDoc */
    labelBorderBrush: string;
    /** @inheritDoc */
    labelForegroundBrush: string;
    /** @inheritDoc */
    textAnnotationForeground: string;
    /** @inheritDoc */
    textAnnotationBackground: string;
    /** @inheritDoc */
    annotationsGripsBorderBrush: string;
    /** @inheritDoc */
    annotationsGripsBackroundBrush: string;
    /** @inheritDoc */
    annotationSelectionStroke: string;
    /** @inheritDoc */
    overviewFillBrush: string;
    /** @inheritDoc */
    scrollbarBackgroundBrush: string;
    /** @inheritDoc */
    scrollbarBorderBrush: string;
    /** @inheritDoc */
    scrollbarGripsBackgroundBrush: string;
    /** @inheritDoc */
    scrollbarViewportBackgroundBrush: string;
    /** @inheritDoc */
    scrollbarViewportBorderBrush: string;
    /** @inheritDoc */
    upWickColor: string;
    /** @inheritDoc */
    downWickColor: string;
    /** @inheritDoc */
    upBodyBrush: string;
    /** @inheritDoc */
    downBodyBrush: string;
    /** @inheritDoc */
    upBandSeriesLineColor: string;
    /** @inheritDoc */
    downBandSeriesLineColor: string;
    /** @inheritDoc */
    upBandSeriesFillColor: string;
    /** @inheritDoc */
    downBandSeriesFillColor: string;
    /** @inheritDoc */
    mountainAreaBrush: string;
    /** @inheritDoc */
    mountainLineColor: string;
    /** @inheritDoc */
    lineSeriesColor: string;
    /** @inheritDoc */
    columnLineColor: string;
    /** @inheritDoc */
    columnFillBrush: string;
    /** @inheritDoc */
    impulseFillBrush: string;
    /** @inheritDoc */
    defaultColorMapBrush: {
        offset: number;
        color: string;
    }[];
    /** @inheritDoc */
    axisTitleColor: string;
    /** @inheritDoc */
    chartTitleColor: string;
    /** @inheritDoc */
    shadowEffectColor: string;
    /** @inheritDoc */
    planeBorderColor: string;
    /** @inheritDoc */
    axisPlaneBackgroundFill: string;
    /** @inheritDoc */
    axis3DBandsFill: string;
    /** @inheritDoc */
    isLightBackground: boolean;
}
