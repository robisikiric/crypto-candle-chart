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
exports.BaseRenderableSeries3D = void 0;
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
var Deleter_1 = require("../../../Core/Deleter");
var guid_1 = require("../../../utils/guid");
var BaseDataSeries3D_1 = require("../../Model/DataSeries/BaseDataSeries3D");
var Constants_1 = require("./Constants");
var SeriesInfo3D_1 = require("./SeriesInfo3D");
var SurfaceMeshSeriesInfo3D_1 = require("./SurfaceMeshSeriesInfo3D");
var XyzSeriesInfo3D_1 = require("./XyzSeriesInfo3D");
/**
 * @summary Defines the base class to a 3D Render Series (or 3D Chart Type) in SciChart's High Performance Real-time
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks
 * A {@link BaseRenderableSeries3D} defines how data should be rendered. e.g. as a 3D Scatter Chart, 3D Point Line Chart etc...
 * This is independent from the {@link BaseDataSeries3D | DataSeries3D} which stores the data to render
 *
 * See derived types of {@link BaseDataSeries3D} to find out what data-series are available.
 * See derived types of {@link IRenderableSeries3D} to find out what 3D JavaScript Chart types are available.
 */
var BaseRenderableSeries3D = /** @class */ (function (_super) {
    __extends(BaseRenderableSeries3D, _super);
    /**
     * Creates an instance of the {@link BaseRenderableSeries3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     * @param options Optional parameters of type {@link IBaseRenderableSeries3DOptions} to configure the series
     * @protected
     */
    function BaseRenderableSeries3D(webAssemblyContext, options) {
        var _this = this;
        var _a, _b;
        _this = _super.call(this) || this;
        _this.id = (_a = options === null || options === void 0 ? void 0 : options.id) !== null && _a !== void 0 ? _a : (0, guid_1.generateGuid)();
        _this.webAssemblyContext = webAssemblyContext;
        _this.dataSeriesDataChanged = _this.dataSeriesDataChanged.bind(_this);
        _this.pointMarkerPropertyChanged = _this.pointMarkerPropertyChanged.bind(_this);
        _this.onDpiChanged = _this.onDpiChanged.bind(_this);
        _this.hitTest = _this.hitTest.bind(_this);
        _this.enrichHitTest = _this.enrichHitTest.bind(_this);
        _this.dataSeries = (options === null || options === void 0 ? void 0 : options.dataSeries) || undefined;
        _this.isVisibleProperty = (options === null || options === void 0 ? void 0 : options.isVisible) !== undefined ? options === null || options === void 0 ? void 0 : options.isVisible : true;
        _this.pointMarkerProperty = (options === null || options === void 0 ? void 0 : options.pointMarker) || undefined;
        _this.strokeProperty = (options === null || options === void 0 ? void 0 : options.stroke) || "#FFFFFF";
        _this.shininessProperty = (options === null || options === void 0 ? void 0 : options.shininess) === undefined ? 64 : options.shininess;
        _this.opacityProperty = (_b = options === null || options === void 0 ? void 0 : options.opacity) !== null && _b !== void 0 ? _b : 1;
        return _this;
    }
    /** @inheritDoc */
    BaseRenderableSeries3D.prototype.applyTheme = function (themeProvider) {
        // TODO
    };
    Object.defineProperty(BaseRenderableSeries3D.prototype, "opacity", {
        /** @inheritDoc */
        get: function () {
            return this.opacityProperty;
        },
        /** @inheritDoc */
        set: function (opacity) {
            this.opacityProperty = opacity;
            this.notifyPropertyChanged(Constants_1.PROPERTY.OPACITY);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseRenderableSeries3D.prototype, "sceneEntity", {
        /** @inheritDoc */
        get: function () {
            return this.sceneEntityProperty;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseRenderableSeries3D.prototype, "shininess", {
        /** @inheritDoc */
        get: function () {
            return this.shininessProperty;
        },
        /** @inheritDoc */
        set: function (shininess) {
            this.shininessProperty = shininess;
            this.notifyPropertyChanged(Constants_1.PROPERTY.SHININESS);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseRenderableSeries3D.prototype, "paletteProvider", {
        /** @inheritDoc */
        get: function () {
            return this.paletteProviderProperty;
        },
        /** @inheritDoc */
        set: function (paletteProvider) {
            this.paletteProviderProperty = paletteProvider;
            this.notifyPropertyChanged(Constants_1.PROPERTY.PALETTE_PROVIDER);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseRenderableSeries3D.prototype, "stroke", {
        /** @inheritDoc */
        get: function () {
            return this.strokeProperty;
        },
        /** @inheritDoc */
        set: function (stroke) {
            this.strokeProperty = stroke;
            this.notifyPropertyChanged(Constants_1.PROPERTY.STROKE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseRenderableSeries3D.prototype, "dataSeries", {
        /** @inheritDoc */
        get: function () {
            return this.dataSeriesProperty;
        },
        /** @inheritDoc */
        set: function (dataSeries) {
            var _a, _b;
            this.dataSeriesProperty = dataSeries;
            (_a = this.dataSeriesProperty) === null || _a === void 0 ? void 0 : _a.dataChanged.unsubscribe(this.dataSeriesDataChanged);
            this.dataSeriesProperty = dataSeries;
            (_b = this.dataSeriesProperty) === null || _b === void 0 ? void 0 : _b.dataChanged.subscribe(this.dataSeriesDataChanged);
            this.notifyPropertyChanged(Constants_1.PROPERTY.DATA_SERIES);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseRenderableSeries3D.prototype, "pointMarker", {
        /** @inheritDoc */
        get: function () {
            return this.pointMarkerProperty;
        },
        /** @inheritDoc */
        set: function (pointMarker) {
            this.detachPointMarker(this.pointMarkerProperty);
            this.pointMarkerProperty = pointMarker;
            this.attachPointMarker(this.pointMarkerProperty);
            this.notifyPropertyChanged(Constants_1.PROPERTY.POINT_MARKER3D);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseRenderableSeries3D.prototype, "parentSurface", {
        /** @inheritDoc */
        get: function () {
            return this.parentSurfaceProperty;
        },
        /** @inheritDoc */
        set: function (parentSurface) {
            this.parentSurfaceProperty = parentSurface;
            this.notifyPropertyChanged(Constants_1.PROPERTY.PARENT_SURFACE);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseRenderableSeries3D.prototype, "isVisible", {
        /** @inheritDoc */
        get: function () {
            return this.isVisibleProperty;
        },
        /** @inheritDoc */
        set: function (isVisible) {
            this.isVisibleProperty = isVisible;
            if (this.sceneEntityProperty) {
                this.sceneEntityProperty.isVisible = this.isVisibleProperty;
            }
            this.notifyPropertyChanged(Constants_1.PROPERTY.IS_VISIBLE);
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    BaseRenderableSeries3D.prototype.onAttach = function (scs) {
        this.parentSurface = scs;
        if (this.invalidateParentCallback) {
            throw new Error("Invalid operation in sciChart3DSurface.attachSeries, this series has already been attached to a SciChart3DSurface. Please detach it from a SciChart3DSurface before attaching to another");
        }
        this.invalidateParentCallback = scs.invalidateElement;
    };
    /** @inheritDoc */
    BaseRenderableSeries3D.prototype.onDetach = function () {
        this.invalidateParentCallback = undefined;
        this.parentSurface = undefined;
    };
    /** @inheritDoc */
    BaseRenderableSeries3D.prototype.delete = function () {
        this.sceneEntityProperty = (0, Deleter_1.deleteSafe)(this.sceneEntityProperty);
        this.dataSeries = (0, Deleter_1.deleteSafe)(this.dataSeries);
    };
    /** @inheritDoc */
    BaseRenderableSeries3D.prototype.onDpiChanged = function (args) {
        var _a;
        (_a = this.sceneEntityProperty) === null || _a === void 0 ? void 0 : _a.onDpiChanged(args);
    };
    /** @inheritDoc */
    BaseRenderableSeries3D.prototype.hitTest = function (screenPoint) {
        if (this.parentSurface && !this.parentSurface.isHitTestEnabled) {
            throw new Error("Enable hit-test functions by setting SciChart3DSurface.isHitTestEnabled = true");
        }
        var hitTestFunc = this.sceneEntity.hitTest;
        if (hitTestFunc) {
            return this.enrichHitTest(hitTestFunc(screenPoint));
        }
        return SeriesInfo3D_1.SeriesInfo3D.empty();
    };
    /**
     * Is being called when the data for the underlying DataSeries changes
     * @protected
     */
    BaseRenderableSeries3D.prototype.dataSeriesDataChanged = function () {
        if (this.invalidateParentCallback) {
            this.invalidateParentCallback();
        }
    };
    BaseRenderableSeries3D.prototype.enrichHitTest = function (hitTestInfo) {
        var _a;
        var hitDataSeries = (_a = hitTestInfo.associatedSeries) === null || _a === void 0 ? void 0 : _a.dataSeries;
        if (!hitDataSeries) {
            return SeriesInfo3D_1.SeriesInfo3D.empty();
        }
        switch (hitDataSeries.type) {
            case BaseDataSeries3D_1.EDataSeriesType3D.Xyz3D:
                return new XyzSeriesInfo3D_1.XyzSeriesInfo3D(this, hitTestInfo);
            case BaseDataSeries3D_1.EDataSeriesType3D.UniformGrid3D:
                return new SurfaceMeshSeriesInfo3D_1.SurfaceMeshSeriesInfo3D(this, hitTestInfo);
            default:
                throw new Error("Unknown data series type " + hitDataSeries.type);
        }
    };
    /**
     * Used internally - sets the {@link IRenderableSeriesSceneEntity | 3D Scene Entity}
     * @param sceneEntity
     * @protected
     */
    BaseRenderableSeries3D.prototype.setSceneEntity = function (sceneEntity) {
        this.sceneEntityProperty = sceneEntity;
        if (this.sceneEntityProperty) {
            this.sceneEntityProperty.isVisible = this.isVisible;
        }
        this.notifyPropertyChanged(Constants_1.PROPERTY.SCENE_ENTITY);
    };
    /**
     * Notifies listeners to {@link invalidateParentCallback} that a property has changed
     * @param propertyName
     * @protected
     */
    BaseRenderableSeries3D.prototype.notifyPropertyChanged = function (propertyName) {
        var _a;
        (_a = this.sceneEntityProperty) === null || _a === void 0 ? void 0 : _a.notifySeriesPropertyChanged(propertyName);
        if (this.invalidateParentCallback) {
            this.invalidateParentCallback();
        }
    };
    BaseRenderableSeries3D.prototype.attachPointMarker = function (pointMarker) {
        if (pointMarker) {
            pointMarker.propertyChanged.subscribe(this.pointMarkerPropertyChanged);
        }
    };
    BaseRenderableSeries3D.prototype.detachPointMarker = function (pointMarker) {
        if (pointMarker) {
            pointMarker.propertyChanged.unsubscribe(this.pointMarkerPropertyChanged);
        }
    };
    BaseRenderableSeries3D.prototype.pointMarkerPropertyChanged = function (args) {
        this.notifyPropertyChanged("pointMarker." + args.propertyName);
    };
    return BaseRenderableSeries3D;
}(DeletableEntity_1.DeletableEntity));
exports.BaseRenderableSeries3D = BaseRenderableSeries3D;
