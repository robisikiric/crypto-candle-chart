import { NumberRange } from "../../Core/NumberRange";
import { AxisBase3D } from "./Axis/AxisBase3D";
import { SciChart3DSurface } from "./SciChart3DSurface";
/**
 * The Viewport Manager performs certain functions such as axis ranging and viewport manipulation
 * on a {@link SciChart3DSurface}
 */
export declare abstract class ViewportManager3DBase {
    /**
     * When true, currently attached to a {@link SciChart3DSurface}
     */
    isAttached: boolean;
    /**
     * The parent {@link SciChart3DSurface} when attached
     */
    parentSurface: SciChart3DSurface;
    width: number;
    height: number;
    constructor(width: number, height: number);
    setSize(width: number, height: number): void;
    /**
     * Called when attached to a {@link SciChart3DSurface}
     * @param scs The {@link SciChart3DSurface}
     */
    attachSciChartSurface(scs: SciChart3DSurface): void;
    /**
     * Called when detached from a {@link SciChart3DSurface}
     */
    detachSciChartSurface(): void;
    /**
     * Calculates the visibleRange for an {@link AxisBase3D} depending on the current parameters
     * such as {@link AxisCore.autoRange} and data on the axis.
     * @param axis The {@link AxisBase3D} we are calculating for
     * @returns The auto-fitted range
     */
    calculateAutoRange(axis: AxisBase3D): NumberRange;
}
