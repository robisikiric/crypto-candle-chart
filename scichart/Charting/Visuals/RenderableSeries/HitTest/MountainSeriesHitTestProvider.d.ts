import { BaseMountainRenderableSeries } from "../BaseMountainRenderableSeries";
import { BaseHitTestProvider } from "./BaseHitTestProvider";
import { HitTestInfo } from "./HitTestInfo";
/**
 * Hit-test provider for {@link BaseMountainRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
export declare class MountainSeriesHitTestProvider extends BaseHitTestProvider<BaseMountainRenderableSeries> {
    /**
     * @inheritDoc
     */
    hitTest(x: number, y: number): HitTestInfo;
}
