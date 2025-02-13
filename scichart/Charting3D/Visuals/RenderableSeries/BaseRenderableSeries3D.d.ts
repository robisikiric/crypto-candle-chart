import { IThemeable } from "../../../Charting/Themes/IThemeable";
import { IThemeProvider } from "../../../Charting/Themes/IThemeProvider";
import { INotifyOnDpiChanged, TDpiChangedEventArgs } from "../../../Charting/Visuals/TextureManager/DpiHelper";
import { DeletableEntity } from "../../../Core/DeletableEntity";
import { IDeletable } from "../../../Core/IDeletable";
import { Point } from "../../../Core/Point";
import { TSciChart3D } from "../../../types/TSciChart3D";
import { BaseDataSeries3D } from "../../Model/DataSeries/BaseDataSeries3D";
import { IPaletteProvider3D } from "../../Model/DataSeries/IPaletteProvider3D";
import { BasePointMarker3D } from "../PointMarkers/BasePointMarker3D";
import { IBaseSceneEntity } from "../Primitives/BaseSceneEntity3D";
import { IRenderableSeriesSceneEntity } from "../Primitives/RenderableSeriesSceneEntity";
import { SciChart3DSurface } from "../SciChart3DSurface";
import { ESeriesType3D } from "./ESeriesType";
import { HitTestInfo3D } from "./HitTestInfo3D";
import { SeriesInfo3D } from "./SeriesInfo3D";
/**
 * @summary Defines the interface to a 3D Renderable Series (or 3D Chart Type) in SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks
 * A {@link BaseRenderableSeries3D | RenderableSeries} defines how data should be rendered. e.g. as a 3D Scatter Chart, 3D Point Line Chart etc...
 * This is independent from the {@link BaseDataSeries3D | DataSeries3D} which stores the data to render
 *
 * See derived types of {@link BaseDataSeries3D} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries3D} to find out what 3D JavaScript Chart types are available.
 */
export interface IRenderableSeries3D extends IDeletable, IThemeable, INotifyOnDpiChanged {
    /**
     * A unique Id for the {@link IRenderableSeries3D}
     */
    readonly id: string;
    /**
     * Gets the Series type. See {@link ESeriesType3D} for a list of values
     */
    readonly type: ESeriesType3D;
    /**
     * Used internally - Gets the {@link IBaseSceneEntity | 3D Scene Entity} which renders the geometry in the 3D Scene
     */
    readonly sceneEntity: IBaseSceneEntity;
    /**
     * Used internally - Gets or sets the parent {@link SciChart3DSurface}
     */
    parentSurface: SciChart3DSurface;
    /**
     * The {@link BaseDataSeries3D | DataSeries} which provides a datasource for this {@link BaseRenderableSeries3D} to draw
     */
    dataSeries: BaseDataSeries3D;
    /**
     * Gets or sets whether the {@link BaseDataSeries3D} is visible or not
     */
    isVisible: boolean;
    /**
     * Gets or sets an optional Opacity from 0.0 (fully transparent) - 1.0 (fully opaque)
     */
    opacity: number;
    /**
     * Gets or sets an optional Shininess factor, passed to 3D rendering shaders to make shiny objects
     */
    shininess: number;
    /**
     * Gets or sets an optional {@link IPaletteProvider3D} - a PaletteProvider class which allows for per-point
     * data-point coloring on some 3D {@link BaseRenderableSeries3D} types.
     */
    paletteProvider: IPaletteProvider3D;
    /**
     * Gets or sets the stroke color as an HTML Color code
     */
    stroke: string;
    /**
     * A callback function which notifies the parent {@link SciChart3DSurface} that data or properties have changed and
     * the 3D Scene needs redrawing
     */
    invalidateParentCallback: () => void;
    /**
     * A {@link BasePointMarker3D |3D Point Marker} which is used to draw an optional 3D point-marker at each Xyz data-point.
     * Applicable to some series types only
     */
    pointMarker: BasePointMarker3D;
    /**
     * Called when the {@link IRenderableSeries3D} is attached to a {@link SciChart3DSurface}
     * @param scs the parent {@link SciChart3DSurface}
     */
    onAttach(scs: SciChart3DSurface): void;
    /**
     * Called when the {@link IRenderableSeries3D} is detached from a {@link SciChart3DSurface}
     */
    onDetach(): void;
    /**
     * Performs a HitTest operation on the series, returning the {@link SeriesInfo3D} containing the enriched Hit-Test result.
     * This contains information about the hit-test operation such as the values of the data under the mouse and
     * location of the data under the mouse in 3D world coordinates. This may be used for tooltips,
     * selection or inspection of the 3d scene through mouse-clicks
     * @param screenPoint The screen point (X,Y pixel coordinate in 2D space)
     */
    hitTest(screenPoint: Point): SeriesInfo3D;
}
/**
 * Options to pass to the {@link BaseRenderableSeries3D} constructor
 */
export interface IBaseRenderableSeries3DOptions {
    /**
     * A unique Id for the {@link IRenderableSeries3D}
     */
    readonly id?: string;
    /**
     * The {@link BaseDataSeries3D | DataSeries} which provides a datasource for this {@link IRenderableSeries3D} to draw
     */
    dataSeries?: BaseDataSeries3D;
    /**
     * A {@link BasePointMarker3D |3D Point Marker} which is used to draw an optional 3D point-marker at each Xyz data-point.
     * Applicable to some series types only
     */
    pointMarker?: BasePointMarker3D;
    /**
     * Gets or sets whether the {@link IRenderableSeries3D} is visible or not
     */
    isVisible?: boolean;
    /**
     * Gets or sets the stroke color as an HTML Color code
     */
    stroke?: string;
    /**
     * Gets or sets an optional Shininess factor, passed to 3D rendering shaders to make shiny objects
     */
    shininess?: number;
    /**
     * Gets or sets the opacity of the {@link IRenderableSeries3D}
     * @remarks Value range 0.0 to 1.0. Default = 1.
     */
    opacity?: number;
}
/**
 * @summary Defines the base class to a 3D Render Series (or 3D Chart Type) in SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks
 * A {@link BaseRenderableSeries3D} defines how data should be rendered. e.g. as a 3D Scatter Chart, 3D Point Line Chart etc...
 * This is independent from the {@link BaseDataSeries3D | DataSeries3D} which stores the data to render
 *
 * See derived types of {@link BaseDataSeries3D} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries3D} to find out what 3D JavaScript Chart types are available.
 */
export declare abstract class BaseRenderableSeries3D extends DeletableEntity implements IRenderableSeries3D {
    /** @inheritDoc */
    readonly id: string;
    /** @inheritDoc */
    abstract type: ESeriesType3D;
    /** @inheritDoc */
    invalidateParentCallback: () => void;
    /**
     * The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @protected
     */
    protected readonly webAssemblyContext: TSciChart3D;
    private dataSeriesProperty;
    private isVisibleProperty;
    private parentSurfaceProperty;
    private sceneEntityProperty;
    protected pointMarkerProperty: BasePointMarker3D;
    private paletteProviderProperty;
    private strokeProperty;
    private shininessProperty;
    private opacityProperty;
    /**
     * Creates an instance of the {@link BaseRenderableSeries3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IBaseRenderableSeries3DOptions} to configure the series
     * @protected
     */
    protected constructor(webAssemblyContext: TSciChart3D, options?: IBaseRenderableSeries3DOptions);
    /** @inheritDoc */
    applyTheme(themeProvider: IThemeProvider): void;
    /** @inheritDoc */
    get opacity(): number;
    /** @inheritDoc */
    set opacity(opacity: number);
    /** @inheritDoc */
    get sceneEntity(): IBaseSceneEntity;
    /** @inheritDoc */
    get shininess(): number;
    /** @inheritDoc */
    set shininess(shininess: number);
    /** @inheritDoc */
    get paletteProvider(): IPaletteProvider3D;
    /** @inheritDoc */
    set paletteProvider(paletteProvider: IPaletteProvider3D);
    /** @inheritDoc */
    get stroke(): string;
    /** @inheritDoc */
    set stroke(stroke: string);
    /** @inheritDoc */
    get dataSeries(): BaseDataSeries3D;
    /** @inheritDoc */
    set dataSeries(dataSeries: BaseDataSeries3D);
    /** @inheritDoc */
    get pointMarker(): BasePointMarker3D;
    /** @inheritDoc */
    set pointMarker(pointMarker: BasePointMarker3D);
    /** @inheritDoc */
    get parentSurface(): SciChart3DSurface;
    /** @inheritDoc */
    set parentSurface(parentSurface: SciChart3DSurface);
    /** @inheritDoc */
    get isVisible(): boolean;
    /** @inheritDoc */
    set isVisible(isVisible: boolean);
    /** @inheritDoc */
    onAttach(scs: SciChart3DSurface): void;
    /** @inheritDoc */
    onDetach(): void;
    /** @inheritDoc */
    delete(): void;
    /** @inheritDoc */
    onDpiChanged(args: TDpiChangedEventArgs): void;
    /** @inheritDoc */
    hitTest(screenPoint: Point): SeriesInfo3D;
    /**
     * Is being called when the data for the underlying DataSeries changes
     * @protected
     */
    protected dataSeriesDataChanged(): void;
    protected enrichHitTest(hitTestInfo: HitTestInfo3D): SeriesInfo3D;
    /**
     * Used internally - sets the {@link IRenderableSeriesSceneEntity | 3D Scene Entity}
     * @param sceneEntity
     * @protected
     */
    protected setSceneEntity(sceneEntity: IRenderableSeriesSceneEntity): void;
    /**
     * Notifies listeners to {@link invalidateParentCallback} that a property has changed
     * @param propertyName
     * @protected
     */
    protected notifyPropertyChanged(propertyName: string): void;
    protected attachPointMarker(pointMarker: BasePointMarker3D): void;
    protected detachPointMarker(pointMarker: BasePointMarker3D): void;
    private pointMarkerPropertyChanged;
}
