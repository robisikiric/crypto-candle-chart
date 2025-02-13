import { GradientParams } from "../../Core/GradientParams";
import { NumberRange } from "../../Core/NumberRange";
import { TGradientStop } from "../../types/TGradientStop";
import { TSciChart } from "../../types/TSciChart";
import { IFillPaletteProvider, IPointMarkerPaletteProvider, IStrokePaletteProvider } from "./IPaletteProvider";
/**
 * Placeholder interface that implements all paletteprovider types
 */
export interface IAllPaletteProviders extends IStrokePaletteProvider, IFillPaletteProvider, IPointMarkerPaletteProvider {
}
/**
 * Additional options passed to {@link PaletteFactory.createGradient} to define which features are enabled in the gradient paletteprovider
 */
export interface IGradientPaletteOptions {
    /**
     * When true (default = true), IStrokePaletteProvider is enabled
     */
    enableStroke?: boolean;
    /**
     * When true (default = false), IFillPaletteProvider is enabled
     */
    enableFill?: boolean;
    /**
     * When true (default = false), IPointMarkerPaletteProvider is enabled
     */
    enablePointMarkers?: boolean;
    /**
     * Optional opacity (default = 1) applied to IStrokePaletteProvider calculations
     */
    strokeOpacity?: number;
    /**
     * Optional opacity (default = 1) applied to IFillPaletteProvider calculations
     */
    fillOpacity?: number;
    /**
     * Optional opacity (default = 1) applied to IPointMarkerPaletteProvider calculations
     */
    pointMarkerOpacity?: number;
}
/**
 * The PaletteFactory allows easy creation of palettes for some chart types
 */
export declare class PaletteFactory {
    static readonly precision: number;
    /**
     * Creates a multi purpose Gradient Palette for line series, scatter, bubble or column and mountain series returning
     * an {@link IPaletteProvider} implementation which
     * colors data-points of charts depending on the x-index of the data according to the Gradient Brush passed in
     * @param webAssemblyContext the {@link TSciChart | SciChart WebAssembly Context} containing native methods
     * @param gradientBrush the {@link GradientParams} containing information about the Gradient Brush
     * @param options the {@link IGradientPaletteOptions} containing additional options to turn stroke, fill or pointmarker sections on or off, and opacity per option
     */
    static createGradient(webAssemblyContext: TSciChart, gradientBrush: GradientParams, options?: IGradientPaletteOptions): IAllPaletteProviders;
    static createYGradient(webAssemblyContext: TSciChart, gradientBrush: GradientParams, yRange: NumberRange, options?: IGradientPaletteOptions): IAllPaletteProviders;
    static createColorMap(webAssemblyContext: TSciChart, gradientStops: TGradientStop[]): number[];
}
