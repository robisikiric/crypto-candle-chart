import { IPointMetadata3D } from "../../Model/DataSeries/IPointMetadata3D";
import { IRenderableSeries3D } from "./BaseRenderableSeries3D";
import { HitTestInfo3D } from "./HitTestInfo3D";
import { SeriesInfo3D } from "./SeriesInfo3D";
/**
 * XyzSeriesInfo3D is a data-structure which provides enriched information about a hit-test operation on an XYZ series in SciChart 3D.
 * It's derived by calling {@link BaseRenderableSeries3D.hitTest}.
 */
export declare class XyzSeriesInfo3D extends SeriesInfo3D {
    /**
     * When {@link isHit} is true, this is the index of the data-point in the {@link XyzDataSeries3D} that was hit
     */
    dataSeriesIndex: number;
    /**
     * When {@link isHit} is true, this metadata on the data-point in the {@link XyzDataSeries3D} that was hit
     */
    pointMetadata: IPointMetadata3D;
    constructor(series: IRenderableSeries3D, hitTestInfo: HitTestInfo3D);
    private enrichSeriesInfo;
}
