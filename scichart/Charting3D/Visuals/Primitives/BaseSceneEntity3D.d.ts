import { INotifyOnDpiChanged, TDpiChangedEventArgs } from "../../../Charting/Visuals/TextureManager/DpiHelper";
import { DeletableEntity } from "../../../Core/DeletableEntity";
import { IDeletable } from "../../../Core/IDeletable";
import { ObservableArray } from "../../../Core/ObservableArray";
import { ESceneEntityType } from "../../../types/SceneEntityType";
import { SCRTSceneEntity, TSciChart3D } from "../../../types/TSciChart3D";
import { RootSceneEntity } from "../RootSceneEntity";
import { IEntityIdProvider } from "./EntityIdProvider";
import { RenderPassInfo3D } from "./RenderPassInfo3D";
/**
 * @summary Defines the interface to a {@link BaseSceneEntity3D}, which provides a base class for entities, or 3D objects in the 3D scene within
 * SciChart's High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 */
export interface IBaseSceneEntity extends IDeletable, INotifyOnDpiChanged {
    /**
     * @summary Gets the collection of {@link IBaseSceneEntity} - child entities or 3D Objects which belong to this entity.
     * @description A {@link SciChart3DSurface} has a {@link SciChart3DSurface.rootEntity} property. You can add {@link BaseSceneEntity3D}
     * to this property, and each entity can have a collection of child entities.
     *
     * Use grouping to control visibility of many entities at once, or to create more complex scenes.
     * @remarks
     * Adding a {@link BaseSceneEntity3D} to the children collection will cause the 3D Scene to be redrawn.
     */
    readonly children: ObservableArray<IBaseSceneEntity>;
    /**
     * A unique Id for the {@link IBaseSceneEntity}
     */
    readonly id: string;
    /**
     * When true, the entity and it's children are visible in the 3D Scene
     */
    isVisible: boolean;
    /**
     * Gets the native {@link SCRTSceneEntity} - a WebAssembly 3D Scene Entity type which is
     * passed to our WebGL WebAssembly 3D Engine
     */
    nativeEntity: SCRTSceneEntity;
    /**
     * Gets the parent {@link IBaseSceneEntity}
     */
    parent: IBaseSceneEntity;
    /**
     * Gets the type of Scene Entity. See {@link ESceneEntityType} for a list of values
     */
    readonly type: ESceneEntityType;
    /**
     * Gets or sets the {@link IEntityIdProvider} which generates unique mesh Ids for {@link IBaseSceneEntity
     */
    entityIdProvider: IEntityIdProvider;
    /**
     * Gets or sets a unique Id for the {@link IBaseSceneEntity}. The SciChart3D engine requires Ids fit into UInt32 (4 billion)
     */
    entityId: number;
    /**
     * Gets the first child {@link IBaseSceneEntity} of type specified by {@link ESceneEntityType}
     * @param type
     */
    getEntity(type: ESceneEntityType): IBaseSceneEntity;
    /**
     * Gets the root entity in the 3D Scene
     */
    getRoot(): RootSceneEntity;
    /**
     * Called when the {@link IBaseSceneEntity} is attached to the parent scene
     */
    onAttached(): void;
    /**
     * Called when the {@link IBaseSceneEntity} is detached from the parent scene
     */
    onDetached(): void;
    /**
     * Called when the WebGL 3D Engine restarts. Use this to perform clean-up operations
     */
    onEngineRestart(): void;
    /**
     * Sets the {@link RenderPassInfo3D} - render pass info, properties and data for the current rendering pass
     * @param rpd
     */
    setRenderPassData(rpd: RenderPassInfo3D): void;
    /**
     * Visitor function to perform on this entity and all it's children
     * @param operation The function to perform
     */
    visitEntities(operation: (e: IBaseSceneEntity) => void): void;
}
/**
 * The {@link BaseSceneEntity3D} provides a base class for entities, or 3D objects in the 3D scene within
 * SciChart's High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks Each {@link BaseSceneEntity3D} wraps a native WebAssembly {@link SCRTSceneEntity} which is returned by
 * the {@link nativeEntity} property. This is passed to SciChart's 3D engine and inserted into the scene when added
 * to the {@link SciChart3DSurface.rootEntity} collection.
 */
export declare abstract class BaseSceneEntity3D<TNativeEntity extends SCRTSceneEntity> extends DeletableEntity implements IBaseSceneEntity {
    /** @inheritDoc */
    readonly id: string;
    /** @inheritDoc */
    abstract readonly type: ESceneEntityType;
    /** @inheritDoc */
    readonly rootSceneEntity: RootSceneEntity;
    /** @inheritDoc */
    readonly children: ObservableArray<IBaseSceneEntity>;
    /**
     * When true, the entity and all its children are visible
     */
    isVisible: boolean;
    /**
     * Gets the parent {@link IBaseSceneEntity | Entity}
     */
    parent: IBaseSceneEntity;
    /**
     * The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     */
    protected webAssemblyContext: TSciChart3D;
    /**
     * The {@link RenderPassInfo3D} containing data about the current rendering pass
     * @protected
     */
    protected currentRenderPassData: RenderPassInfo3D;
    private nativeEntityProperty;
    private entityIdProviderProperty;
    private entityIdProperty;
    /**
     * Creates an instance of the {@link BaseSceneEntity3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @protected
     */
    protected constructor(webAssemblyContext: TSciChart3D);
    /** @inheritDoc */
    get entityIdProvider(): IEntityIdProvider;
    /** @inheritDoc */
    set entityIdProvider(value: IEntityIdProvider);
    /** @inheritDoc */
    get entityId(): number;
    /** @inheritDoc */
    set entityId(value: number);
    /** @inheritDoc */
    getRoot(): RootSceneEntity;
    /** @inheritDoc */
    delete(): void;
    /**
     * Update method called from WebAssembly engine. Use this to update meshes, properties, geometry before draw.
     * When overriding, you must call super.Update() for the object to draw in the scene
     * @param deltaTime
     * @constructor
     */
    Update(deltaTime: number): void;
    /**
     * Render method called from WebAssembly engine. Use this to do immediate-mode 3D drawing, or to draw created meshes
     * When overriding, you must call super.Update() for the object to draw in the scene
     * @constructor
     */
    Render(): void;
    /** @inheritDoc */
    onEngineRestart(): void;
    /** @inheritDoc */
    onDpiChanged(args: TDpiChangedEventArgs): void;
    /** @inheritDoc */
    setRenderPassData(rpd: RenderPassInfo3D): void;
    /** @inheritDoc */
    getEntity(type: ESceneEntityType): IBaseSceneEntity;
    /**
     * Call this to inform SciChart that data or properties have changed and the 3D Scene must be redrawn
     */
    invalidateScene(): void;
    /** @inheritDoc */
    onAttached(): void;
    /** @inheritDoc */
    onDetached(): void;
    /** @inheritDoc */
    visitEntities(operation: (e: IBaseSceneEntity) => void): void;
    /** @inheritDoc */
    get nativeEntity(): TNativeEntity;
    /**
     * Called internally - Attach a child to the current entity
     * @param childEntity
     * @protected
     */
    protected attachChild(childEntity: IBaseSceneEntity): void;
    /**
     * Called internally - detach a child from the current entity
     * @param childEntity
     * @protected
     */
    protected detachChild(childEntity: IBaseSceneEntity): void;
    /**
     * Called internally - sets the native entity
     * @param entity
     * @protected
     */
    protected setNativeEntity(entity: TNativeEntity): void;
    /**
     * Called internally - gets the world entity
     * @protected
     */
    protected get world(): import("../../../types/TSciChart3D").SCRTSceneWorld;
}
