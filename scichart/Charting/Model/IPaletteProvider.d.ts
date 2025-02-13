import { TPaletteProviderDefinition } from "../../Builder/buildSeries";
import { SCRTDoubleVector } from "../../types/TSciChart";
import { TPalettingState } from "../Visuals/RenderableSeries/DrawingProviders/BaseSeriesDrawingProvider";
import { IRenderableSeries } from "../Visuals/RenderableSeries/IRenderableSeries";
import { IPointMetadata } from "./IPointMetadata";
/**
 * The PaletteProvider interface allows you to perform per-point paletting or coloring of series or data-points
 * in SciChart's {@link https://www.scichart.com/javascript-chart-features | High Performance Realtime JavaScript Charts}
 * @remarks
 * See derived type {@link IStrokePaletteProvider} for coloring line series or strokes.
 * See derived type {@link IFillPaletteProvider} for coloring fills or areas.
 */
export interface IPaletteProvider {
    /**
     * Called when the PaletteProvider instance is attached to a {@link BaseRenderableSeries | RenderableSeries}.
     * Use this to be notified when attached and keep a reference to the parent series
     * @param parentSeries
     */
    onAttached(parentSeries: IRenderableSeries): void;
    /**
     * Called when the PaletteProvider instance is detached from a {@link BaseRenderableSeries | RenderableSeries}.
     */
    onDetached(): void;
    /**
     * Set true if the paletting does not depend on the visible Range.  This prevents the palette being recalculated if only the visible range changes.
     */
    isRangeIndependant?: boolean;
    /**
     * Called once before the per-vertex loop starts.
     * @Returns true if paletting should be forced to run.  If this exists and returns false, the existing paletting state is reused if possible.
     * If this does NOT exist, the palette will be recalculated on every render.  This default will change in v4.
     * Use this to force the palette to be recalculated if some external parameter to it changes.
     */
    shouldUpdatePalette?(): boolean;
    /** Convert the object to a definition that can be serialized to JSON, or used directly with the builder api */
    toJSON?(): TPaletteProviderDefinition;
}
export interface IAdvancedPaletteProvider extends IPaletteProvider {
    applyPaletting(palettingState: TPalettingState, xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, indexes: SCRTDoubleVector, startIndex: number, count: number): void;
}
export declare enum EStrokePaletteMode {
    GRADIENT = "GRADIENT",
    SOLID = "SOLID"
}
/**
 * The IStrokePaletteProvider interface allows you to perform per-point paletting or coloring of series or data-points
 * in Line Charts and JavaScript chart types which have a stroke line or outline
 * @remarks
 * See type {@link IFillPaletteProvider} for per data-point coloring of fills or areas.
 */
export interface IStrokePaletteProvider extends IPaletteProvider {
    /**
     * Gets the stroke palette mode
     */
    strokePaletteMode: EStrokePaletteMode;
    /**
     * Called by SciChart and may be used to override the color of a line segment or
     * stroke outline in various chart types.
     * @remarks WARNING: CALLED PER-VERTEX, MAY RESULT IN PERFORMANCE DEGREDATION IF COMPLEX CODE EXECUTED HERE
     * @param xValue the current XValue
     * @param yValue the current YValue
     * @param index the current index to the data
     * @param opacity the current opacity
     * @param metadata the point metadata
     * @returns an ARGB color code, e.g. 0xFFFF0000 would be red, or 'undefined' for default colouring
     */
    overrideStrokeArgb(xValue: number, yValue: number, index: number, opacity?: number, metadata?: IPointMetadata): number;
}
export declare enum EFillPaletteMode {
    GRADIENT = "GRADIENT",
    SOLID = "SOLID"
}
/**
 * The IFillPaletteProvider interface allows you to perform per-point paletting or coloring of series or data-points
 * in Mountain, Column, Candlestick Charts and JavaScript chart types which have a fill or body
 * @remarks
 * See type {@link IStrokePaletteProvider} for per data-point coloring of strokes or outlines
 */
export interface IFillPaletteProvider extends IPaletteProvider {
    /**
     * Gets the stroke palette mode
     */
    fillPaletteMode: EFillPaletteMode;
    /**
     * Called by SciChart and may be used to override the color of filled polygon in various chart types.
     * @remarks WARNING: CALLED PER-VERTEX, MAY RESULT IN PERFORMANCE DEGREDATION IF COMPLEX CODE EXECUTED HERE
     * @param xValue the current XValue
     * @param yValue the current YValue
     * @param index the current index to the data
     * @param opacity the current opacity
     * @param metadata the point metadata
     * @returns an ARGB color code, e.g. 0xFFFF0000 would be red, or 'undefined' for default colouring
     */
    overrideFillArgb(xValue: number, yValue: number, index: number, opacity?: number, metadata?: IPointMetadata): number;
}
export declare type TPointMarkerArgb = {
    stroke: number;
    fill: number;
};
/**
 * The IPointMarkerPaletteProvider interface allows you to perform per-point paletting or coloring of series or data-points
 * in Scatter Charts and JavaScript chart types which have a stroke line or outline as well as a fill or body
 * @remarks
 * See type {@link IStrokePaletteProvider} for per data-point coloring of strokes or outlines
 * See type {@link IFillPaletteProvider} for per data-point coloring of fills or areas.
 */
export interface IPointMarkerPaletteProvider extends IPaletteProvider {
    /**
     * Gets the stroke palette mode
     */
    strokePaletteMode: EStrokePaletteMode;
    /**
     * Called by SciChart and may be used to override the color of fill/stroke on pointmarkers
     * WARNING: CALLED PER-VERTEX, MAY RESULT IN PERFORMANCE DEGREDATION IF COMPLEX CODE EXECUTED HERE
     * @param xValue the current XValue
     * @param yValue the current YValue
     * @param index the current index to the data
     * @param opacity the current opacity
     * @param metadata the point metadata
     * @returns TPointMarkerArgb type with ARGB stroke & fill color codes,
     * e.g. 0xFFFF0000 would be red, or 'undefined' for default colouring
     */
    overridePointMarkerArgb(xValue: number, yValue: number, index: number, opacity?: number, metadata?: IPointMetadata): TPointMarkerArgb;
}
/**
 * A Default Palette provider is applied to the {@link BaseRenderableSeries.paletteProvider} property in the constructor
 * however all its functions such as {@link DefaultPaletteProvider.overrideFillArgb}, {@link DefaultPaletteProvider.overrideStrokeArgb}
 * etc... are set to undefined. This allows a user to do quick one-line paletteproviders in vanilla Javascript like this:
 *
 * ```javascript
 * const series = new FastLineRenderableSeries(wasmContext);
 * series.paletteProvider.overrideFillArgb = (xValue, yValue, index) => {
 *     return yValue > 0 ? parseColorToUIntArgb("white") : undefined;
 * }
 * ```
 */
export declare class DefaultPaletteProvider implements IStrokePaletteProvider, IFillPaletteProvider, IPointMarkerPaletteProvider {
    static createEmpty(): DefaultPaletteProvider;
    strokePaletteMode: EStrokePaletteMode;
    fillPaletteMode: EFillPaletteMode;
    protected parentSeries: IRenderableSeries;
    /**
     * @inheritDoc
     */
    onAttached(parentSeries: IRenderableSeries): void;
    /**
     * @inheritDoc
     */
    onDetached(): void;
    /**
     * @inheritDoc
     */
    get isRangeIndependant(): boolean;
    /**
     * @inheritDoc
     */
    shouldUpdatePalette(): boolean;
    /**
     * @inheritDoc
     */
    overrideFillArgb(xValue: number, yValue: number, index: number, opacity?: number, metadata?: IPointMetadata): number;
    /**
     * @inheritDoc
     */
    overrideStrokeArgb(xValue: number, yValue: number, index: number, opacity?: number, metadata?: IPointMetadata): number;
    /**
     * @inheritDoc
     */
    overridePointMarkerArgb(xValue: number, yValue: number, index: number, opacity?: number, metadata?: IPointMetadata): TPointMarkerArgb;
    toJSON(): TPaletteProviderDefinition;
}
