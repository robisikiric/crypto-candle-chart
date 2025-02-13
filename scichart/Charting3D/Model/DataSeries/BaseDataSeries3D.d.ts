import { DeletableEntity } from "../../../Core/DeletableEntity";
import { EventHandler } from "../../../Core/EventHandler";
import { NumberRange } from "../../../Core/NumberRange";
import { TSciChart3D } from "../../../types/TSciChart3D";
import { IDataSeries3D } from "./IDataSeries3D";
/**
 * Defines {@link BaseDataSeries3D | DataSeries} types available within SciChart's
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 */
export declare enum EDataSeriesType3D {
    /**
     * Defines an {@link XyzDataSeries3D}
     */
    Xyz3D = "Xyz",
    /**
     * Defines an {@link UniformGridDataSeries3D}
     */
    UniformGrid3D = "UniformGrid3D",
    /**
     * Defines a NonUniformGridDataSeries3D
     */
    NonUniformGrid3D = "NonUniformGrid3D"
}
/**
 * Optional parameters passed to the {@link BaseDataSeries3D} at construct time.
 */
export interface IBaseDataSeries3DOptions {
    /**
     * The name of the dataseries. Used by legends and also for dataseries identification
     */
    dataSeriesName?: string;
}
/**
 * The base class for DataSeries in SciChart's {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks
 * A DataSeries stores the data to render. This is independent from the {@link IRenderableSeries3D | RenderableSeries}
 * which defines how that data should be rendered.
 *
 * See derived types of {@link BaseDataSeries3D} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries3D} to find out what 3D JavaScript Chart types are available.
 */
export declare abstract class BaseDataSeries3D extends DeletableEntity implements IDataSeries3D {
    /**
     * @inheritDoc
     */
    abstract readonly type: EDataSeriesType3D;
    /**
     * @inheritDoc
     */
    readonly dataChanged: EventHandler<void>;
    /**
     * The {@link TSciChart3D | SciChart WebAssembly Context} containing native methods and access to our WebGL2 Engine
     */
    protected webAssemblyContext: TSciChart3D;
    private dataSeriesNameProperty;
    private isDeleted;
    private isModifiedProperty;
    /**
     * Creates an instance of the {@link BaseDataSeries3D}
     * @param webAssemblyContext the {@link TSciChart3D | SciChart WebAssembly Context} containing native methods
     * and access to our underlying WebGL2 rendering engine
     * @param options optional parameters of type {@link IBaseDataSeries3DOptions} to configure the series
     */
    constructor(webAssemblyContext: TSciChart3D, options?: IBaseDataSeries3DOptions);
    /**
     * @inheritDoc
     */
    abstract get xRange(): NumberRange;
    /**
     * @inheritDoc
     */
    abstract get yRange(): NumberRange;
    /**
     * @inheritDoc
     */
    abstract get zRange(): NumberRange;
    /**
     * @inheritDoc
     */
    get dataSeriesName(): string;
    /**
     * @inheritDoc
     */
    set dataSeriesName(dataSeriesName: string);
    /**
     * Determines whether the Data Series has been modified since last resetModified() call.
     */
    get isModified(): boolean;
    /**
     * Returns true if this DataSeries has been deleted and native memory destroyed
     */
    getIsDeleted(): boolean;
    /**
     * @inheritDoc
     */
    delete(): void;
    /**
     * Call this method to notify subscribers of {@link dataChanged} that the data has changed
     * and {@link https://www.scichart.com/javascript-chart-features | 3D JavaScript Chart}
     * needs redrawing
     */
    notifyDataChanged(): void;
    /**
     * Resets the modified flag.
     */
    resetModified(): void;
}
