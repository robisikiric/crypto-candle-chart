"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.labelCache = void 0;
var Deleter_1 = require("../../../../Core/Deleter");
var Thickness_1 = require("../../../../Core/Thickness");
var logger_1 = require("../../../../utils/logger");
var labelCacheByTextAndStyle = new Map();
var styleCache = {};
var lastStyleId = 0;
var getStyleId = function (style) {
    for (var key in styleCache) {
        if (styleCache.hasOwnProperty(key)) {
            var otherStyle = styleCache[key];
            if (otherStyle) {
                if (checkTextStyleEqual(style, otherStyle.style)) {
                    otherStyle.uses++;
                    return key;
                }
            }
        }
    }
    lastStyleId++;
    var newStyleId = lastStyleId.toString();
    styleCache[newStyleId] = { style: style, uses: 1 };
    return newStyleId;
};
var freeStyle = function (styleId) {
    var style = styleCache[styleId];
    if (style) {
        style.uses--;
        setTimeout(function () {
            var styleToClear = styleCache[styleId];
            if (styleToClear && styleToClear.uses === 0) {
                clearCacheByStyle(styleId);
            }
        }, minAge);
    }
};
var makeCacheKey = function (text, styleId) {
    return "".concat(text, "|:|").concat(styleId);
};
var parseCacheKey = function (key) {
    var sep = key.indexOf("|:|");
    var text = key.substring(0, sep - 1);
    var styleId = key.substring(sep + 3);
    return { text: text, styleId: styleId };
};
var getLabel = function (text, styleId) {
    var key = makeCacheKey(text, styleId);
    var label = labelCacheByTextAndStyle.get(key);
    if (label) {
        label.lastUsed = Date.now();
    }
    return label;
};
var setLabel = function (text, styleId, label) {
    var key = makeCacheKey(text, styleId);
    // TODO should we worry about key collisions if using custom textures?
    labelCacheByTextAndStyle.set(key, label);
};
var checkStyle = function (currentStyleId, newStyle) {
    var currentStyle = styleCache[currentStyleId.toString()];
    if (currentStyle) {
        return checkTextStyleEqual(currentStyle.style, newStyle);
    }
    return false;
};
var clearCacheByStyle = function (styleId) {
    for (var _i = 0, _a = Array.from(labelCacheByTextAndStyle.keys()); _i < _a.length; _i++) {
        var keyStr = _a[_i];
        var _b = parseCacheKey(keyStr), text = _b.text, keyStyleId = _b.styleId;
        if (keyStyleId === styleId) {
            var label = labelCacheByTextAndStyle.get(keyStr);
            labelCacheByTextAndStyle.delete(keyStr);
            try {
                (0, Deleter_1.deleteSafe)(label.bitmapTexture);
            }
            catch (error) {
                // WasmContext is probably disposed
                logger_1.Logger.debug(error);
            }
        }
    }
};
var maxSize = 200;
var minAge = 1000 * 60;
var getMaxSize = function () { return maxSize; };
var setMaxSize = function (size) {
    maxSize = size;
};
var getMinAge = function () { return minAge; };
var setMinAge = function (ageInMs) {
    minAge = ageInMs;
};
var pruneCache = function () {
    if (labelCacheByTextAndStyle.size > maxSize) {
        try {
            // remove more than we need so we do this less.
            var toRemove = Math.min(Math.floor(labelCacheByTextAndStyle.size / 2), (labelCacheByTextAndStyle.size - maxSize) * 2);
            // Sort the items by LastUsed ascending
            var labels = Array.from(labelCacheByTextAndStyle.entries());
            labels.sort(function (a, b) { return a[1].lastUsed - b[1].lastUsed; });
            // remove earliest
            for (var index = 0; index < toRemove; index++) {
                var _a = labels[index], key = _a[0], label = _a[1];
                label.bitmapTexture = (0, Deleter_1.deleteSafe)(label.bitmapTexture);
                labelCacheByTextAndStyle.delete(key);
            }
        }
        catch (err) {
            console.warn(err);
        }
    }
};
var checkTextStyleEqual = function (style1, style2) {
    return (style1.alignment === style2.alignment &&
        style1.multilineAlignment === style2.multilineAlignment &&
        style1.color === style2.color &&
        style1.fontFamily === style2.fontFamily &&
        style1.fontSize === style2.fontSize &&
        style1.fontStyle === style2.fontStyle &&
        style1.fontWeight === style2.fontWeight &&
        ((style1.padding === undefined && style2.padding === undefined)
            || Thickness_1.Thickness.areEqual(style1.padding, style2.padding)) &&
        style1.extras === style2.extras &&
        style1.rotation === style2.rotation &&
        style1.providerId === style2.providerId);
};
var resetCache = function () {
    labelCacheByTextAndStyle.clear();
    // tslint:disable-next-line: forin
    for (var key in styleCache) {
        delete styleCache[key];
    }
};
var getSize = function () { return labelCacheByTextAndStyle.size; };
/**
 * A global cache for labels, used by all labelProviders, to reduce the amount of time spent creating label textures.
 */
exports.labelCache = {
    /** Get an identifier for the given text style.  Returns an existing identifier if a matching style exists in the cache */
    getStyleId: getStyleId,
    /**
     * Notify the cache that a style is no longer used.
     * Linked labels are only deleted when there are no remaining uses, and then only after minAge has passed.
     */
    freeStyle: freeStyle,
    /** Get a label from the cache.  Returns undefined if none found. */
    getLabel: getLabel,
    /** Add a label to the cache */
    setLabel: setLabel,
    /** Check if a text style matches the one for the given id */
    checkStyle: checkStyle,
    /** Get the maximum number of labels allowed to be stored in the cache.  Used when calling pruneCache */
    getMaxSize: getMaxSize,
    /** Set the maximum number of labels allowed to be stored in the cache.  Used when calling pruneCache */
    setMaxSize: setMaxSize,
    getSize: getSize,
    /** Get the minimum age (time since last used) of labels in the cache.
     * This prevents recently used labels from being pruned, or removed when style is freed
     */
    getMinAge: getMinAge,
    /** Set the minimum age (time since last used) of labels in the cache.
     * This prevents recently used labels from being pruned, or removed when style is freed
     */
    setMinAge: setMinAge,
    /** Remove old labels from the cache, if there are more than MaxSize.   */
    pruneCache: pruneCache,
    /** Completely clears and resets the cache.  Testing use only */
    resetCache: resetCache
};
