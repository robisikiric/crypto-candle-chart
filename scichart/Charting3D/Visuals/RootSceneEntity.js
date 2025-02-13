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
exports.RootSceneEntity = void 0;
var SceneEntityType_1 = require("../../types/SceneEntityType");
var BaseSceneEntity3D_1 = require("./Primitives/BaseSceneEntity3D");
var EntityIdProvider_1 = require("./Primitives/EntityIdProvider");
var Guard_1 = require("../../Core/Guard");
/**
 * @summary Defines a special {@link BaseSceneEntity3D} type which is the root of the entire scene in
 * in SciChart's High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks
 * Add and remove entities to the scene using the property {@link SciChart3DSurface.rootEntity} and calling
 * {@link RootSceneEntity.children | SceneEntity.children.add}.
 *
 * When a {@link BaseRenderableSeries3D} is added to {@link SciChart3DSurface.renderableSeries}, it's entity is automatically added to the scene.
 */
var RootSceneEntity = /** @class */ (function (_super) {
    __extends(RootSceneEntity, _super);
    /**
     * Creates an instance of the {@link RootSceneEntity}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     */
    function RootSceneEntity(webAssemblyContext, parentSurface) {
        var _this = _super.call(this, webAssemblyContext) || this;
        /**
         * @inheritDoc
         */
        _this.type = SceneEntityType_1.ESceneEntityType.RootSceneEntity;
        Guard_1.Guard.notNull(parentSurface, "parentSurface");
        _this.parentSurface = parentSurface;
        _this.entityIdProvider = new EntityIdProvider_1.DefaultEntityIdProvider();
        return _this;
    }
    /**
     * @inheritDoc
     */
    RootSceneEntity.prototype.attachChild = function (childEntity) {
        var parentEntity = this;
        if (childEntity === null || childEntity === void 0 ? void 0 : childEntity.nativeEntity) {
            this.world.AddEntity(childEntity.nativeEntity);
        }
        childEntity.entityIdProvider = this.entityIdProvider;
        childEntity.parent = parentEntity;
        childEntity.onAttached();
    };
    /**
     * @inheritDoc
     */
    RootSceneEntity.prototype.detachChild = function (childEntity) {
        if (childEntity === null || childEntity === void 0 ? void 0 : childEntity.nativeEntity) {
            this.world.RemoveEntity(childEntity.nativeEntity);
        }
        childEntity.onDetached();
        childEntity.parent = undefined;
    };
    return RootSceneEntity;
}(BaseSceneEntity3D_1.BaseSceneEntity3D));
exports.RootSceneEntity = RootSceneEntity;
