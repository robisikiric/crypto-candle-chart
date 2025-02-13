export declare type TSciChart = {
    canvas: HTMLCanvasElement;
    canvas2D: HTMLCanvasElement;
    SCRTFillTextureFloat32: (texture: TSRTexture, width: number, height: number, pixels: SCRTFloatVector) => TSRVector4;
    SCRTMultiplyColorVectorOpacity: (originalVector: IntVector, resultVector: IntVector, factor: number) => void;
    SCRTSetMainWindowSize: (width: number, height: number) => void;
    SCRTDoLeakCheck: () => void;
    SCRTCreateBitmapTexture: (width: number, height: number, textureFormat: eTSRTextureFormat) => TSRTexture;
    SCRTSetTextureLinearSamplerEnabled: (texture: TSRTexture, enabled: boolean) => void;
    SCRTFillTextureAbgr: (texture: TSRTexture, width: number, height: number, pixels: IntVector) => void;
    SCRTSetActiveTexture: (texture: TSRTexture) => void;
    SCRTSetActiveDoubleVector: (SCRTSetActiveDoubleVector: SCRTDoubleVector, doubleVector: number) => void;
    SCRTCreatePalette: (colors: IntVector) => SCRTPalette;
    SCRTFillVectorSequential: (SCRTFillVectorSequential: SCRTDoubleVector, count: number) => void;
    SCRTMemMove: (destPtr: number, sourcePtr: number, count: number) => void;
    SCRTMemCopy: (destPtr: number, sourcePtr: number, count: number) => void;
    SCRTInitEngine2D: () => void;
    SCRTShutdownEngine2D: () => void;
    TSRRequestExit: () => void;
    TSRRequestDraw: () => void;
    TSRRequestCanvasDraw: (canvasID: string) => void;
    TSRSetDrawRequestsEnabled: (enabled: boolean) => void;
    SCRTGetMainRenderContext2D: () => SCRTRenderContext;
    SCRTCreateDahedPen: (color: number, thickness: number, antialiased: boolean, dashPattern: FloatVector) => SCRTPen;
    SCRTGetScreenWidth: () => number;
    SCRTGetScreenHeight: () => number;
    SCRTSetWaterMarkProperties: (properties: SCRTWaterMarkProperties) => void;
    SCRTSplineHelperCubicSpline: (xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, xsValues: SCRTDoubleVector, ysValues: SCRTDoubleVector, initialSize: number, interpolationPoints: number, containsNAN: boolean) => void;
    SCRTAnimationHelperWave: (yValues: SCRTDoubleVector, durationFraction: number, zeroLine: number, progress: number, ysValues: SCRTDoubleVector) => number;
    SCRTAnimationHelperSweep: (yValues: SCRTDoubleVector, progress: number, ysValues: SCRTDoubleVector) => number;
    SCRTAnimationHelperScale: (yValues: SCRTDoubleVector, zeroLine: number, progress: number, ysValues: SCRTDoubleVector) => number;
    SCRTAnimationHelperFade: (yValues: SCRTDoubleVector, progress: number, ysValues: SCRTDoubleVector) => number;
    SCRTSetGlobalSampleChartInterface: (param0: SCRTSampleChartInterface) => void;
    SCRTGetGlobalSampleChartInterface: () => SCRTSampleChartInterface;
    SCRTSetGlobalCopyToDestinationInterface: (param0: SCRTCopyToDestinationInterface) => void;
    SCRTSetClearAlphaParams: (enabled: boolean, alpha: number) => void;
    SCRTRegisterFile: (fileName: string, url: string, callback: SCRTFileLoadCallbackInterface) => void;
    TSRVector4: (new () => TSRVector4) & (new (x: number, y: number, z: number, w: number) => TSRVector4);
    IntVector: new () => IntVector;
    UIntVector: new () => UIntVector;
    SCRTFloatVector: new () => SCRTFloatVector;
    FloatVector: new () => FloatVector;
    SCRTDoubleVector: (new () => SCRTDoubleVector) & (new (capacity: number) => SCRTDoubleVector);
    DoubleVector: new () => DoubleVector;
    SCRTFifoVector: new (fifoCapacity: number) => SCRTFifoVector;
    eTSRTextureFormat: {
        TSR_TEXTUREFORMAT_A8B8G8R8: eTSRTextureFormat;
        TSR_TEXTUREFORMAT_R32F: eTSRTextureFormat;
    };
    ResamplingMode: {
        None: ResamplingMode;
        MinMax: ResamplingMode;
        Min: ResamplingMode;
        Max: ResamplingMode;
        Mid: ResamplingMode;
        MinOrMax: ResamplingMode;
        Auto: ResamplingMode;
    };
    ResamplingData: {
        LinearData: ResamplingData;
        CategoryData: ResamplingData;
        UnevenlySpacedData: ResamplingData;
        UnsortedData: ResamplingData;
    };
    SCRTDoubleResamplerMergeIndicesParams: new () => SCRTDoubleResamplerMergeIndicesParams;
    SCRTPalette: (new () => SCRTPalette) & {
        GetNoOverrideColorCode: () => number;
    };
    SCRTDoubleArrayOperations: new () => SCRTDoubleArrayOperations;
    ResamplingArgs: new () => ResamplingArgs;
    SCRTXvaluesProvider: new () => SCRTXvaluesProvider;
    SCRTDoubleArraysXyResampleOutput: new () => SCRTDoubleArraysXyResampleOutput;
    SCRTDoubleResampler: new () => SCRTDoubleResampler;
    StringVector: new () => StringVector;
    LinearCoordinateCalculatorDouble: new (ViewportDimension: number, VisibleMin: number, VisibleMax: number, ViewportOffset: number, CoordOffset: number) => LinearCoordinateCalculatorDouble;
    FlippedLinearCoordinateCalculatorDouble: new (ViewportDimension: number, VisibleMin: number, VisibleMax: number, ViewportOffset: number, CoordOffset: number) => FlippedLinearCoordinateCalculatorDouble;
    LinearCoordinateCalculatorSingle: new (ViewportDimension: number, VisibleMin: number, VisibleMax: number, ViewportOffset: number, CoordOffset: number) => LinearCoordinateCalculatorSingle;
    FlippedLinearCoordinateCalculatorSingle: new (ViewportDimension: number, VisibleMin: number, VisibleMax: number, ViewportOffset: number, CoordOffset: number) => FlippedLinearCoordinateCalculatorSingle;
    CategoryCoordinateCalculatorDouble: new (ViewportDimension: number, VisibleMin: number, VisibleMax: number, ViewportOffset: number, CoordOffset: number, IndexMin: number, IndexMax: number) => CategoryCoordinateCalculatorDouble;
    FlippedCategoryCoordinateCalculatorDouble: new (ViewportDimension: number, VisibleMin: number, VisibleMax: number, ViewportOffset: number, CoordOffset: number, IndexMin: number, IndexMax: number) => FlippedCategoryCoordinateCalculatorDouble;
    LogarithmicCoordinateCalculator: new (ViewportDimension: number, VisibleMin: number, VisibleMax: number, ViewportOffset: number, CoordOffset: number, LogBase: number) => LogarithmicCoordinateCalculator;
    FlippedLogarithmicCoordinateCalculator: new (ViewportDimension: number, VisibleMin: number, VisibleMax: number, ViewportOffset: number, CoordOffset: number, LogBase: number) => FlippedLogarithmicCoordinateCalculator;
    SCRTFrameRenderer2D: new () => SCRTFrameRenderer2D;
    SCRTLineGapMode: {
        Default: SCRTLineGapMode;
        DrawGaps: SCRTLineGapMode;
        CloseGaps: SCRTLineGapMode;
    };
    SCRTLineDrawingParams: new () => SCRTLineDrawingParams;
    SCRTPen: new (color: number, thickness: number, antiAliased: boolean) => SCRTPen;
    SCRTLineSeriesDrawingProvider: new () => SCRTLineSeriesDrawingProvider;
    SCRTHeatmapDrawingParams: new () => SCRTHeatmapDrawingParams;
    SCRTHeatmapSeriesDrawingProvider: new () => SCRTHeatmapSeriesDrawingProvider;
    SCRTPointDrawingParams: new () => SCRTPointDrawingParams;
    SCRTScatterSeriesDrawingProvider: new () => SCRTScatterSeriesDrawingProvider;
    SCRTOhlcDrawingParams: new () => SCRTOhlcDrawingParams;
    SCRTBrush: new () => SCRTBrush;
    SCRTCandlestickSeriesDrawingProvider: new () => SCRTCandlestickSeriesDrawingProvider;
    SCRTMountainDrawingParams: new () => SCRTMountainDrawingParams;
    SCRTMountainSeriesDrawingProvider: new () => SCRTMountainSeriesDrawingProvider;
    SCRTBandDrawingParams: new () => SCRTBandDrawingParams;
    SCRTBandSeriesDrawingProvider: new () => SCRTBandSeriesDrawingProvider;
    SCRTColumnDrawingParams: new () => SCRTColumnDrawingParams;
    SCRTStackedColumnSeriesDrawingProvider: new () => SCRTStackedColumnSeriesDrawingProvider;
    SCRTStackedColumnDrawingParams: new () => SCRTStackedColumnDrawingParams;
    SCRTSeriesEffectType: {
        Glow: SCRTSeriesEffectType;
    };
    TSRVector2: (new () => TSRVector2) & (new (x: number, y: number) => TSRVector2);
    SCRTGlowEffect: new () => SCRTGlowEffect;
    SCRTShadowEffect: new () => SCRTShadowEffect;
    SCRTColumnSeriesDrawingProvider: new () => SCRTColumnSeriesDrawingProvider;
    SCRTBubbleSeriesDrawingProvider: new () => SCRTBubbleSeriesDrawingProvider;
    SCRTLineType: {
        List: SCRTLineType;
        Strip: SCRTLineType;
        Digital: SCRTLineType;
        Nan: SCRTLineType;
    };
    SCRTSpriteType: {
        Normal: SCRTSpriteType;
        FixedSize: SCRTSpriteType;
    };
    SCRTCandleType: {
        CandleStick: SCRTCandleType;
        OHLC: SCRTCandleType;
    };
    SCRTSolidBrush: new (color: number, transparent: boolean) => SCRTSolidBrush;
    eSCRTBrushMappingMode: {
        PerPrimitive: eSCRTBrushMappingMode;
        PerScreen: eSCRTBrushMappingMode;
    };
    SCRTTextureBrush: new (texture: TSRTexture, mappingMode: eSCRTBrushMappingMode, opacity: number) => SCRTTextureBrush;
    SCRTContourParams: new () => SCRTContourParams;
    eSCRTBlendMode: {
        BlendDisabled: eSCRTBlendMode;
        BlendDefault: eSCRTBlendMode;
        BlendAdditiveColor: eSCRTBlendMode;
        BlendAdditiveAlpha: eSCRTBlendMode;
        BlendAdditiveOneAlpha: eSCRTBlendMode;
    };
    SCRTColorVertex: (new () => SCRTColorVertex) & (new (x: number, y: number) => SCRTColorVertex);
    VectorColorVertex: new () => VectorColorVertex;
    SCRTRectVertex: (new () => SCRTRectVertex) & (new (left: number, top: number, right: number, bottom: number) => SCRTRectVertex);
    VectorRectVertex: new () => VectorRectVertex;
    SCRTFontKey: new (name: string, size: number, transformed: boolean, advanced: boolean) => SCRTFontKey;
    WStringVector: new () => WStringVector;
    TSRVector3: (new () => TSRVector3) & (new (x: number, y: number, z: number) => TSRVector3);
    SCRTColumnVertex: new () => SCRTColumnVertex;
    VectorColumnVertex: new () => VectorColumnVertex;
    DoubleRange: (new () => DoubleRange) & (new (min: number, max: number) => DoubleRange);
    SCRTFindIndexSearchMode: {
        Exact: SCRTFindIndexSearchMode;
        Nearest: SCRTFindIndexSearchMode;
        RoundDown: SCRTFindIndexSearchMode;
        RoundUp: SCRTFindIndexSearchMode;
    };
    NumberUtil: {
        Log: (value: number, logBase: number) => number;
        IsPowerOf: (value: number, power: number, logBase: number) => boolean;
        RoundUpPower: (value: number, power: number, logBase: number) => number;
        RoundDownPower: (value: number, power: number, logBase: number) => number;
        RoundUp: (value: number, nearest: number) => number;
        RoundDown: (value: number, nearest: number) => number;
        IsDivisibleBy: (value: number, divisor: number) => boolean;
        Constrain: (value: number, lowerBound: number, upperBound: number) => number;
        RoundToDigits: (value: number, decimals: number) => number;
        MinMax: (inputValues: SCRTDoubleVector) => DoubleRange;
        MinMaxWithIndex: (inputValues: SCRTDoubleVector, startIndex: number, count: number) => DoubleRange;
        FindIndex: (inputValues: SCRTDoubleVector, value: number, searchMode: SCRTFindIndexSearchMode, dataIsSortedAscending: boolean) => number;
        LinearInterpolateI: (from: number, to: number, ratio: number) => number;
    };
    SCRTHitTestHelper: {
        GetNearestXyPoint: (xCoordinateCalculator: CoordinateCalculator, yCoordinateCalculator: CoordinateCalculator, xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, isSorted: boolean, xHitCoord: number, yHitCoord: number, hitTestRadius: number) => DoubleRange;
    };
    NiceDoubleScale: {
        CalculateTickSpacing: (min: number, max: number, minorsPerMajor: number, maxTicks: number) => DoubleRange;
        NiceNum: (range: number, round: boolean) => number;
    };
    NiceLogScale: {
        CalculateTickSpacing: (min: number, max: number, logBase: number, minorsPerMajor: number, maxTicks: number) => DoubleRange;
        CalculateLowPrecisionTickSpacing: (min: number, max: number, logBase: number, minorsPerMajor: number, maxTicks: number) => DoubleRange;
    };
    SCRTLicenseType: {
        LICENSE_TYPE_NO_LICENSE: SCRTLicenseType;
        LICENSE_TYPE_TRIAL: SCRTLicenseType;
        LICENSE_TYPE_COMMUNITY: SCRTLicenseType;
        LICENSE_TYPE_FULL: SCRTLicenseType;
        LICENSE_TYPE_FULL_EXPIRED: SCRTLicenseType;
        LICENSE_TYPE_TRIAL_EXPIRED: SCRTLicenseType;
        LICENSE_TYPE_SUBSCRIPTION_EXPIRED: SCRTLicenseType;
        LICENSE_TYPE_INVALID_DEVELOPER_LICENSE: SCRTLicenseType;
        LICENSE_TYPE_REQUIRES_VALIDATION: SCRTLicenseType;
        LICENSE_TYPE_INVALID_LICENSE: SCRTLicenseType;
    };
    SCRTCredentials: {
        SetRuntimeLicenseKeyW: (licenseKey: string) => boolean;
        GetLicenseType: () => SCRTLicenseType;
        ResetRuntimeLicense: () => void;
        HasFeature: (feature: string) => SCRTLicenseType;
        GetLicenseDaysRemaining: () => number;
        GetExpiryDate: () => string;
        Dump: () => string;
        GetEncrypted: (stringToEncrypt: string) => string;
        Hash256Encode64: (stringToHash: string) => string;
        GetOrderId: () => string;
        GetAllowDebugging: () => boolean;
        GetLicenseErrors: () => string;
        GetLicenseChallenge: () => string;
        ApplyLicenseResponse: (response: string) => number;
        RequiresValidation: () => boolean;
        GetBuildStamp: () => string;
        GetProductCode: () => string;
        GetEncryptedOrderId: () => string;
        GetDeveloperCount: () => number;
    };
    SCRTWaterMarkProperties: new () => SCRTWaterMarkProperties;
    eTSRPlatform: {
        Undefined: eTSRPlatform;
        Windows: eTSRPlatform;
        Mac: eTSRPlatform;
        Linux: eTSRPlatform;
        Android: eTSRPlatform;
        iOS: eTSRPlatform;
        Web: eTSRPlatform;
    };
    eVariableUsage: {
        Normal: eVariableUsage;
        Pointer: eVariableUsage;
        Vector: eVariableUsage;
        VectorOfPointers: eVariableUsage;
        Blob: eVariableUsage;
        Array: eVariableUsage;
        DynamicArray: eVariableUsage;
    };
    eTSRMetaDataType: {
        Unknown: eTSRMetaDataType;
        Core: eTSRMetaDataType;
        Defined: eTSRMetaDataType;
        DynamicDefined: eTSRMetaDataType;
        Enum: eTSRMetaDataType;
        BitFlags: eTSRMetaDataType;
    };
    eTSRRendererType: {
        TSR_RENDERER_TYPE_UNDEFINED: eTSRRendererType;
        TSR_RENDERER_TYPE_D3D11: eTSRRendererType;
        TSR_RENDERER_TYPE_D3D11_LEVEL10: eTSRRendererType;
        TSR_RENDERER_TYPE_D3D9: eTSRRendererType;
        TSR_RENDERER_TYPE_GL: eTSRRendererType;
        TSR_RENDERER_TYPE_GLES2: eTSRRendererType;
        TSR_RENDERER_TYPE_GLES3: eTSRRendererType;
        TSR_RENDERER_TYPE_METAL: eTSRRendererType;
        TSR_RENDERER_TYPE_VULKAN: eTSRRendererType;
        TSR_RENDERER_TYPE_D3D12: eTSRRendererType;
    };
    eTSRCameraProjectionMode: {
        CAMERA_PROJECTIONMODE_PERSPECTIVE: eTSRCameraProjectionMode;
        CAMERA_PROJECTIONMODE_ORTHOGONAL: eTSRCameraProjectionMode;
    };
    TSRCamera: new () => TSRCamera;
    eTSRTextAlignMode: {
        Left: eTSRTextAlignMode;
        Center: eTSRTextAlignMode;
        Right: eTSRTextAlignMode;
    };
    TSRTextLineBounds: new () => TSRTextLineBounds;
    TSRTextBounds: new () => TSRTextBounds;
    SCRTSampleChartInterface: {
        implement: (wrapper: SCRTSampleChartInterfaceWrapper) => SCRTSampleChartInterface;
    };
    SCRTCopyToDestinationInterface: {
        implement: (wrapper: SCRTCopyToDestinationInterfaceWrapper) => SCRTCopyToDestinationInterface;
    };
    SCRTFileLoadCallbackInterface: {
        implement: (wrapper: SCRTFileLoadCallbackInterfaceWrapper) => SCRTFileLoadCallbackInterface;
    };
    SCRTSurfaceDestination: {
        implement: (wrapper: SCRTSurfaceDestinationWrapper) => SCRTSurfaceDestination;
    };
};
export declare class TSRVector4 {
    Assign(x: number, y: number, z: number, w: number): void;
    x: number;
    y: number;
    z: number;
    w: number;
    delete(): void;
}
export declare class TSRTexture {
    GetWidth(): number;
    GetHeight(): number;
    delete(): void;
}
export declare class IntVector {
    dataPtr(offset: number): number;
    push_back(element: number): void;
    pop_back(): void;
    size(): number;
    resize(size: number, initialValue: number): void;
    reserve(size: number): void;
    clear(): void;
    fill(element: number): void;
    insertAt(index: number, element: number): void;
    removeAt(index: number): void;
    removeRange(index: number, count: number): void;
    delete(): void;
    set(index: number, element: number): void;
    get(index: number): number;
}
export declare class UIntVector {
    dataPtr(offset: number): number;
    push_back(element: number): void;
    pop_back(): void;
    size(): number;
    resize(size: number, initialValue: number): void;
    reserve(size: number): void;
    clear(): void;
    fill(element: number): void;
    insertAt(index: number, element: number): void;
    removeAt(index: number): void;
    removeRange(index: number, count: number): void;
    delete(): void;
    set(index: number, element: number): void;
    get(index: number): number;
}
export declare class SCRTFloatVector {
    push_back(_dNewValue: number): void;
    resize(_iNewSize: number, _dInitialValue: number): void;
    resizeFast(_iNewSize: number): void;
    reserve(_iCount: number): void;
    clear(): void;
    size(): number;
    capacity(): number;
    get(_iIndex: number): number;
    set(_iIndex: number, _dValue: number): void;
    insertAt(_iIndex: number, _dValue: number): void;
    removeAt(_iIndex: number): void;
    removeRange(_iIndex: number, _iCount: number): void;
    dataPtr(_iOffset: number): number;
    delete(): void;
}
export declare class FloatVector {
    dataPtr(offset: number): number;
    push_back(element: number): void;
    pop_back(): void;
    size(): number;
    resize(size: number, initialValue: number): void;
    reserve(size: number): void;
    clear(): void;
    fill(element: number): void;
    insertAt(index: number, element: number): void;
    removeAt(index: number): void;
    removeRange(index: number, count: number): void;
    delete(): void;
    set(index: number, element: number): void;
    get(index: number): number;
}
export declare class SCRTDoubleVector {
    push_back(_dNewValue: number): void;
    resize(_iNewSize: number, _dInitialValue: number): void;
    resizeFast(_iNewSize: number): void;
    reserve(_iCount: number): void;
    clear(): void;
    size(): number;
    capacity(): number;
    get(_iIndex: number): number;
    set(_iIndex: number, _dValue: number): void;
    insertAt(_iIndex: number, _dValue: number): void;
    removeAt(_iIndex: number): void;
    removeRange(_iIndex: number, _iCount: number): void;
    dataPtr(_iOffset: number): number;
    delete(): void;
}
export declare class DoubleVector {
    dataPtr(offset: number): number;
    push_back(element: number): void;
    pop_back(): void;
    size(): number;
    resize(size: number, initialValue: number): void;
    reserve(size: number): void;
    clear(): void;
    fill(element: number): void;
    insertAt(index: number, element: number): void;
    removeAt(index: number): void;
    removeRange(index: number, count: number): void;
    delete(): void;
    set(index: number, element: number): void;
    get(index: number): number;
}
export declare class SCRTFifoVector extends SCRTDoubleVector {
    dataPtrZero(): number;
    notifyAppend(_iCount: number): void;
    getRaw(_iIndex: number): number;
    getStartIndex(): number;
    delete(): void;
}
export declare class eTSRTextureFormat {
}
export declare class ResamplingMode {
}
export declare class ResamplingData {
}
/**
 *WebAssembly / Native params for MergeIndices method
 */
export declare class SCRTDoubleResamplerMergeIndicesParams {
    SetXInput(xInput: SCRTDoubleVector): void;
    SetYInput(yInput: SCRTDoubleVector): void;
    SetY1Input(y1Input: SCRTDoubleVector): void;
    SetIndices(indices: IntVector): void;
    SetIndicesOut(indices: SCRTDoubleVector): void;
    SetXOut(xOut: SCRTDoubleVector): void;
    SetYOut(yOut: SCRTDoubleVector): void;
    SetY1Out(y1Out: SCRTDoubleVector): void;
    SetY1Offset(y1Offset: number): void;
    count: number;
    isCategoryData: boolean;
    isFifoSweeping: boolean;
    delete(): void;
}
/**
 *WebAssembly / Native Palette base class, used when drawing per-point fill and strokes with our WebAssembly / WebGL2 Rendering Engine, See {@link SCRTPalette} for concrete implementations.
 */
export declare class SCRTPalette {
    GetOptimizedIndex(colorIndex: number): number;
    delete(): void;
}
export declare class SCRTDoubleArrayOperationIndexedResult {
    min: number;
    max: number;
    index: number;
    delete(): void;
}
export declare class SCRTDoubleArrayOperations {
    CalculateMin(input: SCRTDoubleVector, startIndex: number, endIndex: number): number;
    CalculateMinIndexed(input: SCRTDoubleVector, startIndex: number, endIndex: number): SCRTDoubleArrayOperationIndexedResult;
    delete(): void;
}
export declare class ResamplingArgs {
    Reset(): void;
    Resampling: ResamplingMode;
    Data: ResamplingData;
    StartIndex: number;
    EndIndex: number;
    ViewportWidth: number;
    ResamplingPrecision: number;
    MinXInclusive: number;
    MaxXInclusive: number;
    IsFifo: boolean;
    FifoCapacity: number;
    InputBaseIndex: number;
    HasNaN: boolean;
    ZeroLineY: number;
    NewDataPointCount: number;
    OutputSplitIndex: number;
    delete(): void;
}
export declare class SCRTXvaluesProvider {
    SetInput(input: SCRTDoubleVector): void;
    delete(): void;
}
export declare class SCRTDoubleArraysXyResampleOutput {
    ResetWithIndices(indexesOut: SCRTDoubleVector, xOut: SCRTDoubleVector, yOut: SCRTDoubleVector): void;
    Reset(xOut: SCRTDoubleVector, yOut: SCRTDoubleVector): void;
    OutputSplitIndex: number;
    delete(): void;
}
export declare class SCRTDoubleResampler {
    UpdateIndices(indices: IntVector, xInput: SCRTXvaluesProvider, yInput: SCRTDoubleVector, resamplingMode: ResamplingMode, resamplingArgs: ResamplingArgs): number;
    Execute(xInput: SCRTXvaluesProvider, yInput: SCRTDoubleVector, out: SCRTDoubleArraysXyResampleOutput, indicesOut: IntVector, resamplingMode: ResamplingMode, resamplingArgs: ResamplingArgs): void;
    RequiresReduction(resamplingArgs: ResamplingArgs): boolean;
    MergeIndices(indices: IntVector, size1: number, size2: number, mergedIndicesOut: IntVector): number;
    CopyValuesByIndices(params: SCRTDoubleResamplerMergeIndicesParams): void;
    delete(): void;
}
export declare class StringVector {
    dataPtr(offset: number): number;
    push_back(element: string): void;
    pop_back(): void;
    size(): number;
    resize(size: number, initialValue: string): void;
    reserve(size: number): void;
    clear(): void;
    fill(element: string): void;
    insertAt(index: number, element: string): void;
    removeAt(index: number): void;
    removeRange(index: number, count: number): void;
    delete(): void;
    set(index: number, element: string): void;
    get(index: number): string;
}
/**
 *WebAssembly / Native CoordinateCalculator base class: Converts pixel coordinates to data-values and vice versa
 */
export declare class CoordinateCalculator {
    GetCoordinate(dataValue: number): number;
    GetDataValue(coordinate: number): number;
    CanSupportMatrices(): boolean;
    delete(): void;
}
/**
 *WebAssembly / Native Linear Coordinate Calculator: Converts pixel coordinates to data-values and vice versa. Double precision version.
 */
export declare class LinearCoordinateCalculatorDouble extends CoordinateCalculator {
    delete(): void;
}
/**
 *WebAssembly / Native Flipped Linear Coordinate Calculator: Converts pixel coordinates to data-values and vice versa.  Double precision version. Inverse of {@link FlippedLinearCoordinateCalculatorDouble}
 */
export declare class FlippedLinearCoordinateCalculatorDouble extends CoordinateCalculator {
    delete(): void;
}
/**
 *WebAssembly / Native Linear Coordinate Calculator: Converts pixel coordinates to data-values and vice versa. Float32 version.
 */
export declare class LinearCoordinateCalculatorSingle extends CoordinateCalculator {
    delete(): void;
}
/**
 *WebAssembly / Native Flipped Linear Coordinate Calculator: Converts pixel coordinates to data-values and vice versa. Float32 version. Inverse of {@link LinearCoordinateCalculatorSingle}
 */
export declare class FlippedLinearCoordinateCalculatorSingle extends CoordinateCalculator {
    delete(): void;
}
/**
 *WebAssembly / Native Catetory Coordinate Calculator: Converts pixel coordinates to data-values and vice versa. Uses index not data-value for conversion
 */
export declare class CategoryCoordinateCalculatorDouble extends CoordinateCalculator {
    TransformDataToIndex(dataValue: number, baseXValues: SCRTDoubleVector): number;
    TransformIndexToData(index: number, baseXValues: SCRTDoubleVector): number;
    delete(): void;
}
/**
 *WebAssembly / Native Catetory Coordinate Calculator: Converts pixel coordinates to data-values and vice versa. Uses index not data-value for conversion. Inverse of CategoryCoordinateCalculatorDouble
 */
export declare class FlippedCategoryCoordinateCalculatorDouble extends CoordinateCalculator {
    TransformDataToIndex(dataValue: number, baseXValues: SCRTDoubleVector): number;
    TransformIndexToData(index: number, baseXValues: SCRTDoubleVector): number;
    delete(): void;
}
/**
 *WebAssembly / Native Logarithmic Coordinate Calculator: Converts pixel coordinates to data-values and vice versa. Double precision version.
 */
export declare class LogarithmicCoordinateCalculator extends CoordinateCalculator {
    delete(): void;
}
/**
 *WebAssembly / Native Flipped Logarithmic Coordinate Calculator: Converts pixel coordinates to data-values and vice versa. Double precision version. Inverse of {@link LogarithmicCoordinateCalculator}
 */
export declare class FlippedLogarithmicCoordinateCalculator extends CoordinateCalculator {
    delete(): void;
}
export declare class SCRTFrameRenderer2D extends SCRTFrameRenderer {
    delete(): void;
}
export declare class SCRTFrameRenderer {
    delete(): void;
}
export declare class SCRTLineGapMode {
}
/**
 *WebAssembly / Native Line drawing params passed to {@link SCRTLineSeriesDrawingProvider}
 */
export declare class SCRTLineDrawingParams {
    SetLinesPen(linesPen: SCRTPen): void;
    SetPalettedColors(colorValues: IntVector): void;
    Reset(): void;
    count: number;
    startIndex: number;
    paletteStart: number;
    containsNaN: boolean;
    verticalChart: boolean;
    forceShaderMethod: boolean;
    isDigitalLine: boolean;
    drawDigitalVertical: boolean;
    digitalYX: boolean;
    lineGaps: SCRTLineGapMode;
    forceClamp: boolean;
    delete(): void;
}
/**
 *WebAssembly / Native Pen, used when drawing strokes with our WebAssembly / WebGL2 Rendering Engine
 */
export declare class SCRTPen {
    m_uiColor: number;
    m_fThickness: number;
    m_bGradient: boolean;
    delete(): void;
}
/**
 *WebAssembly / Native Line drawing provider, which draws batched / fast lines using our WebGL2 Rendering Engine
 */
export declare class SCRTLineSeriesDrawingProvider {
    DrawLines(nativeContext: SCRTRenderContext, xValues: number, yValues: number, xCoordinateCalculator: CoordinateCalculator, yCoordinateCalculator: CoordinateCalculator, params: SCRTLineDrawingParams): void;
    DrawLinesVec(nativeContext: SCRTRenderContext, xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, xCoordinateCalculator: CoordinateCalculator, yCoordinateCalculator: CoordinateCalculator, params: SCRTLineDrawingParams): void;
    delete(): void;
}
/**
 *WebAssembly / Native Drawing or Render Context. Contains functions with drawing commands to access our fast WebGL2 Rendering Engine
 */
export declare class SCRTRenderContext {
    SetClearColor(red: number, green: number, blue: number, alpha: number): void;
    Clear(): void;
    SetViewport(x: number, y: number, width: number, height: number): void;
    OnFrameBegin(): void;
    PushMatrix(): void;
    PopMatrix(): void;
    PushState(): void;
    PopState(): void;
    SetClipRect(x: number, y: number, width: number, height: number): void;
    Scale(x: number, y: number): void;
    Rotate(angle: number): void;
    Translate(x: number, y: number): void;
    DrawLinesBatch(strips: boolean, vertices: SCRTColorVertex, count: number, pen: SCRTPen, brush: SCRTTextureBrush): void;
    DrawLinesBatchVec(strips: boolean, points: VectorColorVertex, pen: SCRTPen): void;
    DrawLinesBatchTextureVec(strips: boolean, points: VectorColorVertex, pen: SCRTPen, textureBrush: SCRTTextureBrush): void;
    DrawRectsBatchVec(rects: VectorRectVertex, brush: SCRTBrush, anchorparams: TSRVector4): void;
    DrawTexture(texture: TSRTexture, x: number, y: number, width: number, height: number): void;
    DrawHeatmapRect(gradientTexture: TSRTexture, heatmapTexture: TSRTexture, x: number, y: number, width: number, height: number, packedFloatParams: TSRVector4): void;
    DrawHeatmapRectWithContours(gradientTexture: TSRTexture, heatmapTexture: TSRTexture, x: number, y: number, width: number, height: number, packedFloatParams: TSRVector4, contourParams: SCRTContourParams): void;
    AddSeriesEffect(pSeriesEffect: SCRTSeriesEffect): void;
    RemoveSeriesEffect(pSeriesEffect: SCRTSeriesEffect): void;
    ClearSeriesEffects(): void;
    SetBlendMode(blendMode: eSCRTBlendMode): void;
    GetBlendMode(): eSCRTBlendMode;
    CreateTextTexture(fontKey: SCRTFontKey, text: string): TSRTexture;
    CreateTextTextureColored(fontKey: SCRTFontKey, text: string, frontColor: number, backColor: number): TSRTexture;
    AquireFont(fontKey: SCRTFontKey): SCRTFont;
    delete(): void;
}
/**
 *WebAssembly / Native Scatter Point drawing params passed to {@link SCRTScatterSeriesDrawingProvider}
 */
export declare class SCRTHeatmapDrawingParams {
    delete(): void;
}
/**
 *WebAssembly / Native Heatmap drawing provider, which draws non-uniform hetamaps our WebGL2 Rendering Engine
 */
export declare class SCRTHeatmapSeriesDrawingProvider {
    DrawHeatmapNonUniform(nativeContext: SCRTRenderContext, _xSpacings: SCRTDoubleVector, _ySpacings: SCRTDoubleVector, zValues: SCRTDoubleVector, xCalc: CoordinateCalculator, yCalc: CoordinateCalculator, params: SCRTHeatmapDrawingParams): void;
    delete(): void;
}
/**
 *WebAssembly / Native Scatter Point drawing params passed to {@link SCRTScatterSeriesDrawingProvider}
 */
export declare class SCRTPointDrawingParams {
    SetSpriteTexture(pointTexture: TSRTexture): void;
    SetStrokeMask(strokeMask: TSRTexture): void;
    SetPalettedColors(palettedColors: IntVector): void;
    Reset(): void;
    count: number;
    startIndex: number;
    paletteStart: number;
    verticalChart: boolean;
    forceShaderMethod: boolean;
    zMultiplier: number;
    delete(): void;
}
/**
 *WebAssembly / Native Scatter Point drawing provider, which draws batched / fast points using our WebGL2 Rendering Engine
 */
export declare class SCRTScatterSeriesDrawingProvider {
    DrawPoints(nativeContext: SCRTRenderContext, xValues: number, yValues: number, xCoordinateCalculator: CoordinateCalculator, yCoordinateCalculator: CoordinateCalculator, params: SCRTPointDrawingParams): void;
    DrawPointsVec(nativeContext: SCRTRenderContext, xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, xCoordinateCalculator: CoordinateCalculator, yCoordinateCalculator: CoordinateCalculator, params: SCRTPointDrawingParams): void;
    delete(): void;
}
/**
 *WebAssembly / Native OHLC/Candlestick drawing params passed to {@link SCRTCandlestickSeriesDrawingProvider}
 */
export declare class SCRTOhlcDrawingParams {
    SetPens(strokeUpPen: SCRTPen, strokeDownPen: SCRTPen): void;
    SetBrushes(fillUpBrush: SCRTBrush, fillDownBrush: SCRTBrush): void;
    SetValues(xValues: SCRTDoubleVector, openValues: SCRTDoubleVector, highValues: SCRTDoubleVector, lowValues: SCRTDoubleVector, closeValues: SCRTDoubleVector): void;
    SetPalettedColors(palettedColors: IntVector): void;
    Reset(): void;
    count: number;
    startIndex: number;
    paletteStart: number;
    verticalChart: boolean;
    forceShaderMethod: boolean;
    candleWidth: number;
    drawAsOhlc: boolean;
    delete(): void;
}
/**
 *WebAssembly / Native Brush base class, used when drawing strokes with our WebAssembly / WebGL2 Rendering Engine, See {@link SCRTSolidBrush} and {@link SCRTTextureBrush} for concrete implementations.
 */
export declare class SCRTBrush {
    GetColor(): number;
    SetColor(uiColor: number): void;
    GetTransparent(): boolean;
    SetTransparent(transparent: boolean): void;
    GetOpacity(): number;
    SetOpacity(opacity: number): void;
    delete(): void;
}
/**
 *WebAssembly / Native Candlestick drawing provider, which draws batched / fast candles using our WebGL2 Rendering Engine
 */
export declare class SCRTCandlestickSeriesDrawingProvider {
    DrawPointsVec(nativeContext: SCRTRenderContext, xCoordinateCalculator: CoordinateCalculator, yCoordinateCalculator: CoordinateCalculator, params: SCRTOhlcDrawingParams): void;
    delete(): void;
}
/**
 *WebAssembly / Native Mountain/Area drawing params passed to {@link SCRTMountainSeriesDrawingProvider}
 */
export declare class SCRTMountainDrawingParams {
    SetLinesPen(strokePen: SCRTPen): void;
    SetFillBrush(fillBrush: SCRTBrush): void;
    SetPalette(palette: SCRTPalette): void;
    Reset(): void;
    count: number;
    startIndex: number;
    verticalChart: boolean;
    forceShaderMethod: boolean;
    isDigitalLine: boolean;
    isSmoothColors: boolean;
    lineGaps: SCRTLineGapMode;
    zeroLineY: number;
    delete(): void;
}
/**
 *WebAssembly / Native Mountain/Area drawing provider, which draws batched / fast areas using our WebGL2 Rendering Engine
 */
export declare class SCRTMountainSeriesDrawingProvider {
    DrawPointsVec(nativeContext: SCRTRenderContext, xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, xCoordinateCalculator: CoordinateCalculator, yCoordinateCalculator: CoordinateCalculator, params: SCRTMountainDrawingParams): void;
    delete(): void;
}
/**
 *WebAssembly / Native Band drawing params passed to {@link SCRTBandSeriesDrawingProvider}
 */
export declare class SCRTBandDrawingParams {
    SetLinesPen(strokePen: SCRTPen): void;
    SetFillBrush(fillBrush: SCRTBrush): void;
    SetLinesPen1(strokePen: SCRTPen): void;
    SetFillBrush1(fillBrush: SCRTBrush): void;
    SetPalette(palette: SCRTPalette): void;
    Reset(): void;
    count: number;
    startIndex: number;
    verticalChart: boolean;
    forceShaderMethod: boolean;
    forceClamp: boolean;
    isDigitalLine: boolean;
    isSmoothColors: boolean;
    lineGaps: SCRTLineGapMode;
    delete(): void;
}
/**
 *WebAssembly / Native Band polygon drawing provider, which draws batched / fast bands using our WebGL2 Rendering Engine
 */
export declare class SCRTBandSeriesDrawingProvider {
    DrawPointsVec(nativeContext: SCRTRenderContext, xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, y1Values: SCRTDoubleVector, xCoordinateCalculator: CoordinateCalculator, yCoordinateCalculator: CoordinateCalculator, params: SCRTBandDrawingParams): void;
    delete(): void;
}
/**
 *WebAssembly / Native Column drawing params passed to {@link SCRTColumnSeriesDrawingProvider}
 */
export declare class SCRTColumnDrawingParams {
    SetLinesPen(strokePen: SCRTPen): void;
    SetFillBrush(fillBrush: SCRTBrush): void;
    SetPalettedColors(palettedColors: IntVector): void;
    Reset(): void;
    count: number;
    startIndex: number;
    paletteStart: number;
    verticalChart: boolean;
    forceShaderMethod: boolean;
    zeroLineY: number;
    columnWidth: number;
    viewportWidth: number;
    viewportHeight: number;
    topRadius: number;
    bottomRadius: number;
    delete(): void;
}
/**
 *WebAssembly / Native Stacked Columns drawing provider, which draws batched / fast stacked columns using our WebGL2 Rendering Engine
 */
export declare class SCRTStackedColumnSeriesDrawingProvider {
    DrawPointsVec(nativeContext: SCRTRenderContext, xValues: SCRTDoubleVector, topValues: SCRTDoubleVector, bottomValues: SCRTDoubleVector, xCoordinateCalculator: CoordinateCalculator, yCoordinateCalculator: CoordinateCalculator, params: SCRTStackedColumnDrawingParams): void;
    delete(): void;
}
/**
 *WebAssembly / Native Stacked Column drawing params passed to {@link SCRTStackedColumnSeriesDrawingProvider}
 */
export declare class SCRTStackedColumnDrawingParams {
    SetLinesPen(strokePen: SCRTPen): void;
    SetFillBrush(fillBrush: SCRTBrush): void;
    count: number;
    startIndex: number;
    columnWidth: number;
    spacing: number;
    viewportWidth: number;
    viewportHeight: number;
    verticalChart: boolean;
    forceShaderMethod: boolean;
    stackedGroupCount: number;
    stackedGroupIndex: number;
    delete(): void;
}
export declare class SCRTSeriesEffectType {
}
/**
 *WebAssembly / Native Shader effect base class. See {@link SCRTGlowEffect} and {@link SCRTShadowEffect} for concrete implementations
 */
export declare class SCRTSeriesEffect {
    GetIntensity(): number;
    SetIntensity(fIntensity: number): void;
    GetRange(): number;
    SetRange(fRange: number): void;
    GetOffset(): TSRVector2;
    SetOffset(yOffset: TSRVector2): void;
    GetColor(): TSRVector4;
    SetColor(yColor: TSRVector4): void;
    delete(): void;
}
export declare class TSRVector2 {
    x: number;
    y: number;
    delete(): void;
}
/**
 *WebAssembly / Native Shader effect which adds a glow to drawing operations. Apply by using {@link SCRTRenderContext.AddSeriesEffect} and {@link SCRTRenderContext.RemoveSeriesEffect}
 */
export declare class SCRTGlowEffect extends SCRTSeriesEffect {
    delete(): void;
}
/**
 *WebAssembly / Native Shader effect which adds a shadow to drawing operations. Apply by using {@link SCRTRenderContext.AddSeriesEffect} and {@link SCRTRenderContext.RemoveSeriesEffect}
 */
export declare class SCRTShadowEffect extends SCRTSeriesEffect {
    delete(): void;
}
/**
 *WebAssembly / Native Columns drawing provider, which draws batched / fast columns using our WebGL2 Rendering Engine
 */
export declare class SCRTColumnSeriesDrawingProvider {
    DrawPoints(nativeContext: SCRTRenderContext, xValues: number, yValues: number, xCoordinateCalculator: CoordinateCalculator, yCoordinateCalculator: CoordinateCalculator, params: SCRTColumnDrawingParams): void;
    DrawPointsVec(nativeContext: SCRTRenderContext, xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, xCoordinateCalculator: CoordinateCalculator, yCoordinateCalculator: CoordinateCalculator, params: SCRTColumnDrawingParams): void;
    delete(): void;
}
/**
 *WebAssembly / Native Bubbles drawing provider, which draws batched / fast bubbles using our WebGL2 Rendering Engine
 */
export declare class SCRTBubbleSeriesDrawingProvider {
    DrawPoints(nativeContext: SCRTRenderContext, xValues: number, yValues: number, zValues: number, xCoordinateCalculator: CoordinateCalculator, yCoordinateCalculator: CoordinateCalculator, params: SCRTPointDrawingParams): void;
    DrawPointsVec(nativeContext: SCRTRenderContext, _xValues: SCRTDoubleVector, yValues: SCRTDoubleVector, zValues: SCRTDoubleVector, xCoordinateCalculator: CoordinateCalculator, yCoordinateCalculator: CoordinateCalculator, params: SCRTPointDrawingParams): void;
    delete(): void;
}
export declare class SCRT2DRenderingPipeline {
    Begin(): void;
    End(): void;
    delete(): void;
}
export declare class SCRTLineType {
}
export declare class SCRTSpriteType {
}
export declare class SCRTCandleType {
}
/**
 *WebAssembly / Native Solid Color Brush, used when drawing strokes with our WebAssembly / WebGL2 Rendering Engine
 */
export declare class SCRTSolidBrush extends SCRTBrush {
    delete(): void;
}
export declare class eSCRTBrushMappingMode {
}
/**
 *WebAssembly / Native Texture Brush, used when drawing strokes with our WebAssembly / WebGL2 Rendering Engine
 */
export declare class SCRTTextureBrush extends SCRTBrush {
    GetTexture(): TSRTexture;
    SetTexture(texture: TSRTexture): void;
    GetMappingMode(): eSCRTBrushMappingMode;
    SetMappingMode(mappingMode: eSCRTBrushMappingMode): void;
    delete(): void;
}
export declare class SCRTContourParams {
    SetColorVector(x: number, y: number, z: number, w: number): void;
    SetParamsAVector(x: number, y: number, z: number, w: number): void;
    SetParamsBVector(x: number, y: number, z: number, w: number): void;
    m_vColor: TSRVector4;
    m_vParamsA: TSRVector4;
    m_vParamsB: TSRVector4;
    delete(): void;
}
export declare class eSCRTBlendMode {
}
/**
 *WebAssembly / Native Color vertex type. Includes {@link TSRVector3} position and integer color in RGBA format
 */
export declare class SCRTColorVertex {
    SetPosition(x: number, y: number): void;
    SetColor(color: number): void;
    m_vPosition: TSRVector3;
    m_uiColor: number;
    delete(): void;
}
export declare class VectorColorVertex {
    dataPtr(offset: number): number;
    push_back(element: SCRTColorVertex): void;
    pop_back(): void;
    size(): number;
    resize(size: number, initialValue: SCRTColorVertex): void;
    reserve(size: number): void;
    clear(): void;
    fill(element: SCRTColorVertex): void;
    insertAt(index: number, element: SCRTColorVertex): void;
    removeAt(index: number): void;
    removeRange(index: number, count: number): void;
    delete(): void;
    set(index: number, element: SCRTColorVertex): void;
    get(index: number): SCRTColorVertex;
}
/**
 *WebAssembly / Native Rect vertex type. Includes {@link TSRVector3} position, {@link TSRVector2} size and integer color in RGBA format
 */
export declare class SCRTRectVertex {
    Assign(left: number, top: number, right: number, bottom: number): void;
    m_vPosition: TSRVector2;
    m_vSize: TSRVector2;
    m_uiColor: number;
    delete(): void;
}
export declare class VectorRectVertex {
    dataPtr(offset: number): number;
    push_back(element: SCRTRectVertex): void;
    pop_back(): void;
    size(): number;
    resize(size: number, initialValue: SCRTRectVertex): void;
    reserve(size: number): void;
    clear(): void;
    fill(element: SCRTRectVertex): void;
    insertAt(index: number, element: SCRTRectVertex): void;
    removeAt(index: number): void;
    removeRange(index: number, count: number): void;
    delete(): void;
    set(index: number, element: SCRTRectVertex): void;
    get(index: number): SCRTRectVertex;
}
export declare class SCRTFontKey {
    m_strName: string;
    m_uiSize: number;
    m_reload: boolean;
    delete(): void;
}
export declare class WStringVector {
    dataPtr(offset: number): number;
    push_back(element: string): void;
    pop_back(): void;
    size(): number;
    resize(size: number, initialValue: string): void;
    reserve(size: number): void;
    clear(): void;
    fill(element: string): void;
    insertAt(index: number, element: string): void;
    removeAt(index: number): void;
    removeRange(index: number, count: number): void;
    delete(): void;
    set(index: number, element: string): void;
    get(index: number): string;
}
export declare class SCRTFont extends TSRFont {
    DrawString(text: string, color: number, x: number, y: number): void;
    DrawStringAdvanced(text: string, color: number, x: number, y: number, rotationDepth: TSRVector4, alignment: eTSRTextAlignMode, lineSpacing: number): void;
    CalculateStringBounds(text: string, bounds: TSRTextBounds, lineSpacing: number): void;
    IsAdvanced(): boolean;
    GetFaceName(): string;
    GetSize(): number;
    GetScale(): number;
    SetScale(scale: number): void;
    delete(): void;
}
export declare class TSRVector3 {
    Normalize(): void;
    Dot(param0: TSRVector3): number;
    Cross(param0: TSRVector3, param1: TSRVector3): void;
    Assign(x: number, y: number, z: number): void;
    x: number;
    y: number;
    z: number;
    delete(): void;
}
/**
 *WebAssembly / Native Column vertex type. Includes {@link TSRVector3} position, width, height, fill and stroke color in RGBA format
 */
export declare class SCRTColumnVertex {
    m_vPosition: TSRVector2;
    m_fWidth: number;
    m_fHeight: number;
    m_uiFillColor: number;
    m_uiStrokeColor: number;
    delete(): void;
}
export declare class VectorColumnVertex {
    dataPtr(offset: number): number;
    push_back(element: SCRTColumnVertex): void;
    pop_back(): void;
    size(): number;
    resize(size: number, initialValue: SCRTColumnVertex): void;
    reserve(size: number): void;
    clear(): void;
    fill(element: SCRTColumnVertex): void;
    insertAt(index: number, element: SCRTColumnVertex): void;
    removeAt(index: number): void;
    removeRange(index: number, count: number): void;
    delete(): void;
    set(index: number, element: SCRTColumnVertex): void;
    get(index: number): SCRTColumnVertex;
}
/**
 *WebAssembly / Native Double-precision 64-bit Range object. A tuple which contains min and max values.
 */
export declare class DoubleRange {
    minD: number;
    maxD: number;
    delete(): void;
}
export declare class SCRTFindIndexSearchMode {
}
/**
 *WebAssembly / Native numerical methods with access to common functions and operations.
 */
export declare class NumberUtil {
    delete(): void;
}
/**
 *WebAssembly / Native helper methods for HitTest
 */
export declare class SCRTHitTestHelper {
    delete(): void;
}
/**
 *WebAssembly / Native numerical methods for calculating tick spacing and scaling on axis.
 */
export declare class NiceDoubleScale {
    delete(): void;
}
/**
 *WebAssembly / Native numerical methods for calculating logarithmic tick spacing and scaling on axis.
 */
export declare class NiceLogScale {
    delete(): void;
}
export declare class SCRTLicenseType {
}
/**
 *@ignore
 */
export declare class SCRTCredentials {
    delete(): void;
}
export declare class SCRTWaterMarkProperties {
    SetPosition(position: TSRVector2): void;
    SetOpacity(opacity: number): void;
    m_fCanvasWidth: number;
    m_bIsDarkBackground: boolean;
    delete(): void;
}
export declare class eTSRPlatform {
}
export declare class eVariableUsage {
}
export declare class eTSRMetaDataType {
}
export declare class eTSRRendererType {
}
export declare class eTSRCameraProjectionMode {
}
export declare class TSRCamera {
    SetLoc(location: TSRVector3): void;
    GetLoc(): TSRVector3;
    SetAt(target: TSRVector3): void;
    GetAt(): TSRVector3;
    SetUp(upVector: TSRVector3): void;
    GetUp(): TSRVector3;
    SetFarClip(farClip: number): void;
    GetFarClip(): number;
    SetNearClip(nearClip: number): void;
    GetNearClip(): number;
    SetFovAngle(fovRadians: number): void;
    GetFovAngle(): number;
    SetProjectionMode(projectionMode: eTSRCameraProjectionMode): void;
    GetProjectionMode(): eTSRCameraProjectionMode;
    SetOrthoWidth(orthoWidth: number): void;
    GetOrthoWidth(): number;
    SetOrthoHeight(orthoHeight: number): void;
    GetOrthoHeight(): number;
    SetAspectRatio(aspectRatio: number): void;
    GetAspectRatio(): number;
    SetYaw(yawRadians: number): void;
    GetYaw(): number;
    SetPitch(pitchRadians: number): void;
    GetPitch(): number;
    SetRoll(rollRadians: number): void;
    GetRoll(): number;
    ComputeVectorsFromAngles(): void;
    delete(): void;
}
export declare class eTSRTextAlignMode {
}
export declare class TSRTextLineBounds {
    m_fWidth: number;
    m_fHeight: number;
    m_fOffsetX: number;
    m_fOffsetY: number;
    delete(): void;
}
export declare class TSRTextBounds {
    GetLinesCount(): number;
    GetLineBounds(lineIndex: number): TSRTextLineBounds;
    m_fWidth: number;
    m_fHeight: number;
    delete(): void;
}
export declare class TSRFont {
    Begin(): void;
    End(): void;
    m_isDrawing: boolean;
    delete(): void;
}
export declare class SCRTSampleChartInterface {
    InitializeChart(): void;
    Draw(canvasId: string): void;
    Update(deltaTime: number): void;
    ShutDownChart(): void;
    SetFPSCounterEnabled(enabled: boolean): void;
    AddDestination(elementID: SCRTSurfaceDestination): void;
    ClearDestinations(): void;
    GetCurrentDestination(): SCRTSurfaceDestination;
    SetFrameRenderer(frameRenderer: SCRTFrameRenderer): void;
    GetFrameRenderer(): SCRTFrameRenderer;
    SetWasmBufferSizesKb(_iBufferSizeKb: number): void;
    delete(): void;
}
export declare class SCRTSampleChartInterfaceWrapper {
    InitializeChart(): void;
    Draw(canvasId: string): void;
    Update(deltaTime: number): void;
    ShutDownChart(): void;
}
export declare class SCRTCopyToDestinationInterface {
    CopyToDestination(destinationID: string): void;
    delete(): void;
}
export declare class SCRTCopyToDestinationInterfaceWrapper {
    CopyToDestination(destinationID: string): void;
}
export declare class SCRTFileLoadCallbackInterface {
    OnLoadComplete(success: boolean, message: string): void;
    delete(): void;
}
export declare class SCRTFileLoadCallbackInterfaceWrapper {
    OnLoadComplete(success: boolean, message: string): void;
}
export declare class SCRTSurfaceDestination {
    GetWidth(): number;
    GetHeight(): number;
    GetID(): string;
    delete(): void;
}
export declare class SCRTSurfaceDestinationWrapper {
    GetWidth(): number;
    GetHeight(): number;
    GetID(): string;
}
