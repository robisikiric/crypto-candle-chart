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
exports.CrosshairLinesSceneEntity = void 0;
var Deleter_1 = require("../../../Core/Deleter");
var SceneEntityType_1 = require("../../../types/SceneEntityType");
var parseColor_1 = require("../../../utils/parseColor");
var Vector3_1 = require("../../Vector3");
var BaseSceneEntity3D_1 = require("./BaseSceneEntity3D");
/**
 * Draws a crosshair from the {@link location} to the walls of the bounding box (defined by {@link worldDimensions}).
 * Properties {@link stroke}, {@link strokeThickness} and {@link antiAliased} can be used to customize the appearance of the line.
 * The {@link CrosshairLinesSceneEntity} inherits {@link BaseSceneEntity3D} and can be added to the {@link SciChart3DSurface}
 * via the {@link SciChart3DSurface.rootEntity} property.
 */
var CrosshairLinesSceneEntity = /** @class */ (function (_super) {
    __extends(CrosshairLinesSceneEntity, _super);
    function CrosshairLinesSceneEntity(webAssemblyContext) {
        var _this = _super.call(this, webAssemblyContext) || this;
        /** @inheritDoc */
        _this.type = SceneEntityType_1.ESceneEntityType.Custom;
        /**
         * The strokethickness of crosshair lines
         */
        _this.strokeThickness = 2;
        /**
         * The stroke of crosshair lines
         */
        _this.stroke = "#FF6600";
        /**
         * Whether crosshair lines are antialiased or not
         */
        _this.antiAliased = true;
        // Required to get callbacks on Update() and Render() from Wasm to JS
        _this.setNativeEntity(webAssemblyContext.SCRTSceneEntity.implement(_this));
        return _this;
    }
    /** @inheritDoc */
    CrosshairLinesSceneEntity.prototype.delete = function () {
        _super.prototype.delete.call(this);
        this.linesMesh = (0, Deleter_1.deleteSafe)(this.linesMesh);
    };
    /** @inheritDoc */
    CrosshairLinesSceneEntity.prototype.Render = function () {
        if (!this.isVisible || !this.worldDimensions || !this.cameraPosition || !this.location)
            return;
        var wallVector = this.getWallVector();
        this.linesMesh = (0, Deleter_1.deleteSafe)(this.linesMesh);
        // Linesmesh with isStrips=false means eacn x0y0 x1y1 pair is a separate line segment
        var linesMesh = new this.webAssemblyContext.SCRTLinesMesh(this.strokeThickness, false, this.antiAliased);
        linesMesh.SetVertexColor((0, parseColor_1.parseColorToUIntArgb)(this.stroke));
        // Draw a line to XY wall from the cursor spot, if in bounds
        if (this.inInWorldDimensions(this.location.x, this.location.y, 0, this.worldDimensions)) {
            linesMesh.SetVertex3(this.location.x, this.location.y, this.location.z);
            linesMesh.SetVertex3(this.location.x, this.location.y, wallVector.z);
        }
        // Draw a line to XZ wall from the cursor spot, if in bounds
        if (this.inInWorldDimensions(this.location.x, 0, this.location.z, this.worldDimensions)) {
            linesMesh.SetVertex3(this.location.x, this.location.y, this.location.z);
            linesMesh.SetVertex3(this.location.x, wallVector.y, this.location.z);
        }
        // Draw a line to the YZ wall from the cursor spot, if in bounds
        if (this.inInWorldDimensions(0, this.location.y, 0, this.worldDimensions)) {
            linesMesh.SetVertex3(this.location.x, this.location.y, this.location.z);
            linesMesh.SetVertex3(wallVector.x, this.location.y, this.location.z);
        }
        // No further changes possible
        linesMesh.Freeze();
        // Draw
        linesMesh.Render();
    };
    CrosshairLinesSceneEntity.prototype.inInWorldDimensions = function (x, y, z, worldDimensions) {
        return (y >= 0 &&
            y <= worldDimensions.y &&
            z >= -worldDimensions.z / 2 &&
            z <= worldDimensions.z / 2 &&
            x >= -worldDimensions.x / 2 &&
            x <= worldDimensions.x / 2);
    };
    CrosshairLinesSceneEntity.prototype.getWallVector = function () {
        var x = this.cameraPosition.dotProduct(new Vector3_1.Vector3(1, 0, 0)) > 0
            ? -this.worldDimensions.x * 0.5
            : this.worldDimensions.x * 0.5;
        var y = this.cameraPosition.dotProduct(new Vector3_1.Vector3(0, 1, 0)) > 0 ? 0 : this.worldDimensions.y;
        var z = this.cameraPosition.dotProduct(new Vector3_1.Vector3(0, 0, 1)) > 0
            ? -this.worldDimensions.z * 0.5
            : this.worldDimensions.z * 0.5;
        return new Vector3_1.Vector3(x, y, z);
    };
    return CrosshairLinesSceneEntity;
}(BaseSceneEntity3D_1.BaseSceneEntity3D));
exports.CrosshairLinesSceneEntity = CrosshairLinesSceneEntity;
