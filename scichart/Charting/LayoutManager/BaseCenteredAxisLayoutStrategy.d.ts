import { SciChartSurface } from "../Visuals/SciChartSurface";
import { BaseAxisLayoutStrategy } from "./BaseAxisLayoutStrategy";
import { EInnerAxisPlacementCoordinateMode } from "./EInnerAxisPlacementCoordinateMode";
/**
 * Options passed to the constructor of a {@link BaseCenteredAxisLayoutStrategy}, used to configure it at instantiation time
 */
export interface IInnerAxisLayoutStrategyOptions {
    /**
     * The Coordinate mode. See {@link EInnerAxisPlacementCoordinateMode} for a list of values
     * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
     * The {@link EInnerAxisPlacementCoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
     * placement.
     */
    coordinateMode?: EInnerAxisPlacementCoordinateMode;
    /**
     * @description the coordinate of the Layout Area anchor point
     * @remarks The axisPosition obeys {@link coordinateMode} which defines whether it is a pixel, data-value or relative coordinate
     */
    axisPosition?: number;
    /**
     * The id for the vertical or horizontal axis which is used for positioning the central axes
     */
    orthogonalAxisId?: string;
}
/**
 * The Base Layout Strategy for Central Axes
 */
export declare abstract class BaseCenteredAxisLayoutStrategy extends BaseAxisLayoutStrategy {
    protected sciChartSurface: SciChartSurface;
    private orthogonalAxisIdProperty;
    private coordinateModeProperty;
    private axisPositionProperty;
    /**
     * Gets or sets the id for the vertical or horizontal axis which is used for positioning the central axes
     */
    get orthogonalAxisId(): string;
    /**
     * Gets or sets the id for the vertical or horizontal axis which is used for positioning the central axes
     */
    set orthogonalAxisId(value: string);
    /**
     * The Coordinate mode. See {@link EInnerAxisPlacementCoordinateMode} for a list of values
     * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
     * The {@link EInnerAxisPlacementCoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
     * placement.
     */
    get coordinateMode(): number;
    /**
     * The Coordinate mode. See {@link EInnerAxisPlacementCoordinateMode} for a list of values
     * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
     * The {@link EInnerAxisPlacementCoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
     * placement.
     */
    set coordinateMode(value: number);
    /**
     * Gets or sets the coordinate of the Layout Area anchor point
     * @remarks The axisPosition obeys {@link coordinateMode} which defines whether it is a pixel, data-value or relative coordinate
     */
    get axisPosition(): number;
    /**
     * Gets or sets the coordinate of the Layout Area anchor point
     * @remarks The axisPosition obeys {@link coordinateMode} which defines whether it is a pixel, data-value or relative coordinate
     */
    set axisPosition(value: number);
    /**
     * Creates Inner Axis Layout Strategy
     * param options {@link IInnerAxisLayoutStrategyOptions}
     */
    constructor(options?: IInnerAxisLayoutStrategyOptions);
    toJSON(): {
        type: import("../..").ELayoutStrategyType;
        options: Required<Omit<IInnerAxisLayoutStrategyOptions, never>>;
    };
    /**
     * @summary Notifies subscribers that a property has changed and the chart requires redrawing
     * @description SciChart provides fully reactive components, changing any property or changing data will cause the {@link SciChartSurface} to
     * redraw where necessary.
     * @param propertyName The name of the property which has changed
     */
    protected notifyPropertyChanged(propertyName: string): void;
}
