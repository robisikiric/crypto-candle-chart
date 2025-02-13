import { EWatermarkPosition } from "../../types/WatermarkPosition";
export declare class SciChartDefaults {
    /**
     * @deprecated This functionality has been removed. useNativeText: true provides much greater performance benefit.
     */
    static asyncLabels: boolean;
    /**
     * Set this true to allow reuse of label textures across different axes and different charts
     */
    static useSharedCache: boolean;
    /**
     * NOT RECOMMENDED UNLESS IN DEBUG MODE: Turn on/off adaptive, visually lossless resampling algorithms
     * globally for the entire application.
     *
     * To do this on a per-series basis use {@link BaseRenderableSeries.resamplingMode}. For precision issues try
     * adjusting the {@link BaseRenderableSeries.resamplingPrecision} property
     */
    static debugDisableResampling: boolean;
    /**
     * Turn on/off warnings to optimize performance
     */
    static performanceWarnings: boolean;
    /**
     * Experimental - set true to use native text for axes and titles.  Not all text features currently supported
     */
    static useNativeText: boolean;
    /**
     * Time in ms to retry loading a native font.  If you need to load a large font over a potentially slow connection await sciChartSurface.registerFont
     */
    static nativeFontTimeout: number;
    /**
     * The default position of the watermark for trials
     */
    static watermarkPosition: EWatermarkPosition;
    /** For 2D charts the watermark is normally positioned within the series area.  Set this true to place it relative to the overall canvas.   */
    static watermarkRelativeToCanvas: boolean;
    /**
     * For 2D charts a number of buffers are created to process data. Buffer size by default grows with usage and caps out at 8,192kb.
     * A total of 10 buffers are created for different scenarios.
     * When SciChartSurface.create() is used this results in a maximum of 80MB memory as a static overhead for the application.
     * When SciChartSurface.createSingle() is used this results in up to 80MB memory *per chart* as a static overhead.
     * Lowering this number to 2048kb (or 1024kb) will reduce memory usage for the SciChart 2D Engine but may impact chart drawing performance.
     * @remarks This property needs to be set before charts created and cannot be dynamically adjusted after that.
     * Do not set lower than 1024kb or higher than 32MB (1024 x 32). Values outside this range will be clamped
     */
    static wasmBufferSizesKb: number;
    /**
     * Defines if newly created charts should be rendered as soon as possible after initialization.
     * Setting to `true` will require surfaces to be "resumed" in order to perform actual rendering.
     */
    static createSuspended: boolean;
}
