import { TSciChart3D } from "../../types/TSciChart3D";
import { AxisBase3D } from "./Axis/AxisBase3D";
import { RenderPassInfo3D } from "./Primitives/RenderPassInfo3D";
import { SceneDescriptor } from "./Primitives/SceneDescriptor";
import { SciChart3DSurface } from "./SciChart3DSurface";
/**
 * A class used internally in SciChart to perform layout, arrangement, data-preparation and rendering on the Cartesian 3D {@link SciChart3DSurface}
 */
export declare class SciChart3DRenderer {
    /**
     * get the {@link SceneDescriptor} to define the look & styling of the scene in the current render pass
     * @param scs the {@link SciChart3DSurface} we are drawing
     */
    static getSceneDescriptor(scs: SciChart3DSurface): SceneDescriptor;
    /**
     * Prepares render data and returns a {@link RenderPassInfo3D} for the current render pass
     * @param scs the {@link SciChart3DSurface} we are drawing
     */
    static prepareRenderData(scs: SciChart3DSurface): RenderPassInfo3D;
    /**
     * Performs autorange on the {@link AxisBase3D} depending on flags such as {@link AxisBase3D.autoRange}
     * @param axis The {@link AxisBase3D} we are auto-ranging
     * @param scs the {@link SciChart3DSurface} we are drawing
     */
    static tryPerformAutoRangeOn(axis: AxisBase3D, scs: SciChart3DSurface): void;
    isInvalidated: boolean;
    private readonly scs;
    private wasmContext;
    private prevRect;
    private previousTime;
    constructor(scs: SciChart3DSurface, wasmContext: TSciChart3D);
    /**
     * The main render loop
     */
    render(): void;
    private updateWatermark;
    private isSurfaceValid;
    private prepareAxes;
    private updateWorldDimensions;
}
