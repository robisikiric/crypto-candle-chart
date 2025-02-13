import { TPointMarkerDefinition } from "../../../Builder/buildSeries";
import { IDeletable } from "../../../Core/IDeletable";
import { EPointMarkerType } from "../../../types/PointMarkerType";
import { IThemeProvider } from "../../Themes/IThemeProvider";
import { BasePointMarkerStyle } from "../RenderableSeries/Animations/BasePointMarkerStyle";
import { CanvasTexture } from "../TextureManager/CanvasTexture";
import { INotifyOnDpiChanged } from "../TextureManager/DpiHelper";
/**
 * Defines the interface to a PointMarker in SciChart  - High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript Charts}.
 * @description PointMarkers may be displayed on {@link IRenderableSeries | Renderable Series} to add scatter-points to charts.
 * For example: setting the {@link XyScatterRenderableSeries.pointMarker} property or {@link FastLineRenderableSeries.pointMarker} property
 * will render a point at each xy data-value
 * @remarks
 * See derived types of {@link IPointMarker} for specific point-marker types.
 */
export interface IPointMarker extends IDeletable, INotifyOnDpiChanged {
    /**
     * Type of the point marker
     */
    type: EPointMarkerType;
    /**
     * Callback to invalidate the parent 2D {@link SciChartSurface}
     */
    invalidateParentCallback: () => void;
    /**
     * Gets or sets the point-marker stroke as an HTML Color Code
     */
    stroke: string;
    /**
     * Gets or sets the opacity of the point-marker
     */
    opacity: number;
    /**
     * Gets or sets the point-marker fill as an HTML Color Code
     */
    fill: string;
    /**
     * Gets or sets the width of the point-marker in pixels
     */
    width: number;
    /**
     * Gets or sets the height of the point-marker in pixels
     */
    height: number;
    /**
     * Gets or sets the stroke-thickness of the point-marker in pixels
     */
    strokeThickness: number;
    /** Set true to make the point marker render only for the last point on the data series */
    lastPointOnly: boolean;
    /**
     * When overridden in a derived class, draw once the point-marker to the {@link CanvasRenderingContext2D}. This
     * will create a sprite (image or bitmap) which will be repeated at each xy data-value using our fast WebGL WebAssembly
     * graphics engine
     * @param canvas the {@link CanvasRenderingContext2D} to draw to
     * @param spriteWidth the sprite target width
     * @param spriteHeight the sprite target height
     * @param stroke the stroke color
     * @param strokeThickness the thickness of the stroke
     * @param fill the fill color
     */
    drawSprite(canvas: CanvasRenderingContext2D, spriteWidth: number, spriteHeight: number, stroke: string, strokeThickness: number, fill: string): void;
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
     * Creates the {@link BasePointMarkerStyle} object from the {@BasePointMarker}
     */
    getPointMarkerStyle(): BasePointMarkerStyle;
    /**
     * Suspends recreation of the PointMarker, used to increase performance when several properties
     * of the PointMarker needs to be updated
     */
    suspendUpdates(): void;
    /**
     * Resumes recreation of the PointMarker
     */
    resumeUpdates(): void;
    /**
     * Resolve colors marked AUTO_COLOR using the theme's strokePalette and fillPalette
     * To do custom adjustments to the resolved colors, override the adjustAutoColor method
     */
    resolveAutoColors(index: number, maxSeries: number, theme: IThemeProvider): void;
    /** Replace this to do custom adjustments to the auto color for a particular property */
    adjustAutoColor(propertyName: string, color: string): string;
    /** Convert the object to a definition that can be serialized to JSON, or used directly with the builder api */
    toJSON(): TPointMarkerDefinition;
}
