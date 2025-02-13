import { TickCoordinatesProvider } from "./TickCoordinatesProvider";
export declare class DefaultTickCoordinatesProvider extends TickCoordinatesProvider {
    /**
     * @inheritDoc
     */
    getTickCoordinates(majorTicks: number[], minorTicks: number[]): {
        majorTickCoords: number[];
        minorTickCoords: number[];
        majorTickOverrides: number[];
        minorTickOverRides: number[];
    };
}
