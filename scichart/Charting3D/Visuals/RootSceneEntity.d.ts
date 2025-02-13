import { ESceneEntityType } from "../../types/SceneEntityType";
import { SCRTSceneEntity, TSciChart3D } from "../../types/TSciChart3D";
import { BaseSceneEntity3D, IBaseSceneEntity } from "./Primitives/BaseSceneEntity3D";
import { SciChart3DSurface } from "./SciChart3DSurface";
/**
 * @summary Defines a special {@link BaseSceneEntity3D} type which is the root of the entire scene in
 * in SciChart's High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks
 * Add and remove entities to the scene using the property {@link SciChart3DSurface.rootEntity} and calling
 * {@link RootSceneEntity.children | SceneEntity.children.add}.
 *
 * When a {@link BaseRenderableSeries3D} is added to {@link SciChart3DSurface.renderableSeries}, it's entity is automatically added to the scene.
 */
export declare class RootSceneEntity extends BaseSceneEntity3D<SCRTSceneEntity> {
    /**
     * @inheritDoc
     */
    readonly type = ESceneEntityType.RootSceneEntity;
    /**
     * Gets or sets the parent {@link SciChart3DSurface}
     */
    parentSurface: SciChart3DSurface;
    /**
     * Creates an instance of the {@link RootSceneEntity}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     */
    constructor(webAssemblyContext: TSciChart3D, parentSurface: SciChart3DSurface);
    /**
     * @inheritDoc
     */
    protected attachChild(childEntity: IBaseSceneEntity): void;
    /**
     * @inheritDoc
     */
    protected detachChild(childEntity: IBaseSceneEntity): void;
}
