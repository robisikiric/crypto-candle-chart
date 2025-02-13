"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNativeRect = void 0;
var NativeObject_1 = require("./NativeObject");
var rect;
/**
 * Helper function to create a {@link SCRTRectVertex} native rectangle vertex
 * @param webAssemblyContext The {@link TSciChart | SciChart 2D WebAssembly Context} containing native methods and
 * access to our WebGL2 Engine and WebAssembly numerical methods
 * @param xTopLeft
 * @param yTopLeft
 * @param xBottomRight
 * @param yBottomRight
 */
var createNativeRect = function (webAssemblyContext, xTopLeft, yTopLeft, xBottomRight, yBottomRight) {
    return (0, NativeObject_1.getNativeRect)(webAssemblyContext, xTopLeft, yTopLeft, xBottomRight, yBottomRight);
};
exports.createNativeRect = createNativeRect;
