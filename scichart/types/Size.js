"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Size = void 0;
/**
 * Defines a Size type with Width, Height
 */
var Size = /** @class */ (function () {
    /**
     * Creates an instance of the Size with specified width and height
     * @param width
     * @param height
     */
    function Size(width, height) {
        this.width = width;
        this.height = height;
    }
    /**
     * The static Empty size returns a Size with Width=0, Height=0
     */
    Size.EMPTY = new Size(0, 0);
    return Size;
}());
exports.Size = Size;
