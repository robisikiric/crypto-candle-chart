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
exports.GizmoEntity = void 0;
var SceneEntityType_1 = require("../../types/SceneEntityType");
var BaseSceneEntity3D_1 = require("./Primitives/BaseSceneEntity3D");
/**
 * The {@link GizmoEntity} renders a 3D X-Y-Z axis in the bottom left of the chart.
 * @remarks Added automatically by the {@link SciChart3DSurface} and may be enabled or
 * disabled by setting the {@link SciChart3DSurface.enableGizmo} property
 */
var GizmoEntity = /** @class */ (function (_super) {
    __extends(GizmoEntity, _super);
    /**
     * Creates an instance of the {@link GizmoEntity}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing
     * native methods and access to our WebGL2 WebAssembly Drawing Engine
     */
    function GizmoEntity(webAssemblyContext) {
        var _this = _super.call(this, webAssemblyContext) || this;
        /**
         * @inheritDoc
         */
        _this.type = SceneEntityType_1.ESceneEntityType.GizmoEntity;
        _this.setNativeEntity(webAssemblyContext.SCRTXyzGizmoEntity.implement(_this));
        return _this;
    }
    Object.defineProperty(GizmoEntity.prototype, "enableGizmo", {
        /**
         * Gets or sets whether the Gizmo is enabled
         */
        get: function () {
            return this.nativeEntity.GetOverrideEnableGizmo();
        },
        /**
         * Gets or sets whether the Gizmo is enabled
         */
        set: function (isEnabled) {
            this.nativeEntity.SetOverrideEnableGizmo(isEnabled);
        },
        enumerable: false,
        configurable: true
    });
    return GizmoEntity;
}(BaseSceneEntity3D_1.BaseSceneEntity3D));
exports.GizmoEntity = GizmoEntity;
