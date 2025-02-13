import { BaseOhlcRenderableSeries } from "../BaseOhlcRenderableSeries";
import { BaseHitTestProvider } from "./BaseHitTestProvider";
import { HitTestInfo } from "./HitTestInfo";
/**
 * Hit-test provider for {@link FastOhlcRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
export declare class OhlcSeriesHitTestProvider extends BaseHitTestProvider<BaseOhlcRenderableSeries> {
    /**
     * @inheritDoc
     */
    hitTest(x: number, y: number, hitTestRadius?: number): HitTestInfo;
    /**
     * @inheritDoc
     */
    hitTestForDataPointSelectionModifier(x: number, y: number, hitTestRadius?: number): HitTestInfo;
    /**
     * @inheritDoc
     */
    hitTestXSlice(x: number, y: number): HitTestInfo;
}
