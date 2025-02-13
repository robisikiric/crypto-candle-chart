import { StackedColumnRenderableSeries } from "../StackedColumnRenderableSeries";
import { BaseHitTestProvider } from "./BaseHitTestProvider";
import { HitTestInfo } from "./HitTestInfo";
/**
 * Hit-test provider for {@link StackedColumnRenderableSeries}. See base class {@link BaseHitTestProvider} for further info
 */
export declare class StackedColumnSeriesHitTestProvider extends BaseHitTestProvider<StackedColumnRenderableSeries> {
    /**
     * @inheritDoc
     */
    hitTest(x: number, y: number): HitTestInfo;
    /**
     * @inheritDoc
     */
    hitTestDataPoint(x: number, y: number, hitTestRadius?: number): HitTestInfo;
    /**
     * @inheritDoc
     */
    hitTestForDataPointSelectionModifier(x: number, y: number, hitTestRadius?: number): HitTestInfo;
    /**
     * @inheritDoc
     */
    hitTestXSlice(x: number, y: number): HitTestInfo;
}
