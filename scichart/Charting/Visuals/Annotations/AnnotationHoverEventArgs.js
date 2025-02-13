"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnotationHoverEventArgs = void 0;
var Point_1 = require("../../../Core/Point");
var DpiHelper_1 = require("../TextureManager/DpiHelper");
var AnnotationHoverEventArgs = /** @class */ (function () {
    function AnnotationHoverEventArgs(options) {
        var sender = options.sender, mouseArgs = options.mouseArgs, isHovered = options.isHovered;
        this.sender = sender;
        this.mouseArgs = mouseArgs;
        this.isHovered = isHovered;
    }
    AnnotationHoverEventArgs.prototype.getRelativeCoordinates = function () {
        var borders = this.sender.getAdornerAnnotationBorders(true);
        var x = this.mouseArgs.mousePoint.x / DpiHelper_1.DpiHelper.PIXEL_RATIO;
        var y = this.mouseArgs.mousePoint.y / DpiHelper_1.DpiHelper.PIXEL_RATIO;
        return new Point_1.Point(x - borders.x1, y - borders.y1);
    };
    return AnnotationHoverEventArgs;
}());
exports.AnnotationHoverEventArgs = AnnotationHoverEventArgs;
