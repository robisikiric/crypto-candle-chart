import type { TSciChartDestination } from "./SciChartSurfaceBase";
/** @ignore */
export declare type TGetDestinationFn = (destinationId: string) => TSciChartDestination;
/** @ignore */
export declare const copyToCanvas: (sourceCanvas: HTMLCanvasElement, getDestinationById: TGetDestinationFn) => (destinationId: string) => void;
