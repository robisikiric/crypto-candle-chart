"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertMultiLineAlignment = exports.EMultiLineAlignment = exports.EVerticalTextPosition = exports.EHorizontalTextPosition = void 0;
var EHorizontalTextPosition;
(function (EHorizontalTextPosition) {
    EHorizontalTextPosition["Left"] = "Left";
    EHorizontalTextPosition["Center"] = "Center";
    EHorizontalTextPosition["Right"] = "Right";
})(EHorizontalTextPosition = exports.EHorizontalTextPosition || (exports.EHorizontalTextPosition = {}));
var EVerticalTextPosition;
(function (EVerticalTextPosition) {
    EVerticalTextPosition["Above"] = "Above";
    EVerticalTextPosition["Center"] = "Center";
    EVerticalTextPosition["Below"] = "Below";
})(EVerticalTextPosition = exports.EVerticalTextPosition || (exports.EVerticalTextPosition = {}));
var EMultiLineAlignment;
(function (EMultiLineAlignment) {
    EMultiLineAlignment["Left"] = "Left";
    EMultiLineAlignment["Right"] = "Right";
    EMultiLineAlignment["Center"] = "Center";
})(EMultiLineAlignment = exports.EMultiLineAlignment || (exports.EMultiLineAlignment = {}));
var convertMultiLineAlignment = function (multiLineAlignment, webAssemblyContext) {
    var alignMode = webAssemblyContext.eTSRTextAlignMode.Left;
    switch (multiLineAlignment) {
        case EMultiLineAlignment.Left:
            alignMode = webAssemblyContext.eTSRTextAlignMode.Left;
            break;
        case EMultiLineAlignment.Right:
            alignMode = webAssemblyContext.eTSRTextAlignMode.Right;
            break;
        case EMultiLineAlignment.Center:
            alignMode = webAssemblyContext.eTSRTextAlignMode.Center;
            break;
        default:
            break;
    }
    return alignMode;
};
exports.convertMultiLineAlignment = convertMultiLineAlignment;
