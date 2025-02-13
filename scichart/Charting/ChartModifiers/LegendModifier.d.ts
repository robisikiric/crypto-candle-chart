import { EventHandler } from "../../Core/EventHandler";
import { IIncludeSeries } from "../../Core/IIncludeSeries";
import { EChart2DModifierType } from "../../types/ChartModifierType";
import { IThemeProvider } from "../Themes/IThemeProvider";
import { SciChartLegend } from "../Visuals/Legend/SciChartLegend";
import { ILegendOptionsBase } from "../Visuals/Legend/SciChartLegendBase";
import { IRenderableSeries } from "../Visuals/RenderableSeries/IRenderableSeries";
import { ChartModifierBase2D, IChartModifierBaseOptions } from "./ChartModifierBase2D";
/**
 * Optional parameters used to configure a {@link LegendModifier} at construct time
 */
export interface ILegendModifierOptions extends IChartModifierBaseOptions, ILegendOptionsBase {
    /**
     * Sets whether the legend has visibility checkboxes in it or not
     */
    showCheckboxes?: boolean;
    /**
     * Sets whether Series markers are visible or not
     */
    showSeriesMarkers?: boolean;
    /**
     * Callback when a legend item checkbox is checked or unchecked (by default, this corresponds to {@link IRenderableSeries.isVisible}
     * @param series
     * @param isChecked
     */
    isCheckedChangedCallback?: (series: IRenderableSeries, isChecked: boolean) => void;
    /**
     * Set this only if you need to pass in a custom legend instance.
     * showCheckboxes, showSeriesMarkers and isCheckedChangedCallback will be set on the instance you pass if specified in the options.
     */
    legend?: SciChartLegend;
}
/**
 * Type args for the {@link LegendModifier.isCheckedChanged} callback
 */
export declare type TCheckedChangedArgs = {
    /**
     * The series which was checked or unchecked
     */
    series: IRenderableSeries;
    /**
     * Whether the corresponding legend item is checked or not (by default, this corresponds to {@link IRenderableSeries.isVisible})
     */
    isChecked: boolean;
};
/**
 * The LegendModifier provides interactive legend behavior on a 2D {@link SciChartSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the LegendModifier to a {@link SciChartSurface} and add tooltip behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new LegendModifier());
 * ```
 */
export declare class LegendModifier extends ChartModifierBase2D implements IIncludeSeries {
    readonly type = EChart2DModifierType.Legend;
    /**
     * Gets the {@link SciChartLegend} control used to render the legend
     */
    sciChartLegend: SciChartLegend | undefined;
    /**
     * An event handler raised when a {@link SciChartLegend} row checkbox is checked or unchecked
     */
    readonly isCheckedChanged: EventHandler<TCheckedChangedArgs>;
    private includedSeriesMap;
    /**
     * Creates an instance of the LegendModifier
     * @param options Optional parameters {@link ILegendModifierOptions} used to configure the modifier
     */
    constructor(options?: ILegendModifierOptions);
    /** @inheritDoc */
    applyTheme(themeProvider: IThemeProvider): void;
    /** @inheritDoc */
    onAttachSeries(rs: IRenderableSeries): void;
    /** @inheritDoc */
    onDetachSeries(rs: IRenderableSeries): void;
    /** @inheritDoc */
    onParentSurfaceRendered(): void;
    /** @inheritDoc */
    onAttach(): void;
    /** @inheritDoc */
    onDetach(): void;
    /** @inheritDoc */
    includeSeries(series: IRenderableSeries, isIncluded: boolean): void;
    /** @inheritDoc */
    getIncludedRenderableSeries(): IRenderableSeries[];
    /** @inheritDoc */
    toJSON(): {
        type: string;
        options: Required<Omit<IChartModifierBaseOptions, never>>; /** @inheritDoc */
    };
    /** @inheritDoc */
    delete(): void;
    /**
     * Callback called from inner {@link SciChartLegend} when a checkbox is checked or unchecked
     * @param series
     * @param isChecked
     * @protected
     */
    protected legendItemCheckedChanged(series: IRenderableSeries, isChecked: boolean): void;
    /**
     * Test if the series is included or excluded, by default it is included
     * @param series
     * @private
     */
    private testIsIncludedSeries;
}
