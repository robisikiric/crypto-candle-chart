import { DefaultTickCoordinatesProvider } from "./DefaultTickCoordinatesProvider";
export declare class StaticTickCoordinatesProvider extends DefaultTickCoordinatesProvider {
    private tickCoords;
    private prevRange;
    private prevSize;
    /**
     * @inheritDoc
     */
    getTickCoordinates(majorTicks: number[], minorTicks: number[]): {
        majorTickCoords: number[];
        minorTickCoords: number[];
        majorTickOverrides: number[];
        minorTickOverRides: number[];
    };
    /** Update the static tick positions to correspond with the current calculated tick values */
    forceRecalculateCoords(): void;
    private OverrideTickValues;
    private OverrideTickCoordinates;
}
