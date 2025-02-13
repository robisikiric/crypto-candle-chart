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
exports.WebGlPen = void 0;
var app_1 = require("../../constants/app");
var DeletableEntity_1 = require("../../Core/DeletableEntity");
var Deleter_1 = require("../../Core/Deleter");
var colorUtil_1 = require("../../utils/colorUtil");
var constants_1 = require("./constants");
/**
 * The WebGlPen is a pen for polygon stroke, line strokes, which can be passed to SciChart's WebGL / WebAssembly graphics engine
 */
var WebGlPen = /** @class */ (function (_super) {
    __extends(WebGlPen, _super);
    /**
     * Creates an instance of WebGlPen
     * @param scrtPen the inner {@link SCRTPen} which can be passed to SciChart's WebAssembly WebGL engine
     * @param originalColor the original color which is used to change the opacity
     */
    function WebGlPen(scrtPen, originalColor) {
        var _this = _super.call(this) || this;
        _this.scrtPenProperty = scrtPen;
        _this.originalColor = originalColor !== null && originalColor !== void 0 ? originalColor : scrtPen === null || scrtPen === void 0 ? void 0 : scrtPen.m_uiColor;
        return _this;
    }
    Object.defineProperty(WebGlPen.prototype, "scrtPen", {
        /**
         * the inner {@link SCRTPen} which can be passed to SciChart's WebAssembly WebGL engine
         */
        get: function () {
            return this.scrtPenProperty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @inheritDoc
     */
    WebGlPen.prototype.delete = function () {
        this.scrtPenProperty = (0, Deleter_1.deleteSafe)(this.scrtPenProperty);
    };
    /**
     * @inheritDoc
     */
    WebGlPen.prototype.getPenType = function () {
        return constants_1.EDrawingTypes.WasmPen;
    };
    /**
     * @inheritDoc
     */
    WebGlPen.prototype.setOpacity = function (opacity) {
        if (app_1.IS_TEST_ENV) {
            return;
        }
        this.scrtPen.m_uiColor = (0, colorUtil_1.uintArgbColorMultiplyOpacity)(this.originalColor, opacity);
    };
    return WebGlPen;
}(DeletableEntity_1.DeletableEntity));
exports.WebGlPen = WebGlPen;
