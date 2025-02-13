import { UniformHeatmapRenderableSeries } from "../UniformHeatmapRenderableSeries";
import { BaseHitTestProvider } from "./BaseHitTestProvider";
import { HitTestInfo } from "./HitTestInfo";
/**
 * Hit-test provider for {@link UniformHeatmapRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
export declare class UniformHeatmapHitTestProvider extends BaseHitTestProvider<UniformHeatmapRenderableSeries> {
    /**
     * @inheritDoc
     */
    hitTest(x: number, y: number): HitTestInfo;
    /**
     * @inheritDoc
     */
    hitTestDataPoint(x: number, y: number): HitTestInfo;
    /**
     * @inheritDoc
     */
    hitTestXSlice(x: number, y: number): HitTestInfo;
}
