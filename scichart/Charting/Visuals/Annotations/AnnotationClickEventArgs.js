"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnotationClickEventArgs = void 0;
var AnnotationClickEventArgs = /** @class */ (function () {
    function AnnotationClickEventArgs(sender, mouseArgs, relativeCoords) {
        this.sender = sender;
        this.mouseArgs = mouseArgs;
        this.relativeCoords = relativeCoords;
    }
    return AnnotationClickEventArgs;
}());
exports.AnnotationClickEventArgs = AnnotationClickEventArgs;
