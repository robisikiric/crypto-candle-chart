import { ESceneEntityType } from "../../../types/SceneEntityType";
import { SCRTSceneEntity } from "../../../types/TSciChart3D";
import { Vector3 } from "../../Vector3";
import { TSciChart3D } from "../SciChart3DSurface";
import { BaseSceneEntity3D } from "./BaseSceneEntity3D";
/**
 * Draws a crosshair from the {@link location} to the walls of the bounding box (defined by {@link worldDimensions}).
 * Properties {@link stroke}, {@link strokeThickness} and {@link antiAliased} can be used to customize the appearance of the line.
 * The {@link CrosshairLinesSceneEntity} inherits {@link BaseSceneEntity3D} and can be added to the {@link SciChart3DSurface}
 * via the {@link SciChart3DSurface.rootEntity} property.
 */
export declare class CrosshairLinesSceneEntity extends BaseSceneEntity3D<SCRTSceneEntity> {
    /** @inheritDoc */
    readonly type = ESceneEntityType.Custom;
    /**
     * The location of the crosshair in 3D space
     */
    location: Vector3;
    /**
     * The world dimensions of the bounding box, which should match {@link SciChart3DSurface.worldDimensions}
     */
    worldDimensions: Vector3;
    /**
     * The camera position in 3D space, which is used to compute vectors
     */
    cameraPosition: Vector3;
    /**
     * The strokethickness of crosshair lines
     */
    strokeThickness: number;
    /**
     * The stroke of crosshair lines
     */
    stroke: string;
    /**
     * Whether crosshair lines are antialiased or not
     */
    antiAliased: boolean;
    private linesMesh;
    constructor(webAssemblyContext: TSciChart3D);
    /** @inheritDoc */
    delete(): void;
    /** @inheritDoc */
    Render(): void;
    private inInWorldDimensions;
    private getWallVector;
}
