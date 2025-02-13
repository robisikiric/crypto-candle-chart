import { IRenderableSeries3D } from "./BaseRenderableSeries3D";
import { HitTestInfo3D } from "./HitTestInfo3D";
import { SeriesInfo3D } from "./SeriesInfo3D";
export declare class SurfaceMeshSeriesInfo3D extends SeriesInfo3D {
    /**
     * When {@link isHit} is true, this is the index to the Z-cell in the {@link UniformGridDataSeries3D} that was hit
     */
    zIndex: number;
    /**
     * When {@link isHit} is true, this is the index to the X-cell in the {@link UniformGridDataSeries3D} that was hit
     */
    xIndex: number;
    constructor(series: IRenderableSeries3D, hitTestInfo: HitTestInfo3D);
    private enrichSeriesInfo;
}
