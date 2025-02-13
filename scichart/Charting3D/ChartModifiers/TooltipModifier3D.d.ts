import { ModifierMouseArgs } from "../../Charting/ChartModifiers/ModifierMouseArgs";
import { EChart3DModifierType } from "../../types/ChartModifierType";
import { TooltipSvgAnnotation3D, TTooltip3DDataTemplate, TTooltip3DSvgTemplate } from "../Visuals/Annotations/TooltipSvgAnnotation3D";
import { IRenderableSeries3D } from "../Visuals/RenderableSeries/BaseRenderableSeries3D";
import { ChartModifierBase3D, IChartModifierBase3DOptions } from "./ChartModifierBase3D";
/**
 * Optional parameters passed to the constructor of {@link TooltipModifier3D} to configure it
 */
export interface ITooltipModifier3DOptions extends IChartModifierBase3DOptions {
    /**
     * Gets or sets the stroke color of the crosshair as an HTML Color code
     * @param stroke
     */
    crosshairStroke?: string;
    /**
     * Gets or sets the strokethickness of the crosshair line
     */
    crosshairStrokeThickness?: number;
    /**
     * When true, a crosshair line will be displayed from the hovered point location to the far axis wall
     * @param isVisible
     */
    isCrosshairVisible?: boolean;
    showTooltip?: boolean;
    tooltipTitle?: string;
    tooltipSvgTemplate?: TTooltip3DSvgTemplate;
    tooltipContainerBackground?: string;
    tooltipTextStroke?: string;
    tooltipLegendTemplate?: TTooltip3DSvgTemplate;
    tooltipLegendOffsetX?: number;
    tooltipLegendOffsetY?: number;
    placementDivId?: string;
    tooltipDataTemplate?: TTooltip3DDataTemplate;
}
export declare class TooltipModifier3D extends ChartModifierBase3D {
    /**
     * @inheritDoc
     */
    readonly type = EChart3DModifierType.Tooltip;
    /**
     * Gets or sets whether we should display the tooltip. Default is true
     */
    showTooltip: boolean;
    tooltipTitle?: string;
    protected includedSeriesMap: Map<IRenderableSeries3D, boolean>;
    protected tooltipAnnotation: TooltipSvgAnnotation3D;
    private crosshairEntity;
    private crosshairStrokeProperty;
    private crosshairStrokeThicknessProperty;
    private isCrosshairVisibleProperty;
    private tooltipSvgTemplateProperty?;
    private tooltipLegendTemplateProperty?;
    private tooltipContainerBackgroundProperty?;
    private tooltipTextStrokeProperty?;
    private tooltipLegendOffsetXProperty?;
    private tooltipLegendOffsetYProperty?;
    private placementDivIdProperty?;
    private tooltipDataTemplateProperty?;
    constructor(options?: ITooltipModifier3DOptions);
    includeSeries(series: IRenderableSeries3D, isIncluded: boolean): void;
    getIncludedSeries(): IRenderableSeries3D[];
    /**
     * When true, a crosshair line will be displayed from the hovered point location to the far axis wall
     * @param isVisible
     */
    get isCrosshairVisible(): boolean;
    /**
     * When true, a crosshair line will be displayed from the hovered point location to the far axis wall
     * @param isVisible
     */
    set isCrosshairVisible(isVisible: boolean);
    /**
     * Gets or sets the stroke color of the crosshair as an HTML Color code
     * @param stroke
     */
    get crosshairStroke(): string;
    /**
     * Gets or sets the stroke color of the crosshair as an HTML Color code
     * @param stroke
     */
    set crosshairStroke(stroke: string);
    /**
     * Gets or sets the strokethickness of the crosshair line
     */
    get crosshairStrokeThickness(): number;
    /**
     * Gets or sets the strokethickness of the crosshair line
     */
    set crosshairStrokeThickness(strokeThickness: number);
    get tooltipSvgTemplate(): TTooltip3DSvgTemplate;
    set tooltipSvgTemplate(value: TTooltip3DSvgTemplate);
    get tooltipLegendTemplate(): TTooltip3DSvgTemplate;
    set tooltipLegendTemplate(value: TTooltip3DSvgTemplate);
    get tooltipDataTemplate(): TTooltip3DDataTemplate;
    set tooltipDataTemplate(value: TTooltip3DDataTemplate);
    get tooltipContainerBackground(): string;
    set tooltipContainerBackground(value: string);
    get tooltipLegendOffsetX(): number;
    set tooltipLegendOffsetX(value: number);
    get tooltipLegendOffsetY(): number;
    set tooltipLegendOffsetY(value: number);
    get tooltipTextStroke(): string;
    set tooltipTextStroke(value: string);
    /**
     * Gets or sets the parent div element reference or id for the Tooltip
     */
    get placementDivId(): string;
    /**
     * Gets or sets the parent div element reference or id for the Tooltip
     */
    set placementDivId(value: string);
    /** @inheritDoc */
    onAttach(): void;
    /** @inheritDoc */
    onDetach(): void;
    /** @inheritDoc */
    modifierMouseMove(args: ModifierMouseArgs): void;
    onParentSurfaceRendered(): void;
    protected update(): void;
}
/** Relocate the tooltip so that it is always within the seriesViewRect */
export declare const adjustTooltipPosition3D: (width: number, height: number, svgAnnotation: TooltipSvgAnnotation3D) => void;
