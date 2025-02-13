import { RolloverModifier, IRolloverModifierOptions } from "./RolloverModifier";
import { ModifierMouseArgs } from "./ModifierMouseArgs";
import { RolloverModifierRenderableSeriesProps } from "../Visuals/RenderableSeries/RolloverModifier/RolloverModifierRenderableSeriesProps";
import { IRenderableSeries } from "../Visuals/RenderableSeries/IRenderableSeries";
import { ECoordinateMode } from "../Visuals/Annotations/AnnotationBase";
import { LineAnnotation } from "../Visuals/Annotations/LineAnnotation";
import { IChartModifierBaseOptions } from "./ChartModifierBase2D";
/**
 * Optional parameters used to configure a {@link RolloverModifier} at construct time
 */
export interface IVerticalSliceOptions extends IRolloverModifierOptions {
    /**
     * @description the X1 coordinate of the modifier
     * @remarks The X1 coordinate obeys {@link xCoordinateMode} which defines whether the X1 coordinate is a pixel, data-value or relative coordinate
     */
    x1?: number;
    /**
     * The X-Coordinate mode. See {@link ECoordinateMode} for a list of values
     * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
     * The {@link ECoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
     * placement.
     */
    xCoordinateMode?: ECoordinateMode;
    /** Whether the annotation is draggable by the user.  Default false */
    isDraggable?: boolean;
    /** If set and isDraggable is true, a selection box of this color will be shown around the line when it is clicked. */
    lineSelectionColor?: string;
}
export declare class VerticalSliceModifier extends RolloverModifier {
    /** @inheritDoc */
    get x1(): number;
    /** @inheritDoc */
    set x1(value: number);
    /** @inheritDoc */
    get xCoordinateMode(): ECoordinateMode;
    /** @inheritDoc */
    set xCoordinateMode(value: ECoordinateMode);
    /** @inheritDoc */
    get verticalLine(): LineAnnotation;
    /** @inheritDoc */
    get isDraggable(): boolean;
    /** @inheritDoc */
    set isDraggable(value: boolean);
    /** @inheritDoc */
    get lineSelectionColor(): string;
    /** @inheritDoc */
    set lineSelectionColor(value: string);
    private x1Property;
    private xCoordinateModeProperty;
    private isDraggableProperty;
    private lineSelectionColorProperty;
    private rmrsProps;
    private rmrsProps1;
    constructor(options?: IVerticalSliceOptions);
    modifierMouseMove(args: ModifierMouseArgs): void;
    /**
     * @inheritDoc
     */
    modifierMouseLeave(args: ModifierMouseArgs): void;
    toJSON(): {
        type: string;
        options: Required<Omit<IChartModifierBaseOptions, never>>;
    };
    protected getRolloverProps(rs: IRenderableSeries): RolloverModifierRenderableSeriesProps;
    protected getRolloverProps1(rs: IRenderableSeries): RolloverModifierRenderableSeriesProps;
    protected removeSeriesAnnotationsFromParentSurface(rs: IRenderableSeries): void;
    /**
     * @param rs
     */
    protected addSeriesAnnotationsToParentSurface(rs: IRenderableSeries): void;
    protected createLine(options?: IRolloverModifierOptions): LineAnnotation;
    protected update(): void;
    /** @inheritDoc */
    protected notifyPropertyChanged(propertyName: string): void;
    private calculateXPosition;
}
