import { BaseRenderableSeries } from "../BaseRenderableSeries";
import { BaseHitTestProvider } from "./BaseHitTestProvider";
import { HitTestInfo } from "./HitTestInfo";
export declare class TextSeriesHitTestProvider extends BaseHitTestProvider<BaseRenderableSeries> {
    hitTest(x: number, y: number, hitTestRadius?: number): HitTestInfo;
}
