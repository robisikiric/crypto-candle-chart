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
exports.BaseSceneEntity3D = void 0;
var DeletableEntity_1 = require("../../../Core/DeletableEntity");
var Deleter_1 = require("../../../Core/Deleter");
var Guard_1 = require("../../../Core/Guard");
var ObservableArray_1 = require("../../../Core/ObservableArray");
var SceneEntityType_1 = require("../../../types/SceneEntityType");
var guid_1 = require("../../../utils/guid");
/**
 * The {@link BaseSceneEntity3D} provides a base class for entities, or 3D objects in the 3D scene within
 * SciChart's High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 * @remarks Each {@link BaseSceneEntity3D} wraps a native WebAssembly {@link SCRTSceneEntity} which is returned by
 * the {@link nativeEntity} property. This is passed to SciChart's 3D engine and inserted into the scene when added
 * to the {@link SciChart3DSurface.rootEntity} collection.
 */
var BaseSceneEntity3D = /** @class */ (function (_super) {
    __extends(BaseSceneEntity3D, _super);
    /**
     * Creates an instance of the {@link BaseSceneEntity3D}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @protected
     */
    function BaseSceneEntity3D(webAssemblyContext) {
        var _this = _super.call(this) || this;
        /** @inheritDoc */
        _this.id = (0, guid_1.generateGuid)();
        /**
         * When true, the entity and all its children are visible
         */
        _this.isVisible = true;
        _this.entityIdProperty = undefined;
        Guard_1.Guard.notNull(webAssemblyContext, "webAssemblyContext");
        _this.webAssemblyContext = webAssemblyContext;
        _this.detachChild = _this.detachChild.bind(_this);
        _this.attachChild = _this.attachChild.bind(_this);
        _this.children = new ObservableArray_1.ObservableArray();
        _this.children.collectionChanged.subscribe(function (args) {
            var _a, _b;
            (_a = args.getOldItems()) === null || _a === void 0 ? void 0 : _a.forEach(_this.detachChild);
            (_b = args.getNewItems()) === null || _b === void 0 ? void 0 : _b.forEach(_this.attachChild);
        });
        _this.onDpiChanged = _this.onDpiChanged.bind(_this);
        return _this;
    }
    Object.defineProperty(BaseSceneEntity3D.prototype, "entityIdProvider", {
        /** @inheritDoc */
        get: function () {
            return this.entityIdProviderProperty;
        },
        /** @inheritDoc */
        set: function (value) {
            var _this = this;
            this.entityIdProviderProperty = value;
            // Assign an entity Id to this entity
            if (!this.entityId && this.entityIdProviderProperty) {
                this.entityId = this.entityIdProviderProperty.getNextEntityId();
            }
            // Pass entityIdProvider down to child entities except this
            this.visitEntities(function (e) {
                if (e !== _this) {
                    e.entityIdProvider = value;
                }
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BaseSceneEntity3D.prototype, "entityId", {
        /** @inheritDoc */
        get: function () {
            return this.entityIdProperty;
        },
        /** @inheritDoc */
        set: function (value) {
            var _a;
            this.entityIdProperty = value;
            (_a = this.nativeEntityProperty) === null || _a === void 0 ? void 0 : _a.SetEntityId(value);
            this.invalidateScene();
        },
        enumerable: false,
        configurable: true
    });
    /** @inheritDoc */
    BaseSceneEntity3D.prototype.getRoot = function () {
        if (this.type === SceneEntityType_1.ESceneEntityType.RootSceneEntity) {
            return this;
        }
        var parent = this.parent;
        while (parent !== undefined) {
            if (parent.type === SceneEntityType_1.ESceneEntityType.RootSceneEntity) {
                return parent;
            }
            parent = parent.parent;
        }
        return undefined;
    };
    /** @inheritDoc */
    BaseSceneEntity3D.prototype.delete = function () {
        var _a;
        this.children.asArray().forEach(function (el) { return el.delete(); });
        (_a = this.entityIdProvider) === null || _a === void 0 ? void 0 : _a.releaseEntityId(this.entityId);
        if (this.nativeEntity && this.world) {
            this.world.RemoveEntity(this.nativeEntity);
        }
        this.nativeEntityProperty = (0, Deleter_1.deleteSafe)(this.nativeEntityProperty);
        this.webAssemblyContext = undefined;
    };
    /**
     * Update method called from WebAssembly engine. Use this to update meshes, properties, geometry before draw.
     * When overriding, you must call super.Update() for the object to draw in the scene
     * @param deltaTime
     * @constructor
     */
    BaseSceneEntity3D.prototype.Update = function (deltaTime) {
        // this gets called from wasm!!
        // when overriding always call super.Update(deltaTime) in the end of the method
        if (!this.currentRenderPassData) {
            return;
        }
        if (!this.nativeEntity) {
            throw new Error("BaseSceneEntity.nativeSceneEntity must be set by calling setEntity() in the constructor");
        }
        if (this.isVisible) {
            this.nativeEntity.Update(deltaTime);
        }
    };
    /**
     * Render method called from WebAssembly engine. Use this to do immediate-mode 3D drawing, or to draw created meshes
     * When overriding, you must call super.Update() for the object to draw in the scene
     * @constructor
     */
    BaseSceneEntity3D.prototype.Render = function () {
        // this gets called from wasm!!
        if (!this.currentRenderPassData) {
            return;
        }
        if (!this.nativeEntity) {
            throw new Error("BaseSceneEntity.nativeSceneEntity must be set by calling setEntity() in the constructor");
        }
        if (this.isVisible) {
            this.nativeEntity.Render();
        }
    };
    /** @inheritDoc */
    BaseSceneEntity3D.prototype.onEngineRestart = function () {
        // TODO: TSRSceneEntity.OnEngineRestart
    };
    /** @inheritDoc */
    BaseSceneEntity3D.prototype.onDpiChanged = function (args) { };
    /** @inheritDoc */
    BaseSceneEntity3D.prototype.setRenderPassData = function (rpd) {
        this.currentRenderPassData = rpd;
    };
    /** @inheritDoc */
    BaseSceneEntity3D.prototype.getEntity = function (type) {
        for (var i = 0; i < this.children.size(); i++) {
            var ent = this.children.get(i);
            if (ent.type === type) {
                return ent;
            }
        }
        // TODO: return default(T);
        return undefined;
    };
    /**
     * Call this to inform SciChart that data or properties have changed and the 3D Scene must be redrawn
     */
    BaseSceneEntity3D.prototype.invalidateScene = function () {
        var _a, _b;
        (_b = (_a = this.rootSceneEntity) === null || _a === void 0 ? void 0 : _a.parentSurface) === null || _b === void 0 ? void 0 : _b.invalidateElement();
    };
    /** @inheritDoc */
    BaseSceneEntity3D.prototype.onAttached = function () {
        if (this.parent.type === SceneEntityType_1.ESceneEntityType.SCRTSceneEntity) {
            // TODO
            // var world = scrtSeParent.GetWorld();
            // SetWorld(world);
            // _nativeEntity.SetWorld(world);
        }
    };
    /** @inheritDoc */
    BaseSceneEntity3D.prototype.onDetached = function () {
        // Override in derived class to be notified of detached
    };
    /** @inheritDoc */
    BaseSceneEntity3D.prototype.visitEntities = function (operation) {
        operation(this);
        this.children.asArray().forEach(function (child) {
            child.visitEntities(operation);
        });
    };
    Object.defineProperty(BaseSceneEntity3D.prototype, "nativeEntity", {
        /** @inheritDoc */
        get: function () {
            return this.nativeEntityProperty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Called internally - Attach a child to the current entity
     * @param childEntity
     * @protected
     */
    BaseSceneEntity3D.prototype.attachChild = function (childEntity) {
        var _a;
        var parentEntity = this;
        (_a = parentEntity.nativeEntity) === null || _a === void 0 ? void 0 : _a.AddChildEntityInternal(childEntity.nativeEntity);
        childEntity.parent = parentEntity;
        childEntity.entityIdProvider = this.entityIdProvider;
        childEntity.onAttached();
    };
    /**
     * Called internally - detach a child from the current entity
     * @param childEntity
     * @protected
     */
    BaseSceneEntity3D.prototype.detachChild = function (childEntity) {
        var _a;
        var parentEntity = this;
        (_a = parentEntity.nativeEntity) === null || _a === void 0 ? void 0 : _a.RemoveChildEntityInternal(childEntity.nativeEntity);
        childEntity.onDetached();
        childEntity.parent = undefined;
    };
    /**
     * Called internally - sets the native entity
     * @param entity
     * @protected
     */
    BaseSceneEntity3D.prototype.setNativeEntity = function (entity) {
        var _a;
        this.nativeEntityProperty = entity;
        if (this.entityId) {
            (_a = this.nativeEntityProperty) === null || _a === void 0 ? void 0 : _a.SetEntityId(this.entityId);
        }
    };
    Object.defineProperty(BaseSceneEntity3D.prototype, "world", {
        /**
         * Called internally - gets the world entity
         * @protected
         */
        get: function () {
            var _a, _b;
            return (_b = (_a = this.getRoot()) === null || _a === void 0 ? void 0 : _a.parentSurface) === null || _b === void 0 ? void 0 : _b.getSceneWorld();
        },
        enumerable: false,
        configurable: true
    });
    return BaseSceneEntity3D;
}(DeletableEntity_1.DeletableEntity));
exports.BaseSceneEntity3D = BaseSceneEntity3D;
