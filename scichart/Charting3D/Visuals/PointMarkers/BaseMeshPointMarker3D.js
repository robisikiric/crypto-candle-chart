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
exports.BaseMeshPointMarker3D = void 0;
var BasePointMarker3D_1 = require("./BasePointMarker3D");
/**
 * A {@link BaseMeshPointMarker3D} is a type of {@link BasePointMarker3D | 3D Point Marker} which renders
 * a 3-Dimensional object at each point. Useful for high quality 3D Scatter and Bubble charts.
 * @remarks See derived types of {@link BaseMeshPointMarker3D} for available mesh point-markers
 */
var BaseMeshPointMarker3D = /** @class */ (function (_super) {
    __extends(BaseMeshPointMarker3D, _super);
    /**
     * Creates an instance of {@link BaseMeshPointMarker3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link IBasePointMarker3DOptions} used to configure the point-marker
     * @protected
     */
    function BaseMeshPointMarker3D(webAssemblyContext, options) {
        return _super.call(this, webAssemblyContext, options) || this;
    }
    Object.defineProperty(BaseMeshPointMarker3D.prototype, "markerType", {
        /**
         * Defines the MarkerType, e.g. pixel point marker, Mesh (3d object) or textured-quad
         */
        get: function () {
            return BasePointMarker3D_1.EMarkerType.InstancedMesh;
        },
        enumerable: false,
        configurable: true
    });
    return BaseMeshPointMarker3D;
}(BasePointMarker3D_1.BasePointMarker3D));
exports.BaseMeshPointMarker3D = BaseMeshPointMarker3D;
