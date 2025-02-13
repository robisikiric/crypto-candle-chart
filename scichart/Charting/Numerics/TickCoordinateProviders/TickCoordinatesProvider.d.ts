import { AxisCore } from "../../Visuals/Axis/AxisCore";
/**
 * A base class for Tick Coordinate Providers, which convert arrays of major and minor ticks (data values) into pixel coordinates.
 */
export declare abstract class TickCoordinatesProvider {
    /**
     * The parent {@link AxisCore}. This will be set once {@link attachedToAxis} is called
     */
    parentAxis: AxisCore;
    /**
     * Called when the {@link TickCoordinatesProvider} is attached to an {@link AxisCore | Axis}
     * @param axis The Axis we are attached to.
     */
    attachedToAxis(axis: AxisCore): void;
    /**
     * Called when the {@link TickCoordinatesProvider} is detached from an {@link AxisCore | Axis}
     * @param axis The Axis we are attached to.
     */
    detachedFromAxis(): void;
    /**
     * Converts arrays of major and minor ticks (data values) into structure containing pixel coordinates
     * @param minorTicks
     * @param majorTicks
     */
    abstract getTickCoordinates(majorTicks: number[], minorTicks: number[]): {
        majorTickCoords: number[];
        minorTickCoords: number[];
        majorTickOverrides: number[];
        minorTickOverRides: number[];
    };
}
