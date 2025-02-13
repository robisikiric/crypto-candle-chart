import { EventHandler } from "../../../Core/EventHandler";
import { PropertyChangedEventArgs } from "../../../Core/PropertyChangedEventArgs";
import { TGradientStop } from "../../../types/TGradientStop";
export interface IHeatmapColorMapOptions {
    minimum?: number;
    maximum?: number;
    gradientStops?: TGradientStop[];
}
export interface IColorMapParams {
    minimum: number;
    maximum: number;
}
export declare class HeatmapColorMap implements IColorMapParams {
    private static readonly DefaultPrecision;
    readonly propertyChanged: EventHandler<PropertyChangedEventArgs>;
    private minimumProperty;
    private maximumProperty;
    private scaleFactorProperty;
    private gradientStopsProperty;
    constructor(options?: IHeatmapColorMapOptions);
    get gradientStops(): TGradientStop[];
    set gradientStops(gradientStops: TGradientStop[]);
    get minimum(): number;
    set minimum(minimum: number);
    get maximum(): number;
    set maximum(maximum: number);
    toJSON(): {
        minimum: number;
        maximum: number;
        gradientStops: TGradientStop[];
    };
    protected notifyPropertyChanged(property: string): void;
    protected calculateScaleFactor(): void;
}
