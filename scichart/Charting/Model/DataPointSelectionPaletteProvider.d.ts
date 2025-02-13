import { TPaletteProviderDefinition } from "../../Builder/buildSeries";
import { IRenderableSeries } from "../Visuals/RenderableSeries/IRenderableSeries";
import { EFillPaletteMode, EStrokePaletteMode, IFillPaletteProvider, IPointMarkerPaletteProvider, IStrokePaletteProvider, TPointMarkerArgb } from "./IPaletteProvider";
import { IPointMetadata } from "./IPointMetadata";
export interface ISelectedPointOptions {
    /**
     * The fill of the point-marker as an HTML color code
     */
    fill?: string;
    /**
     * The stroke of the point-marker as an HTML color code
     */
    stroke?: string;
}
export declare class DataPointSelectionPaletteProvider implements IFillPaletteProvider, IStrokePaletteProvider, IPointMarkerPaletteProvider {
    private seriesType;
    selectedPointMarker: TPointMarkerArgb;
    selectedStroke: number;
    selectedFill: number;
    strokePaletteMode: EStrokePaletteMode;
    fillPaletteMode: EFillPaletteMode;
    constructor(options: ISelectedPointOptions);
    onAttached(parentSeries: IRenderableSeries): void;
    onDetached(): void;
    overridePointMarkerArgb(xValue: number, yValue: number, index: number, opacity?: number, metadata?: IPointMetadata): TPointMarkerArgb;
    overrideStrokeArgb(xValue: number, yValue: number, index: number, opacity?: number, metadata?: IPointMetadata): number;
    overrideFillArgb(xValue: number, yValue: number, index: number, opacity?: number, metadata?: IPointMetadata): number;
    toJSON(): TPaletteProviderDefinition;
}
