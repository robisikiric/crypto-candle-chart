import { IGenericAnimation } from "../../Core/Animations/GenericAnimation";
import { NumberRange } from "../../Core/NumberRange";
import { Point } from "../../Core/Point";
import { EChart2DModifierType } from "../../types/ChartModifierType";
import { ICustomResizableAnnotationOptions, OverviewCustomResizableAnnotation } from "../Visuals/Annotations/OverviewCustomResizableAnnotation";
import { ChartModifierBase2D, IChartModifierBaseOptions } from "./ChartModifierBase2D";
import { ModifierMouseArgs } from "./ModifierMouseArgs";
/**
 * Optional parameters used to configure a {@link OverviewRangeSelectionModifier} at construct time
 */
export interface IRangeSelectionModifierOptions extends IChartModifierBaseOptions {
    xAxisId?: string;
    yAxisId?: string;
    onSelectedAreaChanged?: (area?: NumberRange) => void;
}
/**
 * The OverviewRangeSelectionModifier provides drag-rectangle to zoom behavior on a 2D {@link SciChartSurface}
 * within SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}
 * @remarks
 *
 * To apply the OverviewRangeSelectionModifier to a {@link SciChartSurface} and add drag to zoom behavior,
 * use the following code:
 *
 * ```ts
 * const sciChartSurface: SciChartSurface;
 * sciChartSurface.chartModifiers.add(new OverviewRangeSelectionModifier());
 * ```
 */
export declare class OverviewRangeSelectionModifier extends ChartModifierBase2D {
    readonly type = EChart2DModifierType.OverviewRangeSelection;
    onSelectedAreaChanged: (area?: NumberRange) => void;
    overviewPositionAnimation: IGenericAnimation | undefined;
    animationDuration: number;
    animate: boolean;
    protected pointTo: Point | undefined;
    protected isClicked: boolean;
    protected rangeSelectionAnnotationProperty: OverviewCustomResizableAnnotation | undefined;
    protected annotationBeforeSelectedAreaProperty: OverviewCustomResizableAnnotation | undefined;
    protected annotationAfterSelectedAreaProperty: OverviewCustomResizableAnnotation | undefined;
    private selectedAreaProperty;
    /**
     * Creates an instance of a OverviewRangeSelectionModifier
     * @param options Optional parameters used to configure the modifier
     */
    constructor(options?: IRangeSelectionModifierOptions);
    /**
     * @inheritDoc
     */
    onAttach(): void;
    /**
     * @inheritDoc
     */
    modifierMouseDown(args: ModifierMouseArgs): void;
    /**
     * @inheritDoc
     */
    modifierMouseUp(args: ModifierMouseArgs): void;
    /**
     * Gets the annotation used for range selection
     */
    get rangeSelectionAnnotation(): OverviewCustomResizableAnnotation;
    /**
     * Gets the svg string for the unselected part of the range
     */
    get unselectedsvgString(): string;
    /**
     * Sets the svg string for the unselected part of the range
     */
    set unselectedsvgString(svgString: string);
    /**
     * Gets or sets the selected area ranges of the modifier
     */
    get selectedArea(): NumberRange;
    /**
     * Gets or sets the selected area ranges of the modifier
     */
    set selectedArea(value: NumberRange);
    createAnnotation(options: ICustomResizableAnnotationOptions): OverviewCustomResizableAnnotation;
    protected updateSelectionAnnotation(): void;
}
