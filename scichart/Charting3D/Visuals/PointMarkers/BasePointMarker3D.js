"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePointMarker3D = exports.EMarkerType = void 0;
var EventHandler_1 = require("../../../Core/EventHandler");
var Guard_1 = require("../../../Core/Guard");
var PropertyChangedEventArgs_1 = require("../../../Core/PropertyChangedEventArgs");
var Constants_1 = require("./Constants");
/**
 * Defines the BasePointMarker3D geometry type: a pixel, a textured-quad or a 3D object (Instanced Mesh)
 */
var EMarkerType;
(function (EMarkerType) {
    /**
     * Each marker rendered as a single pixel
     */
    EMarkerType[EMarkerType["Pixel"] = 0] = "Pixel";
    /**
     * each marker rendered as a textured quad
     */
    EMarkerType[EMarkerType["TexturedQuad"] = 1] = "TexturedQuad";
    /**
     * each marker rendered as an instanced mesh
     */
    EMarkerType[EMarkerType["InstancedMesh"] = 2] = "InstancedMesh";
})(EMarkerType = exports.EMarkerType || (exports.EMarkerType = {}));
/**
 * @summary The Base class for a 3D PointMarker in SciChart - High Performance
 * {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}.
 * @description PointMarkers may be displayed on {@link IRenderableSeries3D |3D Renderable Series} to add scatter-points to 3D charts.
 * For example: setting the {@link ScatterRenderableSeries3D.pointMarker} property property
 * will render a point at each xyz data-value
 * @remarks
 * See derived types of {@link BasePointMarker3D} for specific point-marker types.
 */
var BasePointMarker3D = /** @class */ (function () {
    /**
     * Creates an instance of the {@link BasePointMarker3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link IBasePointMarker3DOptions} used to configure the point-marker
     * @protected
     */
    function BasePointMarker3D(webAssemblyContext, options) {
        var _a, _b;
        this.fillProperty = "#FF3333";
        this.sizeProperty = 3;
        Guard_1.Guard.notNull(webAssemblyContext, "webAssemblyContext");
        this.webAssemblyContext = webAssemblyContext;
        this.propertyChanged = new EventHandler_1.EventHandler();
        this.fillProperty = (_a = options === null || options === void 0 ? void 0 : options.fill) !== null && _a !== void 0 ? _a : this.fillProperty;
        this.sizeProperty = (_b = options === null || options === void 0 ? void 0 : options.size) !== null && _b !== void 0 ? _b : this.sizeProperty;
    }
    Object.defineProperty(BasePointMarker3D.prototype, "fill", {
        /**
         * Gets or sets the point-marker fill as an HTML Color Code
         */
        get: function () {
            return this.fillProperty;
        },
        /**
         * Gets or sets the point-marker fill as an HTML Color Code
         */
        set: function (fill) {
            this.fillProperty = fill;
            this.notifyPropertyChanged(Constants_1.PROPERTY.FILL);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BasePointMarker3D.prototype, "size", {
        /**
         * Gets or sets the size of the point-marker in world coordinates
         */
        get: function () {
            return this.sizeProperty;
        },
        /**
         * Gets or sets the size of the point-marker in world coordinates
         */
        set: function (size) {
            this.sizeProperty = size;
            this.notifyPropertyChanged(Constants_1.PROPERTY.SIZE);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Notifies listeners to {@link propertyChanged} that a property has changed and redraw is required
     * @param propertyName the property name
     */
    BasePointMarker3D.prototype.notifyPropertyChanged = function (propertyName) {
        var _a;
        (_a = this.propertyChanged) === null || _a === void 0 ? void 0 : _a.raiseEvent(new PropertyChangedEventArgs_1.PropertyChangedEventArgs(propertyName));
    };
    return BasePointMarker3D;
}());
exports.BasePointMarker3D = BasePointMarker3D;
