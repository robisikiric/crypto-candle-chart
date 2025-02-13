"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFontString = void 0;
/**
 * Creates the font string, which is used to set font on CanvasRenderingContext2D
 * @param fontStyle The font style
 * @param fontWeight The font weight
 * @param fontSize The font size in pixels
 * @param fontFamily The font family
 */
var getFontString = function (fontStyle, fontWeight, fontSize, fontFamily) {
    if (!fontWeight)
        return "".concat(fontStyle, " ").concat(fontSize, "px ").concat(fontFamily);
    return "".concat(fontStyle, " ").concat(fontWeight, " ").concat(fontSize, "px ").concat(fontFamily);
};
exports.getFontString = getFontString;
