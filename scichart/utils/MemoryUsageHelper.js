"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryUsageHelper = exports.generateIdentifier = exports.ObjectRegistry = void 0;
var LabelCache_1 = require("../Charting/Visuals/Axis/LabelProvider/LabelCache");
var Globals_1 = require("../Core/Globals");
var guid_1 = require("./guid");
/** ObjectRegistry represents a structure for storing object lifecycle info.
 * Adding an object to the registry will place it into a category of undeleted until it is remove from the registry.
 * Also the object will be placed into a category of uncollected until it is disposed by garbage collector.
 */
var ObjectRegistry = /** @class */ (function () {
    function ObjectRegistry() {
        var _this = this;
        this.weakMapRegistry = new WeakMap();
        // This structure is useful for tracking DeletableEntity or Native objects
        // which were not disposed using delete method
        this.undeletedObjectsMap = new Map();
        this.uncollectedObjectsMap = new Map();
        // @ts-ignore
        this.finalizationRegistry = new FinalizationRegistry(function (id) {
            _this.uncollectedObjectsMap.delete(id);
            _this.onCollect(id);
        });
    }
    /** Adds an object and its related info to the registry */
    ObjectRegistry.prototype.add = function (obj, id, options) {
        var _a, _b;
        if (options === void 0) { options = { isWasmObject: false }; }
        var isWasmObject = options.isWasmObject;
        if (this.weakMapRegistry.has(obj)) {
            console.warn("Adding existing entry to the registry!", id);
        }
        if (this.undeletedObjectsMap.has(id)) {
            console.warn("Adding existing entry id to the registry!", id);
        }
        this.finalizationRegistry.register(obj, id);
        this.weakMapRegistry.set(obj, id);
        var proxy = (_b = (_a = options === null || options === void 0 ? void 0 : options.revocableToken) === null || _a === void 0 ? void 0 : _a.proxy) !== null && _b !== void 0 ? _b : options === null || options === void 0 ? void 0 : options.proxy;
        var revocableToken = options === null || options === void 0 ? void 0 : options.revocableToken;
        if (proxy) {
            this.weakMapRegistry.set(proxy, id);
        }
        // @ts-ignore WeakRef
        var objectRef = new WeakRef(obj);
        // @ts-ignore WeakRef
        var proxyRef = proxy && new WeakRef(proxy);
        // @ts-ignore WeakRef
        var revocableTokenRef = revocableToken && new WeakRef(revocableToken);
        var objInfo = { isWasmObject: isWasmObject, objectRef: objectRef, proxyRef: proxyRef, revocableTokenRef: revocableTokenRef };
        if (obj.delete) {
            this.undeletedObjectsMap.set(id, objInfo);
        }
        this.uncollectedObjectsMap.set(id, objInfo);
    };
    /** Removes the object from the undeleted objects collection */
    ObjectRegistry.prototype.remove = function (id) {
        if (!this.undeletedObjectsMap.has(id) && !this.uncollectedObjectsMap.has(id)) {
            console.warn("".concat(id, " was not found in the ObjectRegistry!"));
        }
        return this.undeletedObjectsMap.delete(id);
    };
    ObjectRegistry.prototype.getObjectId = function (obj) {
        return this.weakMapRegistry.get(obj);
    };
    /** Calls `delete` on instances of {@link IDeletable} objects within the registry */
    ObjectRegistry.prototype.deleteIDeletableObjects = function () {
        var _this = this;
        this.undeletedObjectsMap.forEach(function (entry, key) {
            if (!entry.isWasmObject) {
                _this.deleteEntry(entry, key);
            }
        });
    };
    /** Calls `delete` on instances of Web Assembly objects within the registry */
    ObjectRegistry.prototype.deleteWasmObjects = function () {
        var _this = this;
        this.undeletedObjectsMap.forEach(function (entry, key) {
            if (entry.isWasmObject) {
                _this.deleteEntry(entry, key);
            }
        });
    };
    /** Outputs the state of registry to the console */
    ObjectRegistry.prototype.log = function () {
        var _this = this;
        var undeletedObjectsIds = Array.from(this.undeletedObjectsMap.keys());
        var uncollectedObjectsIds = Array.from(this.uncollectedObjectsMap.keys());
        var collectedNotDeleted = undeletedObjectsIds.filter(function (id) { return !_this.uncollectedObjectsMap.has(id); });
        var deletedNotCollected = uncollectedObjectsIds.filter(function (id) { return !_this.undeletedObjectsMap.has(id); });
        var axisLabelCacheSize = LabelCache_1.labelCache.getSize();
        console.log("Object Registry Log Start:");
        console.log("undeletedObjectsMap", this.undeletedObjectsMap);
        console.log("uncollectedObjectsMap", this.uncollectedObjectsMap);
        console.log("collectedNotDeleted", collectedNotDeleted);
        console.log("deletedNotCollected", deletedNotCollected);
        console.log("weakMap", this.weakMapRegistry);
        console.log("axisLabelCacheSize", axisLabelCacheSize);
        console.log("Object Registry Log End");
    };
    /** Returns the state of the registry */
    ObjectRegistry.prototype.getState = function () {
        var undeletedObjectsIds = Array.from(this.undeletedObjectsMap.keys());
        var uncollectedObjectsIds = Array.from(this.uncollectedObjectsMap.keys());
        var state = {};
        if (undeletedObjectsIds.length) {
            state.undeletedObjectsIds = undeletedObjectsIds;
        }
        if (uncollectedObjectsIds.length) {
            state.uncollectedObjectsIds = uncollectedObjectsIds;
        }
        return state;
    };
    /** Calls `delete` on a specific object within the registry */
    ObjectRegistry.prototype.deleteEntry = function (entry, key) {
        var originalObject = entry.objectRef.deref();
        if (originalObject) {
            originalObject.delete();
            this.remove(key);
        }
        else {
            console.warn("Looks like the ".concat(key, " has already been garbage collected, thus the proper cleanup could not be executed!"));
        }
    };
    /** The callback executed when an object is being garbage collected */
    ObjectRegistry.prototype.onCollect = function (id) {
        // Override with custom behavior
    };
    return ObjectRegistry;
}());
exports.ObjectRegistry = ObjectRegistry;
/** @ignore */
var generateIdentifier = function (entity) {
    return "".concat(entity === null || entity === void 0 ? void 0 : entity.constructor.name, "_").concat((0, guid_1.generateGuid)());
};
exports.generateIdentifier = generateIdentifier;
/** {@link MemoryUsageHelper} provides tools for tracking, debugging, and testing common issus related to lifecycle of SciChart entities. */
var MemoryUsageHelper = /** @class */ (function () {
    function MemoryUsageHelper() {
    }
    Object.defineProperty(MemoryUsageHelper, "isMemoryUsageDebugEnabled", {
        /** Gets or sets the `Memory Usage Debug Mode`.
         * Enabling the mode, provides warnings about wrong usage or cleanup.
         * Also it wraps SciChart entities and adds them to the {@link objectRegistry} to track their lifecycle
         */
        get: function () {
            return this.isMemoryUsageDebugEnabledProperty;
        },
        /** Gets or sets the `Memory Usage Debug Mode`.
         * Enabling the mode, provides warnings about wrong usage or cleanup.
         * Also it wraps SciChart entities and adds them to the {@link objectRegistry} to track their lifecycle
         */
        set: function (value) {
            if (value) {
                console.warn("Memory usage debug enabled! Make sure to disable it for production build!");
            }
            try {
                if (process.env.NODE_ENV !== "production") {
                    this.isMemoryUsageDebugEnabledProperty = value;
                    if (value && !MemoryUsageHelper.objectRegistry) {
                        MemoryUsageHelper.objectRegistry = new ObjectRegistry();
                    }
                    return;
                }
            }
            catch (err) {
                console.warn(err);
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Adds entity to the object registry to keep track of it being collected
     * @param entity
     * @param id optional custom ID of the entity
     */
    MemoryUsageHelper.register = function (entity, id) {
        var _a;
        if (!entity) {
            console.warn("Registering invalid object \"".concat(entity, "\"!"));
            return;
        }
        (_a = MemoryUsageHelper.objectRegistry) === null || _a === void 0 ? void 0 : _a.add(entity, id !== null && id !== void 0 ? id : (0, exports.generateIdentifier)(entity));
    };
    /**
     * Removes entity from the object registry
     * @param id ID of the entity
     */
    MemoryUsageHelper.unregister = function (id) {
        var _a;
        (_a = MemoryUsageHelper.objectRegistry) === null || _a === void 0 ? void 0 : _a.remove(id);
    };
    /**
     * Calls `delete` on all 2D and 3D charts instantiated with {@link SciChartSurface.create} or {@link SciChart3DSurface.create}
     */
    MemoryUsageHelper.destroyMultiChart = function () {
        Globals_1.sciChartDestinations.forEach(function (destination) { return destination.sciChartSurface.delete(true); });
        Globals_1.sciChart3DDestinations.forEach(function (destination) { return destination.sciChartSurface.delete(true); });
    };
    /**
     * Calls `delete` on all 2D and 3D charts instantiated with {@link SciChartSurface.createSingle} or {@link SciChart3DSurface.createSingle}
     */
    MemoryUsageHelper.destroySingleCharts = function () {
        Globals_1.sciChartSingleDestinations.forEach(function (destination) { return destination.sciChartSurface.delete(true); });
        Globals_1.sciChart3DSingleDestinations.forEach(function (destination) { return destination.sciChartSurface.delete(true); });
    };
    /**
     * Calls `delete` on all charts instantiated with {@link SciChartPieSurface.create}
     */
    MemoryUsageHelper.destroyPieCharts = function () {
        Globals_1.sciChartPieDestinations.forEach(function (destination) { return destination.sciChartSurface.delete(true); });
    };
    /**
     * Calls `delete` on all charts
     */
    MemoryUsageHelper.destroyAllCharts = function () {
        MemoryUsageHelper.destroyMultiChart();
        MemoryUsageHelper.destroySingleCharts();
        MemoryUsageHelper.destroyPieCharts();
    };
    MemoryUsageHelper.isMemoryUsageDebugEnabledProperty = false;
    return MemoryUsageHelper;
}());
exports.MemoryUsageHelper = MemoryUsageHelper;
