import { StackedMountainRenderableSeries } from "../StackedMountainRenderableSeries";
import { BaseHitTestProvider } from "./BaseHitTestProvider";
import { HitTestInfo } from "./HitTestInfo";
/**
 * Hit-test provider for {@link StackedMountainRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
export declare class StackedMountainSeriesHitTestProvider extends BaseHitTestProvider<StackedMountainRenderableSeries> {
    /**
     * @inheritDoc
     */
    hitTest(x: number, y: number): HitTestInfo;
    /**
     * @inheritDoc
     */
    hitTestXSlice(x: number, y: number): HitTestInfo;
    /**
     * @inheritDoc
     */
    hitTestDataPoint(x: number, y: number, hitTestRadius?: number): HitTestInfo;
}
