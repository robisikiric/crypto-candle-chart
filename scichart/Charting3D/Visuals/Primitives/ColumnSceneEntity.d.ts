import { Point } from "../../../Core/Point";
import { ESceneEntityType } from "../../../types/SceneEntityType";
import { SCRTColumnsSceneEntity, TSciChart3D } from "../../../types/TSciChart3D";
import { ColumnRenderableSeries3D } from "../RenderableSeries/ColumnRenderableSeries3D";
import { HitTestInfo3D } from "../RenderableSeries/HitTestInfo3D";
import { RenderableSeriesSceneEntity } from "./RenderableSeriesSceneEntity";
import { RenderableSeriesSceneEntityState } from "./RenderableSeriesSceneEntityState";
/**
 * @summary {@link BaseSceneEntity3D} type for drawing 3D Column series in SciChart's High Performance
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks See related type {@link ColumnRenderableSeries3D} which should be added to {@link SciChart3DSurface.renderableSeries}
 * along with data from an {@link XyzDataSeries3D} to create a 3D Column chart
 */
export declare class ColumnSceneEntity extends RenderableSeriesSceneEntity<ColumnRenderableSeries3D, RenderableSeriesSceneEntityState, SCRTColumnsSceneEntity> {
    /** @inheritDoc */
    readonly type: ESceneEntityType;
    private instanceColors;
    private instanceScales;
    /**
     * Creates an instance of {@link ColumnSceneEntity}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries The parent {@link BaseRenderableSeries3D} which this entity maps to
     */
    constructor(webAssemblyContext: TSciChart3D, parentSeries: ColumnRenderableSeries3D);
    /** @inheritDoc */
    delete(): void;
    /** @inheritDoc */
    Render(): void;
    /**
     * @inheritDoc
     * @param propertyName
     */
    notifySeriesPropertyChanged(propertyName: string): void;
    /** @inheritDoc */
    hitTest(screenPoint: Point): HitTestInfo3D;
    /** @inheritDoc */
    protected updateSeries(): void;
    private rebuildPointMetadata;
}
