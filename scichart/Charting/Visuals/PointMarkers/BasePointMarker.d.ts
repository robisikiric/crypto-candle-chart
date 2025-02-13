import { TPointMarkerDefinition } from "../../../Builder/buildSeries";
import { DeletableEntity } from "../../../Core/DeletableEntity";
import { ICacheable } from "../../../Core/ICacheable";
import { EPointMarkerType } from "../../../types/PointMarkerType";
import { TSciChart } from "../../../types/TSciChart";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { BasePointMarkerStyle } from "../RenderableSeries/Animations/BasePointMarkerStyle";
import { CanvasTexture } from "../TextureManager/CanvasTexture";
import { TDpiChangedEventArgs } from "../TextureManager/DpiHelper";
import { IPointMarker } from "./IPointMarker";
import { ISpriteTextures } from "./ISpriteTextures";
/**
 * Options passed to {@link BasePointMarker} at construction, used to configure the point-marker
 */
export interface IPointMarkerOptions {
    /**
     * The width of the point-marker in pixels
     */
    width?: number;
    /**
     * The height of the point-marker in pixels
     */
    height?: number;
    /**
     * The fill of the point-marker as an HTML color code
     */
    fill?: string;
    /**
     * The stroke of the point-marker as an HTML color code
     */
    stroke?: string;
    /**
     * The stroke-thickness of the point-marker in pixels
     */
    strokeThickness?: number;
    /**
     * The opacity of the point-marker
     */
    opacity?: number;
    /** Set true to make the point marker render only for the last point on the data series */
    lastPointOnly?: boolean;
}
/**
 * The Base class for a PointMarker in SciChart - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}.
 * @description PointMarkers may be displayed on {@link IRenderableSeries | Renderable Series} to add scatter-points to charts.
 * For example: setting the {@link XyScatterRenderableSeries.pointMarker} property or {@link FastLineRenderableSeries.pointMarker} property
 * will render a point at each xy data-value
 * @remarks
 * See derived types of {@link BasePointMarker} for specific point-marker types.
 */
export declare abstract class BasePointMarker extends DeletableEntity implements IPointMarker, ICacheable {
    abstract type: EPointMarkerType;
    /**
     * Callback to invalidate the parent 2D {@link SciChartSurface}
     */
    invalidateParentCallback: () => void;
    /**
     * The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     */
    protected webAssemblyContext: TSciChart;
    private fillProperty;
    private heightProperty;
    private opacityProperty;
    private strokeProperty;
    private strokeThicknessProperty;
    private widthProperty;
    private lastPointOnlyProperty;
    private spriteTextures;
    private isUpdateSuspended;
    /**
     * Creates an instance of the {@link BasePointMarker}
     * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link IPointMarkerOptions} used to configure the point-marker at instantiation time
     */
    protected constructor(webAssemblyContext: TSciChart, options?: IPointMarkerOptions);
    /**
     * Gets or sets the point-marker fill as an HTML Color Code
     */
    get fill(): string;
    /**
     * Gets or sets the point-marker fill as an HTML Color Code
     */
    set fill(fill: string);
    /**
     * Gets or sets the point-marker stroke as an HTML Color Code
     */
    get stroke(): string;
    /**
     * Gets or sets the point-marker stroke as an HTML Color Code
     */
    set stroke(stroke: string);
    /**
     * Gets or sets the width of the point-marker in pixels
     */
    get width(): number;
    /**
     * Gets or sets the width of the point-marker in pixels
     */
    set width(width: number);
    /**
     * Gets or sets the height of the point-marker in pixels
     */
    get height(): number;
    /**
     * Gets or sets the height of the point-marker in pixels
     */
    set height(height: number);
    /**
     * Gets or sets the stroke-thickness of the point-marker in pixels
     */
    get strokeThickness(): number;
    /**
     * Gets or sets the stroke-thickness of the point-marker in pixels
     */
    set strokeThickness(strokeThickness: number);
    /**
     * Gets or sets the opacity of the point-marker
     */
    get opacity(): number;
    /**
     * Gets or sets the opacity of the point-marker
     */
    set opacity(opacity: number);
    /**
     * Set true to make the point marker render only for the last point on the data series
     */
    get lastPointOnly(): boolean;
    /**
     * Set true to make the point marker render only for the last point on the data series
     */
    set lastPointOnly(lastPointOnly: boolean);
    /**
     * Gets a {@link CanvasTexture} object which represents the point-marker sprite instance to draw
     * @remarks note {@link CanvasTexture} implements {@link IDeletable} and must be deleted manually to free memory
     */
    getSprite(): CanvasTexture;
    /**
     * Gets a {@link CanvasTexture} object which represents the stroke mask sprite instance to use for points,
     * which appearance is overridden by a Palette Provider
     * @remarks note {@link CanvasTexture} implements {@link IDeletable} and must be deleted manually to free memory
     */
    getStrokeMask(): CanvasTexture;
    /**
     * Gets a {@link CanvasTexture} object which represents the fill mask sprite instance to use for points,
     * which appearance is overridden by a Palette Provider
     * @remarks note {@link CanvasTexture} implements {@link IDeletable} and must be deleted manually to free memory
     */
    getFillMask(): CanvasTexture;
    /**
     * When overridden in a derived class, draw once the point-marker to the {@link CanvasRenderingContext2D}. This
     * will create a sprite (image or bitmap) which will be repeated at each xy data-value using our fast WebGL WebAssembly
     * graphics engine
     * @param context the {@link CanvasRenderingContext2D} to draw to
     * @param spriteWidth the sprite target width, adjusted for DPI Scaling factor
     * @param spriteHeight the sprite target height, adjusted for DPI Scaling factor
     * @param stroke the stroke color
     * @param dpiAdjustedStrokeThickness the thickness of the stroke, adjusted for DPI Scaling factor
     * @param fill the fill color
     */
    abstract drawSprite(context: CanvasRenderingContext2D, spriteWidth: number, spriteHeight: number, stroke: string, dpiAdjustedStrokeThickness: number, fill: string): void;
    invalidateCache(): void;
    resetCache(): void;
    /**
     * @inheritDoc
     */
    delete(): void;
    /**
     * Called internally - creates the {@link CanvasTexture} object and calls {@link drawSprite} for creating the cached texture to draw
     */
    createCanvasTexture(): ISpriteTextures;
    /** @inheritDoc */
    getPointMarkerStyle(): BasePointMarkerStyle;
    /** @inheritDoc */
    toJSON(): TPointMarkerDefinition;
    /**
     * @inheritDoc
     */
    onDpiChanged(args: TDpiChangedEventArgs): void;
    /** @inheritDoc */
    resolveAutoColors(index: number, maxSeries: number, theme: IThemeProvider): void;
    /** @inheritDoc */
    adjustAutoColor(propertyName: string, color: string): string;
    /** @inheritDoc */
    resumeUpdates(): void;
    /** @inheritDoc */
    suspendUpdates(): void;
    /**
     * Notifies listeners to {@link invalidateParentCallback} that a property has changed and redraw is required
     * @param propertyName the property name
     * @param newValue the new value
     * @param oldValue the old value
     */
    protected notifyPropertyChanged<PropertyType>(propertyName: string, newValue: PropertyType, oldValue: PropertyType): void;
    private recreateSpriteTextures;
    private applyOpacity;
}
