import { FastImpulseRenderableSeries } from "../FastImpulseRenderableSeries";
import { BaseHitTestProvider } from "./BaseHitTestProvider";
import { HitTestInfo } from "./HitTestInfo";
/**
 * Hit-test provider for {@link FastColumnRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
export declare class ImpulseSeriesHitTestProvider extends BaseHitTestProvider<FastImpulseRenderableSeries> {
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
