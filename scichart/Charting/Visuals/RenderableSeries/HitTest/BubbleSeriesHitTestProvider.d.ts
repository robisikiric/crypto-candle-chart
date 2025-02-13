import { FastBubbleRenderableSeries } from "../FastBubbleRenderableSeries";
import { BaseHitTestProvider } from "./BaseHitTestProvider";
import { HitTestInfo } from "./HitTestInfo";
/**
 * Hit-test provider for {@link FastBubbleRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
export declare class BubbleSeriesHitTestProvider extends BaseHitTestProvider<FastBubbleRenderableSeries> {
    /**
     * @inheritDoc
     */
    hitTest(x: number, y: number, hitTestRadius?: number): HitTestInfo;
    /**
     * @inheritDoc
     */
    hitTestDataPoint(x: number, y: number, hitTestRadius?: number): HitTestInfo;
    /**
     * @inheritDoc
     */
    hitTestXSlice(x: number, y: number): HitTestInfo;
}
