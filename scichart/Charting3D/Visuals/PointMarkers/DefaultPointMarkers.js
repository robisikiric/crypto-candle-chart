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
exports.TrianglePointMarker3D = exports.EllipsePointMarker3D = exports.QuadPointMarker = exports.PixelPointMarker3D = exports.CylinderPointMarker3D = exports.PyramidPointMarker3D = exports.CubePointMarker3D = exports.SpherePointMarker3D = void 0;
var BaseMeshPointMarker3D_1 = require("./BaseMeshPointMarker3D");
var BasePointMarker3D_1 = require("./BasePointMarker3D");
var BaseTexturePointMarker3D_1 = require("./BaseTexturePointMarker3D");
// tslint:disable:max-classes-per-file
/**
 * The {@link SpherePointMarker3D} adds a 3D Sphere to each XYZ point in a 3D Scatter or Bubble series
 * @remarks See related class {@link ScatterRenderableSeries3D} which renders a {@link BasePointMarker3D} at
 * each Xyz point in an {@link XyzDataSeries3D} Data Series.
 */
var SpherePointMarker3D = /** @class */ (function (_super) {
    __extends(SpherePointMarker3D, _super);
    /**
     * Creates an instance of {@link SpherePointMarker3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link IBasePointMarker3DOptions} used to configure the point-marker
     * @protected
     */
    function SpherePointMarker3D(webAssemblyContext, options) {
        return _super.call(this, webAssemblyContext, options) || this;
    }
    Object.defineProperty(SpherePointMarker3D.prototype, "pointsMesh", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.webAssemblyContext.SCRTGetTemplateMesh(this.webAssemblyContext.eSCRTMesh.SCRT_MESH_SPHERE);
        },
        enumerable: false,
        configurable: true
    });
    return SpherePointMarker3D;
}(BaseMeshPointMarker3D_1.BaseMeshPointMarker3D));
exports.SpherePointMarker3D = SpherePointMarker3D;
/**
 * The {@link CubePointMarker3D} adds a 3D Cube or Box to each XYZ point in a 3D Scatter or Bubble series
 * @remarks See related class {@link ScatterRenderableSeries3D} which renders a {@link BasePointMarker3D} at
 * each Xyz point in an {@link XyzDataSeries3D} Data Series.
 */
var CubePointMarker3D = /** @class */ (function (_super) {
    __extends(CubePointMarker3D, _super);
    /**
     * Creates an instance of {@link CubePointMarker3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link IBasePointMarker3DOptions} used to configure the point-marker
     * @protected
     */
    function CubePointMarker3D(webAssemblyContext, options) {
        return _super.call(this, webAssemblyContext, options) || this;
    }
    Object.defineProperty(CubePointMarker3D.prototype, "pointsMesh", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.webAssemblyContext.SCRTGetTemplateMesh(this.webAssemblyContext.eSCRTMesh.SCRT_MESH_CUBE);
        },
        enumerable: false,
        configurable: true
    });
    return CubePointMarker3D;
}(BaseMeshPointMarker3D_1.BaseMeshPointMarker3D));
exports.CubePointMarker3D = CubePointMarker3D;
/**
 * The {@link PyramidPointMarker3D} adds a 3D Pyramid to each XYZ point in a 3D Scatter or Bubble series
 * @remarks See related class {@link ScatterRenderableSeries3D} which renders a {@link BasePointMarker3D} at
 * each Xyz point in an {@link XyzDataSeries3D} Data Series.
 */
var PyramidPointMarker3D = /** @class */ (function (_super) {
    __extends(PyramidPointMarker3D, _super);
    /**
     * Creates an instance of {@link PyramidPointMarker3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link IBasePointMarker3DOptions} used to configure the point-marker
     * @protected
     */
    function PyramidPointMarker3D(webAssemblyContext, options) {
        return _super.call(this, webAssemblyContext, options) || this;
    }
    Object.defineProperty(PyramidPointMarker3D.prototype, "pointsMesh", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.webAssemblyContext.SCRTGetTemplateMesh(this.webAssemblyContext.eSCRTMesh.SCRT_MESH_PYRAMID);
        },
        enumerable: false,
        configurable: true
    });
    return PyramidPointMarker3D;
}(BaseMeshPointMarker3D_1.BaseMeshPointMarker3D));
exports.PyramidPointMarker3D = PyramidPointMarker3D;
/**
 * The {@link CylinderPointMarker3D} adds a 3D Cylinder to each XYZ point in a 3D Scatter or Bubble series
 * @remarks See related class {@link ScatterRenderableSeries3D} which renders a {@link BasePointMarker3D} at
 * each Xyz point in an {@link XyzDataSeries3D} Data Series.
 */
var CylinderPointMarker3D = /** @class */ (function (_super) {
    __extends(CylinderPointMarker3D, _super);
    /**
     * Creates an instance of {@link CylinderPointMarker3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link IBasePointMarker3DOptions} used to configure the point-marker
     * @protected
     */
    function CylinderPointMarker3D(webAssemblyContext, options) {
        return _super.call(this, webAssemblyContext, options) || this;
    }
    Object.defineProperty(CylinderPointMarker3D.prototype, "pointsMesh", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.webAssemblyContext.SCRTGetTemplateMesh(this.webAssemblyContext.eSCRTMesh.SCRT_MESH_CYLINDER);
        },
        enumerable: false,
        configurable: true
    });
    return CylinderPointMarker3D;
}(BaseMeshPointMarker3D_1.BaseMeshPointMarker3D));
exports.CylinderPointMarker3D = CylinderPointMarker3D;
/**
 * @summary The {@link PixelPointMarker3D} adds a single pixel to each XYZ point in a 3D Scatter or Bubble series.
 * This is useful for high-performance point-clouds e.g. LiDAR visualisation which requires millions of data-points in 3D.
 * @remarks See related class {@link ScatterRenderableSeries3D} which renders a {@link BasePointMarker3D} at
 * each Xyz point in an {@link XyzDataSeries3D} Data Series.
 */
var PixelPointMarker3D = /** @class */ (function (_super) {
    __extends(PixelPointMarker3D, _super);
    /**
     * Creates an instance of {@link PixelPointMarker3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link IBasePointMarker3DOptions} used to configure the point-marker
     * @protected
     */
    function PixelPointMarker3D(webAssemblyContext, options) {
        var _this = _super.call(this, webAssemblyContext, options) || this;
        _this.size = 0;
        return _this;
    }
    Object.defineProperty(PixelPointMarker3D.prototype, "markerType", {
        /**
         * @inheritDoc
         */
        get: function () {
            return BasePointMarker3D_1.EMarkerType.Pixel;
        },
        enumerable: false,
        configurable: true
    });
    return PixelPointMarker3D;
}(BasePointMarker3D_1.BasePointMarker3D));
exports.PixelPointMarker3D = PixelPointMarker3D;
/**
 * @summary The {@link QuadPointMarker} renders a flat billboarded textured-quad to each XYZ point in a 3D Scatter or Bubble series.
 * @remarks See related class {@link ScatterRenderableSeries3D} which renders a {@link BasePointMarker3D} at
 * each Xyz point in an {@link XyzDataSeries3D} Data Series.
 */
var QuadPointMarker = /** @class */ (function (_super) {
    __extends(QuadPointMarker, _super);
    /**
     * Creates an instance of {@link QuadPointMarker}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link IBasePointMarker3DOptions} used to configure the point-marker
     * @protected
     */
    function QuadPointMarker(webAssemblyContext, options) {
        return _super.call(this, webAssemblyContext, options) || this;
    }
    Object.defineProperty(QuadPointMarker.prototype, "pointsTexture", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.webAssemblyContext.SCRTGetTemplateTexture(this.webAssemblyContext.eSCRTTexture.SCRT_TEXTURE_SOLIDWHITE);
        },
        enumerable: false,
        configurable: true
    });
    return QuadPointMarker;
}(BaseTexturePointMarker3D_1.BaseTexturePointMarker3D));
exports.QuadPointMarker = QuadPointMarker;
/**
 * @summary The {@link EllipsePointMarker3D} renders a flat billboarded textured ellipse to each XYZ point in a 3D Scatter or Bubble series.
 * @remarks See related class {@link ScatterRenderableSeries3D} which renders a {@link BasePointMarker3D} at
 * each Xyz point in an {@link XyzDataSeries3D} Data Series.
 */
var EllipsePointMarker3D = /** @class */ (function (_super) {
    __extends(EllipsePointMarker3D, _super);
    /**
     * Creates an instance of {@link EllipsePointMarker3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link IBasePointMarker3DOptions} used to configure the point-marker
     * @protected
     */
    function EllipsePointMarker3D(webAssemblyContext, options) {
        return _super.call(this, webAssemblyContext, options) || this;
    }
    Object.defineProperty(EllipsePointMarker3D.prototype, "pointsTexture", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.webAssemblyContext.SCRTGetTemplateTexture(this.webAssemblyContext.eSCRTTexture.SCRT_TEXTURE_CIRCLE);
        },
        enumerable: false,
        configurable: true
    });
    return EllipsePointMarker3D;
}(BaseTexturePointMarker3D_1.BaseTexturePointMarker3D));
exports.EllipsePointMarker3D = EllipsePointMarker3D;
/**
 * @summary The {@link TrianglePointMarker3D} renders a flat billboarded textured triangle to each XYZ point in a 3D Scatter or Bubble series.
 * @remarks See related class {@link ScatterRenderableSeries3D} which renders a {@link BasePointMarker3D} at
 * each Xyz point in an {@link XyzDataSeries3D} Data Series.
 */
var TrianglePointMarker3D = /** @class */ (function (_super) {
    __extends(TrianglePointMarker3D, _super);
    /**
     * Creates an instance of {@link TrianglePointMarker3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param options Optional parameters of type {@link IBasePointMarker3DOptions} used to configure the point-marker
     * @protected
     */
    function TrianglePointMarker3D(webAssemblyContext, options) {
        return _super.call(this, webAssemblyContext, options) || this;
    }
    Object.defineProperty(TrianglePointMarker3D.prototype, "pointsTexture", {
        /**
         * @inheritDoc
         */
        get: function () {
            return this.webAssemblyContext.SCRTGetTemplateTexture(this.webAssemblyContext.eSCRTTexture.SCRT_TEXTURE_TRIANGLE);
        },
        enumerable: false,
        configurable: true
    });
    return TrianglePointMarker3D;
}(BaseTexturePointMarker3D_1.BaseTexturePointMarker3D));
exports.TrianglePointMarker3D = TrianglePointMarker3D;
// TODO (Andrew): CustomPointMarker to return a TSRTexture with image or geometry defined by the user
