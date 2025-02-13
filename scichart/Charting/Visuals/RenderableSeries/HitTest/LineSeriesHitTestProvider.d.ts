import { BaseLineRenderableSeries } from "../BaseLineRenderableSeries";
import { BaseHitTestProvider } from "./BaseHitTestProvider";
import { HitTestInfo } from "./HitTestInfo";
/**
 * Hit-test provider for {@link BaseLineRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
export declare class LineSeriesHitTestProvider extends BaseHitTestProvider<BaseLineRenderableSeries> {
    /**
     * @inheritDoc
     */
    hitTest(x: number, y: number, hitTestRadius?: number): HitTestInfo;
    private hitTestSorted;
    private hitTestUnsorted;
}
