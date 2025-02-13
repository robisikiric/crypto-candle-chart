import { Point } from "../../../Core/Point";
import { ESceneEntityType } from "../../../types/SceneEntityType";
import { SCRTPoint3DSceneEntity, TSciChart3D } from "../../../types/TSciChart3D";
import { HitTestInfo3D } from "../RenderableSeries/HitTestInfo3D";
import { ScatterRenderableSeries3D } from "../RenderableSeries/ScatterRenderableSeries3D";
import { RenderableSeriesSceneEntity } from "./RenderableSeriesSceneEntity";
import { RenderableSeriesSceneEntityState } from "./RenderableSeriesSceneEntityState";
/**
 * @summary {@link BaseSceneEntity3D} type for drawing 3D Scatter or Bubble series in SciChart's High Performance
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks See related type {@link ScatterRenderableSeries3D} which should be added to {@link SciChart3DSurface.renderableSeries}
 * along with data from an {@link XyzDataSeries3D} to create a 3D Scatter or Bubble chart
 */
export declare class ScatterPointsSceneEntity extends RenderableSeriesSceneEntity<ScatterRenderableSeries3D, RenderableSeriesSceneEntityState, SCRTPoint3DSceneEntity> {
    /**
     * @inheritDoc
     */
    readonly type: ESceneEntityType;
    private pointColors;
    private pointScales;
    /**
     * Creates an instance of {@link ScatterPointsSceneEntity}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries The parent {@link BaseRenderableSeries3D} which this entity maps to
     */
    constructor(webAssemblyContext: TSciChart3D, parentSeries: ScatterRenderableSeries3D);
    /**
     * @inheritDoc
     */
    delete(): void;
    /**
     * @inheritDoc
     */
    Render(): void;
    /**
     * @inheritDoc
     * @param propertyName
     */
    notifySeriesPropertyChanged(propertyName: string): void;
    /**
     * @inheritDoc
     */
    hitTest(screenPoint: Point): HitTestInfo3D;
    /**
     * @inheritDoc
     */
    protected updateSeries(): void;
    private rebuildPointMetadata;
}
