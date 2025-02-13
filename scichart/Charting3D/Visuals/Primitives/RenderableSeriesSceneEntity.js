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
exports.RenderableSeriesSceneEntity = void 0;
var HitTestInfo3D_1 = require("../RenderableSeries/HitTestInfo3D");
var BaseSceneEntity3D_1 = require("./BaseSceneEntity3D");
/**
 * @summary Defines a special {@link BaseSceneEntity3D} type which hosts the entity for a {@link BaseRenderableSeries3D | RenderableSeries},
 * or chart type in SciChart's High Performance {@link https://www.scichart.com/javascript-chart-features | JavaScript 3D Charts}
 */
var RenderableSeriesSceneEntity = /** @class */ (function (_super) {
    __extends(RenderableSeriesSceneEntity, _super);
    /**
     * Creates an instance of {@link RenderableSeriesSceneEntity}
     * @param webAssemblyContext The {@link TSciChart3D | SciChart 3D WebAssembly Context} containing native methods and
     * access to our WebGL2 Engine and WebAssembly numerical methods
     * @param parentSeries The parent {@link BaseRenderableSeries3D} which this entity maps to
     * @param state Current {@link RenderableSeriesSceneEntityState}
     */
    function RenderableSeriesSceneEntity(webAssemblyContext, parentSeries, state) {
        var _this = _super.call(this, webAssemblyContext) || this;
        _this.parentSeries = parentSeries;
        _this.state = state;
        _this.state.setInitialState();
        _this.hitTest = _this.hitTest.bind(_this);
        return _this;
    }
    /**
     * Update method called from WebAssembly engine. Use this to update meshes, properties, geometry before draw.
     * When overriding, you must call super.Update() for the object to draw in the scene
     * @param deltaTime
     * @constructor
     */
    RenderableSeriesSceneEntity.prototype.Update = function (deltaTime) {
        if (!this.currentRenderPassData) {
            return;
        }
        if (!this.state.validate(this.parentSeries, this.currentRenderPassData)) {
            this.updateSeries();
            this.state.reset(this.parentSeries, this.currentRenderPassData);
        }
        _super.prototype.Update.call(this, deltaTime);
    };
    /**
     * @inheritDoc
     */
    RenderableSeriesSceneEntity.prototype.onEngineRestart = function () {
        _super.prototype.onEngineRestart.call(this);
        // Reset Initial State
        this.state.setInitialState();
    };
    /**
     * Called when a property changes on the parent series
     * @param propertyName
     */
    RenderableSeriesSceneEntity.prototype.notifySeriesPropertyChanged = function (propertyName) {
        // Set Renderable Series Property Changed
        this.state.setRenderableSeriesPropertyChanged();
    };
    RenderableSeriesSceneEntity.prototype.hitTestXyz = function (screenPoint) {
        var _a;
        var x = Math.round(screenPoint.x);
        var y = Math.round(screenPoint.y);
        var selectionInfo = this.webAssemblyContext.SCRTGetSelectionInfo(x, y);
        var result = new HitTestInfo3D_1.HitTestInfo3D(this.parentSeries, false);
        result.isHit =
            selectionInfo.m_uiSelectionIndex > 0 && ((_a = selectionInfo.GetEntity()) === null || _a === void 0 ? void 0 : _a.GetEntityId()) === this.entityId;
        result.selectionIndex = result.isHit ? selectionInfo.m_uiSelectionIndex : -1;
        result.hitTestPoint = screenPoint;
        return result;
    };
    return RenderableSeriesSceneEntity;
}(BaseSceneEntity3D_1.BaseSceneEntity3D));
exports.RenderableSeriesSceneEntity = RenderableSeriesSceneEntity;
