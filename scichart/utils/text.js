"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNativeTextSize = exports.wrapNativeText = void 0;
var NativeObject_1 = require("../Charting/Visuals/Helpers/NativeObject");
/**
 * Wrap a string by adding newline characters, splitting on spaces and wrapping to a maximum size
 */
var wrapNativeText = function (text, maxWidth, font, textBounds) {
    if (maxWidth === 0)
        return text;
    if (!text) {
        return "";
    }
    var lines = [];
    var words = text.split(" ");
    // calculate size of each word
    var first = words[0].trim();
    var allWords = first + " " + first + "\n" + words.map(function (w) { return w.trim(); }).join("\n");
    font.CalculateStringBounds(allWords !== null && allWords !== void 0 ? allWords : "", textBounds, 2);
    var line = "";
    var lineWidth = 0;
    var spaceWidth = textBounds.GetLineBounds(0).m_fWidth - 2 * textBounds.GetLineBounds(1).m_fWidth;
    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        var wordWidth = textBounds.GetLineBounds(i + 1).m_fWidth;
        var newLine = line + (line !== "" ? " " : "") + word;
        lineWidth += (line !== "" ? spaceWidth : 0) + wordWidth;
        if (lineWidth > maxWidth) {
            if (line === "") {
                lines.push(word);
                lineWidth = 0;
            }
            else {
                lines.push(line);
                line = word;
                lineWidth = wordWidth;
            }
        }
        else {
            line = newLine;
        }
        if (line.endsWith("\n")) {
            lineWidth = 0;
        }
    }
    lines.push(line);
    return lines.join("\n");
};
exports.wrapNativeText = wrapNativeText;
var getNativeTextSize = function (text, nativeFont, textStyle, webAssemblyContext, rotation) {
    if (rotation === void 0) { rotation = 0; }
    var textBounds = (0, NativeObject_1.getTextBounds)(webAssemblyContext);
    nativeFont.CalculateStringBounds(text, textBounds, 0);
    var maxLineHeight = 0;
    for (var i = 0; i < textBounds.GetLinesCount(); i++) {
        var lineBounds = textBounds.GetLineBounds(i);
        var lineHeight = lineBounds.m_fHeight - lineBounds.m_fOffsetY;
        if (maxLineHeight < lineHeight) {
            maxLineHeight = lineHeight;
        }
    }
    var nativeLineSpacing = Math.round(maxLineHeight * (textStyle.lineSpacing - 1));
    var textHeight = Math.round(textBounds.m_fHeight +
        (textBounds.GetLinesCount() - 1) * nativeLineSpacing +
        textStyle.padding.top +
        textStyle.padding.bottom);
    var textWidth = Math.round(textBounds.m_fWidth + textStyle.padding.left + textStyle.padding.right);
    var firstLineAscent = textBounds.GetLineBounds(0).m_fHeight;
    var rotationRad = ((rotation % 360) * Math.PI) / 180;
    var sin = Math.sin(rotationRad);
    var cos = Math.cos(rotationRad);
    // if (rotation % 180 === 0) {
    //     sin = 0;
    //     cos = 1;
    // } else if (rotation % 90 === 0) {
    //     sin = 1;
    //     cos = 0;
    // }
    var newTextureWidth = Math.round(textWidth * Math.abs(cos) + textHeight * Math.abs(sin));
    var newTextureHeight = Math.round(textWidth * Math.abs(sin) + textHeight * Math.abs(cos));
    var deltaX = 0;
    var deltaY = 0;
    if (rotation >= 0 && rotation < 90) {
        deltaX = (textHeight - textStyle.padding.top - firstLineAscent) * sin + textStyle.padding.left * cos;
        deltaY = textStyle.padding.left * sin + (textStyle.padding.top + firstLineAscent) * cos;
    }
    else if (rotation >= 90 && rotation <= 180) {
        deltaX = newTextureWidth - (textStyle.padding.top + firstLineAscent) * sin + textStyle.padding.left * cos;
        deltaY = -(textHeight - textStyle.padding.top - firstLineAscent) * cos + textStyle.padding.left * sin;
    }
    else if (rotation > 180 && rotation <= 270) {
        deltaX =
            newTextureWidth -
                (textStyle.padding.top + firstLineAscent - textHeight) * sin +
                textStyle.padding.left * cos;
        deltaY = newTextureHeight + (textStyle.padding.top + firstLineAscent) * cos + textStyle.padding.left * sin;
    }
    else if (rotation > 270 && rotation < 360) {
        deltaX = -(textStyle.padding.top + firstLineAscent) * sin + textStyle.padding.left * cos;
        deltaY =
            newTextureHeight -
                (textHeight - firstLineAscent - textStyle.padding.top) * cos +
                textStyle.padding.left * sin;
    }
    return {
        textHeight: newTextureHeight,
        textWidth: newTextureWidth,
        nativeLineSpacing: nativeLineSpacing,
        deltaX: deltaX,
        deltaY: deltaY
    };
};
exports.getNativeTextSize = getNativeTextSize;
