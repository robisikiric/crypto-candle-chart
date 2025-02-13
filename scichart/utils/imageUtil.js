"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createImagesArrayAsync = exports.createImageAsync = void 0;
/**
 * Helper function to create an HTML Image {@link HTMLImageElement} asychronously
 * by passing in the string image source
 * @remarks Returns a promise, await this to get the image element
 * @param src
 */
function createImageAsync(src) {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = function () { return resolve(img); };
        img.onerror = reject;
        img.src = src;
    });
}
exports.createImageAsync = createImageAsync;
/**
 * Helper function to create an HTML Images {@link HTMLImageElement} asychronously
 * by passing in the string array
 * @param images
 */
function createImagesArrayAsync(images) {
    var promises = images.map(function (image) { return createImageAsync(image); });
    return Promise.all(promises);
}
exports.createImagesArrayAsync = createImagesArrayAsync;
