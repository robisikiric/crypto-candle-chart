import { ELayoutManagerType } from "../../types/LayoutMangerType";
import { EInnerAxisPlacementCoordinateMode } from "./EInnerAxisPlacementCoordinateMode";
import { ILayoutManagerOptions, LayoutManager } from "./LayoutManager";
export interface ICentralAxesLayoutManagerOptions extends ILayoutManagerOptions {
    horizontalAxisPositionCoordinateMode?: EInnerAxisPlacementCoordinateMode;
    verticalAxisPositionCoordinateMode?: EInnerAxisPlacementCoordinateMode;
    horizontalAxisPosition?: number;
    verticalAxisPosition?: number;
}
/**
 * A Layout manager which simplifies the handling of central axes.
 */
export declare class CentralAxesLayoutManager extends LayoutManager {
    type: ELayoutManagerType;
    private horizontalAxisPositionCoordinateModeProperty;
    private verticalAxisPositionCoordinateModeProperty;
    private horizontalAxisPositionProperty;
    private verticalAxisPositionProperty;
    constructor(options?: ICentralAxesLayoutManagerOptions);
    /**
     * The Coordinate mode. See {@link EInnerAxisPlacementCoordinateMode} for a list of values
     * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
     * The {@link EInnerAxisPlacementCoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
     * placement.
     */
    get horizontalAxisPositionCoordinateMode(): number;
    /**
     * The Coordinate mode. See {@link EInnerAxisPlacementCoordinateMode} for a list of values
     * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
     * The {@link EInnerAxisPlacementCoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
     * placement.
     */
    set horizontalAxisPositionCoordinateMode(value: number);
    /**
     * The Coordinate mode. See {@link EInnerAxisPlacementCoordinateMode} for a list of values
     * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
     * The {@link EInnerAxisPlacementCoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
     * placement.
     */
    get verticalAxisPositionCoordinateMode(): number;
    /**
     * The Coordinate mode. See {@link EInnerAxisPlacementCoordinateMode} for a list of values
     * @remarks Want to display an annotation stretching across the entire width (or height) or the {@link SciChartSurface}?
     * The {@link EInnerAxisPlacementCoordinateMode} enum has options which allow for relative, absolute or pixel coordinates which define annotation
     * placement.
     */
    set verticalAxisPositionCoordinateMode(value: number);
    /**
     * Gets or sets the coordinate of the Layout Area anchor point
     * @remarks The axisPosition obeys {@link coordinateMode} which defines whether it is a pixel, data-value or relative coordinate
     */
    get horizontalAxisPosition(): number;
    /**
     * Gets or sets the coordinate of the Layout Area anchor point
     * @remarks The axisPosition obeys {@link coordinateMode} which defines whether it is a pixel, data-value or relative coordinate
     */
    set horizontalAxisPosition(value: number);
    /**
     * Gets or sets the coordinate of the Layout Area anchor point
     * @remarks The axisPosition obeys {@link coordinateMode} which defines whether it is a pixel, data-value or relative coordinate
     */
    get verticalAxisPosition(): number;
    /**
     * Gets or sets the coordinate of the Layout Area anchor point
     * @remarks The axisPosition obeys {@link coordinateMode} which defines whether it is a pixel, data-value or relative coordinate
     */
    set verticalAxisPosition(value: number);
    toJSON(): import("../..").TLayoutManagerDefinition;
    /**
     * @summary Notifies subscribers that a property has changed and the chart requires redrawing
     * @description SciChart provides fully reactive components, changing any property or changing data will cause the {@link SciChartSurface} to
     * redraw where necessary.
     * @param propertyName The name of the property which has changed
     */
    protected notifyPropertyChanged(propertyName: string): void;
    protected groupAxesByLayoutStrategy(): void;
}
