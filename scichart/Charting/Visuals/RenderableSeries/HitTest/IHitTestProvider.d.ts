import { RenderPassData } from "../../../Services/RenderPassData";
import { HitTestInfo } from "./HitTestInfo";
/**
 * Defines the interface to a Hit-Test Provider: a class which performs hit-tests on series, returning data-values at X-Y mouse locations
 */
export interface IHitTestProvider {
    /**
     * @description updates the current HitTestProvider with the latest renderPassData
     * @param renderPassData the latest renderPassData from the parent series last draw operation
     */
    update(renderPassData: RenderPassData): void;
    /**
     * @description Performs a hit-test for series body at the specific mouse point (X,Y coordinate on the parent SciChartSurface),
     * returning a HitTestInfo type with the results
     * @remarks For Retina displays and Browser zoom, ensure that X,Y points are scaled by {@link DpiHelper.PIXEL_RATIO}
     * @param x The mouse point X coordinate on the parent SciChartSurface.
     * NOTE: For Retina displays and Browser zoom, ensure that X,Y points are scaled by {@link DpiHelper.PIXEL_RATIO}
     * @param y The mouse point Y coordinate on the parent SciChartSurface.
     * NOTE: For Retina displays and Browser zoom, ensure that X,Y points are scaled by {@link DpiHelper.PIXEL_RATIO}
     * @param hitTestRadius The radius in pixels to determine whether a mouse is over a data-point
     */
    hitTest(x: number, y: number, hitTestRadius?: number): HitTestInfo;
    /**
     * @description Performs a hit-test for the data point at the specific mouse point (X,Y coordinate on the parent SciChartSurface),
     * returning a HitTestInfo type with the results
     * @remarks For Retina displays and Browser zoom, ensure that X,Y points are scaled by {@link DpiHelper.PIXEL_RATIO}
     * @param x The mouse point X coordinate on the parent SciChartSurface.
     * NOTE: For Retina displays and Browser zoom, ensure that X,Y points are scaled by {@link DpiHelper.PIXEL_RATIO}
     * @param y The mouse point Y coordinate on the parent SciChartSurface.
     * NOTE: For Retina displays and Browser zoom, ensure that X,Y points are scaled by {@link DpiHelper.PIXEL_RATIO}
     * @param hitTestRadius The radius in pixels to determine whether a mouse is over a data-point
     */
    hitTestDataPoint(x: number, y: number, hitTestRadius?: number): HitTestInfo;
    /**
     * @description Performs a hit-test for the vertical slice at the specific mouse point (X,Y coordinate on the parent SciChartSurface),
     * only X value is taken into account, it is used for {@link CursorModifier} and {@link RolloverModifier},
     * returns a HitTestInfo type with the results,
     * Only for sorted values
     * @remarks For Retina displays and Browser zoom, ensure that X,Y points are scaled by {@link DpiHelper.PIXEL_RATIO}
     * @param x The mouse point X coordinate on the parent SciChartSurface.
     * NOTE: For Retina displays and Browser zoom, ensure that X,Y points are scaled by {@link DpiHelper.PIXEL_RATIO}
     * @param y The mouse point Y coordinate on the parent SciChartSurface.
     * NOTE: For Retina displays and Browser zoom, ensure that X,Y points are scaled by {@link DpiHelper.PIXEL_RATIO}
     * @param hitTestRadius The radius in pixels to determine whether a mouse is over a data-point
     */
    hitTestXSlice(x: number, y: number, hitTestRadius?: number): HitTestInfo;
    /**
     * @description Performs a hit-test for the {@link DataPointSelectionModifier}. This calls {@link IHitTestProvider.hitTestDataPoint} by default.
     * The hitTestProvider for the renderableSeries can override this if different behaviour is desired, eg for columSeries we call hitTest instead.
     * returns a HitTestInfo type with the results,
     * Only for sorted values
     * @remarks For Retina displays and Browser zoom, ensure that X,Y points are scaled by {@link DpiHelper.PIXEL_RATIO}
     * @param x The mouse point X coordinate on the parent SciChartSurface.
     * NOTE: For Retina displays and Browser zoom, ensure that X,Y points are scaled by {@link DpiHelper.PIXEL_RATIO}
     * @param y The mouse point Y coordinate on the parent SciChartSurface.
     * NOTE: For Retina displays and Browser zoom, ensure that X,Y points are scaled by {@link DpiHelper.PIXEL_RATIO}
     * @param hitTestRadius The radius in pixels to determine whether a mouse is over a data-point
     */
    hitTestForDataPointSelectionModifier(x: number, y: number, hitTestRadius: number): HitTestInfo;
}
