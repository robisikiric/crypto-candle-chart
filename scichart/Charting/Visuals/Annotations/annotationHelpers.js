"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.annotationHelpers = void 0;
/** All svg creation is run through this funciton so it can be mocked for tests */
var createSvg = function (svgString, svgRoot, nextElement) {
    var svgNode = document.createRange().createContextualFragment(svgString);
    if (nextElement) {
        svgRoot.insertBefore(svgNode, nextElement);
        return nextElement.previousElementSibling;
    }
    svgRoot.appendChild(svgNode);
    return svgRoot.lastChild;
};
var calcNewApex = function (x1, y1, x2, y2, isVertical) {
    var x1y1 = { x: x1, y: y1 };
    var x2y1 = isVertical ? { x: x1, y: y2 } : { x: x2, y: y1 };
    var x1y2 = isVertical ? { x: x2, y: y1 } : { x: x1, y: y2 };
    var x2y2 = { x: x2, y: y2 };
    return { x1y1: x1y1, x2y1: x2y1, x1y2: x1y2, x2y2: x2y2 };
};
exports.annotationHelpers = {
    createSvg: createSvg,
    calcNewApex: calcNewApex
};
