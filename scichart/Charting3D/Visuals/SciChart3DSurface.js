"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SciChart3DSurface = exports.sciChartConfig3D = void 0;
var SciChartSurfaceBase_1 = require("../../Charting/Visuals/SciChartSurfaceBase");
var DpiHelper_1 = require("../../Charting/Visuals/TextureManager/DpiHelper");
var app_1 = require("../../constants/app");
var Deleter_1 = require("../../Core/Deleter");
var ObservableArray_1 = require("../../Core/ObservableArray");
var Point_1 = require("../../Core/Point");
var CameraController_1 = require("../CameraController");
var Vector3_1 = require("../Vector3");
var AxisCubeEntity_1 = require("./Axis/AxisCubeEntity");
var Constants_1 = require("./Constants");
var createMaster3d_1 = require("./createMaster3d");
var createSingle3d_1 = require("./createSingle3d");
var DefaultViewportManager3D_1 = require("./DefaultViewportManager3D");
var GizmoEntity_1 = require("./GizmoEntity");
var RootSceneEntity_1 = require("./RootSceneEntity");
var SciChart3DRenderer_1 = require("./SciChart3DRenderer");
var BuildStamp_1 = require("../../Core/BuildStamp");
var SciChartDefaults_1 = require("../../Charting/Visuals/SciChartDefaults");
var WebGlHelper_1 = require("../../Core/WebGlHelper");
var Globals_1 = require("../../Core/Globals");
var createMaster_1 = require("../../Charting/Visuals/createMaster");
var EventHandler_1 = require("../../Core/EventHandler");
var Thickness_1 = require("../../Core/Thickness");
var perfomance_1 = require("../../utils/perfomance");
var Rect_1 = require("../../Core/Rect");
var translate_1 = require("../../utils/translate");
var logger_1 = require("../../utils/logger");
exports.sciChartConfig3D = {};
/**
 * @summary The {@link SciChart3DSurface} is the root 3D Chart control in SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Chart Library}
 * @description
 * To create a 3D chart using SciChart, declare a {@link SciChart3DSurface} using {@link SciChart3DSurface.create},
 * add X,Y,Z axis via the {@link SciChart3DSurface.xAxis} {@link SciChart3DSurface.yAxis} and {@link SciChart3DSurface.zAxis} properties.
 *
 * Next, add a series or chart type by adding a {@link BaseRenderableSeries3D} to the {@link SciChart3DSurface.renderableSeries} collection.
 *
 * Position the camera in the 3D scene by adjusting the {@link SciChart3DSurface.camera} property.
 *
 * To redraw a {@link SciChart3DSurface} at any time, call {@link SciChart3DSurface.invalidateElement}, however all properties are reactive and the
 * chart will automatically redraw if data or properties change.
 * @remarks
 * {@link SciChart3DSurface | SciChartSurfaces} scale to fit the parent DIV where they are hosted. Use CSS to position the DIV.
 */
var SciChart3DSurface = /** @class */ (function (_super) {
    __extends(SciChart3DSurface, _super);
    /**
     * Creates an instance of {@link SciChart3DSurface}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link ISciChart3DSurfaceOptions} to configure the chart
     */
    function SciChart3DSurface(webAssemblyContext, options) {
        var _this = this;
        var _a, _b, _c, _d;
        _this = _super.call(this, webAssemblyContext, options === null || options === void 0 ? void 0 : options.canvases) || this;
        /** The position of the watermark for trials and community licenses */
        _this.watermarkPosition = SciChartDefaults_1.SciChartDefaults.watermarkPosition;
        /**
         * An event handler which notifies its subscribers when a render operation starts. Use this
         * to update elements of the chart for the current render.  Any updates made here will not trigger a subsequent render.
         */
        _this.preRender = new EventHandler_1.EventHandler();
        _this.animationList = [];
        _this.isAxisCubeRenderedProperty = false;
        _this.isHitTestEnabledProperty = false;
        var canvasWidth = (_b = (_a = _this.domCanvas2D) === null || _a === void 0 ? void 0 : _a.width) !== null && _b !== void 0 ? _b : app_1.DEFAULT_WIDTH;
        var canvasHeight = (_d = (_c = _this.domCanvas2D) === null || _c === void 0 ? void 0 : _c.height) !== null && _d !== void 0 ? _d : app_1.DEFAULT_HEIGHT;
        _this.webAssemblyContext3D = webAssemblyContext;
        if (!app_1.IS_TEST_ENV) {
            var canvasPixelWidth = canvasWidth / DpiHelper_1.DpiHelper.PIXEL_RATIO;
            var canvasPixelHeight = canvasHeight / DpiHelper_1.DpiHelper.PIXEL_RATIO;
            if (_this.isCopyCanvasSurface) {
                _this.changeMasterCanvasViewportSize(webAssemblyContext, canvasPixelWidth, canvasPixelHeight);
            }
            else {
                _this.changeWebGLCanvasViewportSize(webAssemblyContext, canvasPixelWidth, canvasPixelHeight);
            }
        }
        _this.invalidateElement = _this.invalidateElement.bind(_this);
        _this.sciChart3DRenderer = new SciChart3DRenderer_1.SciChart3DRenderer(_this, webAssemblyContext);
        // Set default viewportManager
        _this.viewportManager = new DefaultViewportManager3D_1.DefaultViewportManager3D(canvasWidth, canvasHeight);
        // Set default WorldDimensions
        _this.worldDimensionsProperty = (options === null || options === void 0 ? void 0 : options.worldDimensions) || new Vector3_1.Vector3(300, 200, 300);
        // Setup series
        _this.detachSeries = _this.detachSeries.bind(_this);
        _this.attachSeries = _this.attachSeries.bind(_this);
        _this.renderableSeries = new ObservableArray_1.ObservableArray();
        _this.renderableSeries.collectionChanged.subscribe(function (args) {
            var _a, _b;
            (_a = args.getOldItems()) === null || _a === void 0 ? void 0 : _a.forEach(function (rs) { return _this.detachSeries(rs); });
            (_b = args.getNewItems()) === null || _b === void 0 ? void 0 : _b.forEach(function (rs) { return _this.attachSeries(rs); });
        });
        // Set default scene
        _this.childPropertyChanged = _this.childPropertyChanged.bind(_this);
        _this.sceneWorldProperty = new _this.webAssemblyContext3D.SCRTSceneWorld();
        _this.sceneWorldProperty.Init();
        _this.rootEntity = new RootSceneEntity_1.RootSceneEntity(webAssemblyContext, _this);
        _this.axisCubeEntity = new AxisCubeEntity_1.AxisCubeEntity(webAssemblyContext, _this);
        _this.rootEntity.children.add(_this.axisCubeEntity);
        _this.gizmoEntity = new GizmoEntity_1.GizmoEntity(webAssemblyContext);
        _this.gizmoEntity.enableGizmo = true;
        _this.rootEntity.children.add(_this.gizmoEntity);
        // Watermark
        if (!app_1.IS_TEST_ENV) {
            _this.watermarkProperties = new webAssemblyContext.SCRTWaterMarkProperties();
            _this.watermarkProperties.m_fCanvasWidth = 0;//canvasWidth;
            _this.watermarkPropertyPosition = new webAssemblyContext.TSRVector2(0, 0);
            _this.watermarkProperties.SetPosition(_this.watermarkPropertyPosition);
            _this.watermarkProperties.SetOpacity(0);
            webAssemblyContext.SCRT3DSetWaterMarkProperties(_this.watermarkProperties);
        }
        return _this;
    }
    /**
     * USED INTERNALLY - performs a similar operation to {@link SciChart3DSurface.create} but used internally for testing
     * @param divElement The Div Element ID or reference where the {@link SciChartSurface} will reside
     * @param options Optional parameters of type {@link I3DSurfaceOptions}
     */
    SciChart3DSurface.createSingle = function (divElement, options) {
        var startMark = perfomance_1.PerformanceDebugHelper.mark(perfomance_1.EPerformanceMarkType.InitializationStart, {
            contextId: options === null || options === void 0 ? void 0 : options.id
        });
        return (0, createSingle3d_1.createSingle3dInternal)(divElement, options).then(function (result) {
            var _a;
            result.sciChart3DSurface.applyOptions(options);
            perfomance_1.PerformanceDebugHelper.mark(perfomance_1.EPerformanceMarkType.InitializationEnd, {
                contextId: result.sciChart3DSurface.id,
                relatedId: (_a = startMark === null || startMark === void 0 ? void 0 : startMark.detail) === null || _a === void 0 ? void 0 : _a.relatedId
            });
            return result;
        });
    };
    /**
     * Allows setting of web URL for Wasm and Data files, in the case you are loading SciChart outside of npm/webpack environment.
     * Note if loading from CDN the version number of data/wasm Urls must match the version number of SciChart.js you are using.
     * @example
     * ```ts
     * // 3D Charts
     * SciChart.SciChart3DSurface.configure({
     *  dataUrl: "https://cdn.jsdelivr.net/npm/scichart@2.2.2378/_wasm/scichart3d.data",
     *  wasmUrl: "https://cdn.jsdelivr.net/npm/scichart@2.2.2378/_wasm/scichart3d.wasm"
     * });
     * ```
     * @param config
     */
    SciChart3DSurface.configure = function (config) {
        var _a, _b;
        exports.sciChartConfig3D.dataUrl = (_a = config === null || config === void 0 ? void 0 : config.dataUrl) !== null && _a !== void 0 ? _a : undefined;
        exports.sciChartConfig3D.wasmUrl = (_b = config === null || config === void 0 ? void 0 : config.wasmUrl) !== null && _b !== void 0 ? _b : undefined;
    };
    /**
     * Tell SciChart to load the Wasm and Data files from CDN, rather than expecting them to be served by the host server.
     * @deprecated the method name breaks [eslint react-hooks/rules-of-hooks](https://legacy.reactjs.org/docs/hooks-rules.html).
     * To avoid this error in React, use {@link loadWasmFromCDN} instead.
     */
    SciChart3DSurface.useWasmFromCDN = function () {
        exports.sciChartConfig3D.dataUrl = "https://cdn.jsdelivr.net/npm/scichart@".concat(BuildStamp_1.libraryVersion, "/_wasm/scichart3d.data");
        exports.sciChartConfig3D.wasmUrl = "https://cdn.jsdelivr.net/npm/scichart@".concat(BuildStamp_1.libraryVersion, "/_wasm/scichart3d.wasm");
    };
    /**
     * Tell SciChart to load the Wasm and Data files from CDN, rather than expecting them to be served by the host server.
     */
    SciChart3DSurface.loadWasmFromCDN = function () {
        return SciChart3DSurface.useWasmFromCDN();
    };
    /**
     * Tell SciChart to load the Wasm and Data files from the local server, rather than from CDN.
     */
    SciChart3DSurface.loadWasmLocal = function () {
        return SciChart3DSurface.configure(undefined);
    };
    /**
     * Creates a {@link SciChart3DSurface} and {@link TSciChart3D | WebAssembly Context} to occupy the div by element ID in your DOM.
     * @remarks This method is async and must be awaited
     * @param divElementId The ID or reference of Div Element where the {@link SciChart3DSurface} will reside
     * @param options Optional parameters of type {@link I3DSurfaceOptions}
     */
    SciChart3DSurface.create = function (divElementId, options) {
        var mark = perfomance_1.PerformanceDebugHelper.mark(perfomance_1.EPerformanceMarkType.InitializationStart, { contextId: options === null || options === void 0 ? void 0 : options.id });
        return (0, createMaster3d_1.createMultichart3d)(divElementId, options).then(function (result) {
            var _a, _b;
            result.sciChart3DSurface.applyOptions(options);
            perfomance_1.PerformanceDebugHelper.mark(perfomance_1.EPerformanceMarkType.InitializationEnd, {
                contextId: (_a = result.sciChart3DSurface) === null || _a === void 0 ? void 0 : _a.id,
                relatedId: (_b = mark === null || mark === void 0 ? void 0 : mark.detail) === null || _b === void 0 ? void 0 : _b.relatedId
            });
            return result;
        });
    };
    SciChart3DSurface.disposeSharedWasmContext = function () {
        if (Globals_1.sciChart3DDestinations.length === 0 && Globals_1.sciChartDestinations.length === 0) {
            (0, createMaster_1.disposeMultiChart)();
            (0, createMaster3d_1.disposeMultiChart3d)();
        }
        _super.disposeSharedWasmContext.call(this);
    };
    /**
     * Used internally: Gets the {@link SCRTSceneWorld} object at the root of the 3d scene graph
     */
    SciChart3DSurface.prototype.getSceneWorld = function () {
        return this.sceneWorldProperty;
    };
    /**
     * Converts a 3D Xyz coordinate in world coordinates space to a screen coordinate (2d) in pixels.
     * This allows you to get the 2D screen coordinate of any object or vertex in the 3D scene.
     * @remarks Note: Conversions to/from world/data space must be performed using the {@link AxisBase3D.getCurrentCoordinateCalculator()}
     * API, which returns {@link CoordinateCalculatorBase}. Functions {@link CoordinateCalculatorBase.getDataValue} and
     * {@link CoordinateCalculatorBase.getCoordinate} convert to/from world coords/data space
     * @param worldCoordXyz The 3D Xyz coordinate
     * @returns The 2D screen coordinate in pixels
     */
    SciChart3DSurface.prototype.worldToScreenCoord = function (worldCoordXyz) {
        var sceneWorld = this.getSceneWorld();
        if (!sceneWorld)
            return undefined;
        var tsrWorldXyz = worldCoordXyz.toTsrVector3(this.webAssemblyContext3D);
        var tsrScreen2D = sceneWorld.TransformWorldToScreenCoords(tsrWorldXyz);
        var screen2D = new Point_1.Point(tsrScreen2D.x, tsrScreen2D.y);
        tsrScreen2D.delete();
        tsrWorldXyz.delete();
        return screen2D;
    };
    /**
     * @inheritdoc
     */
    SciChart3DSurface.prototype.delete = function (clearHtml) {
        if (clearHtml === void 0) { clearHtml = true; }
        this.renderableSeries.asArray().forEach(function (el) { return el.delete(); });
        this.renderableSeries.clear();
        this.xAxis = (0, Deleter_1.deleteSafe)(this.xAxis);
        this.yAxis = (0, Deleter_1.deleteSafe)(this.yAxis);
        this.zAxis = (0, Deleter_1.deleteSafe)(this.zAxis);
        this.rootEntity = (0, Deleter_1.deleteSafe)(this.rootEntity);
        this.watermarkProperties = (0, Deleter_1.deleteSafe)(this.watermarkProperties);
        this.watermarkPropertyPosition = (0, Deleter_1.deleteSafe)(this.watermarkPropertyPosition);
        this.sceneWorldProperty = (0, Deleter_1.deleteSafe)(this.sceneWorldProperty);
        if (!app_1.IS_TEST_ENV) {
            this.webAssemblyContext3D.SCRTSetActiveWorld(null);
        }
        this.clearRootElement(clearHtml);
        _super.prototype.delete.call(this);
    };
    Object.defineProperty(SciChart3DSurface.prototype, "enableGizmo", {
        /**
         * Gets or sets whether the Xyz gizmo is enabled - a small 3D Xyz axis on the bottom left of the 3D Chart
         */
        get: function () {
            return this.gizmoEntity.enableGizmo;
        },
        /**
         * Gets or sets whether the Xyz gizmo is enabled - a small 3D Xyz axis on the bottom left of the 3D Chart
         */
        set: function (isEnabled) {
            this.gizmoEntity.enableGizmo = isEnabled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChart3DSurface.prototype, "viewportManager", {
        /**
         * Gets or sets the {@link ViewportManager3DBase | Viewport Manager} - a class that allows managing of viewport axis ranges
         */
        get: function () {
            return this.viewportManagerProperty;
        },
        /**
         * Gets or sets the {@link ViewportManager3DBase | Viewport Manager} - a class that allows managing of viewport axis ranges
         */
        set: function (viewportManager) {
            var _a, _b;
            (_a = this.viewportManagerProperty) === null || _a === void 0 ? void 0 : _a.detachSciChartSurface();
            this.viewportManagerProperty = viewportManager;
            (_b = this.viewportManagerProperty) === null || _b === void 0 ? void 0 : _b.attachSciChartSurface(this);
            this.notifyPropertyChanged(Constants_1.PROPERTY.SURFACE_VIEWPORT_MANAGER);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChart3DSurface.prototype, "worldDimensions", {
        /**
         * The WorldDimensions defines the size of the world in 3D space. Series and objects can exist outside of this world
         * however the Axis cube will conform to this size.
         * @remarks See our {@link https://www.scichart.com/javascript-chart-documentation | Documentation} online to see
         * how the World Dimensions property configures the size of the chart.
         */
        get: function () {
            return this.worldDimensionsProperty;
        },
        /**
         * The WorldDimensions defines the size of the world in 3D space. Series and objects can exist outside of this world
         * however the Axis cube will conform to this size.
         * @remarks See our {@link https://www.scichart.com/javascript-chart-documentation | Documentation} online to see
         * how the World Dimensions property configures the size of the chart.
         */
        set: function (worldDimensions) {
            this.worldDimensionsProperty = worldDimensions;
            this.notifyPropertyChanged(Constants_1.PROPERTY.SURFACE_WORLD_DIMENSIONS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChart3DSurface.prototype, "camera", {
        /**
         * The {@link ICameraController} is a 3D Camera which allows choosing perspective, orthogonal projections,
         * camera position, target, orientation such as Pitch, Yaw and Roll etc...
         * @remarks See {@link CameraController} for a concrete implementation of {@link ICameraController}
         */
        get: function () {
            return this.cameraProperty;
        },
        /**
         * The {@link ICameraController} is a 3D Camera which allows choosing perspective, orthogonal projections,
         * camera position, target, orientation such as Pitch, Yaw and Roll etc...
         * @remarks See {@link CameraController} for a concrete implementation of {@link ICameraController}
         */
        set: function (value) {
            var _a, _b;
            (_a = this.cameraProperty) === null || _a === void 0 ? void 0 : _a.propertyChanged.unsubscribe(this.childPropertyChanged);
            this.cameraProperty = value;
            (_b = this.cameraProperty) === null || _b === void 0 ? void 0 : _b.propertyChanged.subscribe(this.childPropertyChanged);
            this.notifyPropertyChanged(Constants_1.PROPERTY.SURFACE_CAMERA);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChart3DSurface.prototype, "xAxis", {
        /**
         * Gets or sets the XAxis in the 3D Chart.
         * @remarks Axis types which derive from {@link AxisBase3D} or concrete type {@link NumericAxis3D} are valid
         */
        get: function () {
            return this.xAxisProperty;
        },
        /**
         * Gets or sets the XAxis in the 3D Chart.
         * @remarks Axis types which derive from {@link AxisBase3D} or concrete type {@link NumericAxis3D} are valid
         */
        set: function (xAxis) {
            this.detachAxis(this.xAxisProperty);
            this.xAxisProperty = xAxis;
            this.attachAxis(this.xAxisProperty);
            this.notifyPropertyChanged(Constants_1.PROPERTY.SURFACE_XAXIS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChart3DSurface.prototype, "yAxis", {
        /**
         * Gets or sets the YAxis in the 3D Chart.
         * @remarks Axis types which derive from {@link AxisBase3D} or concrete type {@link NumericAxis3D} are valid
         */
        get: function () {
            return this.yAxisProperty;
        },
        /**
         * Gets or sets the YAxis in the 3D Chart.
         * @remarks Axis types which derive from {@link AxisBase3D} or concrete type {@link NumericAxis3D} are valid
         */
        set: function (yAxis) {
            this.detachAxis(this.yAxisProperty);
            this.yAxisProperty = yAxis;
            this.attachAxis(this.yAxisProperty);
            this.notifyPropertyChanged(Constants_1.PROPERTY.SURFACE_YAXIS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChart3DSurface.prototype, "zAxis", {
        /**
         * Gets or sets the ZAxis in the 3D Chart.
         * @remarks Axis types which derive from {@link AxisBase3D} or concrete type {@link NumericAxis3D} are valid
         */
        get: function () {
            return this.zAxisProperty;
        },
        /**
         * Gets or sets the ZAxis in the 3D Chart.
         * @remarks Axis types which derive from {@link AxisBase3D} or concrete type {@link NumericAxis3D} are valid
         */
        set: function (zAxis) {
            this.detachAxis(this.zAxisProperty);
            this.zAxisProperty = zAxis;
            this.attachAxis(this.zAxisProperty);
            this.notifyPropertyChanged(Constants_1.PROPERTY.SURFACE_ZAXIS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChart3DSurface.prototype, "isHitTestEnabled", {
        /**
         * Required to enable Hit-Test if any of the following functions are needed in SciChart3DSurface:
         *  - {@link BaseRenderableSeries3D.hitTest}
         *  - {@link TooltipModiifer3D}
         *
         *  Enabling hit-test adds minor a performance overhead for drawing and should be disabled if not required.
         * @param isEnabled
         */
        get: function () {
            return this.isHitTestEnabledProperty;
        },
        /**
         * Required to enable Hit-Test if any of the following functions are needed in SciChart3DSurface:
         *  - {@link BaseRenderableSeries3D.hitTest}
         *  - {@link TooltipModiifer3D}
         *
         *  Enabling hit-test adds minor a performance overhead for drawing and should be disabled if not required.
         * @param isEnabled
         */
        set: function (isEnabled) {
            if (isEnabled !== this.isHitTestEnabledProperty) {
                this.isHitTestEnabledProperty = isEnabled;
                this.invalidateElement();
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Called internally
     * Sets isAxisCubeRenderedProperty flag after Axis Cube is rendered
     */
    SciChart3DSurface.prototype.setIsAxisCubeRendered = function () {
        this.isAxisCubeRenderedProperty = true;
    };
    Object.defineProperty(SciChart3DSurface.prototype, "isAxisCubeRendered", {
        /**
         * Called internally
         * Gets isAxisCubeRenderedProperty flag
         */
        get: function () {
            return this.isAxisCubeRenderedProperty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    SciChart3DSurface.prototype.invalidateElement = function (options) {
        var _a, _b, _c;
        // TODO refactor duplication of 2D Surface logic
        logger_1.Logger.debug("Invalidating ".concat((_b = (_a = this.domChartRoot) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : this.id, ": force=").concat(options === null || options === void 0 ? void 0 : options.force, " isSuspended=").concat(this.isSuspended, " isInitialized=").concat(this.isInitialized, "."));
        // When isSuspended (see suspendUpdates() function) ignore drawing
        if (!(options === null || options === void 0 ? void 0 : options.force) && (this.isSuspended || this.isDeleted || !this.isInitialized)) {
            return;
        }
        perfomance_1.PerformanceDebugHelper.mark(this.sciChart3DRenderer.isInvalidated
            ? perfomance_1.EPerformanceMarkType.Invalidate
            : perfomance_1.EPerformanceMarkType.LeadingInvalidate, { contextId: this.id });
        if (!this.sciChart3DRenderer.isInvalidated) {
            // Prevent drawing request when WebGL context is lost
            if ((_c = WebGlHelper_1.WebGlHelper.getContext(this.webAssemblyContext3D.canvas)) === null || _c === void 0 ? void 0 : _c.isContextLost()) {
                return;
            }
            this.sciChart3DRenderer.isInvalidated = true;
            var canvasId = this.domCanvas2D ? this.domCanvas2D.id : "undefinedCanvasId";
            this.webAssemblyContext3D.TSRRequestCanvasDraw(canvasId);
        }
    };
    /**
     * @inheritDoc
     */
    SciChart3DSurface.prototype.onDpiChanged = function (args) {
        var _a, _b;
        this.renderableSeries.asArray().forEach(function (rs) { return rs.onDpiChanged(args); });
        // Force a viewport size change as size-changed may not fire when parent div has width, height
        this.changeViewportSize((_a = this.getMainCanvas()) === null || _a === void 0 ? void 0 : _a.clientWidth, (_b = this.getMainCanvas()) === null || _b === void 0 ? void 0 : _b.clientHeight);
        _super.prototype.onDpiChanged.call(this, args);
    };
    Object.defineProperty(SciChart3DSurface.prototype, "surfaceType", {
        /**
         * @inheritDoc
         */
        get: function () {
            return SciChartSurfaceBase_1.ESurfaceType.SciChart3DSurfaceType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SciChart3DSurface.prototype, "isInvalidated", {
        get: function () {
            var _a;
            return (_a = this.sciChart3DRenderer) === null || _a === void 0 ? void 0 : _a.isInvalidated;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Called after the {@link SciChart3DSurface} has rendered.
     */
    SciChart3DSurface.prototype.onSciChartRendered = function () {
        this.chartModifiers.asArray().forEach(function (cm) {
            cm.onParentSurfaceRendered();
        });
        if (!this.isCopyCanvasSurface) {
            this.rendered.raiseEvent(this.sciChart3DRenderer.isInvalidated);
        }
    };
    /**
     * Called internally - the main drawing loop
     */
    SciChart3DSurface.prototype.doDrawingLoop = function () {
        this.sciChart3DRenderer.render();
    };
    /**
     * @inheritDoc
     */
    SciChart3DSurface.prototype.applyTheme = function (themeProvider) {
        var _a, _b, _c;
        _super.prototype.applyTheme.call(this, themeProvider);
        this.renderableSeries.asArray().forEach(function (rs) { return rs.applyTheme(themeProvider); });
        (_a = this.xAxis) === null || _a === void 0 ? void 0 : _a.applyTheme(themeProvider);
        (_b = this.yAxis) === null || _b === void 0 ? void 0 : _b.applyTheme(themeProvider);
        (_c = this.zAxis) === null || _c === void 0 ? void 0 : _c.applyTheme(themeProvider);
        this.invalidateElement();
    };
    /**
     * @inheritDoc
     */
    SciChart3DSurface.prototype.changeViewportSize = function (pixelWidth, pixelHeight) {
        if (!pixelWidth || !pixelHeight || this.isDeleted) {
            return;
        }
        var backBufferWidth = pixelWidth * DpiHelper_1.DpiHelper.PIXEL_RATIO;
        var backBufferHeight = pixelHeight * DpiHelper_1.DpiHelper.PIXEL_RATIO;
        this.viewportManager.setSize(backBufferWidth, backBufferHeight);
        if (this.isCopyCanvasSurface) {
            this.changeMasterCanvasViewportSize(this.webAssemblyContext3D, pixelWidth, pixelHeight);
            if (this.domCanvas2D) {
                DpiHelper_1.DpiHelper.setSize(this.domCanvas2D, pixelWidth, pixelHeight);
            }
        }
        else {
            this.changeWebGLCanvasViewportSize(this.webAssemblyContext3D, pixelWidth, pixelHeight);
        }
        var svgRootElement = this.domSvgContainer;
        if (svgRootElement) {
            (0, translate_1.fitSvgToViewRect)(svgRootElement, new Rect_1.Rect(0, 0, pixelWidth, pixelHeight));
        }
        var backgroundSvgRootElement = this.domBackgroundSvgContainer;
        if (backgroundSvgRootElement) {
            (0, translate_1.fitSvgToViewRect)(backgroundSvgRootElement, new Rect_1.Rect(0, 0, pixelWidth, pixelHeight));
        }
        var backgroundDivRootElement = this.domSeriesBackground;
        if (backgroundDivRootElement) {
            (0, translate_1.fitElementToViewRect)(backgroundDivRootElement, new Rect_1.Rect(0, 0, pixelWidth, pixelHeight));
        }
        if (this.domSvgAdornerLayer) {
            this.domSvgAdornerLayer.setAttribute("width", pixelWidth.toString());
            this.domSvgAdornerLayer.setAttribute("height", pixelHeight.toString());
        }
        this.invalidateElement();
    };
    /**
     * Gets the generic animations currently on the surface. Do not manipulate this array directly.
     * To add, use addAnimation.  To remove, find an animation and call .cancel() on it.
     */
    SciChart3DSurface.prototype.getAnimations = function () {
        return this.animationList;
    };
    /**
     * Add a {@link GenericAnimation} to the surface.
     * Multiple animations will be run in parallel, so if you want to run one after another, use the onCompleted callback
     * to add another animation after the first completes
     */
    SciChart3DSurface.prototype.addAnimation = function () {
        var _this = this;
        var animations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            animations[_i] = arguments[_i];
        }
        if (animations === undefined)
            return;
        animations.forEach(function (a) { return _this.animationList.push(a); });
        this.invalidateElement();
    };
    Object.defineProperty(SciChart3DSurface.prototype, "isRunningAnimation", {
        /**
         * Returns true if an animation is running
         */
        get: function () {
            return this.animationList.some(function (a) { return !a.isComplete; });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Is being called on each render, to run animations
     * @param timeElapsed
     */
    SciChart3DSurface.prototype.onAnimate = function (timeElapsed) {
        if (timeElapsed) {
            // advance all animations in queue
            var remainingAnimations = [];
            for (var i = 0; i < this.animationList.length; i++) {
                var animation = this.animationList[i];
                if (!animation.isComplete) {
                    animation.update(timeElapsed);
                    if (!animation.isComplete) {
                        // Request another draw to advance animation
                        this.invalidateElement();
                        remainingAnimations.push(animation);
                    }
                }
            }
            this.animationList = remainingAnimations;
        }
    };
    /**
     * @inheritDoc
     */
    SciChart3DSurface.prototype.getXAxisById = function (axisId) {
        return this.xAxis;
    };
    /**
     * @inheritDoc
     */
    SciChart3DSurface.prototype.getYAxisById = function (axisId) {
        return this.yAxis;
    };
    /**
     * @inheritDoc
     */
    SciChart3DSurface.prototype.updateWatermark = function (left, bottom) {
        var _a, _b;
        if (!app_1.IS_TEST_ENV) {
            this.watermarkPropertyPosition.x = left;
            this.watermarkPropertyPosition.y = bottom;
            this.watermarkProperties.m_fCanvasWidth = (_a = this.getMainCanvas()) === null || _a === void 0 ? void 0 : _a.clientWidth;
            this.watermarkProperties.SetPosition(this.watermarkPropertyPosition);
            var isLightBackground = (_b = this.themeProvider) === null || _b === void 0 ? void 0 : _b.isLightBackground;
            this.watermarkProperties.m_bIsDarkBackground = isLightBackground !== undefined ? !isLightBackground : false;
            this.webAssemblyContext3D.SCRT3DSetWaterMarkProperties(this.watermarkProperties);
        }
    };
    SciChart3DSurface.prototype.getSeriesViewRectPadding = function (scaled) {
        return Thickness_1.Thickness.fromNumber(0);
    };
    SciChart3DSurface.prototype.applyOptions = function (options) {
        _super.prototype.applyOptions.call(this, options);
        this.camera = new CameraController_1.CameraController(this.webAssemblyContext3D, options === null || options === void 0 ? void 0 : options.cameraOptions);
        if (options === null || options === void 0 ? void 0 : options.worldDimensions) {
            this.worldDimensions = options.worldDimensions;
        }
    };
    /**
     * @inheritDoc
     */
    SciChart3DSurface.prototype.attachChartModifier = function (chartModifier) {
        _super.prototype.attachChartModifier.call(this, chartModifier);
        chartModifier.setParentSurface(this);
        chartModifier.invalidateParentCallback = this.invalidateElement;
        chartModifier.onAttach();
        this.invalidateElement();
    };
    /**
     * @inheritDoc
     */
    SciChart3DSurface.prototype.applySciChartBackground = function (background, alphaEnabled) {
        if (alphaEnabled === void 0) { alphaEnabled = true; }
        this.backgroundProperty = background;
        if (this.domChartRoot) {
            this.domChartRoot.style.background = background;
        }
        this.webAssemblyContext3D.SCRT3DSetClearColor(0, 0, 0, 0);
    };
    SciChart3DSurface.prototype.detachSeries = function (renderableSeries) {
        if (this.rootEntity) {
            this.rootEntity.children.remove(renderableSeries.sceneEntity);
        }
        renderableSeries.onDetach();
        this.invalidateElement();
    };
    SciChart3DSurface.prototype.attachSeries = function (renderableSeries) {
        renderableSeries.onAttach(this);
        if (!renderableSeries.sceneEntity) {
            throw new Error("IRenderableSeries3D.sceneEntity must be set before attaching to SciChart3DSurface");
        }
        if (this.rootEntity) {
            this.rootEntity.children.add(renderableSeries.sceneEntity);
        }
        this.invalidateElement();
    };
    SciChart3DSurface.prototype.detachAxis = function (axis) {
        if (axis) {
            axis.invalidateParentCallback = undefined;
            axis.parentSurface = undefined;
        }
    };
    SciChart3DSurface.prototype.attachAxis = function (axis) {
        if (axis) {
            if (axis.invalidateParentCallback) {
                throw new Error("Invalid operation in sciChart3DSurface.attachAxis, this axis has already been attached to a SciChart3DSurface. Please detach it from a SciChart3DSurface before attaching to another");
            }
            axis.onAttach(this, axis === this.xAxis, axis === this.yAxis, axis === this.zAxis);
            if (this.themeProviderProperty) {
                axis.applyTheme(this.themeProviderProperty);
            }
            axis.invalidateParentCallback = this.invalidateElement;
        }
    };
    SciChart3DSurface.prototype.childPropertyChanged = function (args) {
        this.invalidateElement();
    };
    return SciChart3DSurface;
}(SciChartSurfaceBase_1.SciChartSurfaceBase));
exports.SciChart3DSurface = SciChart3DSurface;
