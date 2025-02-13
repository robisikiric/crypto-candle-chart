"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInvalidAxisAlignment = exports.getIsVertical = exports.getIsHorizontal = exports.EAxisAlignment = void 0;
/**
 * Enumeration constants to define {@link AxisBase2D.alignment}
 */
var EAxisAlignment;
(function (EAxisAlignment) {
    EAxisAlignment["Right"] = "Right";
    EAxisAlignment["Left"] = "Left";
    EAxisAlignment["Top"] = "Top";
    EAxisAlignment["Bottom"] = "Bottom";
})(EAxisAlignment = exports.EAxisAlignment || (exports.EAxisAlignment = {}));
var getIsHorizontal = function (alignment) {
    if ([EAxisAlignment.Bottom, EAxisAlignment.Top].includes(alignment)) {
        return true;
    }
    if ([EAxisAlignment.Right, EAxisAlignment.Left].includes(alignment)) {
        return false;
    }
    return undefined;
};
exports.getIsHorizontal = getIsHorizontal;
var getIsVertical = function (alignment) {
    if ((0, exports.getIsHorizontal)(alignment) === false) {
        return true;
    }
    if ((0, exports.getIsHorizontal)(alignment) === true) {
        return false;
    }
    return undefined;
};
exports.getIsVertical = getIsVertical;
var handleInvalidAxisAlignment = function (alignment) {
    throw new Error("Invalid Axis Alignment value: \"".concat(alignment, "\"!"));
};
exports.handleInvalidAxisAlignment = handleInvalidAxisAlignment;
