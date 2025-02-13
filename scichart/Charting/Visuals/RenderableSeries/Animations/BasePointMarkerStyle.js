"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePointMarkerStyle = void 0;
var PointMarkerType_1 = require("../../../../types/PointMarkerType");
var BasePointMarkerStyle = /** @class */ (function () {
    function BasePointMarkerStyle(options) {
        var _a, _b, _c;
        this.width = 0;
        this.height = 0;
        this.type = (_a = options === null || options === void 0 ? void 0 : options.type) !== null && _a !== void 0 ? _a : this.type;
        this.width = (_b = options === null || options === void 0 ? void 0 : options.width) !== null && _b !== void 0 ? _b : this.width;
        this.height = (_c = options === null || options === void 0 ? void 0 : options.height) !== null && _c !== void 0 ? _c : this.height;
    }
    Object.defineProperty(BasePointMarkerStyle.prototype, "isCustomPointMarker", {
        get: function () {
            return this.type === PointMarkerType_1.EPointMarkerType.Sprite;
        },
        enumerable: false,
        configurable: true
    });
    return BasePointMarkerStyle;
}());
exports.BasePointMarkerStyle = BasePointMarkerStyle;
