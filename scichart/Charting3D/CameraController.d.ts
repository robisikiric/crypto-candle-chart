import { EventHandler } from "../Core/EventHandler";
import { PropertyChangedEventArgs } from "../Core/PropertyChangedEventArgs";
import { TSciChart3D, TSRCamera } from "../types/TSciChart3D";
import { Vector3 } from "./Vector3";
/**
 * Defines the Project Mode the {@link CameraController} set on SciChart's
 * {@link https://www.scichart.com/javascript-chart-features | Javascript 3D Chart}
 */
export declare enum ECameraProjectionMode {
    /**
     * The {@link CameraController.projectionMode} is Perspective
     */
    Perspective = "Perspective",
    /**
     * The {@link CameraController.projectionMode} is Orthogonal
     */
    Orthogonal = "Orthogonal"
}
/**
 * Optional parameters passed to a {@link CameraController} at construct time
 */
export interface ICameraOptions {
    /**
     * Gets or sets the unique camera Id
     */
    id?: string;
    /**
     * Gets or sets the camera position as a {@link Vector3} in World Space
     */
    position?: Vector3;
    /**
     * Gets or sets the camera target (Look-at) as a {@link Vector3} in World Space
     */
    target?: Vector3;
    /**
     * When true, will output position, target to console
     */
    debugPositions?: boolean;
}
/**
 * Defines the interface to a {@link CameraController} - a Class which manipulates and manages
 * the camera in 3D space within SciChart's High Performance
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 */
export interface ICameraController {
    /**
     * An event handler which raises events when a property changes and the scene must be redrawn
     */
    propertyChanged: EventHandler<PropertyChangedEventArgs>;
    /**
     * Gets or sets the unique camera Id
     */
    id: string;
    /**
     * Gets or sets the camera position as a {@link Vector3} in World Space
     */
    position: Vector3;
    /**
     * Gets or sets the camera target (Look-at) as a {@link Vector3} in World Space
     */
    target: Vector3;
    /**
     * Gets the Up {@link Vector3}; the vector pointing straight up from the camera's position
     */
    readonly up: Vector3;
    /**
     * Gets the Forward {@link Vector3}; the vector which results from {@link target} - {@link position}
     */
    readonly forward: Vector3;
    /**
     * Gets the Side {@link Vector3}; the vector which is orthogonal to {@link up} and {@link forward}
     */
    readonly side: Vector3;
    /**
     * Gets the global up {@link Vector3}; a vector which defaults to Xyz = [0,1,0]
     */
    readonly upGlobal: Vector3;
    /**
     * Gets the field of view in degrees. Default value is 60
     */
    fieldOfView: number;
    /**
     * Gets or sets the near clipping in world coordinates, for example if set to 1.0, any object closer than 1 world coordinate will not be rendered
     */
    nearClip: number;
    /**
     * Gets or sets the far clipping in world coordinates, for example if set to 1,000 any object further than 1,000 world coordinates
     * will not be rendered
     */
    farClip: number;
    /**
     * Gets or sets the Orbital Yaw - a horizontal rotation angle around the target - in degrees
     * @remarks
     * This property will be updated when you set {@link CameraController.position} or {@link CameraController.target}.
     * Similarly, setting {@link CameraController.orbitalYaw} will result in position & target being updated.
     */
    orbitalYaw: number;
    /**
     * Gets or sets the Orbital Pitch - a vertical rotation angle around the target - in degrees
     * @remarks
     * This property will be updated when you set {@link CameraController.position} or {@link CameraController.target}.
     * Similarly, setting {@link CameraController.orbitalPitch} will result in position & target being updated.
     */
    orbitalPitch: number;
    /**
     * Gets or sets the radius - the distance from the {@link CameraController.target}
     * @remarks
     * This property will be updated when you set {@link CameraController.position} or {@link CameraController.target}.
     * Similarly, setting {@link CameraController.radius} will result in position & target being updated.
     */
    radius: number;
    /**
     * Gets or sets the camera aspect ratio. Defaults to 1.333333333
     */
    aspectRatio: number;
    /**
     * Gets whether the camera is attached to a {@link SciChart3DSurface} or not
     */
    isAttached: boolean;
    /**
     * Gets or sets the {@link ECameraProjectionMode}. Default is {@link ECameraProjectionMode.Perspective}
     * and using this property you can also set the camera mode to {@link ECameraProjectionMode.Orthogonal | Orthogonal}
     */
    projectionMode: ECameraProjectionMode;
    /**
     * Gets or sets the orthogonal viewable width in world coordinates
     * @remarks Applicable when {@link CameraController.projectionMode} is Orthogonal
     */
    orthoWidth: number;
    /**
     * Gets or sets the orthogonal viewable height in world coordinates
     * @remarks Applicable when {@link CameraController.projectionMode} is Orthogonal
     */
    orthoHeight: number;
    /**
     * Does the hard maths for you to convert the current Perspective camera to an Orthogonal camera with the same position and target
     */
    toOrthogonal(): void;
    /**
     * Does the hard maths for you to convert the current Orthogonal camera to an Perspective camera with the same position and target
     */
    toPerspective(): void;
    /**
     * Resets the camera properties to defaults
     */
    resetToDefaults(): void;
    /**
     * Used internally - Updates a {@link TSRCamera} instance which will be passed to SciChart's fast WebGL WebAssembly engine
     * @param tsrCamera
     */
    updateEngineCamera(tsrCamera: TSRCamera): void;
    /**
     * Used internally - call to dump camera properties to the console log
     */
    debugOutput(): void;
}
export declare class CameraController implements ICameraController {
    /**
     * An event handler which notifies subscribers that a property has changed and scene must be updated
     */
    readonly propertyChanged: EventHandler<PropertyChangedEventArgs>;
    private aspectRatioProperty;
    private idProperty;
    private farClipProperty;
    private fieldOfViewProperty;
    private isAttachedProperty;
    private nearClipProperty;
    private orbitalPitchProperty;
    private orbitalYawProperty;
    private orthoHeightProperty;
    private orthoWidthProperty;
    private positionProperty;
    private projectionModeProperty;
    private targetProperty;
    private readonly webAssemblyContext;
    private debugPositionsProperty;
    /**
     * Creates an instance of the {@link CameraController}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context}
     * containing native methods and access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options optional parameters of type {@link ICameraOptions} passed to the constructor
     */
    constructor(webAssemblyContext: TSciChart3D, options?: ICameraOptions);
    /**
     * @inheritDoc
     */
    get id(): string;
    /**
     * @inheritDoc
     */
    set id(value: string);
    /**
     * @inheritDoc
     */
    get orthoHeight(): number;
    /**
     * @inheritDoc
     */
    set orthoHeight(value: number);
    /**
     * @inheritDoc
     */
    get orthoWidth(): number;
    /**
     * @inheritDoc
     */
    set orthoWidth(value: number);
    /**
     * @inheritDoc
     */
    get projectionMode(): ECameraProjectionMode;
    /**
     * @inheritDoc
     */
    set projectionMode(value: ECameraProjectionMode);
    /**
     * @inheritDoc
     */
    get aspectRatio(): number;
    /**
     * @inheritDoc
     */
    set aspectRatio(value: number);
    /**
     * @inheritDoc
     */
    get isAttached(): boolean;
    /**
     * @inheritDoc
     */
    set isAttached(value: boolean);
    /**
     * @inheritDoc
     */
    get radius(): number;
    /**
     * @inheritDoc
     */
    set radius(value: number);
    /**
     * @inheritDoc
     */
    get orbitalPitch(): number;
    /**
     * @inheritDoc
     */
    set orbitalPitch(value: number);
    /**
     * @inheritDoc
     */
    get orbitalYaw(): number;
    /**
     * @inheritDoc
     */
    set orbitalYaw(value: number);
    /**
     * @inheritDoc
     */
    get farClip(): number;
    /**
     * @inheritDoc
     */
    set farClip(value: number);
    /**
     * @inheritDoc
     */
    get nearClip(): number;
    /**
     * @inheritDoc
     */
    set nearClip(value: number);
    /**
     * @inheritDoc
     */
    get fieldOfView(): number;
    /**
     * @inheritDoc
     */
    set fieldOfView(value: number);
    /**
     * @inheritDoc
     */
    get upGlobal(): Vector3;
    /**
     * @inheritDoc
     */
    get side(): Vector3;
    /**
     * @inheritDoc
     */
    get forward(): Vector3;
    /**
     * @inheritDoc
     */
    get up(): Vector3;
    /**
     * @inheritDoc
     */
    get target(): Vector3;
    /**
     * @inheritDoc
     */
    set target(value: Vector3);
    /**
     * @inheritDoc
     */
    get position(): Vector3;
    /**
     * @inheritDoc
     */
    set position(value: Vector3);
    /**
     * @inheritDoc
     */
    toOrthogonal(): void;
    /**
     * @inheritDoc
     */
    toPerspective(): void;
    /**
     * @inheritDoc
     */
    resetToDefaults(): void;
    /**
     * @inheritDoc
     */
    updateEngineCamera(tsrCamera: TSRCamera): void;
    /**
     * Notifies subscribers of {@link propertyChanged} that a property has changed and the scene needs updating
     * @param propertyName
     */
    notifyPropertyChanged(propertyName: string): void;
    /**
     * @inheritDoc
     */
    debugOutput(): string[];
}
