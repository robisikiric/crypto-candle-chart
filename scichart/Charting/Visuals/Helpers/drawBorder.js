"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawBorder = void 0;
var createNativeRect_1 = require("./createNativeRect");
var NativeObject_1 = require("./NativeObject");
var drawBorder = function (renderContext, webAssemblyContext2D, solidBrushCacheBorder, borderRect, leftBorder, topBorder, rightBorder, bottomBorder, color) {
    if (bottomBorder === 0 && topBorder === 0 && leftBorder === 0 && rightBorder === 0) {
        return;
    }
    var solidBrush = solidBrushCacheBorder.newBrush(color, true);
    var vecRects = (0, NativeObject_1.getVectorRectVertex)(webAssemblyContext2D);
    vecRects.push_back((0, createNativeRect_1.createNativeRect)(webAssemblyContext2D, borderRect.x, borderRect.y - topBorder, borderRect.x + borderRect.width + rightBorder, borderRect.y));
    vecRects.push_back((0, createNativeRect_1.createNativeRect)(webAssemblyContext2D, borderRect.x + borderRect.width, borderRect.y, borderRect.x + borderRect.width + rightBorder, borderRect.y + borderRect.height + bottomBorder));
    vecRects.push_back((0, createNativeRect_1.createNativeRect)(webAssemblyContext2D, borderRect.x - leftBorder, borderRect.y + borderRect.height, borderRect.x + borderRect.width, borderRect.y + borderRect.height + bottomBorder));
    vecRects.push_back((0, createNativeRect_1.createNativeRect)(webAssemblyContext2D, borderRect.x - leftBorder, borderRect.y - topBorder, borderRect.x, borderRect.y + borderRect.height));
    renderContext.drawRects(vecRects, solidBrush, 0, 0);
};
exports.drawBorder = drawBorder;
