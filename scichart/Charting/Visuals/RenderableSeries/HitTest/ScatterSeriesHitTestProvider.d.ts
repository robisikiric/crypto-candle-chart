import { XyScatterRenderableSeries } from "../XyScatterRenderableSeries";
import { BaseHitTestProvider } from "./BaseHitTestProvider";
import { HitTestInfo } from "./HitTestInfo";
/**
 * Hit-test provider for {@link XyScatterRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
export declare class ScatterSeriesHitTestProvider extends BaseHitTestProvider<XyScatterRenderableSeries> {
    /**
     * @inheritDoc
     */
    hitTest(x: number, y: number, hitTestRadius?: number): HitTestInfo;
    /**
     * @inheritDoc
     */
    hitTestXSlice(x: number, y: number): HitTestInfo;
}
