import { EDataSeriesType3D } from "../../Model/DataSeries/BaseDataSeries3D";
import { Vector3 } from "../../Vector3";
import { IRenderableSeries3D } from "./BaseRenderableSeries3D";
import { HitTestInfo3D } from "./HitTestInfo3D";
/**
 * SeriesInfo3D is a data-structure which provides enriched information about a hit-test operation in SciChart 3D.
 * It's derived by calling {@link BaseRenderableSeries3D.hitTest}. There is a class hierachy for {@link SeriesInfo3D} which
 * is a different class depending on series type, e.g. 3D Scatter series has {@link XyzSeriesInfo3D},
 * 3D Surface mesh series has {@link SurfaceMeshSeriesInfo3D} etc.
 */
export declare class SeriesInfo3D {
    /**
     * The default empty {@link HitTestInfo3D} instance
     */
    static empty(): SeriesInfo3D;
    /**
     * When true, the {@link SeriesInfo3D} is empty
     */
    isEmpty: boolean;
    /**
     * When {@link isHit} is true, this is the X-value of the data-point in the {@link XyzDataSeries3D} that was hit
     */
    xValue: number;
    /**
     * When {@link isHit} is true, this is the Y-value of the data-point in the {@link XyzDataSeries3D} that was hit
     */
    yValue: number;
    /**
     * When {@link isHit} is true, this is the Z-value of the data-point in the {@link XyzDataSeries3D} that was hit
     */
    zValue: number;
    /**
     * When {@link isHit} is true, this is the {@link Vector3} 3D World Coordinates of the data-point that was hit
     */
    hitWorldCoords: Vector3;
    /**
     * The name of the associated {@link BaseDataSeries3D | DataSeries}
     */
    dataSeriesName: string;
    dataSeriesType: EDataSeriesType3D;
    /**
     * The associated {@link IRenderableSeries3D | RenderableSeries}
     */
    renderableSeries: IRenderableSeries3D;
    /**
     * When true, the result of the hit-test operation is hit (mouse over data-point)
     */
    isHit: boolean;
    protected hitTestInfo: HitTestInfo3D;
    constructor(series: IRenderableSeries3D, hitTestInfo: HitTestInfo3D);
}
