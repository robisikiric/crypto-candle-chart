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
exports.WebGlBrush = void 0;
var DeletableEntity_1 = require("../../Core/DeletableEntity");
var Deleter_1 = require("../../Core/Deleter");
var constants_1 = require("./constants");
/**
 * The WebGLBrush is a brush for polygon fills, rectangle fills, which can be passed to SciChart's WebGL / WebAssembly graphics engine
 */
var WebGlBrush = /** @class */ (function (_super) {
    __extends(WebGlBrush, _super);
    /**
     * Creates an instance of WebGlBrush
     * @param scrtBrush the inner {@link SCRTBrush} which can be passed to SciChart's WebAssembly WebGL engine
     */
    function WebGlBrush(scrtBrush) {
        var _this = _super.call(this) || this;
        _this.scrtBrushProperty = scrtBrush;
        return _this;
    }
    Object.defineProperty(WebGlBrush.prototype, "scrtBrush", {
        /**
         * Get the inner {@link SCRTBrush} which can be passed to SciChart's WebAssembly WebGL engine
         */
        get: function () {
            return this.scrtBrushProperty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    WebGlBrush.prototype.delete = function () {
        this.scrtBrushProperty = (0, Deleter_1.deleteSafe)(this.scrtBrushProperty);
    };
    /**
     * @inheritDoc
     */
    WebGlBrush.prototype.getBrushType = function () {
        return constants_1.EDrawingTypes.WasmBrush;
    };
    /**
     * @inheritDoc
     */
    WebGlBrush.prototype.setOpacity = function (opacity) {
        var _a;
        (_a = this.scrtBrushProperty) === null || _a === void 0 ? void 0 : _a.SetOpacity(opacity);
    };
    return WebGlBrush;
}(DeletableEntity_1.DeletableEntity));
exports.WebGlBrush = WebGlBrush;
