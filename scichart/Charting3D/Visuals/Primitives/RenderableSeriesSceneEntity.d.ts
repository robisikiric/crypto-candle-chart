import { Point } from "../../../Core/Point";
import { SCRTSceneEntity, TSciChart3D } from "../../../types/TSciChart3D";
import { BaseRenderableSeries3D } from "../RenderableSeries/BaseRenderableSeries3D";
import { HitTestInfo3D } from "../RenderableSeries/HitTestInfo3D";
import { BaseSceneEntity3D, IBaseSceneEntity } from "./BaseSceneEntity3D";
import { RenderableSeriesSceneEntityState } from "./RenderableSeriesSceneEntityState";
/**
 * Defines the interface to a {@link RenderableSeriesSceneEntity} - a special {@link BaseSceneEntity3D} type which
 * hosts the scene entities for a {@link BaseRenderableSeries3D | RenderableSeries}, or 3D Chart type in SciChart.
 */
export interface IRenderableSeriesSceneEntity extends IBaseSceneEntity {
    /**
     * Notifies a property has changed, causing the 3D Scene to redraw
     * @param propertyName the property name
     */
    notifySeriesPropertyChanged(propertyName: string): void;
    /**
     * Performs a HitTest operation on the entity, returning the {@link HitTestInfo3D} containing the result.
     * This contains information about the hit-test operation such as the index of the data-point under the mouse, and
     * may be used for tooltips, selection or inspection of the 3d scene through mouse-clicks
     * @param screenPoint The screen point (X,Y pixel coordinate in 2D space)
     */
    hitTest(screenPoint: Point): HitTestInfo3D;
}
/**
 * @summary Defines a special {@link BaseSceneEntity3D} type which hosts the entity for a {@link BaseRenderableSeries3D | RenderableSeries},
 * or chart type in SciChart's High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 */
export declare abstract class RenderableSeriesSceneEntity<TRenderableSeries extends BaseRenderableSeries3D, TEntityState extends RenderableSeriesSceneEntityState, TNativeEntity extends SCRTSceneEntity> extends BaseSceneEntity3D<TNativeEntity> implements IRenderableSeriesSceneEntity {
    protected parentSeries: TRenderableSeries;
    protected state: TEntityState;
    /**
     * Creates an instance of {@link RenderableSeriesSceneEntity}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries The parent {@link BaseRenderableSeries3D} which this entity maps to
     * @param state Current {@link RenderableSeriesSceneEntityState}
     */
    protected constructor(webAssemblyContext: TSciChart3D, parentSeries: TRenderableSeries, state: TEntityState);
    /**
     * Update method called from WebAssembly engine. Use this to update meshes, properties, geometry before draw.
     * When overriding, you must call super.Update() for the object to draw in the scene
     * @param deltaTime
     * @constructor
     */
    Update(deltaTime: number): void;
    /**
     * @inheritDoc
     */
    onEngineRestart(): void;
    /**
     * Called when a property changes on the parent series
     * @param propertyName
     */
    notifySeriesPropertyChanged(propertyName: string): void;
    /** @inheritDoc */
    abstract hitTest(screenPoint: Point): HitTestInfo3D;
    /**
     * When overriden in derived classes, this method is called when the series entity must be updated before drawing.
     * @protected
     */
    protected abstract updateSeries(): void;
    protected hitTestXyz(screenPoint: Point): HitTestInfo3D;
}
