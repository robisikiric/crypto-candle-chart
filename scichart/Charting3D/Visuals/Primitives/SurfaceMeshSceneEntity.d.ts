import { Point } from "../../../Core/Point";
import { ESceneEntityType } from "../../../types/SceneEntityType";
import { SCRTGridMeshEntity, TSciChart3D } from "../../../types/TSciChart3D";
import { IRenderableSeries3D } from "../RenderableSeries/BaseRenderableSeries3D";
import { HitTestInfo3D } from "../RenderableSeries/HitTestInfo3D";
import { SurfaceMeshRenderableSeries3D } from "../RenderableSeries/SurfaceMesh/SurfaceMeshRenderableSeries3D";
import { RenderableSeriesSceneEntity } from "./RenderableSeriesSceneEntity";
import { RenderableSeriesSceneEntityState } from "./RenderableSeriesSceneEntityState";
import { RenderPassInfo3D } from "./RenderPassInfo3D";
/**
 * State object for {@link SurfaceMeshSceneEntity}
 */
export declare class SurfaceMeshSceneEntityState extends RenderableSeriesSceneEntityState {
    private isColorMapTextureInvalidProperty;
    /**
     * Gets or sets whether the color map texture is valid
     */
    get isColorMapTextureInvalid(): boolean;
    /**
     * Gets or sets whether the color map texture is valid
     */
    setColorMapTextureInvalid(): void;
    /**
     * @inheritDoc
     */
    validate(rs: IRenderableSeries3D, rpi: RenderPassInfo3D): boolean;
    /**
     * @inheritDoc
     */
    reset(rs?: IRenderableSeries3D, rpi?: RenderPassInfo3D): void;
}
/**
 * @summary {@link BaseSceneEntity3D} type for drawing 3D Surface Plot or Surface Mesh with optional Contours in
 * SciChart's High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks See related type {@link SurfaceMeshRenderableSeries3D} which should be added to {@link SciChart3DSurface.renderableSeries}
 * along with data from an {@link UniformGridDataSeries3D} to create a 3D Surface Mesh or Surface Plot
 */
export declare class SurfaceMeshSceneEntity extends RenderableSeriesSceneEntity<SurfaceMeshRenderableSeries3D, SurfaceMeshSceneEntityState, SCRTGridMeshEntity> {
    /**
     * @inheritDoc
     */
    readonly type: ESceneEntityType;
    private colorMapTexture;
    /**
     * Creates an instance of {@link SurfaceMeshSceneEntity}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries The parent {@link BaseRenderableSeries3D} which this entity maps to
     */
    constructor(webAssemblyContext: TSciChart3D, parentSeries: SurfaceMeshRenderableSeries3D);
    /**
     * @inheritDoc
     */
    notifySeriesPropertyChanged(propertyName: string): void;
    /**
     * @inheritDoc
     */
    delete(): void;
    hitTest(screenPoint: Point): HitTestInfo3D;
    /**
     * @inheritDoc
     */
    Render(): void;
    /**
     * @inheritDoc
     */
    protected updateSeries(): void;
    private hasFlag;
    private toSCRTAxisRange;
    private rangeToSCRTAxisRange;
}
